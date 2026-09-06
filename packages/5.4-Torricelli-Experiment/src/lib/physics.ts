import { MeasurementEvaluation } from './types';

// Fundamental Physics Constants (NCTB Class 9-10 Standard)
export const DENSITY_MERCURY_KG_M3 = 13600; // ρ (kg/m³)
export const GRAVITATIONAL_ACCELERATION_MS2 = 9.8; // g (m/s²)
export const STANDARD_ATMOSPHERIC_PRESSURE_PA = 101325; // 1 atm = 101325 Pa = 1013.25 hPa
export const STANDARD_ATMOSPHERIC_PRESSURE_HPA = 1013.25;

// Pressure limits for simulation
export const MIN_PRESSURE_HPA = 950;
export const MAX_PRESSURE_HPA = 1050;

/**
 * Calculates height of mercury column in meters from pressure in Pa
 * Formula: h = P / (ρ * g)
 */
export function calculateHeightMeters(pressurePa: number): number {
  return pressurePa / (DENSITY_MERCURY_KG_M3 * GRAVITATIONAL_ACCELERATION_MS2);
}

/**
 * Calculates height of mercury column in centimeters from pressure in hPa
 */
export function calculateHeightCmFromHPa(pressureHPa: number): number {
  const pressurePa = pressureHPa * 100;
  const heightM = calculateHeightMeters(pressurePa);
  return heightM * 100;
}

/**
 * Calculates atmospheric pressure in Pa from mercury height in centimeters
 * Formula: P = ρ * g * (h / 100)
 */
export function calculatePressurePaFromHeightCm(heightCm: number): number {
  const heightM = heightCm / 100;
  return DENSITY_MERCURY_KG_M3 * GRAVITATIONAL_ACCELERATION_MS2 * heightM;
}

/**
 * Calculates atmospheric pressure in hPa from mercury height in centimeters
 */
export function calculatePressureHPaFromHeightCm(heightCm: number): number {
  return calculatePressurePaFromHeightCm(heightCm) / 100;
}

/**
 * Converts English digits (0-9) and decimal points to standard Bengali Unicode digits
 */
export function toBanglaNumber(value: number | string, decimals: number = 2): string {
  if (value === undefined || value === null || (typeof value === 'number' && isNaN(value))) {
    return '০';
  }

  let str: string;
  if (typeof value === 'number') {
    str = value.toFixed(decimals);
    // Remove trailing zeros if fractional part has unnecessary zeros, except if 0 requested
    if (decimals > 0 && str.includes('.')) {
      str = str.replace(/\.?0+$/, '');
    }
  } else {
    str = String(value);
  }

  const banglaDigits: Record<string, string> = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    '.': '.',
    '-': '-',
  };

  return str
    .split('')
    .map((char) => banglaDigits[char] || char)
    .join('');
}

/**
 * Evaluates student's manual measurement of the mercury column height
 */
export function evaluateMeasurement(
  studentValueCm: number,
  actualValueCm: number
): MeasurementEvaluation {
  const absoluteErrorCm = Math.abs(studentValueCm - actualValueCm);
  const percentError = (absoluteErrorCm / actualValueCm) * 100;

  let isAcceptable = false;
  let grade: 'excellent' | 'good' | 'fair' | 'inaccurate' = 'inaccurate';
  let feedbackBangla = '';

  if (absoluteErrorCm <= 0.3) {
    isAcceptable = true;
    grade = 'excellent';
    feedbackBangla = `চমৎকার! আপনার পরিমাপ (${toBanglaNumber(studentValueCm, 1)} cm) অত্যন্ত নিখুঁত হয়েছে। প্রকৃত মান ছিল ${toBanglaNumber(actualValueCm, 2)} cm।`;
  } else if (absoluteErrorCm <= 0.8) {
    isAcceptable = true;
    grade = 'good';
    feedbackBangla = `বেশ ভালো! আপনার পরিমাপ (${toBanglaNumber(studentValueCm, 1)} cm) প্রকৃত মানের (${toBanglaNumber(actualValueCm, 2)} cm) খুবই কাছাকাছি। ত্রুটি মাত্র ${toBanglaNumber(percentError, 1)}%।`;
  } else if (absoluteErrorCm <= 1.5) {
    isAcceptable = true;
    grade = 'fair';
    feedbackBangla = `পরিমাপ গ্রহণযোগ্য (${toBanglaNumber(studentValueCm, 1)} cm), তবে স্কেলটি আরেকটু মনোযোগ দিয়ে পর্যবেক্ষণ করুন। প্রকৃত মান: ${toBanglaNumber(actualValueCm, 2)} cm।`;
  } else {
    isAcceptable = false;
    grade = 'inaccurate';
    feedbackBangla = `পরিমাপে ত্রুটি বেশি (${toBanglaNumber(studentValueCm, 1)} cm)। পাত্রের পারদের মুক্ত তল (০ সেমি) থেকে নলের ওপরের পারদের মেনিস্কাস পর্যন্ত লক্ষ্য করুন। প্রকৃত মান: ${toBanglaNumber(actualValueCm, 2)} cm।`;
  }

  return {
    studentValueCm,
    actualValueCm,
    absoluteErrorCm,
    percentError,
    isAcceptable,
    grade,
    feedbackBangla,
  };
}

