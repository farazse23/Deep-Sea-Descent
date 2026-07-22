import { zones } from '../../data/zoneMeta'

const themeClasses = {
  hadal: {
    range: 'text-violet-300/55',
    title: 'text-violet-50',
    depth: 'text-violet-200/85',
    tagline: 'text-violet-200/65',
    hint: 'text-violet-300/70',
  },
  default: {
    range: 'text-white/60',
    title: 'text-white',
    depth: 'text-cyan-100/90',
    tagline: 'text-white/55',
    hint: 'text-cyan-200/60',
  },
}

/**
 * Foreground scroll footprint: 500vh tall, five fullscreen sections.
 * Transparent so the WebGL canvas (STEP 1B) can show through.
 */
export default function ScrollScaffold() {
  return (
    <main className="relative z-10 h-[500vh] w-full pointer-events-none">
      {zones.map((zone) => {
        const theme = themeClasses[zone.theme] ?? themeClasses.default
        return (
          <section
            key={zone.id}
            id={zone.id}
            className="flex h-screen w-full flex-col items-start justify-end px-8 pb-16 pointer-events-none"
          >
            <p className={`font-mono text-sm tracking-widest ${theme.range}`}>
              {zone.scrollRange}
            </p>
            <h2
              className={`font-display text-3xl font-bold uppercase tracking-widest md:text-5xl ${theme.title}`}
            >
              {zone.name}
            </h2>
            <p className={`mt-2 text-xl font-medium tracking-wide ${theme.depth}`}>
              {zone.depthLabel}
            </p>
            {zone.tagline ? (
              <p className={`mt-3 max-w-lg text-sm leading-relaxed md:text-base ${theme.tagline}`}>
                {zone.tagline}
              </p>
            ) : null}
            {zone.interactionHint ? (
              <p className={`mt-2 font-mono text-xs tracking-wider ${theme.hint}`}>
                {zone.interactionHint}
              </p>
            ) : null}
          </section>
        )
      })}
    </main>
  )
}
