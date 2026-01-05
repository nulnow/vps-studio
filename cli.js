#!/usr/bin/env node

import { execSync, spawn } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'

const REPO_URL = 'https://github.com/nulnow/vps-studio.git'

/**
 * Clones VPS Studio repository, installs dependencies, and optionally starts dev server.
 * 
 * @param {Object} options - Installation options
 * @param {string} [options.dir='vps-studio'] - Directory name to clone into (default: 'vps-studio')
 * @param {boolean} [options.skipInstall=false] - Skip npm install step
 * @param {boolean} [options.skipDev=false] - Skip starting dev server (only clone and install)
 * @returns {Promise<void>} Resolves when installation is complete
 * @throws {Error} Exits process with code 1 if directory exists or installation fails
 */
async function installInCurrentDirectory(options) {
  const currentDir = cwd()
  const projectDir = options.dir || 'vps-studio'
  const projectPath = join(currentDir, projectDir)

  console.log('📦 Installing VPS Studio...')
  console.log(`📍 Target: ${projectPath}`)

  if (existsSync(projectPath)) {
    console.log(`⚠️  Directory ${projectDir} already exists!`)
    process.exit(1)
  }

  try {
    // 1. Клонируем
    console.log('📥 Cloning repository...')
    execSync(`git clone ${REPO_URL} ${projectDir}`, {
      stdio: 'inherit',
      cwd: currentDir
    })

    // 2. Устанавливаем зависимости (если не пропущено)
    if (!options.skipInstall) {
      console.log('📦 Installing dependencies...')
      execSync('npm install', {
        stdio: 'inherit',
        cwd: projectPath
      })
    }

    // 3. Запускаем dev (если не пропущено)
    if (!options.skipDev) {
      console.log('🚀 Starting development server...')
      console.log(`💡 Project ready at: ${projectPath}\n`)

      const devProcess = spawn('npm', ['run', 'dev'], {
        stdio: 'inherit',
        cwd: projectPath,
        shell: true
      })

      process.on('SIGINT', () => {
        console.log('\n🛑 Stopping...')
        devProcess.kill('SIGINT')
        process.exit(0)
      })

      devProcess.on('exit', (code) => {
        process.exit(code ?? 0)
      })
    } else {
      console.log(`✅ Project installed at: ${projectPath}`)
      console.log(`   Run: cd ${projectDir} && npm run dev`)
    }

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

async function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  if (command === '--install-HERE-and-run-dev') {
    const dir = args.find(arg => arg.startsWith('--dir='))?.split('=')[1]
    const skipInstall = false // args.includes('--skip-install')
    const skipDev = false // args.includes('--skip-dev')

    await installInCurrentDirectory({ dir, skipInstall, skipDev })
  } else {
    console.log('Not working 😭. Visit https://vps-studio.com for more information.')
  }
}

main().catch(console.error)