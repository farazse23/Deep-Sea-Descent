import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { lightingFromProgress } from '../../utils/depthFromProgress'

/**
 * Zone-aware ambient + directional lighting driven by scroll progress.
 */
export default function DescentLighting() {
  const progress = useScrollProgress()
  const progressRef = useRef(progress)
  progressRef.current = progress

  const { scene } = useThree()
  const ambientRef = useRef(null)
  const directionalRef = useRef(null)

  const ambientColor = useRef(new THREE.Color())
  const directionalColor = useRef(new THREE.Color())

  useFrame(() => {
    const lighting = lightingFromProgress(progressRef.current)

    ambientColor.current.set(lighting.ambientColor)
    directionalColor.current.set(lighting.directionalColor)

    if (ambientRef.current) {
      ambientRef.current.color.copy(ambientColor.current)
      ambientRef.current.intensity = lighting.ambientIntensity
    }

    if (directionalRef.current) {
      directionalRef.current.color.copy(directionalColor.current)
      directionalRef.current.intensity = lighting.directionalIntensity
    }

    if (!scene.background || !(scene.background instanceof THREE.Color)) {
      scene.background = new THREE.Color(lighting.background)
    } else {
      scene.background.set(lighting.background)
    }
  })

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.9} color="#a5f3fc" />
      <directionalLight
        ref={directionalRef}
        position={[4, 8, 6]}
        intensity={1.2}
        color="#ffffff"
      />
    </>
  )
}
