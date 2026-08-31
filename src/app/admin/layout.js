import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-black text-white selection:bg-[#FF3366] selection:text-black">
      
      {/* Brutalist Sidebar */}
      <aside className="w-72 bg-black border-r border-[#1A1A1A] flex flex-col z-20 shrink-0">
        <div className="h-20 border-b border-[#1A1A1A] flex items-center px-8">
          <Link href="/admin/dashboard" className="font-bold text-xl uppercase tracking-tighter flex items-center gap-3">
            <Logo />
            NFS Admin
          </Link>
        </div>
        
        <div className="p-8 border-b border-[#1A1A1A]">
          <div className="text-[10px] font-mono text-[#FF3366] uppercase tracking-[0.2em] mb-4">System Privileges</div>
          <div className="text-sm font-medium tracking-tight">Super Administrator</div>
        </div>

        <nav className="flex-1 p-8 space-y-2 overflow-y-auto hide-scrollbar">
          <div className="text-[10px] font-mono text-[#888888] uppercase tracking-[0.2em] mb-4">Control Panel</div>
          <NavItem href="/admin/dashboard" label="Overview" />
          <NavItem href="/admin/simulations" label="Simulations Engine" />
          <NavItem href="/admin/curriculum" label="Curriculum Index" />
          <NavItem href="/admin/users" label="User Directory" />
        </nav>
        
        <div className="p-8 border-t border-[#1A1A1A] space-y-2">
          <Link href="/" className="flex items-center px-4 py-3 text-xs font-mono uppercase tracking-widest text-[#888888] hover:text-[#FF3366] transition-colors">
            Terminate Session
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Stark Header */}
        <header className="h-20 bg-black border-b border-[#1A1A1A] flex items-center justify-between px-10 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#888888]">
            <span>SysAdmin</span>
            <span className="text-[#333333]">/</span>
            <span className="text-[#FF3366]">Control</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 bg-[#FF3366] flex items-center justify-center text-xs font-mono text-black font-bold">
              SA
            </div>
          </div>
        </header>
        
        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto p-10 lg:p-16 relative z-0 bg-[#050505]">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, label }) {
  // Simplification for admin layout active state
  return (
    <Link href={href} className="flex items-center px-4 py-3 text-xs font-mono uppercase tracking-widest text-[#888888] border border-transparent hover:border-[#333333] hover:text-white transition-colors">
      {label}
    </Link>
  );
}
