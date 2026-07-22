import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js'
import SwimPath from '../effects/SwimPath'
import OceanModel from '../models/OceanModel'
import { openVentModalFromCanvas } from '../../modals/VentModalBridge'
import ventUrl from '../../../assets/models/zone-abyssopelagic/hydrothermal-vent-optimized.glb?url'
import tripodUrl from '../../../assets/models/zone-abyssopelagic/tripod-fish-optimized.glb?url'
import jellyfishUrl from '../../../assets/models/zone-mesopelagic/glowing-jellyfish-optimized.glb?url'

/** Camera Y ≈ -23→-33 in this scroll band — center content on ~-28. */
export const ABYSSOPELAGIC_Y = -28

const VENT_SCALE = 1.45
const TRIPOD_SCALE = 3.2

const TRIPOD_PATH = [
  [-2.4, -0.35, 3.2],
  [-1.0, -0.2, 3.5],
  [0.6, -0.3, 3.6],
  [2.0, -0.15, 3.3],
  [1.2, -0.45, 2.9],
  [-0.5, -0.5, 2.8],
  [-2.0, -0.4, 3.0],
]

/** Hide flat helper lines / planes baked into heavy GLBs. */
function hideHelperMeshes(root) {
  root.traverse((child) => {
    if (!child.isMesh) return
    const name = (child.name || '').toLowerCase()
    const vertCount = child.geometry?.attributes?.position?.count ?? 0
    child.geometry?.computeBoundingBox?.()
    const box = child.geometry?.boundingBox
    let isThinSlab = false
    if (box && vertCount > 0 && vertCount <= 48) {
      const size = box.getSize(new THREE.Vector3())
      const dims = [size.x, size.y, size.z].sort((a, b) => a - b)
      isThinSlab = dims[0] < dims[1] * 0.1 && dims[1] > 0.1
    }
    const mats = Array.isArray(child.material)
      ? child.material
      : [child.material]
    const isLineHelper = mats.some(
      (m) =>
        m &&
        (m.wireframe || m.opacity < 0.99 || (m.transparent && m.opacity < 1)),
    )
    if (
      isThinSlab ||
      isLineHelper ||
      vertCount <= 8 ||
      name.includes('line') ||
      name.includes('plane') ||
      name.includes('helper')
    ) {
      child.visible = false
    }
  })
}

/**
 * Section 4 — Abyssopelagic (4,000m–6,000m / scroll 0.6→0.8)
 */
export default function AbyssopelagicZone() {
  return (
    <group position={[0, ABYSSOPELAGIC_Y, 0]}>
      <ambientLight intensity={0.14} color="#1c1917" />
      <pointLight
        position={[0, 0.8, 4]}
        color="#ea580c"
        intensity={14}
        distance={18}
        decay={2}
      />

      <Suspense fallback={null}>
        <ClickableVent position={[-2.2, -1.55, 3.6]} />
      </Suspense>
      <Suspense fallback={null}>
        <ClickableVent position={[2.4, -1.6, 3.3]} scale={0.95} />
      </Suspense>

      <Suspense fallback={null}>
        <SwimPath
          points={TRIPOD_PATH}
          speed={0.016}
          phase={0.3}
          bobAmount={0.05}
          yawOffset={Math.PI}
        >
          <ManualTripodFish />
        </SwimPath>
      </Suspense>

      {/* Jellyfish — static ambient glow */}
      <Suspense fallback={null}>
        <group position={[-1.6, 0.75, 3.1]}>
          <SwimmingJellyfish size={1.9} flip />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[1.8, 0.8, 2.8]}>
          <SwimmingJellyfish size={1.55} flip />
        </group>
      </Suspense>
    </group>
  )
}

function SwimmingJellyfish({ size, flip = false }) {
  return (
    <group rotation={flip ? [0, Math.PI, 0] : [0, 0, 0]}>
      <OceanModel
        url={jellyfishUrl}
        targetSize={size}
        glowColor="#c4b5fd"
        glowIntensity={1.4}
      />
      <pointLight
        color="#ddd6fe"
        intensity={3}
        distance={8}
        decay={2}
        position={[0, 0.2, 0]}
      />
    </group>
  )
}

function ManualTripodFish() {
  const group = useRef(null)
  const { scene, animations } = useGLTF(tripodUrl)
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
    hideHelperMeshes(clone)
    clone.traverse((child) => {
      if (!child.isMesh || !child.visible || !child.material) return
      child.frustumCulled = true
      child.material = Array.isArray(child.material)
        ? child.material.map((m) => m.clone())
        : child.material.clone()
      const mats = Array.isArray(child.material)
        ? child.material
        : [child.material]
      mats.forEach((mat) => {
        if (mat.emissive) {
          mat.emissive.set('#fdba74')
          mat.emissiveIntensity = 0.35
        }
      })
    })
  }, [clone])

  return (
    <group ref={group} scale={TRIPOD_SCALE} rotation={[Math.PI / 2, 0, 0]}>
      <primitive object={clone} />
    </group>
  )
}

function ClickableVent({ position, scale = 1 }) {
  const [selected, setSelected] = useState(false)
  const { scene } = useGLTF(ventUrl)
  const clone = useMemo(() => {
    try {
      return SkeletonUtils.clone(scene)
    } catch {
      return scene.clone(true)
    }
  }, [scene])

  useEffect(() => {
    hideHelperMeshes(clone)
    clone.traverse((child) => {
      if (!child.isMesh || !child.visible || !child.material) return
      child.frustumCulled = true
      child.material = Array.isArray(child.material)
        ? child.material.map((m) => m.clone())
        : child.material.clone()
    })
  }, [clone])

  return (
    <group
      position={position}
      scale={VENT_SCALE * scale}
      onClick={(e) => {
          e.stopPropagation()
          setSelected(true)
          openVentModalFromCanvas()
          window.setTimeout(() => setSelected(false), 500)
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <primitive object={clone} />
        {selected ? (
          <mesh>
            <sphereGeometry args={[1.4, 12, 12]} />
            <meshBasicMaterial
              color="#22d3ee"
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>
        ) : null}
        <pointLight
          color="#f97316"
          intensity={14}
          distance={8}
          decay={2}
          position={[0, 1.2, 0]}
        />
      </group>
  )
}

useGLTF.preload(ventUrl)
useGLTF.preload(tripodUrl)
useGLTF.preload(jellyfishUrl)
