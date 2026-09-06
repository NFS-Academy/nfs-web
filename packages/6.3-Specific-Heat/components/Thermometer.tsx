import React from 'react';

interface ThermometerProps {
  temp: number;
  maxTemp?: number;
}

export function Thermometer({ temp, maxTemp = 300 }: ThermometerProps) {
  const percentage = Math.min(100, Math.max(0, (temp / maxTemp) * 100));

  return (
    <div className="relative w-10 h-40 bg-[#e1e1d8] rounded-full overflow-hidden border-2 border-[#5a5a40]">
      <div 
        className="absolute bottom-0 w-full bg-red-500 transition-all duration-300 ease-linear"
        style={{ height: `${percentage}%` }}
      />
    </div>
  );
}
