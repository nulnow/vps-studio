import { observer } from '@legendapp/state/react'
import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Boxes,
  Globe,
  HardDrive,
  PlusSquare,
  RefreshCw,
  Link2,
  Server,
  Sparkles,
  Terminal,
  Database,
  Gamepad2,
  Leaf,
  Coffee,
  Atom,
  FunctionSquare
} from 'lucide-react'

import { appState$, loadAppData } from '../state/appState'
import { backendSelection$ } from '../state/backendState'
import { I18N } from '../i18n/localize'
import { quickTemplates } from '../quick-templates'
import {
  DockerContainerActionResponseSchema,
  DockerRemoveContainerResponseSchema
} from '../../../interface/docker'
import {
  QuickActionRunRequestSchema,
  QuickActionRunResponseSchema,
  type QuickActionId
} from '../../../interface/quick-actions'
import { MainMenuPage } from './pages/MainMenuPage'
import { OnlineServerPage } from './pages/OnlineServerPage'
import { SshSetupPage } from './pages/SshSetupPage'
import { StubPage } from './pages/StubPage'
import { LanguagePage } from './pages/LanguagePage'
import { NoProPage } from './pages/NoProPage'
import { APP_VERSION } from '../../../src/version'

type Route =
  | 'menu'
  | 'online'
  | 'ssh'
  | 'sshMenu'
  | 'settings'
  | 'language'
  | 'info'
  | 'noPro'
  | 'main'

