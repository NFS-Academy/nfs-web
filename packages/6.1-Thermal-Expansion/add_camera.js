const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const cameraSection = `
            {labModule === "fundamental" && (
              <section className="bg-white/5 rounded-2xl border border-white/10 p-4 space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/60">
                  ক্যামেরা মোড
                </h2>
                <div className="flex gap-2">
                  {(["split", "rod", "atomic"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setCameraMode(mode)}
                      className={\`flex-1 py-1.5 text-[10px] uppercase font-bold border rounded transition-colors \${cameraMode === mode ? "bg-orange-500/20 text-orange-400 border-orange-500/50" : "bg-black/40 text-white/40 border-white/10 hover:bg-white/5"}\`}
                    >
                      {mode === "split" ? "বিভক্ত দৃশ্য" : mode === "rod" ? "দণ্ডের দৃশ্য" : "অণু দৃশ্য"}
                    </button>
                  ))}
                </div>
              </section>
            )}
`;

code = code.replace(
  /{labModule === "fundamental" && \(\s*<>\s*{\/\* Materials \*\/}/,
  cameraSection + '\n            {labModule === "fundamental" && (\n              <>\n                {/* Materials */}'
);

fs.writeFileSync('app/page.tsx', code);
