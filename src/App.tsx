import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
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
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900"
      >
        <Navbar />
        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-grow px-4 md:px-8 lg:px-12 xl:px-16 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-24 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-7 lg:gap-8 xl:gap-10 mx-auto max-w-[1600px] w-full"
        >
          {isLegalRoute ? (
            <div className="col-span-1 md:col-span-12">
              <LegalPages currentRoute={currentHash} onNavigate={navigateTo} />
            </div>
          ) : isCompanyServicesRoute ? (
            <div className="col-span-1 md:col-span-12">
              <CompanyServicesPages currentRoute={currentHash} onNavigate={navigateTo} />
            </div>
          ) : isHomeRoute ? (
            <>
              <Hero variants={itemVariants} />
              <CoverageMap variants={itemVariants} />
              <Pricing variants={itemVariants} />
              <HowItWorks variants={itemVariants} />
              <Testimonials variants={itemVariants} />
              <FAQ variants={itemVariants} />
              <ContactForm variants={itemVariants} />
            </>
          ) : (
            <NotFound onNavigate={navigateTo} />
          )}
        </motion.main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

