import crypto from 'node:crypto'
import type { WebContents } from 'electron'

import type { ServerSetupRequest, SetupEvent, SetupResult } from '../../../interface/server-setup'
import { ServerSetupRequestSchema } from '../../../interface/server-setup'
import { detectOs } from './detectOs'
import { Ubuntu24Strategy } from './strategies/Ubuntu24Strategy'
import { SshClient } from './ssh/SshClient'

export class SetupRunner {
  static start(req: ServerSetupRequest, webContents: WebContents) {
    const parsed = ServerSetupRequestSchema.parse(req)
    const jobId = crypto.randomUUID()

    void this.runJob(jobId, parsed, webContents)
    return { jobId }
  }

  private static send(webContents: WebContents, event: SetupEvent) {
    webContents.send('server-setup-event', event)
  }

  private static async runJob(jobId: string, req: ServerSetupRequest, webContents: WebContents) {
    const emit = (e: Omit<SetupEvent, 'jobId'>) =>
      this.send(webContents, { jobId, ...e })

    const client = new SshClient()
    try {
      emit({ step: 'connect', status: 'start', message: 'Connecting via SSH…' })
      await client.connect(SshClient.connectConfigFrom(req))
      emit({ step: 'connect', status: 'success', message: 'Connected' })

      emit({ step: 'detect_os', status: 'start', message: 'Detecting OS…' })
      const os = await detectOs(client)
      emit({ step: 'detect_os', status: 'success', message: `OS: ${os.prettyName ?? `${os.id} ${os.versionId}`}`, data: os })

      emit({ step: 'select_strategy', status: 'start', message: 'Selecting strategy…' })
      const strategies = [Ubuntu24Strategy]
      const Strategy = strategies.find((S) => new S(jobId, req, os, client, emit).matches())
      if (!Strategy) {
        emit({
          step: 'select_strategy',
          status: 'error',
          message: `No supported strategy for ${os.id} ${os.versionId}`,
          data: os
        })
        const result: SetupResult = { jobId, ok: false, error: `Unsupported OS: ${os.id} ${os.versionId}` }
        webContents.send('server-setup-result', result)
        return
      }
      const strategy = new Strategy(jobId, req, os, client, emit)
      emit({ step: 'select_strategy', status: 'success', message: `Strategy: ${strategy.id}` })

      await strategy.execute()

      const result: SetupResult = { jobId, ok: true }
      webContents.send('server-setup-result', result)
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      const result: SetupResult = { jobId, ok: false, error: msg }
      webContents.send('server-setup-result', result)
    } finally {
      client.end()
    }
  }
}


