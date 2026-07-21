import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollProgress } from '../../../hooks/useScrollProgress'

const MAX_BUBBLES = 48
const EPIPELAGIC_END = 0.22

/**
 * Glowing bubble trail that follows the pointer in the epipelagic zone.
 */
export default function BubbleTrail() {
  const progress = useScrollProgress()
  const progressRef = useRef(progress)
  progressRef.current = progress

  const meshRef = useRef(null)
  const { camera, pointer, viewport } = useThree()

  const bubbles = useMemo(
    () =>
      Array.from({ length: MAX_BUBBLES }, () => ({
        life: 0,
        maxLife: 1,
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
      })),
    [],
  )

  const prevPointer = useRef({ x: 0, y: 0 })
  const spawnIndex = useRef(0)

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    const inZone = progressRef.current < EPIPELAGIC_END
    const moved =
      Math.abs(pointer.x - prevPointer.current.x) +
        Math.abs(pointer.y - prevPointer.current.y) >
      0.002

    if (inZone && moved) {
      const cursor = new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0,
      )
      cursor.unproject(camera)
      const dir = cursor.sub(camera.position).normalize()
      const spawn = camera.position.clone().add(dir.multiplyScalar(6))

      const bubble = bubbles[spawnIndex.current % MAX_BUBBLES]
      spawnIndex.current += 1
      bubble.life = 1
      bubble.maxLife = 0.65 + Math.random() * 0.45
      bubble.x = spawn.x + (Math.random() - 0.5) * 0.25
      bubble.y = spawn.y + (Math.random() - 0.5) * 0.25
      bubble.z = spawn.z + (Math.random() - 0.5) * 0.25
      bubble.vx = (Math.random() - 0.5) * 0.35
      bubble.vy = 0.45 + Math.random() * 0.55
      bubble.vz = (Math.random() - 0.5) * 0.35
    }

    prevPointer.current = { x: pointer.x, y: pointer.y }

    const positions = mesh.geometry.attributes.position
    for (let i = 0; i < MAX_BUBBLES; i += 1) {
      const b = bubbles[i]
      if (b.life > 0) {
        b.life -= delta / b.maxLife
        b.x += b.vx * delta
        b.y += b.vy * delta
        b.z += b.vz * delta
      }
      const alive = b.life > 0 && inZone
      positions.setXYZ(i, alive ? b.x : 0, alive ? b.y : 40, alive ? b.z : 0)
    }
    positions.needsUpdate = true
  })

  const initialPositions = useMemo(() => {
    const arr = new Float32Array(MAX_BUBBLES * 3)
    for (let i = 0; i < MAX_BUBBLES; i += 1) arr[i * 3 + 1] = 40
    return arr
  }, [])

  return (
    <points ref={meshRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[initialPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a5f3fc"
        size={0.16}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
