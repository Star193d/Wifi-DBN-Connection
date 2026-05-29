import React from 'react';
import { Wifi } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#" className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
             <div className="w-8 h-8 rounded bg-[var(--color-primary)] flex items-center justify-center text-white font-bold">D</div>
             <span className="font-bold text-xl tracking-tight text-[var(--color-accent)]">Durban<span className="text-[var(--color-primary)]">Connect</span></span>
          </a>
          
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <a href="#plans" className="text-slate-600 hover:text-[var(--color-primary)] font-medium transition-colors">Plans</a>
            <a href="#coverage" className="text-slate-600 hover:text-[var(--color-primary)] font-medium transition-colors">Coverage</a>
            <a href="#contact" className="text-slate-600 hover:text-[var(--color-primary)] font-medium transition-colors">Support</a>
          </div>

          <div className="flex items-center gap-4">
             <a 
                href="#contact" 
                className="bg-[var(--color-primary)] hover:bg-red-700 text-white px-5 py-2 rounded-full font-semibold transition-all text-sm"
             >
               Check My Address
             </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
