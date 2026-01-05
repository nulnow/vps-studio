import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import {
  DockerCreateContainerRequestSchema,
  DockerCreateContainerResponseSchema,
  DockerContainerActionResponseSchema,
  DockerRemoveContainerResponseSchema,
  DockerRunningContainersResponseSchema
} from '../../interface/docker'
import { VpsStudioItemsResponseSchema } from '../../interface/items'
import {
  type QuickActionId,
  QuickActionRunRequestSchema,
  QuickActionRunResponseSchema
} from '../../interface/quick-actions'
import { VpsStudioSchema } from '../../interface/vps-studio'
import {
  createDockerContainer,
  getDockerInfo,
  listRunningDockerContainers,
  removeDockerContainer,
  startDockerContainer,
  stopDockerContainer
} from './docker'
import { findAvailablePort } from './port'
import { buildQuickActionCreateRequest } from './quick-actions'

export type LocalhostBackend = {
  port: number
  baseUrl: string
  close: () => Promise<void>
}

export async function startLocalhostBackend(): Promise<LocalhostBackend> {
  const app = new Hono()

  // Effectively "disable CORS": allow requests from any origin.
  app.use(
    '*',
    cors({
      origin: '*',
      allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowHeaders: ['*']
    })
  )

  app.get('/vps-studio', async (c) => {
    const docker = await getDockerInfo()
    const payload = VpsStudioSchema.parse({
      live: true,
      vpsStudioApiVersion: 'v1',
      dockerInstalled: docker.installed,
      dockerVersion: docker.version
    })
    return c.json(payload)
  })

  app.get('/vps-studio/items', (c) => {
    const payload = VpsStudioItemsResponseSchema.parse({
      items: [
        {
          id: 'local-1',
          name: 'Localhost backend',
          launchCommand: 'npm run dev',
          installedSoftware: [
            { name: 'node', version: '20.x' },
            { name: 'npm', version: '10.x' },
            { name: 'hono', version: '4.x' },
            { name: 'react', version: '18.x' },
            { name: 'tailwind', version: '3.4.x' }
          ]
        },
        {
          id: 'srv-1',
          name: 'Ubuntu 24.04 VPS',
          launchCommand: 'docker compose up -d',
          installedSoftware: [
            { name: 'docker', version: '27.x' },
            { name: 'nginx', version: '1.24+' },
            { name: 'postgres', version: '16.x' },
            { name: 'redis', version: '7.x' }
          ]
        },
        {
          id: 'srv-2',
          name: 'Build agent',
          launchCommand: './agent --start',
          installedSoftware: [
            { name: 'git', version: '2.x' },
            { name: 'node', version: '22.x' },
            { name: 'pnpm', version: '9.x' },
            { name: 'bun', version: '1.x' }
          ]
        }
      ]
    })
    return c.json(payload)
  })

  app.get('/vps-studio/docker/containers', async (c) => {
    try {
      const containers = await listRunningDockerContainers()
      const payload = DockerRunningContainersResponseSchema.parse({
        ok: true,
        containers
      })
      return c.json(payload)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error'
      const payload = DockerRunningContainersResponseSchema.parse({
        ok: false,
        containers: [],
        error: message
      })
      return c.json(payload)
    }
  })

  app.post('/vps-studio/docker/containers', async (c) => {
    try {
      const body = DockerCreateContainerRequestSchema.parse(await c.req.json())
      const res = await createDockerContainer(body)
      const payload = DockerCreateContainerResponseSchema.parse({
        ok: true,
        containerId: res.id
      })
      return c.json(payload)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error'
      const payload = DockerCreateContainerResponseSchema.parse({
        ok: false,
        error: message
      })
      return c.json(payload)
    }
  })

  app.post('/vps-studio/quick-actions/run', async (c) => {
    let id: QuickActionId = 'ubuntu'
    try {
      const body = QuickActionRunRequestSchema.parse(await c.req.json())
      id = body.id
      const req = buildQuickActionCreateRequest(body.id)
      const res = await createDockerContainer(req)
      const payload = QuickActionRunResponseSchema.parse({
        ok: true,
        id,
        containerId: res.id
      })
      return c.json(payload)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error'
      const payload = QuickActionRunResponseSchema.parse({
        ok: false,
        id,
        error: message
      })
      return c.json(payload)
    }
  })

  app.delete('/vps-studio/docker/containers/:id', async (c) => {
    const id = c.req.param('id')
    try {
      const res = await removeDockerContainer(id, { force: true })
      const payload = DockerRemoveContainerResponseSchema.parse({
        ok: true,
        removed: res.removed
      })
      return c.json(payload)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error'
      const payload = DockerRemoveContainerResponseSchema.parse({
        ok: false,
        removed: false,
        error: message
      })
      return c.json(payload)
    }
  })

  app.post('/vps-studio/docker/containers/:id/stop', async (c) => {
    const id = c.req.param('id')
    try {
      await stopDockerContainer(id)
      const payload = DockerContainerActionResponseSchema.parse({
        ok: true,
        id,
        action: 'stop'
      })
      return c.json(payload)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error'
      const payload = DockerContainerActionResponseSchema.parse({
        ok: false,
        id,
        action: 'stop',
        error: message
      })
      return c.json(payload)
    }
  })

  app.post('/vps-studio/docker/containers/:id/start', async (c) => {
    const id = c.req.param('id')
    try {
      await startDockerContainer(id)
      const payload = DockerContainerActionResponseSchema.parse({
        ok: true,
        id,
        action: 'start'
      })
      return c.json(payload)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error'
      const payload = DockerContainerActionResponseSchema.parse({
        ok: false,
        id,
        action: 'start',
        error: message
      })
      return c.json(payload)
    }
  })

  const port = await findAvailablePort(212121)

  const server = serve({
    fetch: app.fetch,
    port,
    hostname: '127.0.0.1'
  })

  return {
    port,
    baseUrl: `http://127.0.0.1:${port}`,
    close: () =>
      new Promise<void>((resolve, reject) => {
        ;(server as any).close((err: unknown) => (err ? reject(err) : resolve()))
      })
  }
}


