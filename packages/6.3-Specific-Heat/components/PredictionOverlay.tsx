import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, Hexagon, Box } from 'lucide-react';

interface PredictionOverlayProps {
  onPredict: (material: 'water' | 'iron' | 'copper') => void;
  predicted: string | null;
  mode: 'sameHeat' | 'sameTemp';
}

export function PredictionOverlay({ onPredict, predicted, mode }: PredictionOverlayProps) {
  const [selected, setSelected] = useState<'water' | 'iron' | 'copper' | null>(null);

  if (predicted) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fdfdfb]/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl shadow-xl border border-[#d1d1c4] max-w-lg w-full text-center"
      >
        <span className="text-[#8a8a70] font-bold tracking-widest uppercase text-xs mb-2 block font-heading">অনুমান</span>
        <h2 className="text-2xl font-heading font-bold text-[#5a5a40] mb-6">
          {mode === 'sameHeat' 
            ? "একই পরিমাণ তাপ প্রয়োগ করলে কোন পদার্থের তাপমাত্রা সবচেয়ে দ্রুত বৃদ্ধি পাবে?" 
            : "একই তাপমাত্রায় পৌঁছাতে কোন পদার্থের সবচেয়ে বেশি তাপের প্রয়োজন হবে?"}
        </h2>
        <div className="grid grid-cols-3 gap-4 font-heading">
          <button 
            onClick={() => setSelected('water')} 
            className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${selected === 'water' ? 'border-[#1d4ed8] bg-[#dbeafe] shadow-md' : 'border-[#dbeafe] bg-[#eff6ff] hover:bg-[#dbeafe]'} text-[#1d4ed8]`}
          >
            <Droplet className="mb-2" />
            <span className="font-bold">পানি</span>
          </button>
          <button 
            onClick={() => setSelected('iron')} 
            className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${selected === 'iron' ? 'border-[#374151] bg-[#e5e7eb] shadow-md' : 'border-[#e5e7eb] bg-[#f3f4f6] hover:bg-[#e5e7eb]'} text-[#374151]`}
          >
            <Hexagon className="mb-2" />
            <span className="font-bold">লোহা</span>
          </button>
          <button 
            onClick={() => setSelected('copper')} 
            className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${selected === 'copper' ? 'border-[#92400e] bg-[#fef3c7] shadow-md' : 'border-[#fef3c7] bg-[#fffbeb] hover:bg-[#fef3c7]'} text-[#92400e]`}
          >
            <Box className="mb-2" />
            <span className="font-bold">তামা</span>
          </button>
        </div>
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
            >
              <button
                onClick={() => onPredict(selected)}
                className="w-full py-4 rounded-xl bg-[#5a5a40] text-white font-bold text-lg hover:bg-[#4a4a30] transition-colors shadow-lg font-heading"
              >
                পরীক্ষা শুরু করুন
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
