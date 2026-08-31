import Link from 'next/link';

export default function ConceptPage({ params }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 flex gap-2">
        <Link href="/catalog" className="hover:text-gray-300">Physics (9-10)</Link>
        <span>/</span>
        <span className="text-gray-300">Chapter 3: Force</span>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Newton's Second Law</h1>
        <p className="text-gray-400 text-lg">
          Understand how force, mass, and acceleration are related. The rate of change of momentum of a body is directly proportional to the applied force.
        </p>
      </div>

      {/* Action Area */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">Interactive Simulation</h3>
          <p className="text-gray-400 text-sm">Push a block on different surfaces to see how mass and friction affect acceleration.</p>
        </div>
        <Link href="/workspace/newtons-second-law" className="shrink-0 bg-green-600 hover:bg-green-500 text-white font-medium py-3 px-8 rounded-lg transition-colors">
          Open Simulation
        </Link>
      </div>

      {/* Formulas */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Key Formulas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
            <div className="text-2xl font-serif text-green-400 mb-2">F = ma</div>
            <p className="text-sm text-gray-400">Force equals mass times acceleration.</p>
            <div className="mt-4 pt-4 border-t border-gray-800 text-xs text-gray-500 flex justify-between">
              <span>F = Force (Newtons, N)</span>
              <span>m = Mass (kg)</span>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
            <div className="text-2xl font-serif text-green-400 mb-2">F = (mv - mu) / t</div>
            <p className="text-sm text-gray-400">Force is the rate of change of momentum.</p>
            <div className="mt-4 pt-4 border-t border-gray-800 text-xs text-gray-500 flex justify-between">
              <span>v = Final velocity</span>
              <span>u = Initial velocity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Practice */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
        <h3 className="text-lg font-bold text-white mb-2">Test Your Knowledge</h3>
        <p className="text-gray-400 text-sm mb-4">Try 5 board-style practice problems based on this concept.</p>
        <Link href={`/practice/${params?.id || 'newtons-second-law'}`} className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded border border-gray-700 transition-colors">
          Start Practice
        </Link>
      </div>
    </div>
  );
}
