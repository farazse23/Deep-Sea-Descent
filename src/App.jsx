import DepthHud from './components/hud/DepthHud'
import ExperienceCanvas from './components/layout/ExperienceCanvas'
import ScrollProgressDebug from './components/layout/ScrollProgressDebug'
import ScrollScaffold from './components/layout/ScrollScaffold'
import ModalRoot from './components/modals/ModalRoot'
import ModalTestPanel from './components/modals/ModalTestPanel'
import TurtleModalBridge from './components/modals/TurtleModalBridge'
import JellyfishModalBridge from './components/modals/JellyfishModalBridge'
import AnglerfishModalBridge from './components/modals/AnglerfishModalBridge'
import VentModalBridge from './components/modals/VentModalBridge'
import PlasticBagModalBridge from './components/modals/PlasticBagModalBridge'
import { ModalProvider } from './context/ModalContext'
import { ScrollProgressProvider } from './context/ScrollProgressContext'

export default function App() {
  return (
    <ScrollProgressProvider>
      <ModalProvider>
        <ExperienceCanvas />
        <ScrollScaffold />
        <DepthHud />
        <ModalRoot />
        <TurtleModalBridge />
        <JellyfishModalBridge />
        <AnglerfishModalBridge />
        <VentModalBridge />
        <PlasticBagModalBridge />
        <ModalTestPanel />
        <ScrollProgressDebug />
      </ModalProvider>
    </ScrollProgressProvider>
  )
}
