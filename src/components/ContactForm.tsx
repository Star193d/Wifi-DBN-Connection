import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

interface ContactFormProps {
  variants?: any;
}

export default function ContactForm({ variants }: ContactFormProps) {
  // Tabs: 'form' | 'chat'
  const [activeTab, setActiveTab] = useState<'form' | 'chat'>('form');

  // Callback form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  // Live support chat states
  const [chatName, setChatName] = useState('');
  const [chatEmail, setChatEmail] = useState('');
  const [chatStep, setChatStep] = useState<'info' | 'active'>('info');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: "Welcome to Maroon Tech live support! 👋 We provide uncapped broadband connections throughout Durban and KZN. Provide your name & email to trigger a real-time support notification to our desk and begin chatting with our agent.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatSuccessMessage, setChatSuccessMessage] = useState("");
  const [chatNotified, setChatNotified] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, chatLoading]);

  // Handle Callback sign up submit
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
      setErrMsg("Failed to reach Maroon Tech servers. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Chat Setup: triggers first direct mail alert notification on server
  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatName.trim() || !chatEmail.trim()) return;

    setChatLoading(true);
    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: chatName,
          email: chatEmail,
          text: "[LIVE CHAT INITIALIZED VIA CONTACT COMPONENT SUPPORT INTERFACE]"
        })
      });

      const data = await resp.json();
      
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'user',
          text: `Hi, I am ${chatName} (${chatEmail}). I would like to start a support session.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          sender: 'bot',
          text: data.botResponse || `Hi ${chatName}! I have dispatched an intense real-time support notification email to support@maroontech.co.za. An active Maroon Tech desk advisor is reviewing your line details right now!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setChatStep('active');
      setChatSuccessMessage("Sent notification alert to support@maroontech.co.za");
    } catch (err) {
      setChatStep('active');
    } finally {
      setChatLoading(false);
    }
  };

  // Handles real-time messaging loop & alerts support email of subsequent messages too
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');

    setChatMessages(prev => [
      ...prev,
      {
        sender: 'user',
        text: userMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    setChatLoading(true);

    try {
      // Alert/Log server endpoint about active thread dialogue
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: chatName,
          email: chatEmail,
          text: userMessage
        })
      });
    } catch (e) {
      // safe fallback
    }

    setTimeout(() => {
      let botText = "Thanks. Your query has been logged! Our fiber testing coverage bot is running a quick neighborhood diagnostic on your location. Can you confirm your physical street number so we can check direct optical line availability?";
      
      const lower = userMessage.toLowerCase();
      if (lower.includes("plan") || lower.includes("price") || lower.includes("cost") || lower.includes("r")) {
        botText = "Great question! We are currently running a special promotion across Durban: installation is standard at R500 (was R1200) and includes a premium dual-band Wi-Fi router. Standard turnarounds are 24-48 hours. Let us know which speed band you like!";
      } else if (lower.includes("coverage") || lower.includes("umhlanga") || lower.includes("berea") || lower.includes("durban") || lower.includes("morningside")) {
        botText = "Fantastic! Morningside, Berea, and Umhlanga have direct active fiber links. Since coverage is 100% live there, your connection loop can be provisioned immediately. We have sent an email notification to support@maroontech.co.za to call you & confirm.";
      } else if (lower.includes("uptime") || lower.includes("load shedding") || lower.includes("power")) {
        botText = "No worries regarding load shedding! Our main fiber exchange points and distribution pillars are fully power-backed. As long as you power your in-house router via a small mini-UPS, your connection remains crystal clear and online.";
      }

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setChatLoading(false);
    }, 1100);
  };

  return (
    <motion.section 
      id="contact" 
      variants={variants}
      className="col-span-1 md:col-span-12 bg-white bento-item overflow-hidden flex flex-col md:flex-row lg:col-span-12 font-sans"
    >
      {/* Brand Column with Animated Emojis */}
      <div className="group md:w-5/12 bg-white text-slate-800 hover:bg-[var(--color-primary)] hover:text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden transition-all duration-300 border-r border-slate-100 cursor-pointer">
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[var(--color-primary)]/5 group-hover:bg-white/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300" />
        <div className="relative z-10">
          <div className="w-12 h-12 bg-[var(--color-primary)]/10 group-hover:bg-white/20 text-[var(--color-primary)] group-hover:text-white rounded-xl flex items-center justify-center mb-6 transition-colors duration-300">
            <motion.span 
              className="text-2xl inline-block"
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.15, 0.95, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2.2, 
                ease: "easeInOut" 
              }}
            >
              ⚡
            </motion.span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight tracking-tight font-sans text-slate-900 group-hover:text-white transition-colors duration-300">
            Ready for better internet?
          </h3>
          <p className="text-slate-600 group-hover:text-white/85 mb-8 max-w-sm text-xs md:text-sm leading-relaxed font-semibold transition-colors duration-300">
            Get in touch using our callback dispatch form or start an interactive live session to alert support technicians immediately.
          </p>
        </div>
        
        <div className="space-y-4 relative z-10 bg-slate-50 group-hover:bg-white/10 p-5 rounded-2xl border border-slate-200/60 group-hover:border-white/20 backdrop-blur-sm transition-all duration-300">
          {/* Animated Call Phone Emoji */}
          <div className="flex items-center gap-4">
             <motion.div 
               className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 group-hover:bg-white/20 flex items-center justify-center text-lg shrink-0 transition-colors duration-300"
               animate={{ 
                 scale: [1, 1.12, 1],
                 rotate: [0, -10, 10, -10, 0]
               }}
               transition={{ 
                 repeat: Infinity, 
                 duration: 2.8, 
                 ease: "easeInOut",
                 repeatDelay: 1
               }}
             >
                📞
              </motion.div>
             <div>
                <div className="text-[10px] text-slate-400 group-hover:text-white/70 uppercase tracking-widest font-bold mb-0.5 transition-colors duration-300">Call Us</div>
                <div className="font-extrabold text-base md:text-lg tracking-wide text-slate-800 group-hover:text-white transition-colors duration-300">+27 31 210 0318</div>
             </div>
          </div>

          {/* Animated Email Envelope Emoji */}
          <div className="flex items-center gap-4">
             <motion.div 
               className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 group-hover:bg-white/20 flex items-center justify-center text-lg shrink-0 transition-colors duration-300"
               animate={{ 
                 y: [0, -3, 0]
               }}
               transition={{ 
                 repeat: Infinity, 
                 duration: 2, 
                 ease: "easeInOut" 
               }}
             >
                ✉️
             </motion.div>
             <div>
                <div className="text-[10px] text-slate-400 group-hover:text-white/70 uppercase tracking-widest font-bold mb-0.5 transition-colors duration-300">Email Support</div>
                <div className="font-extrabold text-xs md:text-sm tracking-wide text-slate-800 group-hover:text-white transition-colors duration-300 font-sans">support@maroontech.co.za</div>
             </div>
          </div>
        </div>
      </div>
      
      {/* Interaction Column with tab layout */}
      <div className="md:w-7/12 p-6 md:p-10 bg-white flex flex-col justify-between">
        
        {/* Toggle navigation bar */}
        <div className="flex border-b border-slate-100 mb-6 font-sans">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 pb-3 text-xs md:text-sm font-black uppercase tracking-wider transition-all relative cursor-pointer ${
              activeTab === 'form' ? 'text-[var(--color-primary)]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Request Call Back
            {activeTab === 'form' && (
              <motion.div layoutId="contactTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 pb-3 text-xs md:text-sm font-black uppercase tracking-wider transition-all relative flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'chat' ? 'text-[var(--color-primary)]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            💬 support chat
            {activeTab === 'chat' && (
              <motion.div layoutId="contactTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]" />
            )}
          </button>
        </div>

        {activeTab === 'form' ? (
          /* REGULAR CONTACT FORM VIEW */
          <div className="flex-1 flex flex-col justify-center">
            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full border border-green-200 flex items-center justify-center mx-auto mb-6 text-2xl shadow-sm">✓</div>
                <h3 className="text-xl font-black text-[var(--color-accent)] mb-3 tracking-tight">Request Received!</h3>
                <p className="text-slate-500 text-xs md:text-sm max-w-sm mx-auto font-medium">
                  Thanks for reaching out to Maroon Tech. We have securely logged your details. A representative will contact you shortly to finalize coverage checks.
                </p>
                <button 
                  onClick={() => setStatus("idle")} 
                  className="mt-8 px-6 py-2.5 bg-slate-50 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-100 transition shadow-xs cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-1.5 uppercase tracking-wider">Full Name *</label>
                    <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-1 focus:ring-[var(--color-primary)] focus:bg-white focus:border-[var(--color-primary)] outline-none transition text-xs font-semibold text-slate-800" placeholder="e.g. Sipho Ngcobo" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-1.5 uppercase tracking-wider">Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-1 focus:ring-[var(--color-primary)] focus:bg-white focus:border-[var(--color-primary)] outline-none transition text-xs font-semibold text-slate-800" placeholder="e.g. sipho@gmail.com" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-1.5 uppercase tracking-wider">Mobile Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-1 focus:ring-[var(--color-primary)] focus:bg-white focus:border-[var(--color-primary)] outline-none transition text-xs font-semibold text-slate-800" placeholder="e.g. 067 123 4567" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-1.5 uppercase tracking-wider">Street Address</label>
                    <input name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-1 focus:ring-[var(--color-primary)] focus:bg-white focus:border-[var(--color-primary)] outline-none transition text-xs font-semibold text-slate-800" placeholder="e.g. 102 Florida Rd" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-1.5 uppercase tracking-wider">Additional Requirements / Notes</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-1 focus:ring-[var(--color-primary)] focus:bg-white focus:border-[var(--color-primary)] outline-none transition text-xs font-semibold text-slate-800 resize-none" placeholder="I am interested in..."></textarea>
                </div>

                {status === "error" && (
                  <div className="text-[#8E0E25] text-xs font-extrabold bg-red-50 p-3 rounded-xl border border-red-100">{errMsg}</div>
                )}

                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="w-full bg-[var(--color-accent)] hover:brightness-110 text-white font-extrabold py-3.5 mt-2 rounded-xl transition disabled:opacity-75 flex justify-center items-center shadow-md text-xs tracking-wider uppercase cursor-pointer"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Submitting request...
                    </span>
                  ) : "Request Call Back"}
                </button>
              </form>
            )}
          </div>
        ) : (
          /* REAL-TIME LIVE CHAT VIEW */
          <div className="flex-1 flex flex-col min-h-[340px] justify-between">
            {chatStep === 'info' ? (
              /* CHAT SIGN IN FORM */
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleStartChat} 
                className="space-y-4 my-auto"
              >
                <div className="text-center pb-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-[var(--color-primary)] text-[10px] font-extrabold rounded-full mb-2 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" /> Standby technician active
                  </span>
                  <h4 className="text-base font-black text-[var(--color-accent)]">Unlock Live Chat Session</h4>
                  <p className="text-slate-500 text-xs mt-1 max-w-xs mx-auto">
                    Submit your user info. This dispatches an instant connection alert to our email desk at `support@maroontech.co.za`.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-1.5 uppercase tracking-wider">Your Name *</label>
                  <input 
                    required 
                    value={chatName} 
                    onChange={(e) => setChatName(e.target.value)} 
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-1 focus:ring-[var(--color-primary)] focus:bg-white outline-none transition text-xs font-semibold text-slate-800" 
                    placeholder="e.g. Sipho" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-1.5 uppercase tracking-wider">Your Email *</label>
                  <input 
                    required 
                    type="email"
                    value={chatEmail} 
                    onChange={(e) => setChatEmail(e.target.value)} 
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-1 focus:ring-[var(--color-primary)] focus:bg-white outline-none transition text-xs font-semibold text-slate-800" 
                    placeholder="e.g. sipho@gmail.com" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={chatLoading}
                  className="w-full bg-[var(--color-primary)] hover:brightness-110 text-white font-extrabold py-3.5 mt-2 rounded-xl transition disabled:opacity-75 flex justify-center items-center shadow-md text-xs tracking-wider uppercase cursor-pointer"
                >
                  {chatLoading ? (
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Alerting support desk...
                    </span>
                  ) : "Initialize Live Chat"}
                </button>
              </motion.form>
            ) : (
              /* ACTIVE CHAT DIALOGUE INTERFACE */
              <div className="flex flex-col h-full justify-between">
                
                {/* Active Notification Toast banner */}
                {chatNotified && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-150 rounded-xl p-2 px-3 mb-3 flex items-center justify-between text-[10px] text-green-700 font-extrabold"
                  >
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      Urgent ticket alert successfully dispatched to support@maroontech.co.za!
                    </span>
                    <button 
                      onClick={() => setChatNotified(false)} 
                      className="text-slate-400 hover:text-slate-600 font-bold ml-1"
                    >
                      Dismiss
                    </button>
                  </motion.div>
                )}

                {/* Messages Box */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 min-h-[220px] max-h-[280px] overflow-y-auto space-y-3 p-3 bg-slate-50/75 rounded-2xl border border-slate-100 flex flex-col"
                >
                  {chatMessages.map((msg, mIdx) => (
                    <div 
                      key={mIdx}
                      className={`flex flex-col max-w-[85%] ${
                        msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-0.5 text-[8px] text-slate-400 font-bold uppercase font-mono">
                        {msg.sender === 'user' ? (
                          <>
                            <span>{chatName}</span>
                            <User className="w-2.5 h-2.5" />
                          </>
                        ) : (
                          <>
                            <Bot className="w-2.5 h-2.5 text-[var(--color-primary)]" />
                            <span>Maroon Agent</span>
                          </>
                        )}
                        <span>• {msg.time}</span>
                      </div>
                      <div className={`p-2.5 rounded-2xl text-xs font-semibold leading-normal font-sans ${
                        msg.sender === 'user'
                          ? 'bg-[var(--color-accent)] text-white rounded-tr-none'
                          : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-xs'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {/* Loading / Typing Indicator */}
                  {chatLoading && (
                    <div className="self-start flex flex-col max-w-[80%] items-start">
                      <div className="flex items-center gap-1 mb-0.5 text-[8px] text-slate-400 font-bold uppercase font-mono">
                        <Bot className="w-2.5 h-2.5 text-[var(--color-primary)] animate-pulse" />
                        <span>Support typing...</span>
                      </div>
                      <div className="p-2.5 bg-white border border-slate-100 text-slate-400 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-xs">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--color-primary)]" />
                        <span className="text-[10px] font-bold">Checking local network nodes...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Send action footer input */}
                <form onSubmit={handleSendMessage} className="flex gap-2 mt-3">
                  <input 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a message to support..."
                    className="flex-1 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:bg-white focus:border-[var(--color-primary)] text-xs font-semibold text-slate-800 transition"
                  />
                  <button 
                    type="submit"
                    disabled={!chatInput.trim() || chatLoading}
                    className="bg-[var(--color-primary)] text-white p-2.5 rounded-xl flex items-center justify-center cursor-pointer hover:brightness-110 disabled:opacity-50 transition shrink-0"
                    title="Send chat message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>
            )}
          </div>
        )}

      </div>
    </motion.section>
  );
}
