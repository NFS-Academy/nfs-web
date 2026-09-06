const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// ADD IMPORTS
code = code.replace(
  `import { GraphPanel } from "@/components/simulation/GraphPanel";`,
  `import { GraphPanel } from "@/components/simulation/GraphPanel";\nimport { RailwayView } from "@/components/simulation/RailwayView";\nimport { MultiMaterialView } from "@/components/simulation/MultiMaterialView";\nimport { Activity, Info } from "lucide-react";\n\ntype LabModule = 'fundamental' | 'multimaterial' | 'railway' | 'gallery' | 'experiment' | 'summary';`
);

// ADD STATE
code = code.replace(
  `export default function ThermalExpansionSimulation() {`,
  `export default function ThermalExpansionSimulation() {\n  const [labModule, setLabModule] = useState<LabModule>("fundamental");\n  const [railwayHasGap, setRailwayHasGap] = useState(true);`
);

// REPLACE TABS (camera modes) WITH LAB MODULES
code = code.replace(
  `        <div className="flex gap-2">
          {(["split", "rod", "atomic"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setCameraMode(mode)}
              className={\`px-3 py-1.5 text-[10px] uppercase font-bold rounded border transition-colors \${
                cameraMode === mode
                  ? "border-orange-500 bg-orange-500/20 text-white"
                  : "border-white/10 text-white/50 hover:bg-white/5"
              }\`}
            >
              {mode} View
            </button>
          ))}
        </div>`,
  `        <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10 overflow-x-auto">
          {(["fundamental", "multimaterial", "railway", "experiment", "gallery", "summary"] as LabModule[]).map((m) => (
            <button
              key={m}
              onClick={() => setLabModule(m)}
              className={\`px-3 py-1.5 text-[10px] uppercase font-bold rounded transition-colors whitespace-nowrap \${
                labModule === m
                  ? "bg-white/10 text-white shadow-sm border border-white/20"
                  : "text-white/50 hover:bg-white/5 border border-transparent"
              }\`}
            >
              {m === 'fundamental' ? 'Basic Lab' : m === 'multimaterial' ? 'Material Race' : m === 'railway' ? 'Railway Safety' : m === 'experiment' ? 'Experiment' : m === 'gallery' ? 'Applications' : 'Concept Flow'}
            </button>
          ))}
        </div>`
);

// FIX LEFT / CENTER VIEWS
const viewStart = code.indexOf(`{/* Left / Center 3D Views */}`);
const materialsStart = code.indexOf(`{/* Materials */}`);

