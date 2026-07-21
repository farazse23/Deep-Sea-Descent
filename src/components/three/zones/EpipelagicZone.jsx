import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Float, useAnimations, useGLTF } from '@react-three/drei'
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js'
import GodRays from '../effects/GodRays'
import BubbleTrail from '../effects/BubbleTrail'
import SwimPath from '../effects/SwimPath'
import OceanModel from '../models/OceanModel'
import { openTurtleModalFromCanvas } from '../../modals/TurtleModalBridge'
import submarineUrl from '../../../assets/models/zone-epipelagic/submarine.glb?url'
import turtleUrl from '../../../assets/models/zone-epipelagic/sea-turtle-optimized.glb?url'
import dolphinUrl from '../../../assets/models/zone-epipelagic/dolphin-optimized.glb?url'

const DOLPHIN_PATH = [
  [-5.0, 1.8, 3.2],
  [-1.2, 2.4, 4.0],
  [3.0, 1.6, 3.0],
  [5.2, 2.2, 0.4],
  [2.5, 1.4, -2.8],
  [-2.0, 2.0, -3.2],
  [-4.5, 1.5, -1.2],
  [-5.5, 2.1, 1.4],
]

const SUBMARINE_PATH = [
  [-2.2, 1.2, 2.0],
  [0.0, 1.4, 2.4],
  [2.2, 1.1, 2.0],
  [1.5, 1.3, 1.2],
  [-1.5, 1.2, 1.4],
]

/**
 * Turtle GLB has broken/skinned bounds — NEVER use auto Resize on it.
 * Tune TURTLE_SCALE only (smaller = smaller turtle).
 */
const TURTLE_SCALE = 1.6

/**
 * Section 1 — Epipelagic (0m–200m / scroll 0→0.2)
 */
export default function EpipelagicZone() {
  return (
    <group>
      <GodRays position={[0, 7, -5]} />
      <BubbleTrail />

      <Suspense fallback={null}>
        <SwimPath
          points={SUBMARINE_PATH}
          speed={0.02}
          phase={0}
          bobAmount={0.05}
          yawOffset={0}
        >
          <OceanModel
            url={submarineUrl}
            targetSize={3.5}
            playAnimation={false}
          />
        </SwimPath>
      </Suspense>

      <Suspense fallback={null}>
        <ManualTurtle />
      </Suspense>

      <Suspense fallback={null}>
        <SwimPath
          points={DOLPHIN_PATH}
          speed={0.04}
          phase={0.35}
          bobAmount={0.22}
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
useGLTF.preload(submarineUrl)
useGLTF.preload(dolphinUrl)
