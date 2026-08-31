"use client";

import { Card } from '@/components/ui/card';

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-16">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-[#1A1A1A] pb-8">
        <div>
          <div className="text-[10px] font-mono text-[#FF3366] uppercase tracking-[0.2em] mb-4">Security Level: Maximum</div>
          <h1 className="text-4xl font-bold uppercase tracking-tighter mb-4">Command Center.</h1>
          <p className="text-[#888888] text-sm">System diagnostic: All computational nodes online.</p>
        </div>
      </div>

      {/* Brutalist Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[#1A1A1A] border border-[#1A1A1A]">
        <StatBlock label="Active Users" value="1,204" />
        <StatBlock label="Simulations" value="48" />
        <StatBlock label="Institutions" value="12" />
        <StatBlock label="Server Load" value="23%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="text-xl font-bold uppercase tracking-tighter border-b border-[#1A1A1A] pb-4">Recent Activity Logs</h2>
          <div className="border border-[#1A1A1A] bg-black">
            <ActivityItem action="User Registered" target="ID: 8492" timestamp="10:02:44" />
            <ActivityItem action="Simulation Executed" target="Physics: Gravity" timestamp="09:45:12" />
            <ActivityItem action="Institution Created" target="Dhaka College" timestamp="08:12:00" />
          </div>
        </div>
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

function ActivityItem({ action, target, timestamp }) {
  return (
    <div className="p-6 border-b border-[#1A1A1A] last:border-0 group hover:bg-[#0A0A0A] transition-colors flex gap-4">
      <div>
        <div className="text-[10px] font-mono text-[#888888] uppercase tracking-widest mb-1">{timestamp}</div>
        <div className="text-sm font-bold uppercase tracking-tight text-white mb-1">{action}</div>
        <div className="text-xs text-[#555555]">{target}</div>
      </div>
    </div>
  );
}
