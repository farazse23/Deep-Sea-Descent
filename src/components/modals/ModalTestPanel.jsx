import { MODAL_TYPES, useModal } from '../../context/ModalContext'
import {
  anglerfishModal,
  conservationModal,
  hadalModal,
  jellyfishModal,
  turtleModal,
  ventModal,
} from '../../data/modalContent'

/** Dev preview — opens every modal variant with production copy. */
export default function ModalTestPanel() {
  const { openModal } = useModal()

  const samples = [
    {
      label: 'Left card',
      type: MODAL_TYPES.LEFT_CARD,
      ...turtleModal,
    },
    {
      label: 'Fullscreen',
      type: MODAL_TYPES.FULLSCREEN_BLUR,
      ...jellyfishModal,
    },
    {
      label: 'Anglerfish',
      type: MODAL_TYPES.SIDE_PANEL,
      ...anglerfishModal,
    },
    {
      label: 'Schematic',
      type: MODAL_TYPES.SCHEMATIC,
      ...ventModal,
    },
    {
      label: 'Hadal panel',
      type: MODAL_TYPES.SIDE_PANEL,
      ...hadalModal,
    },
    {
      label: 'Conservation',
      type: MODAL_TYPES.CONSERVATION,
      ...conservationModal,
    },
  ]

  return (
    <div className="pointer-events-auto fixed bottom-4 left-4 z-50 flex max-w-xs flex-wrap gap-2 rounded border border-white/15 bg-black/70 p-2 backdrop-blur-sm">
      <p className="w-full font-mono text-[10px] tracking-wider text-white/50">
        MODAL PREVIEW
      </p>
      {samples.map((sample) => (
        <button
          key={sample.label}
          type="button"
          onClick={() =>
            openModal({
              type: sample.type,
              title: sample.title,
              body: sample.body,
              imageSrc: sample.imageSrc,
              imageSrcAlt: sample.imageSrcAlt,
              chart: sample.chart,
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
