import { observable } from '@legendapp/state'

import type { DockerRunningContainer } from '../../../interface/docker'
import { DockerRunningContainersResponseSchema } from '../../../interface/docker'
import type { VpsStudioItem } from '../../../interface/items'
import { VpsStudioItemsResponseSchema } from '../../../interface/items'
import { VpsStudioSchema } from '../../../interface/vps-studio'

import { resolveBaseUrl } from './backendState'

export const appState$ = observable({
  status: 'idle' as 'idle' | 'loading' | 'ok' | 'error',
  refreshing: false as boolean,
  live: null as null | boolean,
  version: '' as string,
  dockerInstalled: null as null | boolean,
  dockerVersion: null as null | string,
  dockerContainersOk: null as null | boolean,
  dockerContainers: [] as DockerRunningContainer[],
  dockerContainersError: '' as string,
  items: [] as VpsStudioItem[],
  baseUrl: '' as string,
  error: '' as string
})

let refreshInFlight: Promise<void> | null = null

export async function loadAppData(opts: { silent?: boolean } = {}) {
  if (refreshInFlight) return refreshInFlight

  const silent = opts.silent ?? false
  const prevStatus = appState$.status.get()

  if (!silent) {
    window.dispatchEvent(new CustomEvent('vpsstudio:boot-loading', { detail: { loading: true } }))
  }

  if (!silent || prevStatus === 'idle') {
    appState$.status.set('loading')
  }
  appState$.refreshing.set(true)
  appState$.error.set('')
  appState$.dockerContainersError.set('')

  refreshInFlight = (async () => {
    try {
      const baseUrl = await resolveBaseUrl()
      appState$.baseUrl.set(baseUrl)
      const [healthRes, itemsRes] = await Promise.all([
        fetch(`${baseUrl}/vps-studio`),
        fetch(`${baseUrl}/vps-studio/items`)
      ])

      const healthJson = await healthRes.json()
      const itemsJson = await itemsRes.json()

      const health = VpsStudioSchema.parse(healthJson)
      const items = VpsStudioItemsResponseSchema.parse(itemsJson)

      appState$.live.set(health.live)
      appState$.version.set(health.vpsStudioApiVersion)
      appState$.dockerInstalled.set(health.dockerInstalled)
      appState$.dockerVersion.set(health.dockerVersion)
      appState$.items.set(items.items)

      // Optional: docker containers list (should not fail the whole screen).
      try {
        const containersRes = await fetch(`${baseUrl}/vps-studio/docker/containers`)
        const containersJson = await containersRes.json()
        const parsed = DockerRunningContainersResponseSchema.parse(containersJson)
        appState$.dockerContainersOk.set(parsed.ok)
        appState$.dockerContainers.set(parsed.containers)
        appState$.dockerContainersError.set(parsed.error ?? '')
      } catch (e) {
        appState$.dockerContainersOk.set(false)
        appState$.dockerContainers.set([])
        appState$.dockerContainersError.set(e instanceof Error ? e.message : String(e))
      }

      appState$.status.set('ok')
    } catch (e) {
      appState$.status.set('error')
      appState$.error.set(e instanceof Error ? e.message : String(e))
    } finally {
      appState$.refreshing.set(false)
      refreshInFlight = null
      if (!silent) {
        window.dispatchEvent(
          new CustomEvent('vpsstudio:boot-loading', { detail: { loading: false } })
        )
      }
    }
  })()

  return refreshInFlight
}


