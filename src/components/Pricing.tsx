import React from 'react';
import { Check, X, FileText, ArrowRight, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { jsPDF } from 'jspdf';

const plans = [
  {
    name: "Basic",
    price: "R399",
    speed: "20 Mbps",
    desc: "Perfect for browsing and social media for small households.",
    features: [
        "Uncapped Data",
        "Symmetrical speeds",
        "Free standard router",
        "Month-to-month"
    ],
    highlight: false
  },
  {
    name: "Plus",
    price: "R599",
    speed: "50 Mbps",
    desc: "Ideal for streaming HD TV and working from home.",
    features: [
        "Uncapped Data",
        "Symmetrical speeds",
        "Free premium router",
        "Priority local support",
        "Month-to-month"
    ],
    highlight: true
  },
  {
    name: "Unlimited Pro",
    price: "R899",
    speed: "100 Mbps",
    desc: "For heavy downloaders, 4K streaming, and big households.",
    features: [
        "Uncapped Data",
        "Symmetrical speeds",
        "Mesh Wi-Fi included",
        "24/7 Priority support",
        "Month-to-month"
    ],
    highlight: false
  }
]

interface PricingProps {
  variants?: any;
}

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
    
    // Header Stripe (Primary Durban Connect Red Accent)
    doc.setFillColor(220, 38, 38);
    doc.rect(0, 0, 210, 25, 'F');

    // Title Block
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("DURBAN CONNECT BROADBAND APPLICATION RECEIPT", 14, 16);

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
    doc.text("Hello Durban Connect, I would like to apply for the following internet package:", 14, y);
    y += 10;

    // Thin grey separating divider
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.line(14, y, 196, y);
    y += 8;

    // SECTION 1: Selected Internet Package Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(220, 38, 38); // Red
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
    doc.setTextColor(220, 38, 38);
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
    doc.setTextColor(220, 38, 38);
    doc.text("3. STATUTORY COMPLIANCE & LEGAL ATTESTATION", 14, y);
    y += 7;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);

    const clientStatutoryCheckbox = doc.splitTextToSize(
      "CONFIRMED CHECKBOX: I confirm that I have read, understood, and agreed to Durban Connect’s Privacy Policy, Terms of Service, Acceptable Use Policy, Payment Terms, POPIA Compliance Policy, and Equipment Ownership Policy.",
      180
    );
    doc.text(clientStatutoryCheckbox, 14, y);
    y += (clientStatutoryCheckbox.length * 4.5) + 4;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42); // slate-900

    const finalClientDeclarationText = doc.splitTextToSize(
      "I confirm that I have read and accepted all Durban Connect service terms, legal policies, POPIA compliance requirements, billing terms, and equipment ownership conditions.",
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
    doc.text("Durban Connect Fibre Network Group • 102 Florida Road, Morningside, Durban, 4001 • ICASA Regulated Operator", 14, y);

    doc.save(`Durban_Connect_Application_${clientName.trim().replace(/\s+/g, '_')}.pdf`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan || !agreed) return;

    const submissionDate = new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' });

    // 1. Generate local PDF file for client records
    handleDownloadPDF(selectedPlan, fullName, address, notes, submissionDate);

    // 2. Draft the exact message matching plain text greetings and ending confirmations
    const whatsappMessage = `Hello Durban Connect, I would like to apply for the following internet package:

*CLIENT PERSONAL DETAILS*
• Name: ${fullName}
• Installation Address: ${address}
• Additional Notes: ${notes.trim() ? notes : 'None'}
• Date & Time of Application: ${submissionDate} (SAST)

*PACKAGE DETAILS*
• Package Name: Durban Connect ${selectedPlan.name}
• Speed Bandwidth: ${selectedPlan.speed}
• Subscription Rate: From ${selectedPlan.price}/mo
• Included Plan Features: ${selectedPlan.features.join(', ')}

*LEGAL COMPLIANCE SELECTION STATE*
• Accepted Durban Connect's Privacy Policy, Terms, AUP, Payment Terms, POPIA and Router Policy: Yes [CONFIRMED]

I confirm that I have read and accepted all Durban Connect service terms, legal policies, POPIA compliance requirements, billing terms, and equipment ownership conditions.`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const customWhatsappUrl = `https://wa.me/27817064442?text=${encodedMessage}`;

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
      <motion.section 
        id="plans" 
        variants={variants}
        className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
      >
        {plans.map((plan, idx) => (
          <motion.div 
            key={idx} 
            variants={variants}
            className={`relative flex flex-col p-8 ${
              plan.highlight 
                ? 'bg-[var(--color-primary)] text-white bento-item-dark overflow-hidden' 
                : 'bg-white bento-item'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            )}

            <div className="mb-2">
              <h4 className={`font-bold uppercase text-xs tracking-widest mb-1 ${
                plan.highlight ? 'text-white/80' : 'text-slate-500'
              }`}>
                {plan.name} {plan.highlight && '(Most Popular)'}
              </h4>
              <div className={`text-4xl font-black ${
                plan.highlight ? 'text-white' : 'text-[var(--color-accent)]'
              }`}>
                <span className={`text-lg font-bold mr-1.5 ${
                  plan.highlight ? 'text-white/80' : 'text-slate-400'
                }`}>
                  From
                </span>
                {plan.price}<span className={`text-sm font-normal ml-1 ${
                  plan.highlight ? 'text-white/70' : 'text-slate-400'
                }`}>/mo</span>
              </div>
            </div>
            
            <p className={`text-sm mb-6 ${
              plan.highlight ? 'text-white/90' : 'text-slate-500'
            }`}>
              {plan.speed} — {plan.desc}
            </p>

            <ul className={`flex-1 space-y-3 mb-8 text-sm font-medium ${
              plan.highlight ? 'text-white/90' : 'text-slate-600'
            }`}>
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center">
                  <span className="mr-2 opacity-80">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <a 
              href="#plans" 
              onClick={(e) => {
                e.preventDefault();
                setSelectedPlan(plan);
              }}
              className={`btn-transition text-center py-3 px-6 rounded-xl font-bold w-full cursor-pointer ${
                plan.highlight 
                  ? 'bg-white text-[var(--color-primary)] hover:bg-slate-50 shadow-sm' 
                  : 'bg-slate-100 text-[var(--color-accent)] hover:bg-slate-200'
              }`}
            >
              Select Plan
            </a>
          </motion.div>
        ))}
      </motion.section>

      {/* PORTAL MODAL DIALOG CONTAINER */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-3xl max-w-2xl w-full text-left shadow-2xl relative border border-slate-100 flex flex-col overflow-hidden max-h-[90vh] animate-fade-in animate-duration-300">
            
            {/* Header section with branding layout */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest block font-mono">
                  DURBAN CONNECT BROADBAND CONNECTIVITY REGISTRATION
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
                    Please use the connection button below if the automated WhatsApp application window did not pop up to securely submit your file to Durban Connect's desk at +27 81 706 4442.
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
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[var(--color-primary)] hover:bg-red-700 text-white font-extrabold rounded-xl shadow-md shadow-red-200 text-xs transition cursor-pointer"
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
                      <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">
                        Selected Package Segment
                      </span>
                      <h4 className="text-lg font-black text-[var(--color-accent)] font-sans mt-0.5">
                        Durban Connect {selectedPlan.name}
                      </h4>
                      <p className="text-xs text-[var(--color-primary)] font-extrabold mt-0.5 font-sans">
                        {selectedPlan.speed} bandwidth — Uncapped & Symmetrical Speed
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">
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
                        I confirm that I have read, understood, and agreed to Durban Connect’s Privacy Policy, Terms of Service, Acceptable Use Policy, Payment Terms, POPIA Compliance Policy, and Equipment Ownership Policy.
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
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[var(--color-primary)] hover:bg-red-700 text-white font-extrabold rounded-xl shadow-md shadow-red-200 text-xs transition cursor-pointer font-sans"
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

