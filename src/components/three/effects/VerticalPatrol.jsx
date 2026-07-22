import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Continuous up ↔ down patrol on a straight vertical line.
 */
export default function VerticalPatrol({
  x = 0,
  z = 3,
  yMin = 0.3,
  yMax = 1.2,
  speed = 0.4,
  phase = 0,
  children,
}) {
  const group = useRef(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime * speed + phase
    const pingPong = 1 - Math.abs((t % 2) - 1)
    const y = yMin + (yMax - yMin) * pingPong

    group.current.position.set(
      x + Math.sin(t * 0.9) * 0.06,
      y,
      z,
    )
  })

  return <group ref={group}>{children}</group>
}
