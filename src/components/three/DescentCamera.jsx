import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { cameraYFromProgress, CAMERA_Z } from '../../utils/depthFromProgress'

/**
 * Moves the default camera down the Y-axis from scroll progress (0 → 1).
 */
export default function DescentCamera() {
  const progress = useScrollProgress()
  const progressRef = useRef(progress)
  progressRef.current = progress

  const { camera } = useThree()

  useFrame(() => {
    const targetY = cameraYFromProgress(progressRef.current)
    camera.position.x = 0
    camera.position.z = CAMERA_Z
    // Smooth follow so scrubbing scroll feels fluid
    camera.position.y += (targetY - camera.position.y) * 0.12
    camera.lookAt(0, camera.position.y, 0)
  })

  return null
}
