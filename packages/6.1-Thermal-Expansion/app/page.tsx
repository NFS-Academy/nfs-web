"use client";

import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useMotionValue, animate, useMotionValueEvent } from "motion/react";
import {
  Play,
  FastForward,
  RotateCcw,
  Thermometer,
  BoxSelect,
  Settings2,
  Activity,
  Info,
} from "lucide-react";

import {
  MATERIALS,
  MaterialId,
  INITIAL_TEMP,
  MAX_TEMP,
  BASE_LENGTH,
} from "@/lib/physics";
import { MacroView } from "@/components/simulation/MacroView";
import { MicroView } from "@/components/simulation/MicroView";
import { GraphPanel } from "@/components/simulation/GraphPanel";
import { RailwayView } from "@/components/simulation/RailwayView";
import { MultiMaterialView } from "@/components/simulation/MultiMaterialView";

type LabModule =
  "fundamental" | "multimaterial" | "railway" | "gallery" | "summary";

export default function ThermalExpansionSimulation() {
  const [labModule, setLabModule] = useState<LabModule>("fundamental");
  const [railwayHasGap, setRailwayHasGap] = useState(true);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [materialId, setMaterialId] = useState<MaterialId>("iron");

  const [targetTemp, setTargetTemp] = useState<number>(INITIAL_TEMP);
  const [uiTemp, setUiTemp] = useState<number>(INITIAL_TEMP);
  const [heatingRate, setHeatingRate] = useState<number>(50); // deg/sec
  const [isXRay, setIsXRay] = useState(false);
  const [cameraMode, setCameraMode] = useState<"split" | "rod" | "atomic">(
    "split",
  );

  const currentTemp = useMotionValue(INITIAL_TEMP);
  const [history, setHistory] = useState<{ temp: number; expansion: number }[]>(
    [],
  );

  const material = MATERIALS[materialId];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrediction(null);
  }, [labModule, railwayHasGap]);

  // Animate temperature change
  useEffect(() => {
    const animation = animate(currentTemp, targetTemp, {
      duration: Math.abs(targetTemp - currentTemp.get()) / heatingRate,
      ease: "linear",
    });
    return () => animation.stop();
  }, [targetTemp, heatingRate, currentTemp]);

  // Update UI and History throttled
  useMotionValueEvent(currentTemp, "change", (latest) => {
    setUiTemp(latest);

    // Add to history occasionally (e.g. every 10 degrees) to avoid huge arrays
    setHistory((prev) => {
      if (prev.length === 0)
        return [{ temp: latest, expansion: calculateExpansion(latest) }];
      const last = prev[prev.length - 1];
      if (
        Math.abs(latest - last.temp) > 5 ||
        Math.abs(latest - targetTemp) < 0.1
      ) {
        return [
          ...prev.slice(-100),
          { temp: latest, expansion: calculateExpansion(latest) },
        ];
      }
      return prev;
    });
  });

  // Also clear history when material changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory([]);
  }, [materialId]);

  const calculateExpansion = (temp: number) => {
    return material.alpha * BASE_LENGTH * (temp - INITIAL_TEMP);
  };

  const handlePreset = (temp: number) => {
    setTargetTemp(temp);
  };

  const currentExpansion = calculateExpansion(uiTemp);
  const currentLength = BASE_LENGTH + currentExpansion;
  const expansionPercentage = (currentExpansion / BASE_LENGTH) * 100;

  // Base atomic spacing assumed to be around 0.3 nm, let's just make up a visual number for the UI based on expansion
  const atomicDistance = 0.3 * (1 + material.alpha * (uiTemp - INITIAL_TEMP));

  return (
    <div className="w-full min-h-screen bg-[#0a0a0c] text-white flex flex-col overflow-hidden font-sans p-4 select-none">
      {/* Header */}
      <header className="flex-none flex justify-between items-center mb-4 pb-4 border-b border-white/10 z-10 relative">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-600 rounded flex items-center justify-center shadow-lg shadow-orange-600/20">
            <span className="text-xl font-bold italic text-white">Φ</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase text-orange-500">
              Physics Simulation Lab
            </h1>
            <p className="text-xs text-white/50">
              NCTB Physics: তাপীয় প্রসারণ (Thermal Expansion)
            </p>
          </div>
        </div>

        <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10 overflow-x-auto">
          {(
            [
              "fundamental",
              "multimaterial",
              "railway",
              "gallery",
              "summary",
            ] as LabModule[]
          ).map((m) => (
            <button
              key={m}
              onClick={() => setLabModule(m)}
              className={`px-3 py-1.5 text-[10px] uppercase font-bold rounded transition-colors whitespace-nowrap ${
                labModule === m
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/50 hover:bg-white/5"
              }`}
            >
              {m === "fundamental"
                ? "প্রাথমিক ল্যাব"
                : m === "multimaterial"
                  ? "পদার্থ প্রতিযোগিতা"
                  : m === "railway"
                    ? "নিরাপদ রেললাইন"
                    : m === "gallery"
                      ? "প্রয়োগ"
                      : "শেখার সারসংক্ষেপ"}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row relative gap-4">
        {/* Left / Center 3D Views */}
        {/* Left / Center 3D Views */}
        {labModule === "fundamental" && (
          <div className="flex-1 flex flex-col md:flex-row relative gap-4">
            {/* Macro View (Rod) */}
            {(cameraMode === "split" || cameraMode === "rod") && (
              <div className="flex-1 relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-white/60 pointer-events-auto flex items-center gap-2">
                    <BoxSelect size={14} className="text-blue-400" />
                    মাইক্রোস্কোপিক ডায়াগ্রাম: ধাতব দণ্ড
                  </h2>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] rounded border border-blue-500/20 pointer-events-auto">
                    {material.name}
                  </span>
                </div>
                <div className="flex-1 relative">
                  <Canvas shadows camera={{ position: [2, 3, 8], fov: 45 }}>
                    <color attach="background" args={["transparent"]} />
                    <ambientLight intensity={0.5} />
                    <directionalLight
                      position={[10, 10, 10]}
                      intensity={1.5}
                      castShadow
                    />
                    <MacroView
                      currentTemp={currentTemp}
                      materialId={materialId}
                      isXRay={isXRay}
                    />
                    <OrbitControls
                      makeDefault
                      enablePan={true}
                      enableZoom={true}
                    />
                    <Environment preset="city" />
                  </Canvas>
                </div>
              </div>
            )}

            {/* Micro View (Atoms) */}
            {(cameraMode === "split" || cameraMode === "atomic") && (
              <div className="flex-[1.25] relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-white/60 italic underline underline-offset-8 decoration-orange-500 pointer-events-auto flex items-center gap-2">
                    <Settings2 size={14} className="text-orange-400" />
                    অণু দৃশ্য: গতিশীল কম্পন
                  </h2>
                  <div className="flex gap-2 pointer-events-auto">
                    <button
                      onClick={() => setIsXRay(!isXRay)}
                      className={`px-2 py-1 text-[9px] uppercase font-bold border rounded transition-colors ${isXRay ? "border-orange-500 bg-orange-500/20 text-white" : "border-white/20 text-white/60 hover:bg-white/5"}`}
                    >
                      X-Ray
                    </button>
                  </div>
                </div>
                <div className="flex-1 relative">
                  <Canvas shadows camera={{ position: [8, 8, 8], fov: 45 }}>
                    <color attach="background" args={["transparent"]} />
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                    <MicroView
                      currentTemp={currentTemp}
                      materialId={materialId}
                    />
                    <OrbitControls
                      makeDefault
                      enablePan={true}
                      enableZoom={true}
                    />
                    <Environment preset="night" />
                  </Canvas>
                </div>
              </div>
            )}
          </div>
        )}

        {labModule === "multimaterial" && (
          <div className="flex-1 relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white/60 pointer-events-auto flex items-center gap-2">
                <BoxSelect size={14} className="text-blue-400" />
                Multi-Material Race
              </h2>
              {!prediction && labModule === "multimaterial" && (
                <div className="absolute top-12 left-0 p-4 bg-black/80 rounded-xl border border-blue-500/50 pointer-events-auto z-50">
                  <h3 className="font-bold text-orange-400 mb-2">
                    পূর্বানুমান: কোন দণ্ডটি সবচেয়ে বেশি প্রসারিত হবে?
                  </h3>
                  <div className="flex gap-2">
                    {["iron", "copper", "aluminum", "brass"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setPrediction(m)}
                        className="px-3 py-1.5 bg-white/10 rounded uppercase text-xs font-bold hover:bg-orange-500/20"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {prediction && uiTemp > 100 && labModule === "multimaterial" && (
                <div className="absolute top-12 left-0 p-4 bg-black/80 rounded-xl border border-green-500/50 pointer-events-auto z-50">
                  <h3 className="font-bold text-green-400 mb-2">ফলাফল</h3>
                  <p className="text-sm">
                    আপনার পূর্বানুমান: {prediction === 'iron' ? 'লোহা' : prediction === 'copper' ? 'তামা' : prediction === 'aluminium' ? 'অ্যালুমিনিয়াম' : 'পিতল'}। অ্যালুমিনিয়াম এর প্রসারণ সহগ সবচেয়ে বেশি!
                  </p>
                  <button
                    onClick={() => {
                      setPrediction(null);
                      setTargetTemp(20);
                    }}
                    className="mt-2 px-3 py-1 bg-white/10 rounded uppercase text-xs font-bold"
                  >
                    আবার চেষ্টা করুন
                  </button>
                </div>
              )}
            </div>
            <div className="flex-1 relative">
              <Canvas shadows camera={{ position: [3, 4, 10], fov: 45 }}>
                <color attach="background" args={["transparent"]} />
                <ambientLight intensity={0.5} />
                <directionalLight
                  position={[10, 10, 10]}
                  intensity={1.5}
                  castShadow
                />
                <MultiMaterialView currentTemp={currentTemp} />
                <OrbitControls makeDefault enablePan={true} enableZoom={true} />
                <Environment preset="city" />
              </Canvas>
            </div>
          </div>
        )}

        {labModule === "railway" && (
          <div className="flex-1 relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white/60 pointer-events-auto flex items-center gap-2">
                <Activity size={14} className="text-orange-400" />
                Railway Buckling Simulation
              </h2>
              {!prediction && labModule === "railway" && (
                <div className="absolute top-12 right-0 p-4 bg-black/80 rounded-xl border border-blue-500/50 pointer-events-auto z-50">
                  <h3 className="font-bold text-orange-400 mb-2">পূর্বানুমান:</h3>
                  <p className="text-sm mb-2 text-white/80">
                    রেললাইনটি কি নিরাপদ থাকবে{" "}
                    {railwayHasGap
                      ? "প্রসারণ ফাঁক সহ"
                      : "প্রসারণ ফাঁক ছাড়া"}
                    ?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPrediction("safe")}
                      className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded uppercase text-xs font-bold border border-green-500/50 hover:bg-green-500/40"
                    >
                      Yes, it&apos;s safe
                    </button>
                    <button
                      onClick={() => setPrediction("unsafe")}
                      className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded uppercase text-xs font-bold border border-red-500/50 hover:bg-red-500/40"
                    >
                      No, it will buckle
                    </button>
                  </div>
                </div>
              )}
              {prediction && uiTemp > 90 && labModule === "railway" && (
                <div className="absolute top-12 right-0 p-4 bg-black/80 rounded-xl border border-white/20 pointer-events-auto z-50 max-w-xs">
                  <h3 className="font-bold text-white mb-2">ফলাফল</h3>
                  <p className="text-sm text-white/80">
                    আপনার পূর্বানুমান: {prediction === 'safe' ? 'নিরাপদ' : 'অনিরাপদ'}।<br />
                    {railwayHasGap
                      ? "ফাঁক থাকলে লাইন নিরাপদে প্রসারিত হতে পারে!"
                      : "ফাঁক না থাকায় তাপীয় চাপে (stress) লাইনটি বেঁকে গেছে!"}
                  </p>
                  <button
                    onClick={() => {
                      setPrediction(null);
                      setTargetTemp(20);
                    }}
                    className="mt-2 px-3 py-1 bg-white/10 rounded uppercase text-xs font-bold text-white hover:bg-white/20"
                  >
                    Reset
                  </button>
                </div>
              )}
              {/* Stress indicator */}
              {!railwayHasGap && uiTemp > 100 && (
                <div className="px-3 py-1.5 bg-red-500/20 text-red-500 border border-red-500/50 rounded text-xs font-bold uppercase animate-pulse">
                  UNSAFE: Structural Buckling Detected
                </div>
              )}
            </div>
            <div className="flex-1 relative">
              <Canvas shadows camera={{ position: [5, 5, 12], fov: 45 }}>
                <color attach="background" args={["transparent"]} />
                <ambientLight intensity={0.5} />
                <directionalLight
                  position={[10, 10, 10]}
                  intensity={1.5}
                  castShadow
                />
                <RailwayView currentTemp={currentTemp} hasGap={railwayHasGap} />
                <OrbitControls
                  makeDefault
                  enablePan={true}
                  enableZoom={true}
                  target={[0, 0, 0]}
                />
                <Environment preset="sunset" />
              </Canvas>
            </div>
          </div>
        )}

        {labModule === "gallery" && (
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
              <h2 className="text-xl font-bold text-orange-400 mb-2 uppercase">
                Real-World Engineering
              </h2>
              <p className="text-sm text-white/60">
                How thermal expansion shapes modern infrastructure
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "রেললাইন",
                  desc: "গ্রীষ্মের তাপে বেঁকে যাওয়া রোধ করতে প্রসারণ ফাঁকের প্রয়োজন।",
                  icon: "🚂",
                },
                {
                  title: "ইস্পাতের সেতুর প্রসারণ জোড়",
                  desc: "চিরুনির মতো জোড় সেতুর ডেককে প্রসারিত এবং সংকুচিত হতে দেয়।",
                  icon: "🌉",
                },
                {
                  title: "পাইপলাইনের প্রসারণ লুপ",
                  desc: "U-আকৃতির লুপগুলি পাইপ না ভেঙে তাপীয় প্রসারণ শোষণ করে।",
                  icon: "🛢️",
                },
                {
                  title: "কংক্রিট রাস্তার প্রসারণ জোড়",
                  desc: "কংক্রিটের স্ল্যাব ফাটল রোধ করতে নমনীয় উপকরণ (যেমন বিটুমেন) দিয়ে ভরা হয়।",
                  icon: "🛣️",
                },
                {
                  title: "বিদ্যুৎ পরিবাহী তার",
                  desc: "প্রসারণের কারণে গ্রীষ্মকালে ঝুলে যায় এবং শীতকালে টানটান হয়।",
                  icon: "⚡",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-colors flex flex-col items-center text-center"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-sm mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {labModule === "summary" && (
          <div className="flex-1 flex flex-col items-center justify-center gap-8 bg-white/5 rounded-2xl border border-white/10 p-8 text-center">
            <h2 className="text-2xl font-bold text-orange-400 uppercase tracking-widest">
              Concept Summary
            </h2>
            <div className="flex flex-col gap-4 items-center">
              {[
                "তাপ প্রয়োগ করা হলো",
                "অণুর কম্পন বৃদ্ধি পেল",
                "অণুগুলোর গড় দূরত্ব বৃদ্ধি পেল",
                "বস্তুর প্রসারণ ঘটলো",
                "প্রকৌশল অবকাঠামোতে প্রসারণ ফাঁকের প্রয়োজন হয়",
              ].map((step, i, arr) => (
                <div key={step} className="flex flex-col items-center">
                  <div className="px-6 py-3 bg-zinc-900 border border-white/20 rounded-lg shadow-lg font-mono text-sm text-white">
                    {step}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="h-6 border-l-2 border-dashed border-orange-500/50 my-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right Sidebar - Controls & Stats */}
        {labModule !== "gallery" && labModule !== "summary" && (
          <div className="w-full md:w-[320px] flex flex-col overflow-y-auto z-10 gap-4">
            {labModule === "railway" && (
              <section className="bg-white/5 rounded-2xl border border-white/10 p-4 space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/60">
                  Expansion Gap Mode
                </h2>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setRailwayHasGap(true)}
                    className={`px-3 py-2 rounded text-xs font-bold uppercase border transition-colors ${railwayHasGap ? "bg-green-500/20 border-green-500/50 text-green-400" : "bg-white/5 border-white/10 text-white/50"}`}
                  >
                    Mode A: Gap Present (Safe)
                  </button>
                  <button
                    onClick={() => setRailwayHasGap(false)}
                    className={`px-3 py-2 rounded text-xs font-bold uppercase border transition-colors ${!railwayHasGap ? "bg-red-500/20 border-red-500/50 text-red-400" : "bg-white/5 border-white/10 text-white/50"}`}
                  >
                    Mode B: No Gap (Danger)
                  </button>
                </div>
              </section>
            )}

            
            {labModule === "fundamental" && (
              <section className="bg-white/5 rounded-2xl border border-white/10 p-4 space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/60">
                  Camera Mode
                </h2>
                <div className="flex gap-2">
                  {(["split", "rod", "atomic"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setCameraMode(mode)}
                      className={`flex-1 py-1.5 text-[10px] uppercase font-bold border rounded transition-colors ${cameraMode === mode ? "bg-orange-500/20 text-orange-400 border-orange-500/50" : "bg-black/40 text-white/40 border-white/10 hover:bg-white/5"}`}
                    >
                      {mode === "split" ? "Split View" : mode === "rod" ? "Rod View" : "Atomic View"}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {labModule === "fundamental" && (
              <>
                {/* Materials */}
                <section className="bg-white/5 rounded-2xl border border-white/10 p-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4">
                    Material Properties
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(MATERIALS) as MaterialId[]).map((key) => {
                      const mat = MATERIALS[key];
                      const isActive = materialId === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setMaterialId(key)}
                          className={`p-2 text-[10px] uppercase font-bold border rounded transition-colors flex flex-col items-start ${
                            isActive
                              ? "border-orange-500 bg-orange-500/20 text-white"
                              : "border-white/10 text-white/60 hover:bg-white/5"
                          }`}
                        >
                          <span>{mat.name}</span>
                          <span className="text-[9px] opacity-50 mt-1 normal-case">
                            α = {mat.alpha} /°C
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              </>
            )}

            {/* Temperature Control */}
            <section className="bg-white/5 rounded-2xl border border-white/10 p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/60 flex items-center gap-2">
                  <Thermometer size={14} className="text-red-400" />
                  Temperature
                </h2>
                <div className="text-lg font-mono text-red-500 font-bold">
                  {Math.round(uiTemp)}°C
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-blue-400">0°</span>
                <div className="flex-1 relative">
                  <input
                    type="range"
                    min={0}
                    max={MAX_TEMP}
                    step={1}
                    value={targetTemp}
                    onChange={(e) => setTargetTemp(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-orange-500"
                    style={{
                      background: `linear-gradient(to right, #3b82f6, #f97316, #ef4444)`,
                    }}
                  />
                </div>
                <span className="text-xs font-mono text-red-500">1000°</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handlePreset(0)}
                  className="px-1 py-1.5 bg-blue-900/40 text-blue-300 rounded border border-blue-500/30 text-[9px] uppercase font-bold hover:bg-blue-900/60 transition-colors"
                >
                  Ice (0°)
                </button>
                <button
                  onClick={() => handlePreset(20)}
                  className="px-1 py-1.5 bg-zinc-800 text-white rounded border border-white/10 text-[9px] uppercase font-bold hover:bg-zinc-700 transition-colors"
                >
                  Room (20°)
                </button>
                <button
                  onClick={() => handlePreset(100)}
                  className="px-1 py-1.5 bg-orange-900/40 text-orange-300 rounded border border-orange-500/30 text-[9px] uppercase font-bold hover:bg-orange-900/60 transition-colors"
                >
                  Boil (100°)
                </button>
                <button
                  onClick={() => handlePreset(1000)}
                  className="px-1 py-1.5 bg-red-900/40 text-red-300 rounded border border-red-500/30 text-[9px] uppercase font-bold hover:bg-red-900/60 transition-colors"
                >
                  Red Hot
                </button>
              </div>

              <div className="flex gap-2 pt-2 border-t border-white/10 mt-2">
                <button
                  onClick={() => setHeatingRate(20)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-[10px] uppercase font-bold transition-colors ${heatingRate === 20 ? "bg-white/10 text-white border border-white/20" : "text-white/40 hover:bg-white/5 border border-transparent"}`}
                >
                  <Play size={12} /> Slow
                </button>
                <button
                  onClick={() => setHeatingRate(200)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-[10px] uppercase font-bold transition-colors ${heatingRate === 200 ? "bg-white/10 text-white border border-white/20" : "text-white/40 hover:bg-white/5 border border-transparent"}`}
                >
                  <FastForward size={12} /> Fast
                </button>
                <button
                  onClick={() => {
                    setTargetTemp(INITIAL_TEMP);
                    setHeatingRate(1000);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-[10px] uppercase font-bold text-white/40 hover:bg-white/5 border border-transparent transition-colors"
                >
                  <RotateCcw size={12} /> Reset
                </button>
              </div>
            </section>

            {labModule !== "railway" && (
              <>
                {/* Formula Panel */}
                <section className="p-4 bg-black/40 rounded-xl border border-white/10 flex flex-col justify-center items-center">
                  <div className="flex justify-center items-center gap-3 text-lg font-mono tracking-widest">
                    <span
                      className={
                        currentExpansion > 0
                          ? "text-orange-400 font-bold"
                          : "text-white"
                      }
                    >
                      ΔL
                    </span>
                    <span className="text-white/40">=</span>
                    <span className="text-blue-400">α</span>
                    <span className="text-white/40">·</span>
                    <span className="text-white">L₀</span>
                    <span className="text-white/40">·</span>
                    <span
                      className={
                        Math.abs(uiTemp - INITIAL_TEMP) > 0
                          ? "text-red-500 font-bold underline"
                          : "text-white"
                      }
                    >
                      ΔT
                    </span>
                  </div>
                  <p className="text-center text-[9px] uppercase tracking-tighter text-white/40 mt-2">
                    দৈর্ঘ্য প্রসারণ সহগ: {material.alpha} / °C
                  </p>
                </section>

                {/* Live Measurements */}
                <section className="bg-white/5 rounded-2xl border border-white/10 p-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4">
                    তাৎক্ষণিক মান
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">
                        প্রাথমিক দৈর্ঘ্য (L₀)
                      </span>
                      <span className="text-sm font-mono text-white">
                        {BASE_LENGTH.toFixed(1)} mm
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">
                        বর্তমান দৈর্ঘ্য (L)
                      </span>
                      <span className="text-sm font-mono text-white">
                        {currentLength.toFixed(3)} mm
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">
                        তাপীয় প্রসারণ (ΔL)
                      </span>
                      <span className="text-sm font-mono text-orange-400">
                        +{currentExpansion.toFixed(3)} mm
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">
                        তাপীয় প্রসারণ %
                      </span>
                      <span className="text-sm font-mono text-blue-400">
                        +{expansionPercentage.toFixed(3)} %
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">
                        গড় পারমাণবিক ব্যবধান
                      </span>
                      <span className="text-sm font-mono text-white">
                        ~ {atomicDistance.toFixed(4)} nm
                      </span>
                    </div>
                  </div>
                </section>

                {/* Graph */}
                <div className="flex-1 flex flex-col relative h-48 md:h-auto min-h-[200px]">
                  <GraphPanel data={history} materialColor={material.color} />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
