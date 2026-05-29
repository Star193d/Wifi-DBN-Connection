import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ContactFormProps {
  variants?: any;
}

export default function ContactForm({ variants }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrMsg("");

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await resp.json();
      if (resp.ok) {
        setStatus("success");
        setFormData({ name: '', email: '', phone: '', address: '', message: '' });
      } else {
        setStatus("error");
        setErrMsg(data.error || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setErrMsg("Failed to reach the server. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <motion.section 
      id="contact" 
      variants={variants}
      className="col-span-1 md:col-span-12 bg-white bento-item overflow-hidden flex flex-col md:flex-row lg:col-span-12"
    >
      <div className="md:w-5/12 bg-[var(--color-primary)] text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">Ready for better internet?</h3>
          <p className="text-white/80 mb-8 max-w-sm text-sm leading-relaxed">
            Fill out the form and our local team will contact you within 24 hours to verify coverage and schedule installation.
          </p>
        </div>
        
        <div className="space-y-6 relative z-10 bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
                📞
             </div>
             <div>
                <div className="text-xs text-white/70 uppercase tracking-wider font-bold mb-1">Call Us</div>
                <div className="font-semibold text-lg tracking-wide">031 555 0192</div>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
                ✉️
             </div>
             <div>
                <div className="text-xs text-white/70 uppercase tracking-wider font-bold mb-1">Email</div>
                <div className="font-semibold text-sm tracking-wide">hello@durbanconnect.co.za</div>
             </div>
          </div>
        </div>
      </div>
      
      <div className="md:w-7/12 p-8 lg:p-12 bg-white">
        {status === "success" ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-10">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full border border-green-200 flex items-center justify-center mb-6 text-3xl shadow-sm">✓</div>
            <h3 className="text-2xl font-bold text-[var(--color-accent)] mb-3">Request Received!</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">Thanks for reaching out. We will verify your coverage and contact you shortly.</p>
            <button 
              onClick={() => setStatus("idle")} 
              className="mt-8 px-6 py-3 bg-slate-50 text-slate-700 rounded-full font-bold text-sm hover:bg-slate-100 transition-colors"
            >
              Submit another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-xl font-bold text-[var(--color-accent)] mb-6">Contact Us</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Full Name *</label>
                <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white focus:border-transparent outline-none transition-all text-sm" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Email *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white focus:border-transparent outline-none transition-all text-sm" placeholder="john@example.com" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white focus:border-transparent outline-none transition-all text-sm" placeholder="082 123 4567" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Street Address</label>
                  <input name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white focus:border-transparent outline-none transition-all text-sm" placeholder="10 Florida Rd" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Additional Details</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white focus:border-transparent outline-none transition-all text-sm resize-none" placeholder="I am interested in..."></textarea>
            </div>

            {status === "error" && (
              <div className="text-[#D32F2F] text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100">{errMsg}</div>
            )}

            <button 
              type="submit" 
              disabled={status === "submitting"}
              className="w-full bg-[var(--color-accent)] hover:bg-[#113155] text-white font-bold py-4 mt-2 rounded-xl btn-transition disabled:opacity-70 flex justify-center items-center shadow-md shadow-blue-900/10 text-sm tracking-wide"
            >
              {status === "submitting" ? "Sending Request..." : "Request Call Back"}
            </button>
          </form>
        )}
      </div>
    </motion.section>
  );
}
