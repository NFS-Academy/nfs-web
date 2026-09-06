import Link from 'next/link';
import { hydrateConcept, chapters, subjects } from '@/components/legacy/data/mockData';
import { ArrowLeft, Beaker } from 'lucide-react';
import { notFound } from 'next/navigation';
import SimulationViewer from './SimulationViewer';

export default async function ConceptPage({ params }) {
  const unwrappedParams = await params;
  const concept = hydrateConcept(unwrappedParams.id);
  
  if (!concept) {
    notFound();
  }

  const chapter = chapters.find(c => c.id === concept.chapterId);
  const subject = subjects.find(s => s.id === chapter?.subjectId);

  const simulationUrl = concept.simId ? `/simulations/${concept.simId}` : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white">
      {/* Premium Header */}
      <div className="border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-slate-500 dark:text-[#AAAAAA]">
            <Link href="/catalog" className="hover:text-rose-500 transition-colors flex items-center gap-2">
              <ArrowLeft size={16} /> Directory
            </Link>
            <span>/</span>
            <Link href={`/catalog?subject=${subject?.id}`} className="hover:text-rose-500 transition-colors">{subject?.title}</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white truncate max-w-[200px]">{chapter?.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column: Concept Info */}
        <div className="lg:col-span-1 flex flex-col gap-12">
          <div className="space-y-6">
            <div className="text-[10px] font-mono text-rose-500 uppercase tracking-widest">{concept.sourceRef}</div>
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-none">{concept.title}</h1>
            <p className="text-lg text-slate-600 dark:text-[#AAAAAA] leading-relaxed">
              {concept.objective}
            </p>
          </div>

          {concept.formulas && concept.formulas.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-sm font-mono text-[#AAAAAA] uppercase tracking-widest border-b border-black/5 dark:border-white/10 pb-4">Computational Formulas</h3>
              <div className="flex flex-col gap-4">
                {concept.formulas.map(formula => (
                  <div key={formula.id} className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-6 rounded-2xl shadow-sm">
                    <div className="text-2xl font-serif text-slate-900 dark:text-white mb-4">{formula.display}</div>
                    <div className="text-xs text-slate-500 dark:text-[#888888] font-mono leading-relaxed mb-4">
                      {formula.variables}
                    </div>
                    <div className="text-[10px] font-mono text-rose-500 uppercase tracking-widest border-t border-black/5 dark:border-white/10 pt-4">
                      Unit: {formula.unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 rounded-3xl text-center">
            <div className="w-12 h-12 bg-white dark:bg-black rounded-full flex items-center justify-center mx-auto mb-4 border border-black/5 dark:border-white/10 shadow-sm">
              <Beaker size={20} className="text-rose-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Test Your Knowledge</h3>
            <p className="text-slate-600 dark:text-[#AAAAAA] text-sm mb-6">Put {concept.title} into practice with algorithmic problem sets.</p>
            <Link href={`/practice/${concept.id}`} className="inline-block w-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-xs py-4 px-6 rounded-xl hover:bg-slate-800 dark:hover:bg-gray-200 transition-colors">
              Start Practice
            </Link>
          </div>
        </div>

        {/* Right Column: 3D Simulation Embedded */}
        <SimulationViewer simulationUrl={simulationUrl} />
      </div>
    </div>
  );
}
