import React from 'react';
import { Check, X, FileText, ArrowRight, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { jsPDF } from 'jspdf';

const plans = [
  {
    name: "Starter",
    price: "R499",
    speed: "20 Mbps",
    desc: "Enjoy smooth Internet Access. Perfect for social media, homework, and streaming for small households.",
    features: [
        "Uncapped Data",
        "Symmetrical speeds",
        "Free to use wifi router",
        "Installation: was R1200, now R500!",
        "Month-to-month contract"
    ],
    highlight: false
  },
  {
    name: "Amazing",
    price: "R699",
    speed: "50 Mbps",
    desc: "Family Package. Ideal for high definition streaming TVs, remote workspace, and online gaming.",
    features: [
        "Uncapped Data",
        "Symmetrical speeds",
        "Free to use wifi router",
        "Installation: was R1200, now R500!",
        "Priority local support",
        "Month-to-month contract"
    ],
    highlight: true
  },
  {
    name: "League",
    price: "R999",
    speed: "100 Mbps",
    desc: "Business Package. Solid throughput for busy home offices, retail outlets, and multi-user environments.",
    features: [
        "Uncapped Data",
        "Symmetrical speeds",
        "Free to use wifi router",
        "Installation: was R1200, now R500!",
        "24/7 Priority support",
        "Month-to-month contract"
    ],
    highlight: false
  },
  {
    name: "Pro",
    price: "R1299",
    speed: "200 Mbps",
    desc: "Business Package +. Extreme bandwidth profiles tailored for continuous heavy transfers & cloud operations.",
    features: [
        "Uncapped Dedicated Data",
        "Symmetrical ultra speeds",
        "Free to use premium router",
        "Installation: was R1200, now R500!",
        "24/7 Instant Response SLA",
        "Month-to-month contract"
    ],
    highlight: false
  }
];

interface PricingProps {
  variants?: any;
}

const pricingContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const pricingCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 15
    }
  }
};

