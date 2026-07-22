import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Submarine-style lane patrol:
 * cruise left → right, slow 180° turn, cruise right → left, repeat.
 * Outer group = position only; inner group = yaw only (keeps sail upright).
 */
export default function SubmarinePatrol({
  y = 0.2,
  z = 3.5,
  xMin = -2.8,
  xMax = 2.4,
  cruiseSpeed = 0.55,
  turnDuration = 2.4,
  yawOffset = 0,
  children,
}) {
  const positionRef = useRef(null)
  const yawRef = useRef(null)
  const x = useRef(xMin)
  const goingRight = useRef(true)
  const mode = useRef('cruise') // 'cruise' | 'turn'
  const turnT = useRef(0)
  const yawFrom = useRef(0)
  const yawTo = useRef(0)
  const yaw = useRef(0)

  const rightYaw = Math.PI / 2 + yawOffset
  const leftYaw = -Math.PI / 2 + yawOffset

  yaw.current = rightYaw
  yawFrom.current = rightYaw
  yawTo.current = rightYaw

  useFrame((_, delta) => {
    if (!positionRef.current || !yawRef.current) return
    const dt = Math.min(delta, 0.05)

    if (mode.current === 'cruise') {
      const dir = goingRight.current ? 1 : -1
      x.current += dir * cruiseSpeed * dt

      if (goingRight.current && x.current >= xMax) {
        x.current = xMax
        mode.current = 'turn'
        turnT.current = 0
        yawFrom.current = yaw.current
        yawTo.current = leftYaw
      } else if (!goingRight.current && x.current <= xMin) {
        x.current = xMin
        mode.current = 'turn'
        turnT.current = 0
        yawFrom.current = yaw.current
        yawTo.current = rightYaw
      }
    } else {
      turnT.current += dt / turnDuration
      const t = Math.min(1, turnT.current)
      const eased = t * t * (3 - 2 * t)
      yaw.current = THREE.MathUtils.lerp(yawFrom.current, yawTo.current, eased)

      // Slight forward creep while turning
      x.current += (goingRight.current ? 0.06 : -0.06) * dt

      if (t >= 1) {
        yaw.current = yawTo.current
        goingRight.current = !goingRight.current
        mode.current = 'cruise'
      }
    }

    positionRef.current.position.set(
      x.current,
      y + Math.sin(performance.now() * 0.0012) * 0.035,
      z,
    )

    // Yaw only — never roll/pitch the patrol root (keeps sail upright)
    yawRef.current.rotation.order = 'YXZ'
    yawRef.current.rotation.x = 0
    yawRef.current.rotation.z = 0
    yawRef.current.rotation.y = yaw.current
  })

  return (
    <group ref={positionRef}>
      <group ref={yawRef}>{children}</group>
    </group>
  )
}
