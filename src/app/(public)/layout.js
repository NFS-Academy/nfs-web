import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#FF3366] selection:text-black">
      
      {/* Brutalist Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#1A1A1A] bg-black">
        <div className="px-8 md:px-16 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-xl font-bold uppercase tracking-tighter flex items-center gap-3">
              <Logo />
              NFS Academy
            </Link>
            
            <nav className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-widest text-[#888888]">
              <Link href="/catalog" className="hover:text-white transition-colors">Directory</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Access Passes</Link>
              <Link href="/about" className="hover:text-white transition-colors">Manifesto</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-[10px] font-mono uppercase tracking-widest text-[#888888] hover:text-white transition-colors hidden sm:block">
              Authenticate
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm" className="uppercase text-[10px] tracking-widest">
                Initialize Account
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Brutalist Footer */}
      <footer className="border-t border-[#1A1A1A] bg-black">
        <div className="px-8 md:px-16 py-24 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#1A1A1A]">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Logo />
            <p className="text-sm text-[#888888] max-w-sm font-sans">
              Replacing static diagrams with real-time computational models. An architectural approach to physics and chemistry education in Bangladesh.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="text-[10px] font-mono text-white uppercase tracking-widest">Index</div>
            <ul className="space-y-4 text-sm text-[#888888] font-mono">
              <li><Link href="/catalog" className="hover:text-[#FF3366] transition-colors">Curriculum</Link></li>
              <li><Link href="/pricing" className="hover:text-[#FF3366] transition-colors">Pricing</Link></li>
              <li><Link href="/about" className="hover:text-[#FF3366] transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="text-[10px] font-mono text-white uppercase tracking-widest">Legal</div>
            <ul className="space-y-4 text-sm text-[#888888] font-mono">
              <li><Link href="/privacy" className="hover:text-[#00FFCC] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#00FFCC] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="px-8 md:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] font-mono text-[#555555] uppercase tracking-widest">
            © {new Date().getFullYear()} NFS Academy. All rights reserved.
          </div>
          <div className="text-[10px] font-mono text-[#555555] uppercase tracking-widest flex gap-4">
            <span>System Status: <span className="text-[#00FFCC]">Nominal</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
