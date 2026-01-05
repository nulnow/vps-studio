import { I18N } from '../../i18n/localize'

export function StubPage(props: {
  titleKey: string
  defaultTitle: string
  onBack: () => void
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,#223_0%,#0b1020_55%,#050814_100%)]">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xl font-black tracking-widest text-slate-100">
              <I18N k={props.titleKey} default={props.defaultTitle} />
            </div>
            <div className="mt-1 text-xs font-medium tracking-[0.35em] text-slate-400">
              <I18N k="stub.badge" default="STUB" />
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

        <div className="mt-8 rounded-md border border-black/60 bg-black/20 p-5 text-sm text-slate-200 shadow-[0_2px_0_0_rgba(0,0,0,0.65)]">
          <I18N k="stub.body" default="Stub page:" />{' '}
          <span className="font-bold">
            <I18N k={props.titleKey} default={props.defaultTitle} />
          </span>
        </div>
      </div>
    </div>
  )
}


