import { app, BrowserWindow, ipcMain, nativeTheme, dialog, session, shell } from 'electron'
import { execFile } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'

import { startLocalhostBackend } from '../../backend/localhost/server'
import { SetupRunner } from './setup/SetupRunner'

const isDev = !app.isPackaged
nativeTheme.themeSource = 'dark'

const execFileAsync = promisify(execFile)

function escapeAppleScriptString(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

async function openSystemTerminalWithCommand(command: string) {
  if (process.platform === 'darwin') {
    const script = [
      'tell application "Terminal"',
      '  activate',
      `  do script "${escapeAppleScriptString(command)}"`,
      'end tell'
    ].join('\n')
    await execFileAsync('osascript', ['-e', script])
    return true
  }

  if (process.platform === 'win32') {
    // Opens a new cmd window and keeps it open.
    await execFileAsync('cmd.exe', ['/c', 'start', 'cmd.exe', '/k', command])
    return true
  }

  // Linux: best-effort across common terminals.
  const candidates: Array<[string, string[]]> = [
    ['x-terminal-emulator', ['-e', 'bash', '-lc', command]],
    ['gnome-terminal', ['--', 'bash', '-lc', command]],
    ['konsole', ['-e', 'bash', '-lc', command]],
    ['xterm', ['-e', command]]
  ]
  let lastErr: unknown = null
  for (const [bin, args] of candidates) {
    try {
      await execFileAsync(bin, args)
      return true
    } catch (e) {
      lastErr = e
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('No terminal found')
}

function buildCsp() {
  const devUrl = process.env.VITE_DEV_SERVER_URL
  if (isDev && devUrl) {
    const origin = new URL(devUrl).origin
    const wsOrigin = origin.replace(/^http/, 'ws')
    // Vite dev uses websocket + (often) eval for HMR.
    return [
      "default-src 'self'",
      // plugin-react injects an inline module preamble for React Refresh in dev
      `script-src 'self' 'unsafe-eval' 'unsafe-inline' ${origin}`,
      `style-src 'self' 'unsafe-inline' ${origin}`,
      // Allow Vite dev server + embedded localhost backend + remote backends
      `connect-src 'self' ${origin} ${wsOrigin} http://127.0.0.1:* http://localhost:* http: https: ws: wss:`,
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'"
    ].join('; ')
  }

  // Production: keep it strict (no unsafe-eval).
  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    // Allow embedded localhost backend + user-selected remote backend URLs
    "connect-src 'self' http://127.0.0.1:* http://localhost:* http: https: ws: wss:",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'"
  ].join('; ')
}

function getRendererUrl() {
  const devUrl = process.env.VITE_DEV_SERVER_URL
  if (isDev && devUrl) return devUrl

  return `file://${path.join(app.getAppPath(), 'dist', 'renderer', 'index.html')}`
}

function createWindow() {
  const devIconPath = path.join(process.cwd(), 'build', 'icon.png')
  const prodIconPath = path.join(app.getAppPath(), 'dist', 'renderer', 'icon.png')
  const iconPath = fs.existsSync(devIconPath) ? devIconPath : prodIconPath
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 500,
    minHeight: 630,
    backgroundColor: '#0b1020',
    ...(process.platform === 'darwin' ? {} : { icon: iconPath }),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.cjs')
    }
  })

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' })
  }

  void win.loadURL(getRendererUrl())
  return win
}

app.whenReady().then(() => {
  let backendUrl = 'http://127.0.0.1:212121'
  let mainWindow: BrowserWindow | null = null
  const extraWindows = new Set<BrowserWindow>()

  // Set a CSP for renderer to silence the security warning and reduce risk.
  const csp = buildCsp()
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const responseHeaders = details.responseHeaders ?? {}
    callback({
      responseHeaders: {
        ...responseHeaders,
        'Content-Security-Policy': [csp]
      }
    })
  })

  ipcMain.handle('ping', () => 'pong')
  ipcMain.handle('get-backend-url', () => backendUrl)
  ipcMain.handle('quit-app', () => {
    app.quit()
    return true
  })
  ipcMain.handle('pick-ssh-key', async () => {
    const res = await dialog.showOpenDialog({
      properties: ['openFile'],
      title: 'Select SSH private key'
    })
    if (res.canceled) return null
    return res.filePaths[0] ?? null
  })
  ipcMain.handle('open-external', async (_evt, url: string) => {
    await shell.openExternal(url)
    return true
  })
  ipcMain.handle('open-timeweb-window', async () => {
    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      title: 'HIP HOSTING',
      backgroundColor: '#0b1020',
      parent: mainWindow ?? undefined,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true
      }
    })

    extraWindows.add(win)
    win.on('closed', () => extraWindows.delete(win))

    // For remote content: open new-window requests in the OS browser.
    win.webContents.setWindowOpenHandler(({ url }) => {
      void shell.openExternal(url)
      return { action: 'deny' }
    })

    await win.loadURL('https://hip.hosting/?code=0bac6e686d7f1f9f035b')
    return true
  })
  ipcMain.handle('open-docker-container-terminal', async (_evt, containerId: string) => {
    const id = String(containerId ?? '').trim()
    // Container IDs are hex; names are also simple. Keep it strict to avoid shell injection.
    if (!/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/.test(id)) {
      throw new Error('Invalid container id')
    }
    const cmd = `docker exec -it ${id} sh`
    await openSystemTerminalWithCommand(cmd)
    return true
  })
  ipcMain.handle('start-server-setup', (_evt, req) => {
    if (!mainWindow) throw new Error('Main window not ready')
    return SetupRunner.start(req, mainWindow.webContents)
  })

  startLocalhostBackend()
    .then((backend) => {
      backendUrl = backend.baseUrl
      app.on('before-quit', () => {
        void backend.close()
      })
    })
    .catch((err) => {
      console.error('[backend] failed to start', err)
    })
    .finally(() => {
      mainWindow = createWindow()
    })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


