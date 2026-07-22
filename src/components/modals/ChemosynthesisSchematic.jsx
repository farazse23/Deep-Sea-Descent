import { motion } from 'framer-motion'

/** Built-in Section 4 schematic — life without sunlight at vents. */
export default function ChemosynthesisSchematic() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 overflow-hidden border border-orange-400/30 bg-zinc-900/80 p-4"
    >
      <p className="mb-3 font-mono text-[10px] tracking-[0.28em] text-orange-300/80">
        FLOW — HEAT → CHEMISTRY → LIFE
      </p>
      <svg viewBox="0 0 420 160" className="h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="ventGlow" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Seafloor */}
        <rect x="0" y="130" width="420" height="30" fill="#18181b" />
        {/* Vent stack */}
        <rect x="70" y="70" width="36" height="60" fill="#3f3f46" />
        <path d="M70 70 L88 40 L106 70 Z" fill="url(#ventGlow)" />
        {/* Smoke curls */}
        <path
          d="M88 40 Q100 20 92 8"
          fill="none"
          stroke="#fb923c"
          strokeWidth="3"
          opacity="0.7"
        />
        <path
          d="M88 40 Q76 18 82 4"
          fill="none"
          stroke="#fdba74"
          strokeWidth="2"
          opacity="0.55"
        />
        {/* Chemistry box */}
        <rect
          x="150"
          y="50"
          width="100"
          height="52"
          rx="4"
          fill="#27272a"
          stroke="#ea580c"
          strokeWidth="1.5"
        />
        <text
          x="200"
          y="72"
          textAnchor="middle"
          fill="#fdba74"
          fontSize="11"
          fontFamily="monospace"
        >
          H₂S + CO₂
        </text>
        <text
          x="200"
          y="90"
          textAnchor="middle"
          fill="#fff7ed"
          fontSize="10"
          fontFamily="monospace"
        >
          chemosynthesis
        </text>
        {/* Arrow */}
        <path d="M255 76 L290 76" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrow)" />
        <polygon points="288,72 298,76 288,80" fill="#f97316" />
        {/* Life box */}
        <rect
          x="305"
          y="50"
          width="95"
          height="52"
          rx="4"
          fill="#27272a"
          stroke="#fbbf24"
          strokeWidth="1.5"
        />
        <text
          x="352"
          y="72"
          textAnchor="middle"
          fill="#fde68a"
          fontSize="11"
          fontFamily="monospace"
        >
          microbes
        </text>
        <text
          x="352"
          y="90"
          textAnchor="middle"
          fill="#fff7ed"
          fontSize="10"
          fontFamily="monospace"
        >
          → tube worms
        </text>
        <text
          x="88"
          y="150"
          textAnchor="middle"
          fill="#a8a29e"
          fontSize="9"
          fontFamily="monospace"
        >
          vent
        </text>
      </svg>
    </motion.div>
  )
}
