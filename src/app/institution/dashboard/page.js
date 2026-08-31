"use client";

import { Card } from '@/components/ui/card';

export default function InstitutionDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 p-10 lg:p-16">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-[#1A1A1A] pb-8">
        <div>
          <div className="text-[10px] font-mono text-[#00FFCC] uppercase tracking-[0.2em] mb-4">Institution Profile</div>
          <h1 className="text-4xl font-bold uppercase tracking-tighter mb-4">Dhaka College.</h1>
          <p className="text-[#888888] text-sm">System diagnostic: 500 active seats. 30 pending invites.</p>
        </div>
      </div>

      {/* Brutalist Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[#1A1A1A] border border-[#1A1A1A]">
        <StatBlock label="Total Students" value="470" />
        <StatBlock label="Active Classes" value="12" />
        <StatBlock label="Avg Score" value="84%" />
        <StatBlock label="License Usage" value="94%" />
      </div>

    </div>
  );
}

function StatBlock({ label, value }) {
  return (
    <div className="bg-black p-8">
      <div className="text-[10px] font-mono text-[#888888] uppercase tracking-[0.2em] mb-8">{label}</div>
      <div className="text-5xl font-bold tracking-tighter">{value}</div>
    </div>
  );
}
