'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!gl;
  } catch {
    return false;
  }
}

function FallbackPlanets() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full opacity-40 blur-2xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.55) 0%, rgba(201,168,76,0.05) 55%, transparent 75%)' }} />
      <div className="absolute top-[16%] right-[8%] w-[280px] h-[280px] rounded-full opacity-35 blur-xl animate-pulse" style={{ animationDelay: '400ms', background: 'radial-gradient(circle, rgba(107,79,26,0.7) 0%, rgba(107,79,26,0.08) 55%, transparent 75%)' }} />
      <div className="absolute bottom-[8%] left-[22%] w-[220px] h-[220px] rounded-full opacity-30 blur-xl animate-pulse" style={{ animationDelay: '900ms', background: 'radial-gradient(circle, rgba(6,182,212,0.38) 0%, rgba(6,182,212,0.06) 55%, transparent 75%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(26,10,46,0.05) 0%, rgba(10,10,10,0.42) 82%)' }} />
    </div>
  );
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
          background={new THREE.Color('#0a0a0a')}
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

function ParticleField() {
  const count = 320;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#c9a84c" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

export function HeroScene() {
  const [useWebGL, setUseWebGL] = useState(false);

  useEffect(() => {
    const supported = supportsWebGL();
    console.info('Hero mode:', supported ? 'webgl' : 'fallback');
    setUseWebGL(supported);
  }, []);

  if (!useWebGL) {
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
