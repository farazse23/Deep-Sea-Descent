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
 * Turns warning-red in the hadal climax (progress ≥ 0.8).
 */
export default function DepthHud() {
  const progress = useScrollProgress()
  const activeZone = zoneFromProgress(progress)
  const warning = progress >= 0.8

  const depthM = Math.round(depthMetersFromProgress(progress))
  const tempC = temperatureFromProgress(progress)
  const pressureAtm = pressureFromProgress(progress)

  const border = warning ? 'border-rose-400/50' : 'border-cyan-300/25'
  const glow = warning
    ? 'shadow-[0_0_40px_rgba(244,63,94,0.25)]'
    : 'shadow-[0_0_40px_rgba(34,211,238,0.08)]'
  const accent = warning ? 'text-rose-300' : 'text-cyan-300/80'
  const activeText = warning ? 'text-rose-100' : 'text-cyan-200'
  const idleText = warning
    ? 'text-white/45 hover:text-rose-100/90'
    : 'text-white/45 hover:text-cyan-100/90'
  const meterLabel = warning ? 'text-rose-400/80' : 'text-cyan-400/70'
  const meterValue = warning ? 'text-rose-50' : 'text-cyan-50'
  const lineTrack = warning ? 'bg-rose-400/25' : 'bg-cyan-400/25'
  const lineFill = warning
    ? 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.9)]'
    : 'bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]'
  const dot = warning
    ? 'border-rose-100 bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.95)]'
    : 'border-cyan-100 bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]'

  return (
    <aside
      className={`pointer-events-auto fixed right-6 top-1/2 z-40 flex w-[9.5rem] -translate-y-1/2 flex-col gap-5 rounded-sm border bg-slate-950/45 px-3 py-4 backdrop-blur-md md:w-44 md:px-4 md:py-5 ${border} ${glow} ${
        warning ? 'animate-pulse' : ''
      }`}
      aria-label="Dive heads-up display"
    >
      <header>
        <p
          className={`font-display text-[10px] font-semibold uppercase tracking-[0.35em] ${accent}`}
        >
          Dive HUD
        </p>
        {warning ? (
          <p className="mt-1 font-mono text-[9px] tracking-wider text-rose-300/95">
            ⚠ POLLUTION ALERT
          </p>
        ) : null}
      </header>

      <div className="relative flex gap-3">
        <div className="relative flex w-3 flex-col items-center">
          <div className={`absolute inset-y-0 w-px ${lineTrack}`} />
          <div
            className={`absolute left-1/2 w-px -translate-x-1/2 transition-[height] duration-150 ease-out ${lineFill}`}
            style={{ height: `${progress * 100}%` }}
          />
          <div
            className={`absolute left-1/2 z-10 h-2 w-2 -translate-x-1/2 rounded-full border transition-[top] duration-150 ease-out ${dot}`}
            style={{ top: `calc(${progress * 100}% - 4px)` }}
          />
        </div>

        <nav
          className="flex flex-1 flex-col justify-between gap-1 py-0.5"
          aria-label="Ocean zones"
        >
          {zones.map((zone) => {
            const isActive = zone.id === activeZone.id
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => scrollToZone(zone.id)}
                className={`pointer-events-auto group text-left transition-colors ${
                  isActive ? activeText : idleText
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

      <div
        className={`space-y-3 border-t pt-3 ${
          warning ? 'border-rose-400/25' : 'border-cyan-400/15'
        }`}
      >
        <Meter
          label="DEPTH"
          value={`${formatDepth(depthM)}m`}
          labelClass={meterLabel}
          valueClass={meterValue}
        />
        <Meter
          label="TEMP"
          value={`${tempC.toFixed(1)}°C`}
          labelClass={meterLabel}
          valueClass={meterValue}
        />
        <Meter
          label="PRESSURE"
          value={`${formatPressure(pressureAtm)} ATM`}
          labelClass={meterLabel}
          valueClass={meterValue}
        />
      </div>
    </aside>
  )
}

function Meter({ label, value, labelClass, valueClass }) {
  return (
    <div>
      <p className={`font-display text-[9px] tracking-[0.28em] ${labelClass}`}>
        {label}
      </p>
      <p
        className={`font-mono text-sm tracking-wider md:text-base ${valueClass}`}
      >
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
