import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Rising hydrothermal smoke — disperses / spins near the cursor,
 * reacting to pointer velocity.
 */
export default function SmokePlume({
  position = [0, 0, 0],
  count = 90,
  color = '#fb923c',
  riseSpeed = 0.55,
}) {
  const pointsRef = useRef(null)
  const { pointer } = useThree()
  const prevPointer = useRef(new THREE.Vector2())
  const velocity = useRef(new THREE.Vector2())

  const { positions, seeds, base } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    const base = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 0.35
      const x = Math.cos(angle) * radius
      const y = Math.random() * 0.2
      const z = Math.sin(angle) * radius
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      base[i * 3] = x
      base[i * 3 + 1] = y
      base[i * 3 + 2] = z
      seeds[i] = Math.random() * Math.PI * 2
    }
    return { positions, seeds, base }
  }, [count])

  useFrame((state, delta) => {
    const points = pointsRef.current
    if (!points) return

    velocity.current.set(
      pointer.x - prevPointer.current.x,
      pointer.y - prevPointer.current.y,
    )
    prevPointer.current.copy(pointer)
    const speed = Math.min(1.8, velocity.current.length() * 28)

    // Cursor proximity in NDC-ish space mapped loosely to plume local XZ
    const cursorLocalX = pointer.x * 2.2
    const cursorLocalZ = -pointer.y * 1.4

    const attr = points.geometry.attributes.position
    const arr = attr.array
    const t = state.clock.elapsedTime

    for (let i = 0; i < count; i += 1) {
      const ix = i * 3
      let x = arr[ix]
      let y = arr[ix + 1]
      let z = arr[ix + 2]

      y += (riseSpeed + seeds[i] * 0.08) * delta
      const swirl = t * (0.6 + seeds[i] * 0.4) + seeds[i]
      x = base[ix] + Math.cos(swirl) * (0.15 + y * 0.08)
      z = base[ix + 2] + Math.sin(swirl) * (0.15 + y * 0.08)

      const dx = x - cursorLocalX
      const dz = z - cursorLocalZ
      const dist = Math.sqrt(dx * dx + dz * dz) + 0.001
      const near = Math.max(0, 1.4 - dist)

      if (near > 0) {
        // Disperse away from cursor
        x += (dx / dist) * near * (0.9 + speed) * delta * 3
        z += (dz / dist) * near * (0.9 + speed) * delta * 3
        // Spin faster when mouse moves
        const spin = t * (2 + speed * 8) + seeds[i]
        x += Math.cos(spin) * near * 0.12
        z += Math.sin(spin) * near * 0.12
        y += near * speed * delta * 1.5
      }

      if (y > 3.8) {
        y = Math.random() * 0.15
        x = base[ix]
        z = base[ix + 2]
      }

      arr[ix] = x
      arr[ix + 1] = y
      arr[ix + 2] = z
    }

    attr.needsUpdate = true
  })

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.09}
        transparent
        opacity={0.72}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
