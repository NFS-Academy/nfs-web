import { useState, useEffect, useRef, useCallback } from 'react';
import { PhysicsBody, applyHeat, SPECIFIC_HEAT } from '@/lib/physics';

export type SimulationPhase = 'SETUP' | 'POURING_A' | 'POURING_B' | 'MIXING' | 'EXCHANGE' | 'EQUILIBRIUM';
export type ViewMode = 'MACRO' | 'MICRO';
export type SimMode = 'LEARN' | 'EXPERIMENT' | 'PHASE_CHANGE';

export interface DataPoint {
  time: number;
  tempA: number;
  tempB: number;
}

export interface ExperimentResult {
  id: number;
  matA: string; massA: number; tempA: number;
  matB: string; massB: number; tempB: number;
  finalTemp: number;
  qLost: number; qGained: number; qEnv: number;
}

export function useSimulation() {
  const [mode, setMode] = useState<SimMode>('LEARN');
  
  const [massA, setMassA] = useState(2);
  const [tempA, setTempA] = useState(75);
  const [matA, setMatA] = useState('Water');
  
  const [massB, setMassB] = useState(1);
  const [tempB, setTempB] = useState(20);
  const [matB, setMatB] = useState('Water');
  
  const [envLoss, setEnvLoss] = useState(false);
  const [history, setHistory] = useState<DataPoint[]>([]);
  const [resultsHistory, setResultsHistory] = useState<ExperimentResult[]>([]);

  const [initialPhaseA, setInitialPhaseA] = useState({ ice: 0, liquid: 1, steam: 0 });
  const [initialPhaseB, setInitialPhaseB] = useState({ ice: 0, liquid: 1, steam: 0 });

  const [phase, setPhase] = useState<SimulationPhase>('SETUP');
  const [view, setView] = useState<ViewMode>('MACRO');
  
  const [currentA, setCurrentA] = useState<PhysicsBody>({ mass: 2, temp: 75, material: 'Water', massIce: 0, massLiquid: 2, massSteam: 0 });
  const [currentB, setCurrentB] = useState<PhysicsBody>({ mass: 1, temp: 20, material: 'Water', massIce: 0, massLiquid: 1, massSteam: 0 });
  
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  
  const [qLostEnv, setQLostEnv] = useState(0);

  const requestRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number | null>(null);

  const physARef = useRef<PhysicsBody>({ mass: 2, temp: 75, material: 'Water', massIce: 0, massLiquid: 2, massSteam: 0 });
  const physBRef = useRef<PhysicsBody>({ mass: 1, temp: 20, material: 'Water', massIce: 0, massLiquid: 1, massSteam: 0 });
  const timeRef = useRef(0);
  const envLostRef = useRef(0);
  const initialTempARef = useRef(75);
  const initialTempBRef = useRef(20);

  useEffect(() => {
    if (phase === 'SETUP') {
      const a: PhysicsBody = {
        mass: massA, temp: tempA, material: matA,
        massIce: massA * initialPhaseA.ice,
        massLiquid: massA * initialPhaseA.liquid,
        massSteam: massA * initialPhaseA.steam
      };
      const b: PhysicsBody = {
        mass: massB, temp: tempB, material: matB,
        massIce: massB * initialPhaseB.ice,
        massLiquid: massB * initialPhaseB.liquid,
        massSteam: massB * initialPhaseB.steam
      };
      physARef.current = JSON.parse(JSON.stringify(a));
      physBRef.current = JSON.parse(JSON.stringify(b));
      timeRef.current = 0;
      envLostRef.current = 0;
      initialTempARef.current = tempA;
      initialTempBRef.current = tempB;
      
      setCurrentA(a);
      setCurrentB(b);
      setHistory([]);
      setTime(0);
      setQLostEnv(0);
    }
  }, [massA, tempA, matA, massB, tempB, matB, initialPhaseA, initialPhaseB, phase]);

  const startSimulation = useCallback(() => {
    if (phase === 'SETUP') {
      setPhase('POURING_A');
      setTimeout(() => setPhase('POURING_B'), 2000 / speed);
      setTimeout(() => setPhase('MIXING'), 4000 / speed);
      setTimeout(() => {
        setPhase('EXCHANGE');
        lastUpdateRef.current = performance.now();
      }, 5000 / speed);
    }
  }, [phase, speed]);

  const resetSimulation = useCallback(() => {
    setPhase('SETUP');
    setIsPaused(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  }, []);

  const updatePhysics = useCallback(function updatePhysicsLoop(now: number) {
    if (!lastUpdateRef.current) lastUpdateRef.current = now;
    const deltaTime = (now - lastUpdateRef.current) / 1000;
    lastUpdateRef.current = now;

    if (!isPaused && phase === 'EXCHANGE') {
      let tA = physARef.current.temp;
      let tB = physBRef.current.temp;
      const deltaTemp = tA - tB;
      
      if (Math.abs(deltaTemp) < 0.05) {
        setPhase('EQUILIBRIUM');
        setCurrentA(JSON.parse(JSON.stringify(physARef.current)));
        setCurrentB(JSON.parse(JSON.stringify(physBRef.current)));
        setHistory(h => [...h, { time: timeRef.current, tempA: tA, tempB: tB }]);
        
        setResultsHistory(prev => [...prev, {
          id: Date.now(),
          matA, massA, tempA: initialTempARef.current,
          matB, massB, tempB: initialTempBRef.current,
          finalTemp: tA,
          qLost: 0, qGained: 0, qEnv: envLostRef.current
        }]);

        return;
      }

      const k = 5.0; 
      const transferRate = k * deltaTemp * speed * deltaTime;
      
      let qEnv = 0;
      if (envLoss) {
         const avgTemp = (tA + tB) / 2;
         qEnv = 0.5 * Math.max(0, avgTemp - 20) * speed * deltaTime;
      }

      let dQa = -transferRate;
      let dQb = transferRate;

      if (qEnv > 0) {
         if (tA > tB) dQa -= qEnv;
         else dQb -= qEnv;
         envLostRef.current += qEnv;
      }

      applyHeat(physARef.current, dQa);
      applyHeat(physBRef.current, dQb);
      
      timeRef.current += speed * deltaTime;

      setCurrentA(JSON.parse(JSON.stringify(physARef.current)));
      setCurrentB(JSON.parse(JSON.stringify(physBRef.current)));
      setTime(timeRef.current);
      setQLostEnv(envLostRef.current);

      setHistory((h) => {
        const last = h[h.length - 1];
        if (!last || timeRef.current - last.time > 0.1) {
          return [...h, { time: timeRef.current, tempA: physARef.current.temp, tempB: physBRef.current.temp }];
        }
        return h;
      });
    }
    
    if (phase === 'EXCHANGE' && !isPaused) {
      requestRef.current = requestAnimationFrame(updatePhysicsLoop);
    }
  }, [isPaused, phase, speed, envLoss, matA, massA, matB, massB]);

  useEffect(() => {
    if (phase === 'EXCHANGE' && !isPaused) {
      lastUpdateRef.current = performance.now();
      requestRef.current = requestAnimationFrame(updatePhysics);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [phase, isPaused, updatePhysics]);

  return {
    mode, setMode,
    massA, setMassA, tempA, setTempA, matA, setMatA,
    massB, setMassB, tempB, setTempB, matB, setMatB,
    initialPhaseA, setInitialPhaseA, initialPhaseB, setInitialPhaseB,
    envLoss, setEnvLoss,
    phase, setPhase,
    view, setView,
    currentA, currentB,
    time, history, resultsHistory, qLostEnv,
    speed, setSpeed,
    isPaused, setIsPaused,
    startSimulation, resetSimulation,
  };
}