/**
 * Weather scenarios for Tab 4 with dynamically calculated mercury heights
 */
export function getGeneratedWeatherScenarios() {
  return [
    {
      id: 'standard' as const,
      name: 'স্বাভাবিক ও স্থিতিশীল বায়ুচাপ',
      description: 'বায়ুমণ্ডলীয় চাপ স্বাভাবিক ও স্থির রয়েছে।',
      currentPressureHPa: 1013.25,
      trendDescription: 'চাপ অপরিবর্তিত (১০১৩ hPa-এর কাছাকাছি)',
      expectedWeather: 'stable' as const,
      historyPoints: [
        { time: '০৬:০০', pressureHPa: 1013.0, heightCm: calculateHeightCmFromHPa(1013.0) },
        { time: '০৯:০০', pressureHPa: 1013.3, heightCm: calculateHeightCmFromHPa(1013.3) },
        { time: '১২:০০', pressureHPa: 1013.5, heightCm: calculateHeightCmFromHPa(1013.5) },
        { time: '১৫:০০', pressureHPa: 1013.2, heightCm: calculateHeightCmFromHPa(1013.2) },
        { time: '১৮:০০', pressureHPa: 1013.25, heightCm: calculateHeightCmFromHPa(1013.25) },
      ],
      educationalExplanation:
        'ব্যারোমিটারের পারদের উচ্চতা যখন স্বাভাবিক (প্রায় ৭৬ সেমি) ও অপরিবর্তিত থাকে, তখন আবহাওয়া শান্ত ও স্থিতিশীল থাকার ইঙ্গিত দেয়।',
    },
    {
      id: 'gradual_fall' as const,
      name: 'ধীরে ধীরে চাপ হ্রাস',
      description: 'গত কয়েক ঘণ্টায় বায়ুচাপ ক্রমান্বয়ে কমছে।',
      currentPressureHPa: 1003.0,
      trendDescription: 'ধীরে ধীরে নিম্নমুখী (১০১৪ hPa থেকে ১০০৩ hPa)',
      expectedWeather: 'rain' as const,
      historyPoints: [
        { time: '০৬:০০', pressureHPa: 1014.0, heightCm: calculateHeightCmFromHPa(1014.0) },
        { time: '০৯:০০', pressureHPa: 1011.5, heightCm: calculateHeightCmFromHPa(1011.5) },
        { time: '১২:০০', pressureHPa: 1008.0, heightCm: calculateHeightCmFromHPa(1008.0) },
        { time: '১৫:০০', pressureHPa: 1005.5, heightCm: calculateHeightCmFromHPa(1005.5) },
        { time: '১৮:০০', pressureHPa: 1003.0, heightCm: calculateHeightCmFromHPa(1003.0) },
      ],
      educationalExplanation:
        'ব্যারোমিটারের পারদস্তম্ভ ধীরে ধীরে নিচে নামলে তা নির্দেশ করে বায়ুমণ্ডলে জলীয়বাষ্পের উপস্থিতি বাড়ছে অথবা আশপাশে হালকা নিম্নচাপ তৈরি হচ্ছে। এর ফলে আকাশ মেঘলা হওয়া এবং বৃষ্টির সম্ভাবনা থাকে।',
    },
    {
      id: 'rapid_fall' as const,
      name: 'আকস্মিক ও দ্রুত চাপ হ্রাস',
      description: 'স্বল্প সময়ে বায়ুচাপ অতি দ্রুত নিচে নেমে গেছে।',
      currentPressureHPa: 978.0,
      trendDescription: 'তীব্র নিম্নমুখী পতন (১০১২ hPa থেকে ৯৭৮ hPa)',
      expectedWeather: 'storm' as const,
      historyPoints: [
        { time: '০৬:০০', pressureHPa: 1012.0, heightCm: calculateHeightCmFromHPa(1012.0) },
        { time: '০৯:০০', pressureHPa: 1006.0, heightCm: calculateHeightCmFromHPa(1006.0) },
        { time: '১২:০০', pressureHPa: 996.0, heightCm: calculateHeightCmFromHPa(996.0) },
        { time: '১৫:০০', pressureHPa: 986.0, heightCm: calculateHeightCmFromHPa(986.0) },
        { time: '১৮:০০', pressureHPa: 978.0, heightCm: calculateHeightCmFromHPa(978.0) },
      ],
      educationalExplanation:
        'ব্যারোমিটারের পারদের উচ্চতা হঠাৎ খুব দ্রুত হ্রাস পাওয়া একটি গভীর নিম্নচাপ বা ঘূর্ণিঝড়ের সুস্পষ্ট লক্ষণ। পার্শ্ববর্তী উচ্চচাপ অঞ্চল থেকে তীব্র বেগে বাতাস এই নিম্নচাপ কেন্দ্রের দিকে ধেয়ে আসায় ঝড় বা কালবৈশাখীর সৃষ্টি হয়।',
    },
    {
      id: 'gradual_rise' as const,
      name: 'ধীরে ধীরে চাপ বৃদ্ধি',
      description: 'বায়ুচাপ ক্রমান্বয়ে বেড়ে স্বাভাবিকের চেয়ে বেশি হচ্ছে।',
      currentPressureHPa: 1024.0,
      trendDescription: 'ধীরে ধীরে ঊর্ধ্বমুখী (১০০৮ hPa থেকে ১০২৪ hPa)',
      expectedWeather: 'clear' as const,
      historyPoints: [
        { time: '০৬:০০', pressureHPa: 1008.0, heightCm: calculateHeightCmFromHPa(1008.0) },
        { time: '০৯:০০', pressureHPa: 1012.0, heightCm: calculateHeightCmFromHPa(1012.0) },
        { time: '১২:০০', pressureHPa: 1016.5, heightCm: calculateHeightCmFromHPa(1016.5) },
        { time: '১৫:০০', pressureHPa: 1020.0, heightCm: calculateHeightCmFromHPa(1020.0) },
        { time: '১৮:০০', pressureHPa: 1024.0, heightCm: calculateHeightCmFromHPa(1024.0) },
      ],
      educationalExplanation:
        'ব্যারোমিটারের পারদস্তম্ভ ধীরে ধীরে বৃদ্ধি পেয়ে উচ্চচাপ সৃষ্টি করলে তা আর্দ্র বাতাসকে দূরে সরিয়ে দেয়। এর ফলে আকাশ পরিষ্কার ও আবহাওয়া শুষ্ক এবং মনোরম থাকার পূর্বাভাস মেলে।',
    },
  ];
}