export const App = observer(function App() {
  const [route, setRoute] = useState<Route>('menu')
  const [updateAvailable, setUpdateAvailable] = useState<null | { remote: string }>(null)

  const status = appState$.status.get()
  const refreshing = appState$.refreshing.get()
  const live = appState$.live.get()
  const version = appState$.version.get()
  const dockerInstalled = appState$.dockerInstalled.get()
  const dockerVersion = appState$.dockerVersion.get()
  const dockerContainersOk = appState$.dockerContainersOk.get()
  const dockerContainers = appState$.dockerContainers.get()
  const dockerContainersError = appState$.dockerContainersError.get()
  const items = appState$.items.get()
  const baseUrl = appState$.baseUrl.get()
  const error = appState$.error.get()

  const backendSel = backendSelection$.get()
  const backendLabel =
    backendSel.kind === 'url'
      ? backendSel.url
      : backendSel.kind === 'localhost'
        ? 'localhost'
        : baseUrl || '—'

  // Hide boot bar once React is up (even before any backend call).
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('vpsstudio:boot-loading', { detail: { loading: false } }))
  }, [])

  useEffect(() => {
    const parseSemver = (v: string) =>
      String(v ?? '')
        .trim()
        .replace(/^v/i, '')
        .split('.')
        .map((x) => Number.parseInt(x, 10))
        .map((n) => (Number.isFinite(n) ? n : 0))

    const cmpSemver = (a: string, b: string) => {
      const aa = parseSemver(a)
      const bb = parseSemver(b)
      const len = Math.max(aa.length, bb.length, 3)
      for (let i = 0; i < len; i++) {
        const x = aa[i] ?? 0
        const y = bb[i] ?? 0
        if (x > y) return 1
        if (x < y) return -1
      }
      return 0
    }

    const run = async () => {
      try {
        const res = await fetch('https://vps-studio.com/version.json', { cache: 'no-store' })
        const json = (await res.json()) as { version?: string }
        const remote = String(json?.version ?? '').trim()
        if (!remote) return
        if (cmpSemver(remote, APP_VERSION) > 0) {
          setUpdateAvailable({ remote })
        }
      } catch {
        // ignore (offline / site down)
      }
    }

    void run()
  }, [])

  useEffect(() => {
    if (route !== 'main') return
    const id = window.setInterval(() => {
      void loadAppData({ silent: true })
    }, 1000)
    return () => window.clearInterval(id)
  }, [route])

  if (route === 'menu') {
    return (
      <MainMenuPage
        onSingleplayer={() => {
          ;(backendSelection$ as any).set({ kind: 'localhost' })
          setRoute('main')
          void loadAppData()
        }}
        onMultiplayer={() => setRoute('online')}
        onWizard={() => setRoute('sshMenu')}
        onSettings={() => setRoute('settings')}
        onLanguage={() => setRoute('language')}
        onInfo={() => setRoute('info')}
        onUpgrade={() => setRoute('noPro')}
        onQuit={() => {
          void window.api.quitApp()
        }}
      />
    )
  }

  if (route === 'online') {
    return (
      <OnlineServerPage
        onBack={() => setRoute('menu')}
        onOpenSshSetup={() => setRoute('ssh')}
        onConnected={() => {
          setRoute('main')
          void loadAppData()
        }}
      />
    )
  }

  if (route === 'ssh') {
    return <SshSetupPage onBack={() => setRoute('online')} />
  }

  if (route === 'sshMenu') {
    return <SshSetupPage onBack={() => setRoute('menu')} />
  }

  if (route === 'settings') {
    return (
      <StubPage
        titleKey="settings.title"
        defaultTitle="Settings"
        onBack={() => setRoute('menu')}
      />
    )
  }

  if (route === 'language') {
    return <LanguagePage onBack={() => setRoute('menu')} />
  }

  if (route === 'info') {
    return (
      <StubPage
        titleKey="info.title"
        defaultTitle="Info"
        onBack={() => setRoute('menu')}
      />
    )
  }

  if (route === 'noPro') {
    return <NoProPage onBack={() => setRoute('menu')} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-white/10"
              onClick={() => setRoute('menu')}
            >
              <ArrowLeft size={14} className="text-slate-200/80" />
              <I18N k="main.button.menu" default="Menu" />
            </button>

            <h1 className="text-xl font-semibold tracking-tight text-white">
              <I18N k="app.title" default="VPS Studio" />
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-white/10 disabled:opacity-8"
              onClick={() => void loadAppData({ silent: true })}
              disabled={refreshing}
              title="Refresh"
            >
              <RefreshCw
                size={14}
                className={
                  refreshing
                     ? 'animate-[pulse_2s_ease-in-out_infinite] transition-all duration-1 text-slate-200'
                     : 'transition-all duration-1 text-slate-200'
                }
              />
              <I18N k="main.refresh" default="Refresh" />
            </button>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
              <I18N k="main.badge.backend" default="backend" />: {backendLabel} ·{' '}
              <I18N k="main.badge.api" default="api version" />:{' '}
              {version || '—'}
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-white/10"
              onClick={() => setRoute('online')}
              title="Connect remote server"
            >
              <Link2 size={14} className="text-slate-200/80" />
              <I18N k="main.button.connectRemote" default="Connect remote" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-200">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <I18N k="main.docker.label" default="docker" />:{' '}
            {dockerInstalled === null
              ? '—'
              : dockerInstalled
                ? <I18N k="main.docker.installed" default="installed" />
                : <I18N k="main.docker.notFound" default="not found" />}{' '}
            · <I18N k="main.docker.version" default="docker version" />:{' '}
            {dockerVersion ?? '—'}
          </span>
        </div>

        {status === 'error' ? (
          <div className="mt-6 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-100">
            {error || <I18N k="main.error.unknown" default="Unknown error" />}
          </div>
        ) : (
          <div className="mt-6 grid items-start gap-4 bp961:grid-cols-[1fr_320px]">
            <div className="flex flex-col items-center gap-4">
              <DockerContainersList
                dockerInstalled={dockerInstalled}
                ok={dockerContainersOk}
                error={dockerContainersError}
                containers={dockerContainers}
                baseUrl={baseUrl}
                onRefresh={() => loadAppData({ silent: true })}
              />

              <div className="grid justify-center gap-3 grid-cols-[repeat(2,244px)] bp681:grid-cols-[repeat(3,244px)]">
                {items.map((item) => (
                  <GridCard
                    key={item.id}
                    name={item.name}
                    launchCommand={item.launchCommand}
                    installedSoftware={item.installedSoftware}
                    disabled
                    onConnectTerminal={() => {
                      console.log('connect terminal', item.id)
                    }}
                    onDelete={() => {
                      console.log('delete', item.id)
                    }}
                  />
                ))}
              </div>
            </div>

            <RightPanel baseUrl={baseUrl} onRefresh={() => loadAppData({ silent: true })} />
          </div>
        )}
      </div>

      {updateAvailable ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div className="w-full max-w-[520px] rounded-2xl border border-white/10 bg-slate-950/95 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">
                  <I18N k="update.available.title" default="New version available" />
                </div>
                <div className="mt-1 text-xs text-slate-300">
                  <I18N
                    k="update.available.body"
                    default={`Current: ${APP_VERSION} · Latest: ${updateAvailable.remote}`}
                  />
                </div>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 hover:bg-white/10"
                onClick={() => setUpdateAvailable(null)}
              >
                <I18N k="update.available.close" default="Close" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                className="rounded-xl bg-gray-200 px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-gray-300"
                onClick={() => void window.api.openExternal('https://vps-studio.com/update/')}
              >
                <I18N k="update.available.open" default="Open update page" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
})

