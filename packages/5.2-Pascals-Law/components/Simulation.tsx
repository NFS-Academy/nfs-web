'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html, Cylinder, Box } from '@react-three/drei';
import * as THREE from 'three';
import { usePhysics } from '@/lib/physics-context';

const VISUAL_SCALE = 5;
const CYLINDER_HEIGHT = 6;
const PIPE_Y = -CYLINDER_HEIGHT / 2 + 0.5;

function PressureArrows({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current && active) {
      const t = clock.elapsedTime * 2;
      groupRef.current.children.forEach((child, i) => {
        const offset = i * 0.7;
        // Subtle pulsing animation for the arrows
        child.position.x += Math.sin(t + offset) * 0.002;
        child.position.y += Math.cos(t + offset) * 0.002;
      });
    }
  });

  if (!active) return null;

  return (
    <group ref={groupRef}>
      {/* Small Cylinder Fluid Arrows */}
      <Text position={[-4, 1, 0]} fontSize={0.6} color="#fbbf24" anchorX="center" anchorY="middle">↙</Text>
      <Text position={[-4, 0, 0]} fontSize={0.6} color="#fbbf24" anchorX="center" anchorY="middle">←</Text>
      <Text position={[-4, -1, 0]} fontSize={0.6} color="#fbbf24" anchorX="center" anchorY="middle">↖</Text>
      
      {/* Pipe Fluid Arrows */}
      <Text position={[-2, PIPE_Y, 0.4]} fontSize={0.6} color="#fbbf24" anchorX="center" anchorY="middle">→</Text>
      <Text position={[0, PIPE_Y, 0.4]} fontSize={0.6} color="#fbbf24" anchorX="center" anchorY="middle">↑</Text>
      <Text position={[2, PIPE_Y, 0.4]} fontSize={0.6} color="#fbbf24" anchorX="center" anchorY="middle">→</Text>
      <Text position={[-1, PIPE_Y - 0.4, 0]} fontSize={0.6} color="#fbbf24" anchorX="center" anchorY="middle">↓</Text>
      <Text position={[1, PIPE_Y - 0.4, 0]} fontSize={0.6} color="#fbbf24" anchorX="center" anchorY="middle">↘</Text>
      
      {/* Large Cylinder Fluid Arrows */}
      <Text position={[4, -1, 0]} fontSize={0.6} color="#fbbf24" anchorX="center" anchorY="middle">↗</Text>
      <Text position={[4, 0, 0]} fontSize={0.6} color="#fbbf24" anchorX="center" anchorY="middle">→</Text>
      <Text position={[4, 1, 0]} fontSize={0.6} color="#fbbf24" anchorX="center" anchorY="middle">↑</Text>
      
      {/* Central Label */}
      <Html position={[0, PIPE_Y + 1.2, 0]} center>
        <div className="bg-amber-500/20 px-3 py-1 rounded text-sm font-bold text-amber-300 shadow-sm whitespace-nowrap border border-amber-500/30 backdrop-blur-md">
          চাপ সবদিকে সঞ্চারিত হয় (P₁ = P₂)
        </div>
      </Html>
    </group>
  );
}

