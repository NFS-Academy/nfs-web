const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

if (!code.includes("const [prediction, setPrediction] = useState<string | null>(null);")) {
  code = code.replace(
    `const [railwayHasGap, setRailwayHasGap] = useState(true);`,
    `const [railwayHasGap, setRailwayHasGap] = useState(true);\n  const [prediction, setPrediction] = useState<string | null>(null);\n  const [showResult, setShowResult] = useState(false);`
  );
  
  // Add prediction for Multi-material
  code = code.replace(
    `{/* Multi-Material Race */}`,
    `{/* Multi-Material Race */}`
  );
  
  // Actually, wait, let's just add it dynamically inside the views.
  
  // In multimaterial:
  code = code.replace(
    `<h2 className="text-xs font-bold uppercase tracking-widest text-white/60 pointer-events-auto flex items-center gap-2">
                <BoxSelect size={14} className="text-blue-400" />
                Multi-Material Race
              </h2>`,
    `<h2 className="text-xs font-bold uppercase tracking-widest text-white/60 pointer-events-auto flex items-center gap-2">
                <BoxSelect size={14} className="text-blue-400" />
                Multi-Material Race
              </h2>
              {!prediction && labModule === 'multimaterial' && (
                <div className="absolute top-12 left-0 p-4 bg-black/80 rounded-xl border border-blue-500/50 pointer-events-auto z-50">
                  <h3 className="font-bold text-orange-400 mb-2">Prediction: Which rod expands the most?</h3>
                  <div className="flex gap-2">
                    {['iron', 'copper', 'aluminum', 'brass'].map(m => (
                      <button key={m} onClick={() => setPrediction(m)} className="px-3 py-1.5 bg-white/10 rounded uppercase text-xs font-bold hover:bg-orange-500/20">{m}</button>
                    ))}
                  </div>
                </div>
              )}
              {prediction && uiTemp > 100 && labModule === 'multimaterial' && (
                <div className="absolute top-12 left-0 p-4 bg-black/80 rounded-xl border border-green-500/50 pointer-events-auto z-50">
                  <h3 className="font-bold text-green-400 mb-2">Result</h3>
                  <p className="text-sm">You predicted: {prediction}. The material with the highest coefficient is Aluminum!</p>
                  <button onClick={() => { setPrediction(null); setTargetTemp(20); }} className="mt-2 px-3 py-1 bg-white/10 rounded uppercase text-xs font-bold">Try Again</button>
                </div>
              )}`
  );
  
  // In Railway:
  code = code.replace(
    `{/* Stress indicator */}`,
    `{!prediction && labModule === 'railway' && (
                <div className="absolute top-12 right-0 p-4 bg-black/80 rounded-xl border border-blue-500/50 pointer-events-auto z-50">
                  <h3 className="font-bold text-orange-400 mb-2">Prediction:</h3>
                  <p className="text-sm mb-2 text-white/80">Will the railway remain safe {railwayHasGap ? "with an expansion gap" : "without an expansion gap"}?</p>
                  <div className="flex gap-2">
                    <button onClick={() => setPrediction("safe")} className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded uppercase text-xs font-bold border border-green-500/50 hover:bg-green-500/40">Yes, it's safe</button>
                    <button onClick={() => setPrediction("unsafe")} className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded uppercase text-xs font-bold border border-red-500/50 hover:bg-red-500/40">No, it will buckle</button>
                  </div>
                </div>
              )}
              {prediction && uiTemp > 90 && labModule === 'railway' && (
                <div className="absolute top-12 right-0 p-4 bg-black/80 rounded-xl border border-white/20 pointer-events-auto z-50 max-w-xs">
                  <h3 className="font-bold text-white mb-2">Result</h3>
                  <p className="text-sm text-white/80">You predicted it would be {prediction}.<br/>{railwayHasGap ? "With gaps, the tracks can expand safely!" : "Without gaps, the thermal stress caused buckling!"}</p>
                  <button onClick={() => { setPrediction(null); setTargetTemp(20); }} className="mt-2 px-3 py-1 bg-white/10 rounded uppercase text-xs font-bold text-white hover:bg-white/20">Reset</button>
                </div>
              )}
              {/* Stress indicator */}`
  );
  
  // Reset prediction when module changes
  code = code.replace(
    `export default function ThermalExpansionSimulation() {`,
    `export default function ThermalExpansionSimulation() {`
  );
  
  // add to useEffect of labModule to clear predictions
  code = code.replace(
    `  // Animate temperature change`,
    `  useEffect(() => {\n    setPrediction(null);\n  }, [labModule, railwayHasGap]);\n\n  // Animate temperature change`
  );
  
  fs.writeFileSync('app/page.tsx', code);
}
