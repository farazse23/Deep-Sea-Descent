import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Moves children along a looping 3D path (swim circuit) within a zone.
 * Faces the travel direction; yawOffset fixes models that face +Z by default.
 * When lockHorizon is true (default), pitch is flattened so models stay level.
 */
export default function SwimPath({
  points,
  speed = 0.08,
  phase = 0,
  bobAmount = 0.15,
  yawOffset = Math.PI,
  lockHorizon = true,
  lookAhead = 0.012,
  curveTension = 0.45,
  children,
}) {
  const group = useRef(null)
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        points.map((p) => new THREE.Vector3(...p)),
        true,
        'catmullrom',
        curveTension,
      ),
    [points, curveTension],
  )

  const lookTarget = useMemo(() => new THREE.Vector3(), [])
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), [])

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = (clock.elapsedTime * speed + phase) % 1

    const pos = curve.getPointAt(t)
    // Face along path tangent (stable forward motion — avoids stern-pivot spinning)
    const tangent = curve.getTangentAt(t).normalize()
    lookTarget.copy(pos).addScaledVector(tangent, Math.max(lookAhead * 40, 0.35))
    pos.y += Math.sin(clock.elapsedTime * 1.4 + phase * 10) * bobAmount

    group.current.position.copy(pos)
    if (lockHorizon) {
      lookTarget.y = pos.y
    }
    group.current.up.copy(up)
    group.current.lookAt(lookTarget)
    group.current.rotateY(yawOffset)
  })

  return <group ref={group}>{children}</group>
}
