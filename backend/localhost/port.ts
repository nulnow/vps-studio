import net from 'node:net'

function normalizePortSeed(seed: number) {
  // TCP/UDP ports are in range 0..65535. We'll prefer user-level ports.
  const min = 1024
  const max = 65535

  if (!Number.isFinite(seed)) throw new Error(`Invalid port seed: ${seed}`)
  if (seed >= min && seed <= max) return Math.trunc(seed)

  const range = max - min + 1
  const normalized = ((((Math.trunc(seed) - min) % range) + range) % range) + min
  return normalized
}

export async function findAvailablePort(portSeed = 212121, host = '127.0.0.1') {
  const min = 1024
  const max = 65535
  const start = normalizePortSeed(portSeed)
  const range = max - min + 1

  for (let i = 0; i < range; i++) {
    const port = start + i <= max ? start + i : min + ((start + i - max - 1) % range)

    const isFree = await new Promise<boolean>((resolve) => {
      const server = net
        .createServer()
        .once('error', () => resolve(false))
        .once('listening', () => server.close(() => resolve(true)))
      server.listen(port, host)
    })

    if (isFree) return port
  }

  throw new Error(
    `No free port found (seed=${portSeed}, normalizedStart=${start}, host=${host})`
  )
}


