import React from 'react';

export function MaroonTechBirdLogo({ className = "w-6 h-6", white = false }: { className?: string; white?: boolean }) {
  const strokeColor = white ? "#FFFFFF" : "var(--color-primary)";
  return (
    <svg
      className={className}
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 82 L42 28 L58 45 L82 12 Q90 8 95 14 L88 22 C84 26 80 32 75 42 L52 75"
        stroke={strokeColor}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 28 L68 55 L82 92"
        stroke={strokeColor}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 82 C10 75 12 62 22 52 L42 28"
        stroke={strokeColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M82 12 C90 12 95 18 97 22 Q101 25 106 20"
        stroke={strokeColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="89" cy="20" r="3" fill={strokeColor} />
    </svg>
  );
}

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#" className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity">
             <div className="w-9 h-9 rounded-xl bg-red-50/50 flex items-center justify-center border border-red-100 shadow-sm">
               <MaroonTechBirdLogo className="w-6 h-6" />
             </div>
             <span className="font-extrabold text-xl tracking-tight text-[var(--color-accent)] font-sans">
               Maroon<span className="text-[var(--color-primary)]">Tech</span>
             </span>
          </a>
          
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <a href="#plans" className="text-slate-600 hover:text-[var(--color-primary)] font-bold text-sm transition-colors">Plans</a>
            <a href="#coverage" className="text-slate-600 hover:text-[var(--color-primary)] font-bold text-sm transition-colors">Coverage</a>
            <a href="#contact" className="text-slate-600 hover:text-[var(--color-primary)] font-bold text-sm transition-colors">Support</a>
          </div>

          <div className="flex items-center gap-4">
             <a 
                href="#contact" 
                className="bg-[var(--color-primary)] hover:brightness-110 active:scale-95 text-white px-5 py-2 rounded-xl font-bold transition-all text-xs tracking-wide shadow-md shadow-red-900/10"
             >
               Check My Address
             </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
