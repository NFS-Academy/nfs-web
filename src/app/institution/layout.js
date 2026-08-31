import Link from 'next/link';
import { Building2, Users, Receipt, LogOut } from 'lucide-react';

export default function InstitutionLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-950 text-gray-100">
      <aside className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
        <div className="h-16 border-b border-gray-800 flex items-center px-4">
          <div className="font-bold text-lg text-white flex items-center gap-2">
            <Building2 size={20} className="text-blue-500" />
            Institution Portal
          </div>
        </div>
        
        <nav className="flex-1 p-3 space-y-1">
          <Link href="/institution/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-gray-900 text-white rounded-md border border-gray-800">
            <Users size={18} className="text-gray-400" /> Students & Seats
          </Link>
          <Link href="/institution/billing" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900 rounded-md transition-colors">
            <Receipt size={18} /> Billing & Invoices
          </Link>
        </nav>
        
        <div className="p-3 border-t border-gray-800">
          <Link href="/login" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors">
            <LogOut size={18} /> Log out
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-gray-800 bg-gray-900/50 flex items-center justify-between px-6 shrink-0">
          <div className="text-sm font-medium text-gray-400">
            Dhaka College
          </div>
          <div className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-medium">
            Active Subscription
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-950 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
