import React from 'react';
import { 
  ArrowLeft, Shield, FileText, CheckSquare, Scale, HelpCircle, 
  Check, Mail, Phone, MapPin, AlertTriangle, Smartphone, Info 
} from 'lucide-react';
import { motion } from 'motion/react';

interface LegalPagesProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export default function LegalPages({ currentRoute, onNavigate }: LegalPagesProps) {
  const tabs = [
    { id: 'privacy', name: 'Privacy Policy & POPIA', icon: Shield },
    { id: 'terms', name: 'Terms of Service', icon: Scale },
    { id: 'acceptable-use', name: 'Acceptable Use Policy', icon: CheckSquare },
    { id: 'payments', name: 'Payments & Billing Policy', icon: FileText },
    { id: 'liabilities', name: 'Liability & Service Terms', icon: Scale },
    { id: 'equipment', name: 'Router & Equipment Policy', icon: CheckSquare },
    { id: 'contact', name: 'Information Officer Contact', icon: HelpCircle },
  ];

  const activeTab = tabs.find(t => currentRoute.endsWith(t.id))?.id || 'privacy';

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15
      }
    }
  };

  const popiaPrinciples = [
    { num: "1", title: "Accountability", desc: "We take full responsibility for protecting your personal information and maintaining compliance." },
    { num: "2", title: "Processing Limitation", desc: "Your data is collected fairly, lawfully, and strictly under minimal necessity guidelines." },
    { num: "3", title: "Purpose Specification", desc: "We explicitly collect data for specified connection and account management functions." },
    { num: "4", title: "Further Processing", desc: "Your information is only processed for reasons compatible with its original collection." },
    { num: "5", title: "Information Quality", desc: "We maintain highly accurate, complete, and up-to-date data records at all times." },
    { num: "6", title: "Openness", desc: "We remain fully transparent about what categories of user telemetry are tracked." },
    { num: "7", title: "Security Safeguards", desc: "Strong industry-standard cryptographic techniques safeguard details against breaches." },
    { num: "8", title: "Data Subject Participation", desc: "You maintain complete rights to request access, correction, or absolute deletion." },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto text-slate-800"
    >
      {/* Top Action Header */}
      <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between gap-4">
        <button 
          onClick={() => onNavigate('')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-100 text-[var(--color-accent)] font-semibold rounded-xl border border-slate-200 shadow-sm transition-all text-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Homepage
        </button>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          POPIA & ICASA Registered Compliance
        </div>
      </motion.div>

      {/* Main Bento Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Menu Selector */}
        <motion.div variants={itemVariants} className="col-span-1 lg:col-span-4 bg-white bento-item p-6 lg:p-8 flex flex-col gap-5">
          <div>
            <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest block">Legal Directory</span>
            <h1 className="text-2xl font-black text-[var(--color-accent)] mt-1 tracking-tight">Durban Connect Legal Centre</h1>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Our network operates transparently and strictly in accordance with South Africa's Protection of Personal Information Act (POPIA) and ICASA guidelines.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-xs lg:text-sm transition-all text-left group ${
                    isActive 
                      ? 'bg-[var(--color-primary)] text-white shadow-md shadow-red-200' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-[var(--color-accent)] border border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    {tab.name}
                  </span>
                  <span className={`text-[10px] uppercase font-mono tracking-wider transition-opacity ${isActive ? 'opacity-80' : 'opacity-0 group-hover:opacity-60 text-slate-400'}`}>
                    Active
                  </span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-5 mt-2 bg-gradient-to-br from-red-50/50 to-transparent p-4 rounded-2xl border border-red-50/50">
            <h4 className="font-extrabold text-xs text-[var(--color-accent)] mb-1 flex items-center gap-1.5 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] font-sans"></span>
              Local Support Center
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-3 font-sans">
              Need assistance with data deletion request records, or local municipal agreements? Our legal desk is glad to assist.
            </p>
            <button 
              onClick={() => {
                onNavigate('');
                setTimeout(() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }}
              className="inline-block text-xs font-black text-[var(--color-primary)] hover:underline text-left cursor-pointer font-sans"
            >
              Contact Compliance Desk →
            </button>
          </div>
        </motion.div>

        {/* Right Column: Dynamic Content Sheet */}
        <motion.div variants={itemVariants} className="col-span-1 lg:col-span-8 bg-white bento-item p-8 lg:p-10 min-h-[550px] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-red-50/20 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="relative z-10 space-y-8 animate-fade-in">
            
            {/* 1. PRIVACY TAB */}
            {activeTab === 'privacy' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div>
                  <span className="inline-flex px-2.5 py-1 bg-red-50 text-[var(--color-primary)] text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider font-sans">
                    POPIA Framework
                  </span>
                  <h2 className="text-3xl font-extrabold text-[var(--color-accent)] tracking-tight font-sans">Your Privacy Matters</h2>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed font-sans">
                    Durban Connect collects and processes personal information only where necessary to provide premium WiFi, local internet connectivity, dedicated customer support (via Florida Road center), automated billing, and compliance reporting. We process your details with absolute security.
                  </p>
                </div>

                {/* POPIA Principles grid */}
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm text-[var(--color-accent)] uppercase tracking-wider font-sans animate-fade-in">
                    POPIA Compliance Principles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {popiaPrinciples.map((p, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-start gap-3 hover:border-slate-200 transition-colors">
                        <span className="w-7 h-7 flex items-center justify-center bg-red-50 text-[var(--color-primary)] font-bold text-xs rounded-lg shrink-0 font-sans">
                          {p.num}
                        </span>
                        <div>
                          <h4 className="font-bold text-xs text-[var(--color-accent)] font-sans">{p.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-sans">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Collection */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                  <h3 className="font-extrabold text-sm text-[var(--color-accent)] font-sans">Information We Collect</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-xs text-[var(--color-primary)] uppercase tracking-wider mb-2 font-sans">Customer Account Data</h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 font-semibold font-sans">
                        <li className="flex items-center gap-1.5 font-sans"><Check className="w-3.5 h-3.5 text-green-600 font-sans" /> Full Names & Identification Details</li>
                        <li className="flex items-center gap-1.5 font-sans"><Check className="w-3.5 h-3.5 text-green-600 font-sans" /> Registered Contact Numbers</li>
                        <li className="flex items-center gap-1.5 font-sans"><Check className="w-3.5 h-3.5 text-green-600 font-sans" /> Premium Email Addresses</li>
                        <li className="flex items-center gap-1.5 font-sans"><Check className="w-3.5 h-3.5 text-green-600" /> Residential Installation Markers</li>
                        <li className="flex items-center gap-1.5 font-sans"><Check className="w-3.5 h-3.5 text-green-600" /> EFT Payment Data (Debit Order Records)</li>
                        <li className="flex items-center gap-1.5 font-sans"><Check className="w-3.5 h-3.5 text-green-600" /> Service Telemetry records</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[var(--color-primary)] uppercase tracking-wider mb-2 font-sans">Website & Technical Data</h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 font-semibold font-sans">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-600" /> Dynamic IP & Network Addresses</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-600" /> Hardware Device & MAC Identifiers</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-600" /> Local Cookie and Session Indicators</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-600" /> Platform Telemetry logs</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-600" /> Helpdesk Ticket Submissions</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-600" /> Live Web Inquiry forms</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Security Measures */}
                <div className="bg-[var(--color-accent)] text-white p-6 rounded-2xl space-y-4 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none font-sans" />
                  <h3 className="font-black text-sm text-[#FFD5D5] uppercase tracking-wider font-sans">Security & Protection Protocol</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-200">
                    <p className="leading-relaxed font-sans">
                      Durban Connect deploys strict physical, logical, software, and organizational safeguards of the highest order to shield personal info from unauthorized breaches, extraction, disclosure, or physical sabotage.
                    </p>
                    <ul className="space-y-1 font-sans">
                      <li className="flex items-center gap-2 font-sans">✓ Dynamic Network Cryptographic Firewalls</li>
                      <li className="flex items-center gap-2 font-sans">✓ Encrypted server storage vaults</li>
                      <li className="flex items-center gap-2 font-sans">✓ Two-Factor access control lists</li>
                      <li className="flex items-center gap-2 font-sans">✓ Staff confidentiality binds</li>
                      <li className="flex items-center gap-2 font-sans">✓ Systematic data breach audits</li>
                    </ul>
                  </div>
                </div>

                {/* Rights checklist */}
                <div className="space-y-3 font-sans">
                  <h3 className="font-extrabold text-sm text-[var(--color-accent)] font-sans">Your Rights Under POPIA</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      "Request access to personal logs",
                      "Ensure correction of records",
                      "Request deletion of historic data",
                      "Object to specific automated profiling",
                      "Opt out from dynamic marketing lists",
                      "Lodge complaints for compliance review"
                    ].map((right, idx) => (
                      <div key={idx} className="bg-red-50/50 border border-red-100 p-3 rounded-lg text-xs font-bold text-red-900 flex items-center gap-2 font-sans">
                        <span className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0 text-[10px]">✓</span>
                        {right}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. TERMS OF SERVICE */}
            {activeTab === 'terms' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <span className="inline-flex px-2.5 py-1 bg-red-50 text-[var(--color-primary)] text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider font-sans">
                    Terms & Conditions
                  </span>
                  <h2 className="text-3xl font-extrabold text-[var(--color-accent)] tracking-tight font-sans">Terms of Service</h2>
                  <p className="text-xs text-slate-400 mt-1">Last Updated: May 2026</p>
                </div>

                <div className="space-y-4 text-xs lg:text-sm text-slate-600 leading-relaxed">
                  <p className="font-sans">
                    Welcome to Durban Connect. These General Terms of Service govern your active subscription, access keys, and technical use of our robust wireless network routers and connection setups inside the eThekwini Metropolitan precinct.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                      <h4 className="font-extrabold text-xs text-[var(--color-accent)] uppercase font-sans">1. Service Provisioning</h4>
                      <p className="text-[11px] text-slate-500 font-sans">Service relies strictly on physical line-of-sight metrics, weather indexes, and localized infrastructure layouts. Speed estimates are not hard minimum guarantees.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                      <h4 className="font-extrabold text-xs text-[var(--color-accent)] uppercase font-sans">2. Subscription Lifecycle</h4>
                      <p className="text-[11px] text-slate-500 font-sans">Service is routed on month-to-month contracts. To cancel, a client submits an online cancellation notice 30 days prior to target anniversary periods.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                      <h4 className="font-extrabold text-xs text-[var(--color-accent)] uppercase font-sans">3. Infrastructure Security</h4>
                      <p className="text-[11px] text-slate-500 font-sans">Subscribers must safeguard any hardware devices (CPE, routers) deployed by local field installers on premises.</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                      <h4 className="font-extrabold text-xs text-[var(--color-accent)] uppercase font-sans">4. Ethical Usage Bound</h4>
                      <p className="text-[11px] text-slate-500 font-sans font-medium">Subscribers agree entirely never to redistribute network lanes commercially or host unauthorized public hotzones.</p>
                    </div>
                  </div>

                  <div className="border border-red-100 p-4 rounded-xl bg-red-50/20 text-xs flex gap-3 text-slate-600">
                    <Info className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[var(--color-accent)] mb-0.5 font-sans">Regulatory Compliance Notice</p>
                      <p className="text-[11px] text-slate-500 font-sans">Durban Connect conforms to the Code of Conduct issued by ICASA under South African telecommunication standard bylaws.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. ACCEPTABLE USE */}
            {activeTab === 'acceptable-use' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <span className="inline-flex px-2.5 py-1 bg-amber-50 text-amber-800 text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider font-sans">
                    Acceptable Use Guidelines
                  </span>
                  <h2 className="text-3xl font-extrabold text-[var(--color-accent)] tracking-tight font-sans">Acceptable Internet Usage</h2>
                  <p className="text-xs text-slate-400 mt-1">Last Updated: May 2026</p>
                </div>

                <div className="space-y-4 text-xs lg:text-sm text-slate-600 leading-relaxed font-sans">
                  <p>
                    To guarantee phenomenal internet speed and continuous access stability for businesses and families throughout Durban, we maintain a strict Acceptable Use Standard.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-slate-100 rounded-xl space-y-2">
                      <h4 className="font-bold text-xs text-red-600 uppercase flex items-center gap-1.5 font-sans">
                        <AlertTriangle className="w-3.5 h-3.5 font-sans" /> Prohibited Actions
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-500 font-bold font-sans">
                        <li>• Illegal downloads or copyright infringing transfers.</li>
                        <li>• Hacking, credential testing, or DDoS network abuse.</li>
                        <li>• Re-broadcasting or unauthorized lane resale.</li>
                        <li>• Hosting automated high-volume scraping nodes.</li>
                        <li>• Sharing of access passwords with non-subscribed neighbors.</li>
                      </ul>
                    </div>

                    <div className="p-4 border border-slate-100 rounded-xl space-y-2 font-sans">
                      <h4 className="font-bold text-xs text-[var(--color-accent)] uppercase flex items-center gap-1.5 font-sans">
                        <CheckSquare className="w-3.5 h-3.5" /> Enforcement Remedies
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-500 font-bold font-sans">
                        <li>• Automated bandwidth warnings on sustained peak spikes.</li>
                        <li>• Temporary rate-limiting on extreme download arrays.</li>
                        <li>• Service pause on deliberate safety infringements.</li>
                        <li>• Communication of gross violations to ICASA or local police.</li>
                        <li>• Absolute profile termination for repeated abuse.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. PAYMENTS & BILLING */}
            {activeTab === 'payments' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <span className="inline-flex px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider font-sans">
                    Financial Policy
                  </span>
                  <h2 className="text-3xl font-extrabold text-[var(--color-accent)] tracking-tight font-sans">Payments & Billing Policy</h2>
                  <p className="text-xs text-slate-400 mt-1">Last Updated: May 2026</p>
                </div>

                <div className="space-y-4 text-xs lg:text-sm text-slate-600 leading-relaxed font-sans">
                  <p>
                    Our billing structures are completely transparent, direct, and straightforward. Durban Connect accepts reliable instant EFT, credit cards, or cash voucher vouchers.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 font-sans">
                      <h4 className="font-extrabold text-xs text-[var(--color-primary)] uppercase tracking-wider font-sans">Subscriber Obligations</h4>
                      <ul className="space-y-2 text-xs text-slate-500 inline-block font-semibold font-sans">
                        <li className="flex items-start gap-1.5 font-sans">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> 
                          <span>Payment must settle on or before your specified due cycle dates.</span>
                        </li>
                        <li className="flex items-start gap-1.5 font-sans">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> 
                          <span>Unpaid accounts face automatic server-side internet suspensions.</span>
                        </li>
                        <li className="flex items-start gap-1.5 font-sans">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> 
                          <span>Reconnection charges apply for reactivating suspended profiles.</span>
                        </li>
                        <li className="flex items-start gap-1.5 font-sans">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> 
                          <span>Billing discrepancies must be raised with finance within 7 business days.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3 font-sans animate-fade-in">
                      <h4 className="font-extrabold text-xs text-[var(--color-accent)] uppercase tracking-wider font-sans">Durban Connect Obligations</h4>
                      <ul className="space-y-2 text-xs text-slate-500 inline-block font-semibold font-sans">
                        <li className="flex items-start gap-1.5 font-sans">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5 font-sans" /> 
                          <span>Deliver pristine monthly tax invoices to your registered email inboxes.</span>
                        </li>
                        <li className="flex items-start gap-1.5 font-sans">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5 font-sans" /> 
                          <span>Avoid dynamic hidden rates or arbitrary subscription price escalations.</span>
                        </li>
                        <li className="flex items-start gap-1.5 font-sans">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5 font-sans" /> 
                          <span>Notify users of scheduled network upgrades at least 24 hours in advance.</span>
                        </li>
                        <li className="flex items-start gap-1.5 font-sans">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /> 
                          <span>Safeguard bank records strictly as demanded by POPIA standards.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. LIABILITIES */}
            {activeTab === 'liabilities' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <span className="inline-flex px-2.5 py-1 bg-red-50 text-[var(--color-primary)] text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider font-sans">
                    Limitation of Liability
                  </span>
                  <h2 className="text-3xl font-extrabold text-[var(--color-accent)] tracking-tight font-sans font-sans">Liability & Service Terms</h2>
                  <p className="text-xs text-slate-400 mt-1">Last Updated: May 2026</p>
                </div>

                <div className="space-y-4 text-xs lg:text-sm text-slate-600 leading-relaxed font-sans">
                  <p>
                    These columns establish legal boundaries of liability between the subscriber and Durban Connect internet services.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 bg-red-50/30 p-5 rounded-2xl border border-red-50 font-sans">
                      <h4 className="font-extrabold text-xs text-red-700 uppercase tracking-widest font-sans">Customer Liabilities</h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 font-bold list-disc pl-4 font-sans">
                        <li>Sustaining perfect safeguarding of antenna CPE and home routers from theft, drops, or fire damage.</li>
                        <li>Absolutely zero hardware settings alterations or internal physical router disassembly.</li>
                        <li>Compliance of any online downloads, sites, and logs connected to the account.</li>
                        <li>Enabling safe, physical roof/line property clearances for Durban field deployment installers.</li>
                      </ul>
                    </div>

                    <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100 font-sans">
                      <h4 className="font-extrabold text-xs text-[var(--color-accent)] uppercase tracking-widest font-sans">Durban Connect Liabilities</h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 font-bold list-disc pl-4 font-sans">
                        <li>Durban Connect will exert high professional efforts to secure robust uptime indices.</li>
                        <li>No liability is assumed for network delays provoked by loadshedding, thunder strikes, fiber damage, or force majeure.</li>
                        <li>No liability exists for end-user computer software virus updates, firewalls, or browser errors.</li>
                        <li>Speeds may occasionally throttle slightly, conforming with peak regional hub limits.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 6. EQUIPMENT POLICY */}
            {activeTab === 'equipment' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 animate-fade-in">
                <div>
                  <span className="inline-flex px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider font-sans">
                    Hardware Assets
                  </span>
                  <h2 className="text-3xl font-extrabold text-[var(--color-accent)] tracking-tight font-sans">Router & Equipment Ownership Policy</h2>
                  <p className="text-xs text-slate-400 mt-1">Last Updated: May 2026</p>
                </div>

                <div className="space-y-4 text-xs lg:text-sm text-slate-600 leading-relaxed font-sans">
                  <p>
                    All antennas, brackets, power adapters (PoE injectors), and WiFi routers provided by Durban Connect remain the absolute property of Durban Connect.
                  </p>

                  <div className="p-4 bg-red-50/50 border border-red-200/60 rounded-xl flex items-start gap-3 font-sans">
                    <AlertTriangle className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-xs text-red-950 font-sans">Identification Sticker Warning</h4>
                      <p className="text-[11px] text-red-800 leading-relaxed mt-0.5 font-bold font-sans">
                        Our equipment contains specialized tamper-proof barcode stickers. Removal of stickers void warranties and constitutes a serious contract discrepancy.
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-500 inline-block font-semibold font-sans">
                    <li className="flex items-start gap-1.5 font-sans">
                      <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full shrink-0 mt-2 font-sans"></span>
                      <span>Subscribers are prohibited from altering, transferring, or selling the routing equipment.</span>
                    </li>
                    <li className="flex items-start gap-1.5 font-sans">
                      <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full shrink-0 mt-2 font-sans"></span>
                      <span>Upon monthly subscription cancellation, all provided lines hardware must be gathered for field team collection within 14 business days.</span>
                    </li>
                    <li className="flex items-start gap-1.5 font-sans">
                      <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full shrink-0 mt-2 font-sans"></span>
                      <span>Lost, physically cracked, or power-surged routers (where surge protection keys were ignored) will be billed at full replacement cost.</span>
                    </li>
                    <li className="flex items-start gap-1.5 font-sans">
                      <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full shrink-0 mt-2 font-sans"></span>
                      <span>We reserve the right to deploy technicians to replace old routing components with next-generation WiFi units when scheduled.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* 7. CONTACT & INFO OFFICER */}
            {activeTab === 'contact' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <span className="inline-flex px-2.5 py-1 bg-blue-50 text-[#101828] text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider font-sans">
                    Statutory Officer
                  </span>
                  <h2 className="text-3xl font-extrabold text-[var(--color-accent)] tracking-tight font-sans">Compliance & Contact Details</h2>
                  <p className="text-xs text-slate-400 mt-1 font-sans">Last Updated: May 2026</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
                    <h3 className="font-extrabold text-sm text-[var(--color-accent)] flex items-center gap-2 font-sans">
                      <Shield className="w-4 h-4 text-[var(--color-primary)]" /> Statutory Information Officer
                    </h3>
                    <div className="space-y-2 text-xs text-slate-600 font-bold font-sans">
                      <p><span className="text-slate-400 font-sans font-medium">Designated Deputy:</span> Mr. Sipho Ngcobo</p>
                      <p><span className="text-slate-400 font-sans font-medium">Compliance Role:</span> Senior Counsel & Information Officer</p>
                      <p className="flex items-center gap-1.5 font-sans"><Mail className="w-3.5 h-3.5 text-slate-400 font-sans" /> compliance@durbanconnect.co.za</p>
                      <p className="flex items-center gap-1.5 font-sans"><Phone className="w-3.5 h-3.5 text-slate-400 font-sans" /> +27 (0) 31 555 0192</p>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans font-medium">
                      You are welcome to submit POPIA-specific audit requests, logs rectification forms, or billing escalation files directly to our Information Officer mailboxes.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
                    <h3 className="font-extrabold text-sm text-[var(--color-accent)] flex items-center gap-2 font-sans">
                      <MapPin className="w-4 h-4 text-[var(--color-primary)] font-sans" /> Durban Corporate Address
                    </h3>
                    <div className="space-y-1.5 text-xs text-slate-600 font-bold font-sans">
                      <p className="font-bold text-[var(--color-accent)]">Durban Connect Head Office</p>
                      <p>102 Florida Road</p>
                      <p>Morningside</p>
                      <p>Durban</p>
                      <p>KwaZulu-Natal</p>
                      <p>4001, South Africa</p>
                    </div>
                    <div className="text-[10px] text-slate-400 leading-relaxed pt-1.5 border-t border-slate-200 font-sans font-medium">
                      Walk-ins are welcomed 08:30 – 16:30 for support assistance and hardware queries.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
