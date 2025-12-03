import React, { useLayoutEffect, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';
import { Home } from './components/Home';
import { ElektroPage } from './components/ElektroPage';
import { SmartHomePage } from './components/SmartHomePage';
import { KassensystemePage } from './components/KassensystemePage';
import { TuersprechanlagenPage } from './components/TuersprechanlagenPage';
import { AlarmanlagenPage } from './components/AlarmanlagenPage';
import { BrandwarnanlagenPage } from './components/BrandwarnanlagenPage';
import { UeberwachungssystemePage } from './components/UeberwachungssystemePage';
import { ImpressumPage } from './components/ImpressumPage';
import { DatenschutzPage } from './components/DatenschutzPage';
import { NotFoundPage } from './components/NotFoundPage';
import { CookieConsentBanner } from './components/CookieConsent';
import { PageTransition } from './components/PageTransition';
import { LoadingScreen } from './components/LoadingScreen';

// ScrollToTop component to ensure new pages start at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans text-brand-black">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/elektroinstallationen" element={<PageTransition><ElektroPage /></PageTransition>} />
            <Route path="/smart-home" element={<PageTransition><SmartHomePage /></PageTransition>} />
            <Route path="/kassensysteme" element={<PageTransition><KassensystemePage /></PageTransition>} />
            <Route path="/tuersprechanlagen" element={<PageTransition><TuersprechanlagenPage /></PageTransition>} />
            <Route path="/alarmanlagen" element={<PageTransition><AlarmanlagenPage /></PageTransition>} />
            <Route path="/brandwarnanlagen" element={<PageTransition><BrandwarnanlagenPage /></PageTransition>} />
            <Route path="/ueberwachungssysteme" element={<PageTransition><UeberwachungssystemePage /></PageTransition>} />
            <Route path="/impressum" element={<PageTransition><ImpressumPage /></PageTransition>} />
            <Route path="/datenschutz" element={<PageTransition><DatenschutzPage /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
          </Routes>
        </main>

        <Footer />
        <FloatingContact />
        <CookieConsentBanner delay={2200} />
      </div>
    </Router>
  );
};

export default App;