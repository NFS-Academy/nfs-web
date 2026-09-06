"use client";

import { useSimulationStore } from '@/lib/store';
import { useRef } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

function Arrow({ 
  direction, 
  origin, 
  length, 
  color, 
  label 
}: { 
  direction: THREE.Vector3, 
  origin: THREE.Vector3, 
  length: number, 
  color: string, 
  label: string 
}) {
  const minLength = 0.5;
  const visualLength = Math.max(minLength, Math.min(length / 2000, 5)); // Scale force to visual length
  
  const cylinderHeight = visualLength - 0.3;
  const isUp = direction.y > 0;
  
  if (length < 0.1) return null; // Don't show if force is essentially 0

  return (
    <group position={origin}>
      {/* Arrow Shaft */}
      <mesh position={[0, isUp ? cylinderHeight / 2 : -cylinderHeight / 2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, cylinderHeight, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* Arrow Head */}
      <mesh position={[0, isUp ? cylinderHeight + 0.15 : -cylinderHeight - 0.15, 0]} rotation={[isUp ? 0 : Math.PI, 0, 0]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* Label */}
      <Text 
        position={[0.5, isUp ? visualLength / 2 : -visualLength / 2, 0]} 
        color={color} 
        fontSize={0.25}
        outlineWidth={0.02}
        outlineColor="#ffffff"
      >
        {label}
      </Text>
    </group>
  );
}

export default function ForceArrows() {
  const { 
    showForces,
    brickPosition,
    brickHeight,
    brickWidth,
    brickDepth,
    brickMass,
    waterDensity,
    gravity,
    getCurrentWaterLevel
  } = useSimulationStore();
  
  if (!showForces) return null;
  
  const currentWaterLevel = getCurrentWaterLevel();
  const brickBaseArea = brickWidth * brickDepth;
  const brickBottomY = brickPosition.y - brickHeight / 2;
  const brickTopY = brickPosition.y + brickHeight / 2;
  
  let submergedHeight = 0;
  if (brickBottomY < currentWaterLevel) {
    submergedHeight = Math.min(brickHeight, currentWaterLevel - brickBottomY);
  }
  
  const weight = brickMass * gravity;
  const pTop = Math.max(0, currentWaterLevel - brickTopY) * waterDensity * gravity;
  const pBottom = Math.max(0, currentWaterLevel - brickBottomY) * waterDensity * gravity;
  
  const forceUpper = pTop * brickBaseArea;
  const forceLower = pBottom * brickBaseArea;
  const buoyantForce = forceLower - forceUpper;

  return (
    <group>
      {/* Weight (acts from center of mass) */}
      <Arrow 
        direction={new THREE.Vector3(0, -1, 0)} 
        origin={new THREE.Vector3(0.2, 0, 0)} 
        length={weight} 
        color="#ef4444" 
        label={`W`} 
      />
      
      {/* Buoyant Force (acts from center of buoyancy) */}
      {buoyantForce > 0 && (
        <Arrow 
          direction={new THREE.Vector3(0, 1, 0)} 
          origin={new THREE.Vector3(-0.2, -brickHeight/2 + submergedHeight/2, 0)} 
          length={buoyantForce} 
          color="#3b82f6" 
          label={`F_B`} 
        />
      )}
      
      {/* Pressure Force Top */}
      {forceUpper > 0 && (
        <Arrow 
          direction={new THREE.Vector3(0, -1, 0)} 
          origin={new THREE.Vector3(-0.5, brickHeight/2, 0)} 
          length={forceUpper} 
          color="#a855f7" 
          label={`F_upper`} 
        />
      )}
      
      {/* Pressure Force Bottom */}
      {forceLower > 0 && (
        <Arrow 
          direction={new THREE.Vector3(0, 1, 0)} 
          origin={new THREE.Vector3(-0.5, -brickHeight/2, 0)} 
          length={forceLower} 
          color="#8b5cf6" 
          label={`F_lower`} 
        />
      )}
    </group>
  );
}
