"use client";

import { useSimulationStore } from '@/lib/store';
import { DoubleSide } from 'three';

export default function WaterTank() {
  const { tankHeight, tankWidth, tankDepth, waterLevel, brickPosition, getCurrentWaterLevel } = useSimulationStore();
  const currentLevel = getCurrentWaterLevel();
  
  return (
    <group>
      {/* Tank Glass Walls */}
      <mesh position={[0, tankHeight / 2, 0]} renderOrder={2}>
        <boxGeometry args={[tankWidth, tankHeight, tankDepth]} />
        <meshPhysicalMaterial 
          color="#a8c6fa"
          transparent
          opacity={0.15}
          roughness={0.1}
          transmission={0.9}
          thickness={0.1}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
      
      {/* Tank Wireframe for better visibility */}
      <mesh position={[0, tankHeight / 2, 0]}>
        <boxGeometry args={[tankWidth, tankHeight, tankDepth]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Tank Bottom */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[tankWidth + 0.5, 0.1, tankDepth + 0.5]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      {/* Water Volume */}
      <mesh position={[0, currentLevel / 2, 0]} renderOrder={1} receiveShadow>
        <boxGeometry args={[tankWidth - 0.02, currentLevel, tankDepth - 0.02]} />
        <meshPhysicalMaterial 
          color="#0ea5e9"
          transparent
          opacity={0.6}
          roughness={0.1}
          transmission={0.8}
          thickness={0.5}
        />
      </mesh>
      
      {/* Water Surface Plane */}
      <mesh position={[0, currentLevel, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={1}>
        <planeGeometry args={[tankWidth - 0.02, tankDepth - 0.02]} />
        <meshPhysicalMaterial 
          color="#38bdf8"
          transparent
          opacity={0.7}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Height Markers */}
      {Array.from({ length: Math.ceil(tankHeight) }).map((_, i) => (
        <group key={i} position={[-tankWidth/2 - 0.2, i + 1, tankDepth/2]}>
          <mesh>
            <boxGeometry args={[0.2, 0.02, 0.02]} />
            <meshBasicMaterial color={i + 1 <= waterLevel ? "#38bdf8" : "#94a3b8"} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
