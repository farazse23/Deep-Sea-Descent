import { useEffect, useMemo, useRef } from 'react'
import { Center, Resize, useAnimations, useGLTF } from '@react-three/drei'
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js'

/**
 * Loads a GLB and fits it to targetSize using drei Resize (safe for skinned meshes).
 */
export default function OceanModel({
  url,
  targetSize = 2,
  playAnimation = true,
  outlined = false,
  glowColor = null,
  glowIntensity = 0.8,
  onClick,
  ...groupProps
}) {
  const modelRef = useRef(null)
  const { scene, animations } = useGLTF(url)
  const clone = useMemo(() => {
    try {
      return SkeletonUtils.clone(scene)
    } catch {
      return scene.clone(true)
    }
  }, [scene])
  const { actions, names } = useAnimations(animations, modelRef)

  useEffect(() => {
    if (!playAnimation || names.length === 0) return
    const action = actions[names[0]]
    action?.reset().fadeIn(0.3).play()
    return () => {
      action?.fadeOut(0.2)
    }
  }, [actions, names, playAnimation])

  useEffect(() => {
    clone.traverse((child) => {
      if (!child.isMesh || !child.material) return
      child.castShadow = false
      child.receiveShadow = false
      child.frustumCulled = false
      if (Array.isArray(child.material)) {
        child.material = child.material.map((mat) => mat.clone())
      } else {
        child.material = child.material.clone()
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
        if (outlined) {
          mat.emissive.set('#22d3ee')
          mat.emissiveIntensity = 0.55
        } else if (glowColor) {
          mat.emissive.set(glowColor)
          mat.emissiveIntensity = glowIntensity
        } else {
          mat.emissive.set('#000000')
          mat.emissiveIntensity = 0
        }
      })
    })
  }, [clone, outlined, glowColor, glowIntensity])

  return (
    <group {...groupProps}>
      <group scale={targetSize}>
        <Resize precise>
          <Center>
            <primitive
              ref={modelRef}
              object={clone}
              onClick={(event) => {
                if (!onClick) return
                event.stopPropagation()
                onClick(event)
              }}
              onPointerOver={
                onClick
                  ? (event) => {
                      event.stopPropagation()
                      document.body.style.cursor = 'pointer'
                    }
                  : undefined
              }
              onPointerOut={
                onClick
                  ? () => {
                      document.body.style.cursor = 'auto'
                    }
                  : undefined
              }
            />
          </Center>
        </Resize>
      </group>
      {outlined ? (
        <mesh>
          <sphereGeometry args={[targetSize * 0.55, 16, 16]} />
          <meshBasicMaterial
            color="#22d3ee"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      ) : null}
    </group>
  )
}
