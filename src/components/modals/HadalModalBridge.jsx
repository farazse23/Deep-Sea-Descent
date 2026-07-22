import { useEffect } from 'react'
import { MODAL_TYPES, useModal } from '../../context/ModalContext'
import { hadalModal } from '../../data/modalContent'

export const HADAL_MODAL_EVENT = 'deep-sea:open-hadal-modal'

/**
 * Opens the Section 5 side panel from R3F amphipod clicks.
 */
export default function HadalModalBridge() {
  const { openModal } = useModal()

  useEffect(() => {
    const onOpen = () => {
      openModal({
        type: MODAL_TYPES.SIDE_PANEL,
        ...hadalModal,
      })
    }

    window.addEventListener(HADAL_MODAL_EVENT, onOpen)
    return () => window.removeEventListener(HADAL_MODAL_EVENT, onOpen)
  }, [openModal])

  return null
}

export function openHadalModalFromCanvas() {
  window.dispatchEvent(new CustomEvent(HADAL_MODAL_EVENT))
}
