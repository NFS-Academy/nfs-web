export const metadata = {
  title: 'Manifesto | NFS Academy',
  description: 'Our pedagogical philosophy. Replacing static diagrams with real-time computational models.',
};

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col items-center py-24 px-8 md:px-16">
      <div className="max-w-4xl w-full flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="text-[#FF3366] font-mono text-[10px] uppercase tracking-widest">System Documentation</div>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">The NFS Manifesto</h1>
          <p className="text-[#888888] font-mono text-sm max-w-2xl mt-4 leading-relaxed">
            Education has stagnated in the era of rote memorization. We are building the computational infrastructure to end it.
          </p>
        </div>
        
        {/* Architecture Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-[#1A1A1A]">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold tracking-tight text-[#00FFCC]">01. Zero Cognitive Slop</h2>
            <p className="text-[#AAAAAA] text-sm leading-relaxed">
              Modern textbooks are filled with static, un-verifiable diagrams. When a student sees a block sliding down an inclined plane on a page, they are forced to imagine the physics. We replace the page with a real-time computation engine. If the friction coefficient changes, the simulation reacts at 60 frames per second. 
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold tracking-tight text-[#00FFCC]">02. Telemetry, Not Tests</h2>
            <p className="text-[#AAAAAA] text-sm leading-relaxed">
              Standardized testing measures recall, not mastery. The NFS Academy engine tracks the precise interactions a student makes within a simulation workspace. We map the variables they manipulate and the hypotheses they test, generating a high-fidelity telemetry profile of their scientific intuition.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-8 flex flex-col gap-8 mt-8 hover:border-[#333333] transition-colors">
          <div className="font-mono text-xs text-[#888888] uppercase tracking-widest border-b border-[#1A1A1A] pb-4">Core Principles</div>
          
          <ul className="flex flex-col gap-6 font-mono text-sm text-[#CCCCCC]">
            <li className="flex items-start gap-4">
              <span className="text-[#FF3366]">[{'>'}]</span>
              <span>Truth is derived from mathematics, not authority.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-[#FF3366]">[{'>'}]</span>
              <span>Visuals must serve the physics, not the other way around.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-[#FF3366]">[{'>'}]</span>
              <span>Interactive complexity builds intuition faster than passive reading.</span>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}
