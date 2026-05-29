import React from 'react';
import { Wifi } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-12 w-full">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-100 pb-12 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 rounded bg-[var(--color-primary)] flex items-center justify-center text-white font-bold">D</div>
               <span className="text-xl font-bold tracking-tight text-[var(--color-accent)]">Durban<span className="text-[var(--color-primary)]">Connect</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Empowering Durban neighborhoods with fast, affordable, and highly reliable internet access. Locally owned, locally supported.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-[var(--color-accent)]">Services</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#/home-wifi" className="hover:text-[var(--color-primary)] transition-colors">Home Wi-Fi</a></li>
              <li><a href="#/business-fiber" className="hover:text-[var(--color-primary)] transition-colors">Business Fiber</a></li>
              <li><a href="#coverage" className="hover:text-[var(--color-primary)] transition-colors">Coverage Map</a></li>
            </ul>
          </div>
          
          <div>
             <h4 className="font-bold mb-4 text-[var(--color-accent)]">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#/about" className="hover:text-[var(--color-primary)] transition-colors">About Us</a></li>
              <li><a href="#/careers" className="hover:text-[var(--color-primary)] transition-colors">Careers</a></li>
              <li><a href="#/contact-us" className="hover:text-[var(--color-primary)] transition-colors">Contact</a></li>
              <li><a href="#/blog" className="hover:text-[var(--color-primary)] transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold mb-4 text-[var(--color-accent)]">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#/privacy" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy & POPIA</a></li>
              <li><a href="#/terms" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</a></li>
              <li><a href="#/acceptable-use" className="hover:text-[var(--color-primary)] transition-colors">Acceptable Use Policy</a></li>
              <li><a href="#/payments" className="hover:text-[var(--color-primary)] transition-colors">Payments & Billing Policy</a></li>
              <li><a href="#/liabilities" className="hover:text-[var(--color-primary)] transition-colors">Liability & Service Terms</a></li>
              <li><a href="#/equipment" className="hover:text-[var(--color-primary)] transition-colors">Router & Equipment Policy</a></li>
              <li><a href="#/contact" className="hover:text-[var(--color-primary)] transition-colors">Information Officer Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Durban Connect Wi-Fi. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Network Status: Healthy</span>
             <span className="hidden sm:inline">Durban, KZN, South Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
