import DescentCamera from './DescentCamera'
import DescentLighting from './DescentLighting'
import { CAMERA_END_Y, CAMERA_START_Y } from '../../utils/depthFromProgress'

/**
 * Root 3D scene — camera + lighting synced to scroll (STEP 3).
 * Depth markers make the descent visible before real zone models land.
 */
export default function DescentScene() {
  const markerYs = [0, -10, -20, -30, -40]

  return (
    <>
      <DescentCamera />
      <DescentLighting />

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

      {/* Vertical guide so depth travel is obvious */}
      <mesh position={[0, (CAMERA_START_Y + CAMERA_END_Y) / 2, -2]}>
        <boxGeometry args={[0.08, Math.abs(CAMERA_END_Y - CAMERA_START_Y), 0.08]} />
        <meshStandardMaterial color="#67e8f9" transparent opacity={0.35} />
      </mesh>
    </>
  )
}

const MARKER_COLORS = ['#22d3ee', '#818cf8', '#525252', '#ea580c', '#7c3aed']
