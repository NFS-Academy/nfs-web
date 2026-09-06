'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  TabId,
  ObservationRecord,
  WeatherScenarioId,
  WeatherScenario,
  ChallengeItem,
  MeasurementEvaluation,
  CameraPreset,
  LabSetupState,
  ApparatusComponentId,
  DropZoneId,
} from '../lib/types';
import {
  STANDARD_ATMOSPHERIC_PRESSURE_HPA,
  calculateHeightCmFromHPa,
  evaluateMeasurement,
  getGeneratedWeatherScenarios,
  getChallengeScenarios,
} from '../lib/physics';
import { soundManager } from '../lib/audio';

interface ExperimentContextType {
  // Tab Management
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;

  // Global Physics State
  pressureHPa: number;
  setPressureHPa: (p: number) => void;
  mercuryHeightCm: number;

  // Tab 1: Interactive 3D Setup State Machine
  setupState: LabSetupState;
  currentStepIndex: number; // 0 to 6
  draggedItem: ApparatusComponentId | null;
  setDraggedItem: (item: ApparatusComponentId | null) => void;
  activeHoverZone: DropZoneId | null;
  setActiveHoverZone: (zone: DropZoneId | null) => void;
  bubblesRemaining: number;
  popBubble: () => void;
  tubeRotationAngle: number;
  setTubeRotationAngle: (deg: number) => void;
  invertTubeComplete: () => void;
  handleComponentDrop: (itemId: ApparatusComponentId, targetZone: DropZoneId) => boolean;
  setupFeedback: { type: 'success' | 'error' | 'info'; message: string } | null;
  clearSetupFeedback: () => void;
  showHint: boolean;
  toggleHint: () => void;
  currentHintText: string;

  // Start Experiment Action
  startPhysicalExperiment: () => void;
  isExperimentRunning: boolean;
  isExperimentCompleted: boolean;
  showForces: boolean;
  setShowForces: (show: boolean | ((prev: boolean) => boolean)) => void;
  resetSetup: () => void;

  // Tab 2: Measurement & Explanation
  studentMeasurementInput: string;
  setStudentMeasurementInput: (val: string) => void;
  measurementEvaluation: MeasurementEvaluation | null;
  submitMeasurement: (studentValue: number) => void;
  resetMeasurement: () => void;
  explanationStage: number;
  setExplanationStage: (stage: number | ((prev: number) => number)) => void;
  caliperTopCm: number;
  setCaliperTopCm: (cm: number) => void;
  caliperBottomCm: number;
  setCaliperBottomCm: (cm: number) => void;

  // Tab 3: Pressure Variation & POE Cycle
  targetPressureHPa: number;
  setTargetPressureHPa: (p: number) => void;
  selectedPrediction: 'decrease' | 'same' | 'increase' | null;
  setSelectedPrediction: (pred: 'decrease' | 'same' | 'increase' | null) => void;
  predictionResult: {
    tested: boolean;
    isCorrect: boolean;
    explanation: string;
  } | null;
  runPressureExperiment: () => void;
  observationRecords: ObservationRecord[];
  addObservationRecord: (customNote?: string) => void;
  clearObservationRecords: () => void;

  // Tab 4: Weather & Challenge
  activeWeatherScenarioId: WeatherScenarioId;
  setActiveWeatherScenarioId: (id: WeatherScenarioId) => void;
  weatherScenarios: WeatherScenario[];
  activeWeatherScenario: WeatherScenario;
  weatherForecastAnswer: 'clear' | 'stable' | 'rain' | 'storm' | null;
  setWeatherForecastAnswer: (ans: 'clear' | 'stable' | 'rain' | 'storm' | null) => void;
  weatherForecastSubmitted: boolean;
  submitWeatherForecast: () => void;

