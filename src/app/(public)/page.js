"use client";

import { HeroSection } from "./_components/HeroSection";
import { DifferentiatorGrid } from "./_components/DifferentiatorGrid";
import { CurriculumScroll } from "./_components/CurriculumScroll";
import { FormulaTeaser } from "./_components/FormulaTeaser";
import { CTABanner } from "./_components/CTABanner";
import { CategoryGrid } from "./_components/CategoryGrid";
import { MeshBackground } from "./_components/MeshBackground";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-rose-500 selection:text-white w-full overflow-hidden relative">
      <MeshBackground />
      <div className="snap-start snap-always min-h-screen"><HeroSection /></div>
      <div className="snap-start snap-always"><FormulaTeaser /></div>
      <div className="snap-start snap-always"><CategoryGrid /></div>
      <div className="snap-start snap-always"><CurriculumScroll /></div>
      <div className="snap-start snap-always"><DifferentiatorGrid /></div>
      <div className="snap-start snap-always"><CTABanner /></div>
    </div>
  );
}
