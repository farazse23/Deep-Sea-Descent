import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MODAL_TYPES, useModal } from '../../context/ModalContext'
import { useScrollLock } from '../../hooks/useScrollLock'
import LeftInfoCard from './LeftInfoCard'
import FullscreenBlurModal from './FullscreenBlurModal'
import SideInfoPanel from './SideInfoPanel'
import SchematicPanel from './SchematicPanel'
import ConservationModal from './ConservationModal'

/**
 * Renders the active modal variant and locks scroll while open.
 */
export default function ModalRoot() {
  const { modal, isOpen, closeModal } = useModal()
  useScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeModal()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeModal])

  return (
    <AnimatePresence mode="wait">
      {modal ? (
        <ModalSwitch key={modal.type} modal={modal} onClose={closeModal} />
      ) : null}
    </AnimatePresence>
  )
}

function ModalSwitch({ modal, onClose }) {
  const shared = {
    title: modal.title ?? 'Information',
    body: modal.body ?? null,
    imageSrc: modal.imageSrc,
    onClose,
  }

  switch (modal.type) {
    case MODAL_TYPES.LEFT_CARD:
      return <LeftInfoCard {...shared} />
    case MODAL_TYPES.FULLSCREEN_BLUR:
      return <FullscreenBlurModal {...shared} />
    case MODAL_TYPES.SIDE_PANEL:
      return <SideInfoPanel {...shared} />
    case MODAL_TYPES.SCHEMATIC:
      return <SchematicPanel {...shared} />
    case MODAL_TYPES.CONSERVATION:
      return <ConservationModal {...shared} />
    default:
      return null
  }
}
