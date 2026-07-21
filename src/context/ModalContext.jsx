import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ModalContext = createContext(null)

export const MODAL_TYPES = {
  LEFT_CARD: 'left-card',
  FULLSCREEN_BLUR: 'fullscreen-blur',
  SIDE_PANEL: 'side-panel',
  SCHEMATIC: 'schematic',
  CONSERVATION: 'conservation',
}

/**
 * Shared modal open/close state.
 * Payload must be serializable-ish: use string/string[] for body, not JSX.
 * openModal({ type, title, body, imageSrc })
 */
export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null)

  const openModal = useCallback((payload) => {
    if (!payload?.type) return
    setModal({
      type: payload.type,
      title: payload.title ?? 'Information',
      body: payload.body ?? '',
      imageSrc: payload.imageSrc ?? null,
      chart: payload.chart ?? null,
    })
  }, [])

  const closeModal = useCallback(() => {
    setModal(null)
  }, [])

  const value = useMemo(
    () => ({
      modal,
      isOpen: modal != null,
      openModal,
      closeModal,
    }),
    [modal, openModal, closeModal],
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return ctx
}
