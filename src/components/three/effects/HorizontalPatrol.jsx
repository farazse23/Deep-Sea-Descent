import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Continuous left ↔ right patrol on a straight horizontal line.
 */
export default function HorizontalPatrol({
  y = 0.8,
  z = 2,
  xMin = -4.5,
  xMax = 4.5,
  speed = 1.1,
  phase = 0,
  yawOffset = 0,
  children,
}) {
  const group = useRef(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime * speed + phase
    // Triangle wave: 0→1→0→1… mapped to xMin↔xMax
    const pingPong = 1 - Math.abs((t % 2) - 1)
    const x = xMin + (xMax - xMin) * pingPong
    const goingRight = Math.floor(t) % 2 === 0

    group.current.position.set(x, y + Math.sin(t * 1.3) * 0.12, z)
    group.current.rotation.y =
      (goingRight ? Math.PI / 2 : -Math.PI / 2) + yawOffset
  })

  return <group ref={group}>{children}</group>
}
