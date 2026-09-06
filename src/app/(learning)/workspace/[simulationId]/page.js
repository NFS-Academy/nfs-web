import { getSimulationContent } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import { SimulationRegistry } from '@/simulations/registry';

export default async function Workspace({ params }) {
  const { simulationId } = await params;
  const contentData = getSimulationContent(simulationId);
  
  if (!contentData) {
    notFound();
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-px bg-[#1A1A1A] border border-[#1A1A1A]">
      {/* Top Context Bar */}
      <div className="h-16 bg-black flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-mono bg-[#FF3366] text-black px-2 py-1 uppercase tracking-widest">
            Chapter {contentData.frontmatter.chapter || '0'}
          </div>
          <h2 className="text-xl font-bold uppercase tracking-tighter text-white">{contentData.frontmatter.title}</h2>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" size="sm" className="uppercase text-[10px] tracking-widest">
            Diagnostic Mode
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-px overflow-hidden">
        
        {/* Left Sidebar: Theory Manual (MDX) */}
        <div className="flex-1 max-w-lg bg-black flex flex-col overflow-hidden border-r border-[#1A1A1A]">
          <div className="p-6 border-b border-[#1A1A1A] shrink-0 bg-[#0A0A0A]">
            <h3 className="font-bold uppercase tracking-tighter text-[#888888]">Theory Manual</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 prose prose-invert prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tighter prose-h1:text-3xl prose-h2:text-xl prose-a:text-[#FF3366] prose-strong:text-white max-w-none hide-scrollbar">
            <MDXRemote 
              source={contentData.content} 
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkMath],
                  rehypePlugins: [rehypeKatex],
                },
              }}
            />
          </div>
        </div>

        {/* Right Canvas: Simulation Engine */}
        <div className="flex-[2] bg-black flex flex-col overflow-hidden">
          <div className="h-12 border-b border-[#1A1A1A] bg-[#0A0A0A] flex justify-between items-center px-6 shrink-0 z-30 relative">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#888888] uppercase tracking-widest">Simulation Canvas Active</span>
            </div>
            <div className="flex gap-4">
              <button className="text-[10px] font-mono text-[#888888] hover:text-white uppercase tracking-widest">Reset</button>
            </div>
          </div>
          
          <div className="flex-1 relative overflow-hidden bg-[#050505]">
            {/* Grid Pattern Background - Brutalist dot grid */}
            <div className="absolute inset-0 opacity-20 z-0" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            {/* Simulation Mount Point */}
            {(() => {
              const SimulationComponent = SimulationRegistry[simulationId];
              if (!SimulationComponent) {
                return (
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="text-[#FF3366] mb-4 text-4xl">⚠</div>
                    <div className="text-white text-xl font-bold uppercase tracking-tighter mb-2">SIMULATION OFFLINE</div>
                    <div className="text-[#888888] font-mono text-xs uppercase tracking-widest max-w-sm">
                      The physics model for `{simulationId}` is not currently mounted in the active registry.
                    </div>
                  </div>
                );
              }
              return <SimulationComponent />;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
