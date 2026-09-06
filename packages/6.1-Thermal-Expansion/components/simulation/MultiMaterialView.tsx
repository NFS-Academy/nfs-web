'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'motion/react';
import { MATERIALS, MaterialId, VISUAL_MULTIPLIER, INITIAL_TEMP } from '@/lib/physics';

interface MultiMaterialViewProps {
  currentTemp: MotionValue<number>;
}

export function MultiMaterialView({ currentTemp }: MultiMaterialViewProps) {
  const materials = Object.keys(MATERIALS) as MaterialId[];
  
  return (
    <group position={[-5, 2, 0]}>
      {materials.map((matId, index) => (
        <Rod key={matId} materialId={matId} index={index} currentTemp={currentTemp} />
      ))}
      
      {/* Supports */}
      <mesh position={[0, -2.5, 0]} receiveShadow>
        <boxGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="#333" metalness={0.8} transparent={true} opacity={0.15} roughness={0.2} />
      </mesh>
      <mesh position={[10, -2.5, 0]} receiveShadow>
        <boxGeometry args={[2.5, 8, 8]} />
        <meshStandardMaterial color="#222" metalness={0.8} transparent={true} opacity={0.15} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Rod({ materialId, index, currentTemp }: { materialId: MaterialId, index: number, currentTemp: MotionValue<number> }) {
  const rodRef = useRef<THREE.Mesh>(null);
  const material = MATERIALS[materialId];
  const zOffset = (index - 1.5) * 1.5;

  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.2, 0.2, 10, 32);
    geo.rotateZ(Math.PI / 2);
    geo.translate(5, 0, 0);
    return geo;
  }, []);

  useFrame(() => {
    if (!rodRef.current) return;
    const temp = currentTemp.get();
    const deltaT = temp - INITIAL_TEMP;
    // slightly exaggerate the difference between materials so it's clearly visible
    const expansionRatio = 1 + material.alpha * VISUAL_MULTIPLIER * deltaT * 1.5; 
    rodRef.current.scale.x = Math.max(0.1, expansionRatio);
  });

  return (
    <group position={[0, 0, zOffset]}>
      <mesh ref={rodRef} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color={material.color} metalness={0.9} roughness={0.2} opacity={0.6} />
      </mesh>
      <Html position={[-0.5, 0, 0]} center>
        <div style={{ color: '#fff', whiteSpace: 'nowrap', fontSize: '12px', fontWeight: 'bold', paddingRight: '20px' }}>
          {material.name}
        </div>
      </Html>
    </group>
  );
}
