import { useEffect } from 'react'
import { MODAL_TYPES, useModal } from '../../context/ModalContext'
import { ventModal } from '../../data/modalContent'

export const VENT_MODAL_EVENT = 'deep-sea:open-vent-modal'

/**
 * Opens the Section 4 schematic panel from R3F vent clicks.
 */
export default function VentModalBridge() {
  const { openModal } = useModal()

  useEffect(() => {
    const onOpen = () => {
      openModal({
        type: MODAL_TYPES.SCHEMATIC,
        ...ventModal,
      })
    }

    window.addEventListener(VENT_MODAL_EVENT, onOpen)
    return () => window.removeEventListener(VENT_MODAL_EVENT, onOpen)
  }, [openModal])

  return null
}

export function openVentModalFromCanvas() {
  window.dispatchEvent(new CustomEvent(VENT_MODAL_EVENT))
}
