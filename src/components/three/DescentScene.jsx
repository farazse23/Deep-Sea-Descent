/**
 * Root 3D scene stub.
 * Camera, lighting, and zones land in later steps.
 */
export default function DescentScene() {
  return (
    <>
      <color attach="background" args={['#0a1628']} />
      <ambientLight intensity={0.6} />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#22d3ee" />
      </mesh>
    </>
  )
}
