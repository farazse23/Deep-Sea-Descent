import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollProgress } from '../../../hooks/useScrollProgress'

/**
 * Section 3 — cursor SpotLight flashlight.
 * Active only in bathypelagic scroll range; scene stays dark otherwise.
 */
export default function CursorFlashlight({
  progressMin = 0.38,
  progressMax = 0.65,
  intensity = 90,
  distance = 28,
  angle = 0.42,
  penumbra = 0.45,
  color = '#f1f5f9',
}) {
  const progress = useScrollProgress()
  const progressRef = useRef(progress)
  progressRef.current = progress

  const lightRef = useRef(null)
  const targetRef = useRef(null)
  const { camera, pointer } = useThree()

  const worldPointer = useMemo(() => new THREE.Vector3(), [])
  const direction = useMemo(() => new THREE.Vector3(), [])
  const aimPoint = useMemo(() => new THREE.Vector3(), [])

  useEffect(() => {
    const light = lightRef.current
    const target = targetRef.current
    if (light && target) {
      light.target = target
    }
  }, [])

  useFrame(() => {
    const light = lightRef.current
    const target = targetRef.current
    if (!light || !target) return

    const p = progressRef.current
    const active = p >= progressMin && p <= progressMax
    light.visible = active
    light.intensity = active ? intensity : 0
    if (!active) return

    // Aim into the scene along the cursor ray
    worldPointer.set(pointer.x, pointer.y, 0.5).unproject(camera)
    direction.copy(worldPointer).sub(camera.position).normalize()
    aimPoint.copy(camera.position).addScaledVector(direction, 9)

    light.position.copy(camera.position)
    // Sit slightly forward so the cone isn't behind the near plane
    light.position.addScaledVector(direction, 0.4)
    target.position.copy(aimPoint)
    target.updateMatrixWorld()
    light.target.updateMatrixWorld()
  })

  return (
    <>
      <spotLight
        ref={lightRef}
        color={color}
        intensity={0}
        distance={distance}
        angle={angle}
        penumbra={penumbra}
        decay={1.5}
        castShadow={false}
      />
      <object3D ref={targetRef} />
    </>
  )
}
