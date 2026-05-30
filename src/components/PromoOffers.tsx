import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Mail, Wifi } from 'lucide-react';

interface PromoOffersProps {
  variants?: any;
}

export default function PromoOffers({ variants }: PromoOffersProps) {
  // Handles WhatsApp click with prefilled promo details
  const handleWhatsappClick = () => {
    const message = `Hello Maroon Tech, I saw your Promo offers of R999 and R1299. I would like to inquire about your uncapped broadband packages!`;
    window.open(`https://wa.me/27671283281?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.section
      variants={variants}
      className="col-span-1 md:col-span-12 bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md flex flex-col"
    >
      {/* TOP SECTION: White Promo Board with Packages and Blue Illustrations */}
      <div className="p-8 lg:p-12 bg-white flex flex-col lg:flex-row justify-between items-center gap-10 relative">
        {/* Background Subtle Sparkle Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#00acff]/5 to-transparent rounded-bl-full pointer-events-none" />

        {/* LEFT PART: Promo Cards & Text */}
        <div className="w-full lg:w-7/12 space-y-8">
          <div>
            <span className="inline-block px-3.5 py-1 bg-[#00ACFF]/10 text-[#008ECC] text-xs font-black rounded-full mb-3 uppercase tracking-widest">
              Limited Time Special Promo
            </span>
            <h3 className="text-3xl font-black text-[#0F172A] tracking-tight font-sans">
              Our Premium Uncapped High-Speed Plans
            </h3>
          </div>

          {/* Cards Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1: R999 */}
            <div className="bg-white rounded-2xl border border-slate-150 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-bl-full pointer-events-none group-hover:bg-[#00ACFF]/5 transition-colors" />
              <div className="z-10">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono mb-2">
                  100MBPS BACKBONE
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-black text-[#0F172A]">Only</span>
                  <div className="bg-[#00ACFF] text-white font-black text-xl px-4 py-1.5 rounded-xl shadow-sm">
                    R999
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-bold mt-4 leading-relaxed">
                  Perfect for busy residential areas, local retail outlets, and online gaming households.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#00ACFF]">
                <span>League Fiber Package</span>
                <span>✔ Active Coverage</span>
              </div>
            </div>

            {/* Card 2: R1299 */}
            <div className="bg-white rounded-2xl border border-slate-150 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-bl-full pointer-events-none group-hover:bg-[#00ACFF]/5 transition-colors" />
              <div className="z-10">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono mb-2">
                  200MBPS ULTRA SPEED
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-black text-[#0F172A]">Only</span>
                  <div className="bg-[#00ACFF] text-white font-black text-xl px-4 py-1.5 rounded-xl shadow-sm">
                    R1299
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-bold mt-4 leading-relaxed">
                  Continuous high-speed transfers, dense multi-user business environments and heavy streaming.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#00ACFF]">
                <span>Pro Fiber Package +</span>
                <span>✔ Premium Router</span>
              </div>
            </div>
          </div>

          {/* Slashed Prices Promos */}
          <div className="space-y-2 pt-2 text-center sm:text-left">
            <p className="text-[#0F172A] text-lg font-black tracking-tight flex items-center justify-center sm:justify-start gap-2">
              <motion.span 
                className="text-[#00ACFF] text-xl inline-block"
                animate={{ 
                  y: [0, -6, 0],
                  scale: [1, 1.15, 1],
                  rotate: [0, 8, -8, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2.2, 
                  ease: "easeInOut" 
                }}
              >
                🎁
              </motion.span>{' '}
              Free to use wifi router
            </p>
            <p className="text-slate-700 text-sm font-bold">
              Installation fees was only{' '}
              <span className="line-through text-slate-400 font-extrabold">R1200</span>, now only{' '}
              <span className="text-[#B3071B] font-black text-base bg-red-50 px-2 py-1 rounded-md">R500!!</span>
            </p>
          </div>
        </div>

        {/* RIGHT PART: Custom Blue Illustrations (SVG artwork matching the original image) */}
        <div className="w-full lg:w-4/12 flex items-center justify-center py-4 relative min-h-[220px]">
          <div className="relative w-full max-w-[340px] h-[220px] flex items-center justify-center">
            {/* 1. Large Wi-Fi arcs (Left/Center) */}
            <div className="absolute top-[10px] left-[15px] text-[#00ACFF]/90 drop-shadow-sm">
              <svg
                width="140"
                height="140"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              >
                {/* Dot */}
                <circle cx="50" cy="85" r="5" fill="currentColor" />
                {/* Arc 1 */}
                <motion.path 
                  d="M35 70 A20 20 0 0 1 65 70" 
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0 }}
                />
                {/* Arc 2 */}
                <motion.path 
                  d="M22 57 A38 38 0 0 1 78 57" 
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }}
                />
                {/* Arc 3 */}
                <motion.path 
                  d="M10 45 A55 55 0 0 1 90 45" 
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.6 }}
                />
              </svg>
            </div>

            {/* 2. Interactive Social Phone Layout (Right/Top) */}
            <div className="absolute top-[15px] right-[10px] text-[#00ACFF]">
              <svg width="105" height="105" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Screen / Frame */}
                <rect x="25" y="10" width="30" height="52" rx="6" strokeWidth="3" />
                {/* Grid lines inside */}
                <line x1="31" y1="20" x2="49" y2="20" strokeWidth="2" />
                <line x1="31" y1="28" x2="45" y2="28" strokeWidth="2" />
                {/* Bottom button dot */}
                <circle cx="40" cy="56" r="2.5" fill="currentColor" />
                {/* Thumbs up badge floating left */}
                <motion.g 
                  transform="translate(5, 12)"
                  animate={{ 
                    y: [0, -6, 0],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2.8, 
                    ease: "easeInOut" 
                  }}
                  style={{ transformOrigin: '8px 8px' }}
                >
                  <rect x="0" y="0" width="16" height="16" rx="4" fill="white" strokeWidth="2" />
                  <path d="M4 12 v-5 h2 l2 -3 h1 v2 a1 1 0 0 1 1 1 v2.5 h1.5 a1 1 0 0 1 1 1 v1 a1 1 0 0 1 -1 1.5 z" strokeWidth="1.5" fill="none" />
                </motion.g>
                {/* Heart badge floating right */}
                <motion.g 
                  transform="translate(58, 28)"
                  animate={{ 
                    scale: [1, 1.15, 1],
                    y: [0, -4, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2.3, 
                    ease: "easeInOut" 
                  }}
                  style={{ transformOrigin: '8px 8px' }}
                >
                  <rect x="0" y="0" width="16" height="16" rx="4" fill="white" strokeWidth="2" />
                  <path d="M8 12 l-3.5 -3.5 a2 2 0 0 1 2.8 -2.8 l0.7 0.7 l0.7 -0.7 a2 2 0 0 1 2.8 2.8 z" strokeWidth="1.5" fill="currentColor" />
                </motion.g>
                {/* Play/video icon floating on top */}
                <motion.g 
                  transform="translate(18, -8)"
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 4, -4, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3.2, 
                    ease: "easeInOut" 
                  }}
                  style={{ transformOrigin: '9px 7px' }}
                >
                  <rect x="0" y="0" width="18" height="14" rx="3" fill="currentColor" />
                  <polygon points="7,4 7,10 12,7" fill="white" stroke="white" strokeWidth="1" />
                </motion.g>
              </svg>
            </div>

            {/* 3. Computer Desktop Monitor Screen (Bottom Right) */}
            <div className="absolute bottom-[10px] right-[20px] text-[#00ACFF]/95">
              <svg width="100" height="85" viewBox="0 0 80 65" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                {/* Monitor Outer Panel */}
                <rect x="5" y="5" width="70" height="42" rx="4" />
                {/* Stand Neck */}
                <path d="M32 47 l-3 10 h22 l-3 -10" />
                {/* Foot plate */}
                <line x1="22" y1="57" x2="58" y2="57" strokeWidth="4" />
                {/* Small indicator line on monitor bezel */}
                <line x1="37" y1="42" x2="43" y2="42" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Crimson/Maroon Support Contact Board */}
      <div 
        className="group relative bg-white text-slate-800 hover:bg-[#B3071B] hover:text-white py-10 px-8 lg:px-12 flex flex-col lg:flex-row justify-between items-center gap-8 transition-all duration-300 border-t border-slate-100 cursor-pointer"
        style={{
          boxShadow: 'inset 0 12px 24px -10px rgba(0,0,0,0.03)',
        }}
      >
        {/* Artistic Flower Splatter Patterns in exact Dark Red vector layers */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-15 pointer-events-none mix-blend-multiply select-none transition-opacity duration-300">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <g fill="#7D000C">
              {/* Splatters Left side */}
              <circle cx="8%" cy="20%" r="35" />
              <circle cx="12%" cy="35%" r="22" />
              <circle cx="6%" cy="55%" r="18" />
              {/* Organic leaf petal vectors */}
              <path d="M 50,5 C 60,35 90,35 100,50 C 90,65 60,65 50,95 C 40,65 10,65 0,50 C 10,35 40,35 50,5 Z" transform="translate(45, 10) scale(0.65)" />
              <path d="M 50,5 C 60,35 90,35 100,50 C 90,65 60,65 50,95 C 40,65 10,65 0,50 C 10,35 40,35 50,5 Z" transform="translate(180, 40) rotate(15) scale(0.4)" />
              {/* Splatters Right side */}
              <circle cx="88%" cy="15%" r="40" />
              <circle cx="94%" cy="40%" r="28" />
              <circle cx="85%" cy="75%" r="20" />
              <path d="M 50,5 C 60,35 90,35 100,50 C 90,65 60,65 50,95 C 40,65 10,65 0,50 C 10,35 40,35 50,5 Z" transform="translate(850, 20) rotate(-45) scale(0.55)" />
            </g>
          </svg>
        </div>

        {/* Triple Contact Group (Call, Whatsapp, Email with high contrast circular emblems) */}
        <div className="w-full lg:w-7/12 flex flex-col space-y-5 z-10">
          {/* Row 1: Call details */}
          <a
            href="tel:+27312100318"
            className="flex items-center gap-4 group cursor-pointer hover:translate-x-1.5 transition-transform duration-200"
          >
            <div className="w-11 h-11 border-2 border-[var(--color-primary)] group-hover:border-white rounded-full flex items-center justify-center bg-transparent group-hover:bg-white/10 transition-colors duration-300">
              <Phone className="w-5 h-5 text-[var(--color-primary)] group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold tracking-wide text-slate-800 group-hover:text-white transition-colors duration-300">
                Call: +27 31 210 0318
              </span>
            </div>
          </a>

          {/* Row 2: Whatsapp details */}
          <div
            onClick={handleWhatsappClick}
            className="flex items-center gap-4 group cursor-pointer hover:translate-x-1.5 transition-transform duration-200"
          >
            <div className="w-11 h-11 border-2 border-[var(--color-primary)] group-hover:border-white rounded-full flex items-center justify-center bg-transparent group-hover:bg-white/10 transition-colors duration-300">
              <MessageSquare className="w-5 h-5 text-[var(--color-primary)] group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold tracking-wide text-slate-800 group-hover:text-white transition-colors duration-300">
                Whatsapp: +27 67 128 3281
              </span>
            </div>
          </div>

          {/* Row 3: Email details */}
          <a
            href="mailto:support@maroontech.co.za"
            className="flex items-center gap-4 group cursor-pointer hover:translate-x-1.5 transition-transform duration-200"
          >
            <div className="w-11 h-11 border-2 border-[var(--color-primary)] group-hover:border-white rounded-full flex items-center justify-center bg-transparent group-hover:bg-white/10 transition-colors duration-300">
              <Mail className="w-5 h-5 text-[var(--color-primary)] group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold tracking-wide text-slate-800 group-hover:text-white transition-colors duration-300">
                Email: support@maroontech.co.za
              </span>
            </div>
          </a>
        </div>

        {/* RIGHT CAPSULE: Explore button with active deep styling */}
        <div className="w-full lg:w-5/12 flex justify-center lg:justify-end z-10">
          <motion.a
            href="#plans"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-[340px] px-8 py-5 bg-[#00ACFF] hover:bg-[#009CE6] text-white text-center rounded-3xl shadow-lg transition-colors cursor-pointer flex flex-col justify-center items-center font-sans tracking-wide border border-transparent hover:border-white/20"
          >
            <span className="text-base font-extrabold block">Explore Maroon Tech</span>
            <span className="text-sm font-black text-white/95 mt-0.5 tracking-tight">www.maroontech.co.za</span>
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}
