import { useEffect } from 'react'
import { MODAL_TYPES, useModal } from '../../context/ModalContext'

export const JELLYFISH_MODAL_EVENT = 'deep-sea:open-jellyfish-modal'

const JELLYFISH_MODAL_BODY = [
  'In the mesopelagic “twilight zone,” sunlight fades and bioluminescent life takes over.',
  'Each night, countless animals swim upward to feed near the surface, then return to depth by day. This rhythm is called diel vertical migration.',
  'It moves carbon and nutrients through the water column — a hidden engine of the ocean food web.',
]

/**
 * Opens the Section 2 fullscreen migration modal from R3F clicks.
 */
export default function JellyfishModalBridge() {
  const { openModal } = useModal()

  useEffect(() => {
    const onOpen = () => {
      openModal({
        type: MODAL_TYPES.FULLSCREEN_BLUR,
        title: 'Diel Vertical Migration',
        body: JELLYFISH_MODAL_BODY,
        chart: 'diel-migration',
      })
    }

    window.addEventListener(JELLYFISH_MODAL_EVENT, onOpen)
    return () => window.removeEventListener(JELLYFISH_MODAL_EVENT, onOpen)
  }, [openModal])

  return null
}

export function openJellyfishModalFromCanvas() {
  window.dispatchEvent(new CustomEvent(JELLYFISH_MODAL_EVENT))
}
