const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// We need to modify the structural conditional rendering.
// Find the start of `{/* Left / Center 3D Views */}`
const viewStart = content.indexOf(`{labModule === 'fundamental' && (`);
const sidebarStart = content.indexOf(`{/* Right Sidebar - Controls & Stats */}`);
const endOfPage = content.lastIndexOf(`</div>`); // inside the main component

if (viewStart !== -1 && sidebarStart !== -1) {
  // We need to replace the views section
  let newViews = `
        {/* Left / Center 3D Views */}
        {labModule === 'fundamental' && (
          <div className="flex-1 flex flex-col md:flex-row relative gap-4">
`;
  // The rest of fundamental view is already there. We just need to find where fundamental view ends.
  // It ends before `{/* Right Sidebar - Controls & Stats */}`.
  // BUT we need to add the other views there.

  const viewsContent = content.substring(content.indexOf(`{/* Macro View (Rod) */}`), sidebarStart);
  
  // Replace the structural code
  let rightSidebarContent = content.substring(sidebarStart);
  
  // modify right sidebar content
  rightSidebarContent = rightSidebarContent.replace(
    `{/* Materials */}`,
    `{labModule === 'railway' && (
              <section className="bg-white/5 rounded-2xl border border-white/10 p-4 space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/60">Expansion Gap Mode</h2>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setRailwayHasGap(true)} className={\`px-3 py-2 rounded text-xs font-bold uppercase border transition-colors \${railwayHasGap ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-white/5 border-white/10 text-white/50'}\`}>Mode A: Gap Present (Safe)</button>
                  <button onClick={() => setRailwayHasGap(false)} className={\`px-3 py-2 rounded text-xs font-bold uppercase border transition-colors \${!railwayHasGap ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/5 border-white/10 text-white/50'}\`}>Mode B: No Gap (Danger)</button>
                </div>
              </section>
            )}
            
            {labModule === 'fundamental' && (
              <>
                {/* Materials */}`
  );
  
  rightSidebarContent = rightSidebarContent.replace(
    `{/* Temperature Control */}`,
    `</>
            )}
            
            {/* Temperature Control */}`
  );
  
  // Add closing bracket for the fundamental lab check, and the condition for sidebar
  rightSidebarContent = rightSidebarContent.replace(
    `<div className="w-full md:w-[320px] flex flex-col overflow-y-auto z-10 gap-4">`,
    `{labModule !== 'gallery' && labModule !== 'summary' && (
          <div className="w-full md:w-[320px] flex flex-col overflow-y-auto z-10 gap-4">`
  );
  
  rightSidebarContent = rightSidebarContent.replace(
    `{/* Formula Panel */}`,
    `{labModule !== 'railway' && (
              <>
                {/* Formula Panel */}`
  );
  
  // And close it at the end of the sidebar
  rightSidebarContent = rightSidebarContent.replace(
    `</div>
      </div>
    </div>
  );`,
    `          </div>
            )}
          </>
        )}
          </div>
        )}
      </div>
    </div>
  );`
  );

  // Now, what about the new views?
  let extraViews = `
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

`;

  let newContent = content.substring(0, viewStart) + 
                   `{/* Left / Center 3D Views */}
        {labModule === 'fundamental' && (
          <div className="flex-1 flex flex-col md:flex-row relative gap-4">` + 
                   viewsContent + 
                   extraViews + 
                   rightSidebarContent;
                   
  fs.writeFileSync('app/page.tsx', newContent);
  console.log('Successfully updated page.tsx');
} else {
  console.log('Could not find injection points');
}
