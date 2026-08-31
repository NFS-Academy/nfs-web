export default function SimulationBuilder() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Simulation Builder</h1>
          <p className="text-gray-400">Configure parameters, variables, and formulas for interactive labs.</p>
        </div>
        <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Create New
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-950/50">
          <h3 className="font-bold text-lg text-white">Newton's Second Law</h3>
          <div className="flex gap-2">
            <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20">Draft (v1.2)</span>
            <button className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded font-medium">Publish Update</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800">
          
          {/* Variables config */}
          <div className="p-6 space-y-6">
            <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Input Variables</h4>
            
            <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
              <div className="flex justify-between mb-2">
                <span className="font-mono text-green-400 font-bold">force_applied</span>
                <span className="text-xs text-gray-500">Slider</span>
              </div>
              <div className="text-sm text-gray-400 mb-2">Label: Applied Force (F)</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-gray-900 p-2 rounded text-center"><span className="block text-gray-500 mb-1">Min</span>0</div>
                <div className="bg-gray-900 p-2 rounded text-center"><span className="block text-gray-500 mb-1">Max</span>100</div>
                <div className="bg-gray-900 p-2 rounded text-center"><span className="block text-gray-500 mb-1">Unit</span>N</div>
              </div>
            </div>

            <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
              <div className="flex justify-between mb-2">
                <span className="font-mono text-blue-400 font-bold">mass</span>
                <span className="text-xs text-gray-500">Slider</span>
              </div>
              <div className="text-sm text-gray-400 mb-2">Label: Mass (m)</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-gray-900 p-2 rounded text-center"><span className="block text-gray-500 mb-1">Min</span>1</div>
                <div className="bg-gray-900 p-2 rounded text-center"><span className="block text-gray-500 mb-1">Max</span>50</div>
                <div className="bg-gray-900 p-2 rounded text-center"><span className="block text-gray-500 mb-1">Unit</span>kg</div>
              </div>
            </div>
            
            <button className="w-full py-2 border border-dashed border-gray-700 text-gray-400 rounded hover:text-white hover:border-gray-500 text-sm">
              + Add Variable
            </button>
          </div>

          {/* Formulas config */}
          <div className="p-6 space-y-6">
            <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Formula Engine</h4>
            
            <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-3">
              <div className="text-xs text-gray-500">Step 1: Calculate Net Force</div>
              <div className="font-mono text-sm bg-gray-900 p-2 rounded border border-gray-800 text-gray-300">
                const f_net = force_applied - (mass * 9.8 * friction_coef)
              </div>
            </div>

            <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-3">
              <div className="text-xs text-gray-500">Step 2: Calculate Acceleration</div>
              <div className="font-mono text-sm bg-gray-900 p-2 rounded border border-gray-800 text-gray-300">
                const a = Math.max(0, f_net / mass)
              </div>
            </div>

            <button className="w-full py-2 border border-dashed border-gray-700 text-gray-400 rounded hover:text-white hover:border-gray-500 text-sm">
              + Add Step
            </button>
          </div>

          {/* Visual mapping config */}
          <div className="p-6 space-y-6">
            <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Visual Mapping</h4>
            
            <div className="text-sm text-gray-400">
              Bind calculated formulas to the React Canvas component.
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between bg-gray-950 p-2 rounded border border-gray-800 text-sm">
                <span className="text-gray-300">Box.width</span>
                <span className="font-mono text-green-400">mass * 10</span>
              </div>
              <div className="flex items-center justify-between bg-gray-950 p-2 rounded border border-gray-800 text-sm">
                <span className="text-gray-300">Box.speedX</span>
                <span className="font-mono text-green-400">a</span>
              </div>
              <div className="flex items-center justify-between bg-gray-950 p-2 rounded border border-gray-800 text-sm">
                <span className="text-gray-300">Arrow.length</span>
                <span className="font-mono text-green-400">force_applied * 2</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-800">
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded text-sm font-medium transition-colors">
                Open Fullscreen Preview
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
