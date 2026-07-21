import { useEffect } from 'react'
import { MODAL_TYPES, useModal } from '../../context/ModalContext'
import coralWarmingImg from '../../assets/images/coral-warming.jpg?url'

export const TURTLE_MODAL_EVENT = 'deep-sea:open-turtle-modal'

const TURTLE_MODAL_BODY = [
  'In the sunlit epipelagic zone, coral reefs are among the most productive ecosystems on Earth — and among the most vulnerable.',
  'As oceans absorb heat, water temperatures rise. Corals expel the symbiotic algae that feed them, turning white in a process called bleaching. Without those algae, reefs starve and collapse.',
  'Warmer seas also fuel stronger storms and shift marine food webs, threatening turtles, fish, and the coastal communities that depend on healthy reefs.',
  'Protect temperature. Protect coral. Protect the surface nursery of the deep.',
]

/**
 * Listens for turtle clicks from the R3D canvas (avoids Context issues inside Canvas).
 */
export default function TurtleModalBridge() {
  const { openModal } = useModal()

  useEffect(() => {
    const onOpen = () => {
      openModal({
        type: MODAL_TYPES.LEFT_CARD,
        title: 'Warming Oceans',
        imageSrc: coralWarmingImg,
        body: TURTLE_MODAL_BODY,
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
