import type { QuickActionId } from '../../interface/quick-actions'
import type { DockerCreateContainerRequest } from './docker'
import { randomBytes } from 'node:crypto'

export function buildQuickActionCreateRequest(id: QuickActionId): DockerCreateContainerRequest {
  const suffix = randomBytes(2).toString('hex') // tiny random hex
  const withSuffix = (req: DockerCreateContainerRequest): DockerCreateContainerRequest => {
    if (!req.name) return req
    return { ...req, name: `${req.name}-${suffix}` }
  }

  const reactBootstrap = [
    'set -euo pipefail',
    'export DEBIAN_FRONTEND=noninteractive',
    'apt-get update -y',
    'apt-get install -y --no-install-recommends ca-certificates curl git gnupg',
    // Node.js 22 (NodeSource)
    'curl -fsSL https://deb.nodesource.com/setup_22.x | bash -',
    'apt-get install -y nodejs',
    'npm i -g pm2',
    'mkdir -p /demo',
    'cd /demo',
    // Создание React + TypeScript проекта через create-vite
    'rm -rf react-app',
    'npx create-vite@latest react-app --template react-ts',
    'cd react-app',
    'npm install',
    // Запуск dev сервера
    'pm2-runtime npm -- run dev -- --host 0.0.0.0 --port 5173'
  ].join('\n')

  switch (id) {
    case 'ubuntu':
      return withSuffix({ image: 'ubuntu:24.04', name: 'vps-ubuntu', command: ['sleep', 'infinity'] })
    case 'postgres':
      return withSuffix({
        image: 'postgres:16',
        name: 'vps-postgres',
        env: {
          POSTGRES_PASSWORD: 'postgres',
          POSTGRES_USER: 'postgres',
          POSTGRES_DB: 'app'
        },
        ports: ['5432:5432']
      })
    case 'minecraft':
      return withSuffix({
        image: 'itzg/minecraft-server:latest',
        name: 'vps-minecraft',
        env: { EULA: 'TRUE' },
        ports: ['25565:25565']
      })
    case 'laravel':
      return withSuffix({ image: 'bitnami/laravel:latest', name: 'vps-laravel', ports: ['8000:8000'] })
    case 'spring':
      return withSuffix({
        image: 'eclipse-temurin:21-jre',
        name: 'vps-spring',
        ports: ['8080:8080'],
        command: ['sleep', 'infinity']
      })
    case 'react':
      return withSuffix({
        image: 'ubuntu:24.04',
        name: 'vps-react',
        ports: ['5173:5173'],
        command: ['bash', '-lc', reactBootstrap]
      })
    case 'function':
      return withSuffix({ image: 'node:22-alpine', name: 'vps-function', command: ['sleep', 'infinity'] })
  }
}


