import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';

const faqs = [
  {
    q: "How long does installation take?",
    a: "If your area is covered, standard installation is completed within 48 to 72 hours of your sign-up."
  },
  {
    q: "Do I need to sign a 12-month contract?",
    a: "No! All our plans are completely month-to-month. We want to keep you through great service, not legal lock-ins."
  },
  {
    q: "Do you supply the router?",
    a: "Yes, a standard Wi-Fi router is included for free on an all-use basis as long as you remain a customer."
  },
  {
    q: "What happens during load shedding?",
    a: "Our core network and towers have robust backup power. As long as your home router has a mini-UPS, your internet will stay connected."
  }
];

interface FAQProps {
  variants?: any;
}

export default function FAQ({ variants }: FAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <motion.section 
      variants={variants}
      className="col-span-1 md:col-span-12 lg:col-span-5 bg-white bento-item p-8 lg:p-12 flex flex-col min-h-[500px]"
    >
      <div className="mb-10 text-center sm:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-accent)] mb-2">
          FAQ
        </h2>
        <p className="text-sm text-slate-500">Some common questions.</p>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-2">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:border-slate-200">
              <button
                className="w-full px-5 py-4 flex justify-between items-center text-left bg-white transition-colors"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
              >
                <span className="font-semibold text-sm text-[var(--color-accent)]">{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-4 bg-white text-sm text-slate-500 leading-relaxed border-t border-slate-50">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </motion.section>
  );
}
