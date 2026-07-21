import DepthHud from './components/hud/DepthHud'
import ExperienceCanvas from './components/layout/ExperienceCanvas'
import ScrollProgressDebug from './components/layout/ScrollProgressDebug'
import ScrollScaffold from './components/layout/ScrollScaffold'
import ModalRoot from './components/modals/ModalRoot'
import ModalTestPanel from './components/modals/ModalTestPanel'
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
        <ModalTestPanel />
        <ScrollProgressDebug />
      </ModalProvider>
    </ScrollProgressProvider>
  )
}
