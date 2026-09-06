'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MotionValue } from 'motion/react';
import { MATERIALS, MaterialId, MICRO_MULTIPLIER, INITIAL_TEMP } from '@/lib/physics';

interface MicroViewProps {
  currentTemp: MotionValue<number>;
  materialId: MaterialId;
}

export function MicroView({ currentTemp, materialId }: MicroViewProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const material = MATERIALS[materialId];
  
  const gridSize = 4;
  const numAtoms = gridSize * gridSize * gridSize;
  
  // To compute the line segments, we need pairs of adjacent atoms.
  const indices = useMemo(() => {
    const arr = [];
    const getIndex = (x: number, y: number, z: number) => x + y * gridSize + z * gridSize * gridSize;
    
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          const i1 = getIndex(x, y, z);
          if (x < gridSize - 1) arr.push(i1, getIndex(x + 1, y, z));
          if (y < gridSize - 1) arr.push(i1, getIndex(x, y + 1, z));
          if (z < gridSize - 1) arr.push(i1, getIndex(x, y, z + 1));
        }
      }
    }
    return new Uint16Array(arr);
  }, [gridSize]);

  const basePositions = useMemo(() => {
    const pos = [];
    const offset = (gridSize - 1) / 2;
    for (let z = 0; z < gridSize; z++) {
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          pos.push(new THREE.Vector3(x - offset, y - offset, z - offset));
        }
      }
    }
    return pos;
  }, [gridSize]);

  const heatColor1 = useMemo(() => new THREE.Color('#ff4500'), []);
  const heatColor2 = useMemo(() => new THREE.Color('#ffae42'), []);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const linePositionsRef = useRef(new Float32Array(numAtoms * 3));
  useEffect(() => { linePositionsRef.current = new Float32Array(numAtoms * 3); }, [numAtoms]);

  useFrame((state) => {
    if (!meshRef.current || !linesRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const temp = currentTemp.get();
    const deltaT = temp - INITIAL_TEMP;
    
    // Calculate expansion and vibration
    const spacingRatio = 1 + material.alpha * MICRO_MULTIPLIER * deltaT;
    const baseSpacing = 1.5;
    const currentSpacing = baseSpacing * spacingRatio;
    
    const vibrationAmp = (temp / 1000) * 0.2; // max 0.2 units
    const vibrationSpeed = 10 + (temp / 1000) * 40;
    
    for (let i = 0; i < numAtoms; i++) {
      const basePos = basePositions[i];
      // Random phase offset based on index so they don't all vibrate together
      const phaseX = i * 1.1;
      const phaseY = i * 2.2;
      const phaseZ = i * 3.3;
      
      const vx = Math.sin(time * vibrationSpeed + phaseX) * vibrationAmp;
      const vy = Math.cos(time * vibrationSpeed + phaseY) * vibrationAmp;
      const vz = Math.sin(time * vibrationSpeed + phaseZ) * vibrationAmp;
      
      const px = basePos.x * currentSpacing + vx;
      const py = basePos.y * currentSpacing + vy;
      const pz = basePos.z * currentSpacing + vz;
      
      dummy.position.set(px, py, pz);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      
      linePositionsRef.current[i * 3] = px;
      linePositionsRef.current[i * 3 + 1] = py;
      linePositionsRef.current[i * 3 + 2] = pz;
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    
    // Update lines
    const lineGeo = linesRef.current.geometry as THREE.BufferGeometry;
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositionsRef.current, 3));
    lineGeo.setIndex(new THREE.BufferAttribute(indices, 1));
    
    // Update colors based on heat
    const instMat = meshRef.current.material as THREE.MeshStandardMaterial;
    const lineMat = linesRef.current.material as THREE.LineBasicMaterial;
    
    if (temp > 400) {
      const t = Math.min(1, (temp - 400) / 600);
      const emissiveColor = new THREE.Color(0x000000).lerp(heatColor1, t).lerp(heatColor2, t * t);
      instMat.emissive.copy(emissiveColor);
      instMat.emissiveIntensity = 2 * t;
      lineMat.color.copy(emissiveColor).lerp(new THREE.Color('#888'), 0.5);
    } else {
      instMat.emissive.setHex(0x000000);
      instMat.emissiveIntensity = 0;
      lineMat.color.setHex(0x555555);
    }
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, numAtoms]} castShadow receiveShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={material.color} metalness={0.8} roughness={0.2} />
      </instancedMesh>
      
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#555" transparent opacity={0.6} />
      </lineSegments>
    </group>
  );
}
