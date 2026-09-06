'use client';

import React, { useState } from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import { toBanglaNumber } from '../../lib/physics';
import { WeatherSkyVisualizer } from '../weather/WeatherSkyVisualizer';
import { TimeSeriesPressureChart } from '../weather/TimeSeriesPressureChart';
import confetti from 'canvas-confetti';
import {
  CloudSun,
  Activity,
  Award,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Send,
  RotateCcw,
  Compass,
  ArrowRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

export const Tab4WeatherAndChallenge: React.FC = () => {
  const {
    activeWeatherScenario,
    activeWeatherScenarioId,
    setActiveWeatherScenarioId,
    weatherScenarios,
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
    pressureHPa,
    mercuryHeightCm,
  } = useExperiment();

  // Challenge Mode Local State
  const [challengePressureTrend, setChallengePressureTrend] = useState<string>('');
  const [challengeMercuryTrend, setChallengeMercuryTrend] = useState<string>('');
  const [challengeWeatherForecast, setChallengeWeatherForecast] = useState<string>('');

  const currentChallenge = challenges[currentChallengeIndex];
  const activeSubmission = challengeSubmissions[currentChallenge?.id];

  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challengePressureTrend || !challengeMercuryTrend || !challengeWeatherForecast) return;

    submitChallengeAnswer(currentChallenge.id, {
      pressureTrend: challengePressureTrend,
      mercuryTrend: challengeMercuryTrend,
      weatherForecast: challengeWeatherForecast,
    });

    // Celebrate if 100% correct
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const loadChallenge = (idx: number) => {
    setCurrentChallengeIndex(idx);
    const sub = challengeSubmissions[challenges[idx].id];
    if (sub) {
      setChallengePressureTrend(sub.pressureTrend);
      setChallengeMercuryTrend(sub.mercuryTrend);
      setChallengeWeatherForecast(sub.weatherForecast);
    } else {
      setChallengePressureTrend('');
      setChallengeMercuryTrend('');
      setChallengeWeatherForecast('');
    }
  };

  // Weather forecast choices
  const forecastChoices: Array<{
    id: 'clear' | 'stable' | 'rain' | 'storm';
    label: string;
    icon: string;
  }> = [
    { id: 'clear', label: 'পরিষ্কার ও শুষ্ক রোদ', icon: '☀️' },
    { id: 'stable', label: 'স্থিতিশীল / স্বাভাবিক', icon: '🌤️' },
    { id: 'rain', label: 'মেঘলা বা বৃষ্টির সম্ভাবনা', icon: '🌧️' },
    { id: 'storm', label: 'ঝড়ো আবহাওয়া বা কালবৈশাখীর আশঙ্কা', icon: '⛈️' },
  ];

  return (
    <div className="space-y-8">
      {/* SECTION 1: VIRTUAL WEATHER OBSERVATION STATION */}
      <div className="space-y-5">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-700/50 text-cyan-400 text-xs font-semibold mb-2">
                <CloudSun className="w-3.5 h-3.5" />
                আবহাওয়া বিজ্ঞান পর্যবেক্ষণ কেন্দ্র
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold text-slate-100 font-heading leading-tight">
                ব্যারোমিটার ও আবহাওয়ার পরিবর্তন পূর্বাভাস
              </h2>
              <p className="text-[18px] font-normal text-slate-300 mt-2 leading-relaxed">
                ব্যারোমিটারের পারদের উচ্চতা ও বায়ুচাপের পরিবর্তনের ধারা পর্যবেক্ষণ করে আগামী কয়েক ঘণ্টার আবহাওয়া অনুমান করুন।
              </p>
            </div>
          </div>

          {/* Scenario Selector Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-slate-400 self-center mr-1">পরিস্থিতি নির্বাচন:</span>
            {weatherScenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveWeatherScenarioId(sc.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  activeWeatherScenarioId === sc.id
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md font-bold'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {sc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Sky Visualizer Backdrop */}
        <WeatherSkyVisualizer
          weatherType={activeWeatherScenario.expectedWeather}
          pressureHPa={activeWeatherScenario.currentPressureHPa}
        />

        {/* Live Station Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
            <span className="text-xs text-slate-400 block mb-1">ব্যারোমিটার বায়ুচাপ</span>
            <span className="text-2xl font-bold font-mono text-cyan-400">
              {toBanglaNumber(activeWeatherScenario.currentPressureHPa, 1)}{' '}
              <span className="text-xs text-slate-400">hPa</span>
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              ধারা: {activeWeatherScenario.trendDescription}
            </span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
            <span className="text-xs text-slate-400 block mb-1">পারদস্তম্ভের বর্তমান উচ্চতা</span>
            <span className="text-2xl font-bold font-mono text-amber-400">
              {toBanglaNumber(mercuryHeightCm, 1)}{' '}
              <span className="text-xs text-slate-400">cm</span>
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              (P = ρgh দ্বারা গণনাকৃত)
            </span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
            <span className="text-xs text-slate-400 block mb-1">আবহাওয়া সংকেত</span>
            <span className="text-sm font-bold text-emerald-300 block mt-1">
              {activeWeatherScenario.expectedWeather === 'storm'
                ? '⚠️ ৪ নং স্থানীয় হুঁশিয়ারি সংকেত'
                : activeWeatherScenario.expectedWeather === 'rain'
                ? '🌧️ মেঘবৃষ্টির পূর্বাভাস'
                : activeWeatherScenario.expectedWeather === 'clear'
                ? '☀️ অনুকূল শুষ্ক আবহাওয়া'
                : '🌤️ স্বাভাবিক শান্ত আকাশ'}
            </span>
          </div>
        </div>

        {/* Time-Series Pressure History Chart */}
        <TimeSeriesPressureChart
          dataPoints={activeWeatherScenario.historyPoints}
          title={`গত ১২ ঘণ্টার বায়ুচাপের গতিপ্রকৃতি (${activeWeatherScenario.name})`}
        />

        {/* Weather Prediction Prompt for Current Scenario */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-slate-100">
              উপাত্ত দেখে পূর্বাভাস দিন: আগামী কয়েক ঘণ্টায় আবহাওয়ার কী পরিবর্তন হতে পারে?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {forecastChoices.map((c) => (
              <button
                key={c.id}
                onClick={() => setWeatherForecastAnswer(c.id)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border text-sm font-semibold transition text-left ${
                  weatherForecastAnswer === c.id
                    ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200 ring-2 ring-cyan-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="text-2xl">{c.icon}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={submitWeatherForecast}
            disabled={!weatherForecastAnswer}
            className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm shadow-lg transition-all ${
              !weatherForecastAnswer
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20 active:scale-98'
            }`}
          >
            <Send className="w-4 h-4" />
            পূর্বাভাস নিশ্চিত করুন
          </button>

          {/* Educational Feedback & NCTB Explanation */}
          {weatherForecastSubmitted && (
            <div
              className={`p-4 rounded-xl border animate-fadeIn space-y-2 ${
                weatherForecastAnswer === activeWeatherScenario.expectedWeather
                  ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-200'
                  : 'bg-amber-950/40 border-amber-600/60 text-amber-200'
              }`}
            >
              <div className="flex items-start gap-2">
                {weatherForecastAnswer === activeWeatherScenario.expectedWeather ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <div className="font-bold text-sm">
                    {weatherForecastAnswer === activeWeatherScenario.expectedWeather
                      ? 'সঠিক পূর্বাভাস!'
                      : 'আংশিক ভুল — বৈজ্ঞানিক কারণটি লক্ষ্য করুন:'}
                  </div>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                    {activeWeatherScenario.educationalExplanation}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                ⚠️ <strong className="text-slate-300">গুরুত্বপূর্ণ বৈজ্ঞানিক নোট:</strong> ব্যারোমিটারের পারদের উচ্চতা বা বায়ুচাপের পরিবর্তন আবহাওয়া পূর্বাভাসের একটি প্রধান সূচক, তবে এটি একমাত্র সূচক নয় (বায়ুর আর্দ্রতা, তাপমাত্রা ও বায়ুপ্রবাহও সাথে জড়িত)।
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: CHALLENGE MODE (Placed BELOW normal weather section) */}
      <div className="border-t-2 border-slate-800 pt-8 space-y-5">
        <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-800/50 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 text-xs font-bold mb-2">
                <Award className="w-3.5 h-3.5" />
                🧠 চ্যালেঞ্জ: আবহাওয়া অনুমান করুন
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold text-slate-100 font-heading leading-tight">
                কেস স্টাডি ভিত্তিক আবহাওয়া তথ্য বিশ্লেষণ চ্যালেঞ্জ
              </h3>
              <p className="text-[18px] font-normal text-slate-300 mt-2 leading-relaxed">
                ল্যাবরেটরি থেকে প্রাপ্ত ব্যারোমিটারের সময়ভিত্তিক উপাত্ত বিশ্লেষণ করে বায়ুচাপের ধারা, পারদস্তম্ভের পরিবর্তন ও আবহাওয়া নির্ধারণ করুন।
              </p>
            </div>

            <button
              onClick={resetChallenges}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 border border-slate-700 rounded-xl transition flex-shrink-0"
              title="সকল চ্যালেঞ্জ রিসেট"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              রিসেট
            </button>
          </div>

          {/* Challenge Selector Buttons */}
          <div className="flex gap-2 mt-4">
            {challenges.map((c, idx) => {
              const sub = challengeSubmissions[c.id];
              return (
                <button
                  key={c.id}
                  onClick={() => loadChallenge(idx)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    currentChallengeIndex === idx
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                      : sub?.isSubmitted
                      ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <span>চ্যালেঞ্জ {toBanglaNumber(idx + 1, 0)}</span>
                  {sub?.isSubmitted && (
                    <span className="text-[10px] bg-emerald-500/30 px-1.5 py-0.2 rounded font-mono">
                      {sub.score}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Challenge Form & Table */}
        {currentChallenge && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-purple-300 font-semibold mb-1">
                <span>{currentChallenge.scenarioTitle}</span>
                <span className="text-slate-400">সময়কাল: {currentChallenge.timeframe}</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                {currentChallenge.contextNarrative}
              </p>
            </div>

            {/* Generated Lab Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/70">
                    <th className="py-2 px-3 font-semibold">সময় (Time)</th>
                    <th className="py-2 px-3 font-semibold">বায়ুমণ্ডলীয় চাপ (<strong>P</strong>)</th>
                    <th className="py-2 px-3 font-semibold">
                      পারদের উচ্চতা (<strong>h</strong> = <strong>P</strong> / (<strong>ρg</strong>))
                    </th>
                    <th className="py-2 px-3 font-semibold text-right">আপেক্ষিক পরিবর্তন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-slate-300">
                  {currentChallenge.dataPoints.map((dp, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 font-mono">
                      <td className="py-2 px-3 font-bold text-slate-200">{dp.time}</td>
                      <td className="py-2 px-3 text-cyan-400">
                        {toBanglaNumber(dp.pressureHPa, 1)} hPa
                      </td>
                      <td className="py-2 px-3 font-bold text-amber-400">
                        {toBanglaNumber(dp.heightCm, 2)} cm
                      </td>
                      <td className="py-2 px-3 text-right text-slate-400 text-[11px]">
                        {i === 0
                          ? 'বেসলাইন'
                          : dp.pressureHPa > currentChallenge.dataPoints[i - 1].pressureHPa
                          ? '▲ বৃদ্ধি'
                          : '▼ হ্রাস'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Interactive Questions Form */}
            <form onSubmit={handleChallengeSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. Pressure Trend */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300">
                    ১. বায়ুচাপের পরিবর্তনের ধারা:
                  </label>
                  <select
                    value={challengePressureTrend}
                    onChange={(e) => setChallengePressureTrend(e.target.value)}
                    disabled={activeSubmission?.isSubmitted}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="">নির্বাচন করুন...</option>
                    <option value="rapid_fall">খুব দ্রুত ও তীব্র হ্রাস</option>
                    <option value="slow_fall">ধীরে ধীরে মৃদু হ্রাস</option>
                    <option value="slow_rise">ধীরে ধীরে বৃদ্ধি</option>
                    <option value="stable">প্রায় অপরিবর্তিত / স্থির</option>
                  </select>
                </div>

                {/* 2. Mercury Trend */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300">
                    ২. পারদস্তম্ভের পরিবর্তন:
                  </label>
                  <select
                    value={challengeMercuryTrend}
                    onChange={(e) => setChallengeMercuryTrend(e.target.value)}
                    disabled={activeSubmission?.isSubmitted}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="">নির্বাচন করুন...</option>
                    <option value="falling">নিচের দিকে নামছে 📉</option>
                    <option value="rising">ওপরের দিকে উঠছে 📈</option>
                    <option value="constant">স্থির আছে ➖</option>
                  </select>
                </div>

                {/* 3. Weather Forecast */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300">
                    ৩. সম্ভাব্য আবহাওয়া পূর্বাভাস:
                  </label>
                  <select
                    value={challengeWeatherForecast}
                    onChange={(e) => setChallengeWeatherForecast(e.target.value)}
                    disabled={activeSubmission?.isSubmitted}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="">নির্বাচন করুন...</option>
                    <option value="storm">তীব্র ঝড় / কালবৈশাখী ⛈️</option>
                    <option value="rain">মেঘলা আকাশ ও বৃষ্টি 🌧️</option>
                    <option value="clear">পরিষ্কার ও শুষ্ক রোদ ☀️</option>
                    <option value="fair">স্বাভাবিক শান্ত আবহাওয়া 🌤️</option>
                  </select>
                </div>
              </div>

              {!activeSubmission?.isSubmitted ? (
                <button
                  type="submit"
                  disabled={
                    !challengePressureTrend || !challengeMercuryTrend || !challengeWeatherForecast
                  }
                  className={`w-full py-3 px-6 rounded-xl font-bold text-sm shadow-lg transition flex items-center justify-center gap-2 ${
                    !challengePressureTrend || !challengeMercuryTrend || !challengeWeatherForecast
                      ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30 active:scale-98'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  উত্তর জমা দিন ও মূল্যায়ন দেখুন
                </button>
              ) : (
                /* Submission Evaluation & Detailed Explanation */
                <div className="space-y-4 animate-fadeIn">
                  <div
                    className={`p-4 rounded-xl border ${
                      activeSubmission.score === 100
                        ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                        : 'bg-amber-950/50 border-amber-500 text-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">
                        {activeSubmission.score === 100
                          ? '🌟 অসাধারণ! আপনার বিশ্লেষণ ১০০% নির্ভুল হয়েছে!'
                          : `প্রাপ্ত স্কোর: ${toBanglaNumber(activeSubmission.score, 0)}/১০০`}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          loadChallenge(
                            (currentChallengeIndex + 1) % challenges.length
                          )
                        }
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition"
                      >
                        পরবর্তী চ্যালেঞ্জ ➔
                      </button>
                    </div>
                    <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                      <strong>বৈজ্ঞানিক যৌক্তিকতা:</strong> {currentChallenge.explanationBangla}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
