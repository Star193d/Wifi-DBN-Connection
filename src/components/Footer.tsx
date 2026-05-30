import React from 'react';
import { MaroonTechBirdLogo } from './Navbar';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-12 w-full font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-100 pb-12 mb-8">
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
               <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center border border-red-100 shadow-sm">
                 <MaroonTechBirdLogo className="w-5 h-5" />
               </div>
               <span className="text-xl font-bold tracking-tight text-[var(--color-accent)] font-sans">
                 Maroon<span className="text-[var(--color-primary)]">Tech</span>
               </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering eThekwini and surrounding neighborhoods with premium fast, uncapped, and highly reliable internet access. Locally owned, locally supported.
            </p>
          </div>
          
          <div>
            <h4 className="font-extrabold text-[var(--color-accent)] mb-4 text-sm font-sans uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm text-slate-500 font-semibold font-sans">
              <li><a href="#/home-wifi" className="hover:text-[var(--color-primary)] transition-colors">Home Wi-Fi Plans</a></li>
              <li><a href="#/business-fiber" className="hover:text-[var(--color-primary)] transition-colors">Business Fiber</a></li>
              <li><a href="#coverage" className="hover:text-[var(--color-primary)] transition-colors">Interactive Coverage Map</a></li>
            </ul>
          </div>
          
          <div>
             <h4 className="font-extrabold text-[var(--color-accent)] mb-4 text-sm uppercase tracking-wider font-sans">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500 font-semibold font-sans">
              <li><a href="#/about" className="hover:text-[var(--color-primary)] transition-colors">About Maroon Tech</a></li>
              <li><a href="#/careers" className="hover:text-[var(--color-primary)] transition-colors">Active Careers</a></li>
              <li><a href="#/contact-us" className="hover:text-[var(--color-primary)] transition-colors">Contact Center</a></li>
              <li><a href="#/blog" className="hover:text-[var(--color-primary)] transition-colors">Our Blog</a></li>
            </ul>
          </div>

          <div>
             <h4 className="font-extrabold text-[var(--color-accent)] mb-4 text-sm uppercase tracking-wider font-sans">Legal & POPIA</h4>
            <ul className="space-y-2 text-xs text-slate-500 font-semibold font-sans">
              <li><a href="#/privacy" className="hover:text-[var(--color-primary)] transition-colors">Privacy & POPIA Compliance</a></li>
              <li><a href="#/terms" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</a></li>
              <li><a href="#/acceptable-use" className="hover:text-[var(--color-primary)] transition-colors">Acceptable Use Policy (AUP)</a></li>
              <li><a href="#/payments" className="hover:text-[var(--color-primary)] transition-colors">Payments & Billing Policy</a></li>
              <li><a href="#/liabilities" className="hover:text-[var(--color-primary)] transition-colors">Service Level Agreements</a></li>
              <li><a href="#/equipment" className="hover:text-[var(--color-primary)] transition-colors">Router & Equipment Ownership</a></li>
              <li><a href="#/contact" className="hover:text-[var(--color-primary)] transition-colors">Information Officer Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Maroon Tech. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0 font-mono text-xs text-slate-455">
             <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> System Status: Online</span>
             <span className="hidden sm:inline">Durban, KZN, South Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
