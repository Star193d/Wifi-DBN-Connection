import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: "Thabo M.",
    role: "Small Business Owner, Morningside",
    content: "Since switching to Durban Connect, our cafe's POS and guest Wi-Fi hasn't dropped once. The local support team is incredibly responsive."
  },
  {
    name: "Sarah V.",
    role: "Remote Worker, Umhlanga",
    content: "I need stable video calls for work. The Plus plan has been a lifesaver. Fast installation and exactly what they advertised."
  },
  {
    name: "Rajesh N.",
    role: "Resident, Westville",
    content: "Finally, affordable internet that actually works during load shedding thanks to their backed-up towers. Highly recommended."
  }
];

interface TestimonialsProps {
  variants?: any;
}

export default function Testimonials({ variants }: TestimonialsProps) {
  return (
    <motion.section 
      variants={variants}
      className="col-span-1 md:col-span-12 lg:col-span-7 bg-[var(--color-accent)] text-white relative overflow-hidden bento-item-dark p-8 lg:p-12 flex flex-col min-h-[500px]"
    >
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-900 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[var(--color-primary)] opacity-10 blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Loved by <span className="text-[var(--color-primary)]">Durban Locals</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-sm">
            Don't just take our word for it. Here is what your neighbors have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
          {testimonials.slice(0, 2).map((t, idx) => (
            <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors">
              <div>
                <Quote className="text-[var(--color-primary)] w-8 h-8 mb-4 opacity-80" />
                <p className="text-sm text-slate-200 mb-6 leading-relaxed">"{t.content}"</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(star => (
                     <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="font-bold text-sm text-white">{t.name}</div>
                <div className="text-xs text-slate-400">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
