'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimationFrame, AnimatePresence, MotionValue, animate } from 'motion/react';
import { Play, Pause, RotateCcw, Columns, Flame, Info, CheckCircle, ChevronDown, ChevronUp, X, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Types & Constants ---

type LiquidType = 'water' | 'alcohol' | 'mercury';

const LIQUID_PROPS = {
  water: {
    multiplier: 1,
    name: 'পানি',
    colorStops: ['#1e3a8a', '#3b82f6', '#2563eb', '#1e40af'],
    meniscus: 'rgba(30,58,138,0.7)',
    particleColor: `hsl(215, 70%, 50%)`
  },
  alcohol: {
    multiplier: 1.8,
    name: 'অ্যালকোহল',
    colorStops: ['#7f1d1d', '#ef4444', '#dc2626', '#991b1b'],
    meniscus: 'rgba(127,29,29,0.7)',
    particleColor: `hsl(0, 70%, 50%)`
  },
  mercury: {
    multiplier: 0.6,
    name: 'পারদ',
    colorStops: ['#334155', '#94a3b8', '#64748b', '#475569'],
    meniscus: 'rgba(71,85,105,0.7)',
    particleColor: `hsl(215, 10%, 50%)`
  }
};

// --- Sub-components ---

const Counter = ({ valueMotion, format }: { valueMotion: MotionValue<number>, format: (v: number) => string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useAnimationFrame(() => {
    if (ref.current) {
      ref.current.innerText = format(valueMotion.get());
    }
  });
  return <span ref={ref} />;
};

const Metric = ({ label, valueMotion, format, colorClass = "text-white", className }: any) => (
  <div className={cn("bg-slate-800/40 p-3 rounded-xl flex flex-col justify-between", className)}>
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-hind">{label}</span>
    <span className={cn("text-lg font-mono tracking-tighter", colorClass)}>
      <Counter valueMotion={valueMotion} format={format} />
    </span>
  </div>
);

const AnimatedHeatArrow = ({ path, color, direction = "forward" }: { path: string, color: string, direction?: "forward" | "reverse" }) => {
  return (
    <motion.path
      d={path}
      stroke={color}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="6 6"
      animate={{ strokeDashoffset: direction === 'forward' ? [12, 0] : [0, 12] }}
      transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
    />
  );
};

// --- Microscopic View (Canvas) ---

const MicroscopicView = ({ timeValue, liquidType }: { timeValue: MotionValue<number>, liquidType: LiquidType }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frameId: number;

    const width = 400;
    const height = 600;

    // Pre-calculate glass grid molecules
    const glassMols: { x: number, y: number, group: string }[] = [];
    for (let x = 30; x < 70; x += 15)
      for (let y = 150; y <= 470; y += 15) glassMols.push({ x, y, group: 'left' });
    for (let x = 330; x <= 370; x += 15)
      for (let y = 150; y <= 470; y += 15) glassMols.push({ x, y, group: 'right' });
    for (let x = 70; x < 330; x += 15)
      for (let y = 450; y <= 490; y += 15) glassMols.push({ x, y, group: 'bottom' });

    // Pre-calculate liquid molecules
    const liquidMols: { x: number, y: number, vx: number, vy: number }[] = [];
    for (let i = 0; i < 180; i++) {
      liquidMols.push({
        x: 70 + Math.random() * 260,
        y: 200 + Math.random() * 240,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      });
    }

    const render = () => {
      const t = timeValue.get();
      ctx.clearRect(0, 0, width, height);
      
      const lProps = LIQUID_PROPS[liquidType];

      // Dynamics mapping
      const maxRise = 140 * lProps.multiplier;
      const glassOffset = t <= 4 ? (t / 4) * 12 : 12;
      const liquidTop = t <= 4 ? 200 + (t / 4) * 40 : 240 - ((t - 4) / 11) * maxRise;
      const glassAmp = t <= 4 ? 1 + (t / 4) * 3 : 4;
      const liquidSpeed = t <= 4 ? 0.3 : 0.3 + ((t - 4) / 11) * 4.5;

      // Draw heat waves (if heating glass)
      if (t > 0 && t <= 4) {
        ctx.fillStyle = `rgba(249, 115, 22, ${Math.random() * 0.15})`;
        ctx.beginPath();
        ctx.moveTo(150, 490);
        ctx.lineTo(250, 490);
        ctx.lineTo(200, 450 + Math.random() * 20);
        ctx.fill();
      }

      // Draw Glass Molecules
      const gProgress = Math.min(t / 4, 1);
      ctx.fillStyle = `rgba(255, ${255 - gProgress * 80}, ${255 - gProgress * 130}, 0.9)`;

      glassMols.forEach(m => {
        let ox = 0, oy = 0;
        if (m.group === 'left') ox = -glassOffset;
        if (m.group === 'right') ox = glassOffset;
        if (m.group === 'bottom') oy = glassOffset;

        const vx = (Math.random() - 0.5) * glassAmp;
        const vy = (Math.random() - 0.5) * glassAmp;

        ctx.beginPath();
        ctx.arc(m.x + ox + vx, m.y + oy + vy, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and Draw Liquid Molecules
      const lw = 70 - glassOffset;
      const rw = 330 + glassOffset;
      const bw = 450 + glassOffset;

      // Draw faint background for liquid bounding box to look better
      ctx.fillStyle = 'rgba(30, 58, 138, 0.1)';
      ctx.fillRect(lw + 5, liquidTop + 5, (rw - 5) - (lw + 5), (bw - 5) - (liquidTop + 5));

      liquidMols.forEach(m => {
        m.x += m.vx * liquidSpeed;
        m.y += m.vy * liquidSpeed;

        if (m.x < lw + 8) { m.x = lw + 8; m.vx *= -1; }
        if (m.x > rw - 8) { m.x = rw - 8; m.vx *= -1; }
        if (m.y < liquidTop + 8) { m.y = liquidTop + 8; m.vy *= -1; }
        if (m.y > bw - 8) { m.y = bw - 8; m.vy *= -1; }

        ctx.fillStyle = lProps.particleColor;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      frameId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(frameId);
  }, [timeValue, liquidType]);

  return (
    <div className="relative w-full aspect-[2/3] max-w-[400px] bg-[#020617] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex-shrink-0">
      <canvas ref={canvasRef} width={400} height={600} className="w-full h-full" />
      <div className="absolute top-4 left-4 bg-slate-900/80 text-emerald-400 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border border-slate-700 shadow-sm z-10 font-hind">
        আণবিক গতি
      </div>
    </div>
  );
};

// --- Macroscopic View (SVG) ---

const MacroView = ({ timeValue, phase, liquidType }: { timeValue: MotionValue<number>, phase: string, liquidType: LiquidType }) => {
  const lProps = LIQUID_PROPS[liquidType];
  
  // SVG Coordinates mapped from time
  const glassScale = useTransform(timeValue, [0, 4, 15], [1, 1.08, 1.08]);
  const maxRise = 140 * lProps.multiplier;
  const liquidY = useTransform(timeValue, (t) => {
    if (t <= 4) return 200 + (t / 4) * 40;
    return 240 - ((t - 4) / 11) * maxRise;
  });
  const flameOpacity = useTransform(timeValue, [0, 0.5, 15], [0, 1, 1]);

  // Glow filters based on phase
  const glassFilter = useTransform(timeValue, (t) => {
    if (t > 0 && t <= 4.5) return 'drop-shadow(0 0 20px rgba(249,115,22,0.6))';
    return 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))';
  });

  const liquidFilter = useTransform(timeValue, (t) => {
    if (t > 4) return 'drop-shadow(0 0 20px rgba(59,130,246,0.5))';
    return 'none';
  });

  // Calculate dynamic meniscus and body paths based on liquidY
  const liquidPath = useTransform(liquidY, y => `M 120 ${y} L 120 336 A 70 70 0 1 0 180 336 L 180 ${y} Z`);

  return (
    <div className="relative w-full aspect-[2/3] max-w-[400px] bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-3xl border border-slate-800 shadow-2xl flex-shrink-0 overflow-hidden isolate">
      {/* Background Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-30 z-0">
        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#334155" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <svg viewBox="0 0 500 600" className="w-full h-full relative z-10">
        <defs>
          <linearGradient id="glassShine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="15%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="85%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.5)" />
          </linearGradient>
          <linearGradient id="liquidGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={lProps.colorStops[0]} />
            <stop offset="20%" stopColor={lProps.colorStops[1]} />
            <stop offset="80%" stopColor={lProps.colorStops[2]} />
            <stop offset="100%" stopColor={lProps.colorStops[3]} />
          </linearGradient>
        </defs>

        {/* Burner Base */}
        <g transform="translate(0, 10)">
          <rect x="110" y="480" width="80" height="20" fill="#334155" rx="6" />
          <rect x="135" y="465" width="30" height="15" fill="#64748b" />
          <path d="M 125 485 L 175 485" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Flame */}
        <g transform="translate(0, 10)">
          <motion.path
            d="M 150 420 Q 135 465 150 465 Q 165 465 150 420"
            fill="#f97316"
            style={{ opacity: flameOpacity }}
          />
          <motion.path
            d="M 150 435 Q 142 465 150 465 Q 158 465 150 435"
            fill="#fbbf24"
            style={{ opacity: flameOpacity }}
          />
        </g>

        {/* Heat Transfer Arrows */}
        <AnimatePresence>
          {phase === 'heating_glass' && (
            <motion.g key="heating_glass_arrows" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AnimatedHeatArrow path="M 115 470 Q 75 450 85 410" color="#f97316" />
              <AnimatedHeatArrow path="M 185 470 Q 225 450 215 410" color="#f97316" />
            </motion.g>
          )}
          {phase === 'heating_liquid' && (
            <motion.g key="heating_liquid_arrows" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AnimatedHeatArrow path="M 85 410 Q 115 430 125 390" color="#ef4444" />
              <AnimatedHeatArrow path="M 215 410 Q 185 430 175 390" color="#ef4444" />
            </motion.g>
          )}
          {phase === 'heating_glass' && (
            <motion.g key="heating_glass_level_arrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
               {/* Arrow indicating level falling */}
               <motion.path d="M 100 210 L 100 230 M 95 225 L 100 230 L 105 225" stroke="#2563eb" strokeWidth="2" fill="none" animate={{y: [0, 5, 0]}} transition={{repeat: Infinity, duration: 1}}/>
               
               {/* Arrows indicating bulb expansion */}
               <motion.path d="M 60 300 L 40 300 M 45 295 L 40 300 L 45 305" stroke="#f97316" strokeWidth="2" fill="none" animate={{x: [0, -5, 0], opacity: [0.3, 1, 0.3]}} transition={{repeat: Infinity, duration: 1}} />
               <motion.path d="M 240 300 L 260 300 M 255 295 L 260 300 L 255 305" stroke="#f97316" strokeWidth="2" fill="none" animate={{x: [0, 5, 0], opacity: [0.3, 1, 0.3]}} transition={{repeat: Infinity, duration: 1}} />
               <motion.path d="M 150 400 L 150 420 M 145 415 L 150 420 L 155 415" stroke="#f97316" strokeWidth="2" fill="none" animate={{y: [0, 5, 0], opacity: [0.3, 1, 0.3]}} transition={{repeat: Infinity, duration: 1}} />
            </motion.g>
          )}
          {phase === 'heating_liquid' && (
             <motion.g key="heating_liquid_level_arrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
               {/* Arrow indicating level rising */}
               <motion.path d="M 100 220 L 100 130 M 95 135 L 100 130 L 105 135" stroke="#ef4444" strokeWidth="2" fill="none" animate={{y: [0, -10, 0]}} transition={{repeat: Infinity, duration: 1}}/>
            </motion.g>
          )}
        </AnimatePresence>


        {/* Scalable Flask Group */}
        <motion.g style={{ scale: glassScale, originX: '150px', originY: '400px', filter: glassFilter }}>

          {/* Liquid Body */}
          <motion.path d={liquidPath} fill="url(#liquidGrad)" style={{ filter: liquidFilter }} />

          {/* Liquid Meniscus */}
          <motion.ellipse
            cx="150"
            cy={liquidY}
            rx="30"
            ry="6"
            fill={lProps.meniscus}
            style={{ filter: liquidFilter }}
          />

          {/* Glass Flask Body (Outline & Shine) */}
          <path
            d="M 120 -30 L 120 336 A 70 70 0 1 0 180 336 L 180 -30 Z"
            fill="url(#glassShine)"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="3"
          />
          <path
            d="M 120 -30 L 120 336 A 70 70 0 1 0 180 336 L 180 -30 Z"
            fill="none"
            stroke="rgba(100,116,139,0.3)"
            strokeWidth="5"
          />

          {/* Graduation Marks */}
          <g transform="translate(0, 0)">
            <line x1="120" y1="200" x2="135" y2="200" stroke="#fff" strokeWidth="2" />
            <text x="100" y="205" className="font-bold font-mono text-base fill-white">A</text>

            <line x1="120" y1="240" x2="135" y2="240" stroke="#60a5fa" strokeWidth="2" />
            <text x="100" y="245" className="font-bold font-mono text-base fill-blue-400">B</text>

            <line x1="120" y1={240 - maxRise} x2="135" y2={240 - maxRise} stroke="#fb923c" strokeWidth="2" />
            <text x="100" y={240 - maxRise + 5} className="font-bold font-mono text-base fill-orange-400">C</text>
          </g>

          {/* End Summary Braces inside scaled group to align perfectly */}
          <AnimatePresence>
            {phase === 'completed' && (
              <motion.g key="braces_summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.5, duration: 1 }}>
                
                {/* AB - Container Expansion */}
                <polyline points="190,200 200,200 200,240 190,240" fill="none" stroke="#60a5fa" strokeWidth="2" />
                <text x="210" y="224" fill="#60a5fa" fontSize="13" fontWeight="bold" className="font-hind">পাত্রের প্রসারণ (AB)</text>

                {/* AC - Apparent Expansion */}
                <polyline points={`190,${240 - maxRise} 200,${240 - maxRise} 200,200 190,200`} fill="none" stroke="#a78bfa" strokeWidth="2" />
                <text x="210" y={200 - (200 - (240 - maxRise))/2 + 5} fill="#a78bfa" fontSize="13" fontWeight="bold" className="font-hind">আপাত প্রসারণ (AC)</text>

                {/* BC - Real Expansion */}
                <polyline points={`330,${240 - maxRise} 340,${240 - maxRise} 340,240 330,240`} fill="none" stroke="#f87171" strokeWidth="2" />
                <text x="350" y={240 - maxRise / 2 + 5} fill="#f87171" fontSize="13" fontWeight="bold" className="font-hind">প্রকৃত প্রসারণ (BC)</text>
                
              </motion.g>
            )}
          </AnimatePresence>
        </motion.g>
      </svg>
      
      <div className="absolute top-4 left-4 bg-slate-900/80 text-indigo-400 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border border-slate-700 shadow-sm z-10 font-hind">
        আণুবীক্ষণিক দৃষ্টি
      </div>
    </div>
  );
};


// --- Formula Animation ---

const AnimatedFormula = () => {
  return (
    <div className="mt-6 pt-6 border-t border-slate-700 flex flex-col items-center justify-center gap-4 bg-slate-800/30 p-4 rounded-xl overflow-hidden">
      <div className="text-xs text-slate-400 uppercase tracking-widest font-bold font-hind">সূত্রের সম্পর্ক</div>
      <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap text-sm md:text-lg font-black tracking-tighter font-hind">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.8 }} className="text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-lg border border-blue-400/20 shadow-sm">
          পাত্রের প্রসারণ
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2, duration: 0.5, type: 'spring' }} className="text-slate-400">
          +
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3, duration: 0.8 }} className="text-orange-400 bg-orange-400/10 px-3 py-1.5 rounded-lg border border-orange-400/20 shadow-sm">
          আপাত প্রসারণ
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 4, duration: 0.5, type: 'spring' }} className="text-slate-400">
          =
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 5, duration: 0.8, type: 'spring' }} className="text-green-400 bg-green-400/10 px-3 py-1.5 rounded-xl border-2 border-green-400/30 text-base md:text-lg shadow-[0_0_20px_rgba(74,222,128,0.15)]">
          প্রকৃত প্রসারণ
        </motion.div>
      </div>
    </div>
  );
};


