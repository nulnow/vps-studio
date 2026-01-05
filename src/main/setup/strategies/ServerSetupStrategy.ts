import type { SetupEvent, SetupStep } from '../../../../interface/server-setup'
import type { OsInfo, ServerSetupRequest } from '../../../../interface/server-setup'
import type { SshClient } from '../ssh/SshClient'

export type ProgressEmitter = (e: Omit<SetupEvent, 'jobId'>) => void

export abstract class ServerSetupStrategy {
  constructor(
    protected readonly jobId: string,
    protected readonly req: ServerSetupRequest,
    protected readonly os: OsInfo,
    protected readonly client: SshClient,
    protected readonly emit: ProgressEmitter
  ) {}

  abstract readonly id: string
  abstract matches(): boolean

  async execute() {
    await this.step('select_strategy', 'Strategy selected: ' + this.id, async () => {})
    await this.step('apt_deps', 'Installing required system packages…', () =>
      this.installAptDeps()
    )
    await this.step('docker', 'Ensuring Docker is installed…', () => this.ensureDocker())
    await this.step('nvm', 'Ensuring nvm is installed…', () => this.ensureNvm())
    await this.step('node', 'Ensuring Node.js 22 is installed…', () => this.ensureNode22())
    await this.step('git', 'Ensuring git is installed…', () => this.ensureGit())
    await this.step('clone', 'Downloading project…', () => this.cloneProject())
    await this.step('npm_install', 'Installing npm dependencies…', () => this.npmInstall())
    await this.step('pm2', 'Installing pm2…', () => this.ensurePm2())
    await this.step('start', 'Starting service with pm2…', () => this.startPm2())
  }

  protected async step(step: SetupStep, message: string, fn: () => Promise<void>) {
    this.emit({ step, status: 'start', message })
    try {
      await fn()
      this.emit({ step, status: 'success', message })
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      this.emit({ step, status: 'error', message: `${message} (${msg})` })
      throw e
    }
  }

  // Steps (overrideable)
  protected abstract installAptDeps(): Promise<void>
  protected abstract ensureDocker(): Promise<void>
  protected abstract ensureNvm(): Promise<void>
  protected abstract ensureNode22(): Promise<void>
  protected abstract ensureGit(): Promise<void>
  protected abstract cloneProject(): Promise<void>
  protected abstract npmInstall(): Promise<void>
  protected abstract ensurePm2(): Promise<void>
  protected abstract startPm2(): Promise<void>
}


