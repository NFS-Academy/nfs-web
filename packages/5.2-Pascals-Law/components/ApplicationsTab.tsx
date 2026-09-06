'use client';

import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Sphere, Torus, Html, QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw } from 'lucide-react';

type PartId = number | null;

interface AnnotationProps {
  id: number;
  position: [number, number, number];
  label: string;
  description: string;
  hoveredPart: PartId;
  setHoveredPart: (id: PartId) => void;
}

function Annotation({ id, position, label, description, hoveredPart, setHoveredPart }: AnnotationProps) {
  const isHovered = hoveredPart === id;
  return (
    <Html position={position} center zIndexRange={[100, 0]}>
      <div 
        className={`relative flex items-center justify-center w-5 h-5 rounded-full cursor-pointer transition-all shadow-md border-2 border-[#111114] ${isHovered ? 'bg-blue-500 text-white scale-125 z-50' : 'bg-white text-slate-800 hover:bg-blue-50 z-0'}`}
        onPointerEnter={() => setHoveredPart(id)}
        onPointerLeave={() => setHoveredPart(null)}
        onClick={(e) => { e.stopPropagation(); setHoveredPart(isHovered ? null : id); }}
      >
        <span className="text-[10px] font-bold font-sans">{id}</span>
        {isHovered && (
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-40 bg-slate-900/95 text-white text-xs p-2 rounded-lg shadow-xl pointer-events-none z-50 border border-slate-700/50 backdrop-blur-md">
            <span className="font-bold font-heading text-blue-300 block mb-0.5 border-b border-white/10 pb-0.5">{label}</span>
            <span className="font-body text-slate-300 leading-tight text-[10px]">{description}</span>
          </div>
        )}
      </div>
    </Html>
  );
}

