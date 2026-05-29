import React from 'react';
import { ArrowLeft, WifiOff, Home, HelpCircle, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';

interface NotFoundProps {
  onNavigate: (route: string) => void;
}

export default function NotFound({ onNavigate }: NotFoundProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      onNavigate('');
    }
  };

  const quickLinks = [
    { name: 'Home & Coverage Map', hash: '', description: 'Check regional KZN network parameters' },
    { name: 'Home Wi-Fi Packages', hash: 'home-wifi', description: 'Explore our pocket-friendly packages' },
    { name: 'Business Fiber Solutions', hash: 'business-fiber', description: 'Enterprise SLA lines' },
    { name: 'Company News & Blog', hash: 'blog', description: 'Broadband rollouts and POPI rules' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="col-span-1 md:col-span-12 flex flex-col items-center justify-center min-h-[60vh] max-w-4xl mx-auto w-full px-4 text-center my-6"
    >
      {/* 404 Visual Icon */}
      <motion.div 
        variants={itemVariants}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-50 animate-pulse w-32 h-32 mx-auto" />
        <div className="relative w-24 h-24 bg-red-50 text-[var(--color-primary)] rounded-full flex items-center justify-center border-2 border-red-100 mx-auto">
          <WifiOff className="w-10 h-10 animate-bounce" />
        </div>
      </motion.div>

      {/* Hero Typography */}
      <motion.div variants={itemVariants} className="space-y-3 max-w-2xl">
        <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest block font-mono">
          Error Code: 404 Link Broken
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-[var(--color-accent)] tracking-tight font-sans">
          Connection Offline: Page Not Found
        </h1>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans font-medium">
          The link you requested is currently inactive or may have moved. Durban Connect networks are active and fully operational, but this specific sub-route does not exist in our system directory.
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div 
        variants={itemVariants} 
        className="flex flex-wrap items-center justify-center gap-4 mt-8 w-full"
      >
        <button
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-[var(--color-accent)] font-extrabold rounded-xl border border-slate-200 shadow-sm transition-all text-sm cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Go Back
        </button>
        <button
          onClick={() => onNavigate('')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] hover:bg-red-700 text-white font-extrabold rounded-xl shadow-md shadow-red-200 transition-all text-sm cursor-pointer"
        >
          <Home className="w-4 h-4" />
          Back to Homepage
        </button>
      </motion.div>

      {/* Suggested Routes Bento Segment */}
      <motion.div 
        variants={itemVariants}
        className="w-full mt-12 pt-10 border-t border-slate-200/80"
      >
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 text-center font-sans">
          Recommended Active Connections
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {quickLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => onNavigate(link.hash)}
              className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[var(--color-primary)] p-4 rounded-xl flex items-start gap-3.5 shadow-sm hover:shadow transition-all group cursor-pointer text-left w-full"
            >
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[var(--color-primary)] flex items-center justify-center text-sm font-black group-hover:scale-105 transition-transform shrink-0 font-sans">
                0{index + 1}
              </span>
              <div>
                <h4 className="font-extrabold text-sm text-[var(--color-accent)] tracking-tight font-sans transition-colors group-hover:text-[var(--color-primary)]">
                  {link.name}
                </h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed font-sans mt-0.5">
                  {link.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Florida Road Support Details */}
      <motion.div 
        variants={itemVariants}
        className="mt-8 p-5 bg-slate-100 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 w-full text-left"
      >
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-xs text-[var(--color-accent)] font-sans">Still need help finding something?</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium font-sans">
              Contact Mr. Sipho Ngcobo’s client center at Florida Road for priority network mapping.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <a 
            href="tel:+27315550192" 
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:text-[var(--color-primary)] transition-all font-sans"
          >
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            +27 (0) 31 555 0192
          </a>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 font-sans">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            Morningside, Durban
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
