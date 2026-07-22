import { useEffect } from 'react'
import { MODAL_TYPES, useModal } from '../../context/ModalContext'
import { jellyfishModal } from '../../data/modalContent'

export const JELLYFISH_MODAL_EVENT = 'deep-sea:open-jellyfish-modal'

/**
 * Opens the Section 2 fullscreen migration modal from R3F clicks.
 */
export default function JellyfishModalBridge() {
  const { openModal } = useModal()

  useEffect(() => {
    const onOpen = () => {
      openModal({
        type: MODAL_TYPES.FULLSCREEN_BLUR,
        ...jellyfishModal,
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
