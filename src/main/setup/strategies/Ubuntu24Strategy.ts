import type { ServerSetupRequest } from '../../../../interface/server-setup'
import { ServerSetupStrategy } from './ServerSetupStrategy'

const REPO_URL = 'REPLACE_ME' // TODO: replace with real repo url (config)
const INSTALL_DIR = '/opt/vps-studio' // system-ish place
const APP_DIR = `${INSTALL_DIR}/vps-studio-agent`
const PM2_APP_NAME = 'vps-studio'

export class Ubuntu24Strategy extends ServerSetupStrategy {
  readonly id = 'ubuntu-24'

  matches(): boolean {
    return this.os.id === 'ubuntu' && this.os.versionId.startsWith('24')
  }

  protected async installAptDeps(): Promise<void> {
    await this.sudoApt('update -y')
    await this.sudoApt(
      'install -y ca-certificates curl git build-essential'
    )
  }

  protected async ensureDocker(): Promise<void> {
    const has = await this.client.execBash('command -v docker')
    if (has.code === 0) {
      this.emit({ step: 'docker', status: 'info', message: 'docker already installed' })
      return
    }

    // Official convenience script (fast path). Requires sudo.
    // https://get.docker.com/
    const r = await this.client.execBash('curl -fsSL https://get.docker.com | sudo sh')
    if (r.code !== 0) {
      throw new Error(r.stderr || r.stdout || 'docker install failed')
    }

    // Optional: allow non-root usage if a non-root user was provided.
    if (this.req.username && this.req.username !== 'root') {
      await this.client.execBash(`sudo usermod -aG docker ${this.req.username} || true`)
      this.emit({
        step: 'docker',
        status: 'info',
        message: 'Added user to docker group (may require re-login)'
      })
    }
  }

  protected async ensureNvm(): Promise<void> {
    const check = await this.client.execBash('test -s "$HOME/.nvm/nvm.sh"')
    if (check.code === 0) {
      this.emit({ step: 'nvm', status: 'info', message: 'nvm already installed' })
      return
    }
    await this.client.execBash(
      'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash'
    )
  }

  protected async ensureNode22(): Promise<void> {
    await this.client.execBash(
      'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm install 22 && nvm alias default 22 && nvm use 22'
    )
  }

  protected async ensureGit(): Promise<void> {
    const has = await this.client.execBash('command -v git')
    if (has.code === 0) return
    await this.sudoApt('update -y')
    await this.sudoApt('install -y git')
  }

  protected async cloneProject(): Promise<void> {
    if (REPO_URL === 'REPLACE_ME') {
      throw new Error('Repo URL is not configured yet (REPLACE_ME)')
    }

    // Make install dir owned by user (requires sudo).
    await this.client.execBash(
      `sudo mkdir -p ${INSTALL_DIR} && sudo chown -R ${this.req.username}:${this.req.username} ${INSTALL_DIR}`
    )

    const exists = await this.client.execBash(`test -d ${APP_DIR}/.git`)
    if (exists.code === 0) {
      await this.client.execBash(`cd ${APP_DIR} && git fetch --all && git reset --hard origin/HEAD`)
      return
    }
    await this.client.execBash(`rm -rf ${APP_DIR} && git clone ${REPO_URL} ${APP_DIR}`)
  }

  protected async npmInstall(): Promise<void> {
    await this.client.execBash(
      `export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && cd ${APP_DIR} && npm install`
    )
  }

  protected async ensurePm2(): Promise<void> {
    const has = await this.client.execBash(
      'export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && command -v pm2'
    )
    if (has.code === 0) return
    await this.client.execBash(
      'export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && npm i -g pm2'
    )
  }

  protected async startPm2(): Promise<void> {
    // Start via npm start (assumes package.json has start script)
    await this.client.execBash(
      `export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && cd ${APP_DIR} && pm2 start npm --name ${PM2_APP_NAME} -- start && pm2 save`
    )
  }

  private async sudoApt(args: string) {
    // NOTE: assumes user has sudo privileges (possibly passwordless). We intentionally do not handle sudo password here yet.
    const r = await this.client.execBash(`sudo apt-get ${args}`)
    if (r.code !== 0) {
      throw new Error(r.stderr || r.stdout || `sudo apt-get ${args} failed`)
    }
  }
}


