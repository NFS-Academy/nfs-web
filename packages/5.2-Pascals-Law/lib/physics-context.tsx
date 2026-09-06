'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type ExperimentState = 'idle' | 'running' | 'paused' | 'completed';

interface PhysicsState {
  f1: number; // Applied force (N)
  a1: number; // Small piston area (cm^2)
  a2: number; // Large piston area (cm^2)
  m: number; // Load mass (kg)
  g: number; // Gravity (m/s^2)
  fluidMode: 'normal' | 'xray';
  d1: number; // Small piston displacement (cm)
  d2: number; // Large piston displacement (cm)
  experimentState: ExperimentState;
  playbackSpeed: number;
}

interface PhysicsActions {
  setF1: (val: number) => void;
  setA1: (val: number) => void;
  setA2: (val: number) => void;
  setM: (val: number) => void;
  setG: (val: number) => void;
  setFluidMode: (val: 'normal' | 'xray') => void;
  setDisplacements: (d1: number, d2: number) => void;
  setExperimentState: (state: ExperimentState) => void;
  setPlaybackSpeed: (speed: number) => void;
  reset: () => void;
  applyPreset: (preset: number) => void;
}

interface PhysicsDerived {
  p: number; // Pressure (N/cm^2)
  f2: number; // Output force (N)
  f_load: number; // Load force (N)
  f1_min: number; // Minimum required force (N)
  ma: number; // Mechanical advantage
  isLifting: boolean;
  equilibrium: boolean;
  liftStatus: 'lift' | 'balanced' | 'too_heavy';
  w1: number; // Work done on small piston (J)
  w2: number; // Work done on large piston (J)
}

const DEFAULT_STATE: PhysicsState = {
  f1: 20,
  a1: 10,
  a2: 100,
  m: 10,
  g: 9.8,
  fluidMode: 'normal',
  d1: 0,
  d2: 0,
  experimentState: 'idle',
  playbackSpeed: 1,
};

const PhysicsContext = createContext<(PhysicsState & PhysicsActions & PhysicsDerived) | undefined>(undefined);

export function PhysicsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PhysicsState>(DEFAULT_STATE);

  const updateState = (updates: Partial<PhysicsState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const p = state.f1 / state.a1;
  const f2 = p * state.a2;
  const f_load = state.m * state.g;
  const ma = state.a2 / state.a1;
  const f1_min = f_load / ma;
  
  // A small tolerance for equilibrium (e.g., 0.1 N)
  const equilibrium = Math.abs(f2 - f_load) < 0.1;
  const isLifting = f2 > f_load + 0.1;
  const liftStatus: 'lift' | 'balanced' | 'too_heavy' = isLifting ? 'lift' : (equilibrium ? 'balanced' : 'too_heavy');

  // Work calculation (assuming d1 and d2 are in cm, dividing by 100 to get meters for Joules)
  // Actually, standardizing to a conceptual unit is fine. Let's just use F * d directly for relative comparison.
  const w1 = state.f1 * (state.d1 / 100);
  const w2 = f2 * (state.d2 / 100);

  const reset = () => setState(DEFAULT_STATE);

  const applyPreset = (preset: number) => {
    switch (preset) {
      case 1: // 10:1
        setState({ ...DEFAULT_STATE, a1: 10, a2: 100 });
        break;
      case 2: // 5:1
        setState({ ...DEFAULT_STATE, a1: 10, a2: 50 });
        break;
      case 3: // 1:1
        setState({ ...DEFAULT_STATE, a1: 50, a2: 50 });
        break;
    }
  };

  const value = {
    ...state,
    setF1: (f1: number) => updateState({ f1 }),
    setA1: (a1: number) => updateState({ a1 }),
    setA2: (a2: number) => updateState({ a2 }),
    setM: (m: number) => updateState({ m }),
    setG: (g: number) => updateState({ g }),
    setFluidMode: (fluidMode: 'normal' | 'xray') => updateState({ fluidMode }),
    setDisplacements: (d1: number, d2: number) => updateState({ d1, d2 }),
    setExperimentState: (experimentState: ExperimentState) => updateState({ experimentState }),
    setPlaybackSpeed: (playbackSpeed: number) => updateState({ playbackSpeed }),
    reset,
    applyPreset,
    p,
    f2,
    f_load,
    f1_min,
    ma,
    isLifting,
    equilibrium,
    liftStatus,
    w1,
    w2,
  };

  return <PhysicsContext.Provider value={value}>{children}</PhysicsContext.Provider>;
}

export function usePhysics() {
  const context = useContext(PhysicsContext);
  if (context === undefined) {
    throw new Error('usePhysics must be used within a PhysicsProvider');
  }
  return context;
}
