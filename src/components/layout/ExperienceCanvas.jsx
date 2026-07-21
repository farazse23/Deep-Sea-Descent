import { Canvas } from '@react-three/fiber'
import DescentScene from '../three/DescentScene'

/**
 * Fixed full-screen WebGL layer behind the HTML scroll scaffold.
 * pointer-events enabled so zone models (e.g. turtle) can be clicked.
 */
export default function ExperienceCanvas() {
  return (
    <div className="fixed inset-0 z-0 h-screen w-screen">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 200 }}
        style={{ pointerEvents: 'auto' }}
      >
        <DescentScene />
      </Canvas>
    </div>
  )
}
