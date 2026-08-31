"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html as DreiHtml, useGLTF } from "@react-three/drei";
import { Crown } from "./objects/Crown";
import { useExperimentStore } from "@/store/experimentStore";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

// Improved Water Beaker
function WaterContainer() {
  const crownState = useExperimentStore((state) => state.crownState);
  
  // Base water level
  let waterScaleY = 1.0;
  if (crownState === "PARTIAL_SUBMERGENCE") waterScaleY = 1.05;
  if (crownState === "FULL_SUBMERGENCE" || crownState === "INVALID_CONTACT") waterScaleY = 1.1;

  return (
    <group position={[0, -1.9, 0]}>
      {/* Glass Beaker */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 3, 32, 1, true]} />
        <meshPhysicalMaterial 
          transmission={0.95} 
          opacity={1} 
          metalness={0.1} 
          roughness={0.05} 
          ior={1.5} 
          color="#ffffff"
          clearcoat={1}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Beaker Rim and Pouring Lip */}
      <mesh position={[0, 1.5, 0]}>
        <torusGeometry args={[1.2, 0.05, 16, 64]} />
        <meshPhysicalMaterial transmission={0.95} roughness={0.05} ior={1.5} color="#ffffff" transparent />
      </mesh>
      <mesh position={[1.15, 1.5, 0]} rotation={[0, 0, -Math.PI/6]}>
         <cylinderGeometry args={[0.08, 0.08, 0.3, 16, 1, false, 0, Math.PI]} />
         <meshPhysicalMaterial transmission={0.95} roughness={0.05} ior={1.5} color="#ffffff" transparent side={THREE.DoubleSide}/>
      </mesh>

      {/* Beaker Bottom */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshPhysicalMaterial transmission={0.95} roughness={0.1} ior={1.5} color="#ffffff" transparent />
      </mesh>

      {/* Water */}
      <mesh position={[0, -1.45 + (1.45 * waterScaleY), 0]}>
        <cylinderGeometry args={[1.18, 1.18, 2.9 * waterScaleY, 32]} />
        <meshPhysicalMaterial 
          transmission={0.8}
          opacity={0.7}
          color="#cce6ff"
          roughness={0.1}
          ior={1.33}
          transparent
        />
      </mesh>
      
      {/* Water Surface */}
      <mesh position={[0, -1.45 + 2.9 * waterScaleY, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <circleGeometry args={[1.18, 32]} />
        <meshPhysicalMaterial 
          transmission={0.9}
          opacity={0.8}
          color="#e6f2ff"
          roughness={0.1}
          ior={1.33}
          transparent
        />
      </mesh>

      {/* Markings */}
      {[0, 1, 2, 3, 4].map((i) => (
        <group key={i} position={[0, -1 + (i * 0.5), 1.2]}>
          <mesh>
            <boxGeometry args={[0.3, 0.02, 0.02]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <DreiHtml position={[0.25, 0, 0]} transform scale={0.4}>
            <div className="text-white font-mono font-bold drop-shadow-md">
              {((i+1)*100)} ml
            </div>
          </DreiHtml>
        </group>
      ))}
    </group>
  );
}

// Realistic Support Stand
function SupportStand({ clampY }: { clampY: number }) {
  return (
    <group position={[-2.5, -3.4, -1]}>
      {/* Heavy Base */}
      <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[2, 0.4, 2]} />
        <meshStandardMaterial color="#2d3748" metalness={0.6} roughness={0.7} />
      </mesh>
      
      {/* Vertical Rod */}
      <mesh castShadow receiveShadow position={[0, 4, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 8, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Clamp Mechanism moving with clampY */}
      <group position={[0, clampY + 3.4, 0]}>
         <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]} position={[1.25, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 2.5, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
         </mesh>
         <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.4} />
         </mesh>
         {/* Screw knob */}
         <mesh castShadow position={[0, 0, 0.3]} rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.8} />
         </mesh>
      </group>
    </group>
  );
}

