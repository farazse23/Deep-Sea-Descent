import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollProgress } from '../../../hooks/useScrollProgress'

/**
 * Submarine-style dive headlights that ride with the camera
 * from bathypelagic onward through the hadal climax.
 */
export default function SubmarineHeadlight({
  progressMin = 0.38,
  progressMax = 1,
  intensity = 55,
  distance = 32,
  angle = 0.38,
  penumbra = 0.55,
  color = '#e0f2fe',
}) {
  const progress = useScrollProgress()
  const progressRef = useRef(progress)
  progressRef.current = progress

  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const leftTarget = useRef(null)
  const rightTarget = useRef(null)
  const { camera } = useThree()

  const forward = useMemo(() => new THREE.Vector3(), [])
  const right = useMemo(() => new THREE.Vector3(), [])
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), [])
  const aim = useMemo(() => new THREE.Vector3(), [])
  const sideOffset = useMemo(() => new THREE.Vector3(), [])

  useEffect(() => {
    if (leftRef.current && leftTarget.current) {
      leftRef.current.target = leftTarget.current
    }
    if (rightRef.current && rightTarget.current) {
      rightRef.current.target = rightTarget.current
    }
  }, [])

  useFrame(() => {
    const left = leftRef.current
    const rightLight = rightRef.current
    const lTarget = leftTarget.current
    const rTarget = rightTarget.current
    if (!left || !rightLight || !lTarget || !rTarget) return

    const p = progressRef.current
    const active = p >= progressMin && p <= progressMax
    const strength = active ? intensity : 0
    left.visible = active
    rightLight.visible = active
    left.intensity = strength
    rightLight.intensity = strength
    if (!active) return

    camera.getWorldDirection(forward)
    right.crossVectors(forward, up).normalize()

    // Twin headlights just ahead of the camera, aimed into the dive
    aim.copy(camera.position).addScaledVector(forward, 10)
    aim.y -= 0.8

    sideOffset.copy(right).multiplyScalar(0.28)
    left.position
      .copy(camera.position)
      .addScaledVector(forward, 0.55)
      .addScaledVector(up, -0.12)
      .add(sideOffset)
    rightLight.position
      .copy(camera.position)
      .addScaledVector(forward, 0.55)
      .addScaledVector(up, -0.12)
      .sub(sideOffset)

    lTarget.position.copy(aim).add(sideOffset)
    rTarget.position.copy(aim).sub(sideOffset)
    lTarget.updateMatrixWorld()
    rTarget.updateMatrixWorld()
    left.target.updateMatrixWorld()
    rightLight.target.updateMatrixWorld()
  })

  return (
    <>
      <spotLight
        ref={leftRef}
        color={color}
        intensity={0}
        distance={distance}
        angle={angle}
        penumbra={penumbra}
        decay={1.6}
        castShadow={false}
      />
      <spotLight
        ref={rightRef}
        color={color}
        intensity={0}
        distance={distance}
        angle={angle}
        penumbra={penumbra}
        decay={1.6}
        castShadow={false}
      />
      <object3D ref={leftTarget} />
      <object3D ref={rightTarget} />
    </>
  )
}