function HydraulicApparatus() {
  const { a1, a2, f1, f2, f_load, m, fluidMode, setDisplacements, experimentState, playbackSpeed, setExperimentState, liftStatus } = usePhysics();
  
  // Visual radii
  const r1 = Math.max(0.5, Math.sqrt(a1) / VISUAL_SCALE);
  const r2 = Math.max(0.5, Math.sqrt(a2) / VISUAL_SCALE);

  // Position
  const leftX = -4;
  const rightX = 4;

  // Animation state for displacement
  const d1Ref = useRef(0);
  const lastUpdate = useRef(0);
  const [d1, setD1] = useState(0);

  useFrame((state, delta) => {
    const maxD1 = CYLINDER_HEIGHT / 2 - 0.5; // Fixed stroke distance

    if (experimentState === 'running') {
      const moveSpeed = 2 * playbackSpeed;
      let newD1 = d1Ref.current + delta * moveSpeed;
      
      if (newD1 >= maxD1) {
        newD1 = maxD1;
        setExperimentState('completed');
      }
      
      d1Ref.current = newD1;
      setD1(newD1);
      
      if (state.clock.elapsedTime - lastUpdate.current > 0.1) {
        setDisplacements(newD1 * 10, liftStatus === 'lift' ? (newD1 * (a1 / a2)) * 10 : 0);
        lastUpdate.current = state.clock.elapsedTime;
      }
    } else if (experimentState === 'idle') {
      if (d1Ref.current !== 0) {
        d1Ref.current = 0;
        setD1(0);
        setDisplacements(0, 0);
      }
    }
  });

  // Actual physical displacement calculated visually
  const d2 = liftStatus === 'lift' ? d1 * (a1 / a2) : 0;
  
  // Real numbers for UI display
  const realD1 = d1 * 10;
  const realD2 = liftStatus === 'lift' ? realD1 * (a1 / a2) : 0;

  // Colors based on fluid mode
  const isPressurized = (experimentState === 'running' || experimentState === 'completed' || experimentState === 'paused') && f1 > 0;
  
  // Subtle fluid pulse when pressurized
  const baseFluidColor = new THREE.Color('#3b82f6');
  const pressureFluidColor = new THREE.Color('#60a5fa'); // slightly lighter when pressurized
  const fluidColor = isPressurized ? pressureFluidColor : baseFluidColor;
  
  const fluidOpacity = fluidMode === 'xray' ? 0.8 : (isPressurized ? 0.75 : 0.6);
  const cylinderOpacity = fluidMode === 'xray' ? 0.1 : 0.2;
  const cylinderColor = '#94a3b8';
  const pistonColor = '#64748b';

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
      <pointLight position={[-10, 5, -10]} intensity={0.5} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -CYLINDER_HEIGHT / 2 - 0.1, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#111114" />
      </mesh>

      <PressureArrows active={isPressurized} />

      <group position={[0, 0, 0]}>
        {/* === LEFT CYLINDER (SMALL) === */}
        <group position={[leftX, 0, 0]}>
          <Cylinder args={[r1 + 0.1, r1 + 0.1, CYLINDER_HEIGHT, 32]} material-transparent material-opacity={cylinderOpacity} material-color={cylinderColor} material-side={THREE.DoubleSide} />
          <Cylinder position={[0, -d1 / 2, 0]} args={[r1, r1, CYLINDER_HEIGHT - d1, 32]} material-transparent material-opacity={fluidOpacity} material-color={fluidColor} />
          
          <group position={[0, CYLINDER_HEIGHT / 2 - d1, 0]}>
            <Cylinder args={[r1, r1, 0.4, 32]} material-color={pistonColor} />
            
            {f1 > 0 && (
              <group position={[0, 0.2 + (f1 / 20), 0]}>
                <Cylinder args={[0.05, 0.05, f1 / 10, 8]} material-color="#3b82f6" position={[0, -f1 / 20, 0]} />
                <Cylinder args={[0, 0.2, 0.4, 8]} material-color="#3b82f6" position={[0, -f1 / 10 - 0.2, 0]} />
                <Html position={[0.5, 0, 0]} center>
                  <div className="bg-black/60 px-2 py-1 rounded text-xs font-bold text-blue-400 shadow-sm whitespace-nowrap border border-white/10 backdrop-blur-md">
                    প্রয়োগকৃত বল F₁ = {f1} N
                  </div>
                </Html>
              </group>
            )}
          </group>

          {/* Displacement Indicator for Small Piston */}
          {d1 > 0 && (
            <group position={[-r1 - 1, CYLINDER_HEIGHT / 2 - d1 / 2, 0]}>
              <Box args={[0.05, d1, 0.05]} material-color="#a78bfa" />
              <Html position={[-0.5, 0, 0]} center>
                <div className="bg-purple-600/20 px-2 py-1 rounded text-xs font-bold text-purple-300 shadow-sm whitespace-nowrap border border-purple-500/30 backdrop-blur-md">
                  সরণ d₁ = {realD1.toFixed(1)} cm
                </div>
              </Html>
            </group>
          )}

          <Html position={[0, -CYLINDER_HEIGHT / 2 - 1, 0]} center>
            <div className="bg-black/60 text-slate-300 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap border border-white/10 backdrop-blur-md">
              ছোট পিস্টন (A₁)
            </div>
          </Html>
        </group>

        {/* === RIGHT CYLINDER (LARGE) === */}
        <group position={[rightX, 0, 0]}>
          <Cylinder args={[r2 + 0.1, r2 + 0.1, CYLINDER_HEIGHT, 32]} material-transparent material-opacity={cylinderOpacity} material-color={cylinderColor} material-side={THREE.DoubleSide} />
          <Cylinder position={[0, d2 / 2, 0]} args={[r2, r2, CYLINDER_HEIGHT + d2, 32]} material-transparent material-opacity={fluidOpacity} material-color={fluidColor} />
          
          <group position={[0, CYLINDER_HEIGHT / 2 + d2, 0]}>
            <Cylinder args={[r2, r2, 0.4, 32]} material-color={pistonColor} />
            
            {m > 0 && (
              <group position={[0, 0.2 + Math.cbrt(m) * 0.4, 0]}>
                <Box args={[Math.cbrt(m) * 0.8, Math.cbrt(m) * 0.8, Math.cbrt(m) * 0.8]} material-color="#475569" castShadow />
                <Html position={[Math.cbrt(m) * 0.4 + 0.5, 0, 0]} center>
                  <div className="bg-black/60 px-2 py-1 rounded text-xs font-bold text-slate-300 shadow-sm whitespace-nowrap border border-white/10 backdrop-blur-md">
                    ভর = {m} kg
                  </div>
                </Html>
              </group>
            )}
            
            {/* Displacement Indicator for Large Piston */}
            {d2 > 0 && (
              <group position={[r2 + 1, -d2 / 2, 0]}>
                <Box args={[0.05, d2, 0.05]} material-color="#a78bfa" />
                <Html position={[0.5, 0, 0]} center>
                  <div className="bg-purple-600/20 px-2 py-1 rounded text-xs font-bold text-purple-300 shadow-sm whitespace-nowrap border border-purple-500/30 backdrop-blur-md">
                    সরণ d₂ = {realD2.toFixed(1)} cm
                  </div>
                </Html>
              </group>
            )}
          </group>

          {isPressurized && d2 > 0 && (
            <Html position={[rightX, CYLINDER_HEIGHT / 2 + d2 + 2.5, 0]} center>
              <div className="bg-purple-600/10 px-2 py-1 rounded text-xs font-bold text-purple-400 shadow-sm whitespace-nowrap border border-purple-500/20 backdrop-blur-md mt-4">
                বড় বলের বিনিময়ে কম সরণ
              </div>
            </Html>
          )}

          <Html position={[0, -CYLINDER_HEIGHT / 2 - 1, 0]} center>
            <div className="bg-black/60 text-slate-300 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap border border-white/10 backdrop-blur-md">
              বড় পিস্টন (A₂)
            </div>
          </Html>
        </group>

        {/* === CONNECTING PIPE === */}
        <group position={[0, PIPE_Y, 0]}>
          <Cylinder args={[0.6, 0.6, rightX - leftX, 32]} rotation={[0, 0, Math.PI / 2]} material-transparent material-opacity={cylinderOpacity} material-color={cylinderColor} />
          <Cylinder args={[0.5, 0.5, rightX - leftX, 32]} rotation={[0, 0, Math.PI / 2]} material-transparent material-opacity={fluidOpacity} material-color={fluidColor} />
        </group>
      </group>
    </group>
  );
}

export default function Simulation() {
  return (
    <div className="w-full h-[500px] lg:h-[600px] bg-gradient-to-b from-[#0a0a0c] to-[#1a1a20] rounded-2xl overflow-hidden relative border-none">
      <Canvas shadows camera={{ position: [0, 2, 20], fov: 45 }}>
        <HydraulicApparatus />
        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 6} 
          maxPolarAngle={Math.PI / 2.1}
          minDistance={8}
          maxDistance={35}
        />
      </Canvas>
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-sm text-sm font-medium text-slate-300">
          থ্রিডি ভিউ: ঘোরাতে ড্র্যাগ করুন, জুম করতে স্ক্রল করুন
        </div>
      </div>
    </div>
  );
}