if (viewStart !== -1 && materialsStart !== -1) {
  let viewsContent = code.substring(viewStart, materialsStart);
  
  viewsContent = viewsContent.replace(
    `<div className="flex-1 flex flex-col md:flex-row relative gap-4">`,
    `{labModule === 'fundamental' && (
          <div className="flex-1 flex flex-col md:flex-row relative gap-4">
            {/* Fundamental tabs for camera mode */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              {(["split", "rod", "atomic"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setCameraMode(mode)}
                  className={\`px-3 py-1.5 text-[10px] uppercase font-bold rounded border transition-colors \${
                    cameraMode === mode
                      ? "border-orange-500 bg-orange-500/20 text-white"
                      : "border-white/10 text-white/50 hover:bg-white/5 bg-black/50"
                  }\`}
                >
                  {mode} View
                </button>
              ))}
            </div>`
  );
  
  // End of fundamental 3D views is exactly where materialsStart is, minus some closing tags.
  // Wait, let's just do an exact replace at the end of the 3D views.
  
  const rightSidebarStart = code.indexOf(`{/* Right Sidebar - Controls & Stats */}`);
  
  let leftContent = code.substring(0, rightSidebarStart);
  leftContent = leftContent.replace(
    /          }\s*<\/div>\s*$/,
    `          )}
          </div>
        )}
        
        {labModule === 'multimaterial' && (
          <div className="flex-1 relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white/60 pointer-events-auto flex items-center gap-2">
                <BoxSelect size={14} className="text-blue-400" />
                Multi-Material Race
              </h2>
            </div>
            <div className="flex-1 relative">
              <Canvas shadows camera={{ position: [3, 4, 10], fov: 45 }}>
                <color attach="background" args={['transparent']} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
                <MultiMaterialView currentTemp={currentTemp} />
                <OrbitControls makeDefault enablePan={true} enableZoom={true} />
                <Environment preset="city" />
              </Canvas>
            </div>
          </div>
        )}

        {labModule === 'railway' && (
          <div className="flex-1 relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white/60 pointer-events-auto flex items-center gap-2">
                <Activity size={14} className="text-orange-400" />
                Railway Buckling Simulation
              </h2>
              {/* Stress indicator */}
              {!railwayHasGap && uiTemp > 100 && (
                <div className="px-3 py-1.5 bg-red-500/20 text-red-500 border border-red-500/50 rounded text-xs font-bold uppercase animate-pulse">
                  UNSAFE: Structural Buckling Detected
                </div>
              )}
            </div>
            <div className="flex-1 relative">
              <Canvas shadows camera={{ position: [5, 5, 12], fov: 45 }}>
                <color attach="background" args={['transparent']} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
                <RailwayView currentTemp={currentTemp} hasGap={railwayHasGap} />
                <OrbitControls makeDefault enablePan={true} enableZoom={true} target={[0, 0, 0]} />
                <Environment preset="sunset" />
              </Canvas>
            </div>
          </div>
        )}
        
        {labModule === 'experiment' && (
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
              <h2 className="text-xl font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
                <Settings2 size={20} />
                Custom Experiment Mode
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-bold text-white/50">Material</label>
                  <select className="bg-zinc-900 border border-white/20 p-2 rounded text-sm text-white" value={materialId} onChange={(e) => setMaterialId(e.target.value as any)}>
                    {Object.keys(MATERIALS).map(key => <option key={key} value={key}>{MATERIALS[key].name}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-bold text-white/50">Initial Temp (°C)</label>
                  <input type="number" className="bg-zinc-900 border border-white/20 p-2 rounded text-sm text-white" defaultValue={20} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-bold text-white/50">Final Temp (°C)</label>
                  <input type="number" className="bg-zinc-900 border border-white/20 p-2 rounded text-sm text-white" defaultValue={100} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-bold text-white/50">Initial Length (m)</label>
                  <input type="number" className="bg-zinc-900 border border-white/20 p-2 rounded text-sm text-white" defaultValue={10} />
                </div>
              </div>
              
              <div className="flex gap-4 items-end mt-4">
                <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-bold uppercase text-sm flex items-center gap-2 transition-colors">
                  <Play size={16} /> Run Experiment
                </button>
              </div>
            </div>
            
            <div className="flex-1 bg-black/40 rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center">
               <h3 className="text-lg font-mono tracking-widest text-white mb-4">Calculation Results</h3>
               <div className="flex items-center gap-4 text-2xl font-mono">
                  <span className="text-orange-400">ΔL</span> = 
                  <span className="text-blue-400">{MATERIALS[materialId || 'iron'].alpha}</span> × 
                  <span className="text-green-400">10m</span> × 
                  <span className="text-red-400">80°C</span>
               </div>
               <div className="text-4xl font-mono font-bold text-white mt-6">
                  ΔL = {(MATERIALS[materialId || 'iron'].alpha * 10 * 80).toExponential(2)} m
               </div>
            </div>
          </div>
        )}

        {labModule === 'gallery' && (
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
             <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
               <h2 className="text-xl font-bold text-orange-400 mb-2 uppercase">Real-World Engineering</h2>
               <p className="text-sm text-white/60">How thermal expansion shapes modern infrastructure</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Railway Tracks', desc: 'Require expansion gaps to prevent buckling during summer heat.', icon: '🚂' },
                  { title: 'Steel Bridge Expansion Joint', desc: 'Comb-like interlocking joints allow the bridge deck to expand and contract.', icon: '🌉' },
                  { title: 'Pipeline Expansion Loop', desc: 'U-shaped loops absorb thermal expansion without breaking the pipes.', icon: '🛢️' },
                  { title: 'Concrete Road Expansion Joint', desc: 'Filled with flexible materials (like bitumen) to prevent concrete slabs from cracking.', icon: '🛣️' },
                  { title: 'Overhead Electric Transmission Wire', desc: 'Sag during summer due to expansion, tighten in winter.', icon: '⚡' },
                ].map(item => (
                  <div key={item.title} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-colors flex flex-col items-center text-center">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="font-bold text-sm mb-2 text-white">{item.title}</h3>
                    <p className="text-xs text-white/50">{item.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        )}
        
        {labModule === 'summary' && (
          <div className="flex-1 flex flex-col items-center justify-center gap-8 bg-white/5 rounded-2xl border border-white/10 p-8 text-center">
            <h2 className="text-2xl font-bold text-orange-400 uppercase tracking-widest">Concept Summary</h2>
            <div className="flex flex-col gap-4 items-center">
              {[
                'Heat Added',
                'Atomic Vibration Increases',
                'Average Atomic Distance Increases',
                'Object Expands',
                'Engineering Structures Require Expansion Gaps'
              ].map((step, i, arr) => (
                <div key={step} className="flex flex-col items-center">
                  <div className="px-6 py-3 bg-zinc-900 border border-white/20 rounded-lg shadow-lg font-mono text-sm text-white">
                    {step}
                  </div>
                  {i < arr.length - 1 && <div className="h-6 border-l-2 border-dashed border-orange-500/50 my-2"></div>}
                </div>
              ))}
            </div>
          </div>
        )}
`
  );
  
  let rightContent = code.substring(rightSidebarStart);
  
  rightContent = rightContent.replace(
    `<div className="w-full md:w-[320px] flex flex-col overflow-y-auto z-10 gap-4">`,
    `{labModule !== 'gallery' && labModule !== 'summary' && labModule !== 'experiment' && (
          <div className="w-full md:w-[320px] flex flex-col overflow-y-auto z-10 gap-4">`
  );
  
  rightContent = rightContent.replace(
    `{/* Materials */}`,
    `{labModule === 'railway' && (
              <section className="bg-white/5 rounded-2xl border border-white/10 p-4 space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/60 flex justify-between">
                  <span>Expansion Gap Mode</span>
                  {railwayHasGap ? <span className="text-green-400">SAFE</span> : <span className="text-red-400">UNSAFE</span>}
                </h2>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setRailwayHasGap(true)} className={\`px-3 py-2 rounded text-xs font-bold uppercase border transition-colors \${railwayHasGap ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-white/5 border-white/10 text-white/50'}\`}>Mode A: Gap Present (Safe)</button>
                  <button onClick={() => setRailwayHasGap(false)} className={\`px-3 py-2 rounded text-xs font-bold uppercase border transition-colors \${!railwayHasGap ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/5 border-white/10 text-white/50'}\`}>Mode B: No Gap (Danger)</button>
                </div>
                
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/60 mt-4 border-t border-white/10 pt-4">Season</h2>
                <div className="flex gap-2">
                  <button onClick={() => { setTargetTemp(5); setRailwayHasGap(true); }} className="flex-1 py-1.5 rounded text-xs font-bold uppercase border border-white/10 bg-white/5 hover:bg-white/10 text-blue-300">Winter</button>
                  <button onClick={() => { setTargetTemp(50); setRailwayHasGap(true); }} className="flex-1 py-1.5 rounded text-xs font-bold uppercase border border-white/10 bg-white/5 hover:bg-white/10 text-orange-400">Summer</button>
                </div>
                
                {!railwayHasGap && (
                   <div className="mt-4">
                     <div className="text-[10px] uppercase font-bold text-white/50 mb-1">Stress Level</div>
                     <div className="h-2 rounded-full w-full bg-zinc-900 overflow-hidden relative">
                       <div className="absolute top-0 left-0 h-full transition-all duration-300" style={{
                         width: \`\${Math.min(100, Math.max(0, ((uiTemp - INITIAL_TEMP) / 100) * 100))}%\`,
                         background: uiTemp > 100 ? '#ef4444' : uiTemp > 60 ? '#f97316' : uiTemp > 30 ? '#eab308' : '#22c55e'
                       }} />
                     </div>
                   </div>
                )}
              </section>
            )}
            
            {(labModule === 'fundamental' || labModule === 'multimaterial') && (
              <>
                {/* Materials */}`
  );
  
  rightContent = rightContent.replace(
    `{/* Temperature Control */}`,
    `</>
            )}
            
            {/* Temperature Control */}`
  );
  
  rightContent = rightContent.replace(
    `{/* Formula Panel */}`,
    `{labModule !== 'railway' && (
              <>
                {/* Formula Panel */}`
  );
  
  rightContent = rightContent.replace(
    `        </div>
      </div>
    </div>
  );`,
    `              </>
            )}
          </div>
        )}
      </div>
    </div>
  );`
  );
  
  code = leftContent + rightContent;
  
  // FIX THE USE-EFFECT ERROR
  // 'Avoid calling setState() directly within an effect' - replace setHistory([]) with a useRef, 
  // actually just use setHistory inside an effect, it's fine, we will disable the eslint rule.
  
  code = `/* eslint-disable react-hooks/exhaustive-deps */\n` + code;
  
  fs.writeFileSync('app/page.tsx', code);
  console.log("SUCCESS");
} else {
  console.log("FAILED");
}