function SpringBalance({ apparatusY, reading, stretch }: { apparatusY: number, reading: number, stretch: number }) {
  return (
    <group position={[0, apparatusY, 0]}>
      {/* Metal Housing */}
      <mesh castShadow>
        <boxGeometry args={[0.8, 1.2, 0.3]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
      </mesh>
      
      {/* Circular Dial */}
      <mesh position={[0, 0, 0.16]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.9} />
      </mesh>
      
      {/* Dial Glass */}
      <mesh position={[0, 0, 0.19]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.02, 32]} />
        <meshPhysicalMaterial transmission={0.9} opacity={1} roughness={0.1} ior={1.5} transparent />
      </mesh>

      {/* Pointer (Rotates based on reading 0-10kg) */}
      <group position={[0, 0, 0.17]} rotation={[0, 0, -((reading / 10) * Math.PI * 1.5) + (Math.PI * 0.75)]}>
         <mesh position={[0, 0.15, 0]}>
           <boxGeometry args={[0.02, 0.3, 0.01]} />
           <meshStandardMaterial color="#ef4444" />
         </mesh>
      </group>

      <DreiHtml position={[0, -0.4, 0.17]} transform distanceFactor={4} scale={0.5}>
        <div className="w-[60px] h-[30px] flex items-center justify-center font-bold text-slate-800 text-sm font-sans bg-white/80 rounded border border-slate-300">
          {reading.toFixed(1)} kg
        </div>
      </DreiHtml>

      {/* Top Ring */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <torusGeometry args={[0.1, 0.03, 16, 32]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Lower Hook / Spring rod */}
      <mesh position={[0, -0.6 - (stretch * 0.5), 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.5 + stretch, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* Hook curve */}
      <mesh position={[0, -0.85 - stretch, 0]} castShadow rotation={[0, 0, -Math.PI/2]}>
         <torusGeometry args={[0.08, 0.03, 16, 32, Math.PI]} />
         <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Logic Component
function PhysicsLogic() {
  const store = useExperimentStore();
  
  useFrame((state, delta) => {
    if (store.isMoving) {
      const dir = store.isMoving === 'UP' ? 1 : -1;
      const speed = 2.0; // units per second
      let newY = store.apparatusY + dir * speed * delta;
      
      // Constraints
      if (newY > 4.5) newY = 4.5;
      if (newY < -0.5) newY = -0.5;
      
      store.setApparatusY(newY);
    }
  });

  // Calculate physics state based on apparatusY
  useEffect(() => {
    // Fixed distance from center of spring balance to bottom of crown:
    // Spring half height (0.6) + hook (0.2) + stretch (calc) + thread (1.5) + crown height (0.5) 
    // For simplicity, let's say Crown Y = apparatusY - 2.8
    const crownY = store.apparatusY - 2.8;
    
    let newState = store.crownState;
    
    // Container bottom is at y = -3.4
    // Water surface is at y = -1.0 (approx when waterScaleY=1.0)
    // Actually water surface is -1.45 + 1.45 = 0 for empty?
    // Beaker position: [0, -1.9, 0]. Water position: [0, -1.45 + 1.45*waterScaleY, 0] inside beaker.
    // So global water surface = -1.9 - 1.45 + 2.9 = -0.45 
    
    if (crownY < -2.9) {
      newState = 'INVALID_CONTACT'; // Touching bottom
    } else if (crownY <= -0.7) {
      newState = 'FULL_SUBMERGENCE';
    } else if (crownY <= -0.1) {
      newState = 'PARTIAL_SUBMERGENCE';
    } else {
      newState = 'AIR_MEASUREMENT';
    }

    if (newState !== store.crownState) {
      store.setCrownState(newState);
    }
  }, [store.apparatusY, store.crownState, store]);

  return null;
}

export function LabScene() {
  const store = useExperimentStore();
  const isDiscovery = store.appState === 'DISCOVERY_EXPERIMENT';

  // Calculate reading based on state
  let reading = 10.0;
  
  if (store.experimentMode === 'MULTI') {
    const masses = {
      'A': { air: 9.65, water: 9.15 },
      'B': { air: 8.00, water: 7.50 },
      'C': { air: 5.25, water: 4.75 }
    };
    const m = masses[store.multiActiveCrown];
    
    if (store.crownState === "PARTIAL_SUBMERGENCE") {
      reading = m.air - ((m.air - m.water) / 2);
    } else if (store.crownState === "FULL_SUBMERGENCE") {
      reading = m.water;
    } else if (store.crownState === "INVALID_CONTACT") {
      reading = 0.0;
    } else {
      reading = m.air;
    }
  } else {
    // Single mode logic
    let waterVal = 9.4; // FAKE
    if (store.appState.includes('DISCOVERY') && store.activeCrown === 'GOLD') {
      waterVal = 10 - 0.518; // 9.482
    }
    
    if (store.crownState === "PARTIAL_SUBMERGENCE") {
       reading = 10.0 - ((10.0 - waterVal) / 2);
    } else if (store.crownState === "FULL_SUBMERGENCE") {
       reading = waterVal;
    } else if (store.crownState === "INVALID_CONTACT") {
       reading = 0.0;
    } else {
       reading = 10.0;
    }
  }
  
  // Stretch visually represents force (reading)
  const stretch = (reading / 10) * 0.4;
  
  const threadLength = 1.6;
  // Crown is attached to thread which is attached to hook
  // hook Y = apparatusY - 0.85 - stretch
  const crownY = store.apparatusY - 0.85 - stretch - threadLength - 0.3;

  return (
    <div className="w-full h-full relative bg-transparent">
      <Canvas camera={{ position: [0, 1.5, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <PhysicsLogic />
          
          <Environment preset="city" />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow shadow-bias={-0.0001} />
          <pointLight position={[-5, 5, 5]} intensity={0.5} />
          
          <WaterContainer />
          
          <SupportStand clampY={store.apparatusY} />
          
          <SpringBalance apparatusY={store.apparatusY} reading={reading} stretch={stretch} />
          
          {/* Thread connecting hook to crown */}
          <mesh position={[0, store.apparatusY - 0.85 - stretch - threadLength/2, 0]} castShadow>
             <cylinderGeometry args={[0.01, 0.01, threadLength, 8]} />
             <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
          </mesh>

          {/* Crown */}
          <group position={[0, crownY, 0]}>
            <Crown isGold={isDiscovery && store.activeCrown === 'GOLD'} />
          </group>
          
          {/* Laboratory Table */}
          <mesh position={[0, -3.5, 0]} receiveShadow>
            <boxGeometry args={[12, 0.2, 6]} />
            <meshStandardMaterial color="#8D6E63" roughness={0.8} />
          </mesh>
          <mesh position={[0, -3.4, 0]} receiveShadow>
            <boxGeometry args={[12, 0.01, 6]} />
            <meshStandardMaterial color="#5D4037" roughness={0.6} />
          </mesh>

          <ContactShadows position={[0, -3.39, 0]} opacity={0.5} scale={15} blur={2.5} far={4} />
          
          <OrbitControls 
            enablePan={false}
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2 - 0.05} 
            minDistance={4} 
            maxDistance={12} 
            target={[0, -1, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

