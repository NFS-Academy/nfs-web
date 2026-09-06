"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { bootstrapData } from '@/components/legacy/data/mockData';
import { ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const subjectFilter = searchParams.get('subject');
  
  const { subjects, chapters, featuredConcepts } = bootstrapData();
  
  const displaySubjects = subjectFilter 
    ? subjects.filter(s => s.id === subjectFilter)
    : subjects;

  return (
    <div className="max-w-7xl mx-auto space-y-16 py-12 px-8">
      <div className="border-b border-black/5 dark:border-white/10 pb-8">
        <div className="text-[10px] font-mono text-[#AAAAAA] uppercase tracking-[0.2em] mb-4">Directory / Index</div>
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4 text-slate-900 dark:text-white">Curriculum</h1>
        <p className="text-slate-600 dark:text-[#AAAAAA] max-w-xl">Explore the full index of interactive computational models across physics and chemistry.</p>
      </div>

      <div className="flex flex-col gap-16">
        {displaySubjects.map(subject => {
          const subjectChapters = chapters.filter(c => c.subjectId === subject.id);
          
          return (
            <div key={subject.id} className="space-y-8">
              <h2 className="text-3xl font-bold uppercase tracking-tighter text-slate-900 dark:text-white flex items-center gap-4">
                {subject.title} 
                <span className="text-xs font-mono font-normal text-slate-400 dark:text-[#555] uppercase tracking-widest">{subjectChapters.length} Chapters</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden backdrop-blur-3xl shadow-2xl">
                {subjectChapters.map((chapter, idx) => {
                  const chapterConcepts = featuredConcepts.filter(c => c.chapterId === chapter.id);
                  
                  return (
                    <div key={chapter.id} className="bg-white/40 dark:bg-black/40 p-8 flex flex-col justify-between group hover:bg-white/60 dark:hover:bg-black/60 transition-colors border-r border-b border-black/5 dark:border-white/5">
                      <div className="space-y-4 mb-8">
                        <div className="text-[10px] font-mono text-[#AAAAAA] uppercase tracking-widest">
                          Chapter 0{idx + 1}
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tighter text-slate-900 dark:text-white">{chapter.title}</h3>
                      </div>
                      
                      <div className="flex flex-col gap-2 mt-auto">
                        <div className="text-[10px] font-mono text-rose-500 uppercase tracking-widest mb-2 border-b border-black/5 dark:border-white/10 pb-2">
                          {chapterConcepts.length} Topics Available
                        </div>
                        {chapterConcepts.map(concept => (
                          <Link 
                            key={concept.id} 
                            href={`/concept/${concept.id}`}
                            className="text-sm text-slate-600 dark:text-[#AAAAAA] hover:text-rose-500 transition-colors flex items-center justify-between group/link py-1"
                          >
                            <span>{concept.title}</span>
                            <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-8 text-[#AAAAAA] font-mono text-sm uppercase tracking-widest">Loading Catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
