import { useEffect } from 'react'
import { MODAL_TYPES, useModal } from '../../context/ModalContext'
import microplasticImg from '../../assets/images/microplastic-data.jpg?url'
import marianaImg from '../../assets/images/mariana-pollution.jpg?url'

export const PLASTIC_BAG_MODAL_EVENT = 'deep-sea:open-plastic-bag-modal'

const PLASTIC_BAG_MODAL_BODY = [
  {
    heading: 'Microplastics',
    text: 'Tiny plastic fragments now drift through every ocean layer. They enter food webs, carry toxins, and have been found in animals living thousands of meters down.',
  },
  {
    heading: 'Mariana Trench pollution',
    text: 'Even the deepest known places on Earth are not untouched — surveys have recovered plastic debris and chemical signatures of human waste in hadal sediments.',
  },
  {
    heading: 'Call to action',
    text: 'Cut single-use plastics, support ocean protection policies, and keep the deep wild. What sinks out of sight does not disappear.',
  },
]

/**
 * Opens the Section 5 conservation modal from R3F plastic-bag clicks.
 */
export default function PlasticBagModalBridge() {
  const { openModal } = useModal()

  useEffect(() => {
    const onOpen = () => {
      openModal({
        type: MODAL_TYPES.CONSERVATION,
        title: 'Protect The Deep',
        body: PLASTIC_BAG_MODAL_BODY,
        imageSrc: microplasticImg,
        imageSrcAlt: marianaImg,
      })
    }

    window.addEventListener(PLASTIC_BAG_MODAL_EVENT, onOpen)
    return () => window.removeEventListener(PLASTIC_BAG_MODAL_EVENT, onOpen)
  }, [openModal])

  return null
}

export function openPlasticBagModalFromCanvas() {
  window.dispatchEvent(new CustomEvent(PLASTIC_BAG_MODAL_EVENT))
}
