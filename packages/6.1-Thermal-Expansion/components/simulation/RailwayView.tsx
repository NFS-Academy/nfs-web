'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MotionValue } from 'motion/react';
import { MATERIALS, VISUAL_MULTIPLIER, INITIAL_TEMP } from '@/lib/physics';

interface RailwayViewProps {
  currentTemp: MotionValue<number>;
  hasGap: boolean;
}

interface DeformableRailProps {
  position: [number, number, number];
  length: number;
  isLeft: boolean;
  currentTemp: MotionValue<number>;
  hasGap: boolean;
}

function DeformableRail({
  position,
  length,
  isLeft,
  currentTemp,
  hasGap,
}: DeformableRailProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.BoxGeometry>(null);
  const initialPositions = useRef<Float32Array | null>(null);

  const iron = MATERIALS.iron;
  // Use high segment count for smooth continuous curvature
  const widthSegments = 128;

  useFrame(() => {
    if (!geomRef.current || !meshRef.current) return;
    
    const temp = currentTemp.get();
    const deltaT = Math.max(0, temp - INITIAL_TEMP);
    const expansionRatio = 1 + iron.alpha * VISUAL_MULTIPLIER * deltaT * 0.3;
    
    const posAttribute = geomRef.current.attributes.position;
    if (!initialPositions.current) {
      initialPositions.current = new Float32Array(posAttribute.array);
    }
    
    const initArr = initialPositions.current;
    const arr = posAttribute.array as Float32Array;
    
    for (let i = 0; i < initArr.length; i += 3) {
      const xLocal = initArr[i]; 
      const yLocal = initArr[i + 1];
      const zLocal = initArr[i + 2];
      
      if (hasGap) {
        // Mode A: Free linear expansion (Safe)
        const pivotX = isLeft ? -length / 2 : length / 2;
        const distFromPivot = Math.abs(xLocal - pivotX);
        const newDist = distFromPivot * expansionRatio;
        const newXLocal = isLeft ? pivotX + newDist : pivotX - newDist;
        
        arr[i] = newXLocal;
        arr[i + 1] = yLocal;
        arr[i + 2] = zLocal;
      } else {
        // Mode B: Thermal Buckling (Danger - No Gap)
        const globalX = position[0] + xLocal;
        
        // At low temps, rail remains almost perfectly straight
        const criticalDelta = 20; // Start buckling only after a safe threshold
        let buckleFactor = 0;
        
        if (deltaT > criticalDelta) {
          const overTemp = deltaT - criticalDelta;
          const maxTempOver = 1000 - INITIAL_TEMP - criticalDelta;
          // Normalized temp over the critical threshold (0 to 1)
          const normalizedTemp = Math.min(Math.max(overTemp / maxTempOver, 0), 1);
          
          // Sensible amplitude limit to avoid absurd bending (keeps it on the sleeper)
          const maxAmplitude = 0.25;
          // Nonlinear easing for smooth progressive buckling
          buckleFactor = maxAmplitude * Math.pow(normalizedTemp, 1.8);
        }
        
        // Use a continuous smooth localized buckling function
        // This creates a smooth lateral displacement in the center region
        let zDisp = 0;
        const buckleStart = 4;
        const buckleEnd = 16;
        
        if (globalX > buckleStart && globalX < buckleEnd) {
          const u = (globalX - buckleStart) / (buckleEnd - buckleStart); // 0 to 1
          // 1 - cos(2*pi*u) yields a smooth bump constrained at both ends
          zDisp = buckleFactor * (1 - Math.cos(2 * Math.PI * u));
        }
        
        // Apply primarily lateral (horizontal) deformation
        arr[i] = xLocal; 
        arr[i + 1] = yLocal;
        arr[i + 2] = zLocal + zDisp;
      }
    }
    
    posAttribute.needsUpdate = true;
    geomRef.current.computeVertexNormals(); // Recompute normals for proper lighting on the curved surface
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <boxGeometry ref={geomRef} args={[length, 0.3, 0.2, widthSegments, 1, 1]} />
      <meshStandardMaterial color="#8c92ac" metalness={0.8} />
    </mesh>
  );
}

export function RailwayView({ currentTemp, hasGap }: RailwayViewProps) {
  // We have a 20m total span.
  // Left rails are centered at x = 5 (spanning from x=0 to x=10).
  // Right rails are centered at x = 15.5 if gap is present (spanning x=10.5 to x=20.5),
  // or at x = 15 if no gap (spanning x=10 to x=20).
  const rightCenter = hasGap ? 15.5 : 15;

  return (
    <group position={[-10, 0, 0]}>
      {/* Ground (Railway Bed) */}
      <mesh position={[10, -0.6, 0]} receiveShadow>
        <boxGeometry args={[30, 0.2, 8]} />
        <meshStandardMaterial color="#222" roughness={1} />
      </mesh>

      {/* Ties (Wooden sleepers) */}
      {Array.from({ length: 21 }).map((_, i) => (
        <mesh key={i} position={[i * 1 - 0.5, -0.3, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.4, 0.2, 3]} />
          <meshStandardMaterial color="#3e2723" roughness={0.9} />
        </mesh>
      ))}

      {/* Track 1 (Left side, from x=0 to x=10) */}
      <DeformableRail 
        position={[5, 0, 0.8]} 
        length={10} 
        isLeft={true} 
        currentTemp={currentTemp} 
        hasGap={hasGap} 
      />
      <DeformableRail 
        position={[5, 0, -0.8]} 
        length={10} 
        isLeft={true} 
        currentTemp={currentTemp} 
        hasGap={hasGap} 
      />

      {/* Track 2 (Right side, starting from x=10 or x=10.5) */}
      <DeformableRail 
        position={[rightCenter, 0, 0.8]} 
        length={10} 
        isLeft={false} 
        currentTemp={currentTemp} 
        hasGap={hasGap} 
      />
      <DeformableRail 
        position={[rightCenter, 0, -0.8]} 
        length={10} 
        isLeft={false} 
        currentTemp={currentTemp} 
        hasGap={hasGap} 
      />
    </group>
  );
}
