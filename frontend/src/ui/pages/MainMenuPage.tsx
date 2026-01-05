import type { ReactNode } from 'react'
import { Languages } from 'lucide-react'

import { I18N } from '../../i18n/localize'

export function MainMenuPage(props: {
  onSingleplayer: () => void
  onMultiplayer: () => void
  onWizard: () => void
  onSettings: () => void
  onLanguage: () => void
  onInfo: () => void
  onUpgrade: () => void
  onQuit: () => void
}) {
  return (
    <div className="min-h-screen select-none bg-[radial-gradient(ellipse_at_top,#223_0%,#0b1020_55%,#050814_100%)]">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10">
        <div className="flex items-center justify-between gap-3 text-[11px] text-slate-400 mb-20">
          <div className="text-green-500">
            <I18N k="menu.license" default="License: Community Edition (free forever)" />
          </div>
          <button
            type="button"
            className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold tracking-wide text-slate-300 shadow-[0_2px_0_0_rgba(0,0,0,0.65)] hover:border-white/15 hover:bg-white/10 hover:text-slate-200 active:translate-y-[1px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.65)]"
            onClick={props.onUpgrade}
          >
            <span className="text-slate-200/90">
              {"🤮 "}
              <I18N k="menu.upgrade" default="Upgrade to Pro" />
              {" 👎"}
            </span>
            <br />
            <span className="text-slate-400 font-normal">
              <I18N k="menu.upgrade.subtitle" default="Eww money :(((" />
            </span>
          </button>
        </div>

        <div className="text-center">
          <div className="text-3xl font-black tracking-widest text-slate-100">
            <I18N k="app.title" default="VPS Studio" />
          </div>
          <div className="mt-2 text-xs font-medium tracking-[0.35em] text-slate-400">
            <I18N k="menu.subtitle" default="MENU" />
          </div>
        </div>

        <div className="mt-10 space-y-3">
          <MenuButton
            onClick={props.onSingleplayer}
            titleKey="menu.localhost.title"
            defaultTitle="Localhost"
            subtitleKey="menu.localhost.subtitle"
            defaultSubtitle="Use embedded backend on this machine"
            rightSlot={
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-bold text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <I18N k="menu.status.online" default="connected" />
              </span>
            }
          />
          <MenuButton
            onClick={props.onMultiplayer}
            titleKey="menu.remoteServer.title"
            defaultTitle="Remote server"
            subtitleKey="menu.remoteServer.subtitle"
            defaultSubtitle="Connect to a remote server"
          />
          <button
            type="button"
            onClick={props.onWizard}
            className="group relative w-full overflow-hidden rounded-md border border-white/20 bg-black/20 px-5 py-4 text-left shadow-[0_2px_0_0_rgba(0,0,0,0.65)] hover:border-white/30 active:translate-y-[1px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.65)]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-rose-500/35 via-amber-400/30 via-emerald-400/25 via-sky-400/30 to-fuchsia-500/35"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/55 group-hover:from-black/5 group-hover:via-black/20 group-hover:to-black/45"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_60%)]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_0_40px_rgba(168,85,247,0.15)]"
            />
            <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-bold tracking-wide text-purple-50">
                <I18N k="menu.wizzard.title" default="Wizzard" />
              </div>
              <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                <I18N k="menu.wizzard.badge" default="Setup" />
              </span>
            </div>
            <div className="mt-1 text-xs text-purple-50/80">
              <I18N
                k="menu.wizzard.subtitle"
                default="I don't want to dig in — just guide me step by step"
              />
            </div>
            </div>
          </button>
        </div>

        <div className="mt-auto pt-10">
          <div className="grid grid-cols-4 gap-3">
            <SmallButton
              onClick={props.onSettings}
              labelKey="menu.settings"
              defaultLabel="Settings"
            />
            <SmallButton
              onClick={props.onLanguage}
              labelKey="menu.language"
              defaultLabel="Language"
              icon={<Languages size={16} />}
            />
            <SmallButton onClick={props.onInfo} labelKey="menu.info" defaultLabel="Info" />
            <SmallButton
              onClick={props.onQuit}
              labelKey="menu.quit"
              defaultLabel="Quit"
              danger
            />
          </div>
          <div className="mt-4 text-center text-[11px] text-slate-500">
            <button
              type="button"
              className="cursor-pointer text-slate-400 hover:text-slate-200 hover:underline"
              onClick={() => void window.api.openExternal('https://vps-studio.com')}
            >
              vps-studio.com
            </button>{' '}
            2026 <I18N k="menu.footer.rights" default="all rights reserved." />
          </div>
        </div>
      </div>
    </div>
  )
}

function MenuButton(props: {
  titleKey: string
  defaultTitle: string
  subtitleKey: string
  defaultSubtitle: string
  onClick: () => void
  rightSlot?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="group w-full rounded-md border border-black/60 bg-gradient-to-b from-slate-200/10 to-black/30 px-5 py-4 text-left shadow-[0_2px_0_0_rgba(0,0,0,0.65)] hover:from-emerald-300/15 hover:to-emerald-900/25 active:translate-y-[1px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.65)]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-bold tracking-wide text-slate-100">
          <I18N k={props.titleKey} default={props.defaultTitle} />
        </div>
        {props.rightSlot ? <div className="flex-none">{props.rightSlot}</div> : null}
      </div>
      <div className="mt-1 text-xs text-slate-300/80">
        <I18N k={props.subtitleKey} default={props.defaultSubtitle} />
      </div>
    </button>
  )
}

function SmallButton(props: {
  labelKey: string
  defaultLabel: string
  onClick: () => void
  danger?: boolean
  icon?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={[
        'flex w-full items-center justify-center gap-2 rounded-md border border-black/60 bg-gradient-to-b px-3 py-3 text-xs font-bold tracking-wide shadow-[0_2px_0_0_rgba(0,0,0,0.65)] active:translate-y-[1px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.65)]',
        props.danger
          ? 'from-red-300/15 to-red-900/25 text-red-50 hover:from-red-300/20 hover:to-red-900/30'
          : 'from-slate-200/10 to-black/30 text-slate-100 hover:from-slate-200/15 hover:to-black/35'
      ].join(' ')}
    >
      {props.icon ? <span className="opacity-90">{props.icon}</span> : null}
      <I18N k={props.labelKey} default={props.defaultLabel} />
    </button>
  )
}


