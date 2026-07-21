import { Canvas } from '@react-three/fiber'
import DescentScene from '../three/DescentScene'

/**
 * Fixed full-screen WebGL layer behind the HTML scroll scaffold.
 */
export default function ExperienceCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <DescentScene />
      </Canvas>
    </div>
  )
}