function RightPanel(props: { baseUrl: string; onRefresh: () => Promise<void> | void }) {
  const [quickBusy, setQuickBusy] = useState<QuickActionId | null>(null)
  const [quickError, setQuickError] = useState('')
  const [customizeOpen, setCustomizeOpen] = useState<QuickActionId | null>(null)
  const [customDockerRun, setCustomDockerRun] = useState('')
  const [customCommands, setCustomCommands] = useState<Array<{ id: string; text: string }>>([])

  const customizeTemplate = customizeOpen
    ? (quickTemplates.find((t) => (t as any).id === customizeOpen) as any | undefined)
    : undefined
  const customizeInstructions = customizeTemplate?.instructions?.()

  const makeListId = () =>
    (globalThis.crypto && 'randomUUID' in globalThis.crypto
      ? (globalThis.crypto as Crypto).randomUUID()
      : `${Date.now().toString(16)}-${Math.random().toString(16).slice(2, 8)}`)

  useEffect(() => {
    if (!customizeOpen || !customizeInstructions) return
    setCustomDockerRun(String(customizeInstructions.dockerRun ?? ''))
    setCustomCommands(
      (customizeInstructions.commands ?? []).map((text: string) => ({
        id: makeListId(),
        text: String(text ?? '')
      }))
    )
  }, [customizeOpen])

  const moveCommand = (idx: number, dir: -1 | 1) => {
    setCustomCommands((prev) => {
      const next = prev.slice()
      const j = idx + dir
      if (idx < 0 || idx >= next.length) return prev
      if (j < 0 || j >= next.length) return prev
      const tmp = next[idx]
      next[idx] = next[j]
      next[j] = tmp
      return next
    })
  }

  const runQuick = async (id: QuickActionId) => {
    if (!props.baseUrl) return
    setQuickBusy(id)
    setQuickError('')
    try {
      const body = QuickActionRunRequestSchema.parse({ id })
      const res = await fetch(`${props.baseUrl}/vps-studio/quick-actions/run`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
      })
      const json = await res.json()
      const parsed = QuickActionRunResponseSchema.parse(json)
      if (!parsed.ok) throw new Error(parsed.error ?? 'Failed')
      await props.onRefresh()
    } catch (e) {
      setQuickError(e instanceof Error ? e.message : String(e))
    } finally {
      setQuickBusy(null)
    }
  }

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur bp961:sticky bp961:top-6 bp961:self-start">
        <div className="flex flex-col p-4">
          <div className="text-xs font-semibold tracking-wide text-slate-200">
            <I18N k="main.panel.title" default="Actions" />
          </div>

          <div className="mt-3 grid gap-2">
            <PanelButton
              icon={<PlusSquare size={16} />}
              label={<I18N k="main.panel.createNew" default="Create new container" />}
              onClick={() => console.log('create new container')}
            />
            <PanelButton
              icon={<Sparkles size={16} />}
              label={
                <I18N k="main.panel.createHackathon" default="Create hackathon container" />
              }
              onClick={() => console.log('create hackathon container')}
            />
            <PanelButton
              icon={<Boxes size={16} />}
              label={<I18N k="main.panel.presets" default="Ready containers" />}
              onClick={() => console.log('open presets')}
            />
          </div>

          <div className="mt-6">
            <div className="mb-2 text-xs font-semibold tracking-wide text-slate-300">
              <I18N k="main.panel.quickActions" default="Quick deploy" />
            </div>
            {quickError ? <div className="mb-2 text-xs text-amber-200">{quickError}</div> : null}
            <div className="grid grid-cols-3 gap-2">
              <QuickActionButton
                icon={<Terminal size={22} className="text-white" />}
                iconBgClass="bg-gradient-to-br from-purple-600 to-orange-500"
                label={<I18N k="main.quick.ubuntu" default="Ubuntu" />}
                onClick={() => void runQuick('ubuntu')}
                onCustomize={() => setCustomizeOpen('ubuntu')}
                disabled={quickBusy !== null}
              />
              <QuickActionButton
                icon={<Database size={22} className="text-white" />}
                iconBgClass="bg-gradient-to-br from-sky-600 to-blue-800"
                label={<I18N k="main.quick.postgres" default="Postgres" />}
                onClick={() => void runQuick('postgres')}
                onCustomize={() => setCustomizeOpen('postgres')}
                disabled={quickBusy !== null}
              />
              <QuickActionButton
                icon={<Gamepad2 size={22} className="text-white" />}
                iconBgClass="bg-gradient-to-br from-emerald-500 to-green-700"
                label={<I18N k="main.quick.minecraft" default="Minecraft server" />}
                onClick={() => void runQuick('minecraft')}
                disabled={true}
              />
              <QuickActionButton
                icon={<Leaf size={22} className="text-white" />}
                iconBgClass="bg-gradient-to-br from-red-500 to-rose-700"
                label={<I18N k="main.quick.laravel" default="Laravel" />}
                onClick={() => void runQuick('laravel')}
                disabled={true}
              />
              <QuickActionButton
                icon={<Coffee size={22} className="text-white" />}
                iconBgClass="bg-gradient-to-br from-green-500 to-emerald-800"
                label={<I18N k="main.quick.spring" default="Spring Boot" />}
                onClick={() => void runQuick('spring')}
                disabled={true}
              />
              <QuickActionButton
                icon={<Atom size={22} className="text-white" />}
                iconBgClass="bg-gradient-to-br from-cyan-500 to-sky-700"
                label={<I18N k="main.quick.react" default="React" />}
                onClick={() => void runQuick('react')}
                onCustomize={() => setCustomizeOpen('react')}
                disabled={quickBusy !== null}
              />
              <QuickActionButton
                icon={<FunctionSquare size={22} className="text-white" />}
                iconBgClass="bg-gradient-to-br from-amber-400 to-yellow-600"
                label={<I18N k="main.quick.function" default="Function" />}
                onClick={() => void runQuick('function')}
                disabled={true}
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 text-xs font-semibold tracking-wide text-slate-300">
              <I18N k="main.panel.market" default="Marketplace" />
            </div>
            <div className="grid gap-2">
              <PanelButton
                icon={<Globe size={16} />}
                subtle
                label={<I18N k="main.panel.regDomain" default="Order domain on reg.ru" />}
                onClick={() => void window.api.openExternal('https://www.reg.ru/domain/new')}
              />
              <PanelButton
                icon={<HardDrive size={16} />}
                subtle
                label={<I18N k="main.panel.regHosting" default="Order hosting on reg.ru" />}
                onClick={() => void window.api.openExternal('https://www.reg.ru/hosting')}
              />
              <PanelButton
                icon={<Server size={16} />}
                subtle
                label={<I18N k="main.panel.sponsorVps" default="Order VPS on hip.hosting" />}
                onClick={() => void window.api.openTimewebWindow()}
              />
            </div>
          </div>
        </div>
      </div>

      {customizeOpen && customizeInstructions ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div className="w-full max-w-[720px] rounded-2xl border border-white/10 bg-slate-950/95 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-white">
                  {customizeInstructions.title}
                </div>
                <div className="mt-1 text-xs text-slate-300">
                  {customizeInstructions.description}
                </div>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 hover:bg-white/10"
                onClick={() => setCustomizeOpen(null)}
              >
                <I18N k="main.quick.close" default="Close" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-200">
              <div>
                <div className="mb-1 text-[11px] font-semibold tracking-wide text-slate-400">
                  <I18N k="main.quick.dockerRun" default="Docker run" />
                </div>
                <textarea
                  value={customDockerRun}
                  onChange={(e) => setCustomDockerRun(e.target.value)}
                  spellCheck={false}
                  rows={3}
                  className="block w-full resize-y whitespace-pre-wrap rounded-xl border border-white/10 bg-black/30 p-3 font-mono text-[11px] text-slate-100 outline-none focus:border-white/20"
                />
              </div>

              <div>
                <div>
                  <div className="mb-1 text-[11px] font-semibold tracking-wide text-slate-400">
                    <I18N k="main.quick.commands" default="Commands (paste into terminal)" />
                  </div>
                  <div className="space-y-2">
                    {customCommands.map((cmd, idx) => (
                      <div
                        key={cmd.id}
                        className="flex items-stretch gap-2 rounded-xl border border-white/10 bg-black/30 p-2"
                      >
                        <div className="flex flex-col gap-1">
                          <button
                            type="button"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 disabled:opacity-40"
                            onClick={() => moveCommand(idx, -1)}
                            disabled={idx === 0}
                            title="Move up"
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            type="button"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 disabled:opacity-40"
                            onClick={() => moveCommand(idx, 1)}
                            disabled={idx === customCommands.length - 1}
                            title="Move down"
                          >
                            <ChevronDown size={14} />
                          </button>
                        </div>

                        <textarea
                          value={cmd.text}
                          onChange={(e) => {
                            const v = e.target.value
                            setCustomCommands((prev) => {
                              const next = prev.slice()
                              next[idx] = { ...next[idx], text: v }
                              return next
                            })
                          }}
                          spellCheck={false}
                          rows={2}
                          className="min-h-[44px] w-full resize-y rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-[11px] text-slate-100 outline-none focus:border-white/20"
                        />

                        <button
                          type="button"
                          className="inline-flex h-8 items-center justify-center rounded-lg border border-red-400/20 bg-red-500/10 px-2 text-[11px] font-semibold text-red-100 hover:bg-red-500/20"
                          onClick={() => {
                            setCustomCommands((prev) => prev.filter((x) => x.id !== cmd.id))
                          }}
                          title="Delete"
                        >
                          <I18N k="main.quick.deleteCommand" default="Delete" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-200 hover:bg-white/10"
                      onClick={() =>
                        setCustomCommands((prev) => [...prev, { id: makeListId(), text: '' }])
                      }
                    >
                      <I18N k="main.quick.addCommand" default="Add command" />
                    </button>
                  </div>
                </div>
              </div>

              {customizeInstructions.notes?.length ? (
                <div>
                  <div className="mb-1 text-[11px] font-semibold tracking-wide text-slate-400">
                    <I18N k="main.quick.notes" default="Notes" />
                  </div>
                  <ul className="list-disc space-y-1 pl-5 text-[11px] text-slate-300">
                    {customizeInstructions.notes.map((n: string) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

function DockerContainersList(props: {
  dockerInstalled: boolean | null
  ok: boolean | null
  error: string
  containers: Array<{
    id: string
    name: string
    image: string
    status: string
    ports?: string
  }>
  baseUrl: string
  onRefresh: () => Promise<void> | void
}) {
  const [busy, setBusy] = useState<{ id: string; action: 'start' | 'stop' | 'delete' } | null>(
    null
  )
  const [actionError, setActionError] = useState('')

  const splitDockerStatus = (status: string): { state: string; lifetime: string } => {
    const s = String(status ?? '').trim()
    if (!s) return { state: '—', lifetime: '' }

    const up = s.match(/^Up\s+(.+)$/i)
    if (up) return { state: 'Up', lifetime: up[1]?.trim() ?? '' }

    const exited = s.match(/^(Exited(?:\s*\([^)]+\))?)\s+(.+)$/i)
    if (exited) return { state: exited[1]?.trim() ?? 'Exited', lifetime: exited[2]?.trim() ?? '' }

    const restarting = s.match(/^(Restarting(?:\s*\([^)]+\))?)\s+(.+)$/i)
    if (restarting)
      return { state: restarting[1]?.trim() ?? 'Restarting', lifetime: restarting[2]?.trim() ?? '' }

    const paused = s.match(/^(Paused)\s+(.+)$/i)
    if (paused) return { state: paused[1], lifetime: paused[2]?.trim() ?? '' }

    // Fallback: try to split "... <time ago>" into state + lifetime
    const ago = s.match(/^(.*?)(\b\d+.*\bago)$/i)
    if (ago) return { state: ago[1]?.trim() ?? s, lifetime: ago[2]?.trim() ?? '' }

    return { state: s, lifetime: '' }
  }

  const resolvePortsUrl = (ports: string) => {
    const trimmed = String(ports ?? '').trim()
    if (!trimmed) return null

    // docker ps Ports examples:
    // - "0.0.0.0:8080->80/tcp, :::8080->80/tcp"
    // - "127.0.0.1:5432->5432/tcp"
    // - "80/tcp" (no published port)
    const m = trimmed.match(/:(\d+)->/)
    const hostPort = m?.[1]
    if (!hostPort) return null

    try {
      const base = new URL(props.baseUrl)
      const proto = base.protocol || 'http:'
      const host = base.hostname || '127.0.0.1'
      return `${proto}//${host}:${hostPort}`
    } catch {
      return `http://127.0.0.1:${hostPort}`
    }
  }

  const runAction = async (id: string, action: 'start' | 'stop' | 'delete') => {
    if (!props.baseUrl) return
    setBusy({ id, action })
    setActionError('')
    try {
      if (action === 'delete') {
        const res = await fetch(
          `${props.baseUrl}/vps-studio/docker/containers/${encodeURIComponent(id)}`,
          { method: 'DELETE' }
        )
        const json = await res.json()
        const parsed = DockerRemoveContainerResponseSchema.parse(json)
        if (!parsed.ok) throw new Error(parsed.error ?? 'Failed')
      } else {
        const res = await fetch(
          `${props.baseUrl}/vps-studio/docker/containers/${encodeURIComponent(id)}/${action}`,
          { method: 'POST' }
        )
        const json = await res.json()
        const parsed = DockerContainerActionResponseSchema.parse(json)
        if (!parsed.ok) throw new Error(parsed.error ?? 'Failed')
      }
      await props.onRefresh()
    } catch (e) {
      setActionError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="w-full max-w-[760px] rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-semibold tracking-wide text-slate-200">
          <I18N k="main.dockerContainers.title" default="Running docker containers" />
        </div>
        {props.ok ? (
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-200">
            {props.containers.length}
          </span>
        ) : null}
      </div>

      {actionError ? (
        <div className="mt-2 text-xs text-amber-200">{actionError}</div>
      ) : null}

      {props.dockerInstalled === false ? (
        <div className="mt-3 text-xs text-slate-300">
          <I18N
            k="main.dockerContainers.noDocker"
            default="Docker is not installed — nothing to show."
          />
        </div>
      ) : props.ok === false ? (
        <div className="mt-3 text-xs text-amber-200">
          <I18N
            k="main.dockerContainers.error"
            default="Couldn't load docker containers."
          />{' '}
          {props.error ? <span className="text-amber-100/80">{props.error}</span> : null}
        </div>
      ) : props.ok === true && props.containers.length === 0 ? (
        <div className="mt-3 text-xs text-slate-300">
          <I18N
            k="main.dockerContainers.empty"
            default="No running containers."
          />
        </div>
      ) : (
        <ul className="mt-3 space-y-2">
          {props.containers.map((c) => (
            (() => {
              const isRunning = /^up\b/i.test(c.status.trim())
              const isBusy = busy?.id === c.id
              const { state, lifetime } = splitDockerStatus(c.status)
              return (
            <li
              key={c.id}
              className="rounded-xl border border-white/10 bg-black/20 px-3 py-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-white">
                    {c.name}
                  </div>
                  <div className="truncate text-[10px] text-slate-300/90">
                    {c.image}
                    {lifetime ? <span className="text-slate-400/80"> · {lifetime}</span> : null}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {c.ports ? (
                    (() => {
                      const url = resolvePortsUrl(c.ports)
                      return url ? (
                        <button
                          type="button"
                          onClick={() => void window.api.openExternal(url)}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-200 hover:bg-white/10"
                          title={url}
                        >
                          {c.ports}
                        </button>
                      ) : (
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-200">
                          {c.ports}
                        </span>
                      )
                    })()
                  ) : null}
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-200">
                    {state}
                  </span>

                  <button
                    type="button"
                    disabled={!isRunning || isBusy}
                    onClick={() => void window.api.openDockerContainerTerminal(c.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-200 hover:bg-white/10 disabled:opacity-40"
                    title="Connect to container terminal"
                  >
                    <Terminal size={12} className="text-slate-200/80" />
                    <I18N k="main.dockerContainers.terminal" default="Terminal" />
                  </button>
                  <button
                    type="button"
                    disabled={!isRunning || isBusy}
                    onClick={() => void runAction(c.id, 'stop')}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-200 hover:bg-white/10 disabled:opacity-40"
                  >
                    <I18N k="main.dockerContainers.stop" default="Stop" />
                  </button>
                  <button
                    type="button"
                    disabled={isRunning || isBusy}
                    onClick={() => void runAction(c.id, 'start')}
                    className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-100 hover:bg-emerald-400/15 disabled:opacity-40"
                  >
                    <I18N k="main.dockerContainers.start" default="Start" />
                  </button>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => void runAction(c.id, 'delete')}
                    className="rounded-full border border-red-400/20 bg-red-500/10 px-2.5 py-1 text-[11px] font-semibold text-red-100 hover:bg-red-500/20 disabled:opacity-40"
                  >
                    <I18N k="main.dockerContainers.delete" default="Delete" />
                  </button>
                </div>
              </div>
            </li>
              )
            })()
          ))}
        </ul>
      )}
    </div>
  )
}

function PanelButton(props: {
  icon: React.ReactNode
  label: React.ReactNode
  onClick: () => void
  subtle?: boolean
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={[
        'flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left text-xs',
        props.subtle
          ? 'border-white/10 bg-black/20 text-slate-200 hover:bg-black/25'
          : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
      ].join(' ')}
    >
      <span className="flex min-w-0 items-center gap-2">
        <span className="opacity-90">{props.icon}</span>
        <span className="min-w-0 truncate">{props.label}</span>
      </span>
      <span className="text-slate-500">{"->"}</span>
    </button>
  )
}

function QuickActionButton(props: {
  icon: React.ReactNode
  iconBgClass: string
  label: React.ReactNode
  onClick: () => void
  onCustomize?: () => void
  disabled?: boolean
}) {
  return (
    <div
      className={[
        'relative group aspect-square rounded-xl border border-white/10 bg-black/20',
        props.disabled ? 'opacity-40' : 'hover:bg-black/25'
      ].join(' ')}
    >
      <button
        type="button"
        onClick={props.onClick}
        disabled={props.disabled}
        className="flex h-full w-full flex-col items-center justify-center gap-2 p-3 text-center text-[10px] text-slate-100"
      >
        <span className={['rounded-xl p-2 shadow-sm', props.iconBgClass].join(' ')}>
          {props.icon}
        </span>
        <span
          className="w-full truncate whitespace-nowrap leading-tight"
          title={typeof props.label === 'string' ? props.label : undefined}
        >
          {props.label}
        </span>
      </button>

      {props.onCustomize ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          <button
            type="button"
            disabled={props.disabled}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              props.onCustomize?.()
            }}
            className="pointer-events-auto w-full rounded-b-xl bg-gray-200 py-1 text-[10px] font-semibold text-slate-900 hover:bg-gray-300 disabled:opacity-40"
          >
            <I18N k="main.quick.customize" default="Customize" />
          </button>
        </div>
      ) : null}
    </div>
  )
}

function GridCard(props: {
  name: string
  launchCommand: string
  installedSoftware: Array<{ name: string; version: string }>
  disabled?: boolean
  onConnectTerminal: () => void
  onDelete: () => void
}) {
  return (
    <div
      className={[
        'relative w-[244px] rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur',
        props.disabled ? 'opacity-45' : ''
      ].join(' ')}
    >
      {props.disabled ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-xs font-semibold tracking-wide text-slate-200">
          <I18N k="main.vps.locked" default="Locked" />
        </div>
      ) : null}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
        <div className="text-xs font-medium text-slate-200">
          <I18N k="card.header" default="VPS" />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 hover:bg-white/10"
            onClick={props.onConnectTerminal}
            disabled={props.disabled}
          >
            <I18N k="card.button.terminal" default="Terminal" />
          </button>
          <button
            type="button"
            className="rounded-lg border border-red-400/20 bg-red-500/10 px-2 py-1 text-xs text-red-100 hover:bg-red-500/20"
            onClick={props.onDelete}
            disabled={props.disabled}
          >
            <I18N k="card.button.delete" default="Delete" />
          </button>
        </div>
      </div>

      <div className="p-3">
        <div className="truncate text-sm font-semibold text-white">
          {props.name}
        </div>
        <div className="mt-1 text-xs text-slate-300">
          <span className="text-slate-400">
            <I18N k="card.cmd" default="cmd" />:
          </span>{' '}
          <code className="rounded bg-black/30 px-1.5 py-0.5 text-slate-200">
            {props.launchCommand}
          </code>
        </div>

        <div className="mt-3">
          <div className="text-[11px] font-medium text-slate-400">
            <I18N k="card.installedSoftware" default="Installed software" />
          </div>
          <ul className="mt-2 space-y-1 text-[11px] text-slate-200">
            {props.installedSoftware.map((sw) => (
              <li
                key={`${sw.name}@${sw.version}`}
                className="flex items-baseline justify-between gap-3 border-b border-dotted border-white/10 pb-1"
              >
                <span className="min-w-0 truncate">{sw.name}</span>
                <span className="flex-none font-mono text-slate-400">
                  {sw.version}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}


