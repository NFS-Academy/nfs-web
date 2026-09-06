'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useExperiment } from '../../context/ExperimentContext';
import { CameraPreset, ApparatusComponentId } from '../../lib/types';
import { toBanglaNumber } from '../../lib/physics';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface TorricelliCanvasProps {
  className?: string;
}

export const TorricelliCanvas: React.FC<TorricelliCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    setupState,
    mercuryHeightCm,
    showForces,
    cameraPreset,
    setCameraPreset,
    pressureHPa,
    bubblesRemaining,
    popBubble,
    tubeRotationAngle,
    draggedItem,
    setActiveHoverZone,
    handleComponentDrop,
  } = useExperiment();

  // Three.js internal instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // 3D Animated Objects
  const tubeGroupRef = useRef<THREE.Group | null>(null);
  const tubePivotRef = useRef<THREE.Group | null>(null);
  const mercuryInTubeMeshRef = useRef<THREE.Mesh | null>(null);
  const vacuumMeshRef = useRef<THREE.Mesh | null>(null);
  const fingerSealMeshRef = useRef<THREE.Mesh | null>(null);
  const forceArrowsGroupRef = useRef<THREE.Group | null>(null);
  const bubblesGroupRef = useRef<THREE.Group | null>(null);
  const dropZoneMeshRef = useRef<THREE.Mesh | null>(null);
  const mercuryFlaskMeshRef = useRef<THREE.Group | null>(null);
  const pouringStreamMeshRef = useRef<THREE.Mesh | null>(null);

  // Dynamic animation target states
  const currentDisplayedHeightCmRef = useRef<number>(0);
  const targetDisplayedHeightCmRef = useRef<number>(0);
  const tubeRotationZRef = useRef<number>(0);
  const targetTubeRotationZRef = useRef<number>(0);
  const tubePositionYRef = useRef<number>(0.7);
  const targetTubePositionYRef = useRef<number>(0.7);
  const tubePositionXRef = useRef<number>(0);
  const targetTubePositionXRef = useRef<number>(0);

  // Flask pouring animation state
  const flaskPosXRef = useRef<number>(2.4);
  const flaskPosYRef = useRef<number>(0.6);
  const flaskPosZRef = useRef<number>(0.5);
  const flaskRotZRef = useRef<number>(0);
  const targetFlaskPosXRef = useRef<number>(2.4);
  const targetFlaskPosYRef = useRef<number>(0.6);
  const targetFlaskPosZRef = useRef<number>(0.5);
  const targetFlaskRotZRef = useRef<number>(0);

  // Fixed optimal perspective & Zoom-only control state
  const currentZoomDistanceRef = useRef<number>(8.8);
  const targetZoomDistanceRef = useRef<number>(8.8);
  const defaultZoomDistance = 8.8;
  const minZoomDistance = 4.2;
  const maxZoomDistance = 12.5;

  const [currentZoomPercent, setCurrentZoomPercent] = useState<number>(100);
  const [isHoveringDropZone, setIsHoveringDropZone] = useState<boolean>(false);

  // Initialize Three.js Scene with Fixed Front-Isometric Perspective
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0f172a); // Deep slate laboratory blue

    // Atmospheric fog
    scene.fog = new THREE.FogExp2(0x0f172a, 0.035);

    // 2. Camera (Fixed Frontal Angle)
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lighting setup (Lab Studio Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    mainKeyLight.position.set(6, 12, 8);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 1024;
    mainKeyLight.shadow.mapSize.height = 1024;
    mainKeyLight.shadow.bias = -0.0001;
    scene.add(mainKeyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.0); // Cyan rim
    rimLight.position.set(-6, 8, -6);
    scene.add(rimLight);

    const warmFillLight = new THREE.DirectionalLight(0xfef08a, 0.4);
    warmFillLight.position.set(0, -2, 5);
    scene.add(warmFillLight);

    // 5. Lab Bench & Table Top
    const tableGeo = new THREE.BoxGeometry(16, 0.6, 10);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.35,
      metalness: 0.1,
    });
    const tableMesh = new THREE.Mesh(tableGeo, tableMat);
    tableMesh.position.set(0, -0.3, 0);
    tableMesh.receiveShadow = true;
    scene.add(tableMesh);

    // Grid on Table
    const gridHelper = new THREE.GridHelper(12, 24, 0x38bdf8, 0x1e293b);
    gridHelper.position.set(0, 0.01, 0);
    scene.add(gridHelper);

    // 6. Retort Stand & Clamp Support
    const standGroup = new THREE.Group();
    const baseGeo = new THREE.BoxGeometry(2.4, 0.25, 2.0);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.6,
      metalness: 0.8,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.set(-0.8, 0.125, -0.4);
    baseMesh.castShadow = true;
    standGroup.add(baseMesh);

    const rodGeo = new THREE.CylinderGeometry(0.06, 0.06, 6.2, 24);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const rodMesh = new THREE.Mesh(rodGeo, metalMat);
    rodMesh.position.set(-0.8, 3.1, -0.4);
    rodMesh.castShadow = true;
    standGroup.add(rodMesh);

    const clampArm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 16), metalMat);
    clampArm1.rotation.z = Math.PI / 2;
    clampArm1.position.set(-0.4, 2.2, -0.4);
    standGroup.add(clampArm1);

    const clampArm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 16), metalMat);
    clampArm2.rotation.z = Math.PI / 2;
    clampArm2.position.set(-0.4, 4.5, -0.4);
    standGroup.add(clampArm2);

    const jawGeo = new THREE.TorusGeometry(0.2, 0.03, 16, 24, Math.PI * 1.5);
    const jaw1 = new THREE.Mesh(jawGeo, metalMat);
    jaw1.rotation.x = Math.PI / 2;
    jaw1.position.set(0, 2.2, 0);
    standGroup.add(jaw1);

    const jaw2 = new THREE.Mesh(jawGeo, metalMat);
    jaw2.rotation.x = Math.PI / 2;
    jaw2.position.set(0, 4.5, 0);
    standGroup.add(jaw2);

    scene.add(standGroup);

    // 7. Mercury Reservoir (Glass Basin with Liquid Mercury)
    const reservoirGroup = new THREE.Group();
    const dishGeo = new THREE.CylinderGeometry(1.6, 1.4, 0.9, 36, 1, true);
    const glassDishMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 0.85,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      thickness: 0.2,
    });
    const dishMesh = new THREE.Mesh(dishGeo, glassDishMat);
    dishMesh.position.set(0, 0.45, 0);
    dishMesh.castShadow = true;
    reservoirGroup.add(dishMesh);

    const dishBottomGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.05, 36);
    const dishBottom = new THREE.Mesh(dishBottomGeo, glassDishMat);
    dishBottom.position.set(0, 0.025, 0);
    reservoirGroup.add(dishBottom);

    const mercuryMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.96,
      roughness: 0.1,
      envMapIntensity: 1.2,
    });
    const mercuryPool = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.35, 0.7, 36), mercuryMat);
    mercuryPool.position.set(0, 0.35, 0);
    mercuryPool.receiveShadow = true;
    reservoirGroup.add(mercuryPool);

    scene.add(reservoirGroup);

    // 8. Mercury Flask (Apparatus Item on Lab Bench)
    const flaskGroup = new THREE.Group();
    flaskGroup.position.set(2.4, 0.6, 0.5);
    const flaskBodyGeo = new THREE.ConeGeometry(0.5, 0.8, 24);
    const flaskNeckGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.4, 24);
    const flaskMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      transparent: true,
      opacity: 0.8,
      roughness: 0.1,
    });
    const flaskBody = new THREE.Mesh(flaskBodyGeo, flaskMat);
    flaskBody.position.set(0, 0.4, 0);
    flaskGroup.add(flaskBody);

    const flaskNeck = new THREE.Mesh(flaskNeckGeo, flaskMat);
    flaskNeck.position.set(0, 0.9, 0);
    flaskGroup.add(flaskNeck);

    const flaskLiquid = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.6, 24), mercuryMat);
    flaskLiquid.position.set(0, 0.32, 0);
    flaskGroup.add(flaskLiquid);

    mercuryFlaskMeshRef.current = flaskGroup;
    scene.add(flaskGroup);

    // Pouring Stream (Visible during flask pour animation)
    const pourStreamGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.2, 16);
    const pourStreamMesh = new THREE.Mesh(pourStreamGeo, mercuryMat);
    pourStreamMesh.position.set(0.15, 5.3, 0.2);
    pourStreamMesh.rotation.z = 0.2;
    pourStreamMesh.visible = false;
    pouringStreamMeshRef.current = pourStreamMesh;
    scene.add(pourStreamMesh);

    // 9. 1-Meter Glass Tube Hierarchy
    const tubeGroup = new THREE.Group();
    tubeGroup.position.set(0, 0.7, 0);
    tubeGroupRef.current = tubeGroup;

    // tubePivot rotates around its physical center (0, 2.5, 0)
    const tubePivot = new THREE.Group();
    tubePivot.position.set(0, 2.5, 0);
    tubePivotRef.current = tubePivot;
    tubeGroup.add(tubePivot);

    const tubeLengthUnits = 5.0; // 100 cm = 5.0 units
    const tubeOuterRadius = 0.15;
    const tubeInnerRadius = 0.12;

    const tubeGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      opacity: 0.8,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
      thickness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    // Glass Tube Cylinder centered at (0, 0, 0) inside pivot
    const tubeGeo = new THREE.CylinderGeometry(tubeOuterRadius, tubeOuterRadius, tubeLengthUnits, 32, 1, true);
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeGlassMat);
    tubeMesh.position.set(0, 0, 0);
    tubePivot.add(tubeMesh);

    // Closed Bottom Dome (at y = -2.5 when upright, becomes TOP at 180°)
    const domeGeo = new THREE.SphereGeometry(tubeOuterRadius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMesh = new THREE.Mesh(domeGeo, tubeGlassMat);
    domeMesh.rotation.x = Math.PI;
    domeMesh.position.set(0, -2.5, 0);
    tubePivot.add(domeMesh);

    // Finger / Rubber Stopper Seal at the OPEN MOUTH (at y = +2.55 when upright, becomes BOTTOM at 180°)
    const fingerSealGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.15, 24);
    const fingerSealMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.4,
      metalness: 0.2,
    });
    const fingerSealMesh = new THREE.Mesh(fingerSealGeo, fingerSealMat);
    fingerSealMesh.position.set(0, 2.575, 0); // Attached to TOP mouth when upright!
    fingerSealMesh.visible = false;
    fingerSealMeshRef.current = fingerSealMesh;
    tubePivot.add(fingerSealMesh);

    // Mercury Column Mesh inside Tube
    const mercuryInTubeGeo = new THREE.CylinderGeometry(tubeInnerRadius, tubeInnerRadius, 1, 32);
    const mercuryInTubeMesh = new THREE.Mesh(mercuryInTubeGeo, mercuryMat);
    mercuryInTubeMesh.position.set(0, 0, 0);
    mercuryInTubeMeshRef.current = mercuryInTubeMesh;
    tubePivot.add(mercuryInTubeMesh);

    // Torricellian Vacuum Region Mesh
    const vacuumGeo = new THREE.CylinderGeometry(tubeInnerRadius * 0.98, tubeInnerRadius * 0.98, 1, 24);
    const vacuumMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    });
    const vacuumMesh = new THREE.Mesh(vacuumGeo, vacuumMat);
    vacuumMesh.position.set(0, 0, 0);
    vacuumMesh.visible = false;
    vacuumMeshRef.current = vacuumMesh;
    tubePivot.add(vacuumMesh);

    // Air Bubbles Group (Step 2)
    const bubblesGroup = new THREE.Group();
    bubblesGroupRef.current = bubblesGroup;
    const bubbleGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const bubbleMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      transparent: true,
      opacity: 0.9,
      roughness: 0.1,
    });
    for (let i = 0; i < 4; i++) {
      const bubble = new THREE.Mesh(bubbleGeo, bubbleMat);
      bubble.position.set((Math.random() - 0.5) * 0.1, -1.5 + i * 0.9, (Math.random() - 0.5) * 0.1);
      bubblesGroup.add(bubble);
    }
    bubblesGroup.visible = false;
    tubePivot.add(bubblesGroup);

    scene.add(tubeGroup);

    // 10. Glowing Target Drop Zone Highlight Mesh (Pulsing Target Ring)
    const dropRingGroup = new THREE.Group();
    const dropRingGeo = new THREE.TorusGeometry(0.5, 0.05, 16, 32);
    const dropRingMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.85,
    });
    const dropRingMesh = new THREE.Mesh(dropRingGeo, dropRingMat);
    dropRingMesh.rotation.x = Math.PI / 2;
    dropRingGroup.add(dropRingMesh);

    const dropGlowGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 32, 1, true);
    const dropGlowMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const dropGlowMesh = new THREE.Mesh(dropGlowGeo, dropGlowMat);
    dropRingGroup.add(dropGlowMesh);

    dropRingGroup.position.set(0, 5.7, 0);
    dropRingGroup.visible = false;
    dropZoneMeshRef.current = dropRingGroup as any;
    scene.add(dropRingGroup);

    // 11. Precision Centimeter Measurement Scale (Frontal Right Side: 0 at dish level, 100 at top)
    const scaleGroup = new THREE.Group();
    scaleGroup.position.set(0.35, 0.7, 0);

    const scaleBarGeo = new THREE.BoxGeometry(0.12, 5.1, 0.02);
    const scaleBarMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.8 });
    const scaleBar = new THREE.Mesh(scaleBarGeo, scaleBarMat);
    scaleBar.position.set(0, 2.5, 0);
    scaleGroup.add(scaleBar);

    const scaleCanvas = document.createElement('canvas');
    scaleCanvas.width = 256;
    scaleCanvas.height = 2048;
    const ctx = scaleCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, scaleCanvas.width, scaleCanvas.height);
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      for (let cm = 0; cm <= 100; cm++) {
        const yNorm = cm / 100;
        const yPixel = scaleCanvas.height - (yNorm * (scaleCanvas.height - 80) + 40);

        if (cm % 10 === 0) {
          ctx.fillRect(0, yPixel - 2, 70, 4);
          ctx.font = 'bold 36px "Hind Siliguri", Arial, sans-serif';
          ctx.fillText(`${toBanglaNumber(cm, 0)}`, 80, yPixel);
        } else if (cm === 76) {
          ctx.fillStyle = '#dc2626';
          ctx.fillRect(0, yPixel - 2, 85, 4);
          ctx.font = 'bold 38px "Hind Siliguri", Arial, sans-serif';
          ctx.fillText(`৭৬ cm ★`, 92, yPixel);
          ctx.fillStyle = '#0f172a';
        } else if (cm % 5 === 0) {
          ctx.fillRect(0, yPixel - 1.5, 45, 3);
        } else {
          ctx.fillRect(0, yPixel - 1, 25, 2);
        }
      }
    }

    const scaleTexture = new THREE.CanvasTexture(scaleCanvas);
    scaleTexture.minFilter = THREE.LinearFilter;
    scaleTexture.magFilter = THREE.LinearFilter;
    const scaleTextureMat = new THREE.MeshBasicMaterial({ map: scaleTexture, transparent: true });
    const scaleTextureMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 5.0), scaleTextureMat);
    scaleTextureMesh.position.set(0.12, 2.5, 0.015);
    scaleGroup.add(scaleTextureMesh);

    scene.add(scaleGroup);

    // 12. Force & Pressure Vector Arrows Group
    const forceArrowsGroup = new THREE.Group();
    forceArrowsGroupRef.current = forceArrowsGroup;

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const x = Math.cos(angle) * 0.95;
      const z = Math.sin(angle) * 0.95;

      const dir = new THREE.Vector3(0, -1, 0);
      const origin = new THREE.Vector3(x, 1.6, z);
      const arrow = new THREE.ArrowHelper(dir, origin, 0.8, 0xef4444, 0.25, 0.15);
      forceArrowsGroup.add(arrow);
    }

    const upArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0.15, 0), 0.7, 0x3b82f6, 0.2, 0.12);
    forceArrowsGroup.add(upArrow);

    const downColArrow = new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 3.8, 0.2), 0.9, 0xf59e0b, 0.25, 0.15);
    forceArrowsGroup.add(downColArrow);

    forceArrowsGroup.visible = false;
    scene.add(forceArrowsGroup);

    // 13. Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const now = performance.now();

      // Smooth zoom distance transition
      currentZoomDistanceRef.current +=
        (targetZoomDistanceRef.current - currentZoomDistanceRef.current) * 0.1;

      const fixedAzimuth = 0.32;
      const fixedElevation = 0.30;
      const dist = currentZoomDistanceRef.current;
      const lookAtTarget = new THREE.Vector3(0, 2.7, 0);

      camera.position.x = lookAtTarget.x + dist * Math.sin(fixedAzimuth) * Math.cos(fixedElevation);
      camera.position.y = lookAtTarget.y + dist * Math.sin(fixedElevation);
      camera.position.z = lookAtTarget.z + dist * Math.cos(fixedAzimuth) * Math.cos(fixedElevation);
      camera.lookAt(lookAtTarget);

      // Smooth flask transforms
      if (mercuryFlaskMeshRef.current) {
        flaskPosXRef.current += (targetFlaskPosXRef.current - flaskPosXRef.current) * 0.1;
        flaskPosYRef.current += (targetFlaskPosYRef.current - flaskPosYRef.current) * 0.1;
        flaskPosZRef.current += (targetFlaskPosZRef.current - flaskPosZRef.current) * 0.1;
        flaskRotZRef.current += (targetFlaskRotZRef.current - flaskRotZRef.current) * 0.1;

        mercuryFlaskMeshRef.current.position.set(flaskPosXRef.current, flaskPosYRef.current, flaskPosZRef.current);
        mercuryFlaskMeshRef.current.rotation.z = flaskRotZRef.current;
      }

      // Smooth tube elevation & rotation around pivot
      if (tubeGroupRef.current && tubePivotRef.current) {
        tubeRotationZRef.current += (targetTubeRotationZRef.current - tubeRotationZRef.current) * 0.1;
        tubePositionYRef.current += (targetTubePositionYRef.current - tubePositionYRef.current) * 0.1;
        tubePositionXRef.current += (targetTubePositionXRef.current - tubePositionXRef.current) * 0.1;

        tubePivotRef.current.rotation.z = tubeRotationZRef.current;
        tubeGroupRef.current.position.y = tubePositionYRef.current;
        tubeGroupRef.current.position.x = tubePositionXRef.current;
      }

      // Smooth mercury height transition
      currentDisplayedHeightCmRef.current +=
        (targetDisplayedHeightCmRef.current - currentDisplayedHeightCmRef.current) * 0.08;
      const hCm = currentDisplayedHeightCmRef.current;
      const hUnits = (hCm / 100) * 5.0;

      // When tube is inverted (or in equilibrium experiment), mouth is at local y = +2.5 which is at the BOTTOM in world space
      const isTubeInverted = Math.abs(tubeRotationZRef.current) > Math.PI / 2;

      if (mercuryInTubeMeshRef.current) {
        if (hUnits > 0.01) {
          mercuryInTubeMeshRef.current.visible = true;
          mercuryInTubeMeshRef.current.scale.set(1, Math.max(hUnits, 0.001), 1);
          if (isTubeInverted) {
            // Inverted tube: mercury rises from bottom open mouth (+2.5) up to (+2.5 - hUnits)
            mercuryInTubeMeshRef.current.position.y = 2.5 - hUnits / 2;
          } else {
            // Upright tube: mercury fills from closed bottom (-2.5) up to (-2.5 + hUnits)
            mercuryInTubeMeshRef.current.position.y = -2.5 + hUnits / 2;
          }
        } else {
          mercuryInTubeMeshRef.current.visible = false;
        }
      }

      // Vacuum mesh update: visible at TOP (local -2.5 is TOP when inverted)
      if (vacuumMeshRef.current) {
        const vacuumHeightUnits = Math.max(5.0 - hUnits, 0.01);
        if (isTubeInverted && vacuumHeightUnits > 0.05 && hUnits > 0.01 && hCm < 99.5) {
          vacuumMeshRef.current.visible = true;
          vacuumMeshRef.current.scale.set(1, vacuumHeightUnits, 1);
          // Vacuum sits at the TOP between meniscus (+2.5 - hUnits) and closed top dome (-2.5)
          vacuumMeshRef.current.position.y = -hUnits / 2;
        } else {
          vacuumMeshRef.current.visible = false;
        }
      }

      // Drop zone pulse
      if (dropZoneMeshRef.current && dropZoneMeshRef.current.visible) {
        const scalePulse = 1 + Math.sin(now * 0.008) * 0.12;
        dropZoneMeshRef.current.scale.set(scalePulse, scalePulse, scalePulse);
      }

      // Bubble bobbing
      if (bubblesGroupRef.current && bubblesGroupRef.current.visible) {
        bubblesGroupRef.current.children.forEach((b, idx) => {
          b.position.y += Math.sin(now * 0.005 + idx) * 0.001;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 14. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    resizeObserver.observe(container);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  // Update 3D Scene state based on setupState and physics
  useEffect(() => {
    if (!tubeGroupRef.current || !tubePivotRef.current) return;

    if (setupState === 'SETUP_EMPTY') {
      targetTubePositionXRef.current = 0;
      targetTubePositionYRef.current = 0.7;
      targetTubeRotationZRef.current = 0; // Upright: open mouth is at TOP
      targetDisplayedHeightCmRef.current = 0;
      targetFlaskPosXRef.current = 2.4;
      targetFlaskPosYRef.current = 0.6;
      targetFlaskPosZRef.current = 0.5;
      targetFlaskRotZRef.current = 0;
      if (pouringStreamMeshRef.current) pouringStreamMeshRef.current.visible = false;
      if (fingerSealMeshRef.current) fingerSealMeshRef.current.visible = false;
      if (bubblesGroupRef.current) bubblesGroupRef.current.visible = false;
    } else if (setupState === 'TUBE_FILLED') {
      // Pouring transition animation
      targetFlaskPosXRef.current = 0.6;
      targetFlaskPosYRef.current = 6.2;
      targetFlaskPosZRef.current = 0.2;
      targetFlaskRotZRef.current = -0.85; // Tilted 50 degrees pouring
      if (pouringStreamMeshRef.current) pouringStreamMeshRef.current.visible = true;

      // After 1.2s, return flask to bench
      setTimeout(() => {
        targetFlaskPosXRef.current = 2.4;
        targetFlaskPosYRef.current = 0.6;
        targetFlaskPosZRef.current = 0.5;
        targetFlaskRotZRef.current = 0;
        if (pouringStreamMeshRef.current) pouringStreamMeshRef.current.visible = false;
      }, 1200);

      targetTubePositionXRef.current = 0;
      targetTubePositionYRef.current = 0.7;
      targetTubeRotationZRef.current = 0;
      targetDisplayedHeightCmRef.current = 100;
      if (fingerSealMeshRef.current) fingerSealMeshRef.current.visible = false;
      if (bubblesGroupRef.current) {
        bubblesGroupRef.current.visible = true;
        bubblesGroupRef.current.children.forEach((b, i) => {
          b.visible = i < bubblesRemaining;
        });
      }
    } else if (setupState === 'AIR_REMOVED') {
      targetTubePositionXRef.current = 0;
      targetTubePositionYRef.current = 0.7;
      targetTubeRotationZRef.current = 0;
      targetDisplayedHeightCmRef.current = 100;
      if (fingerSealMeshRef.current) fingerSealMeshRef.current.visible = false;
      if (bubblesGroupRef.current) bubblesGroupRef.current.visible = false;
    } else if (setupState === 'TUBE_SEALED') {
      targetTubePositionXRef.current = 0;
      targetTubePositionYRef.current = 0.7;
      targetTubeRotationZRef.current = (tubeRotationAngle * Math.PI) / 180;
      targetDisplayedHeightCmRef.current = 100;
      if (fingerSealMeshRef.current) fingerSealMeshRef.current.visible = true; // Attached to open mouth
      if (bubblesGroupRef.current) bubblesGroupRef.current.visible = false;
    } else if (setupState === 'TUBE_INVERTED') {
      targetTubePositionXRef.current = 0;
      targetTubePositionYRef.current = 1.3; // Elevated ready to be dragged into dish
      targetTubeRotationZRef.current = Math.PI; // Inverted: sealed mouth is at BOTTOM
      targetDisplayedHeightCmRef.current = 100;
      if (fingerSealMeshRef.current) fingerSealMeshRef.current.visible = true;
      if (bubblesGroupRef.current) bubblesGroupRef.current.visible = false;
    } else if (setupState === 'TUBE_IMMERSED') {
      targetTubePositionXRef.current = 0;
      targetTubePositionYRef.current = 0.7; // Lowered into mercury reservoir
      targetTubeRotationZRef.current = Math.PI;
      targetDisplayedHeightCmRef.current = 100;
      if (fingerSealMeshRef.current) fingerSealMeshRef.current.visible = true;
      if (bubblesGroupRef.current) bubblesGroupRef.current.visible = false;
    } else if (setupState === 'TUBE_RELEASED' || setupState === 'READY_TO_START') {
      targetTubePositionXRef.current = 0;
      targetTubePositionYRef.current = 0.7;
      targetTubeRotationZRef.current = Math.PI;
      targetDisplayedHeightCmRef.current = 100;
      if (fingerSealMeshRef.current) fingerSealMeshRef.current.visible = false; // Stopper detached
      if (bubblesGroupRef.current) bubblesGroupRef.current.visible = false;
    } else if (setupState === 'EXPERIMENT_RUNNING') {
      targetTubePositionXRef.current = 0;
      targetTubePositionYRef.current = 0.7;
      targetTubeRotationZRef.current = Math.PI;
      targetDisplayedHeightCmRef.current = mercuryHeightCm;
      if (fingerSealMeshRef.current) fingerSealMeshRef.current.visible = false;
    } else if (setupState === 'EQUILIBRIUM_REACHED') {
      targetTubePositionXRef.current = 0;
      targetTubePositionYRef.current = 0.7;
      targetTubeRotationZRef.current = Math.PI;
      targetDisplayedHeightCmRef.current = mercuryHeightCm;
      if (fingerSealMeshRef.current) fingerSealMeshRef.current.visible = false;
    }
  }, [setupState, bubblesRemaining, tubeRotationAngle, mercuryHeightCm]);

  // Drop zone highlight positioning when dragging items
  useEffect(() => {
    if (!dropZoneMeshRef.current) return;

    if (draggedItem) {
      dropZoneMeshRef.current.visible = true;
      if (setupState === 'SETUP_EMPTY' || setupState === 'AIR_REMOVED') {
        dropZoneMeshRef.current.position.set(0, 5.7, 0); // Top mouth of upright tube
      } else if (setupState === 'TUBE_INVERTED') {
        dropZoneMeshRef.current.position.set(0, 0.7, 0); // Reservoir surface
      } else if (setupState === 'TUBE_IMMERSED') {
        dropZoneMeshRef.current.position.set(2.0, 0.3, 0); // Bench area
      }
    } else {
      dropZoneMeshRef.current.visible = false;
    }
  }, [draggedItem, setupState]);

  // Camera Presets
  useEffect(() => {
    if (cameraPreset === 'closeup') {
      targetZoomDistanceRef.current = 5.2; // Zoom in to meniscus
    } else if (cameraPreset === 'scale') {
      targetZoomDistanceRef.current = 6.0; // Zoom in to scale
    } else {
      targetZoomDistanceRef.current = defaultZoomDistance; // Default full lab
    }
    const percent = Math.round((defaultZoomDistance / targetZoomDistanceRef.current) * 100);
    setCurrentZoomPercent(percent);
  }, [cameraPreset]);

  // Force Vectors
  useEffect(() => {
    if (forceArrowsGroupRef.current) {
      forceArrowsGroupRef.current.visible = showForces && setupState === 'EQUILIBRIUM_REACHED';
    }
  }, [showForces, setupState]);

  // Smooth Zoom controls via Native Non-Passive Wheel Event (Prevents page scrolling)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onNativeWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const nextDist = Math.max(
        minZoomDistance,
        Math.min(maxZoomDistance, targetZoomDistanceRef.current + e.deltaY * 0.006)
      );
      targetZoomDistanceRef.current = nextDist;
      const percent = Math.round((defaultZoomDistance / nextDist) * 100);
      setCurrentZoomPercent(percent);
    };

    container.addEventListener('wheel', onNativeWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', onNativeWheel);
    };
  }, []);

  const handleZoomIn = () => {
    const nextDist = Math.max(minZoomDistance, targetZoomDistanceRef.current - 1.2);
    targetZoomDistanceRef.current = nextDist;
    const percent = Math.round((defaultZoomDistance / nextDist) * 100);
    setCurrentZoomPercent(percent);
  };

  const handleZoomOut = () => {
    const nextDist = Math.min(maxZoomDistance, targetZoomDistanceRef.current + 1.2);
    targetZoomDistanceRef.current = nextDist;
    const percent = Math.round((defaultZoomDistance / nextDist) * 100);
    setCurrentZoomPercent(percent);
  };

  const handleZoomReset = () => {
    targetZoomDistanceRef.current = defaultZoomDistance;
    setCurrentZoomPercent(100);
    setCameraPreset('default');
  };

  // Click on 3D Tube to pop bubbles in Step 2
  const handleCanvasClick = () => {
    if (setupState === 'TUBE_FILLED' && bubblesRemaining > 0) {
      popBubble();
    }
  };

  // Drag over 3D canvas drop handler
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsHoveringDropZone(true);
  };

  const handleDragLeave = () => {
    setIsHoveringDropZone(false);
  };

  const handleDropOnCanvas = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHoveringDropZone(false);
    const itemId = e.dataTransfer.getData('text/plain') as ApparatusComponentId;
    if (!itemId) return;

    if (setupState === 'SETUP_EMPTY' && itemId === 'mercury_flask') {
      handleComponentDrop('mercury_flask', 'tube_opening');
    } else if (setupState === 'AIR_REMOVED' && itemId === 'finger_stopper') {
      handleComponentDrop('finger_stopper', 'tube_opening');
    } else if (setupState === 'TUBE_INVERTED' && itemId === 'glass_tube') {
      handleComponentDrop('glass_tube', 'reservoir_surface');
    } else if (setupState === 'TUBE_IMMERSED' && itemId === 'finger_stopper') {
      handleComponentDrop('finger_stopper', 'bench_area');
    }
  };

  return (
    <div
      className={`relative w-full h-full min-h-[380px] lg:min-h-[560px] rounded-2xl overflow-hidden shadow-2xl border transition-all duration-300 bg-slate-950 select-none overscroll-contain ${
        isHoveringDropZone && draggedItem
          ? 'border-cyan-400 ring-4 ring-cyan-400/25 shadow-cyan-500/20'
          : 'border-slate-700/60'
      } ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDropOnCanvas}
    >
      <div
        ref={containerRef}
        className="w-full h-full touch-none overscroll-contain"
        onClick={handleCanvasClick}
      />

      {/* Drop Target Guide Banner when dragging */}
      {draggedItem && (
        <div className="absolute inset-x-4 top-14 mx-auto max-w-md bg-cyan-950/95 backdrop-blur-md border border-cyan-400 p-3 rounded-xl text-cyan-200 text-xs text-center font-bold shadow-2xl animate-pulse pointer-events-none z-30">
          🎯 ৩ডি ল্যাবের উজ্জ্বল চিহ্নিত স্থানে এনে ছেড়ে দিন (Drop Here)
        </div>
      )}

      {/* Floating Top HUD */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-20">
        <div className="bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-xs text-slate-200 shadow-lg flex items-center space-x-3">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            বায়ুচাপ: <strong className="text-cyan-300 font-mono text-sm">{toBanglaNumber(pressureHPa, 1)} hPa</strong>
          </span>
          <span className="text-slate-500">|</span>
          <span className="flex items-center gap-1.5">
            উচ্চতা (<strong>h</strong>):{' '}
            <strong className="text-amber-400 font-mono text-sm">
              {setupState === 'EQUILIBRIUM_REACHED'
                ? `${toBanglaNumber(mercuryHeightCm, 1)} cm`
                : setupState === 'SETUP_EMPTY'
                ? '০ cm'
                : '১০০ cm (পূর্ণ)'}
            </strong>
          </span>
        </div>

        {/* Camera Preset Selector */}
        <div className="flex items-center gap-1 bg-slate-900/85 backdrop-blur-md p-1 rounded-xl border border-slate-700/60 pointer-events-auto">
          <button
            onClick={() => setCameraPreset('default')}
            className={`px-2 py-1 text-[11px] rounded-lg transition-all ${
              cameraPreset === 'default'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            সার্বিক দৃশ্য
          </button>
          <button
            onClick={() => setCameraPreset('closeup')}
            className={`px-2 py-1 text-[11px] rounded-lg transition-all ${
              cameraPreset === 'closeup'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            মেনিস্কাস ক্লোজআপ
          </button>
          <button
            onClick={() => setCameraPreset('scale')}
            className={`px-2 py-1 text-[11px] rounded-lg transition-all ${
              cameraPreset === 'scale'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            স্কেল ক্লোজআপ
          </button>
        </div>
      </div>

      {/* Bubble Pop Helper Badge in Step 2 */}
      {setupState === 'TUBE_FILLED' && (
        <div className="absolute top-16 left-3 bg-cyan-950/90 border border-cyan-500/50 p-2.5 rounded-xl text-xs text-cyan-200 shadow-xl pointer-events-none animate-bounce z-20">
          🫧 নলে ক্লিক/টোকা দিয়ে আটকে থাকা {toBanglaNumber(bubblesRemaining, 0)}টি বুদবুদ সরান!
        </div>
      )}

      {/* Floating Equilibrium Status */}
      {setupState === 'EQUILIBRIUM_REACHED' && (
        <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/70 text-[11px] text-slate-300 shadow-xl max-w-[240px] pointer-events-none z-20">
          <div className="font-semibold text-slate-100 flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            টরিসেলির ব্যারোমিটার সাম্যাবস্থা
          </div>
          <div className="text-slate-400 leading-tight">
            নলের শীর্ষে <span className="text-cyan-300 font-medium">টরিসেলির শূন্যস্থান</span> এবং পারদস্তম্ভ{' '}
            <span className="text-amber-300 font-semibold">{toBanglaNumber(mercuryHeightCm, 1)} cm</span>-এ স্থির হয়েছে।
          </div>
        </div>
      )}

      {/* On-Screen Zoom Controls Overlay (Bottom Right) */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-800 shadow-xl z-20">
        <span className="text-[11px] text-slate-400 font-mono px-2 hidden sm:inline-block">
          🔎 জুম: {toBanglaNumber(currentZoomPercent, 0)}%
        </span>
        <button
          onClick={handleZoomIn}
          className="p-1.5 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 rounded-lg border border-slate-700 transition"
          title="জুম ইন করুন (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 rounded-lg border border-slate-700 transition"
          title="জুম আউট করুন (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomReset}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition"
          title="স্বাভাবিক ভিউতে রিসেট করুন"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
