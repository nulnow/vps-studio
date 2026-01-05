import { I18N } from '../../i18n/localize'

import pirataGifUrl from '../../../../pirata.gif?url'

function DrLiveseySvg(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 512 512"
      role="img"
      aria-label="Doctor Livesey"
    >
      <defs>
        <radialGradient id="face" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffd9b3" />
          <stop offset="55%" stopColor="#f6b98a" />
          <stop offset="100%" stopColor="#d88a5a" />
        </radialGradient>
        <linearGradient id="coat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8f0ff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#9fb7ff" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="shadow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* background */}
      <circle cx="256" cy="256" r="220" fill="url(#shadow)" opacity="0.25" />

      {/* coat */}
      <path
        d="M120 430c10-70 60-120 136-120h0c76 0 126 50 136 120"
        fill="url(#coat)"
        stroke="#ffffff"
        strokeOpacity="0.25"
        strokeWidth="6"
      />

      {/* neck */}
      <path d="M220 320c10 22 26 34 36 34s26-12 36-34v-30h-72v30z" fill="#f2b283" />

      {/* head */}
      <ellipse cx="256" cy="230" rx="120" ry="135" fill="url(#face)" />

      {/* hair */}
      <path
        d="M154 212c8-78 56-136 132-136s124 58 132 136c-18-20-52-38-80-44-8 22-34 40-52 40s-44-18-52-40c-28 6-62 24-80 44z"
        fill="#2a2f3a"
      />

      {/* eyes */}
      <ellipse cx="214" cy="235" rx="16" ry="12" fill="#1b1f29" />
      <ellipse cx="298" cy="235" rx="16" ry="12" fill="#1b1f29" />
      <circle cx="208" cy="232" r="4" fill="#fff" opacity="0.9" />
      <circle cx="292" cy="232" r="4" fill="#fff" opacity="0.9" />

      {/* eyebrows */}
      <path d="M188 210c18-16 40-18 56-8" stroke="#1b1f29" strokeWidth="10" strokeLinecap="round" />
      <path d="M324 210c-18-16-40-18-56-8" stroke="#1b1f29" strokeWidth="10" strokeLinecap="round" />

      {/* mustache */}
      <path
        d="M206 282c16-10 34-14 50-14s34 4 50 14c-10 18-26 28-50 28s-40-10-50-28z"
        fill="#3a2f28"
        opacity="0.9"
      />

      {/* laugh mouth */}
      <path
        d="M190 300c18 40 52 64 66 64s48-24 66-64c-22 10-44 16-66 16s-44-6-66-16z"
        fill="#7a0f1d"
      />
      <path d="M210 330c16 12 30 18 46 18s30-6 46-18" stroke="#ffd2d2" strokeWidth="10" strokeLinecap="round" />

      {/* stethoscope */}
      <path
        d="M200 355c0 40 20 70 56 70s56-30 56-70"
        fill="none"
        stroke="#cfe3ff"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <circle cx="196" cy="352" r="14" fill="#cfe3ff" />
      <circle cx="316" cy="352" r="14" fill="#cfe3ff" />
      <circle cx="256" cy="430" r="18" fill="#cfe3ff" opacity="0.95" />
      <circle cx="256" cy="430" r="8" fill="#2a2f3a" opacity="0.8" />
    </svg>
  )
}

export function NoProPage(props: { onBack: () => void }) {
  return (
    <div className="min-h-screen select-none bg-[radial-gradient(ellipse_at_top,#223_0%,#0b1020_55%,#050814_100%)]">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-2xl font-black tracking-widest text-slate-100">
              <I18N k="noPro.title" default="Upgrade to Pro" />
            </div>
            <div className="mt-2 text-sm font-bold tracking-[0.35em] text-rose-300">
              <I18N k="noPro.badge" default="ABSOLUTELY NOT" />
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

        <div className="mt-8 rounded-xl border border-black/60 bg-black/20 p-6 shadow-[0_2px_0_0_rgba(0,0,0,0.65)]">
          <div className="flex flex-col items-center gap-5 bp681:flex-row bp681:items-start">
            {/*
              Previous Doctor Livesey (SVG) — keep for later:
              <DrLiveseySvg className="h-44 w-44 flex-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)] animate-[wiggle_0.75s_ease-in-out_infinite]" />
            */}

            <img
              src={pirataGifUrl}
              alt="Doctor Livesey"
              className="h-44 w-44 flex-none rounded-xl object-cover drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
              loading="eager"
              decoding="async"
            />

            <div className="min-w-0">
              <div className="text-base font-semibold tracking-wide text-slate-100">
                <I18N k="noPro.liveseySays" default="Doctor Livesey says:" />
              </div>

              <div className="mt-2 text-4xl font-black tracking-wider text-amber-200">
                <span className="inline-block animate-[bounce_0.55s_ease-in-out_infinite]">
                  <I18N k="noPro.laugh" default="АХАХАХАХАХАХА" />
                </span>
              </div>

              <div className="mt-4 space-y-3 text-lg leading-relaxed text-slate-200/90">
                <p>
                  <I18N
                    k="noPro.body1"
                    default="There was never a Pro. There will never be a Pro."
                  />
                </p>
                <p>
                  <I18N
                    k="noPro.body2"
                    default="You’ll have to use it for free. Forever."
                  />
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-black tracking-wide text-emerald-100 shadow-[0_2px_0_0_rgba(0,0,0,0.65)] hover:bg-emerald-400/15 active:translate-y-[1px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.65)]"
                  onClick={props.onBack}
                >
                  <I18N k="noPro.cta" default="Ok, I’ll use the free version" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <style>
          {`
            @keyframes wiggle {
              0%, 100% { transform: rotate(-2deg) translateY(0px); }
              50% { transform: rotate(2deg) translateY(-2px); }
            }
          `}
        </style>
      </div>
    </div>
  )
}


