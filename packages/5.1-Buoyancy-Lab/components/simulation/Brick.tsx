"use client";

import { useSimulationStore } from '@/lib/store';
import { useRef, useState, useEffect } from 'react';
import { ThreeEvent, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import ForceArrows from './ForceArrows';
import PressureVisualization from './PressureVisualization';

export default function Brick() {
  const { 
    brickPosition, 
    setBrickPosition, 
    brickWidth, 
    brickHeight, 
    brickDepth, 
    brickMass,
    waterDensity,
    setIsDragging,
    isDragging
  } = useSimulationStore();
  
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera, raycaster, pointer } = useThree();
  const [dragPlane, setDragPlane] = useState(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  
  // Calculate density to color the brick
  const volume = brickWidth * brickHeight * brickDepth;
  const density = brickMass / volume;
  
  let color = "#cbd5e1"; // Neutral
  if (density > waterDensity + 10) color = "#94a3b8"; // Sinks (heavier)
  if (density < waterDensity - 10) color = "#fbbf24"; // Floats (lighter - wood-like)
  if (Math.abs(density - waterDensity) <= 10) color = "#34d399"; // Neutral buoyancy

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    document.body.style.cursor = 'grabbing';
    
    // Create a drag plane facing the camera, passing through the current brick position
    const normal = new THREE.Vector3(0, 0, 1); // Keep it on the XY plane for simplicity
    const newDragPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(normal, new THREE.Vector3(brickPosition.x, brickPosition.y, brickPosition.z));
    setDragPlane(newDragPlane);
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging) return;
    e.stopPropagation();
    
    raycaster.setFromCamera(pointer, camera);
    const target = new THREE.Vector3();
    raycaster.ray.intersectPlane(dragPlane, target);
    
    if (target) {
      // Constrain position (optional: keep inside tank bounds roughly)
      const x = Math.max(-3, Math.min(3, target.x));
      const y = Math.max(brickHeight / 2, Math.min(15, target.y));
      
      setBrickPosition({ x, y, z: 0 }); // Lock Z to 0
    }
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setIsDragging(false);
    document.body.style.cursor = 'grab';
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!isDragging) document.body.style.cursor = 'grab';
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (isDragging) {
      handlePointerMove(e);
    } else {
      document.body.style.cursor = 'auto';
    }
  };

  return (
    <group position={[brickPosition.x, brickPosition.y, brickPosition.z]}>
      <mesh 
        ref={meshRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[brickWidth, brickHeight, brickDepth]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.7} 
          metalness={0.1}
          transparent
          opacity={0.9}
        />
        
        {/* Wireframe for emphasis */}
        <mesh>
          <boxGeometry args={[brickWidth + 0.01, brickHeight + 0.01, brickDepth + 0.01]} />
          <meshBasicMaterial color="#475569" wireframe />
        </mesh>
      </mesh>
      
      <ForceArrows />
      <PressureVisualization />
    </group>
  );
}
