"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useExperimentStore } from "@/store/experimentStore";

export function Crown({ isGold = false }: { isGold?: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Fake crown density: 16667, Gold density: 19300. 
  // Fake crown is larger for same mass (10kg).
  const scale = isGold ? 1.0 : 1.05;

  return (
    <group ref={meshRef}>
      {/* Crown Base */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.5 * scale, 0.5 * scale, 0.4 * scale, 32]} />
        <meshStandardMaterial color={isGold ? "#FFD700" : "#E5C100"} metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Crown Spikes */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2;
        const r = 0.5 * scale;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        return (
          <group key={i} position={[x, 0.2 * scale, z]} rotation={[0, -angle, 0]}>
            <mesh castShadow position={[0, 0.15 * scale, 0]}>
              <coneGeometry args={[0.15 * scale, 0.5 * scale, 16]} />
              <meshStandardMaterial color={isGold ? "#FFD700" : "#E5C100"} metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh castShadow position={[0, 0.45 * scale, 0]}>
              <sphereGeometry args={[0.06 * scale, 16, 16]} />
              <meshStandardMaterial color={isGold ? "#FFD700" : "#E5C100"} metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        );
      })}
      
      {/* Decorative details */}
      <mesh position={[0, -0.1 * scale, 0]} castShadow>
        <torusGeometry args={[0.52 * scale, 0.03 * scale, 16, 32]} />
        <meshStandardMaterial color={isGold ? "#FFD700" : "#E5C100"} metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.1 * scale, 0]} castShadow>
        <torusGeometry args={[0.52 * scale, 0.03 * scale, 16, 32]} />
        <meshStandardMaterial color={isGold ? "#FFD700" : "#E5C100"} metalness={1} roughness={0.2} />
      </mesh>

      {/* Hook loop on top */}
      <mesh position={[0, 0.6 * scale, 0]} castShadow rotation={[0, Math.PI/2, 0]}>
        <torusGeometry args={[0.1, 0.02, 16, 32]} />
        <meshStandardMaterial color={isGold ? "#FFD700" : "#E5C100"} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