export default function Pricing({ variants }: PricingProps) {
  // Modal states
  const [selectedPlan, setSelectedPlan] = React.useState<any | null>(null);
  const [fullName, setFullName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [agreed, setAgreed] = React.useState(false);

  // Success states for iframe visual backup support
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [successWhatsappUrl, setSuccessWhatsappUrl] = React.useState('');

  const handleCloseModal = () => {
    setSelectedPlan(null);
    setFullName('');
    setAddress('');
    setNotes('');
    setAgreed(false);
    setIsSuccess(false);
    setSuccessWhatsappUrl('');
  };

  const handleDownloadPDF = (plan: any, clientName: string, installationAddress: string, clientNotes: string, subDate: string) => {
    const doc = new jsPDF();
    
    // Header Stripe (Maroon Accent: RGB: 142, 14, 37)
    doc.setFillColor(142, 14, 37);
    doc.rect(0, 0, 210, 25, 'F');

    // Title Block
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("MAROON TECH BROADBAND APPLICATION RECEIPT", 14, 16);

    let y = 38;

    // Greeting Message & Applicant Core Name written clearly at the top
    doc.setTextColor(15, 23, 42); // slate-900
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`Customer Name: ${clientName}`, 14, y);
    y += 7;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10.5);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text("Hello Maroon Tech, I would like to apply for the following internet package:", 14, y);
    y += 10;

    // Thin grey separating divider
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.line(14, y, 196, y);
    y += 8;

    // SECTION 1: Selected Internet Package Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(142, 14, 37); // Maroon
    doc.text("1. SELECTED INTERNET PACKAGE DETAILS", 14, y);
    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85); // slate-700
    doc.text(`• Plan Identifier Name: ${plan.name} Package`, 14, y);
    y += 6;
    doc.text(`• Speed Bandwidth: ${plan.speed}`, 14, y);
    y += 6;
    doc.text(`• Monthly Price Rate: From ${plan.price}/month`, 14, y);
    y += 6;
    doc.text("• Included Contract Perks:", 14, y);
    y += 5;

    plan.features.forEach((feature: string) => {
      doc.text(`  - ${feature}`, 14, y);
      y += 5;
    });
    y += 5;

    // Thin grey separating divider
    doc.line(14, y, 196, y);
    y += 8;

    // SECTION 2: User Details & Installation Metadata
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(142, 14, 37);
    doc.text("2. INSTALLATION ADDRESS & PATRON DETAILS", 14, y);
    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.text(`• Applicant Identity: ${clientName}`, 14, y);
    y += 6;

    // Split installation address elegantly to wrap columns safely
    const wrappedAddress = doc.splitTextToSize(`• Physical Installation Address: ${installationAddress}`, 180);
    doc.text(wrappedAddress, 14, y);
    y += (wrappedAddress.length * 5) + 1;

    if (clientNotes.trim()) {
      const wrappedNotes = doc.splitTextToSize(`• Special Installation Notes: ${clientNotes}`, 180);
      doc.text(wrappedNotes, 14, y);
      y += (wrappedNotes.length * 5) + 1;
    }

    doc.text(`• Submission Date & Time: ${subDate} (SAST)`, 14, y);
    y += 10;

    // Thin grey separating divider
    doc.line(14, y, 196, y);
    y += 8;

    // SECTION 3: Legal Declared Confirmation and POPIA Acceptances
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(142, 14, 37);
    doc.text("3. STATUTORY COMPLIANCE & LEGAL ATTESTATION", 14, y);
    y += 7;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);

    const clientStatutoryCheckbox = doc.splitTextToSize(
      "CONFIRMED CHECKBOX: I confirm that I have read, understood, and agreed to Maroon Tech’s Privacy Policy, Terms of Service, Acceptable Use Policy, Payment Terms, POPIA Compliance Policy, and Equipment Ownership Policy.",
      180
    );
    doc.text(clientStatutoryCheckbox, 14, y);
    y += (clientStatutoryCheckbox.length * 4.5) + 4;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42); // slate-900

    const finalClientDeclarationText = doc.splitTextToSize(
      "I confirm that I have read and accepted all Maroon Tech service terms, legal policies, POPIA compliance requirements, billing terms, and equipment ownership conditions.",
      180
    );
    doc.text(finalClientDeclarationText, 14, y);
    y += (finalClientDeclarationText.length * 4.5) + 12;

    // Footnote Details
    doc.setDrawColor(241, 245, 249);
    doc.line(14, y, 196, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text("Maroon Tech Fibre Network Group • Florida Road, Morningside, Durban, 4001 • ICASA Regulated Operator", 14, y);

    doc.save(`Maroon_Tech_Application_${clientName.trim().replace(/\s+/g, '_')}.pdf`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan || !agreed) return;

    const submissionDate = new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' });

    // 1. Generate local PDF file for client records
    handleDownloadPDF(selectedPlan, fullName, address, notes, submissionDate);

    // 2. Draft the exact message matching plain text greetings and ending confirmations
    const whatsappMessage = `Hello Maroon Tech, I would like to apply for the following internet package:

*CLIENT PERSONAL DETAILS*
• Name: ${fullName}
• Installation Address: ${address}
• Additional Notes: ${notes.trim() ? notes : 'None'}
• Date & Time of Application: ${submissionDate} (SAST)

*PACKAGE DETAILS*
• Package Name: Maroon Tech ${selectedPlan.name}
• Speed Bandwidth: ${selectedPlan.speed}
• Subscription Rate: From ${selectedPlan.price}/mo
• Included Plan Features: ${selectedPlan.features.join(', ')}

*LEGAL COMPLIANCE SELECTION STATE*
• Accepted Maroon Tech's Privacy Policy, Terms, AUP, Payment Terms, POPIA and Router Policy: Yes [CONFIRMED]

I confirm that I have read and accepted all Maroon Tech service terms, legal policies, POPIA compliance requirements, billing terms, and equipment ownership conditions.`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const customWhatsappUrl = `https://wa.me/27671283281?text=${encodedMessage}`;

    // 3. Initiate WhatsApp action
    try {
      window.open(customWhatsappUrl, '_blank');
    } catch (err) {
      console.warn("Iframe popup block intercepted. Client safe fallback mode engaged.", err);
    }

    // Move to success display modal to allow redirection fallback cleanly
    setSuccessWhatsappUrl(customWhatsappUrl);
    setIsSuccess(true);
  };

  return (
    <>
      <div className="col-span-1 md:col-span-12 text-center mb-6">
        <div className="inline-block px-4 py-1.5 bg-red-50 text-[var(--color-primary)] font-extrabold rounded-full text-xs uppercase tracking-widest mb-3">
          Special Promo Active
        </div>
        <h2 className="text-3xl font-black text-[var(--color-accent)] tracking-tight">Our Uncapped Packages</h2>
        <p className="text-slate-500 text-sm mt-1 max-w-xl mx-auto">
          Installation fees was only R1200, <span className="text-[var(--color-primary)] font-bold">now only R500!!</span> Includes wifi router.
        </p>
      </div>

      <motion.section 
        id="plans" 
        variants={pricingContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="col-span-1 md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {plans.map((plan, idx) => (
          <motion.div 
            key={idx} 
            variants={pricingCardVariants}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
            className={`group relative flex flex-col p-6 rounded-3xl transition-all duration-300 bg-white text-slate-900 hover:bg-[var(--color-primary)] hover:text-white bento-item overflow-hidden cursor-pointer ${
              plan.highlight 
                ? 'border-2 border-[var(--color-primary)]/85 shadow-md hover:shadow-xl' 
                : 'border border-slate-250/80 shadow-xs hover:shadow-lg'
            }`}
          >
            {/* Ambient bubble effect in card backgrounds */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[var(--color-primary)]/5 group-hover:bg-white/10 rounded-full blur-2xl pointer-events-none transition-colors duration-300" />

            <div className="mb-2">
              <h4 className={`font-bold uppercase text-xs tracking-widest mb-2.5 transition-colors duration-300 ${
                plan.highlight ? 'text-[var(--color-primary)] group-hover:text-white/90' : 'text-slate-500 group-hover:text-white/80'
              }`}>
                {plan.name} {plan.highlight && '(Popular)'}
              </h4>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="font-black text-sm tracking-wide text-slate-800 group-hover:text-white transition-colors duration-300">
                  Only
                </span>
                <div className={`font-black text-base px-3 py-1.5 rounded-xl shadow-xs transition-all duration-300 ${
                  plan.highlight ? 'bg-[var(--color-primary)] text-white group-hover:bg-white group-hover:text-[var(--color-primary)]' : 'bg-[#00ACFF] text-white group-hover:bg-white group-hover:text-[#00ACFF]'
                }`}>
                  {plan.price}
                </div>
                <span className="text-[11px] font-semibold text-slate-450 group-hover:text-white/70 transition-colors duration-300">/mo</span>
              </div>
            </div>
            
            <p className="text-xs mb-5 font-semibold text-slate-505 group-hover:text-white/95 transition-colors duration-300">
              {plan.speed} — {plan.desc}
            </p>

            <ul className="flex-1 space-y-2 mb-6 text-xs font-medium text-slate-600 group-hover:text-white/90 transition-colors duration-300">
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start">
                  <span className="mr-1.5 opacity-80 shrink-0 text-[10px]">✔</span>
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
            
            <a 
              href="#plans" 
              onClick={(e) => {
                e.preventDefault();
                setSelectedPlan(plan);
              }}
              className={`btn-transition text-center py-2.5 px-4 rounded-xl font-bold w-full cursor-pointer text-xs transition-all duration-300 ${
                plan.highlight 
                  ? 'bg-[var(--color-primary)] text-white group-hover:bg-white group-hover:text-[var(--color-primary)] group-hover:shadow-md' 
                  : 'bg-slate-100 text-[var(--color-accent)] hover:bg-slate-200 group-hover:bg-white group-hover:text-[var(--color-primary)] group-hover:shadow-md'
              }`}
            >
              Select Plan
            </a>
          </motion.div>
        ))}
      </motion.section>

      {/* PORTAL MODAL DIALOG CONTAINER */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full text-left shadow-2xl relative border border-slate-100 flex flex-col overflow-hidden max-h-[90vh]">
            
            {/* Header section with branding layout */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest block font-mono">
                  MAROON TECH BROADBAND CONNECTIVITY REGISTRATION
                </span>
                <h3 className="text-xl font-black text-[var(--color-accent)] mt-0.5 font-sans tracking-tight">
                  Package Subscription Portal
                </h3>
              </div>
              <button 
                onClick={handleCloseModal}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-all cursor-pointer"
                title="Dismiss application layout"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success and Backup fallback Redirect Screen inside iframe */}
            {isSuccess ? (
              <div className="p-8 flex flex-col items-center justify-center text-center space-y-6 overflow-y-auto">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center border border-green-100 shadow-sm">
                  <ShieldCheck className="w-8 h-8 animate-pulse" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-[var(--color-accent)] font-sans">
                    Application Receipt Generated!
                  </h4>
                  <p className="text-sm font-semibold text-slate-600 font-sans">
                    Hello <span className="text-[var(--color-primary)] font-bold">{fullName}</span>, your certified Broadband PDF application contract receipt has been downloaded onto your device.
                  </p>
                  <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed font-sans font-medium">
                    Please use the connection button below if the automated WhatsApp application window did not pop up to securely submit your file to Maroon Tech's desk at +27 67 128 3281.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm pt-4">
                  <button
                    onClick={() => {
                      const submissionDate = new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' });
                      handleDownloadPDF(selectedPlan, fullName, address, notes, submissionDate);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-extrabold rounded-xl text-xs transition cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-slate-400" />
                    Reset PDF Download
                  </button>
                  <a
                    href={successWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[var(--color-primary)] hover:brightness-110 text-white font-extrabold rounded-xl shadow-md text-xs transition cursor-pointer animate-pulse"
                  >
                    Send WhatsApp Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 underline cursor-pointer pt-2"
                >
                  Close & return to page
                </button>
              </div>
            ) : (
              // Form Input Screen
              <>
                <div className="p-6 overflow-y-auto space-y-6">
                  
                  {/* PRE-FILLED PLAN SPEC DETAILS BENTO BOX */}
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                        Selected Package Segment
                      </span>
                      <h4 className="text-lg font-black text-[var(--color-accent)] font-sans mt-0.5">
                        Maroon Tech {selectedPlan.name}
                      </h4>
                      <p className="text-xs text-[var(--color-primary)] font-extrabold mt-0.5 font-sans">
                        {selectedPlan.speed} bandwidth — Uncapped & Symmetrical Speed
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                        Installation Price Rate
                      </span>
                      <p className="text-2xl font-black text-[var(--color-accent)] mt-0.5 font-sans">
                        From {selectedPlan.price}<span className="text-xs font-normal text-slate-400">/mo</span>
                      </p>
                    </div>
                    
                    <div className="w-full border-t border-slate-200/60 pt-3">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                        Guaranteed Package Advantages:
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 font-bold font-sans">
                        {selectedPlan.features.map((perk: string, perkIdx: number) => (
                          <span key={perkIdx} className="flex items-center gap-1.5 font-sans">
                            <span className="w-1 h-1 rounded-full bg-[var(--color-primary)]"></span>
                            {perk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CUSTOMER DETAIL INPUTS */}
                  <form id="plan-registration-form" onSubmit={handleSubmit} className="space-y-4 font-sans">
                    
                    {/* Full Name Input */}
                    <div className="space-y-1.5">
                      <label htmlFor="applicant-fullName-input" className="text-xs font-black text-[var(--color-accent)] uppercase tracking-wider block font-sans">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        id="applicant-fullName-input"
                        type="text" 
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g., Sipho Ngcobo"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] text-sm font-semibold text-slate-800 transition"
                      />
                    </div>

                    {/* Physical Installation Address */}
                    <div className="space-y-1.5">
                      <label htmlFor="applicant-address-input" className="text-xs font-black text-[var(--color-accent)] uppercase tracking-wider block font-sans">
                        Physical / Installation Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        id="applicant-address-input"
                        type="text" 
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g., 102 Florida Road, Morningside, Durban, 4001"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] text-sm font-semibold text-slate-800 transition"
                      />
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-1.5">
                      <label htmlFor="applicant-notes-textarea" className="text-xs font-black text-[var(--color-accent)] uppercase tracking-wider block font-sans">
                        Additional Notes (Optional)
                      </label>
                      <textarea 
                        id="applicant-notes-textarea"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g., Specific roof setup parameters, double-story building constraints, preferred installation hours, etc."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] text-sm font-semibold text-slate-800 transition resize-none"
                      />
                    </div>

                    {/* MANDATORY LEGAL CONFIRMATION CHECKBOX */}
                    <div className="p-4 bg-red-50/45 border border-red-100 rounded-2xl flex items-start gap-3">
                      <input 
                        type="checkbox"
                        id="legal-policy-checkbox"
                        required
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 w-4.5 h-4.5 accent-[var(--color-primary)] rounded border-slate-300 focus:ring-red-500 cursor-pointer shrink-0"
                      />
                      <label htmlFor="legal-policy-checkbox" className="text-[11px] text-slate-600 font-extrabold leading-normal cursor-pointer select-none font-sans">
                        I confirm that I have read, understood, and agreed to Maroon Tech’s Privacy Policy, Terms of Service, Acceptable Use Policy, Payment Terms, POPIA Compliance Policy, and Equipment Ownership Policy.
                      </label>
                    </div>

                  </form>
                </div>

                {/* Footer and Submit block */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap justify-between items-center gap-4">
                  <span className="text-[10px] font-mono text-slate-400 font-semibold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> PDF Application Builder Activated
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-5 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-extrabold rounded-xl text-xs transition cursor-pointer font-sans"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      form="plan-registration-form"
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[var(--color-primary)] hover:brightness-110 text-white font-extrabold rounded-xl shadow-md text-xs transition cursor-pointer font-sans"
                    >
                      Submit Application
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}
