import { execFile } from 'node:child_process'

export type DockerInfo = {
  installed: boolean
  version: string | null
}

export type DockerRunningContainer = {
  id: string
  name: string
  image: string
  status: string
  createdAt?: string
  runningFor?: string
  command?: string
  ports?: string
}

export type DockerCreateContainerRequest = {
  image: string
  name?: string
  command?: string[]
  env?: Record<string, string>
  ports?: string[] // e.g. ["8080:80", "127.0.0.1:5432:5432"]
}

function execFileAsync(
  file: string,
  args: string[],
  timeoutMs: number
): Promise<{ stdout: string; stderr: string; exitCode: number | null }> {
  return new Promise((resolve) => {
    const child = execFile(file, args, { timeout: timeoutMs }, (error, stdout, stderr) => {
      const exitCode =
        typeof (error as any)?.code === 'number' ? (error as any).code : 0
      resolve({ stdout: String(stdout ?? ''), stderr: String(stderr ?? ''), exitCode })
    })

    child.on('error', () => {
      resolve({ stdout: '', stderr: '', exitCode: null })
    })
  })
}

export async function getDockerInfo(): Promise<DockerInfo> {
  // Fast check; `docker version` may talk to daemon and be slower.
  const res = await execFileAsync('docker', ['--version'], 1200)
  const out = `${res.stdout}\n${res.stderr}`.trim()

  if (!out) {
    return { installed: false, version: null }
  }

  // Example: "Docker version 27.3.1, build ce12230"
  const m = out.match(/Docker version\s+([0-9]+(?:\.[0-9]+)*)/i)
  return {
    installed: true,
    version: m?.[1] ?? out
  }
}

export async function listRunningDockerContainers(
  timeoutMs = 2500
): Promise<DockerRunningContainer[]> {
  // `docker ps -a` returns all containers (running + stopped).
  // We use JSON-per-line output to avoid fragile text parsing.
  const res = await execFileAsync(
    'docker',
    ['ps', '-a', '--no-trunc', '--format', '{{json .}}'],
    timeoutMs
  )

  if (res.exitCode === null) {
    throw new Error('Failed to execute docker (is it installed and on PATH?)')
  }

  if (res.exitCode !== 0) {
    const msg = `${res.stderr}\n${res.stdout}`.trim() || `docker ps failed (code=${res.exitCode})`
    throw new Error(msg)
  }

  const lines = res.stdout
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  const containers: DockerRunningContainer[] = []
  for (const line of lines) {
    try {
      const row = JSON.parse(line) as Partial<Record<string, unknown>>
      const id = typeof row.ID === 'string' ? row.ID : ''
      const name = typeof row.Names === 'string' ? row.Names : ''
      const image = typeof row.Image === 'string' ? row.Image : ''
      const status = typeof row.Status === 'string' ? row.Status : ''

      if (!id || !name || !image || !status) continue

      containers.push({
        id,
        name,
        image,
        status,
        createdAt: typeof row.CreatedAt === 'string' ? row.CreatedAt : undefined,
        runningFor: typeof row.RunningFor === 'string' ? row.RunningFor : undefined,
        command: typeof row.Command === 'string' ? row.Command : undefined,
        ports:
          typeof row.Ports === 'string' && row.Ports.trim()
            ? row.Ports
            : undefined
      })
    } catch {
      // Ignore malformed lines (shouldn't happen, but don't fail the whole call).
    }
  }

  return containers
}

async function execDockerOrThrow(args: string[], timeoutMs: number, label: string) {
  const res = await execFileAsync('docker', args, timeoutMs)
  if (res.exitCode === null) {
    throw new Error('Failed to execute docker (is it installed and on PATH?)')
  }
  if (res.exitCode !== 0) {
    const msg = `${res.stderr}\n${res.stdout}`.trim() || `${label} failed (code=${res.exitCode})`
    throw new Error(msg)
  }
  return res
}

export async function createDockerContainer(
  req: DockerCreateContainerRequest,
  timeoutMs = 60_000
): Promise<{ id: string }> {
  const args: string[] = ['run', '-d']

  if (req.name) {
    args.push('--name', req.name)
  }

  if (req.ports?.length) {
    for (const p of req.ports) {
      args.push('-p', p)
    }
  }

  if (req.env) {
    for (const [k, v] of Object.entries(req.env)) {
      args.push('-e', `${k}=${v}`)
    }
  }

  args.push(req.image)

  if (req.command?.length) {
    args.push(...req.command)
  }

  const res = await execDockerOrThrow(args, timeoutMs, 'docker run')

  const id = res.stdout.trim().split('\n')[0]?.trim() ?? ''
  if (!id) throw new Error('docker run returned empty container id')

  return { id }
}

export async function removeDockerContainer(
  id: string,
  opts: { force?: boolean } = {},
  timeoutMs = 15_000
): Promise<{ removed: boolean }> {
  const force = opts.force ?? true
  const args = ['rm', ...(force ? ['-f'] : []), id]
  await execDockerOrThrow(args, timeoutMs, 'docker rm')

  return { removed: true }
}

export async function stopDockerContainer(id: string, timeoutMs = 15_000): Promise<void> {
  await execDockerOrThrow(['stop', id], timeoutMs, 'docker stop')
}

export async function startDockerContainer(id: string, timeoutMs = 15_000): Promise<void> {
  await execDockerOrThrow(['start', id], timeoutMs, 'docker start')
}


