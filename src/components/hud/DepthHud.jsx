import { useScrollProgress } from '../../hooks/useScrollProgress'
import { zones, zoneFromProgress } from '../../data/zoneMeta'
import {
  depthMetersFromProgress,
  temperatureFromProgress,
  pressureFromProgress,
} from '../../utils/depthFromProgress'
import { scrollToZone } from '../../utils/scrollToZone'

/**
 * Fixed glass HUD — depth / temp / pressure + zone navigation.
 */
export default function DepthHud() {
  const progress = useScrollProgress()
  const activeZone = zoneFromProgress(progress)

  const depthM = Math.round(depthMetersFromProgress(progress))
  const tempC = temperatureFromProgress(progress)
  const pressureAtm = pressureFromProgress(progress)

  return (
    <aside
      className="pointer-events-auto fixed right-6 top-1/2 z-40 flex w-[9.5rem] -translate-y-1/2 flex-col gap-5 rounded-sm border border-cyan-300/25 bg-slate-950/45 px-3 py-4 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur-md md:w-44 md:px-4 md:py-5"
      aria-label="Dive heads-up display"
    >
      <header>
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
          Dive HUD
        </p>
      </header>

      {/* Vertical progress + zone labels */}
      <div className="relative flex gap-3">
        <div className="relative flex w-3 flex-col items-center">
          <div className="absolute inset-y-0 w-px bg-cyan-400/25" />
          <div
            className="absolute left-1/2 w-px -translate-x-1/2 bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)] transition-[height] duration-150 ease-out"
            style={{ height: `${progress * 100}%` }}
          />
          <div
            className="absolute left-1/2 z-10 h-2 w-2 -translate-x-1/2 rounded-full border border-cyan-100 bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)] transition-[top] duration-150 ease-out"
            style={{ top: `calc(${progress * 100}% - 4px)` }}
          />
        </div>

        <nav className="flex flex-1 flex-col justify-between gap-1 py-0.5" aria-label="Ocean zones">
          {zones.map((zone) => {
            const isActive = zone.id === activeZone.id
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => scrollToZone(zone.id)}
                className={`pointer-events-auto group text-left transition-colors ${
                  isActive
                    ? 'text-cyan-200'
                    : 'text-white/45 hover:text-cyan-100/90'
                }`}
              >
                <span
                  className={`font-display block text-[11px] font-semibold tracking-[0.2em] md:text-xs ${
                    isActive ? 'opacity-100' : 'opacity-80'
                  }`}
                >
                  {zone.shortName}
                </span>
                <span className="font-mono block text-[9px] tracking-wider text-white/40 group-hover:text-white/55">
                  {zone.depthLabel}
                </span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Live meters */}
      <div className="space-y-3 border-t border-cyan-400/15 pt-3">
        <Meter label="DEPTH" value={`${formatDepth(depthM)}m`} />
        <Meter label="TEMP" value={`${tempC.toFixed(1)}°C`} />
        <Meter label="PRESSURE" value={`${formatPressure(pressureAtm)} ATM`} />
      </div>
    </aside>
  )
}

function Meter({ label, value }) {
  return (
    <div>
      <p className="font-display text-[9px] tracking-[0.28em] text-cyan-400/70">
        {label}
      </p>
      <p className="font-mono text-sm tracking-wider text-cyan-50 md:text-base">
        {value}
      </p>
    </div>
  )
}

function formatDepth(meters) {
  return meters.toLocaleString('en-US')
}

function formatPressure(atm) {
  if (atm < 10) return atm.toFixed(1)
  return Math.round(atm).toLocaleString('en-US')
}
