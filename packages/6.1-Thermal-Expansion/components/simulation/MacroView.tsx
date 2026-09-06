'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Text, ContactShadows, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'motion/react';
import { MATERIALS, MaterialId, VISUAL_MULTIPLIER, BASE_LENGTH, INITIAL_TEMP } from '@/lib/physics';

interface MacroViewProps {
  currentTemp: MotionValue<number>;
  materialId: MaterialId;
  isXRay: boolean;
}

export function MacroView({ currentTemp, materialId, isXRay }: MacroViewProps) {
  const rodRef = useRef<THREE.Mesh>(null);
  const material = MATERIALS[materialId];
  
  const heatColor1 = useMemo(() => new THREE.Color('#ff4500'), []);
  const heatColor2 = useMemo(() => new THREE.Color('#ffae42'), []);

  // Geometry pinned at left edge (x = 0)
  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.5, 0.5, 10, 32);
    geo.rotateZ(Math.PI / 2);
    geo.translate(5, 0, 0); // length is 10, so translate by 5 moves left edge to 0
    return geo;
  }, []);

  useFrame(() => {
    if (!rodRef.current) return;
    
    const temp = currentTemp.get();
    const deltaT = temp - INITIAL_TEMP;
    
    // Scale update
    // Real expansion formula: dL = alpha * L * dT
    // We apply visual multiplier to alpha.
    const expansionRatio = 1 + material.alpha * VISUAL_MULTIPLIER * deltaT;
    rodRef.current.scale.x = Math.max(0.1, expansionRatio);

    // Heat color update
    const mat = rodRef.current.material as THREE.MeshStandardMaterial;
    if (!isXRay) {
      if (temp > 400) {
        const t = Math.min(1, (temp - 400) / 600);
        const emissiveColor = new THREE.Color(0x000000)
          .lerp(heatColor1, t)
          .lerp(heatColor2, t * t);
        mat.emissive.copy(emissiveColor);
        mat.emissiveIntensity = 2 * t;
      } else {
        mat.emissive.setHex(0x000000);
        mat.emissiveIntensity = 0;
      }
    }
  });

  return (
    <group position={[-5, 1, 0]}>
      {/* Left Support */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[0.5, 2, 1]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Right Support (Fixed position or moves with rod? Let's make it fixed and wide enough) */}
      <mesh position={[10, -1, 0]}>
        <boxGeometry args={[1.5, 2, 1]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* The Rod */}
      <mesh ref={rodRef} geometry={geometry} castShadow receiveShadow>
        {isXRay ? (
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.025}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.2}
            color={material.color}
            transmission={0.9}
            opacity={0.3}
            transparent
          />
        ) : (
          <meshStandardMaterial 
            color={material.color} 
            metalness={0.9} 
            roughness={0.2} 
          />
        )}
      </mesh>
      
      {/* Static Ruler */}
      <group position={[0, -2, 0]}>
        <mesh position={[5, 0, 0]}>
          <boxGeometry args={[12, 0.1, 0.5]} />
          <meshStandardMaterial color="#222" metalness={0.5} />
        </mesh>
        
        {/* Ruler Marks */}
        {Array.from({ length: 11 }).map((_, i) => (
          <group key={i} position={[i * (10 / 10), 0.1, 0.25]}>
            <mesh>
              <boxGeometry args={[0.05, 0.1, 0.3]} />
              <meshBasicMaterial color="#aaa" />
            </mesh>
            <Text
              position={[0, 0, 0.3]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={0.3}
              color="#aaa"
              anchorX="center"
              anchorY="middle"
            >
              {i * 10}
            </Text>
          </group>
        ))}
      </group>
    </group>
  );
}
