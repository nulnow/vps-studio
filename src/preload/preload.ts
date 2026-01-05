import { contextBridge, ipcRenderer } from 'electron'

import type { ServerSetupRequest, SetupEvent, SetupResult } from '../../interface/server-setup'

export type Api = {
  ping: () => Promise<string>
  getBackendUrl: () => Promise<string>
  quitApp: () => Promise<boolean>
  pickSshKey: () => Promise<string | null>
  startServerSetup: (req: ServerSetupRequest) => Promise<{ jobId: string }>
  onServerSetupEvent: (cb: (e: SetupEvent) => void) => () => void
  onServerSetupResult: (cb: (r: SetupResult) => void) => () => void
  openExternal: (url: string) => Promise<boolean>
  openTimewebWindow: () => Promise<boolean>
  openDockerContainerTerminal: (containerId: string) => Promise<boolean>
}

const api: Api = {
  ping: () => ipcRenderer.invoke('ping'),
  getBackendUrl: () => ipcRenderer.invoke('get-backend-url'),
  quitApp: () => ipcRenderer.invoke('quit-app'),
  pickSshKey: () => ipcRenderer.invoke('pick-ssh-key'),
  startServerSetup: (req) => ipcRenderer.invoke('start-server-setup', req),
  onServerSetupEvent: (cb) => {
    const handler = (_evt: unknown, payload: SetupEvent) => cb(payload)
    ipcRenderer.on('server-setup-event', handler)
    return () => ipcRenderer.removeListener('server-setup-event', handler)
  },
  onServerSetupResult: (cb) => {
    const handler = (_evt: unknown, payload: SetupResult) => cb(payload)
    ipcRenderer.on('server-setup-result', handler)
    return () => ipcRenderer.removeListener('server-setup-result', handler)
  },
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  openTimewebWindow: () => ipcRenderer.invoke('open-timeweb-window'),
  openDockerContainerTerminal: (containerId) =>
    ipcRenderer.invoke('open-docker-container-terminal', containerId)
}

contextBridge.exposeInMainWorld('api', api)


