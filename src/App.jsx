import ExperienceCanvas from './components/layout/ExperienceCanvas'
import ScrollProgressDebug from './components/layout/ScrollProgressDebug'
import ScrollScaffold from './components/layout/ScrollScaffold'
import { ScrollProgressProvider } from './context/ScrollProgressContext'

export default function App() {
  return (
    <ScrollProgressProvider>
      <ExperienceCanvas />
      <ScrollScaffold />
      <ScrollProgressDebug />
    </ScrollProgressProvider>
  )
}
