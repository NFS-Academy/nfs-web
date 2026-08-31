export default function CurriculumCMS() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Curriculum CMS</h1>
          <p className="text-gray-400">Manage classes, subjects, chapters, and concepts.</p>
        </div>
        <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Add Content
        </button>
      </div>

      <div className="flex gap-6 h-[600px]">
        {/* Left Tree View */}
        <div className="w-1/3 bg-gray-900 border border-gray-800 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 bg-gray-950 font-medium text-sm">
            Content Tree
          </div>
          <div className="p-4 overflow-y-auto space-y-1 text-sm">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-4 h-4 text-center">▾</span> Class 9-10
            </div>
            <div className="pl-6 space-y-1">
              <div className="font-semibold text-gray-200 flex items-center gap-2">
                <span className="w-4 h-4 text-center">▾</span> Physics
              </div>
              <div className="pl-6 space-y-1">
                <div className="text-gray-400 hover:text-white cursor-pointer py-1">Chapter 1: Physical Quantities</div>
                <div className="text-gray-400 hover:text-white cursor-pointer py-1">Chapter 2: Motion</div>
                <div className="text-green-400 bg-gray-800/50 rounded px-2 py-1 cursor-pointer font-medium border border-gray-700">Chapter 3: Force</div>
                <div className="text-gray-400 hover:text-white cursor-pointer py-1">Chapter 4: Work, Power, Energy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Editor View */}
        <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 bg-gray-950 flex justify-between items-center">
            <div className="font-medium text-sm text-gray-300">Editing: <span className="text-white font-bold">Chapter 3: Force</span></div>
            <div className="flex gap-2">
              <button className="text-xs border border-gray-700 text-gray-300 px-3 py-1.5 rounded hover:bg-gray-800">Preview</button>
              <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-500">Save Draft</button>
            </div>
          </div>
          
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Title (English)</label>
                <input type="text" className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2.5 text-white" defaultValue="Force" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Title (Bengali)</label>
                <input type="text" className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2.5 text-white font-bengali" defaultValue="বল" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Description / Objective</label>
              <textarea className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white h-24" defaultValue="Understand Newton's laws of motion, momentum, friction, and their real-world applications."></textarea>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Concepts within this chapter</label>
                <button className="text-xs text-green-500 hover:text-green-400">+ Add Concept</button>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-gray-950 border border-gray-800 rounded-lg flex justify-between items-center group hover:border-gray-600 cursor-pointer">
                  <span className="text-sm font-medium text-gray-200">3.1 Newton's First Law</span>
                  <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">Published</span>
                </div>
                <div className="p-3 bg-gray-950 border border-gray-800 rounded-lg flex justify-between items-center group hover:border-gray-600 cursor-pointer">
                  <span className="text-sm font-medium text-gray-200">3.2 Momentum & Collision</span>
                  <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">Draft</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
