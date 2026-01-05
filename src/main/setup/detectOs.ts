import type { OsInfo } from '../../../interface/server-setup'
import { OsInfoSchema } from '../../../interface/server-setup'
import type { SshClient } from './ssh/SshClient'

function parseOsRelease(content: string): Record<string, string> {
  const result: Record<string, string> = {}
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    const k = trimmed.slice(0, idx)
    let v = trimmed.slice(idx + 1)
    v = v.replace(/^"/, '').replace(/"$/, '')
    result[k] = v
  }
  return result
}

export async function detectOs(client: SshClient): Promise<OsInfo> {
  const res = await client.execBash('cat /etc/os-release')
  if (res.code !== 0) {
    throw new Error(`Failed to read /etc/os-release: ${res.stderr || res.stdout}`)
  }
  const kv = parseOsRelease(res.stdout)
  const os = {
    id: kv.ID ?? 'unknown',
    versionId: kv.VERSION_ID ?? 'unknown',
    prettyName: kv.PRETTY_NAME
  }
  return OsInfoSchema.parse(os)
}


