'use client';

import React from 'react';
import { ObservationRecord } from '../../lib/types';
import { toBanglaNumber, calculateHeightCmFromHPa } from '../../lib/physics';

interface PressureHeightChartProps {
  records: ObservationRecord[];
  currentPressureHPa: number;
  currentHeightCm: number;
}

export const PressureHeightChart: React.FC<PressureHeightChartProps> = ({
  records,
  currentPressureHPa,
  currentHeightCm,
}) => {
  // Graph bounds
  const minP = 940;
  const maxP = 1060;
  const minH = 70;
  const maxH = 80;

  const svgWidth = 540;
  const svgHeight = 280;
  const padding = { top: 25, right: 30, bottom: 45, left: 55 };

  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // Coordinate transforms
  const getX = (pressure: number) => {
    const clamped = Math.max(minP, Math.min(maxP, pressure));
    return padding.left + ((clamped - minP) / (maxP - minP)) * plotWidth;
  };

  const getY = (height: number) => {
    const clamped = Math.max(minH, Math.min(maxH, height));
    return padding.top + plotHeight - ((clamped - minH) / (maxH - minH)) * plotHeight;
  };

  // Theoretical line endpoints
  const lineStart = { x: getX(minP), y: getY(calculateHeightCmFromHPa(minP)) };
  const lineEnd = { x: getX(maxP), y: getY(calculateHeightCmFromHPa(maxP)) };

  // X Axis Ticks (950, 975, 1000, 1013, 1025, 1050)
  const xTicks = [950, 975, 1000, 1013.25, 1025, 1050];
  // Y Axis Ticks (70, 72, 74, 76, 78, 80)
  const yTicks = [70, 72, 74, 76, 78, 80];

  return (
    <div className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          বায়ুচাপ বনাম পারদস্তম্ভের উচ্চতার লেখচিত্র (P vs h Graph)
        </h4>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-3 h-0.5 bg-cyan-500/60 inline-block" /> তাত্ত্বিক রেখা (<strong>P</strong> = <strong>ρgh</strong>)
          </span>
          <span className="flex items-center gap-1 text-amber-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> সংগৃহীত উপাত্ত
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto max-h-[300px] select-none"
        >
          {/* Grid lines */}
          {yTicks.map((h) => {
            const y = getY(h);
            return (
              <g key={`grid-y-${h}`}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-400 text-[10px] font-mono"
                >
                  {toBanglaNumber(h, 0)}
                </text>
              </g>
            );
          })}

          {xTicks.map((p) => {
            const x = getX(p);
            return (
              <g key={`grid-x-${p}`}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={padding.top + plotHeight}
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={padding.top + plotHeight + 18}
                  textAnchor="middle"
                  className="fill-slate-400 text-[10px] font-mono"
                >
                  {toBanglaNumber(p, 0)}
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line
            x1={padding.left}
            y1={padding.top + plotHeight}
            x2={svgWidth - padding.right}
            y2={padding.top + plotHeight}
            stroke="#475569"
            strokeWidth="1.5"
          />
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + plotHeight}
            stroke="#475569"
            strokeWidth="1.5"
          />

          {/* Axis Labels */}
          <text
            x={svgWidth / 2}
            y={svgHeight - 8}
            textAnchor="middle"
            className="fill-slate-300 text-xs font-semibold"
          >
            বায়ুমণ্ডলীয় চাপ P (hPa) →
          </text>
          <text
            x={15}
            y={svgHeight / 2}
            textAnchor="middle"
            transform={`rotate(-90 15 ${svgHeight / 2})`}
            className="fill-slate-300 text-xs font-semibold"
          >
            পারদের উচ্চতা h (cm) →
          </text>

          {/* Theoretical Linear Curve (P = ρgh) */}
          <line
            x1={lineStart.x}
            y1={lineStart.y}
            x2={lineEnd.x}
            y2={lineEnd.y}
            stroke="#06b6d4"
            strokeWidth="2"
            strokeDasharray="4 2"
          />

          {/* Recorded Observation Points */}
          {records.map((r, idx) => {
            const cx = getX(r.pressureHPa);
            const cy = getY(r.heightCm);
            return (
              <g key={r.id || idx} className="cursor-pointer group">
                <circle
                  cx={cx}
                  cy={cy}
                  r="5.5"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="transition-transform group-hover:scale-125"
                />
                {/* Tooltip on hover */}
                <title>{`পরীক্ষা ${toBanglaNumber(r.testNumber, 0)}: ${toBanglaNumber(r.pressureHPa, 1)} hPa → ${toBanglaNumber(r.heightCm, 1)} cm`}</title>
              </g>
            );
          })}

          {/* Current Live Active Point */}
          <g>
            <circle
              cx={getX(currentPressureHPa)}
              cy={getY(currentHeightCm)}
              r="8"
              fill="#ef4444"
              opacity="0.3"
              className="animate-ping"
            />
            <circle
              cx={getX(currentPressureHPa)}
              cy={getY(currentHeightCm)}
              r="6"
              fill="#ef4444"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>

      <div className="mt-2 text-center text-[11px] text-slate-400">
        📌 লাল বিন্দুটি বর্তমান ল্যাবরেটরির লাইভ বায়ুচাপ ও পারদের অবস্থান নির্দেশ করছে।
      </div>
    </div>
  );
};
