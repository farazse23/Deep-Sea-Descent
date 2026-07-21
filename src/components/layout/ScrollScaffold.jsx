import { zones } from '../../data/zoneMeta'

/**
 * Foreground scroll footprint: 500vh tall, five fullscreen sections.
 * Transparent so the WebGL canvas (STEP 1B) can show through.
 */
export default function ScrollScaffold() {
  return (
    <main className="relative z-10 h-[500vh] w-full pointer-events-none">
      {zones.map((zone) => (
        <section
          key={zone.id}
          id={zone.id}
          className="flex h-screen w-full flex-col items-start justify-end px-8 pb-16 pointer-events-none"
        >
          <p className="font-mono text-sm tracking-widest text-white/60">
            {zone.scrollRange}
          </p>
          <h2 className="font-display text-3xl font-bold uppercase tracking-widest text-white md:text-5xl">
            {zone.name}
          </h2>
          <p className="mt-2 text-xl font-medium tracking-wide text-cyan-100/90">
            {zone.depthLabel}
          </p>
        </section>
      ))}
    </main>
  )
}
