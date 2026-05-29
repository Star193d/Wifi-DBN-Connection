import React from 'react';
import { Network, Shield, Zap, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  variants?: any;
}

export default function Hero({ variants }: HeroProps) {
  return (
    <motion.section 
      variants={variants}
      className="col-span-1 md:col-span-12 lg:col-span-8 bg-white bento-item p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden min-h-[500px]"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#D32F2F10] to-transparent rounded-bl-full transition-all" />
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 bg-red-50 text-[#D32F2F] text-xs font-bold rounded-full mb-4 uppercase tracking-widest">Now Live in Umhlanga & Berea</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-[#0A2540] mb-6">
              Fast, Reliable Wi‑Fi for <br className="hidden md:block"/><span className="text-[var(--color-primary)]">Durban Neighborhoods</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg">
              Affordable plans, local support, and community coverage. Join thousands of happy homes and businesses across the city.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a 
                href="#coverage" 
                className="btn-transition inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-white bg-[var(--color-primary)] shadow-lg shadow-red-200 w-full sm:w-auto"
              >
                View Plans
              </a>
              <a 
                href="#plans" 
                className="btn-transition inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-[var(--color-accent)] bg-white border-2 border-slate-200 hover:border-slate-300 w-full sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 sm:mt-20 pt-8 border-t border-slate-100"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
             {[
               { icon: Zap, title: "Fiber-backed Speed", desc: "Up to 100Mbps down so your whole family can stream." },
               { icon: Network, title: "Seamless Coverage", desc: "No more dead zones in our connected communities." },
               { icon: Shield, title: "Reliable Support", desc: "Local Durban support team ready to help 24/7." }
             ].map((feature, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center">
                      <feature.icon className="h-4 w-4 text-[var(--color-primary)]" />
                    </div>
                    <h3 className="text-sm font-bold text-[var(--color-accent)]">{feature.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[250px]">{feature.desc}</p>
                </div>
             ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
