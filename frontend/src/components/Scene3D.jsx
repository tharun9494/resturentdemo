import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

/**
 * Slowly rotating golden orb with distortion + orbiting ring. Mouse-reactive.
 */
const GoldOrb = () => {
  const mesh = useRef();
  const ring = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.2;
      mesh.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
    if (ring.current) {
      ring.current.rotation.x = t * 0.15;
      ring.current.rotation.y = t * 0.25;
    }
  });

  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.2}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.6, 16]} />
          <MeshDistortMaterial
            color="#E6C998"
            roughness={0.15}
            metalness={1}
            distort={0.32}
            speed={1.4}
            emissive="#B89658"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>
      <mesh ref={ring}>
        <torusGeometry args={[2.4, 0.012, 16, 200]} />
        <meshStandardMaterial color="#E6C998" emissive="#E6C998" emissiveIntensity={1} />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.7, 0.008, 16, 200]} />
        <meshStandardMaterial color="#E6C998" emissive="#E6C998" emissiveIntensity={0.6} opacity={0.6} transparent />
      </mesh>
    </group>
  );
};

export const Scene3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      data-testid="scene-3d-canvas"
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={1.4} color="#FFFFFF" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#E6C998" />
      <spotLight position={[0, 10, 0]} intensity={0.6} angle={0.4} penumbra={1} color="#E6C998" />
      <Suspense fallback={null}>
        <GoldOrb />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
};

export default Scene3D;
