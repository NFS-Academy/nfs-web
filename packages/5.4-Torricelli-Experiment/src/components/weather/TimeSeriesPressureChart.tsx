'use client';

import React from 'react';
import { toBanglaNumber } from '../../lib/physics';

interface TimeSeriesPressureChartProps {
  dataPoints: Array<{ time: string; pressureHPa: number; heightCm: number }>;
  title?: string;
}

export const TimeSeriesPressureChart: React.FC<TimeSeriesPressureChartProps> = ({
  dataPoints,
  title = 'সময় বনাম বায়ুচাপের পরিবর্তনের ধারা',
}) => {
  if (!dataPoints || dataPoints.length === 0) return null;

  const svgWidth = 500;
  const svgHeight = 220;
  const padding = { top: 20, right: 25, bottom: 40, left: 55 };

  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const pressures = dataPoints.map((d) => d.pressureHPa);
  const minP = Math.min(...pressures, 960) - 5;
  const maxP = Math.max(...pressures, 1030) + 5;

  const getX = (index: number) => {
    if (dataPoints.length <= 1) return padding.left + plotWidth / 2;
    return padding.left + (index / (dataPoints.length - 1)) * plotWidth;
  };

  const getY = (pressure: number) => {
    return padding.top + plotHeight - ((pressure - minP) / (maxP - minP)) * plotHeight;
  };

  const polylinePoints = dataPoints
    .map((d, i) => `${getX(i)},${getY(d.pressureHPa)}`)
    .join(' ');

  return (
    <div className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          {title}
        </h4>
        <span className="text-[11px] text-slate-400 font-mono">
          সর্বশেষ: {toBanglaNumber(dataPoints[dataPoints.length - 1].pressureHPa, 1)} hPa
        </span>
      </div>

      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none">
        {/* Y Axis Grid Lines */}
        {[minP, (minP + maxP) / 2, maxP].map((p, i) => {
          const y = getY(p);
          return (
            <g key={`y-grid-${i}`}>
              <line
                x1={padding.left}
                y1={y}
                x2={svgWidth - padding.right}
                y2={y}
                stroke="#1e293b"
                strokeDasharray="3 3"
              />
              <text
                x={padding.left - 6}
                y={y + 3}
                textAnchor="end"
                className="fill-slate-400 text-[10px] font-mono"
              >
                {toBanglaNumber(p, 0)}
              </text>
            </g>
          );
        })}

        {/* X Axis & Ticks */}
        <line
          x1={padding.left}
          y1={padding.top + plotHeight}
          x2={svgWidth - padding.right}
          y2={padding.top + plotHeight}
          stroke="#475569"
          strokeWidth="1.5"
        />

        {dataPoints.map((d, i) => {
          const x = getX(i);
          return (
            <text
              key={`x-label-${i}`}
              x={x}
              y={padding.top + plotHeight + 18}
              textAnchor="middle"
              className="fill-slate-400 text-[10px] font-mono"
            >
              {d.time}
            </text>
          );
        })}

        {/* Area fill under curve */}
        <polygon
          points={`${getX(0)},${padding.top + plotHeight} ${polylinePoints} ${getX(
            dataPoints.length - 1
          )},${padding.top + plotHeight}`}
          fill="url(#pressureGradient)"
          opacity="0.25"
        />

        {/* Linear Gradient Definition */}
        <defs>
          <linearGradient id="pressureGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Trend Polyline */}
        <polyline
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2.5"
          points={polylinePoints}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data Circles */}
        {dataPoints.map((d, i) => {
          const cx = getX(i);
          const cy = getY(d.pressureHPa);
          return (
            <g key={`point-${i}`}>
              <circle cx={cx} cy={cy} r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
              <text
                x={cx}
                y={cy - 8}
                textAnchor="middle"
                className="fill-amber-300 text-[9px] font-mono font-bold"
              >
                {toBanglaNumber(d.heightCm, 1)}cm
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
