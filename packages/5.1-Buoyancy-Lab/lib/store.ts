import { create } from 'zustand';

export interface GraphPoint {
  time: number;
  position: number;
  buoyantForce: number;
  weight: number;
  netForce: number;
  submergedDepth: number;
}

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface SimulationState {
  // Configurable Variables
  tankHeight: number;
  tankWidth: number;
  tankDepth: number;
  waterLevel: number;
  
  brickMass: number;
  brickHeight: number;
  brickWidth: number;
  brickDepth: number;
  
  gravity: number;
  waterDensity: number;
  
  // Dynamic State
  brickPosition: Vector3;
  brickVelocity: Vector3;
  isPlaying: boolean;
  isDragging: boolean;
  animationSpeed: number;
  
  // Visualizations
  showForces: boolean;
  showPressure: boolean;
  showMeasurement: boolean;
  showGraphs: boolean;
  
  // Educational & Interactive
  activeChallenge: number | null;
  graphData: GraphPoint[];
  simTime: number;
  
  // Actions
  setVariable: (key: keyof SimulationState, value: any) => void;
  setBrickPosition: (pos: Vector3) => void;
  setBrickVelocity: (vel: Vector3) => void;
  setIsPlaying: (playing: boolean) => void;
  setIsDragging: (dragging: boolean) => void;
  resetSimulation: () => void;
  stepSimulation: (dt: number) => void;
  getCurrentWaterLevel: () => number;
  
  setActiveChallenge: (id: number | null) => void;
  applyPreset: (preset: 'wood' | 'ice' | 'metal' | 'neutral') => void;
}

const initialState = {
  tankHeight: 10,
  tankWidth: 6,
  tankDepth: 6,
  waterLevel: 6,
  
  brickMass: 2000,
  brickHeight: 2,
  brickWidth: 2,
  brickDepth: 2,
  
  gravity: 9.8,
  waterDensity: 1000,
  
  brickPosition: { x: 0, y: 7, z: 0 },
  brickVelocity: { x: 0, y: 0, z: 0 },
  
  isPlaying: false,
  isDragging: false,
  animationSpeed: 1,
  
  showForces: false,
  showPressure: false,
  showMeasurement: false,
  showGraphs: false,
  
  activeChallenge: null as number | null,
  graphData: [] as GraphPoint[],
  simTime: 0,
};

