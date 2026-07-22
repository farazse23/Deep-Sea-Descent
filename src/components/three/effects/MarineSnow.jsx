import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Slow-falling organic particles for deep-ocean zones.
 */
export default function MarineSnow({
  count = 80,
  spreadX = 9,
  yMin = -1.2,
  yMax = 2.8,
  fallSpeed = 0.12,
  color = '#c4b5fd',
  size = 0.035,
  opacity = 0.45,
}) {
  const pointsRef = useRef(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spreadX
      arr[i * 3 + 1] = yMin + Math.random() * (yMax - yMin)
      arr[i * 3 + 2] = Math.random() * 3.5 + 0.8
    }
    return arr
  }, [count, spreadX, yMin, yMax])

  useFrame((_, delta) => {
    const geo = pointsRef.current?.geometry
    if (!geo) return
    const pos = geo.attributes.position
    for (let i = 0; i < count; i++) {
      pos.array[i * 3 + 1] -= delta * fallSpeed
      if (pos.array[i * 3 + 1] < yMin) {
        pos.array[i * 3 + 1] = yMax
        pos.array[i * 3] = (Math.random() - 0.5) * spreadX
        pos.array[i * 3 + 2] = Math.random() * 3.5 + 0.8
      }
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  )
}
