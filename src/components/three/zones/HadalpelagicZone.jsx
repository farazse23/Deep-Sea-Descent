import { Suspense, useEffect, useMemo, useState } from 'react'
import { Float, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js'
import SwimPath from '../effects/SwimPath'
import OceanModel from '../models/OceanModel'
import { openPlasticBagModalFromCanvas } from '../../modals/PlasticBagModalBridge'
import amphipodUrl from '../../../assets/models/zone-hadalpelagic/amphipod-optimized.glb?url'
import bagUrl from '../../../assets/models/zone-hadalpelagic/plastic-bag-optimized.glb?url'

/** Camera Y ≈ -32→-40 in this scroll band. */
export const HADALPELAGIC_Y = -32.5

/** Manual scale — Resize was blowing amphipods up across the whole dive. */
const AMPHIPOD_SCALE = 0.18

const AMPHIPOD_PATH_A = [
  [-2.0, 0.6, 3.4],
  [-0.6, 0.9, 3.6],
  [0.8, 0.5, 3.5],
  [1.8, 0.8, 3.2],
  [0.4, 0.3, 3.0],
  [-1.2, 0.5, 3.1],
]

const AMPHIPOD_PATH_B = [
  [2.2, -0.2, 2.8],
  [0.8, 0.1, 3.1],
  [-0.8, -0.3, 3.0],
  [-2.0, 0.0, 2.6],
  [-0.4, 0.2, 2.5],
  [1.2, -0.1, 2.7],
]

/**
 * Section 5 — Hadalpelagic (6,000m–11,000m / scroll 0.8→1.0)
 */
export default function HadalpelagicZone() {
  return (
    <group position={[0, HADALPELAGIC_Y, 0]}>
      <ambientLight intensity={0.16} color="#1e1b4b" />
      <pointLight
        position={[0, 1, 4]}
        color="#7c3aed"
        intensity={10}
        distance={16}
        decay={2}
      />
      <pointLight
        position={[-2, 0.2, 3]}
        color="#a78bfa"
        intensity={5}
        distance={10}
        decay={2}
      />

      {/* Soft trench walls — short so they stay in this zone only */}
      <mesh position={[-4.2, 0, 1]} rotation={[0, 0.15, 0]}>
        <planeGeometry args={[2.5, 5]} />
        <meshStandardMaterial
          color="#020617"
          emissive="#312e81"
          emissiveIntensity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[4.2, 0, 1]} rotation={[0, -0.15, 0]}>
        <planeGeometry args={[2.5, 5]} />
        <meshStandardMaterial
          color="#020617"
          emissive="#312e81"
          emissiveIntensity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      <Suspense fallback={null}>
        <SwimPath
          points={AMPHIPOD_PATH_A}
          speed={0.03}
          phase={0.1}
          bobAmount={0.1}
          yawOffset={0}
        >
          <ManualAmphipod />
        </SwimPath>
      </Suspense>

      <Suspense fallback={null}>
        <SwimPath
          points={AMPHIPOD_PATH_B}
          speed={0.026}
          phase={0.55}
          bobAmount={0.12}
          yawOffset={Math.PI}
        >
          <ManualAmphipod scale={AMPHIPOD_SCALE * 0.85} />
        </SwimPath>
      </Suspense>

      <Suspense fallback={null}>
        <ClickablePlasticBag />
      </Suspense>
    </group>
  )
}

function ManualAmphipod({ scale = AMPHIPOD_SCALE }) {
  const { scene } = useGLTF(amphipodUrl)
  const clone = useMemo(() => {
    try {
      return SkeletonUtils.clone(scene)
    } catch {
      return scene.clone(true)
    }
  }, [scene])

  useEffect(() => {
    clone.traverse((child) => {
      if (!child.isMesh || !child.material) return
      child.frustumCulled = true
      child.material = Array.isArray(child.material)
        ? child.material.map((m) => m.clone())
        : child.material.clone()
      const mats = Array.isArray(child.material)
        ? child.material
        : [child.material]
      mats.forEach((mat) => {
        if (!mat.emissive) return
        mat.emissive.set('#c4b5fd')
        mat.emissiveIntensity = 0.45
        mat.transparent = true
        mat.opacity = 0.85
      })
    })
  }, [clone])

  return (
    <group scale={scale}>
      <primitive object={clone} />
    </group>
  )
}

function ClickablePlasticBag() {
  const [selected, setSelected] = useState(false)

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.55}>
      <group position={[0.2, 0.4, 3.8]}>
        <OceanModel
          url={bagUrl}
          targetSize={2.6}
          glowColor="#fda4af"
          glowIntensity={0.45}
          outlined={selected}
          onClick={() => {
            setSelected(true)
            openPlasticBagModalFromCanvas()
            window.setTimeout(() => setSelected(false), 500)
          }}
        />
        <pointLight
          color="#fb7185"
          intensity={6}
          distance={8}
          decay={2}
          position={[0, 0.3, 0]}
        />
      </group>
    </Float>
  )
}

useGLTF.preload(amphipodUrl)
useGLTF.preload(bagUrl)
