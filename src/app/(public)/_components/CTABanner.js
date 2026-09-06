import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="py-32 px-8 md:px-16 bg-[#FDFBF7] dark:bg-black relative overflow-hidden border-t border-black/5 dark:border-white/10">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-50" />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
        <GraduationCap size={48} className="text-rose-500 mb-4" />
        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-slate-900 dark:text-white">
          Begin Your <br/> Research.
        </h2>
        <p className="text-slate-600 dark:text-[#888] font-mono text-sm max-w-lg">
          Join the architectural approach to education. Enroll today and start learning through interaction.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
          <Link href="/register" className="outline-none">
            <Button size="lg" variant="primary" className="uppercase tracking-widest text-xs py-6 w-full sm:w-64">
              Enroll Now
            </Button>
          </Link>
          <Link href="/catalog" className="outline-none">
            <Button size="lg" variant="secondary" className="uppercase tracking-widest text-xs py-6 w-full sm:w-64">
              Explore Curriculum
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