/**
 * Challenge Mode Data Sets with dynamic physics calculations
 */
export function getChallengeScenarios() {
  return [
    {
      id: 1,
      scenarioTitle: 'কেস স্টাডি ১: চট্টগ্রাম উপকূলীয় আবহাওয়া পর্যবেক্ষণ',
      timeframe: 'সকাল ০৬:০০ থেকে সন্ধ্যা ০৬:০০',
      contextNarrative:
        'চট্টগ্রাম আবহাওয়া পর্যবেক্ষণ কেন্দ্রে অবস্থিত ব্যারোমিটারের পারদের উচ্চতা প্রতি ৩ ঘণ্টা পরপর রেকর্ড করা হলো। উপাত্ত বিশ্লেষণ করে সম্ভাব্য আবহাওয়া পরিবর্তন শনাক্ত করুন।',
      dataPoints: [
        { time: '০৬:০০', pressureHPa: 1016.0, heightCm: calculateHeightCmFromHPa(1016.0) },
        { time: '০৯:০০', pressureHPa: 1010.0, heightCm: calculateHeightCmFromHPa(1010.0) },
        { time: '১২:০০', pressureHPa: 998.0, heightCm: calculateHeightCmFromHPa(998.0) },
        { time: '১৫:০০', pressureHPa: 984.0, heightCm: calculateHeightCmFromHPa(984.0) },
        { time: '১৮:০০', pressureHPa: 972.0, heightCm: calculateHeightCmFromHPa(972.0) },
      ],
      correctPressureTrend: 'rapid_fall' as const,
      correctMercuryTrend: 'falling' as const,
      correctWeatherForecast: 'storm' as const,
      explanationBangla:
        '১২ ঘণ্টায় বায়ুচাপ ১০১৬ hPa থেকে ৯৭২ hPa-এ অর্থাৎ ৪৪ hPa নিচে নেমে গেছে (পারদস্তম্ভ ৭৬.২ সেমি থেকে ৭২.৯ সেমিতে নেমেছে)। এত দ্রুত ও তীব্র পতন গভীর নিম্নচাপ বা তীব্র সামুদ্রিক ঘূর্ণিঝড়ের নিশ্চিত পূর্বলক্ষণ।',
      hintBangla:
        'বায়ুচাপের পরিবর্তন কি খুব ধীর নাকি বেশ আকস্মিক ও বড়? পারদের উচ্চতা কতটা দ্রুত কমেছে তা লক্ষ্য করুন।',
    },
    {
      id: 2,
      scenarioTitle: 'কেস স্টাডি ২: রাজশাহীতে হেমন্তের সকালের রিডিং',
      timeframe: 'সকাল ০৮:০০ থেকে বিকাল ০৪:০০',
      contextNarrative:
        'রাজশাহীতে দিনব্যাপী পারদ ব্যারোমিটারের রিডিং নেওয়া হলো। দেখুন তো এই ধারা দেখে আপনি কী অনুমান করতে পারেন?',
      dataPoints: [
        { time: '০৮:০০', pressureHPa: 1014.0, heightCm: calculateHeightCmFromHPa(1014.0) },
        { time: '১০:০০', pressureHPa: 1017.0, heightCm: calculateHeightCmFromHPa(1017.0) },
        { time: '১২:০০', pressureHPa: 1020.5, heightCm: calculateHeightCmFromHPa(1020.5) },
        { time: '১৪:০০', pressureHPa: 1023.0, heightCm: calculateHeightCmFromHPa(1023.0) },
        { time: '১৬:০০', pressureHPa: 1025.0, heightCm: calculateHeightCmFromHPa(1025.0) },
      ],
      correctPressureTrend: 'slow_rise' as const,
      correctMercuryTrend: 'rising' as const,
      correctWeatherForecast: 'clear' as const,
      explanationBangla:
        'বায়ুচাপ ক্রমান্বয়ে ১০১৪ hPa থেকে বেড়ে ১০২৫ hPa হয়েছে (পারদের স্তম্ভ ৭৬.১ সেমি থেকে বেড়ে ৭৬.৯ সেমি হয়েছে)। চাপ ধীরে ধীরে বৃদ্ধি পাওয়া পরিষ্কার আকাশ ও শুষ্ক রৌদ্রোজ্জ্বল আবহাওয়ার ইঙ্গিত।',
      hintBangla:
        'চাপ বাড়লে পারদ স্তম্ভের কী ঘটে? উচ্চচাপ সাধারণত মেঘ দূর করে রোদ আনে।',
    },
    {
      id: 3,
      scenarioTitle: 'কেস স্টাডি ৩: বর্ষার শুরুতে সিলেটের হাওর অঞ্চল',
      timeframe: 'সকাল ০৯:০০ থেকে রাত ০৯:০০',
      contextNarrative:
        'সিলেটের একটি কৃষি আবহাওয়া কেন্দ্রে ব্যারোমিটার রিডিং পর্যবেক্ষণ করা হচ্ছে।',
      dataPoints: [
        { time: '০৯:০০', pressureHPa: 1012.0, heightCm: calculateHeightCmFromHPa(1012.0) },
        { time: '১২:০০', pressureHPa: 1009.0, heightCm: calculateHeightCmFromHPa(1009.0) },
        { time: '১৫:০০', pressureHPa: 1006.5, heightCm: calculateHeightCmFromHPa(1006.5) },
        { time: '১৮:০০', pressureHPa: 1004.0, heightCm: calculateHeightCmFromHPa(1004.0) },
        { time: '২১:০০', pressureHPa: 1002.0, heightCm: calculateHeightCmFromHPa(1002.0) },
      ],
      correctPressureTrend: 'slow_fall' as const,
      correctMercuryTrend: 'falling' as const,
      correctWeatherForecast: 'rain' as const,
      explanationBangla:
        'বায়ুচাপ ধীরে ধীরে হ্রাস পেয়ে ১০১২ hPa থেকে ১০০২ hPa-এ নেমেছে (পারদস্তম্ভ ৭৬.০ সেমি থেকে ৭৫.২ সেমি হয়েছে)। এটি বায়ুমণ্ডলে জলীয়বাষ্প বৃদ্ধি ও মেঘলা/বৃষ্টিবহুল আবহাওয়ার পূর্বলক্ষণ।',
      hintBangla:
        'চাপ কমছে ঠিকই, কিন্তু এটি কি ঘূর্ণিঝড়ের মতো আকস্মিক নাকি বৃষ্টি আসার মতো মৃদু?',
    },
  ];
}
