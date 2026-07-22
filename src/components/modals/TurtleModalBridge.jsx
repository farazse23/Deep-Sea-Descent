import { useEffect } from 'react'
import { MODAL_TYPES, useModal } from '../../context/ModalContext'
import { turtleModal } from '../../data/modalContent'

export const TURTLE_MODAL_EVENT = 'deep-sea:open-turtle-modal'

/**
 * Listens for turtle clicks from the R3F canvas (avoids Context issues inside Canvas).
 */
export default function TurtleModalBridge() {
  const { openModal } = useModal()

  useEffect(() => {
    const onOpen = () => {
      openModal({
        type: MODAL_TYPES.LEFT_CARD,
        ...turtleModal,
      })
    }

    window.addEventListener(TURTLE_MODAL_EVENT, onOpen)
    return () => window.removeEventListener(TURTLE_MODAL_EVENT, onOpen)
  }, [openModal])

  return null
}

export function openTurtleModalFromCanvas() {
  window.dispatchEvent(new CustomEvent(TURTLE_MODAL_EVENT))
}
