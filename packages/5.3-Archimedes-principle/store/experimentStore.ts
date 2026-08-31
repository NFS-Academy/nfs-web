import { create } from 'zustand';

export type AppState = 'INTRO' | 'EXPERIMENT' | 'CALCULATION' | 'RESULT' | 'DISCOVERY_INTRO' | 'DISCOVERY_EXPERIMENT' | 'MULTI_INTRO' | 'MULTI_EXPERIMENT' | 'MULTI_CALCULATION' | 'MULTI_RESULT';
export type CrownState = 'IDLE' | 'AIR_MEASUREMENT' | 'SUBMERGING' | 'PARTIAL_SUBMERGENCE' | 'FULL_SUBMERGENCE' | 'INVALID_CONTACT';
export type MultiCrownData = {
  m1: number | null;
  m2: number | null;
  calcDensity: string;
  guess: 'GOLD' | 'FAKE' | 'SILVER' | '';
};

export interface ExperimentStore {
  experimentMode: 'SINGLE' | 'MULTI';
  setExperimentMode: (mode: 'SINGLE' | 'MULTI') => void;

  appState: AppState;
  setAppState: (state: AppState) => void;

  crownState: CrownState;
  setCrownState: (state: CrownState) => void;

  measuredAirMass: number | null;
  setMeasuredAirMass: (mass: number | null) => void;

  measuredWaterMass: number | null;
  setMeasuredWaterMass: (mass: number | null) => void;

  showFormulas: boolean;
  setShowFormulas: (show: boolean) => void;
  
  studentGuess: 'GOLD' | 'FAKE' | 'UNSURE' | null;
  setStudentGuess: (guess: 'GOLD' | 'FAKE' | 'UNSURE' | null) => void;

  // For discovery mode
  activeCrown: 'FAKE' | 'GOLD';
  setActiveCrown: (crown: 'FAKE' | 'GOLD') => void;

  multiActiveCrown: 'A' | 'B' | 'C';
  setMultiActiveCrown: (crown: 'A' | 'B' | 'C') => void;

  multiData: Record<'A' | 'B' | 'C', MultiCrownData>;
  setMultiData: (crown: 'A' | 'B' | 'C', data: Partial<MultiCrownData>) => void;

  apparatusY: number;
  setApparatusY: (y: number | ((prev: number) => number)) => void;

  isMoving: 'UP' | 'DOWN' | null;
  setIsMoving: (dir: 'UP' | 'DOWN' | null) => void;

  calcStep: number;
  setCalcStep: (step: number) => void;

  resetExperiment: () => void;
}

const initialMultiData = {
  A: { m1: null, m2: null, calcDensity: '', guess: '' as const },
  B: { m1: null, m2: null, calcDensity: '', guess: '' as const },
  C: { m1: null, m2: null, calcDensity: '', guess: '' as const },
};

export const useExperimentStore = create<ExperimentStore>((set) => ({
  experimentMode: 'SINGLE',
  setExperimentMode: (mode) => set({ experimentMode: mode }),

  appState: 'INTRO',
  setAppState: (state) => set({ appState: state }),

  crownState: 'IDLE',
  setCrownState: (state) => set({ crownState: state }),

  measuredAirMass: null,
  setMeasuredAirMass: (mass) => set({ measuredAirMass: mass }),

  measuredWaterMass: null,
  setMeasuredWaterMass: (mass) => set({ measuredWaterMass: mass }),

  showFormulas: false,
  setShowFormulas: (show) => set({ showFormulas: show }),

  studentGuess: null,
  setStudentGuess: (guess) => set({ studentGuess: guess }),

  activeCrown: 'FAKE',
  setActiveCrown: (crown) => set({ activeCrown: crown }),

  multiActiveCrown: 'A',
  setMultiActiveCrown: (crown) => set({ multiActiveCrown: crown }),

  multiData: initialMultiData,
  setMultiData: (crown, data) => set((state) => ({
    multiData: {
      ...state.multiData,
      [crown]: { ...state.multiData[crown], ...data }
    }
  })),

  apparatusY: 4.5,
  setApparatusY: (y) => set((state) => ({ 
    apparatusY: typeof y === 'function' ? y(state.apparatusY) : y 
  })),

  // New state for continuous movement
  isMoving: null as 'UP' | 'DOWN' | null,
  setIsMoving: (dir) => set({ isMoving: dir }),

  calcStep: 0,
  setCalcStep: (step) => set({ calcStep: step }),

  resetExperiment: () => set({
    appState: 'INTRO',
    crownState: 'IDLE',
    measuredAirMass: null,
    measuredWaterMass: null,
    showFormulas: false,
    studentGuess: null,
    activeCrown: 'FAKE',
    apparatusY: 4.5,
    isMoving: null,
    calcStep: 0,
    multiActiveCrown: 'A',
    multiData: initialMultiData,
  }),
}));