  // Challenge Mode
  challenges: ChallengeItem[];
  currentChallengeIndex: number;
  setCurrentChallengeIndex: (idx: number) => void;
  challengeSubmissions: Record<
    number,
    {
      pressureTrend: string;
      mercuryTrend: string;
      weatherForecast: string;
      isSubmitted: boolean;
      score: number;
      isCorrect: boolean;
    }
  >;
  submitChallengeAnswer: (
    challengeId: number,
    answers: { pressureTrend: string; mercuryTrend: string; weatherForecast: string }
  ) => void;
  resetChallenges: () => void;

  // Lab Canvas & Audio Settings
  cameraPreset: CameraPreset;
  setCameraPreset: (preset: CameraPreset) => void;
  isMuted: boolean;
  toggleMute: () => void;
  resetAllLabData: () => void;
}

const ExperimentContext = createContext<ExperimentContextType | null>(null);

export const ExperimentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeTab, setActiveTabState] = useState<TabId>('core');

  // Physics
  const [pressureHPa, setPressureHPa] = useState<number>(STANDARD_ATMOSPHERIC_PRESSURE_HPA);

  // Dynamic calculated height (Real-time P = ρgh)
  const mercuryHeightCm = useMemo(() => {
    return calculateHeightCmFromHPa(pressureHPa);
  }, [pressureHPa]);

  // Tab 1: Setup State Machine
  const [setupState, setSetupState] = useState<LabSetupState>('SETUP_EMPTY');
  const [draggedItem, setDraggedItem] = useState<ApparatusComponentId | null>(null);
  const [activeHoverZone, setActiveHoverZone] = useState<DropZoneId | null>(null);
  const [bubblesRemaining, setBubblesRemaining] = useState<number>(4);
  const [tubeRotationAngle, setTubeRotationAngle] = useState<number>(0);
  const [setupFeedback, setSetupFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showForces, setShowForces] = useState<boolean>(false);

  // Map state to step index 0 to 6
  const currentStepIndex = useMemo(() => {
    switch (setupState) {
      case 'SETUP_EMPTY':
        return 0;
      case 'TUBE_FILLED':
        return 1;
      case 'AIR_REMOVED':
        return 2;
      case 'TUBE_SEALED':
        return 3;
      case 'TUBE_INVERTED':
        return 4;
      case 'TUBE_IMMERSED':
        return 5;
      case 'TUBE_RELEASED':
      case 'READY_TO_START':
      case 'EXPERIMENT_RUNNING':
      case 'EQUILIBRIUM_REACHED':
        return 6;
      default:
        return 0;
    }
  }, [setupState]);

  const isExperimentRunning = setupState === 'EXPERIMENT_RUNNING';
  const isExperimentCompleted = setupState === 'EQUILIBRIUM_REACHED';

  // Context-sensitive Hints
  const currentHintText = useMemo(() => {
    switch (setupState) {
      case 'SETUP_EMPTY':
        return 'ট্রে থেকে "পারদ ফ্লাস্ক" ড্র্যাগ করে কাচনলের ওপর ড্রপ করুন যাতে নলটি পূর্ণ হয়।';
      case 'TUBE_FILLED':
        return 'নলের ভেতরের আটকে থাকা ৪টি বুদবুদ দূর করতে "বুদবুদ দূর করুন" বাটনে ক্লিক করুন বা নলে টোকা দিন।';
      case 'AIR_REMOVED':
        return 'ট্রে থেকে "বৃদ্ধাঙ্গুলি / কর্ক" ড্র্যাগ করে কাচনলের খোলা মুখের ওপর ড্রপ করে মুখটি শক্তভাবে বন্ধ করুন।';
      case 'TUBE_SEALED':
        return 'রোটেশন স্লাইডার টেনে বা "১৮০° উল্টো করুন" বাটনে ক্লিক করে নলটি উলম্বভাবে উল্টো করুন।';
      case 'TUBE_INVERTED':
        return 'উল্টানো কাচনলটি ড্র্যাগ করে নিচে অবস্থিত পারদের পাত্রের ওপর ড্রপ করুন যাতে মুখটি তরলে নিমজ্জিত হয়।';
      case 'TUBE_IMMERSED':
        return 'নলের মুখ থেকে আঙুল/কর্ক টেনে সরিয়ে নিন যাতে পারদ নিচে নামতে প্রস্তুত হয়।';
      case 'TUBE_RELEASED':
      case 'READY_TO_START':
        return 'সব প্রস্তুতি সম্পন্ন! এবার নিচে থাকা "▶ পরীক্ষা শুরু করুন" বাটনে ক্লিক করে বাস্তব ফিজিক্স পরীক্ষা শুরু করুন।';
      case 'EQUILIBRIUM_REACHED':
        return 'পারদস্তম্ভ ৭৬ সেমিতে স্থির হয়েছে। এবার "📏 পরিমাপ ও ব্যাখ্যা" ট্যাবে গিয়ে বিস্তারিত পর্যবেক্ষণ করুন।';
      default:
        return '';
    }
  }, [setupState]);

  const toggleHint = useCallback(() => {
    soundManager.playClick();
    setShowHint((prev) => !prev);
  }, []);

  const clearSetupFeedback = useCallback(() => {
    setSetupFeedback(null);
  }, []);

  // Handle Drag-and-Drop Component Placement
  const handleComponentDrop = useCallback(
    (itemId: ApparatusComponentId, targetZone: DropZoneId): boolean => {
      // Step 1: Drag mercury to tube
      if (setupState === 'SETUP_EMPTY') {
        if (itemId === 'mercury_flask' && (targetZone === 'tube_body' || targetZone === 'tube_opening')) {
          soundManager.playPour();
          setSetupState('TUBE_FILLED');
          setBubblesRemaining(4);
          setSetupFeedback({
            type: 'success',
            message: '✓ সঠিকভাবে পারদ দিয়ে কাচনল সম্পূর্ণ পূর্ণ করা হয়েছে।',
          });
          return true;
        } else {
          soundManager.playClick();
          setSetupFeedback({
            type: 'error',
            message: 'এটি সঠিক স্থান নয়। পারদ ফ্লাস্কটি কাচনলের ওপর নিয়ে ড্রপ করুন।',
          });
          return false;
        }
      }

      // Step 3: Drag stopper to tube opening
      if (setupState === 'AIR_REMOVED') {
        if (itemId === 'finger_stopper' && targetZone === 'tube_opening') {
          soundManager.playClick();
          setSetupState('TUBE_SEALED');
          setSetupFeedback({
            type: 'success',
            message: '✓ বৃদ্ধাঙ্গুলি/কর্ক দিয়ে নলের মুখ শক্তভাবে নিশ্ছিদ্র করা হয়েছে।',
          });
          return true;
        } else {
          soundManager.playClick();
          setSetupFeedback({
            type: 'error',
            message: 'এটি সঠিক স্থান নয়। কর্ক/আঙুলটি নলের খোলা মুখের ওপর ড্রপ করুন।',
          });
          return false;
        }
      }

      // Step 5: Drag inverted tube into reservoir
      if (setupState === 'TUBE_INVERTED') {
        if (itemId === 'glass_tube' && targetZone === 'reservoir_surface') {
          soundManager.playLiquidDrop();
          setSetupState('TUBE_IMMERSED');
          setSetupFeedback({
            type: 'success',
            message: '✓ কাচনলের মুখ পারদের পাত্রের তরলের নিচে ডুবানো হয়েছে।',
          });
          return true;
        } else {
          soundManager.playClick();
          setSetupFeedback({
            type: 'error',
            message: 'এটি সঠিক স্থান নয়। কাচনলটি পারদের পাত্রের ওপর ড্রপ করুন।',
          });
          return false;
        }
      }

      // Step 6: Drag stopper away from tube mouth
      if (setupState === 'TUBE_IMMERSED') {
        if (itemId === 'finger_stopper' && targetZone === 'bench_area') {
          soundManager.playClick();
          setSetupState('READY_TO_START');
          setSetupFeedback({
            type: 'success',
            message: '✓ নলের মুখ থেকে আঙুল সরানো হয়েছে! সব প্রস্তুতি সম্পন্ন।',
          });
          return true;
        }
      }

      setSetupFeedback({
        type: 'error',
        message: 'এটি এই ধাপের জন্য সঠিক স্থান নয়। আবার চেষ্টা করুন।',
      });
      return false;
    },
    [setupState]
  );

  // Step 2: Pop air bubbles
  const popBubble = useCallback(() => {
    soundManager.playBubble();
    setBubblesRemaining((prev) => {
      const next = Math.max(0, prev - 1);
      if (next === 0) {
        setSetupState('AIR_REMOVED');
        setSetupFeedback({
          type: 'success',
          message: '✓ নলের ভেতরের সব বায়ুর বুদবুদ সম্পূর্ণ দূর করা হয়েছে।',
        });
      } else {
        setSetupFeedback({
          type: 'info',
          message: `বুদবুদ পপ হয়েছে! আর ${next}টি বুদবুদ বাকি।`,
        });
      }
      return next;
    });
  }, []);

  // Step 4: Invert tube
  const invertTubeComplete = useCallback(() => {
    soundManager.playClick();
    setTubeRotationAngle(180);
    setSetupState('TUBE_INVERTED');
    setSetupFeedback({
      type: 'success',
      message: '✓ নলটি মুখ বন্ধ অবস্থায় ১৮০° উল্টো করা হয়েছে।',
    });
  }, []);

  // Start Physical Experiment Execution
  const startPhysicalExperiment = useCallback(() => {
    if (setupState !== 'READY_TO_START' && setupState !== 'TUBE_RELEASED') return;

    soundManager.playLiquidDrop();
    setSetupState('EXPERIMENT_RUNNING');
    setSetupFeedback({
      type: 'info',
      message: 'পরীক্ষা চলছে... পারদস্তম্ভ নিচে নেমে সাম্যাবস্থায় স্থির হচ্ছে।',
    });

    // Animate descent & settle at calculated equilibrium
    setTimeout(() => {
      setSetupState('EQUILIBRIUM_REACHED');
      soundManager.playSuccess();
      setSetupFeedback({
        type: 'success',
        message: `✓ পরীক্ষা সম্পন্ন! পারদস্তম্ভ ${calculateHeightCmFromHPa(pressureHPa).toFixed(1)} cm উচ্চতায় স্থির হয়েছে এবং টরিসেলির শূন্যস্থান তৈরি হয়েছে।`,
      });
    }, 1600);
  }, [setupState, pressureHPa]);

  const resetSetup = useCallback(() => {
    soundManager.playClick();
    setSetupState('SETUP_EMPTY');
    setBubblesRemaining(4);
    setTubeRotationAngle(0);
    setSetupFeedback(null);
    setShowForces(false);
  }, []);

  // Tab 2: Measurement & Theory
  const [studentMeasurementInput, setStudentMeasurementInput] = useState<string>('');
  const [measurementEvaluation, setMeasurementEvaluation] = useState<MeasurementEvaluation | null>(null);
  const [explanationStage, setExplanationStage] = useState<number>(1);
  const [caliperTopCm, setCaliperTopCm] = useState<number>(76.0);
  const [caliperBottomCm, setCaliperBottomCm] = useState<number>(0.0);

  // Tab 3: Pressure Variation
  const [targetPressureHPa, setTargetPressureHPa] = useState<number>(STANDARD_ATMOSPHERIC_PRESSURE_HPA);
  const [selectedPrediction, setSelectedPrediction] = useState<'decrease' | 'same' | 'increase' | null>(null);
  const [predictionResult, setPredictionResult] = useState<{
    tested: boolean;
    isCorrect: boolean;
    explanation: string;
  } | null>(null);
  const [observationRecords, setObservationRecords] = useState<ObservationRecord[]>([
    {
      id: 'init-1',
      testNumber: 1,
      pressureHPa: 1013.25,
      pressurePa: 101325,
      heightCm: calculateHeightCmFromHPa(1013.25),
      prediction: 'same',
      isCorrect: true,
      notes: 'প্রমাণ বায়ুমণ্ডলীয় চাপে পারদ স্তম্ভের প্রমিত উচ্চতা',
      timestamp: 'প্রাথমিক পরীক্ষা',
    },
  ]);

  // Tab 4: Weather & Challenges
  const weatherScenarios = useMemo(() => getGeneratedWeatherScenarios(), []);
  const [activeWeatherScenarioId, setActiveWeatherScenarioIdState] = useState<WeatherScenarioId>('standard');
  const activeWeatherScenario = useMemo(() => {
    return weatherScenarios.find((s) => s.id === activeWeatherScenarioId) || weatherScenarios[0];
  }, [weatherScenarios, activeWeatherScenarioId]);

  const [weatherForecastAnswer, setWeatherForecastAnswer] = useState<'clear' | 'stable' | 'rain' | 'storm' | null>(null);
  const [weatherForecastSubmitted, setWeatherForecastSubmitted] = useState<boolean>(false);

  const challenges = useMemo(() => getChallengeScenarios(), []);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [challengeSubmissions, setChallengeSubmissions] = useState<
    Record<
      number,
      {
        pressureTrend: string;
        mercuryTrend: string;
        weatherForecast: string;
        isSubmitted: boolean;
        score: number;
        isCorrect: boolean;
      }
    >
  >({});

  // Audio & Camera
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('default');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      soundManager.isMuted = next;
      return next;
    });
  }, []);

  const setActiveTab = useCallback((tab: TabId) => {
    soundManager.playClick();
    setActiveTabState(tab);
  }, []);

  // Measurement submission
  const submitMeasurement = useCallback(
    (studentVal: number) => {
      soundManager.playClick();
      const actualVal = mercuryHeightCm;
      const evaluation = evaluateMeasurement(studentVal, actualVal);
      setMeasurementEvaluation(evaluation);
      if (evaluation.isAcceptable) {
        soundManager.playSuccess();
      }
    },
    [mercuryHeightCm]
  );

  const resetMeasurement = useCallback(() => {
    soundManager.playClick();
    setStudentMeasurementInput('');
    setMeasurementEvaluation(null);
  }, []);

  // Pressure Experiment Execution (POE cycle)
  const runPressureExperiment = useCallback(() => {
    if (!selectedPrediction) return;

    soundManager.playPressureChange();
    const oldPressure = pressureHPa;
    const newPressure = targetPressureHPa;
    setPressureHPa(newPressure);

    let isCorrect = false;
    let explanation = '';

    if (newPressure > oldPressure) {
      isCorrect = selectedPrediction === 'increase';
      explanation = `বায়ুমণ্ডলীয় চাপ বৃদ্ধি পাওয়ায় (${oldPressure.toFixed(1)} hPa → ${newPressure.toFixed(1)} hPa) পাত্রের পারদের ওপর চাপ বেড়েছে। ফলে নলের ভেতরে পারদস্তম্ভের উচ্চতা বৃদ্ধি পেয়ে ${calculateHeightCmFromHPa(newPressure).toFixed(1)} cm হয়েছে।`;
    } else if (newPressure < oldPressure) {
      isCorrect = selectedPrediction === 'decrease';
      explanation = `বায়ুমণ্ডলীয় চাপ কমে যাওয়ায় (${oldPressure.toFixed(1)} hPa → ${newPressure.toFixed(1)} hPa) পাত্রের পারদের ওপর বল হ্রাস পেয়েছে। ফলে নলের ভেতরের পারদস্তম্ভ নিচে নেমে ${calculateHeightCmFromHPa(newPressure).toFixed(1)} cm-এ স্থির হয়েছে।`;
    } else {
      isCorrect = selectedPrediction === 'same';
      explanation = `বায়ুমণ্ডলীয় চাপ অপরিবর্তিত থাকায় পারদস্তম্ভের উচ্চতাও একই (${calculateHeightCmFromHPa(newPressure).toFixed(1)} cm) রয়েছে।`;
    }

    setPredictionResult({
      tested: true,
      isCorrect,
      explanation,
    });

    if (isCorrect) {
      soundManager.playSuccess();
    }

    // Auto-add to observation record
    const height = calculateHeightCmFromHPa(newPressure);
    const newRecord: ObservationRecord = {
      id: `test-${Date.now()}`,
      testNumber: observationRecords.length + 1,
      pressureHPa: newPressure,
      pressurePa: newPressure * 100,
      heightCm: height,
      prediction: selectedPrediction,
      isCorrect,
      notes: isCorrect ? 'সঠিক অনুমান: চাপ ও উচ্চতার সমানুপাতিক সম্পর্ক প্রমাণিত' : 'পর্যবেক্ষণ: উচ্চতা চাপের পরিবর্তনের সাথে সরাসরি পরিবর্তিত হয়',
      timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
    };

    setObservationRecords((prev) => [newRecord, ...prev]);
  }, [selectedPrediction, pressureHPa, targetPressureHPa, observationRecords.length]);

  const addObservationRecord = useCallback(
    (customNote?: string) => {
      soundManager.playClick();
      const height = calculateHeightCmFromHPa(pressureHPa);
      const newRecord: ObservationRecord = {
        id: `test-${Date.now()}`,
        testNumber: observationRecords.length + 1,
        pressureHPa: pressureHPa,
        pressurePa: pressureHPa * 100,
        heightCm: height,
        notes: customNote || `বায়ুচাপ ${pressureHPa.toFixed(1)} hPa-এ পরিমাপকৃত উচ্চতা`,
        timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      };
      setObservationRecords((prev) => [newRecord, ...prev]);
    },
    [pressureHPa, observationRecords.length]
  );

  const clearObservationRecords = useCallback(() => {
    soundManager.playClick();
    setObservationRecords([]);
  }, []);

  // Weather scenario changer
  const setActiveWeatherScenarioId = useCallback(
    (id: WeatherScenarioId) => {
      soundManager.playClick();
      setActiveWeatherScenarioIdState(id);
      const scenario = weatherScenarios.find((s) => s.id === id);
      if (scenario) {
        setPressureHPa(scenario.currentPressureHPa);
      }
      setWeatherForecastAnswer(null);
      setWeatherForecastSubmitted(false);
    },
    [weatherScenarios]
  );

  const submitWeatherForecast = useCallback(() => {
    if (!weatherForecastAnswer) return;
    soundManager.playClick();
    setWeatherForecastSubmitted(true);
    if (weatherForecastAnswer === activeWeatherScenario.expectedWeather) {
      soundManager.playSuccess();
    }
  }, [weatherForecastAnswer, activeWeatherScenario]);

  // Challenge submissions
  const submitChallengeAnswer = useCallback(
    (
      challengeId: number,
      answers: { pressureTrend: string; mercuryTrend: string; weatherForecast: string }
    ) => {
      soundManager.playClick();
      const challenge = challenges.find((c) => c.id === challengeId);
      if (!challenge) return;

      let score = 0;
      if (answers.pressureTrend === challenge.correctPressureTrend) score += 35;
      if (answers.mercuryTrend === challenge.correctMercuryTrend) score += 35;
      if (answers.weatherForecast === challenge.correctWeatherForecast) score += 30;

      const isCorrect = score === 100;
      if (isCorrect) {
        soundManager.playSuccess();
      }

      setChallengeSubmissions((prev) => ({
        ...prev,
        [challengeId]: {
          ...answers,
          isSubmitted: true,
          score,
          isCorrect,
        },
      }));
    },
    [challenges]
  );

  const resetChallenges = useCallback(() => {
    soundManager.playClick();
    setChallengeSubmissions({});
    setCurrentChallengeIndex(0);
  }, []);

  // Full reset
  const resetAllLabData = useCallback(() => {
    soundManager.playClick();
    setSetupState('SETUP_EMPTY');
    setBubblesRemaining(4);
    setTubeRotationAngle(0);
    setSetupFeedback(null);
    setShowForces(false);
    setPressureHPa(STANDARD_ATMOSPHERIC_PRESSURE_HPA);
    setTargetPressureHPa(STANDARD_ATMOSPHERIC_PRESSURE_HPA);
    setStudentMeasurementInput('');
    setMeasurementEvaluation(null);
    setSelectedPrediction(null);
    setPredictionResult(null);
    setObservationRecords([
      {
        id: 'init-1',
        testNumber: 1,
        pressureHPa: 1013.25,
        pressurePa: 101325,
        heightCm: calculateHeightCmFromHPa(1013.25),
        prediction: 'same',
        isCorrect: true,
        notes: 'প্রমাণ বায়ুমণ্ডলীয় চাপে পারদ স্তম্ভের প্রমিত উচ্চতা',
        timestamp: 'প্রাথমিক পরীক্ষা',
      },
    ]);
    setActiveWeatherScenarioIdState('standard');
    setWeatherForecastAnswer(null);
    setWeatherForecastSubmitted(false);
    setChallengeSubmissions({});
    setCurrentChallengeIndex(0);
    setCaliperTopCm(76.0);
    setCaliperBottomCm(0.0);
  }, []);

  // Synchronize caliper with actual height initially
  useEffect(() => {
    setCaliperTopCm(parseFloat(mercuryHeightCm.toFixed(1)));
  }, [mercuryHeightCm]);

  return (
    <ExperimentContext.Provider
      value={{
        activeTab,
        setActiveTab,
        pressureHPa,
        setPressureHPa,
        mercuryHeightCm,
        setupState,
        currentStepIndex,
        draggedItem,
        setDraggedItem,
        activeHoverZone,
        setActiveHoverZone,
        bubblesRemaining,
        popBubble,
        tubeRotationAngle,
        setTubeRotationAngle,
        invertTubeComplete,
        handleComponentDrop,
        setupFeedback,
        clearSetupFeedback,
        showHint,
        toggleHint,
        currentHintText,
        startPhysicalExperiment,
        isExperimentRunning,
        isExperimentCompleted,
        showForces,
        setShowForces,
        resetSetup,
        studentMeasurementInput,
        setStudentMeasurementInput,
        measurementEvaluation,
        submitMeasurement,
        resetMeasurement,
        explanationStage,
        setExplanationStage,
        caliperTopCm,
        setCaliperTopCm,
        caliperBottomCm,
        setCaliperBottomCm,
        targetPressureHPa,
        setTargetPressureHPa,
        selectedPrediction,
        setSelectedPrediction,
        predictionResult,
        runPressureExperiment,
        observationRecords,
        addObservationRecord,
        clearObservationRecords,
        activeWeatherScenarioId,
        setActiveWeatherScenarioId,
        weatherScenarios,
        activeWeatherScenario,
        weatherForecastAnswer,
        setWeatherForecastAnswer,
        weatherForecastSubmitted,
        submitWeatherForecast,
        challenges,
        currentChallengeIndex,
        setCurrentChallengeIndex,
        challengeSubmissions,
        submitChallengeAnswer,
        resetChallenges,
        cameraPreset,
        setCameraPreset,
        isMuted,
        toggleMute,
        resetAllLabData,
      }}
    >
      {children}
    </ExperimentContext.Provider>
  );
};

export const useExperiment = () => {
  const context = useContext(ExperimentContext);
  if (!context) {
    throw new Error('useExperiment must be used within an ExperimentProvider');
  }
  return context;
};
