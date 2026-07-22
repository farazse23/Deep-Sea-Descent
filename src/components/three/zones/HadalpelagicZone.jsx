import { Suspense, useEffect, useMemo, useState } from 'react'
import { Text, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js'
import SwimPath from '../effects/SwimPath'
import MarineSnow from '../effects/MarineSnow'
import { hideHelperMeshes } from '../utils/hideHelperMeshes'
import { openHadalModalFromCanvas } from '../../modals/HadalModalBridge'
import { useScrollProgress } from '../../../hooks/useScrollProgress'
import { cameraYFromProgress } from '../../../utils/depthFromProgress'
import amphipodUrl from '../../../assets/models/zone-hadalpelagic/amphipod-optimized.glb?url'

/** Midpoint of hadal camera band (progress 0.8→1.0 maps to Y -32→-40). */
export const HADALPELAGIC_Y = -36

/** Pull scene content below the camera so it stays in frame with the trench tilt. */
const HADAL_CONTENT_OFFSET_Y = -2.1

const AMPHIPOD_SCALE = 0.18

const AMPHIPOD_PATH_A = [
  [-2.0, -0.2, 3.4],
  [-0.6, 0.05, 3.6],
  [0.8, -0.25, 3.5],
  [1.8, 0.0, 3.2],
  [0.4, -0.45, 3.0],
  [-1.2, -0.2, 3.1],
]

const AMPHIPOD_PATH_B = [
  [2.0, -0.55, 2.8],
  [0.8, -0.3, 3.1],
  [-0.8, -0.65, 3.0],
  [-2.0, -0.4, 2.6],
  [-0.4, -0.5, 2.5],
  [1.2, -0.55, 2.7],
]

const FLOOR_SPECKS = [
  [-2.4, -1.08, 2.0],
  [-0.8, -1.1, 2.6],
  [0.5, -1.09, 2.3],
  [1.9, -1.08, 1.9],
  [-1.5, -1.1, 3.2],
  [2.3, -1.09, 2.8],
]

/**
 * Section 5 — Hadalpelagic (6,000m–11,000m / scroll 0.8→1.0)
 * Challenger Deep finale: trench atmosphere + hadal amphipods.
 */
export default function HadalpelagicZone() {
  const progress = useScrollProgress()
  // Ride with the descent camera so models stay in frame for the full 0.8→1.0 band.
  const zoneY = cameraYFromProgress(progress)

  return (
    <group position={[0, zoneY, 0]}>
      <group position={[0, HADAL_CONTENT_OFFSET_Y, 0]}>
      <ambientLight intensity={0.14} color="#1e1b4b" />
      <pointLight
        position={[0, 0.35, 4]}
        color="#7c3aed"
        intensity={10}
        distance={16}
        decay={2}
      />
      <pointLight
        position={[-2, -0.45, 3]}
        color="#a78bfa"
        intensity={5}
        distance={10}
        decay={2}
      />
      <pointLight
        position={[1.5, -1.0, 2.5]}
        color="#6366f1"
        intensity={4}
        distance={8}
        decay={2}
      />

      <TrenchEnvironment />
      <MarineSnow
        count={90}
        yMin={-1.55}
        yMax={0.1}
        spreadX={7}
        fallSpeed={0.07}
        opacity={0.45}
      />
      <ChallengerDeepLabel />

      <Suspense fallback={null}>
        <SwimPath
          points={AMPHIPOD_PATH_A}
          speed={0.016}
          phase={0.1}
          bobAmount={0.03}
          yawOffset={0}
        >
          <ManualAmphipod />
        </SwimPath>
      </Suspense>

      <Suspense fallback={null}>
        <SwimPath
          points={AMPHIPOD_PATH_B}
          speed={0.014}
          phase={0.55}
          bobAmount={0.03}
          yawOffset={Math.PI}
        >
          <ManualAmphipod scale={AMPHIPOD_SCALE * 0.85} />
        </SwimPath>
      </Suspense>

      <Suspense fallback={null}>
        <group position={[-2.3, -0.35, 3.25]} rotation={[0, 0.35, 0]}>
          <ManualAmphipod scale={AMPHIPOD_SCALE * 0.7} />
        </group>
      </Suspense>

      <Suspense fallback={null}>
        <ClickableAmphipod />
      </Suspense>
      </group>
    </group>
  )
}

function TrenchEnvironment() {
  return (
    <group>
      <mesh position={[0, -1.15, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial
          color="#020617"
          emissive="#1e1b4b"
          emissiveIntensity={0.35}
          roughness={0.95}
        />
      </mesh>
      <mesh position={[-3.8, -0.2, 1.4]} rotation={[0, 0.22, 0]}>
        <planeGeometry args={[3.5, 6]} />
        <meshStandardMaterial
          color="#030712"
          emissive="#312e81"
          emissiveIntensity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[3.8, -0.2, 1.4]} rotation={[0, -0.22, 0]}>
        <planeGeometry args={[3.5, 6]} />
        <meshStandardMaterial
          color="#030712"
          emissive="#312e81"
          emissiveIntensity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      {FLOOR_SPECKS.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshBasicMaterial color="#c4b5fd" transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  )
}

function ChallengerDeepLabel() {
  return (
    <group position={[0, 0.05, 3.05]}>
      <Text
        fontSize={0.1}
        color="#c4b5fd"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
        outlineWidth={0.004}
        outlineColor="#1e1b4b"
      >
        CHALLENGER DEEP · 10,994 M
      </Text>
    </group>
  )
}

function ManualAmphipod({ scale = AMPHIPOD_SCALE, highlighted = false }) {
  const { scene } = useGLTF(amphipodUrl)
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
      const mats = Array.isArray(child.material)
        ? child.material
        : [child.material]
      mats.forEach((mat) => {
        if (mat.emissive) {
          mat.emissive.set(highlighted ? '#e9d5ff' : '#c4b5fd')
          mat.emissiveIntensity = highlighted ? 0.75 : 0.45
        }
        mat.transparent = true
        mat.opacity = highlighted ? 0.95 : 0.85
      })
    })
  }, [clone, highlighted])

  return (
    <group scale={scale}>
      <primitive object={clone} />
    </group>
  )
}

function ClickableAmphipod() {
  const [selected, setSelected] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <group
      position={[0.1, -0.55, 3.7]}
      onClick={(e) => {
        e.stopPropagation()
        setSelected(true)
        openHadalModalFromCanvas()
        window.setTimeout(() => setSelected(false), 500)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <ManualAmphipod
        scale={AMPHIPOD_SCALE * 1.15}
        highlighted={hovered || selected}
      />
      {selected ? (
        <mesh>
          <sphereGeometry args={[0.55, 12, 12]} />
          <meshBasicMaterial
            color="#a78bfa"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      ) : null}
      <pointLight
        color="#c4b5fd"
        intensity={hovered ? 6 : 4}
        distance={6}
        decay={2}
        position={[0, 0.15, 0]}
      />
    </group>
  )
}

useGLTF.preload(amphipodUrl)
