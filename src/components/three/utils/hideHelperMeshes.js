import * as THREE from 'three'

/** Hide flat helper lines / planes baked into heavy GLBs. */
export function hideHelperMeshes(root) {
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
