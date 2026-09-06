"use client";

import { useSimulationStore } from '@/lib/store';
import { useEffect, useState } from 'react';

function DataRow({ label, value, unit, highlight = false }: { label: string, value: number | string, unit: string, highlight?: boolean }) {
  const displayValue = typeof value === 'number' ? value.toFixed(2) : value;
  return (
    <div className={`flex justify-between items-center text-xs py-1 border-b border-white/5 last:border-0`}>
      <span className="text-gray-400">{label}</span>
      <span className={`font-mono ${highlight ? 'text-blue-400 font-semibold' : 'text-gray-200'}`}>
        {displayValue} <span className="text-[10px] text-gray-600 font-sans ml-1">{unit}</span>
      </span>
    </div>
  );
}

export default function BuoyancyDataPanel() {
  const state = useSimulationStore();
  // Using local state to force updates since R3F might mutate state without triggering React renders for performance?
  // Wait, zustand is reactive. We just need to select the state.
  
  const {
    brickMass, brickHeight, brickWidth, brickDepth, brickPosition, brickVelocity,
    waterLevel: baseWaterLevel, waterDensity, gravity, tankWidth, tankDepth
  } = state;

  const brickVolume = brickWidth * brickHeight * brickDepth;
  const brickBaseArea = brickWidth * brickDepth;
  const brickDensity = brickMass / brickVolume;
  
  const brickBottomY = brickPosition.y - brickHeight / 2;
  const brickTopY = brickPosition.y + brickHeight / 2;

  // We need to iteratively find the submerged height since the water level rises as the brick enters.
  // For a simple approximation that avoids complex algebraic solutions:
  // We use the base water level to approximate initial submersion, then calculate the new level.
  let currentWaterLevel = baseWaterLevel;
  let submergedHeight = 0;
  let submergedVolume = 0;
  
  // Quick estimation loop for stable water level
  for(let i=0; i<3; i++) {
    if (brickBottomY < currentWaterLevel) {
      if (brickTopY <= currentWaterLevel) {
        submergedHeight = brickHeight;
      } else {
        submergedHeight = currentWaterLevel - brickBottomY;
      }
    } else {
      submergedHeight = 0;
    }
    submergedVolume = submergedHeight * brickBaseArea;
    const tankArea = tankWidth * tankDepth;
    currentWaterLevel = baseWaterLevel + (submergedVolume / (tankArea - brickBaseArea + brickBaseArea)); // actually volume adds directly to total volume
    // V_total = V_baseWater + V_submerged
    // h_new = (V_baseWater + V_submerged) / tankArea
    // h_new = baseWaterLevel + submergedVolume / tankArea
    currentWaterLevel = baseWaterLevel + (submergedVolume / tankArea);
  }

  const buoyantForce = waterDensity * gravity * submergedVolume;
  const weight = brickMass * gravity;
  const netForce = buoyantForce - weight;
  
  const pTop = Math.max(0, currentWaterLevel - brickTopY) * waterDensity * gravity;
  const pBottom = Math.max(0, currentWaterLevel - brickBottomY) * waterDensity * gravity;
  
  const forceUpper = pTop * brickBaseArea;
  const forceLower = pBottom * brickBaseArea;

  let displayNetForce = netForce;
  let displayVelocity = brickVelocity.y;
  let displayBuoyantForce = buoyantForce;
  
  const isAtBottom = brickBottomY <= 0.01;
  const isVelocityZero = Math.abs(brickVelocity.y) === 0;

  let status = "পানির উপরে";
  if (isAtBottom && netForce <= 0) {
    status = "ট্যাংকের তলায়";
    if (isVelocityZero) {
       displayVelocity = 0;
    }
  } else if (submergedHeight > 0) {
    if (isVelocityZero && Math.abs(netForce) < (weight * 0.01)) {
      status = submergedHeight >= brickHeight ? "নিমজ্জিত অবস্থায় ভাসা" : "ভাসমান";
      displayNetForce = 0;
      displayBuoyantForce = weight;
      displayVelocity = 0;
    } else if (brickVelocity.y > 0.001) {
      status = "উঠছে";
    } else if (brickVelocity.y < -0.001) {
      status = "ডুবছে";
    } else if (isVelocityZero) {
      status = submergedHeight >= brickHeight ? "নিমজ্জিত অবস্থায় ভাসা" : "ভাসমান";
      displayNetForce = 0;
      displayBuoyantForce = weight;
    }
  }

  let statusClass = "bg-white/5 text-gray-400 border border-white/10";
  if (status === 'ভাসমান') statusClass = "bg-blue-500/20 text-blue-400 border border-blue-500/30";
  if (status === 'ডুবছে') statusClass = "bg-red-500/20 text-red-400 border border-red-500/30";
  if (status === 'ট্যাংকের তলায়') statusClass = "bg-gray-800 text-gray-400 border border-gray-600";
  if (status === 'নিমজ্জিত অবস্থায় ভাসা') statusClass = "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";

  // Bar ratios for visualization
  const maxForce = Math.max(weight, displayBuoyantForce, 1);
  const weightPercent = (weight / maxForce) * 100;
  const buoyantPercent = (displayBuoyantForce / maxForce) * 100;
  
  return (
    <div className="flex flex-col gap-4 p-4 bg-[#0a0a0a] rounded-xl border border-white/10 font-body">
      <div className="flex justify-between items-center border-b border-white/10 pb-3">
        <h3 className="text-[12px] text-gray-500 font-bold flex items-center gap-2 font-heading">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> বিশ্লেষণ
        </h3>
        <span className={`px-2 py-1 text-[10px] font-bold rounded tracking-widest font-heading ${statusClass}`}>
          {status}
        </span>
      </div>

      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        <div className="space-y-1">
          <h4 className="text-[11px] font-bold text-gray-600 mb-3 font-heading">বস্তুর বৈশিষ্ট্য</h4>
          <DataRow label="আয়তন" value={brickVolume} unit="m³" />
          <DataRow label="ঘনত্ব" value={brickDensity} unit="kg/m³" highlight={Math.abs(brickDensity - waterDensity) < 10} />
          <DataRow label="উপরের অংশের গভীরতা" value={Math.max(0, currentWaterLevel - brickTopY)} unit="m" />
          <DataRow label="নিচের অংশের গভীরতা" value={Math.max(0, currentWaterLevel - brickBottomY)} unit="m" />
        </div>

        <div className="space-y-1 pt-3 border-t border-white/5">
          <h4 className="text-[11px] font-bold text-gray-600 mb-3 font-heading">বলসমূহ</h4>
          <DataRow label="ওজন (W)" value={weight} unit="N" />
          <DataRow label="প্লবন বল (F_B)" value={displayBuoyantForce} unit="N" />
          <DataRow label="লব্ধি বল" value={Math.abs(displayNetForce)} unit="N" highlight />
        </div>

        <div className="space-y-1 pt-3 border-t border-white/5">
          <h4 className="text-[11px] font-bold text-gray-600 mb-3 font-heading">চাপ (P = ρgh)</h4>
          <DataRow label="P_top" value={pTop} unit="Pa" />
          <DataRow label="P_bottom" value={pBottom} unit="Pa" />
          <DataRow label="F_upper (P_top × A)" value={forceUpper} unit="N" />
          <DataRow label="F_lower (P_bottom × A)" value={forceLower} unit="N" />
          <DataRow label="ΔF (F_lower - F_upper)" value={forceLower - forceUpper} unit="N" />
        </div>


        <div className="pt-4 pb-2 border-t border-white/5">
          <h4 className="text-[11px] font-bold text-gray-600 mb-4 font-heading">বলের ভারসাম্য</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[11px] text-gray-400 mb-1.5">
                <span>ওজন ↓</span>
                <span className="font-mono text-red-400">{weight.toFixed(0)} N</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full transition-all duration-200" style={{ width: `${weightPercent}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-gray-400 mb-1.5">
                <span>প্লবন বল ↑</span>
                <span className="font-mono text-blue-400">{displayBuoyantForce.toFixed(0)} N</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-200" style={{ width: `${buoyantPercent}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