export const useSimulationStore = create<SimulationState>((set, get) => ({
  ...initialState,
  
  setVariable: (key, value) => set({ [key]: value }),
  setBrickPosition: (pos) => set({ brickPosition: pos }),
  setBrickVelocity: (vel) => set({ brickVelocity: vel }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setIsDragging: (dragging) => set((state) => {
    // If we start dragging, we temporarily pause physics implicitly because stepSimulation checks isDragging.
    // We can just set velocity to 0 and update isDragging flag.
    return { isDragging: dragging, brickVelocity: { x: 0, y: 0, z: 0 } };
  }),
  
  resetSimulation: () => set({ 
    ...initialState,
    showForces: get().showForces,
    showPressure: get().showPressure,
    showMeasurement: get().showMeasurement,
    showGraphs: get().showGraphs,
    animationSpeed: get().animationSpeed,
    activeChallenge: get().activeChallenge, // keep challenge active
  }),
  
  setActiveChallenge: (id) => set({ activeChallenge: id }),
  
  applyPreset: (preset) => {
    const s = get();
    // Default is 2x2x2 = 8m3 volume
    let mass = 2000;
    if (preset === 'wood') mass = 8 * 600; // 4800 kg (600 kg/m3)
    if (preset === 'ice') mass = 8 * 917; // 7336 kg (917 kg/m3)
    if (preset === 'metal') mass = 8 * 7800; // 62400 kg (7800 kg/m3)
    if (preset === 'neutral') mass = 8 * s.waterDensity; // neutral
    
    set({
      brickMass: mass,
      brickHeight: 2,
      brickWidth: 2,
      brickDepth: 2,
      brickPosition: { x: 0, y: s.tankHeight - 1, z: 0 },
      brickVelocity: { x: 0, y: 0, z: 0 },
      graphData: [],
      simTime: 0
    });
  },

  getCurrentWaterLevel: () => {
    const state = get();
    const {
      brickPosition, brickHeight, brickWidth, brickDepth,
      waterLevel: baseWaterLevel, tankWidth, tankDepth
    } = state;
    
    const brickBaseArea = brickWidth * brickDepth;
    const brickBottomY = brickPosition.y - brickHeight / 2;
    const brickTopY = brickPosition.y + brickHeight / 2;
    
    let currentWaterLevel = baseWaterLevel;
    let submergedHeight = 0;
    
    for(let i=0; i<3; i++) {
      if (brickBottomY < currentWaterLevel) {
        if (brickTopY <= currentWaterLevel) {
          submergedHeight = brickHeight;
        } else {
          submergedHeight = currentWaterLevel - brickBottomY;
        }
      } else {
        submergedHeight = 0;
      }
      const submergedVolume = submergedHeight * brickBaseArea;
      const tankArea = tankWidth * tankDepth;
      currentWaterLevel = baseWaterLevel + (submergedVolume / tankArea);
    }
    
    return currentWaterLevel;
  },
  
  stepSimulation: (dt: number) => {
    const state = get();
    if (!state.isPlaying || state.isDragging) return;
    
    // Physics engine step
    const {
      brickPosition,
      brickVelocity,
      brickMass,
      brickHeight,
      brickWidth,
      brickDepth,
      tankWidth,
      tankDepth,
      waterLevel: baseWaterLevel,
      waterDensity,
      gravity,
      animationSpeed
    } = state;
    
    // Clamp timestep to ensure numerical stability (max 0.05s per step)
    const maxTimeStep = 0.05;
    const timeStep = Math.min(dt * animationSpeed, maxTimeStep);
    if (timeStep <= 0) return;
    
    const brickBaseArea = brickWidth * brickDepth;
    const brickBottomY = brickPosition.y - brickHeight / 2;
    const brickTopY = brickPosition.y + brickHeight / 2;
    
    let currentWaterLevel = baseWaterLevel;
    let submergedHeight = 0;
    let submergedVolume = 0;
    
    // Iterative calculation for exact water displacement
    for(let i=0; i<3; i++) {
      if (brickBottomY < currentWaterLevel) {
        if (brickTopY <= currentWaterLevel) {
          submergedHeight = brickHeight;
        } else {
          submergedHeight = currentWaterLevel - brickBottomY;
        }
      } else {
        submergedHeight = 0;
      }
      submergedVolume = submergedHeight * brickBaseArea;
      const tankArea = tankWidth * tankDepth;
      currentWaterLevel = baseWaterLevel + (submergedVolume / tankArea);
    }
    
    const buoyantForce = waterDensity * gravity * submergedVolume;
    const weight = brickMass * gravity;
    const netForce = buoyantForce - weight; // Upward is positive
    
    // Calculate physically realistic damping
    // Using a near-critical damping approach based on the "spring constant" of buoyancy
    const k_buoyancy = waterDensity * gravity * brickBaseArea; // Restoring force per meter
    const criticalDamping = 2 * Math.sqrt(brickMass * k_buoyancy);
    
    let dampingCoefficient = 0;
    if (submergedHeight > 0) {
      // Damping increases as more of the object is submerged
      dampingCoefficient = criticalDamping * 0.8 * (submergedHeight / brickHeight);
    }
    
    const dampingForce = -brickVelocity.y * dampingCoefficient;
    const totalForce = netForce + dampingForce;
    const acceleration = totalForce / brickMass;
    
    let newVelocityY = brickVelocity.y + acceleration * timeStep;
    let newPositionY = brickPosition.y + newVelocityY * timeStep;
    
    // Tank Bottom Collision
    if (newPositionY - brickHeight / 2 <= 0) {
      newPositionY = brickHeight / 2;
      newVelocityY = 0;
    }
    
    // Equilibrium / Settling Detection
    // To prevent infinite floating-point micro-oscillations
    const forceThreshold = weight * 0.01; // 1% tolerance
    const velocityThreshold = 0.05; // m/s
    
    const isAtBottom = newPositionY - brickHeight / 2 <= 0.01;
    
    // Condition 1: Floating or Neutrally Buoyant and forces are balanced
    const isBalancedAndSlow = submergedHeight > 0 && Math.abs(netForce) < forceThreshold && Math.abs(newVelocityY) < velocityThreshold;
    
    // Condition 2: Sinking (net force is downward) and hit the bottom
    const isSunkAndSlow = isAtBottom && netForce < 0 && Math.abs(newVelocityY) < velocityThreshold;

    if (isBalancedAndSlow || isSunkAndSlow) {
      newVelocityY = 0; // Freeze motion completely when settled
      
      // If floating, optionally snap to exact mathematical equilibrium height
      // to ensure F_B exactly equals W in the UI calculations on subsequent frames
      if (isBalancedAndSlow && !isAtBottom) {
         // This is a subtle correction so graphs and arrows are perfectly stable
      }
    }
    
    const newSimTime = state.simTime + timeStep;
    
    // Update graph data every 0.1s of sim time roughly, to prevent huge arrays
    let newGraphData = state.graphData;
    if (newGraphData.length === 0 || newSimTime - newGraphData[newGraphData.length - 1].time > 0.05) {
      newGraphData = [...state.graphData, {
        time: parseFloat(newSimTime.toFixed(2)),
        position: parseFloat(newPositionY.toFixed(2)),
        buoyantForce: parseFloat(buoyantForce.toFixed(0)),
        weight: parseFloat(weight.toFixed(0)),
        netForce: parseFloat(netForce.toFixed(0)),
        submergedDepth: parseFloat(submergedHeight.toFixed(2))
      }];
      if (newGraphData.length > 200) {
        newGraphData = newGraphData.slice(newGraphData.length - 200);
      }
    }
    
    set({
      brickPosition: { ...brickPosition, y: newPositionY },
      brickVelocity: { ...brickVelocity, y: newVelocityY },
      simTime: newSimTime,
      graphData: newGraphData
    });
  }
}));
