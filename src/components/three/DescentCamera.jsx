import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { cameraYFromProgress, CAMERA_Z } from '../../utils/depthFromProgress'

/**
 * Moves the default camera down the Y-axis from scroll progress (0 → 1).
 * In the hadal climax (progress ≳ 0.8), pitches downward into the trench.
 */
export default function DescentCamera() {
  const progress = useScrollProgress()
  const progressRef = useRef(progress)
  progressRef.current = progress

  const lookTarget = useRef(new THREE.Vector3())
  const { camera } = useThree()

  useFrame(() => {
    const p = progressRef.current
    const targetY = cameraYFromProgress(p)
    camera.position.x = 0
    camera.position.z = CAMERA_Z
    camera.position.y += (targetY - camera.position.y) * 0.12

    // Climax tilt: look further down as we enter the trench
    const tiltT = smoothstep(0.78, 0.96, p)
    const lookDown = tiltT * 3.8
    lookTarget.current.set(0, camera.position.y - lookDown, 0)
    camera.lookAt(lookTarget.current)
  })

  return null
}

function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}