function HydraulicBrakeModel({ hoveredPart, setHoveredPart }: { hoveredPart: PartId, setHoveredPart: (id: PartId) => void }) {
  return (
    <group position={[-1.5, -2, 0]} scale={0.7}>
      {/* Wheel/Tire */}
      <Torus args={[3.4, 0.8, 32, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </Torus>
      
      {/* 8: Rotor */}
      <Cylinder args={[2.4, 2.4, 0.1, 64]} rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color={hoveredPart === 8 ? '#cbd5e1' : '#94a3b8'} metalness={0.8} roughness={0.3} />
      </Cylinder>
      <Cylinder args={[1.4, 1.4, 0.12, 32]} rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.6} />
      </Cylinder>
      <Annotation id={8} position={[0, -3.2, 0]} label="ব্রেক রোটর / ডিস্ক" description="চাকার সাথে ঘোরে, ঘর্ষণে থেমে যায়" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

      {/* 4: Caliper */}
      <group position={[2.1, 1.2, 0]} rotation={[0, 0, -Math.PI/6]}>
        <Box args={[1.2, 2.6, 0.7]} position={[0, 0, 0]}>
          <meshStandardMaterial color={hoveredPart === 4 ? '#ef4444' : '#dc2626'} roughness={0.6} />
        </Box>
        <Box args={[0.6, 2, 0.9]} position={[-0.3, 0, 0]}>
          <meshStandardMaterial color={hoveredPart === 4 ? '#ef4444' : '#b91c1c'} roughness={0.6} />
        </Box>
        <Annotation id={4} position={[1, 1.5, 0]} label="ব্রেক ক্যালিপার" description="ব্রেক প্যাড ও পিস্টন ধারণ করে" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

        {/* 7: Brake Pads */}
        <Box args={[0.3, 1.8, 0.1]} position={[-0.7, 0, 0.15]}>
          <meshStandardMaterial color={hoveredPart === 7 ? '#94a3b8' : '#334155'} />
        </Box>
        <Box args={[0.3, 1.8, 0.1]} position={[-0.7, 0, -0.15]}>
          <meshStandardMaterial color={hoveredPart === 7 ? '#94a3b8' : '#334155'} />
        </Box>
        <Annotation id={7} position={[-1.2, 1, 0.4]} label="ব্রেক প্যাড" description="ডিস্ককে চেপে ধরে ঘর্ষণ সৃষ্টি করে" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

        {/* 5: Caliper Piston */}
        <Cylinder args={[0.4, 0.4, 0.3, 32]} rotation={[Math.PI/2, 0, 0]} position={[-0.2, 0, 0.25]}>
          <meshStandardMaterial color={hoveredPart === 5 ? '#cbd5e1' : '#94a3b8'} metalness={0.7} />
        </Cylinder>
        <Annotation id={5} position={[0.2, -1.5, 0.5]} label="ক্যালিপার পিস্টন" description="প্যাডকে ডিস্কের দিকে ঠেলে দেয়" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />
      </group>

      {/* 1: Master Cylinder */}
      <group position={[-3.5, 4.5, 0]}>
        <Cylinder args={[0.3, 0.3, 1.8, 32]} rotation={[0, 0, Math.PI/2]} position={[0, 0, 0]}>
          <meshStandardMaterial color={hoveredPart === 1 ? '#cbd5e1' : '#94a3b8'} metalness={0.7} />
        </Cylinder>
        {/* Lever */}
        <Box args={[2.5, 0.15, 0.3]} rotation={[0, 0, -Math.PI/10]} position={[-1.2, -0.4, 0]}>
          <meshStandardMaterial color={hoveredPart === 1 ? '#475569' : '#1e293b'} />
        </Box>
        <Annotation id={1} position={[-2, 0.5, 0]} label="ব্রেক লিভার ও মাস্টার সিলিন্ডার" description="চাপ সৃষ্টির সূচনা স্থান" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

        {/* 2: Reservoir */}
        <Cylinder args={[0.5, 0.5, 0.9, 32]} position={[0.4, 0.7, 0]}>
          <meshStandardMaterial color={hoveredPart === 2 ? '#ffffff' : '#f1f5f9'} transparent opacity={0.9} roughness={0.1} />
        </Cylinder>
        {/* Cap */}
        <Cylinder args={[0.55, 0.55, 0.2, 32]} position={[0.4, 1.2, 0]}>
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </Cylinder>
        <Annotation id={2} position={[1.2, 1.2, 0]} label="ফ্লুইড রিজার্ভয়ার" description="অতিরিক্ত ব্রেক ফ্লুইড জমা থাকে" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

        {/* 6: Brake Fluid (conceptual dot inside reservoir) */}
        <Sphere args={[0.25]} position={[0.4, 0.5, 0]}>
          <meshStandardMaterial color={hoveredPart === 6 ? '#93c5fd' : '#3b82f6'} />
        </Sphere>
        <Annotation id={6} position={[1.2, 0.4, 0]} label="ব্রেক ফ্লুইড" description="চাপ সবদিকে সঞ্চারিত করে" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />
      </group>

      {/* 3: Hose */}
      <QuadraticBezierLine
        start={[2.4, 2.5, 0]}
        end={[-3, 4.5, 0]}
        mid={[0, 4, 1.5]}
        color={hoveredPart === 3 ? "#64748b" : "#0f172a"}
        lineWidth={5}
      />
      <Annotation id={3} position={[0, 3.5, 1]} label="হাইড্রোলিক লাইন" description="চাপ ক্যালিপারে পরিবহন করে" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />
    </group>
  );
}

function HydraulicJackModel({ hoveredPart, setHoveredPart }: { hoveredPart: PartId, setHoveredPart: (id: PartId) => void }) {
  return (
    <group position={[0, -4, 0]} scale={1.1}>
      {/* 7: Main Body & Base */}
      <Box args={[4, 0.5, 3]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color={hoveredPart === 7 ? '#ef4444' : '#b91c1c'} roughness={0.7} />
      </Box>
      <Box args={[3, 0.8, 2.5]} position={[0, 0.9, 0]}>
        <meshStandardMaterial color={hoveredPart === 7 ? '#ef4444' : '#b91c1c'} roughness={0.7} />
      </Box>
      <Annotation id={7} position={[-2.2, 0.6, 1.5]} label="প্রধান বডি ও বেস" description="পুরো কাঠামো ধরে রাখে" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

      {/* 4: Oil Reservoir / Main Cylinder */}
      <Cylinder args={[1.4, 1.4, 3.8, 32]} position={[0, 3.2, 0]}>
        <meshStandardMaterial color={hoveredPart === 4 ? '#ef4444' : '#b91c1c'} roughness={0.6} />
      </Cylinder>
      {/* Top Collars */}
      <Cylinder args={[0.9, 1.4, 0.8, 32]} position={[0, 5.5, 0]}>
        <meshStandardMaterial color={hoveredPart === 4 ? '#ef4444' : '#b91c1c'} roughness={0.6} />
      </Cylinder>
      <Cylinder args={[0.9, 0.9, 0.6, 32]} position={[0, 6.2, 0]}>
        <meshStandardMaterial color={hoveredPart === 4 ? '#ef4444' : '#b91c1c'} roughness={0.6} />
      </Cylinder>
      <Annotation id={4} position={[-1.7, 3.2, 0]} label="তেল রিজার্ভয়ার" description="তেল জমা থাকে" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

      {/* 3: Seal */}
      <Cylinder args={[0.95, 0.95, 0.2, 32]} position={[0, 6.6, 0]}>
        <meshStandardMaterial color={hoveredPart === 3 ? '#94a3b8' : '#475569'} roughness={0.5} />
      </Cylinder>
      <Annotation id={3} position={[-1.2, 6.6, 0]} label="সিল" description="তেল লিক হতে বাধা দেয়" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

      {/* 2: Ram */}
      <Cylinder args={[0.7, 0.7, 2.5, 32]} position={[0, 7.8, 0]}>
        <meshStandardMaterial color={hoveredPart === 2 ? '#f8fafc' : '#cbd5e1'} metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Annotation id={2} position={[-1, 7.8, 0]} label="র্যাম / পিস্টন" description="লোডকে উপরের দিকে ঠেলে" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

      {/* 1: Saddle */}
      <Cylinder args={[0.8, 0.8, 0.5, 32]} position={[0, 9.3, 0]}>
        <meshStandardMaterial color={hoveredPart === 1 ? '#94a3b8' : '#64748b'} metalness={0.5} roughness={0.6} />
      </Cylinder>
      <Cylinder args={[0.6, 0.6, 0.4, 32]} position={[0, 9.7, 0]}>
        <meshStandardMaterial color={hoveredPart === 1 ? '#94a3b8' : '#64748b'} metalness={0.5} roughness={0.6} />
      </Cylinder>
      <Annotation id={1} position={[1.2, 9.5, 0]} label="লোড প্যাড (স্যাডল)" description="ভারী বস্তুর সংস্পর্শে থাকে" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

      {/* 6: Small Piston (Pump) */}
      <Cylinder args={[0.4, 0.5, 1.5, 32]} position={[2.2, 1.8, 0]}>
        <meshStandardMaterial color={hoveredPart === 6 ? '#ef4444' : '#b91c1c'} roughness={0.6} />
      </Cylinder>
      <Cylinder args={[0.2, 0.2, 1, 16]} position={[2.2, 3, 0]}>
        <meshStandardMaterial color={hoveredPart === 6 ? '#f8fafc' : '#cbd5e1'} metalness={0.8} />
      </Cylinder>
      <Annotation id={6} position={[2.8, 2.5, 0]} label="ছোট পাম্প পিস্টন" description="তেলের উপর চাপ সৃষ্টি করে" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

      {/* 5: Handle joint and linkage */}
      <group position={[2.4, 3.8, 0]}>
        <Box args={[0.3, 0.8, 0.3]} position={[-0.2, -0.4, 0]}>
          <meshStandardMaterial color="#991b1b" />
        </Box>
        <Cylinder args={[0.1, 0.1, 3.5, 16]} rotation={[0, 0, -Math.PI/3]} position={[1.5, 0.8, 0]}>
          <meshStandardMaterial color={hoveredPart === 5 ? '#ef4444' : '#b91c1c'} roughness={0.7} />
        </Cylinder>
        <Annotation id={5} position={[2.5, 1.5, 0]} label="পাম্প হ্যান্ডেল" description="বল প্রয়োগের স্থান" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />
      </group>
    </group>
  );
}

function HydraulicPressModel({ hoveredPart, setHoveredPart }: { hoveredPart: PartId, setHoveredPart: (id: PartId) => void }) {
  return (
    <group position={[0, -5, 0]} scale={0.85}>
      {/* 7: Frame */}
      {/* Left Column */}
      <Box args={[1, 10, 1.5]} position={[-4, 5, 0]}>
        <meshStandardMaterial color={hoveredPart === 7 ? '#ef4444' : '#b91c1c'} roughness={0.7} />
      </Box>
      {/* Right Column */}
      <Box args={[1, 10, 1.5]} position={[4, 5, 0]}>
        <meshStandardMaterial color={hoveredPart === 7 ? '#ef4444' : '#b91c1c'} roughness={0.7} />
      </Box>
      {/* Top Beam */}
      <Box args={[9, 1.2, 1.5]} position={[0, 10.5, 0]}>
        <meshStandardMaterial color={hoveredPart === 7 ? '#ef4444' : '#b91c1c'} roughness={0.7} />
      </Box>
      {/* Bottom Feet */}
      <Box args={[1.5, 0.4, 4.5]} position={[-4, 0.2, 0]}>
        <meshStandardMaterial color={hoveredPart === 7 ? '#ef4444' : '#b91c1c'} roughness={0.7} />
      </Box>
      <Box args={[1.5, 0.4, 4.5]} position={[4, 0.2, 0]}>
        <meshStandardMaterial color={hoveredPart === 7 ? '#ef4444' : '#b91c1c'} roughness={0.7} />
      </Box>
      {/* Lower Crossbar */}
      <Box args={[9, 0.5, 1]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color={hoveredPart === 7 ? '#ef4444' : '#b91c1c'} roughness={0.7} />
      </Box>
      <Annotation id={7} position={[-5.2, 5, 0]} label="প্রেস ফ্রেম" description="পুরো চাপ সহ্য করে" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

      {/* 6: Work Table */}
      <Box args={[7, 1, 2]} position={[0, 3.5, 0]}>
        <meshStandardMaterial color={hoveredPart === 6 ? '#ef4444' : '#b91c1c'} roughness={0.7} />
      </Box>
      <Annotation id={6} position={[4.5, 3.5, 0]} label="কাজের টেবিল" description="যার উপর বস্তু রাখা হয়" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

      {/* 1: Jack (Black bottle jack inside) */}
      <group position={[0, 8, 0]}>
        <Cylinder args={[1.1, 1.1, 2.5, 32]} position={[0, 0.75, 0]}>
          <meshStandardMaterial color={hoveredPart === 1 ? '#334155' : '#0f172a'} roughness={0.5} />
        </Cylinder>
        <Cylinder args={[0.7, 1.1, 0.5, 32]} position={[0, 2.25, 0]}>
          <meshStandardMaterial color={hoveredPart === 1 ? '#334155' : '#0f172a'} roughness={0.5} />
        </Cylinder>
        <Annotation id={1} position={[1.8, 1, 0]} label="হাইড্রোলিক জ্যাক" description="চাপ তৈরির প্রধান অংশ" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

        {/* 3: Pump Handle */}
        <Cylinder args={[0.1, 0.1, 4, 16]} rotation={[0, 0, -Math.PI/4]} position={[2.5, 0, 0]}>
          <meshStandardMaterial color={hoveredPart === 3 ? '#ef4444' : '#b91c1c'} roughness={0.6} />
        </Cylinder>
        <Annotation id={3} position={[4.5, -1, 0]} label="পাম্প হ্যান্ডেল" description="পাম্প করার স্থান" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

        {/* 4: Ram */}
        <Cylinder args={[0.5, 0.5, 2, 32]} position={[0, -1.5, 0]}>
          <meshStandardMaterial color={hoveredPart === 4 ? '#f8fafc' : '#cbd5e1'} metalness={0.8} roughness={0.2} />
        </Cylinder>
        <Annotation id={4} position={[1, -1.5, 0]} label="র্যাম / পিস্টন" description="নিচের দিকে প্রচণ্ড বল প্রয়োগ করে" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

        {/* 5: Press Plate */}
        <Box args={[3.5, 0.5, 2]} position={[0, -2.75, 0]}>
          <meshStandardMaterial color={hoveredPart === 5 ? '#ef4444' : '#b91c1c'} roughness={0.6} />
        </Box>
        <Annotation id={5} position={[-2.5, -2.75, 0]} label="প্রেস প্লেট" description="বস্তুর উপর চাপ দেয়" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

        {/* 2: Return Springs */}
        <Cylinder args={[0.25, 0.25, 3, 16, 20]} position={[-1.5, -0.5, 0]}>
          <meshStandardMaterial color={hoveredPart === 2 ? '#cbd5e1' : '#94a3b8'} wireframe={true} wireframeLinewidth={2} />
        </Cylinder>
        <Cylinder args={[0.25, 0.25, 3, 16, 20]} position={[1.5, -0.5, 0]}>
          <meshStandardMaterial color={hoveredPart === 2 ? '#cbd5e1' : '#94a3b8'} wireframe={true} wireframeLinewidth={2} />
        </Cylinder>
        <Annotation id={2} position={[-2.2, -0.5, 0]} label="রিটার্ন স্প্রিং" description="র্যামকে আগের অবস্থায় ফিরিয়ে আনে" hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />
      </group>

      {/* Object being pressed */}
      <Box args={[1.5, 1.5, 1.5]} position={[0, 4.75, 0]}>
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
      </Box>
    </group>
  );
}

const brakeParts = [
  { id: 1, label: 'ব্রেক লিভার ও মাস্টার সিলিন্ডার', desc: 'চাপ সৃষ্টির সূচনা স্থান' },
  { id: 2, label: 'ফ্লুইড রিজার্ভয়ার', desc: 'অতিরিক্ত ব্রেক ফ্লুইড জমা থাকে' },
  { id: 3, label: 'হাইড্রোলিক লাইন', desc: 'চাপ ক্যালিপারে পরিবহন করে' },
  { id: 4, label: 'ব্রেক ক্যালিপার', desc: 'ব্রেক প্যাড ও পিস্টন ধারণ করে' },
  { id: 5, label: 'ক্যালিপার পিস্টন', desc: 'প্যাডকে ডিস্কের দিকে ঠেলে দেয়' },
  { id: 6, label: 'ব্রেক ফ্লুইড', desc: 'চাপ সবদিকে সঞ্চারিত করে' },
  { id: 7, label: 'ব্রেক প্যাড', desc: 'ডিস্ককে চেপে ধরে ঘর্ষণ সৃষ্টি করে' },
  { id: 8, label: 'ব্রেক রোটর / ডিস্ক', desc: 'চাকার সাথে ঘোরে, ঘর্ষণে থেমে যায়' },
];

const jackParts = [
  { id: 1, label: 'লোড প্যাড (স্যাডল)', desc: 'ভারী বস্তুর সংস্পর্শে থাকে' },
  { id: 2, label: 'র্যাম / পিস্টন', desc: 'লোডকে উপরের দিকে ঠেলে' },
  { id: 3, label: 'সিল', desc: 'তেল লিক হতে বাধা দেয়' },
  { id: 4, label: 'তেল রিজার্ভয়ার', desc: 'তেল জমা থাকে' },
  { id: 5, label: 'পাম্প হ্যান্ডেল', desc: 'বল প্রয়োগের স্থান' },
  { id: 6, label: 'ছোট পাম্প পিস্টন', desc: 'তেলের উপর চাপ সৃষ্টি করে' },
  { id: 7, label: 'প্রধান বডি ও বেস', desc: 'পুরো কাঠামো ধরে রাখে' },
];

const pressParts = [
  { id: 1, label: 'হাইড্রোলিক জ্যাক', desc: 'চাপ তৈরির প্রধান অংশ' },
  { id: 2, label: 'রিটার্ন স্প্রিং', desc: 'র্যামকে আগের অবস্থায় ফিরিয়ে আনে' },
  { id: 3, label: 'পাম্প হ্যান্ডেল', desc: 'পাম্প করার স্থান' },
  { id: 4, label: 'র্যাম / পিস্টন', desc: 'নিচের দিকে প্রচণ্ড বল প্রয়োগ করে' },
  { id: 5, label: 'প্রেস প্লেট', desc: 'বস্তুর উপর চাপ দেয়' },
  { id: 6, label: 'কাজের টেবিল', desc: 'যার উপর বস্তু রাখা হয়' },
  { id: 7, label: 'প্রেস ফ্রেম', desc: 'পুরো চাপ সহ্য করে' },
];

interface AppCardProps {
  title: string;
  ModelComponent: React.FC<{ hoveredPart: PartId, setHoveredPart: (id: PartId) => void }>;
  parts: Array<{ id: number; label: string; desc: string }>;
  explanation: string;
  pascalLaw: string;
  cameraPos: [number, number, number];
  fov: number;
}

function ApplicationCard({ title, ModelComponent, parts, explanation, pascalLaw, cameraPos, fov }: AppCardProps) {
  const [hoveredPart, setHoveredPart] = useState<PartId>(null);
  const controlsRef = useRef<any>(null);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="bg-[#111114] rounded-2xl shadow-sm border border-white/10 flex flex-col h-full overflow-hidden min-w-0">
      <div className="bg-black/40 px-5 py-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="font-heading font-semibold text-blue-300 text-lg">{title}</h3>
        <button onClick={resetCamera} className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded uppercase tracking-wider font-bold shrink-0">
          <RotateCcw className="w-3 h-3" />
          রিসেট
        </button>
      </div>

      <div className="h-[320px] sm:h-[350px] lg:h-[400px] w-full relative bg-gradient-to-b from-[#0a0a0c] to-[#1a1a20]">
        <Canvas shadows camera={{ position: cameraPos, fov }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-5, 5, -5]} intensity={0.5} />
          
          <ModelComponent hoveredPart={hoveredPart} setHoveredPart={setHoveredPart} />

          <OrbitControls 
            ref={controlsRef} 
            enablePan={true} 
            autoRotate={true}
            autoRotateSpeed={0.5}
            makeDefault
          />
        </Canvas>
        <div className="absolute top-3 left-3 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/10 text-[10px] text-slate-300 shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            মডেলটি ঘোরাতে টেনে ধরুন
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-5 bg-black/20">
        <div className="flex flex-wrap gap-2">
          {parts.map(part => (
            <span 
              key={part.id}
              onPointerEnter={() => setHoveredPart(part.id)}
              onPointerLeave={() => setHoveredPart(null)}
              onClick={() => setHoveredPart(hoveredPart === part.id ? null : part.id)}
              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full border cursor-pointer transition-colors ${hoveredPart === part.id ? 'bg-blue-500 text-white border-blue-500 shadow-md' : 'bg-black/30 text-slate-300 border-white/10 hover:bg-white/10'}`}
            >
              <span className={`flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold ${hoveredPart === part.id ? 'bg-white text-blue-600' : 'bg-white/20 text-slate-300'}`}>
                {part.id}
              </span>
              <span className="font-medium">{part.label}</span>
            </span>
          ))}
        </div>

        <div className="text-sm font-body text-slate-300 leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
          {explanation}
        </div>
        
        <div className="mt-auto">
          <div className="border-t border-white/10 pt-4">
            <span className="text-[10px] font-bold text-amber-500/80 uppercase tracking-wider block mb-1.5">প্যাসকেলের সূত্রের ব্যবহার</span>
            <p className="text-xs font-body text-amber-200/90 leading-relaxed">{pascalLaw}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ApplicationsTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-heading font-semibold text-slate-100">বাস্তব প্রয়োগ</h2>
        <p className="text-slate-400 font-body">প্যাসকেলের সূত্রের বাস্তব জীবনের প্রয়োগগুলো দেখুন</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <ApplicationCard
          title="হাইড্রোলিক ব্রেক"
          ModelComponent={HydraulicBrakeModel}
          parts={brakeParts}
          explanation="ব্রেক লিভারে চাপ দিলে মাস্টার সিলিন্ডারের পিস্টন ব্রেক ফ্লুইডে চাপ সৃষ্টি করে। প্যাসকেলের সূত্র অনুযায়ী এই চাপ হাইড্রোলিক লাইনের মাধ্যমে ক্যালিপারে পৌঁছে। ক্যালিপারের পিস্টন ব্রেক প্যাডকে ডিস্কের দিকে চাপ দেয় এবং ঘর্ষণের ফলে চাকা ধীরে যায়। (ছোট বল → তরলে চাপ → বড় পিস্টনে বল → ব্রেক প্রয়োগ)"
          pascalLaw="তরলে সৃষ্ট চাপ হাইড্রোলিক লাইনের মাধ্যমে ক্যালিপারে সঞ্চারিত হয়।"
          cameraPos={[3, 5, 8]}
          fov={50}
        />
        
        <ApplicationCard
          title="হাইড্রোলিক জ্যাক"
          ModelComponent={HydraulicJackModel}
          parts={jackParts}
          explanation="পাম্প হ্যান্ডেল উপরে-নিচে চালালে ছোট পিস্টন তেলের উপর চাপ প্রয়োগ করে। প্যাসকেলের সূত্র অনুযায়ী এই চাপ বড় পিস্টনের র্যাম পর্যন্ত পৌঁছে। বড় পিস্টনের ক্ষেত্রফল বেশি হওয়ায় কম বল প্রয়োগ করেও ভারী বস্তু তোলা সম্ভব হয়। (ছোট বল → বড় বল)"
          pascalLaw="ছোট পিস্টনে সৃষ্ট চাপ বড় পিস্টনে বেশি বল উৎপন্ন করতে সাহায্য করে।"
          cameraPos={[-5, 4, 7]}
          fov={50}
        />

        <ApplicationCard
          title="হাইড্রোলিক প্রেস"
          ModelComponent={HydraulicPressModel}
          parts={pressParts}
          explanation="জ্যাকের ছোট পিস্টনে বল প্রয়োগ করলে হাইড্রোলিক তেলে চাপ সৃষ্টি হয়। এই চাপ বড় পিস্টনের র্যাম পর্যন্ত পৌঁছে। র্যাম নিচের দিকে নেমে প্রেস প্লেটের মাধ্যমে বস্তুতে বড় বল প্রয়োগ করে। তাই ধাতু বাঁকানো, চ্যাপ্টা করা বা আকৃতি পরিবর্তনের কাজে হাইড্রোলিক প্রেস ব্যবহার করা হয়। (ছোট বল → বড় বল → ভারী বস্তুর উপর কাজ)"
          pascalLaw="বড় পিস্টনের বেশি ক্ষেত্রফলের কারণে বড় বল পাওয়া যায়।"
          cameraPos={[-7, 2, 8]}
          fov={60}
        />
      </div>

      <div className="text-center mt-8 pt-6 border-t border-white/10">
        <p className="text-xs text-slate-500 font-body">এই মডেলগুলো শিক্ষামূলক উদ্দেশ্যে তৈরি করা হয়েছে। বাস্তব যন্ত্রের ক্ষেত্রে নিরাপত্তা নির্দেশনা অনুসরণ করুন।</p>
      </div>
    </div>
  );
}
