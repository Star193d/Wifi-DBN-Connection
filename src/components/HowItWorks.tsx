import React from 'react';
import { Search, PenTool, Wifi } from 'lucide-react';
import { motion } from 'motion/react';

interface HowItWorksProps {
  variants?: any;
}

export default function HowItWorks({ variants }: HowItWorksProps) {
  const steps = [
    {
      id: "01",
      icon: Search,
      title: "Check Coverage",
      desc: "Use our map or enter your address. If you're in the red zone, you're good to go."
    },
    {
      id: "02",
      icon: PenTool,
      title: "Choose & Sign Up",
      desc: "Select a plan that fits your needs and fill out a quick form. No paperwork needed."
    },
    {
      id: "03",
      icon: Wifi,
      title: "Get Installed",
      desc: "Our friendly Durban technicians will setup your free router, usually within 48 hours."
    }
  ];

  return (
    <motion.section 
      variants={variants}
      className="col-span-1 md:col-span-12 bg-white bento-item p-8 lg:p-12 relative overflow-hidden"
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-accent)] mb-2">
          Online in 3 Simple Steps
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-start">
        {/* Connector Line for Desktop */}
        <div className="hidden md:block absolute top-[40px] left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10" />

        {steps.map((step, idx) => (
          <div key={idx} className="relative text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center shadow-sm mb-4 relative z-10">
               <step.icon className="w-8 h-8 text-[var(--color-primary)]" />
               <div className="absolute -top-1 -right-1 w-6 h-6 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                 {step.id}
               </div>
            </div>
            <h3 className="text-lg font-bold text-[var(--color-accent)] mb-2">{step.title}</h3>
            <p className="text-sm text-slate-500 max-w-xs">{step.desc}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
