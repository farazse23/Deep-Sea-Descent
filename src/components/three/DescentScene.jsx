import { Suspense } from 'react'
import DescentCamera from './DescentCamera'
import DescentLighting from './DescentLighting'
import CursorFlashlight from './effects/CursorFlashlight'
import EpipelagicZone from './zones/EpipelagicZone'
import MesopelagicZone from './zones/MesopelagicZone'
import BathypelagicZone from './zones/BathypelagicZone'
import AbyssopelagicZone from './zones/AbyssopelagicZone'
import HadalpelagicZone from './zones/HadalpelagicZone'
import { useScrollProgress } from '../../hooks/useScrollProgress'

/**
 * Root 3D scene — each deep zone only mounts in its scroll band
 * so huge GLBs can't bleed into neighboring sections.
 */
export default function DescentScene() {
  const progress = useScrollProgress()

  const showMeso = progress >= 0.12 && progress < 0.42
  const showBathy = progress >= 0.35 && progress < 0.62
  const showAbyss = progress >= 0.55 && progress < 0.85
  const showHadal = progress >= 0.8

  return (
    <>
      <DescentCamera />
      <DescentLighting />
      <CursorFlashlight />

      <Suspense fallback={null}>
        <EpipelagicZone />
      </Suspense>

      {showMeso ? (
        <Suspense fallback={null}>
          <MesopelagicZone />
        </Suspense>
      ) : null}

      {showBathy ? (
        <Suspense fallback={null}>
          <BathypelagicZone />
        </Suspense>
      ) : null}

      {showAbyss ? (
        <Suspense fallback={null}>
          <AbyssopelagicZone />
        </Suspense>
      ) : null}

      {showHadal ? (
        <Suspense fallback={null}>
          <HadalpelagicZone />
        </Suspense>
      ) : null}
    </>
  )
}