// --- Main Application ---

export default function ExpansionLab() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isSplitScreen, setIsSplitScreen] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'heating_glass' | 'heating_liquid' | 'completed'>('idle');
  const [closedPhase, setClosedPhase] = useState<string | null>(null);
  
  const [liquidType, setLiquidType] = useState<LiquidType>('water');
  const [isStepMode, setIsStepMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Core simulation state driven by Framer Motion (avoids React re-renders for smooth 60fps)
  const time = useMotionValue(0); // 0 to 15 seconds
  const isPlayingRef = useRef(isPlaying);
  const speedRef = useRef(speed);
  const phaseRef = useRef(phase);
  const sliderRef = useRef<HTMLInputElement>(null);

  const STEP_TIMES = [0, 0.5, 4, 4.5, 8, 15];
  const STEP_NOTES = [
    { title: "তাপ প্রয়োগ", note: "বার্নারের মাধ্যমে পাত্রে তাপ সরবরাহ করা হচ্ছে।" },
    { title: "পাত্রের প্রসারণ", note: "তাপ প্রথমে কাচের পাত্রে পৌঁছায়। ফলে তরল প্রসারিত হওয়ার আগে পাত্রের আয়তন বৃদ্ধি পায়।" },
    { title: "তরলের স্তর নিচে নামে", note: "পাত্রের আয়তন বৃদ্ধি পেলেও এই মুহূর্তে তরল প্রসারিত হয়নি। তাই তরলের স্তর সাময়িকভাবে নিচে নেমে যায়।" },
    { title: "তরল উত্তপ্ত হচ্ছে", note: "এখন তাপ তরলে পৌঁছায়। তরলের অণুগুলোর গতি বৃদ্ধি পায়।" },
    { title: "তরলের প্রসারণ", note: "তরল পাত্রের তুলনায় বেশি প্রসারিত হয়। ফলে তরলের স্তর আবার উপরে উঠতে থাকে।" },
    { title: "চূড়ান্ত ধারণা", note: "পাত্রের প্রসারণ বিবেচনা না করে যে প্রসারণ দেখা যায় তাকে আপাত প্রসারণ বলে। পাত্রের প্রসারণ বিবেচনা করলে তরলের প্রকৃত প্রসারণ পাওয়া যায়।" }
  ];

  const goToStep = (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= STEP_TIMES.length) return;
    setCurrentStep(stepIndex);
    setIsPlaying(false);
    animate(time, STEP_TIMES[stepIndex], { duration: 1.5, ease: "easeInOut" });
  };

  // Sync refs for animation loop
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { speedRef.current = speed; }, [speed]);

  // Derived metrics for Dashboard
  const lProps = LIQUID_PROPS[liquidType];
  const mult = lProps.multiplier;
  const realExpMax = 15 * mult;

  const tempDisplay = useTransform(time, [0, 15], [20, 120]);
  const containerVolDisplay = useTransform(time, (t) => t <= 4 ? 100.0 + (t / 4) * 5 : 105.0);
  const liquidVolDisplay = useTransform(time, (t) => {
    if (t <= 4) return 100.0;
    return 100.0 + ((t - 4) / 11) * realExpMax;
  });
  const containerExpDisplay = useTransform(time, (t) => t <= 4 ? (t / 4) * 5 : 5);
  const realExpDisplay = useTransform(time, (t) => {
    if (t <= 4) return 0;
    return ((t - 4) / 11) * realExpMax;
  });
  const apparentExpDisplay = useTransform(time, (t) => {
    if (t <= 4) return - (t / 4) * 5;
    return -5 + ((t - 4) / 11) * realExpMax;
  });

  // Force re-evaluation of transforms when liquid changes
  useEffect(() => {
    const current = time.get();
    time.set(current + 0.0001);
    const timer = setTimeout(() => time.set(current), 10);
    return () => clearTimeout(timer);
  }, [liquidType, time]);

  // Main Simulation Loop
  useAnimationFrame((t, delta) => {
    if (!isPlayingRef.current || isStepMode) return;

    let newTime = time.get() + (delta / 1000) * speedRef.current;
    
    // Clamp at 15
    if (newTime >= 15) {
      newTime = 15;
      setIsPlaying(false);
    }
    
    time.set(newTime);
    updatePhaseFromTime(newTime);
    
    // Update Slider without React re-render
    if (sliderRef.current) {
       sliderRef.current.value = (20 + (newTime / 15) * 100).toString();
    }
  });

  const updatePhaseFromTime = (t: number) => {
    let p: typeof phase = 'idle';
    if (t === 0) p = 'idle';
    else if (t > 0 && t <= 4.5) p = 'heating_glass';
    else if (t > 4.5 && t < 15) p = 'heating_liquid';
    else if (t >= 15) p = 'completed';

    if (p !== phaseRef.current) {
      phaseRef.current = p;
      setPhase(p);
      setClosedPhase(null);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    time.set(0);
    updatePhaseFromTime(0);
    if (sliderRef.current) sliderRef.current.value = "20";
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = parseFloat(e.target.value);
    const t = ((temp - 20) / 100) * 15;
    time.set(t);
    updatePhaseFromTime(t);
  };

  return (
    <div className="min-h-[100dvh] bg-[#0F172A] text-slate-100 font-sans flex flex-col md:p-4 lg:p-6 p-0 items-center justify-center">
      <div className="w-full max-w-[1280px] mx-auto bg-[#0F172A] md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:border border-slate-800 flex-1 min-h-0">
        
        {/* Header */}
        <header className="px-6 py-4 bg-slate-900/50 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white font-hind">
                তরলের প্রকৃত ও আপাত প্রসারণ
              </h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest mt-1 font-hind">পদার্থবিজ্ঞান সিমুলেশন • অধ্যায় ৬: তাপীয় প্রসারণ</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2 md:mt-0 flex-wrap">
            <select 
              value={liquidType} 
              onChange={(e) => setLiquidType(e.target.value as LiquidType)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold rounded-md px-3 py-2 outline-none focus:border-indigo-500 transition-colors shadow-lg font-hind"
            >
              <option value="water">💧 পানি</option>
              <option value="alcohol">🍷 অ্যালকোহল</option>
              <option value="mercury">🌡️ পারদ</option>
            </select>

            <button
              onClick={() => {
                 setIsStepMode(!isStepMode);
                 if (!isStepMode) goToStep(0);
                 else setIsPlaying(false);
              }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all shadow-lg border font-hind",
                isStepMode
                  ? "bg-emerald-600 border-emerald-500 text-white shadow-emerald-600/20"
                  : "bg-slate-800 border-slate-600 text-slate-100 hover:bg-slate-700"
              )}
            >
              <BookOpen size={16} />
              {isStepMode ? 'ধাপে ধাপে: চালু' : 'ধাপে ধাপে'}
            </button>

            <button
              onClick={() => setIsSplitScreen(!isSplitScreen)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all shadow-lg font-hind",
                isSplitScreen
                  ? "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20 text-white"
                  : "bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100"
              )}
            >
              <Columns size={16} />
              {isSplitScreen ? 'তুলনা: চালু' : 'তুলনা'}
            </button>
          </div>
        </header>

        {/* Main Body (Two Columns) */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          
          {/* LEFT COLUMN: Simulation & Controls */}
          <div className="flex-[7] flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 h-full">
            
            {/* Main Stage */}
            <div className="flex-1 relative bg-gradient-to-b from-[#1E293B] to-[#0F172A] p-4 flex items-center justify-center overflow-hidden h-full">
              
              {/* Simulation Canvases */}
              <div className={cn(
                "w-full flex justify-center items-center gap-4 transition-all duration-700 ease-in-out pt-8 lg:pt-12",
                isSplitScreen ? 'flex-col lg:flex-row' : 'flex-col'
              )}>
                <MacroView timeValue={time} phase={phase} liquidType={liquidType} />
                {isSplitScreen && <MicroscopicView timeValue={time} liquidType={liquidType} />}
              </div>
            </div>

            {/* Control Panel */}
            <div className="bg-slate-900 border-t border-slate-800 p-4 lg:p-6 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 shrink-0">
              
              <div className="flex items-center gap-4 w-full md:w-auto justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 transition-transform active:scale-95"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </button>
                <button
                  onClick={handleReset}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center transition-colors"
                  title="পুনরায় শুরু"
                >
                  <RotateCcw size={18} />
                </button>
              </div>

              <div className="flex-1 w-full max-w-xl flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider font-hind">টাইমলাইন</label>
                  <span className="text-xs font-bold text-slate-300"><Counter valueMotion={tempDisplay} format={(v: number) => `${v.toFixed(1)} °C`} /></span>
                </div>
                <input
                  ref={sliderRef}
                  type="range"
                  min="20"
                  max="120"
                  step="0.1"
                  defaultValue="20"
                  onChange={handleScrub}
                  onMouseDown={() => setIsPlaying(false)}
                  className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between px-1 mt-1 text-[10px] font-bold text-slate-500">
                  <span>20°C</span>
                  <span>70°C</span>
                  <span>120°C</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 w-full md:w-auto shrink-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-hind">সিমুলেশনের গতি</span>
                <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 shadow-inner">
                  {[0.5, 1, 2].map(s => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={cn(
                        "px-3 py-1 text-xs font-bold rounded-lg transition-all",
                        speed === s ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                      )}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Info Panel */}
          <div className="flex-[3] bg-black/40 p-4 lg:p-6 flex flex-col gap-6 overflow-y-auto">
            
            {/* Live Metrics */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              <Metric label="পাত্রের আয়তন" valueMotion={containerVolDisplay} format={(v: number) => `${v.toFixed(2)} mL`} className="font-hind" />
              <Metric label="তরলের আয়তন" valueMotion={liquidVolDisplay} format={(v: number) => `${v.toFixed(2)} mL`} className="font-hind" />
              
              <Metric label="পাত্রের প্রসারণ" valueMotion={containerExpDisplay} format={(v: number) => `+${v.toFixed(2)} mL`} colorClass="text-indigo-300" className="font-hind" />
              <Metric label="আপাত প্রসারণ" valueMotion={apparentExpDisplay} format={(v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(2)} mL`} colorClass="text-indigo-300" className="font-hind" />
              <Metric label="প্রকৃত প্রসারণ" valueMotion={realExpDisplay} format={(v: number) => `+${v.toFixed(2)} mL`} colorClass="text-white" className="col-span-2 font-hind" />
            </div>

            {/* Educational Info */}
            <AnimatePresence mode="popLayout">
              {isStepMode ? (
                <motion.div
                  key="step-mode-card"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-lg relative overflow-hidden shrink-0"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">{currentStep + 1}</div>
                        <h4 className="text-white font-bold text-sm tracking-tight font-hind">{STEP_NOTES[currentStep].title}</h4>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed mb-5 min-h-[60px] font-noto">{STEP_NOTES[currentStep].note}</p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                    <button onClick={() => goToStep(currentStep - 1)} disabled={currentStep === 0} className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-bold font-hind">
                      <ArrowLeft size={14} /> পূর্ববর্তী
                    </button>
                    <button onClick={() => goToStep(currentStep + 1)} disabled={currentStep === STEP_TIMES.length - 1} className="flex items-center gap-1 px-4 py-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-bold shadow-lg shadow-emerald-500/20 font-hind">
                      পরবর্তী <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                (phase === 'heating_glass' || phase === 'heating_liquid') && (
                  <motion.div
                    key="phase-card"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={cn(
                      "border rounded-xl p-5 shadow-lg relative overflow-hidden shrink-0",
                      phase === 'heating_glass' ? 'bg-indigo-900/30 border-indigo-700/50' : 'bg-red-900/30 border-red-700/50'
                    )}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={phase}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className={cn("p-1.5 rounded-full animate-pulse", phase === 'heating_glass' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-red-500/20 text-red-400')}>
                            {phase === 'heating_glass' ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                          </div>
                          <h4 className="text-white font-bold text-sm tracking-tight font-hind">
                            {phase === 'heating_glass' ? 'পাত্রের প্রসারণ' : 'প্রকৃত প্রসারণ'}
                          </h4>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed min-h-[60px] font-noto">
                          {phase === 'heating_glass' 
                            ? 'তাপ প্রথমে কাচের পাত্রে পৌঁছায়। ফলে তরল প্রসারিত হওয়ার আগে পাত্রের আয়তন বৃদ্ধি পায় এবং স্তর নিচে নেমে যায়।'
                            : 'এখন তাপ তরলে পৌঁছায়। তরল পাত্রের তুলনায় বেশি প্রসারিত হয়, ফলে তরলের স্তর আবার উপরে উঠতে থাকে।'}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )
              )}
            </AnimatePresence>

            {/* Summary & Formula */}
            <AnimatePresence mode="popLayout">
              {phase === 'completed' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900/80 border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col gap-4 shrink-0"
                >
                  <h3 className="text-lg font-black text-white tracking-tight border-b border-slate-800 pb-2 font-hind">পরীক্ষার সারাংশ</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 font-noto">
                      <CheckCircle className="text-blue-400 mt-0.5 shrink-0" size={16} />
                      <span className="text-slate-300 text-sm font-medium leading-tight"><strong className="text-blue-400 font-hind font-bold">কাচের পাত্রটি প্রথমে প্রসারিত হয়</strong>, যার ফলে তরলের স্তর সাময়িকভাবে নিচে নেমে যায় (আপাত সংকোচন)।</span>
                    </li>
                    <li className="flex items-start gap-3 font-noto">
                      <CheckCircle className="text-red-400 mt-0.5 shrink-0" size={16} />
                      <span className="text-slate-300 text-sm font-medium leading-tight"><strong className="text-red-400 font-hind font-bold">তরলটি পরবর্তীতে প্রকৃতভাবে প্রসারিত হয়</strong>, যা আদি স্তরের চেয়ে অনেক বেশি উপরে উঠে যায়।</span>
                    </li>
                  </ul>
                  <AnimatedFormula />
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </div>
  );
}
