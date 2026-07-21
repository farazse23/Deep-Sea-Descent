import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Float, useAnimations, useGLTF } from '@react-three/drei'
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js'
import BubbleTrail from '../effects/BubbleTrail'
import SwimPath from '../effects/SwimPath'
import OceanModel from '../models/OceanModel'
import { openTurtleModalFromCanvas } from '../../modals/TurtleModalBridge'
import turtleUrl from '../../../assets/models/zone-epipelagic/sea-turtle-optimized.glb?url'
import dolphinUrl from '../../../assets/models/zone-epipelagic/dolphin-optimized.glb?url'

/**
 * Dolphin loop (all points stay on-screen):
 * 1) Pass in front of the user left → right
 * 2) Arc into a small roam at mid-depth, then repeat
 */
const DOLPHIN_PATH = [
  // Front pass: left → right (close to camera)
  [-2.6, 1.0, 3.6],
  [-1.2, 1.15, 3.85],
  [0.0, 1.05, 4.0],
  [1.2, 1.15, 3.85],
  [2.6, 1.0, 3.6],
  // Turn back into section roam (still in frame)
  [2.2, 1.35, 2.6],
  [1.0, 1.5, 2.0],
  [-0.2, 1.4, 1.7],
  [-1.6, 1.3, 2.1],
  [-2.4, 1.2, 2.8],
]

/**
 * Turtle GLB has broken/skinned bounds — NEVER use auto Resize on it.
 * Tune TURTLE_SCALE only (smaller = smaller turtle).
 */
const TURTLE_SCALE = 1.6

/**
 * Section 1 — Epipelagic (0m–200m / scroll 0→0.2)
 * Submarine intentionally omitted — static in the next dark zone (STEP 7+).
 */
export default function EpipelagicZone() {
  return (
    <group>
      <BubbleTrail />

      <Suspense fallback={null}>
        <ManualTurtle />
      </Suspense>

      <Suspense fallback={null}>
        <SwimPath
          points={DOLPHIN_PATH}
          speed={0.035}
          phase={0}
          bobAmount={0.08}
          yawOffset={0}
        >
          <OceanModel url={dolphinUrl} targetSize={3.6} />
        </SwimPath>
      </Suspense>
    </group>
  )
}

function ManualTurtle() {
  const group = useRef(null)
  const { scene, animations } = useGLTF(turtleUrl)
  const clone = useMemo(() => {
    try {
      return SkeletonUtils.clone(scene)
    } catch {
      return scene.clone(true)
    }
  }, [scene])
  const { actions, names } = useAnimations(animations, group)
  const [selected, setSelected] = useState(false)

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
      if (child.material) {
        child.material = Array.isArray(child.material)
          ? child.material.map((m) => m.clone())
          : child.material.clone()
      }
    })
  }, [clone])

  useEffect(() => {
    clone.traverse((child) => {
      if (!child.isMesh || !child.material) return
      const mats = Array.isArray(child.material)
        ? child.material
        : [child.material]
      mats.forEach((mat) => {
        if (!mat.emissive) return
        if (selected) {
          mat.emissive.set('#22d3ee')
          mat.emissiveIntensity = 0.5
        } else {
          mat.emissive.set('#000000')
          mat.emissiveIntensity = 0
        }
      })
    })
  }, [clone, selected])

  return (
    <Float speed={1.1} rotationIntensity={0.04} floatIntensity={0.12}>
      <group
        ref={group}
        position={[-2.2, 0.1, 2.4]}
        rotation={[0, Math.PI + Math.PI / 2, 0]}
        scale={TURTLE_SCALE}
        onClick={(event) => {
          event.stopPropagation()
          setSelected(true)
          openTurtleModalFromCanvas()
          window.setTimeout(() => setSelected(false), 400)
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <primitive object={clone} />
      </group>
    </Float>
  )
}

useGLTF.preload(turtleUrl)
useGLTF.preload(dolphinUrl)
