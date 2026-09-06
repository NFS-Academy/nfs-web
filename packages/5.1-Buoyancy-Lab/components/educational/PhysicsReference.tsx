import { BookOpen } from 'lucide-react';

export function PhysicsReference() {
  return (
    <div className="bg-[#111111] p-4 rounded-xl border border-white/10 flex flex-col gap-3 font-body">
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-emerald-400" />
        <h3 className="text-white/90 font-medium tracking-wide text-sm font-heading">সূত্রাবলী</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
        <div className="p-2 bg-white/5 rounded border border-white/5">
          <div className="text-white/40 mb-1 font-heading">ঘনত্ব</div>
          <div className="font-mono text-white/90">ρ = m / V</div>
        </div>
        
        <div className="p-2 bg-white/5 rounded border border-white/5">
          <div className="text-white/40 mb-1 font-heading">ওজন</div>
          <div className="font-mono text-white/90">W = mg</div>
        </div>

        <div className="p-2 bg-white/5 rounded border border-white/5">
          <div className="text-white/40 mb-1 font-heading">প্লবন বল</div>
          <div className="font-mono text-white/90">F_B = ρgV</div>
        </div>

        <div className="p-2 bg-white/5 rounded border border-white/5">
          <div className="text-white/40 mb-1 font-heading">চাপ</div>
          <div className="font-mono text-white/90">P = ρgh</div>
        </div>
      </div>

      <div className="mt-2 text-[11px] text-white/60 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded">
        <strong className="text-emerald-400 block mb-1 font-heading text-xs">আর্কিমিডিসের সূত্র:</strong>
        কোনো বস্তুকে স্থির তরলে আংশিক বা সম্পূর্ণ নিমজ্জিত করলে বস্তুটি যে ওজন হারায়, তা বস্তুটি দ্বারা অপসারিত তরলের ওজনের সমান।
      </div>
    </div>
  );
}
