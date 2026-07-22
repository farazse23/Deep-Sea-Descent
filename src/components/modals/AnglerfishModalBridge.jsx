import { useEffect } from 'react'
import { MODAL_TYPES, useModal } from '../../context/ModalContext'
import { anglerfishModal } from '../../data/modalContent'

export const ANGLERFISH_MODAL_EVENT = 'deep-sea:open-anglerfish-modal'

/**
 * Opens the Section 3 side panel from R3F anglerfish clicks.
 */
export default function AnglerfishModalBridge() {
  const { openModal } = useModal()

  useEffect(() => {
    const onOpen = () => {
      openModal({
        type: MODAL_TYPES.SIDE_PANEL,
        ...anglerfishModal,
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
