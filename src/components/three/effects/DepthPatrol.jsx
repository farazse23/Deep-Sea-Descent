import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Continuous behind ↔ front patrol along Z (depth).
 * Behind = farther from camera (smaller z), front = toward camera (larger z).
 */
export default function DepthPatrol({
  x = 0,
  y = 0.9,
  zMin = -4.5,
  zMax = 3.5,
  speed = 0.25,
  phase = 0,
  children,
}) {
  const group = useRef(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime * speed + phase
    const pingPong = 1 - Math.abs((t % 2) - 1)
    const z = zMin + (zMax - zMin) * pingPong
    const goingForward = Math.floor(t) % 2 === 0

    group.current.position.set(
      x,
      y + Math.sin(t * 1.1) * 0.1,
      z,
    )
    // Face travel direction along Z
    group.current.rotation.y = goingForward ? 0 : Math.PI
  })

  return <group ref={group}>{children}</group>
}
