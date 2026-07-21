import { useScrollProgress } from '../../hooks/useScrollProgress'

/** Temporary STEP 2 debug readout — remove after STEP 3+ is verified. */
export default function ScrollProgressDebug() {
  const progress = useScrollProgress()

  return (
    <div className="pointer-events-none fixed left-4 top-4 z-50 rounded border border-cyan-400/40 bg-black/70 px-3 py-2 font-mono text-sm tracking-wider text-cyan-200">
      SCROLL {progress.toFixed(2)}
    </div>
  )
}
