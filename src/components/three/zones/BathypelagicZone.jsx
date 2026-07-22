import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js'
import HorizontalPatrol from '../effects/HorizontalPatrol'
import SubmarinePatrol from '../effects/SubmarinePatrol'
import OceanModel from '../models/OceanModel'
import { openAnglerfishModalFromCanvas } from '../../modals/AnglerfishModalBridge'
import { useScrollProgress } from '../../../hooks/useScrollProgress'
import { cameraYFromProgress } from '../../../utils/depthFromProgress'
import anglerUrl from '../../../assets/models/zone-bathypelagic/anglerfish-optimized.glb?url'
import submarineUrl from '../../../assets/models/zone-epipelagic/submarine.glb?url'

/** Midpoint of bathy camera band (progress 0.4→0.6 ≈ Y -16→-24). */
export const BATHYPELAGIC_Y = -16.5

/** Keep models centered in view as camera descends through this section. */
const BATHY_CONTENT_OFFSET_Y = 0.15

const SUBMARINE_TARGET_SIZE = 3.0

/** Keep right edge clear of the HUD sidebar. */
const ANGLER_LANE = { xMin: -2.7, xMax: 0.7, y: 0.15, z: 3.6, speed: 0.055 }

function fitScaleAndCenter(object, targetSize) {
  object.updateMatrixWorld(true)
  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)
  const scale =
    !maxDim || !Number.isFinite(maxDim) ? 0.025 : targetSize / maxDim
  return {
    scale,
    offset: new THREE.Vector3(-center.x, -center.y, -center.z),
  }
}

/**
 * Section 3 — Bathypelagic (1,000m–4,000m / scroll 0.4→0.6)
 * Zone rides the camera so content does not drift; submarine stays here only.
 */
export default function BathypelagicZone() {
  const progress = useScrollProgress()
  const zoneY = cameraYFromProgress(progress)

  return (
    <group position={[0, zoneY, 0]}>
      <group position={[0, BATHY_CONTENT_OFFSET_Y, 0]}>
        <ambientLight intensity={0.32} color="#475569" />
        <pointLight
          position={[0, 1.2, 5]}
          color="#94a3b8"
          intensity={18}
          distance={20}
          decay={2}
        />
        <pointLight
          position={[-2.5, 0.2, 3.5]}
          color="#64748b"
          intensity={8}
          distance={12}
          decay={2}
        />
        <pointLight
          position={[2.5, -0.4, 3.2]}
          color="#475569"
          intensity={7}
          distance={12}
          decay={2}
        />

        <Suspense fallback={null}>
          <SubmarinePatrol
            y={0.25}
            z={3.55}
            xMin={-2.8}
            xMax={1.0}
            cruiseSpeed={0.48}
            turnDuration={2.6}
            yawOffset={Math.PI / 2}
          >
            <RoamingSubmarine />
          </SubmarinePatrol>
        </Suspense>

        <Suspense fallback={null}>
          <ClickableAnglerfish />
        </Suspense>
      </group>
    </group>
  )
}

function RoamingSubmarine() {
  const group = useRef(null)
  const propellerBone = useRef(null)
  const leftLight = useRef(null)
  const rightLight = useRef(null)
  const leftTarget = useRef(null)
  const rightTarget = useRef(null)

  const { scene, animations } = useGLTF(submarineUrl)

  const clone = useMemo(() => {
    try {
      return SkeletonUtils.clone(scene)
    } catch {
      return scene.clone(true)
    }
  }, [scene])

  const { scale: uniformScale, offset: centerOffset } = useMemo(
    () => fitScaleAndCenter(clone, SUBMARINE_TARGET_SIZE),
    [clone],
  )

  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    if (names.length === 0) return
    const action = actions[names[0]]
    action?.reset().setEffectiveTimeScale(1.6).fadeIn(0.2).play()
    return () => action?.fadeOut(0.15)
  }, [actions, names])

  useEffect(() => {
    const bones = []
    clone.traverse((child) => {
      const name = (child.name || '').toLowerCase()
      if (
        name.includes('bone.001') ||
        name.includes('prop') ||
        name.includes('screw')
      ) {
        bones.push(child)
      }
      if (!child.isMesh || !child.material) return
      child.frustumCulled = false
      child.castShadow = false
      child.receiveShadow = false
      child.material = Array.isArray(child.material)
        ? child.material.map((m) => m.clone())
        : child.material.clone()
      const mats = Array.isArray(child.material)
        ? child.material
        : [child.material]
      mats.forEach((mat) => {
        mat.side = THREE.DoubleSide
        if (mat.color) mat.color.set('#b8c5d6')
        if (mat.emissive) {
          mat.emissive.set('#e2e8f0')
          mat.emissiveIntensity = 0.85
        }
        mat.metalness = 0.35
        mat.roughness = 0.55
        mat.needsUpdate = true
      })
    })
    propellerBone.current =
      bones.find((b) => (b.name || '').includes('Bone.001')) || bones[0] || null
  }, [clone])

  useEffect(() => {
    if (leftLight.current && leftTarget.current) {
      leftLight.current.target = leftTarget.current
    }
    if (rightLight.current && rightTarget.current) {
      rightLight.current.target = rightTarget.current
    }
  }, [])

  useFrame((_, delta) => {
    if (propellerBone.current) {
      propellerBone.current.rotation.x += delta * 14
    }
    leftLight.current?.target.updateMatrixWorld()
    rightLight.current?.target.updateMatrixWorld()
  })

  return (
    // Fixed sail-up orientation (same as when it looked correct).
    // Patrol parent only yaws — it does not roll this group.
    <group ref={group} rotation={[-Math.PI / 2, Math.PI / 2, Math.PI / 2]}>
      <group scale={uniformScale}>
        <group position={[centerOffset.x, centerOffset.y, centerOffset.z]}>
          <primitive object={clone} />
        </group>
      </group>

      <group position={[0.9, 0.05, 0]}>
        <spotLight
          ref={leftLight}
          color="#f0f9ff"
          intensity={24}
          distance={12}
          angle={0.3}
          penumbra={0.55}
          decay={1.7}
          position={[0.05, 0.06, 0.1]}
        />
        <spotLight
          ref={rightLight}
          color="#f0f9ff"
          intensity={24}
          distance={12}
          angle={0.3}
          penumbra={0.55}
          decay={1.7}
          position={[0.05, 0.06, -0.1]}
        />
        <object3D ref={leftTarget} position={[2.8, -0.12, 0.1]} />
        <object3D ref={rightTarget} position={[2.8, -0.12, -0.1]} />
      </group>
    </group>
  )
}

function ClickableAnglerfish() {
  const [selected, setSelected] = useState(false)

  return (
    <HorizontalPatrol
      y={ANGLER_LANE.y}
      z={ANGLER_LANE.z}
      xMin={ANGLER_LANE.xMin}
      xMax={ANGLER_LANE.xMax}
      speed={ANGLER_LANE.speed}
      yawOffset={0}
    >
      <group rotation={[-0.15, 0, 0]}>
        <OceanModel
          url={anglerUrl}
          targetSize={26}
          glowColor="#fef08a"
          glowIntensity={2.4}
          outlined={selected}
          onClick={() => {
            setSelected(true)
            openAnglerfishModalFromCanvas()
            window.setTimeout(() => setSelected(false), 500)
          }}
        />
        <pointLight
          color="#fde047"
          intensity={14}
          distance={10}
          decay={2}
          position={[0.25, 0.12, 0.15]}
        />
      </group>
    </HorizontalPatrol>
  )
}

useGLTF.preload(anglerUrl)
useGLTF.preload(submarineUrl)
