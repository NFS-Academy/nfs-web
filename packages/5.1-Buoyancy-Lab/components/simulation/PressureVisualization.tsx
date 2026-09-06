"use client";

import { useSimulationStore } from '@/lib/store';
import { useRef } from 'react';
import * as THREE from 'three';

function PressureArrow({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  const visualScale = Math.max(0.1, Math.min(scale, 1.5));
  return (
    <group position={position} rotation={rotation} scale={[visualScale, visualScale, visualScale]}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 4]} />
        <meshBasicMaterial color="#0ea5e9" opacity={0.6} transparent />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.08, 0.2, 4]} />
        <meshBasicMaterial color="#0ea5e9" opacity={0.8} transparent />
      </mesh>
    </group>
  );
}

export default function PressureVisualization() {
  const { 
    showPressure,
    brickPosition,
    brickHeight,
    brickWidth,
    brickDepth,
    getCurrentWaterLevel
  } = useSimulationStore();
  
  if (!showPressure) return null;
  
  const currentWaterLevel = getCurrentWaterLevel();
  const brickBottomY = brickPosition.y - brickHeight / 2;
  const brickTopY = brickPosition.y + brickHeight / 2;
  
  // If completely above water, no pressure
  if (brickBottomY >= currentWaterLevel) return null;
  
  const hTop = Math.max(0, currentWaterLevel - brickTopY);
  const hBottom = Math.max(0, currentWaterLevel - brickBottomY);
  
  const arrows = [];
  
  // Side arrows
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const yOffset = -brickHeight / 2 + (brickHeight * i) / steps;
    const currentY = brickPosition.y + yOffset;
    
    if (currentY > currentWaterLevel) continue; // Above water
    
    const depth = currentWaterLevel - currentY;
    const scale = depth * 0.2; // Scale pressure visually by depth
    
    // Left side (pointing right)
    arrows.push(<PressureArrow key={`l-${i}`} position={[-brickWidth/2 - 0.1, yOffset, 0]} rotation={[0, 0, -Math.PI/2]} scale={scale} />);
    // Right side (pointing left)
    arrows.push(<PressureArrow key={`r-${i}`} position={[brickWidth/2 + 0.1, yOffset, 0]} rotation={[0, 0, Math.PI/2]} scale={scale} />);
    // Front side (pointing back)
    arrows.push(<PressureArrow key={`f-${i}`} position={[0, yOffset, brickDepth/2 + 0.1]} rotation={[Math.PI/2, 0, 0]} scale={scale} />);
    // Back side (pointing front)
    arrows.push(<PressureArrow key={`b-${i}`} position={[0, yOffset, -brickDepth/2 - 0.1]} rotation={[-Math.PI/2, 0, 0]} scale={scale} />);
  }
  
  // Top arrows (if submerged)
  if (hTop > 0) {
    const scale = hTop * 0.2;
    arrows.push(<PressureArrow key="t-c" position={[0, brickHeight/2 + 0.1, 0]} rotation={[0, 0, 0]} scale={scale} />);
  }
  
  // Bottom arrows (always if in water)
  if (hBottom > 0) {
    const scale = hBottom * 0.2;
    arrows.push(<PressureArrow key="b-c" position={[0, -brickHeight/2 - 0.1, 0]} rotation={[Math.PI, 0, 0]} scale={scale} />);
    arrows.push(<PressureArrow key="b-l" position={[-brickWidth/4, -brickHeight/2 - 0.1, 0]} rotation={[Math.PI, 0, 0]} scale={scale} />);
    arrows.push(<PressureArrow key="b-r" position={[brickWidth/4, -brickHeight/2 - 0.1, 0]} rotation={[Math.PI, 0, 0]} scale={scale} />);
  }

  return (
    <group>
      {arrows}
    </group>
  );
}
