import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import PromoOffers from './components/PromoOffers';
import CoverageMap from './components/CoverageMap';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import LegalPages from './components/LegalPages';
import CompanyServicesPages from './components/CompanyServicesPages';
import NotFound from './components/NotFound';

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    window.location.hash = route ? `#/${route}` : '';
  };

  const isLegalRoute = currentHash.includes('/terms') || 
                       currentHash.includes('/privacy') || 
                       currentHash.includes('/acceptable-use') ||
                       currentHash.includes('/payments') ||
                       currentHash.includes('/liabilities') ||
                       currentHash.includes('/equipment') ||
                       currentHash.includes('/contact');

  const isCompanyServicesRoute = currentHash.includes('/services') ||
                                 currentHash.includes('/home-wifi') ||
                                 currentHash.includes('/business-fiber') ||
                                 currentHash.includes('/about') ||
                                 currentHash.includes('/careers') ||
                                 currentHash.includes('/contact-us') ||
                                 currentHash.includes('/blog');

  const isHomeRoute = !currentHash || 
                      currentHash === '#' || 
                      currentHash === '#/' || 
                      (!currentHash.startsWith('#/') && currentHash.startsWith('#'));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 75,
        damping: 14
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 overflow-x-hidden"
    >
      <Navbar />
      <main className="flex-grow px-4 md:px-8 lg:px-12 xl:px-16 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-24 mx-auto max-w-[1600px] w-full">
        <AnimatePresence mode="wait">
          {isLegalRoute ? (
            <motion.div
              key="legal"
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full"
            >
              <LegalPages currentRoute={currentHash} onNavigate={navigateTo} />
            </motion.div>
          ) : isCompanyServicesRoute ? (
            <motion.div
              key="company"
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full"
            >
              <CompanyServicesPages currentRoute={currentHash} onNavigate={navigateTo} />
            </motion.div>
          ) : isHomeRoute ? (
            <motion.div
              key="home"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-7 lg:gap-8 xl:gap-10 w-full"
            >
              <Hero variants={itemVariants} />
              <CoverageMap variants={itemVariants} />
              <Pricing variants={itemVariants} />
              <PromoOffers variants={itemVariants} />
              <HowItWorks variants={itemVariants} />
              <Testimonials variants={itemVariants} />
              <FAQ variants={itemVariants} />
              <ContactForm variants={itemVariants} />
            </motion.div>
          ) : (
            <motion.div
              key="notfound"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <NotFound onNavigate={navigateTo} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </motion.div>
  );
}
