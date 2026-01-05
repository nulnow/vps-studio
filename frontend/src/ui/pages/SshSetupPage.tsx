import { observer } from '@legendapp/state/react'
import { useEffect, useMemo, useState } from 'react'

import type { SetupEvent, SetupResult } from '../../../../interface/server-setup'
import type { ServerSetupRequest } from '../../../../interface/server-setup'
import { I18N, useLocale, useLocalized } from '../../i18n/localize'

export function SshSetupPage(props: { onBack: () => void }) {
  return <SshSetupInner onBack={props.onBack} />
}

const SshSetupInner = observer(function SshSetupInner(props: { onBack: () => void }) {
  const [host, setHost] = useState('')
  const [port, setPort] = useState(22)
  const [username, setUsername] = useState('root')
  const [authType, setAuthType] = useState<'password' | 'key'>('password')
  const [password, setPassword] = useState('')
  const [keyPath, setKeyPath] = useState<string | null>(null)
  const [passphrase, setPassphrase] = useState('')

  const [jobId, setJobId] = useState<string | null>(null)
  const [events, setEvents] = useState<SetupEvent[]>([])
  const [result, setResult] = useState<SetupResult | null>(null)
  const { locale } = useLocale()
  const optionalText = useLocalized('ssh.form.optional', locale, '(optional)')
  const genericErrorTitle = useLocalized('main.error.unknown', locale, 'Error')

  const canStart = useMemo(() => {
    if (!host.trim()) return false
    if (!username.trim()) return false
    if (!Number.isFinite(port) || port <= 0 || port > 65535) return false
    if (authType === 'password') return password.length > 0
    return !!keyPath
  }, [host, username, port, authType, password, keyPath])

  useEffect(() => {
    const unsubEvent = window.api.onServerSetupEvent((e) => {
      setEvents((prev) =>
        prev.length > 500 ? [...prev.slice(-250), e] : [...prev, e]
      )
    })
    const unsubResult = window.api.onServerSetupResult((r) => setResult(r))
    return () => {
      unsubEvent()
      unsubResult()
    }
  }, [])

  const start = async () => {
    setEvents([])
    setResult(null)

    const req: ServerSetupRequest = {
      host: host.trim(),
      port,
      username: username.trim(),
      auth:
        authType === 'password'
          ? { type: 'password', password }
          : {
              type: 'key',
              keyPath: keyPath!,
              passphrase: passphrase ? passphrase : undefined
            }
    }

    const started = await window.api.startServerSetup(req)
    setJobId(started.jobId)
  }

  const visibleEvents = useMemo(() => {
    if (!jobId) return events
    return events.filter((e) => e.jobId === jobId)
  }, [events, jobId])

  const isUnsupported =
    !!result?.error && result.error.toLowerCase().startsWith('unsupported os')

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,#223_0%,#0b1020_55%,#050814_100%)]">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xl font-black tracking-widest text-slate-100">
              <I18N k="ssh.control.title" default="Take server under control" />
            </div>
            <div className="mt-1 text-xs font-medium tracking-[0.35em] text-slate-400">
              <I18N k="ssh.control.subtitle" default="Connect over SSH and install the agent" />
            </div>
          </div>
          <button
            type="button"
            className="rounded-md border border-black/60 bg-gradient-to-b from-slate-200/10 to-black/30 px-4 py-2 text-xs font-bold tracking-wide text-slate-100 shadow-[0_2px_0_0_rgba(0,0,0,0.65)] hover:from-slate-200/15 hover:to-black/35 active:translate-y-[1px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.65)]"
            onClick={props.onBack}
          >
            <I18N k="common.back" default="Back" />
          </button>
        </div>

        <div className="mt-8 rounded-md border border-black/60 bg-black/20 p-5 shadow-[0_2px_0_0_rgba(0,0,0,0.65)]">
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="block">
              <div className="text-xs font-bold tracking-wide text-slate-200">
                <I18N k="ssh.form.host" default="Host" />
              </div>
              <input
                className="mt-1 w-full rounded-md border border-black/60 bg-black/30 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                placeholder="1.2.3.4"
              />
            </label>

            <label className="block">
              <div className="text-xs font-bold tracking-wide text-slate-200">
                <I18N k="ssh.form.port" default="Port" />
              </div>
              <input
                type="number"
                className="mt-1 w-full rounded-md border border-black/60 bg-black/30 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                value={port}
                onChange={(e) => setPort(Number(e.target.value))}
              />
            </label>

            <label className="block">
              <div className="text-xs font-bold tracking-wide text-slate-200">
                <I18N k="ssh.form.username" default="Username" />
              </div>
              <input
                className="mt-1 w-full rounded-md border border-black/60 bg-black/30 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className={[
                'rounded-md border border-black/60 px-4 py-2 text-xs font-bold tracking-wide shadow-[0_2px_0_0_rgba(0,0,0,0.65)] active:translate-y-[1px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.65)]',
                authType === 'password'
                  ? 'bg-gradient-to-b from-emerald-300/15 to-emerald-900/25 text-emerald-50'
                  : 'bg-gradient-to-b from-slate-200/10 to-black/30 text-slate-100 hover:from-slate-200/15 hover:to-black/35'
              ].join(' ')}
              onClick={() => setAuthType('password')}
            >
              <I18N k="ssh.form.auth.password" default="Password" />
            </button>
            <button
              type="button"
              className={[
                'rounded-md border border-black/60 px-4 py-2 text-xs font-bold tracking-wide shadow-[0_2px_0_0_rgba(0,0,0,0.65)] active:translate-y-[1px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.65)]',
                authType === 'key'
                  ? 'bg-gradient-to-b from-emerald-300/15 to-emerald-900/25 text-emerald-50'
                  : 'bg-gradient-to-b from-slate-200/10 to-black/30 text-slate-100 hover:from-slate-200/15 hover:to-black/35'
              ].join(' ')}
              onClick={() => setAuthType('key')}
            >
              <I18N k="ssh.form.auth.key" default="SSH key" />
            </button>
          </div>

          {authType === 'password' ? (
            <label className="mt-4 block">
              <div className="text-xs font-bold tracking-wide text-slate-200">
                <I18N k="ssh.form.password" default="Password" />
              </div>
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-black/60 bg-black/30 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <div className="text-xs font-bold tracking-wide text-slate-200">
                  <I18N k="ssh.form.key" default="SSH key" />
                </div>
                <div className="mt-1 rounded-md border border-black/60 bg-black/30 px-3 py-2 text-sm text-slate-100">
                  {keyPath ?? <I18N k="ssh.form.noKey" default="No key selected" />}
                </div>
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  className="w-full rounded-md border border-black/60 bg-gradient-to-b from-slate-200/10 to-black/30 px-4 py-2 text-xs font-bold tracking-wide text-slate-100 shadow-[0_2px_0_0_rgba(0,0,0,0.65)] hover:from-slate-200/15 hover:to-black/35 active:translate-y-[1px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.65)]"
                  onClick={async () => {
                    const picked = await window.api.pickSshKey()
                    if (picked) setKeyPath(picked)
                  }}
                >
                  <I18N k="ssh.form.chooseKey" default="Choose key" />
                </button>
              </div>

              <label className="block sm:col-span-3">
                <div className="text-xs font-bold tracking-wide text-slate-200">
                  <I18N k="ssh.form.passphrase" default="Passphrase" />
                </div>
                <input
                  type="password"
                  className="mt-1 w-full rounded-md border border-black/60 bg-black/30 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder={optionalText}
                />
              </label>
            </div>
          )}

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={!canStart}
              className="rounded-md border border-black/60 bg-gradient-to-b from-emerald-300/15 to-emerald-900/25 px-5 py-3 text-xs font-bold tracking-wide text-emerald-50 shadow-[0_2px_0_0_rgba(0,0,0,0.65)] hover:from-emerald-300/20 hover:to-emerald-900/30 disabled:opacity-50 active:translate-y-[1px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.65)]"
              onClick={() => void start()}
            >
              <I18N k="ssh.form.start" default="Start setup" />
            </button>
            <div className="text-xs text-slate-400">
              {jobId ? `job: ${jobId}` : null}
            </div>
          </div>

          {result && !result.ok ? (
            <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-100">
              <div className="font-bold">
                {isUnsupported ? (
                  <I18N k="ssh.unsupported.title" default="Unsupported server" />
                ) : (
                  genericErrorTitle
                )}
              </div>
              <div className="mt-1 text-xs">
                {isUnsupported ? (
                  <I18N
                    k="ssh.unsupported.body"
                    default="No suitable strategy found for this OS/version."
                  />
                ) : null}{' '}
                {result.error ? `(${result.error})` : null}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-6 rounded-md border border-black/60 bg-black/20 p-5 shadow-[0_2px_0_0_rgba(0,0,0,0.65)]">
          <div className="text-sm font-bold tracking-wide text-slate-100">
            <I18N k="ssh.progress.title" default="Progress" />
          </div>
          <div className="mt-3 max-h-[320px] overflow-auto rounded-md border border-black/60 bg-black/30 p-3 text-xs text-slate-200">
            {events.length === 0 ? (
              <div className="text-slate-500">—</div>
            ) : (
              <div className="space-y-1">
                {visibleEvents.map((e, idx) => (
                  <div key={`${e.jobId}-${idx}`} className="font-mono">
                    <span className="text-slate-400">[{e.step}]</span>{' '}
                    <span
                      className={
                        e.status === 'error'
                          ? 'text-red-200'
                          : e.status === 'success'
                            ? 'text-emerald-200'
                            : 'text-slate-200'
                      }
                    >
                      {e.status}
                    </span>{' '}
                    {e.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})


