import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Float, useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js'
import SwimPath from '../effects/SwimPath'
import OceanModel from '../models/OceanModel'
import { openJellyfishModalFromCanvas } from '../../modals/JellyfishModalBridge'
import whaleUrl from '../../../assets/models/zone-mesopelagic/blue-whale-optimized.glb?url'
import jellyfishUrl from '../../../assets/models/zone-mesopelagic/glowing-jellyfish-optimized.glb?url'
import glowingFishUrl from '../../../assets/models/zone-mesopelagic/glowing-fish-optimized.glb?url'

export const MESOPELAGIC_Y = -8.5

/** Dolphin-style: front left→right, then on-screen roam. */
const WHALE_PATH = [
  [-2.6, 0.3, 3.6],
  [-1.2, 0.45, 3.85],
  [0.0, 0.35, 4.0],
  [1.2, 0.45, 3.85],
  [2.6, 0.3, 3.6],
  [2.2, 0.6, 2.6],
  [0.6, 0.75, 2.0],
  [-0.8, 0.55, 1.8],
  [-2.0, 0.4, 2.3],
  [-2.5, 0.35, 3.0],
]

/** Top → bottom descent, then loop back up off to the side. */
const FISH_PATH = [
  [1.9, 2.6, 2.5],
  [1.7, 1.5, 2.55],
  [2.0, 0.4, 2.4],
  [1.6, -0.7, 2.35],
  [1.9, -1.9, 2.2],
  [2.3, -0.6, 2.0],
  [2.2, 0.8, 2.15],
  [2.0, 2.0, 2.35],
]

const WHALE_SCALE = 0.35

/**
 * Section 2 — Mesopelagic (200m–1,000m / scroll 0.2→0.4)
 */
export default function MesopelagicZone() {
  return (
    <group position={[0, MESOPELAGIC_Y, 0]}>
      <ambientLight intensity={0.18} color="#334155" />
      <pointLight
        position={[0, 1.5, 4]}
        color="#94a3b8"
        intensity={3}
        distance={16}
        decay={2}
      />

      <Suspense fallback={null}>
        <SwimPath
          points={WHALE_PATH}
          speed={0.028}
          phase={0}
          bobAmount={0.05}
          yawOffset={0}
        >
          <ManualWhale />
        </SwimPath>
      </Suspense>

      {/* Other glowing fish — a bit smaller */}
      <Suspense fallback={null}>
        <SwimPath
          points={FISH_PATH}
          speed={0.035}
          phase={0.55}
          bobAmount={0.04}
          yawOffset={Math.PI / 2}
          lockHorizon={false}
        >
          <OceanModel
            url={glowingFishUrl}
            targetSize={0.9}
            glowColor="#67e8f9"
            glowIntensity={1.1}
          />
        </SwimPath>
      </Suspense>

      {/* Jellyfish — a bit larger, top, moving + clickable */}
      <Suspense fallback={null}>
        <ClickableJellyfish />
      </Suspense>
    </group>
  )
}

function ManualWhale() {
  const group = useRef(null)
  const { scene, animations } = useGLTF(whaleUrl)
  const clone = useMemo(() => {
    try {
      return SkeletonUtils.clone(scene)
    } catch {
      return scene.clone(true)
    }
  }, [scene])
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    if (names.length === 0) return
    const action = actions[names[0]]
    action?.reset().fadeIn(0.25).play()
    return () => action?.fadeOut(0.15)
  }, [actions, names])

  useEffect(() => {
    clone.traverse((child) => {
      if (!child.isMesh) return
      child.frustumCulled = false

      // Helper "wing" planes in the GLB: semi-transparent / flat quads.
      // Edge-on on left↔right (easy to miss); face-on on turns.
      const name = (child.name || '').toLowerCase()
      const mats = Array.isArray(child.material)
        ? child.material
        : [child.material]
      const wasTransparentHelper = mats.some(
        (m) =>
          m &&
          (m.wireframe ||
            m.opacity < 0.99 ||
            (m.transparent && m.opacity < 1)),
      )
      const vertCount = child.geometry?.attributes?.position?.count ?? 0
      child.geometry?.computeBoundingBox?.()
      const box = child.geometry?.boundingBox
      let isSimpleSlab = false
      if (box && vertCount > 0 && vertCount <= 48) {
        const size = box.getSize(new THREE.Vector3())
        const dims = [size.x, size.y, size.z].sort((a, b) => a - b)
        isSimpleSlab = dims[0] < dims[1] * 0.08 && dims[1] > 0.15
      }

      if (
        wasTransparentHelper ||
        isSimpleSlab ||
        vertCount <= 8 ||
        name.includes('plane') ||
        name.includes('helper') ||
        name.includes('collision') ||
        name.includes('shadow')
      ) {
        child.visible = false
        return
      }

      child.material = new THREE.MeshStandardMaterial({
        color: '#64748b',
        roughness: 0.65,
        metalness: 0.05,
        emissive: '#1e293b',
        emissiveIntensity: 0.15,
        side: THREE.FrontSide,
      })
    })
  }, [clone])

  // GLB is authored upright (spine on Y); tip it so it swims horizontal.
  return (
    <group ref={group} scale={WHALE_SCALE} rotation={[Math.PI / 2, 0, 0]}>
      <primitive object={clone} />
    </group>
  )
}

function ClickableJellyfish() {
  const [selected, setSelected] = useState(false)

  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.5}>
      <group position={[0.2, 1.7, 3.0]}>
        <OceanModel
          url={jellyfishUrl}
          targetSize={3.8}
          glowColor="#c4b5fd"
          glowIntensity={1.7}
          outlined={selected}
          onClick={() => {
            setSelected(true)
            openJellyfishModalFromCanvas()
            window.setTimeout(() => setSelected(false), 500)
          }}
        />
        <pointLight
          color="#ddd6fe"
          intensity={5}
          distance={12}
          decay={2}
          position={[0, 0.25, 0]}
        />
      </group>
    </Float>
  )
}

useGLTF.preload(whaleUrl)
useGLTF.preload(jellyfishUrl)
useGLTF.preload(glowingFishUrl)
