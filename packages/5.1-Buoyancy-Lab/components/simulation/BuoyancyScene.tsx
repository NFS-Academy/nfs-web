"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, useHelper } from '@react-three/drei';
import { useSimulationStore } from '@/lib/store';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import WaterTank from './WaterTank';
import Brick from './Brick';
import { MeasurementTool } from './MeasurementTool';

function PhysicsEngine() {
  const stepSimulation = useSimulationStore(state => state.stepSimulation);
  
  useFrame((state, delta) => {
    // Limit delta to prevent explosive behavior on tab switch
    const dt = Math.min(delta, 0.1);
    stepSimulation(dt);
  });
  
  return null;
}

function ResponsiveCamera() {
  const { camera, size } = useThree();
  
  useEffect(() => {
    const isMobile = size.width < 768;
    // On portrait mobile, move the camera back to keep the tank in view
    if (isMobile && size.width < size.height) {
      camera.position.set(40, 20, 40);
    } else {
      camera.position.set(25, 15, 25);
    }
    camera.lookAt(0, 5, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);
  
  return null;
}

export default function BuoyancyScene() {
  return (
    <div className="w-full h-full min-h-[400px] bg-transparent rounded-xl overflow-hidden relative">
      <Canvas 
        camera={{ position: [25, 15, 25], fov: 45, near: 0.1, far: 500 }}
        shadows
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#111111']} />
        
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-10, 10, -10]} intensity={0.5} />
        
        <ResponsiveCamera />
        <PhysicsEngine />
        
        <Grid 
          infiniteGrid 
          fadeDistance={30} 
          sectionColor="#333333"
          cellColor="#1a1a1a"
          position={[0, 0, 0]}
        />
        
        <group position={[0, 0, 0]}>
          <WaterTank />
          <Brick />
          <MeasurementTool />
        </group>
        
        <ControlsWrapper />
      </Canvas>
    </div>
  );
}

function ControlsWrapper() {
  const isDragging = useSimulationStore(state => state.isDragging);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    const handleResetView = () => {
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
    };
    window.addEventListener('reset-camera', handleResetView);
    return () => window.removeEventListener('reset-camera', handleResetView);
  }, []);

  return (
    <OrbitControls 
      ref={controlsRef}
      makeDefault
      enabled={!isDragging}
      minPolarAngle={0} 
      maxPolarAngle={Math.PI / 2 - 0.05} // Don't go below ground
      minDistance={5}
      maxDistance={150} // Increased significantly to allow viewing entire tank
      target={[0, 5, 0]}
    />
  );
}
