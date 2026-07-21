import { Suspense } from 'react'
import DescentCamera from './DescentCamera'
import DescentLighting from './DescentLighting'
import EpipelagicZone from './zones/EpipelagicZone'
import MesopelagicZone from './zones/MesopelagicZone'
import { CAMERA_END_Y, CAMERA_START_Y } from '../../utils/depthFromProgress'

/**
 * Root 3D scene — scroll-synced camera/lights + zone content.
 */
export default function DescentScene() {
  // Remaining depth markers for zones not built yet
  const markerYs = [-20, -30, -40]

  return (
    <>
      <DescentCamera />
      <DescentLighting />

      <Suspense fallback={null}>
        <EpipelagicZone />
      </Suspense>

      <Suspense fallback={null}>
        <MesopelagicZone />
      </Suspense>

      {markerYs.map((y, index) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial
            color={MARKER_COLORS[index]}
            emissive={MARKER_COLORS[index]}
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}

      <mesh position={[0, (CAMERA_START_Y + CAMERA_END_Y) / 2, -2]}>
        <boxGeometry
          args={[0.08, Math.abs(CAMERA_END_Y - CAMERA_START_Y), 0.08]}
        />
        <meshStandardMaterial color="#67e8f9" transparent opacity={0.2} />
      </mesh>
    </>
  )
}

const MARKER_COLORS = ['#525252', '#ea580c', '#7c3aed']
