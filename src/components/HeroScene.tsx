'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { FallbackPlanets } from './FallbackPlanets';

const BACKGROUND_COLOR = new THREE.Color('#0a0a0a');

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!gl;
  } catch {
    return false;
  }
}

function FloatingOrb({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          roughness={0.05}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.04}
          color="#c9a84c"
          background={BACKGROUND_COLOR}
        />
      </mesh>
    </Float>
  );
}

function GoldRing({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.PI / 2 + state.clock.elapsedTime * 0.05;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.07;
  });

  return (
    <Float speed={0.8} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#c9a84c"
          metalness={0.9}
          roughness={0.1}
          emissive="#c9a84c"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

// Pre-calculate particle positions outside the render loop
// This converts a useMemo call inside the render path into a one-time module-level computation,
// removing micro-stutters, CPU work, and GC allocations on component mount/remount.
const PARTICLE_COUNT = 320;
const PARTICLE_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT; i++) {
  PARTICLE_POSITIONS[i * 3] = (Math.random() - 0.5) * 18;
  PARTICLE_POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 14;
  PARTICLE_POSITIONS[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[PARTICLE_POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#c9a84c" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

// Evaluate WebGL support once outside the component to avoid a double-render cycle on mount.
// Since this component is loaded via next/dynamic with ssr: false, window/document are safe here.
const IS_WEBGL_SUPPORTED = typeof window !== 'undefined' ? supportsWebGL() : false;
if (typeof window !== 'undefined') {
  console.info('Hero mode:', IS_WEBGL_SUPPORTED ? 'webgl' : 'fallback');
}

export function HeroScene() {
  if (!IS_WEBGL_SUPPORTED) {
    return <FallbackPlanets />;
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'default', failIfMajorPerformanceCaveat: false }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        fallback={<FallbackPlanets />}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-4, 2, 2]} intensity={1.2} color="#c9a84c" distance={12} />
        <pointLight position={[4, -2, 1]} intensity={0.6} color="#6b4f1a" distance={10} />

        <Environment preset="city" />

        <ParticleField />
        <FloatingOrb position={[-2.2, 0.6, 0]} scale={0.85} />
        <FloatingOrb position={[2.4, -0.4, -1]} scale={0.55} />
        <GoldRing position={[0.5, 1.2, -0.5]} />
        <GoldRing position={[-1.2, -1.4, 0.5]} />
      </Canvas>
    </div>
  );
}
