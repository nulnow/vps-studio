import fs from 'node:fs'
import { Client } from 'ssh2'
import type { ClientChannel, ConnectConfig } from 'ssh2'

export type ExecResult = {
  code: number | null
  signal: string | null
  stdout: string
  stderr: string
}

export class SshClient {
  private client = new Client()
  private ready = false

  async connect(config: ConnectConfig): Promise<void> {
    if (this.ready) return
    await new Promise<void>((resolve, reject) => {
      this.client
        .once('ready', () => {
          this.ready = true
          resolve()
        })
        .once('error', reject)
        .connect(config)
    })
  }

  static connectConfigFrom(opts: {
    host: string
    port: number
    username: string
    auth:
      | { type: 'password'; password: string }
      | { type: 'key'; keyPath: string; passphrase?: string }
  }): ConnectConfig {
    if (opts.auth.type === 'password') {
      return {
        host: opts.host,
        port: opts.port,
        username: opts.username,
        password: opts.auth.password,
        readyTimeout: 12_000
      }
    }

    const privateKey = fs.readFileSync(opts.auth.keyPath, 'utf8')
    return {
      host: opts.host,
      port: opts.port,
      username: opts.username,
      privateKey,
      passphrase: opts.auth.passphrase,
      readyTimeout: 12_000
    }
  }

  exec(command: string): Promise<ExecResult> {
    return new Promise<ExecResult>((resolve, reject) => {
      this.client.exec(command, (err: Error | undefined, stream: ClientChannel) => {
        if (err) return reject(err)
        let stdout = ''
        let stderr = ''
        stream.on('data', (d: Buffer) => (stdout += d.toString('utf8')))
        stream.stderr.on('data', (d: Buffer) => (stderr += d.toString('utf8')))
        stream.on('close', (code: number | null, signal: string | null) => {
          resolve({ code, signal, stdout, stderr })
        })
      })
    })
  }

  async execBash(command: string): Promise<ExecResult> {
    // Run via login shell to make nvm sourcing predictable.
    const q = shellQuoteSingle(command)
    return await this.exec(`bash -lc ${q}`)
  }

  end() {
    try {
      this.client.end()
    } catch {
      // ignore
    }
  }
}

function shellQuoteSingle(s: string) {
  // 'foo' -> 'foo', foo'bar -> 'foo'"'"'bar'
  return `'${s.replaceAll("'", `'\"'\"'`)}'`
}


