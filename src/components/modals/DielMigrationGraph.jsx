import { useMemo, useState } from 'react'

/** Sample points: hour of day → typical migration depth (m). */
const MIGRATION_POINTS = [
  { hour: 0, depth: 450, label: 'Midnight' },
  { hour: 3, depth: 520, label: 'Late night' },
  { hour: 6, depth: 180, label: 'Dawn rise' },
  { hour: 9, depth: 80, label: 'Morning' },
  { hour: 12, depth: 40, label: 'Midday surface' },
  { hour: 15, depth: 90, label: 'Afternoon' },
  { hour: 18, depth: 220, label: 'Dusk descent' },
  { hour: 21, depth: 380, label: 'Night' },
  { hour: 24, depth: 450, label: 'Midnight' },
]

/**
 * Interactive Diel Vertical Migration chart (built in code — no SVG asset).
 */
export default function DielMigrationGraph() {
  const [active, setActive] = useState(4)

  const pathD = useMemo(() => {
    const w = 560
    const h = 220
    const padX = 40
    const padY = 24
    const maxDepth = 600

    return MIGRATION_POINTS.map((p, i) => {
      const x = padX + (p.hour / 24) * (w - padX * 2)
      const y = padY + (p.depth / maxDepth) * (h - padY * 2)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
  }, [])

  const activePoint = MIGRATION_POINTS[active]

  return (
    <div className="mt-4 rounded border border-indigo-400/25 bg-indigo-950/40 p-4">
      <p className="font-display text-[10px] tracking-[0.3em] text-indigo-300/80">
        INTERACTIVE — DIEL VERTICAL MIGRATION
      </p>
      <p className="mt-1 font-mono text-sm text-indigo-100">
        {activePoint.label}: ~{activePoint.depth}m at {String(activePoint.hour).padStart(2, '0')}:00
      </p>

      <svg
        viewBox="0 0 560 220"
        className="mt-3 h-auto w-full"
        role="img"
        aria-label="Graph of depth versus time of day for diel vertical migration"
      >
        <line x1="40" y1="20" x2="40" y2="200" stroke="#6366f1" strokeOpacity="0.35" />
        <line x1="40" y1="200" x2="520" y2="200" stroke="#6366f1" strokeOpacity="0.35" />
        <text x="8" y="36" fill="#a5b4fc" fontSize="10" fontFamily="monospace">
          0m
        </text>
        <text x="4" y="196" fill="#a5b4fc" fontSize="10" fontFamily="monospace">
          600m
        </text>
        <text x="250" y="214" fill="#a5b4fc" fontSize="10" fontFamily="monospace">
          Time of day →
        </text>

        <path
          d={pathD}
          fill="none"
          stroke="#818cf8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {MIGRATION_POINTS.map((p, i) => {
          const x = 40 + (p.hour / 24) * 480
          const y = 24 + (p.depth / 600) * 172
          const isActive = i === active
          return (
            <g key={`${p.hour}-${p.depth}`}>
              <circle
                cx={x}
                cy={y}
                r={isActive ? 7 : 5}
                fill={isActive ? '#c7d2fe' : '#6366f1'}
                stroke="#312e81"
                strokeWidth="1"
                className="cursor-pointer"
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              />
            </g>
          )
        })}
      </svg>

      <p className="mt-2 text-sm text-indigo-100/70">
        Hover or tap points on the curve. Animals rise toward the surface at night to feed,
        then sink into darker water by day to hide from predators — the planet’s largest
        daily animal migration.
      </p>
    </div>
  )
}
