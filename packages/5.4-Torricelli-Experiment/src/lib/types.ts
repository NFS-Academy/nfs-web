export type TabId = 'core' | 'measurement' | 'variation' | 'weather';

export type LabSetupState =
  | 'SETUP_EMPTY'
  | 'TUBE_FILLED'
  | 'AIR_REMOVED'
  | 'TUBE_SEALED'
  | 'TUBE_INVERTED'
  | 'TUBE_IMMERSED'
  | 'TUBE_RELEASED'
  | 'READY_TO_START'
  | 'EXPERIMENT_RUNNING'
  | 'EQUILIBRIUM_REACHED';

export type ApparatusComponentId =
  | 'mercury_flask'
  | 'glass_tube'
  | 'finger_stopper'
  | 'mercury_reservoir';

export type DropZoneId =
  | 'tube_opening'
  | 'tube_body'
  | 'reservoir_surface'
  | 'bench_area';

export interface ObservationRecord {
  id: string;
  testNumber: number;
  pressureHPa: number;
  pressurePa: number;
  heightCm: number;
  prediction?: 'decrease' | 'same' | 'increase';
  isCorrect?: boolean;
  notes: string;
  timestamp: string;
}

export type WeatherScenarioId = 'standard' | 'gradual_fall' | 'rapid_fall' | 'gradual_rise';

export interface WeatherScenario {
  id: WeatherScenarioId;
  name: string;
  description: string;
  currentPressureHPa: number;
  trendDescription: string;
  expectedWeather: 'clear' | 'stable' | 'rain' | 'storm';
  historyPoints: Array<{ time: string; pressureHPa: number; heightCm: number }>;
  educationalExplanation: string;
}

export interface ChallengeItem {
  id: number;
  scenarioTitle: string;
  timeframe: string;
  contextNarrative: string;
  dataPoints: Array<{
    time: string;
    pressureHPa: number;
    heightCm: number;
  }>;
  correctPressureTrend: 'rapid_fall' | 'slow_fall' | 'slow_rise' | 'stable';
  correctMercuryTrend: 'falling' | 'rising' | 'constant';
  correctWeatherForecast: 'storm' | 'rain' | 'clear' | 'fair';
  explanationBangla: string;
  hintBangla: string;
}

export interface MeasurementEvaluation {
  studentValueCm: number;
  actualValueCm: number;
  absoluteErrorCm: number;
  percentError: number;
  isAcceptable: boolean;
  grade: 'excellent' | 'good' | 'fair' | 'inaccurate';
  feedbackBangla: string;
}

export type CameraPreset = 'default' | 'closeup' | 'reservoir' | 'scale' | 'vacuum';
