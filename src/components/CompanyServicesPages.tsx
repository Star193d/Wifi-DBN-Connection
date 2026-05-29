import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Wifi, Building, Activity, Send, Phone, Mail, 
  MapPin, Clock, ArrowRight, CheckCircle2, User, FileText, 
  Briefcase, Heart, BookOpen, AlertCircle, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CompanyServicesPagesProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export default function CompanyServicesPages({ currentRoute, onNavigate }: CompanyServicesPagesProps) {
  // Extract route sub-targets: services, about, careers, contact-us, blog
  let initialTab = 'services';
  if (currentRoute.includes('about')) initialTab = 'about';
  else if (currentRoute.includes('careers')) initialTab = 'careers';
  else if (currentRoute.includes('contact-us')) initialTab = 'contact-us';
  else if (currentRoute.includes('blog')) initialTab = 'blog';
  else if (currentRoute.includes('home-wifi')) initialTab = 'home-wifi';
  else if (currentRoute.includes('business-fiber')) initialTab = 'business-fiber';

  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    let t = 'services';
    if (currentRoute.includes('about')) t = 'about';
    else if (currentRoute.includes('careers')) t = 'careers';
    else if (currentRoute.includes('contact-us')) t = 'contact-us';
    else if (currentRoute.includes('blog')) t = 'blog';
    else if (currentRoute.includes('home-wifi')) t = 'home-wifi';
    else if (currentRoute.includes('business-fiber')) t = 'business-fiber';
    setActiveTab(t);
  }, [currentRoute]);

  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantMessage, setApplicantMessage] = useState('');

  const tabs = [
    { id: 'services', name: 'Our Services', icon: Wifi },
    { id: 'about', name: 'About Us', icon: Heart },
    { id: 'careers', name: 'Careers', icon: Briefcase },
    { id: 'blog', name: 'Company Blog', icon: BookOpen },
    { id: 'contact-us', name: 'Contact & Support', icon: Phone },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onNavigate(tabId === 'contact-us' ? 'contact-us' : tabId);
  };

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setApplicationSubmitted(false);
    setTimeout(() => {
      const el = document.getElementById('application-form-element');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setApplicantMessage('');
    }, 1000);
  };

  const handleInterestClick = (serviceType: string) => {
    onNavigate('');
    setTimeout(() => {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        const commentArea = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
        if (commentArea) {
          commentArea.value = `Hi, I am interested in signing up for the Durban Connect ${serviceType} package. Please contact me with availability in my area.`;
          const event = new Event('input', { bubbles: true });
          commentArea.dispatchEvent(event);
        }
      }
    }, 450);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 15
      }
    }
  };

  const homeWiFiFeatures = [
    "High-speed uncapped internet",
    "Reliable Wi-Fi coverage across rooms",
    "Symmetrical upload & download speeds",
    "Smart router installation included",
    "Flexible month-to-month packages",
    "Local physical & phone technical support",
    "Extremely affordable rates",
    "Super fast installation turnaround"
  ];

  const homeWiFiPerfectFor = [
    "Seamlessly streaming Netflix, YouTube & DSTV",
    "Ultra-low latency competitive online gaming",
    "Remote office work & crystal-clear Zoom calls",
    "Smart home appliances & CCTV integration",
    "Online school, university & e-learning systems",
    "Sustained browsing and social media uploads"
  ];

  const businessFiberFeatures = [
    "Dedicated premium business-grade connectivity",
    "Ultra high-speed fiber internet pathways",
    "Low latency direct peering links",
    "Priority SLA & express support assistance",
    "Static IP allocation options available",
    "Cryptographically secure custom routing configs",
    "Highly scalable operational packages",
    "24/7 continuous service telemetry monitoring"
  ];

  const businessSuitableFor = [
    "Corporate offices & busy workspaces",
    "Point-of-Sale systems in busy retail stores",
    "Training academies, public schools & digital labs",
    "Guest internet in restaurants & luxury hospitality",
    "Remote engineering and distributed developer teams",
    "Industrial automation and secure cloud backups",
    "VoIP PBX telephone communications"
  ];

  const installSteps = [
    { num: "01", name: "Coverage Verification", desc: "Our telemetry parameters check signal density in your street." },
    { num: "02", name: "Site Assessment", desc: "Our field engineers evaluate optimal receiver heights and cable links." },
    { num: "03", name: "Professional Setup", desc: "Our accredited technicians deploy secure physical lines on your roof." },
    { num: "04", name: "Router Activation & Mapping", desc: "We map your high-speed router nodes with localized sub-nets." },
    { num: "05", name: "Customer Onboarding Support", desc: "We assist on-site to link up each of your personal and business devices." }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Vuma Reach & Durban Connect WiFi Expansion Across KZN",
      tag: "Expansion",
      date: "May 25, 2026",
      readTime: "4 min read",
      summary: "Exciting developments as Durban Connect partners to expand fast, uncapped high-speed nodes throughout Westville, Berea, and surrounding local neighborhoods. Read of our localized rollouts."
    },
    {
      id: 2,
      title: "How to Optimize Your Home WiFi Router Placement for Peak Speeds",
      tag: "Tech Tips",
      date: "May 18, 2026",
      readTime: "5 min read",
      summary: "Struggling with dead zones in double-story residences? Our network engineers outline placement strategies, channel adjustments, and interference reduction hacks."
    },
    {
      id: 3,
      title: "Why POPIA Compliance is Critical for Your Local Internet Provider",
      tag: "Compliance & Security",
      date: "May 10, 2026",
      readTime: "7 min read",
      summary: "Understand Act 4 of 2013 (POPIA) under South African context. We analyze how Durban Connect structures customer telemetry protection and maintains database defenses."
    }
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
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
          KZN Connectivity Hub • Open & Active
        </div>
      </motion.div>

      {/* Main Bento Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Menu Selector */}
        <motion.div variants={itemVariants} className="col-span-1 lg:col-span-4 bg-white bento-item p-6 lg:p-8 flex flex-col gap-5">
          <div>
            <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest block font-sans">Durban Connect Portal</span>
            <h1 className="text-2xl font-black text-[var(--color-accent)] mt-1 tracking-tight font-sans">Services & Company</h1>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
              Explore our comprehensive local KZN internet packages, recruitment opportunities, historical vision vectors, and corporate contact centers.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id || 
                               (tab.id === 'services' && (activeTab === 'home-wifi' || activeTab === 'business-fiber'));
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
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
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-white translate-x-0.5' : 'text-slate-400 group-hover:translate-x-1 opacity-0 group-hover:opacity-100'}`} />
                </button>
              );
            })}
          </div>

          {/* Prompt Highlight block */}
          <div className="border-t border-slate-100 pt-5 mt-2 bg-gradient-to-br from-red-50 to-transparent p-4 rounded-2xl border border-red-50/50">
            <h4 className="font-extrabold text-xs text-[var(--color-accent)] mb-1 flex items-center gap-1.5 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)] animate-pulse" />
              Empowering eThekwini Nodes
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-3 font-sans">
              Locally managed and active since inception. Deploying uncapped connections for families and businesses.
            </p>
            <button 
              onClick={() => handleTabChange('contact-us')} 
              className="text-xs font-black text-[var(--color-primary)] hover:underline cursor-pointer font-sans"
            >
              Get Priority Assistance →
            </button>
          </div>
        </motion.div>

        {/* Right Column: Dynamic Content Sheet */}
        <motion.div variants={itemVariants} className="col-span-1 lg:col-span-8 bg-white bento-item p-8 lg:p-10 min-h-[550px] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-red-50/20 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            
            {/* 1. SERVICES TAB */}
            {(activeTab === 'services' || activeTab === 'home-wifi' || activeTab === 'business-fiber') && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div>
                  <span className="inline-flex px-2.5 py-1 bg-red-50 text-[var(--color-primary)] text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider font-sans">
                    Our Services
                  </span>
                  <h2 className="text-3xl font-extrabold text-[var(--color-accent)] tracking-tight font-sans">
                    Reliable Internet Solutions
                  </h2>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed font-sans">
                    Durban Connect provides high-speed, affordable, and dependable internet solutions designed to keep homes, families, and businesses connected across Durban and surrounding KZN regions. We focus on stable performance, local support, fast installations, and flexible packages tailored to your needs.
                  </p>
                </div>

                {/* Sub Segment Router toggle */}
                <div className="flex gap-2 p-1 bg-slate-50 rounded-xl max-w-sm border border-slate-100">
                  <button 
                    onClick={() => setActiveTab('services')}
                    className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                      activeTab === 'services' 
                        ? 'bg-white shadow-sm text-[var(--color-primary)]' 
                        : 'text-slate-600 hover:text-[var(--color-accent)]'
                    }`}
                  >
                    View All
                  </button>
                  <button 
                    onClick={() => setActiveTab('home-wifi')}
                    className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                      activeTab === 'home-wifi' 
                        ? 'bg-white shadow-sm text-[var(--color-primary)]' 
                        : 'text-slate-600 hover:text-[var(--color-accent)]'
                    }`}
                  >
                    Home Wi-Fi
                  </button>
                  <button 
                    onClick={() => setActiveTab('business-fiber')}
                    className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                      activeTab === 'business-fiber' 
                        ? 'bg-white shadow-sm text-[var(--color-primary)]' 
                        : 'text-slate-600 hover:text-[var(--color-accent)]'
                    }`}
                  >
                    Business Fiber
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  
                  {/* HOME WIFI */}
                  {(activeTab === 'services' || activeTab === 'home-wifi') && (
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-200 transition-all">
                      <div>
                        <div className="w-10 h-10 bg-red-100 text-[var(--color-primary)] rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                          🏠
                        </div>
                        <h3 className="font-black text-lg text-[var(--color-accent)] mb-1 font-sans font-sans">Home Wi-Fi</h3>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3 font-sans">Fast & Affordable Home Internet</p>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4 font-sans">
                          Enjoy seamless streaming, online gaming, remote work, online learning, and everyday browsing. Our home internet solutions are designed for modern households that need reliable connectivity without complicated contracts or hidden costs.
                        </p>
                        
                        <div className="border-t border-slate-200/60 pt-4 mb-4">
                          <h4 className="font-extrabold text-[11px] text-[var(--color-primary)] uppercase tracking-wider mb-2 font-sans">Core Features</h4>
                          <ul className="grid grid-cols-1 gap-1.5">
                            {homeWiFiFeatures.slice(0, 4).map((f, i) => (
                              <li key={i} className="text-xs text-slate-600 font-semibold flex items-center gap-2 font-sans">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {f}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="border-t border-slate-200/60 pt-4 mb-4">
                          <h4 className="font-extrabold text-[11px] text-[var(--color-accent)] uppercase tracking-wider mb-2 font-sans">Perfect For</h4>
                          <ul className="grid grid-cols-1 gap-1.5">
                            {homeWiFiPerfectFor.slice(0, 3).map((f, i) => (
                              <li key={i} className="text-xs text-slate-600 font-semibold flex items-center gap-2 font-sans">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></span> {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleInterestClick('Home Wi-Fi')}
                        className="w-full mt-4 bg-[var(--color-primary)] hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-sans"
                      >
                        Inquire Home Wi-Fi Now <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* BUSINESS FIBER */}
                  {(activeTab === 'services' || activeTab === 'business-fiber') && (
                    <div className="bg-[#101828] text-white p-6 rounded-2xl flex flex-col justify-between hover:bg-[#1a2436] transition-all">
                      <div>
                        <div className="w-10 h-10 bg-red-600/30 text-rose-400 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                          🏢
                        </div>
                        <h3 className="font-black text-lg text-white mb-1 font-sans">Business Fiber</h3>
                        <p className="text-xs text-rose-400 font-semibold uppercase tracking-wider mb-3 font-sans">Enterprise-Grade Performance</p>
                        <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans font-normal">
                          Fast, secure, and scalable internet connectivity for businesses of all sizes. Our business packages are designed for reliability, uptime, and performance for operations, communication, cloud services, and customer support.
                        </p>
                        
                        <div className="border-t border-slate-700/60 pt-4 mb-4">
                          <h4 className="font-extrabold text-[11px] text-red-500 uppercase tracking-wider mb-2 font-sans">Enterprise Features</h4>
                          <ul className="grid grid-cols-1 gap-1.5">
                            {businessFiberFeatures.slice(0, 4).map((f, i) => (
                              <li key={i} className="text-xs text-slate-200 font-semibold flex items-center gap-2 font-sans">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {f}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="border-t border-slate-700/60 pt-4 mb-4">
                          <h4 className="font-extrabold text-[11px] text-[#FFD5D5] uppercase tracking-wider mb-2 font-sans">Suitable For</h4>
                          <ul className="grid grid-cols-1 gap-1.5">
                            {businessSuitableFor.slice(0, 3).map((f, i) => (
                              <li key={i} className="text-xs text-slate-300 font-semibold flex items-center gap-2 font-sans">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleInterestClick('Business Fiber')}
                        className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-sans"
                      >
                        Inquire Business Fiber Now <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                </div>

                <div className="border-t border-slate-100 pt-8 mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-black text-base text-[var(--color-accent)] mb-3 flex items-center gap-2 font-sans">
                      <span className="w-5 h-5 rounded bg-red-100 text-[var(--color-primary)] flex items-center justify-center font-extrabold text-[10px]">✓</span>
                      Installation Workflow
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed font-sans">
                      Our certified local KZN technician teams operate fluidly to setup connectivity within record time. Here is our 5-step commitment:
                    </p>
                    <div className="space-y-3">
                      {installSteps.map((step, index) => (
                        <div key={index} className="flex gap-3 hover:bg-slate-50 p-2.5 rounded-xl transition-all">
                          <span className="w-6 h-6 rounded bg-[var(--color-primary)] text-white text-xs font-black flex items-center justify-center shrink-0 font-sans">
                            {step.num}
                          </span>
                          <div>
                            <h4 className="font-extrabold text-xs text-[var(--color-accent)] font-sans">{step.name}</h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 font-sans">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-black text-base text-[var(--color-accent)] mb-3 flex items-center gap-2 font-sans">
                      <span className="w-5 h-5 rounded bg-red-100 text-[var(--color-primary)] flex items-center justify-center font-extrabold text-[10px]">✓</span>
                      Why Durban Businesses Partner with Us
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed font-sans">
                      We deliver consistent line speeds and responsive service agreements backed by physical staff offices near you.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { title: "Reliable Uptime Plans", desc: "Redundant upstream gateway architectures prevent total outages." },
                        { title: "Fast Resolution SLA", desc: "Dedicated corporate engineering units resolve faults under specified loops." },
                        { title: "Florida Road Support", desc: "Walk-ins are welcome for personalized tech support." },
                        { title: "Certified Deployments", desc: "Strict adherence to municipal structural rules." },
                        { title: "Transparent Billing", desc: "Month-to-month contracts containing zero hidden service rates." },
                        { title: "Tailored Topologies", desc: "Dynamic bandwidth shapes depending on customer office load profiles." }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-red-50/40 p-3.5 border border-red-100/40 rounded-xl space-y-1 hover:border-red-100 transition-all">
                          <h4 className="font-extrabold text-xs text-red-950 font-sans">{item.title}</h4>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-sans">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. ABOUT US TAB */}
            {activeTab === 'about' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <span className="inline-flex px-2.5 py-1 bg-red-50 text-[var(--color-primary)] text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider font-sans">
                    Our Story
                  </span>
                  <h2 className="text-3xl font-extrabold text-[var(--color-accent)] tracking-tight font-sans">Connecting Durban, One Home at a Time</h2>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed font-sans">
                    Durban Connect is a proudly South African WiFi and internet service provider dedicated to delivering reliable, affordable, and high-speed connectivity solutions to homes and businesses across Durban and surrounding eThekwini Metro neighborhoods.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold font-sans">
                      We believe internet access should be simple, dependable, and accessible to everyone. Our mission is to bridge the digital gap by providing fast installations, responsive support, transparent pricing, and stable internet services designed for modern households and growing businesses.
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold font-sans">
                      Whether you need internet for streaming, remote work, gaming, online learning, or critical enterprise office operations, the team at Durban Connect is bound locally to support of your digital lifestyle.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="bg-[#101828] text-white p-5 rounded-2xl border border-slate-800">
                        <span className="text-[10px] font-extrabold text-rose-400 block mb-1 uppercase tracking-wider font-sans">Our Vision</span>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-sans">To become Durban's most trusted community internet provider by delivering exceptional connectivity and customer service.</p>
                      </div>
                      <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100">
                        <span className="text-[10px] font-extrabold text-[var(--color-primary)] block mb-1 uppercase tracking-wider font-sans">Our Mission</span>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-medium">To provide reliable internet solutions while maintaining integrity, transparency, affordability, and customer satisfaction.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                    <h3 className="font-extrabold text-xs text-[var(--color-accent)] uppercase tracking-wider mb-4 font-sans">
                      Why Choose Durban Connect?
                    </h3>
                    <div className="space-y-2.5">
                      {[
                        "Fast and reliable WiFi solutions with low-latency direct links",
                        "Affordable, customizable internet packages that fit your household budget",
                        "Sincere, local customer support directly in KZN (No faraway call centers!)",
                        "Professional equipment installations by thoroughly vetted installers",
                        "Compliant, POPIA protected information management frameworks",
                        "Transparent billing practices with month-to-month contracts",
                        "Community-focused service delivery centered around neighborhood growth"
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200/50 shadow-sm hover:border-[var(--color-primary)] transition-all">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <p className="text-[11px] text-slate-600 font-bold leading-tight font-sans">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. CAREERS TAB */}
            {activeTab === 'careers' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <span className="inline-flex px-2.5 py-1 bg-red-50 text-[var(--color-primary)] text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider font-sans">
                    Recruitment
                  </span>
                  <h2 className="text-3xl font-extrabold text-[var(--color-accent)] tracking-tight font-sans">Join the Durban Connect Team</h2>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed font-sans">
                    At Durban Connect, we are building more than just high-speed internet networks — we are building opportunities, career paths, communities, and digital growth. We are always looking for motivated individuals who are passionate about technology, outstanding customer service, and local innovation.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <div className="bg-[#101828] text-white p-6 rounded-2xl">
                      <h3 className="font-extrabold text-xs text-[#FFD5D5] uppercase tracking-wider mb-3 font-sans">Why Work With Us?</h3>
                      <ul className="space-y-2 text-xs text-slate-300 font-medium font-sans">
                        <li className="flex items-center gap-2">✓ Rapid and supportive internal leadership growth avenues</li>
                        <li className="flex items-center gap-2">✓ Warm, encouraging and collaborative team environment</li>
                        <li className="flex items-center gap-2">✓ Hands-on advanced systems & tech training directly in field</li>
                        <li className="flex items-center gap-2">✓ Highly competitive, stable monthly commission and packages</li>
                        <li className="flex items-center gap-2">✓ Dynamic career development options</li>
                        <li className="flex items-center gap-2">✓ Deploy and manage next-generation optical & wireless hardware</li>
                      </ul>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                      <h3 className="font-extrabold text-xs text-[var(--color-accent)] uppercase tracking-wider mb-3 font-sans">
                        Active Job Opportunities
                      </h3>
                      <p className="text-[11px] text-slate-500 mb-3 leading-relaxed font-sans">
                        Select a target connection role to display our immediate compliance application form inline below:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          "WiFi Installation Technician",
                          "Network Support Technician",
                          "Customer Support Agent",
                          "Sales Representative",
                          "Field Assistant",
                          "Administrative Staff"
                        ].map((job, index) => (
                          <button
                            key={index}
                            onClick={() => handleApplyClick(job)}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[11px] text-left font-bold transition-all cursor-pointer ${
                              selectedJob === job
                                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] font-sans'
                                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 font-sans'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${selectedJob === job ? 'bg-white' : 'bg-red-500 animate-pulse'}`}></span>
                            <span>{job}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Application Submission form */}
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl relative shadow-sm" id="application-form-element">
                    <h3 className="font-extrabold text-sm text-[var(--color-accent)] mb-1 font-sans">
                      {selectedJob ? `Apply: ${selectedJob}` : 'Direct Talent Application'}
                    </h3>
                    <p className="text-[11px] text-slate-500 mb-4 leading-relaxed font-sans">
                      Join our team of Durban technological expanders. Fill in your details below.
                    </p>

                    {applicationSubmitted ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        className="bg-green-50 border border-green-200 p-5 rounded-2xl text-center space-y-3"
                      >
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-lg mx-auto">✓</div>
                        <h4 className="font-black text-xs text-green-950 font-sans">Application Dispatched Successfully</h4>
                        <p className="text-[10px] text-green-800 leading-relaxed font-semibold font-sans">
                          Thank you! Sipho Ngcobo's HR desk will review your details against our ICASA support parameters and get in touch with you shortly.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleApplySubmit} className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1 font-sans">Your Full Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Sipho Sibaya" 
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] font-sans"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1 font-sans">Email Address</label>
                            <input 
                              type="email" 
                              required
                              placeholder="sipho@domain.co.za" 
                              value={applicantEmail}
                              onChange={(e) => setApplicantEmail(e.target.value)}
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] font-sans"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1 font-sans">Contact Phone</label>
                            <input 
                              type="tel" 
                              placeholder="+27 031 555 1234" 
                              value={applicantPhone}
                              onChange={(e) => setApplicantPhone(e.target.value)}
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] font-sans"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1 font-sans">Experience Summary</label>
                          <textarea 
                            rows={3}
                            placeholder="Detail your past tech setups or support experience..." 
                            value={applicantMessage}
                            onChange={(e) => setApplicantMessage(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] font-sans"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="w-full bg-[var(--color-primary)] hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer font-sans"
                        >
                          Submit Application Packet
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. COMPANY BLOG TAB */}
            {activeTab === 'blog' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <span className="inline-flex px-2.5 py-1 bg-red-50 text-[var(--color-primary)] text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider font-sans">
                    Community News
                  </span>
                  <h2 className="text-3xl font-extrabold text-[var(--color-accent)] tracking-tight font-sans">Durban Connect Newsroom</h2>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed font-sans">
                    Check our localized broadband rollouts, technician hints, and structural POPIA directives within KwaZulu-Natal provinces.
                  </p>
                </div>

                {/* Blog Grid matching html theme classes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="bg-white border border-slate-200 hover:border-[var(--color-primary)] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                      <div>
                        {/* Blog Thumbnail mock matching custom bento grids */}
                        <div className="bg-[#101828] text-white p-4 h-28 flex flex-col justify-between font-mono relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/10 rounded-bl-full pointer-events-none" />
                          <span className="text-[9px] bg-red-600/30 border border-red-500/20 px-2 py-0.5 rounded text-white font-bold tracking-wider max-w-fit">
                            {post.tag}
                          </span>
                          <span className="text-2xl">🌐</span>
                        </div>
                        <div className="p-4 space-y-2">
                          <span className="text-[10px] text-slate-400 font-bold block">{post.date} • {post.readTime}</span>
                          <h4 className="font-extrabold text-xs text-[var(--color-accent)] leading-snug hover:text-[var(--color-primary)] transition-colors cursor-pointer font-sans">
                            {post.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 leading-normal line-clamp-3 font-sans">
                            {post.summary}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 pt-0 border-t border-slate-100/10">
                        <button 
                          onClick={() => alert(`Dynamic Article "${post.title}" is currently compiling within database hubs.`)}
                          className="text-[11px] font-black text-[var(--color-primary)] hover:underline flex items-center gap-1 cursor-pointer font-sans"
                        >
                          Read Article <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Topics Grid from HTML classes */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-6">
                  <h3 className="font-extrabold text-xs text-[var(--color-accent)] uppercase tracking-wider mb-3 font-sans">Popular Discussion Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "DurbanWiFi", "FiberExpansion", "BroadbandKZN", 
                      "LoadSheddingTips", "RouterOptimizations", "POPIAGuide", 
                      "WestvilleBroadband", "InternetFairness"
                    ].map((topic, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 border border-red-100 rounded-lg text-xs font-bold text-red-950 font-sans"
                      >
                        <span className="text-[var(--color-primary)]">#</span>{topic}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. CONTACT & HOURS TAB */}
            {activeTab === 'contact-us' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <span className="inline-flex px-2.5 py-1 bg-red-50 text-[var(--color-primary)] text-[10px] font-extrabold rounded-full mb-3 uppercase tracking-wider font-sans">
                    Get In Touch
                  </span>
                  <h2 className="text-3xl font-extrabold text-[var(--color-accent)] tracking-tight font-sans">Direct Support Communication Channels</h2>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed font-sans">
                    Our local KZN team is standing by to handle coverage parameter verification maps, CPE link adjustments, network troubleshooting, and direct accounts queries.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      <a href="tel:0315550192" className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[var(--color-primary)] p-4 rounded-xl flex items-start gap-3 transition-all group">
                        <Phone className="w-5 h-5 text-[var(--color-primary)] shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <h4 className="font-extrabold text-xs text-[var(--color-accent)] font-sans">General Telephone</h4>
                          <p className="text-xs text-slate-500 font-bold mt-0.5 group-hover:underline font-sans">031 555 0192</p>
                        </div>
                      </a>

                      <a href="mailto:hello@durbanconnect.co.za" className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[var(--color-primary)] p-4 rounded-xl flex items-start gap-3 transition-all group">
                        <Mail className="w-5 h-5 text-[var(--color-primary)] shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <h4 className="font-extrabold text-xs text-[var(--color-accent)] font-sans">General Business</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 group-hover:underline font-sans">hello@durbanconnect.co.za</p>
                        </div>
                      </a>

                      <a href="mailto:support@durbanconnect.co.za" className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[var(--color-primary)] p-4 rounded-xl flex items-start gap-3 transition-all group">
                        <Mail className="w-5 h-5 text-[var(--color-primary)] shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <h4 className="font-extrabold text-xs text-[var(--color-accent)] font-sans">Technical Support</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 group-hover:underline font-sans">support@durbanconnect.co.za</p>
                        </div>
                      </a>

                      <a href="mailto:careers@durbanconnect.co.za" className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[var(--color-primary)] p-4 rounded-xl flex items-start gap-3 transition-all group">
                        <Briefcase className="w-5 h-5 text-[var(--color-primary)] shrink-0 group-hover:scale-110 transition-transform" />
                        <div>
                          <h4 className="font-extrabold text-xs text-[var(--color-accent)] font-sans">Recruitment</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 group-hover:underline font-sans">careers@durbanconnect.co.za</p>
                        </div>
                      </a>

                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-1">
                      <h4 className="font-extrabold text-xs text-[var(--color-accent)] flex items-center gap-1.5 font-sans">
                        <AlertCircle className="w-4 h-4 text-[var(--color-primary)]" />
                        Active Support Notice
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-bold font-sans">
                        If you are currently experiencing service interruptions, package drops, or technical route failures, please write to our support desk immediately with your <b>Installation Address</b> and <b>Full Name</b> for accelerated lookup.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#101828] text-white p-6 rounded-2xl space-y-4">
                    <h3 className="font-black text-xs text-rose-400 uppercase tracking-widest flex items-center gap-1.5 font-sans">
                      <Clock className="w-4 h-4" /> Operations Calendar Hours
                    </h3>
                    <div className="divide-y divide-slate-800">
                      {[
                        { days: "Monday – Friday", hours: "08:00 AM – 05:00 PM" },
                        { days: "Saturday Support", hours: "08:00 AM – 01:00 PM" },
                        { days: "Sundays & Public Holidays", hours: "Closed / Telemetry Only", closed: true }
                      ].map((item, idx) => (
                        <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex justify-between justify-items-center text-xs font-sans">
                          <span className="text-slate-400 font-semibold">{item.days}</span>
                          <span className={`${item.closed ? 'text-red-400' : 'text-slate-100'} font-bold`}>{item.hours}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
                      <h4 className="font-extrabold text-slate-300 font-sans">Head Office Location</h4>
                      <p className="text-[11px] text-slate-400 leading-normal flex items-start gap-1.5 font-normal font-sans">
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>102 Florida Road, Morningside, Durban, KwaZulu-Natal, 4001</span>
                      </p>
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
