import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Soft animated god-ray shafts for the sunlit epipelagic surface.
 */
export default function GodRays({ position = [0, 6, -4] }) {
  const group = useRef(null)

  const rays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        x: (i - 3) * 1.35,
        rotZ: (i - 3) * 0.08,
        phase: i * 0.7,
        width: 0.35 + (i % 3) * 0.12,
      })),
    [],
  )

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    group.current.children.forEach((mesh, i) => {
      const ray = rays[i]
      const pulse = 0.12 + Math.sin(t * 0.6 + ray.phase) * 0.06
      mesh.material.opacity = pulse
    })
  })

  return (
    <group ref={group} position={position}>
      {rays.map((ray, i) => (
        <mesh key={i} position={[ray.x, 0, 0]} rotation={[0.15, 0, ray.rotZ]}>
          <planeGeometry args={[ray.width, 14]} />
          <meshBasicMaterial
            color="#a5f3fc"
            transparent
            opacity={0.15}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}
