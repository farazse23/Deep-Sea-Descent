import { useEffect } from 'react'
import { MODAL_TYPES, useModal } from '../../context/ModalContext'

export const VENT_MODAL_EVENT = 'deep-sea:open-vent-modal'

const VENT_MODAL_BODY = [
  {
    heading: 'Chemosynthesis',
    text: 'At hydrothermal vents, microbes turn chemicals from Earth’s crust — especially hydrogen sulfide — into energy. No sunlight required.',
  },
  {
    heading: 'Hydrothermal ecosystems',
    text: 'Heat and minerals fuel dense communities: microbes, tube worms, crabs, and fish clustered around black smokers and chimneys.',
  },
  {
    heading: 'Life without sunlight',
    text: 'These oases prove that complex food webs can run on geothermal chemistry alone — a model for life in Earth’s darkest oceans and beyond.',
  },
]

/**
 * Opens the Section 4 schematic panel from R3F vent clicks.
 */
export default function VentModalBridge() {
  const { openModal } = useModal()

  useEffect(() => {
    const onOpen = () => {
      openModal({
        type: MODAL_TYPES.SCHEMATIC,
        title: 'Hydrothermal Vents',
        body: VENT_MODAL_BODY,
        chart: 'chemosynthesis',
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
