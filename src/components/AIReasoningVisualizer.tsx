'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Text, OrbitControls, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// O(1) Data structure "Bolt" pattern
type NodeData = { id: string; label: string; position: [number, number, number] };
type EdgeData = { from: string; to: string };

const nodesDict: Record<string, NodeData> = {
  'start': { id: 'start', label: 'User Query', position: [-4, 0, 0] },
  'parse': { id: 'parse', label: 'Parse Intent', position: [-1.5, 0, 0] },
  'tool': { id: 'tool', label: 'Select Tool: gh', position: [1, 1.5, 0] },
  'api': { id: 'api', label: 'Call API', position: [4, 1.5, 0] },
  'output': { id: 'output', label: 'Format Output', position: [1, -1.5, 0] },
  'end': { id: 'end', label: 'Display to User', position: [4, -1.5, 0] },
};

const edgesArray: EdgeData[] = [
  { from: 'start', to: 'parse' },
  { from: 'parse', to: 'tool' },
  { from: 'parse', to: 'output' },
  { from: 'tool', to: 'api' },
  { from: 'api', to: 'output' },
  { from: 'output', to: 'end' },
];

// Pre-calculate derived node array outside the render loop
// This converts a useMemo call inside the render path into a one-time module-level computation,
// removing CPU work, React hook overhead, and GC allocations on component mount/remount.
const nodesArray = Object.values(nodesDict);

function Node({ data }: { data: NodeData }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Add a subtle individual floating animation to each node
      meshRef.current.position.y = data.position[1] + Math.sin(state.clock.elapsedTime * 2 + data.position[0]) * 0.1;
    }
  });

  return (
    <group position={data.position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color="#c9a84c" 
          emissive="#c9a84c"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {data.label}
      </Text>
    </group>
  );
}

function GraphEdges() {
  return (
    <>
      {edgesArray.map((edge) => {
        const from = nodesDict[edge.from];
        const to = nodesDict[edge.to];
        if (!from || !to) return null;
        return (
          <Line
            key={`${edge.from}-${edge.to}`}
            points={[from.position, to.position]}
            color="#666666"
            lineWidth={1.5}
            transparent
            opacity={0.6}
          />
        );
      })}
    </>
  );
}

export function AIReasoningVisualizer() {
  return (
    <div
      className="w-full h-[600px] border border-white/10 rounded-lg bg-[#0a0a0a] overflow-hidden relative shadow-2xl"
      role="img"
      aria-label="Interactive 3D visualization showing Wanda's AI reasoning workflow"
    >
      <div className="absolute top-6 left-6 z-10 pointer-events-none" aria-hidden="true">
        <h3 className="text-xl font-bold text-[#c9a84c] tracking-wide">Wanda's Thought Process</h3>
        <p className="text-sm text-gray-400 mt-1">Interactive 3D Graph &middot; O(1) Memory Layout</p>
      </div>
      
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 2]}>
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c9a84c" />
        
        <Environment preset="city" />
        <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <group position={[0, 0, 0]}>
            {nodesArray.map(node => (
              <Node key={node.id} data={node} />
            ))}
            <GraphEdges />
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
