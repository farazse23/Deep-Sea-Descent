import { useEffect } from 'react'
import { MODAL_TYPES, useModal } from '../../context/ModalContext'

export const ANGLERFISH_MODAL_EVENT = 'deep-sea:open-anglerfish-modal'

const ANGLERFISH_MODAL_BODY = [
  {
    heading: 'Biological adaptations',
    text: 'Anglerfish survive crushing pressure and scarce food with soft, gelatinous bodies, huge mouths, and expandable stomachs that can swallow prey larger than themselves.',
  },
  {
    heading: 'Bioluminescence',
    text: 'A glowing lure (esca) on the forehead flickers in total darkness — bait for curious prey. The light comes from symbiotic bacteria, not the fish alone.',
  },
  {
    heading: 'Survival in complete darkness',
    text: 'Below 1,000m, sunlight never reaches. Sensory adaptations, ambush hunting, and extreme energy efficiency replace vision based on daylight.',
  },
]

/**
 * Opens the Section 3 side panel from R3F anglerfish clicks.
 */
export default function AnglerfishModalBridge() {
  const { openModal } = useModal()

  useEffect(() => {
    const onOpen = () => {
      openModal({
        type: MODAL_TYPES.SIDE_PANEL,
        title: 'Anglerfish',
        body: ANGLERFISH_MODAL_BODY,
      })
    }

    window.addEventListener(ANGLERFISH_MODAL_EVENT, onOpen)
    return () => window.removeEventListener(ANGLERFISH_MODAL_EVENT, onOpen)
  }, [openModal])

  return null
}

export function openAnglerfishModalFromCanvas() {
  window.dispatchEvent(new CustomEvent(ANGLERFISH_MODAL_EVENT))
}
