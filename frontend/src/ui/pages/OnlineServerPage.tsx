import { useMemo, useState } from 'react'

import { backendSelection$ } from '../../state/backendState'
import { I18N, useLocale, useLocalized } from '../../i18n/localize'

function normalizeUrl(input: string) {
  const trimmed = input.trim()
  if (!trimmed) return null
  const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`
  try {
    const u = new URL(withProto)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null
    return u.toString().replace(/\/$/, '')
  } catch {
    return null
  }
}

export function OnlineServerPage(props: {
  onBack: () => void
  onConnected: () => void
  onOpenSshSetup: () => void
}) {
  const initial = backendSelection$.get()
  const [urlInput, setUrlInput] = useState(
    initial.kind === 'url' ? initial.url : ''
  )
  const normalized = useMemo(() => normalizeUrl(urlInput), [urlInput])
  const { locale } = useLocale()
  const placeholder = useLocalized(
    'online.direct.placeholder',
    locale,
    'example.com:8080 (http/https optional)'
  )

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,#223_0%,#0b1020_55%,#050814_100%)]">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xl font-black tracking-widest text-slate-100">
              <I18N k="online.title" default="ONLINE" />
            </div>
            <div className="mt-1 text-xs font-medium tracking-[0.35em] text-slate-400">
              <I18N k="online.subtitle" default="SERVER SELECT" />
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
          <div className="text-sm font-bold tracking-wide text-slate-100">
            <I18N k="online.direct.title" default="Direct connect" />
          </div>
          <div className="mt-3 flex gap-2">
            <input
              className="w-full rounded-md border border-black/60 bg-black/30 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              placeholder={placeholder}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <button
              type="button"
              disabled={!normalized}
              className="rounded-md border border-black/60 bg-gradient-to-b from-emerald-300/15 to-emerald-900/25 px-4 py-2 text-xs font-bold tracking-wide text-emerald-50 shadow-[0_2px_0_0_rgba(0,0,0,0.65)] hover:from-emerald-300/20 hover:to-emerald-900/30 disabled:opacity-50 active:translate-y-[1px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.65)]"
              onClick={() => {
                if (!normalized) return
                ;(backendSelection$ as any).set({ kind: 'url', url: normalized })
                props.onConnected()
              }}
            >
              <I18N k="online.direct.enter" default="Enter" />
            </button>
          </div>
          {!normalized && urlInput.trim().length > 0 ? (
            <div className="mt-2 text-xs text-amber-200/90">
              <I18N
                k="online.direct.invalidUrl"
                default="Enter a valid http/https URL (scheme optional)"
              />
            </div>
          ) : null}
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="w-full rounded-md border border-black/60 bg-gradient-to-b from-slate-200/10 to-black/30 px-5 py-4 text-left shadow-[0_2px_0_0_rgba(0,0,0,0.65)] hover:from-slate-200/15 hover:to-black/35 active:translate-y-[1px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.65)]"
            onClick={props.onOpenSshSetup}
          >
            <div className="text-sm font-bold tracking-wide text-slate-100">
              <I18N k="online.sshSetup.title" default="Setup server via SSH" />
            </div>
            <div className="mt-1 text-xs text-slate-300/80">
              <I18N
                k="online.sshSetup.subtitle"
                default="Install and configure backend on your remote machine (stub)"
              />
            </div>
          </button>
        </div>

        <div className="mt-3">
          <button
            type="button"
            className="w-full rounded-md border border-emerald-500/30 bg-gradient-to-b from-emerald-400/20 to-emerald-900/25 px-5 py-4 text-left shadow-[0_2px_0_0_rgba(0,0,0,0.65)] hover:from-emerald-400/25 hover:to-emerald-900/30 active:translate-y-[1px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.65)]"
            onClick={() => {
              void window.api.openTimewebWindow()
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-bold tracking-wide text-emerald-50">
                <I18N k="online.sponsorHosting.title" default="Order hosting on HIP HOSTING" />
              </div>
              <span className="rounded-full border border-emerald-300/40 bg-emerald-300/15 px-3 py-1 text-[11px] font-bold tracking-wide text-emerald-50">
                <I18N k="online.timeweb.badge" default="Popular" />
              </span>
            </div>
            <div className="mt-1 text-xs text-emerald-50/80">
              <I18N
                k="online.timeweb.subtitle"
                default="Fast purchase and instant access in your browser"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}


