import { MODAL_TYPES, useModal } from '../../context/ModalContext'
import coralWarmingImg from '../../assets/images/coral-warming.jpg?url'

/**
 * Temporary STEP 5 tester — remove after zone click targets exist.
 */
export default function ModalTestPanel() {
  const { openModal } = useModal()

  const samples = [
    {
      label: 'Left card',
      type: MODAL_TYPES.LEFT_CARD,
      title: 'Warming Oceans',
      imageSrc: coralWarmingImg,
      body: [
        'In the sunlit epipelagic zone, coral reefs are among the most productive — and vulnerable — ecosystems on Earth.',
        'As oceans warm, corals bleach and reefs collapse, threatening turtles, fish, and coastal communities.',
      ],
    },
    {
      label: 'Fullscreen',
      type: MODAL_TYPES.FULLSCREEN_BLUR,
      title: 'Diel Migration',
      body: 'Placeholder — Section 2 blurred modal. Interactive graph comes later.',
    },
    {
      label: 'Side panel',
      type: MODAL_TYPES.SIDE_PANEL,
      title: 'Bioluminescence',
      body: 'Placeholder — Section 3 side panel. Adaptations for total darkness.',
    },
    {
      label: 'Schematic',
      type: MODAL_TYPES.SCHEMATIC,
      title: 'Chemosynthesis',
      body: 'Placeholder — Section 4 schematic. Life without sunlight at vents.',
    },
    {
      label: 'Conservation',
      type: MODAL_TYPES.CONSERVATION,
      title: 'Protect The Deep',
      body: 'Placeholder — Section 5 CTA. Microplastics reach even the Mariana Trench.',
    },
  ]

  return (
    <div className="pointer-events-auto fixed bottom-4 left-4 z-50 flex max-w-xs flex-wrap gap-2 rounded border border-white/15 bg-black/70 p-2 backdrop-blur-sm">
      <p className="w-full font-mono text-[10px] tracking-wider text-white/50">
        MODAL TEST (STEP 5)
      </p>
      {samples.map((sample) => (
        <button
          key={sample.type}
          type="button"
          onClick={() =>
            openModal({
              type: sample.type,
              title: sample.title,
              body: sample.body,
              imageSrc: sample.imageSrc,
            })
          }
          className="rounded border border-cyan-400/30 bg-cyan-950/40 px-2 py-1 font-mono text-[10px] tracking-wide text-cyan-100 hover:border-cyan-300/60"
        >
          {sample.label}
        </button>
      ))}
    </div>
  )
}
