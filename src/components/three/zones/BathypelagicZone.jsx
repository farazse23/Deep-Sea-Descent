import { Suspense, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import SwimPath from '../effects/SwimPath'
import HorizontalPatrol from '../effects/HorizontalPatrol'
import OceanModel from '../models/OceanModel'
import { openAnglerfishModalFromCanvas } from '../../modals/AnglerfishModalBridge'
import anglerUrl from '../../../assets/models/zone-bathypelagic/anglerfish-optimized.glb?url'
import squidUrl from '../../../assets/models/zone-bathypelagic/giant-squid-optimized.glb?url'

/**
 * Camera at scroll 0.4→0.6 is Y ≈ -16→-24.
 * Place zone near the start of that band (same pattern as MESO at -8.5).
 */
export const BATHYPELAGIC_Y = -16.5

const SQUID_PATH = [
  [-2.2, 0.5, 3.0],
  [-0.8, 0.8, 3.4],
  [0.9, 0.3, 3.6],
  [2.0, 0.7, 3.2],
  [1.4, -0.3, 2.8],
  [-0.5, -0.4, 3.0],
  [-1.8, 0.1, 2.9],
]

/**
 * Section 3 — Bathypelagic (1,000m–4,000m / scroll 0.4→0.6)
 * Dark mood, but models stay readable under local lights + flashlight.
 */
export default function BathypelagicZone() {
  return (
    <group position={[0, BATHYPELAGIC_Y, 0]}>
      <ambientLight intensity={0.28} color="#334155" />
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
        <ClickableAnglerfish />
      </Suspense>

      <Suspense fallback={null}>
        <SwimPath
          points={SQUID_PATH}
          speed={0.022}
          phase={0.2}
          bobAmount={0.12}
          yawOffset={Math.PI}
        >
          <OceanModel
            url={squidUrl}
            targetSize={6.5}
            glowColor="#94a3b8"
            glowIntensity={0.55}
          />
        </SwimPath>
      </Suspense>
    </group>
  )
}

function ClickableAnglerfish() {
  const [selected, setSelected] = useState(false)

  return (
    <HorizontalPatrol y={0.1} z={4.0} xMin={-3.2} xMax={3.2} speed={0.12}>
      <group rotation={[-Math.PI / 4, Math.PI / 2, 0]}>
        <OceanModel
          url={anglerUrl}
          targetSize={22}
          glowColor="#fef08a"
          glowIntensity={2.8}
          outlined={selected}
          onClick={() => {
            setSelected(true)
            openAnglerfishModalFromCanvas()
            window.setTimeout(() => setSelected(false), 500)
          }}
        />
        <pointLight
          color="#fde047"
          intensity={22}
          distance={12}
          decay={2}
          position={[0.5, 0.9, 0.4]}
        />
        <mesh position={[0.5, 0.9, 0.4]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
      </group>
    </HorizontalPatrol>
  )
}

useGLTF.preload(anglerUrl)
useGLTF.preload(squidUrl)
