import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, CONTACT_DETAILS } from '../constants';
import { BeeLogo } from './BeeLogo';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      if (isHome) {
        // Update active section based on scroll position only on home page
        const sections = NAV_ITEMS.map(item => item.href.substring(1));
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 300 && rect.bottom >= 300;
          }
          return false;
        });
        if (current) setActiveSection('#' + current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Check if the target is a section on the home page (starts with #)
    if (href.startsWith('#')) {
      if (isHome) {
        // Just scroll if already on home
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (href === '#hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        // Navigate to home first, then scroll
        navigate('/');
        // Small timeout to allow Home component to mount
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    } else {
      // It's a proper route (like /elektroinstallationen, though currently NAV_ITEMS only has anchors)
      navigate(href);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-gray-100 py-4'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo & Location */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src="/logo.png"
                alt="Biene Dienstleistung Logo"
                className="h-20 md:h-24 w-auto"
                width={157}
                height={96}
              />
            </motion.div>
          </Link>
          
          {/* Location Badge */}
          <div className="hidden xl:flex items-center gap-1.5 text-sm font-semibold text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <MapPin size={14} className="text-brand-yellow fill-brand-yellow" />
            Moers & Umgebung
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-sm font-semibold transition-colors relative group py-2 ${
                isHome && activeSection === item.href ? 'text-brand-black' : 'text-gray-600 hover:text-brand-black'
              }`}
            >
              {item.label}
              {/* Active Dot - Only show on Home */}
              {isHome && activeSection === item.href && (
                <motion.span 
                  layoutId="activeDot"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-yellow"
                />
              )}
              {/* Hover Underline */}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-brand-yellow transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </a>
          ))}
          
          <div className="relative group ml-4">
            <span className="absolute inset-0 rounded-full border border-brand-yellow animate-ping opacity-75 hidden group-hover:block"></span>
            
            <motion.div
                animate={{
                    boxShadow: ["0 0 0 rgba(255, 215, 0, 0)", "0 0 0 10px rgba(255, 215, 0, 0)"],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 5 // Rare pulse
                }}
                className="absolute inset-0 rounded-full border border-brand-yellow/50"
            />
            
            <a 
              href={`tel:${CONTACT_DETAILS.phone}`}
              className="relative flex items-center gap-2 bg-brand-black text-brand-yellow px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-brand-yellow/10"
            >
              <Phone size={16} className="fill-brand-yellow" />
              <span>{CONTACT_DETAILS.phoneDisplay}</span>
            </a>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brand-black p-2 z-50 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu - Slide from Right */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl z-50 md:hidden flex flex-col pt-24 px-8"
            >
              <div className="absolute top-6 left-6">
                <img
                  src="/logo.png"
                  alt="Biene Dienstleistung Logo"
                  className="h-16 w-auto"
                  width={104}
                  height={64}
                />
              </div>

              <div className="flex flex-col gap-6">
                {NAV_ITEMS.map((item) => (
                  <a 
                    key={item.label}
                    href={item.href}
                    className="text-2xl font-bold text-gray-800 border-b border-gray-100 pb-4 flex justify-between items-center group"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                    <span className="text-brand-yellow opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
                  </a>
                ))}
                
                <div className="mt-8 p-6 bg-brand-gray rounded-xl">
                  <p className="text-sm text-gray-500 mb-2 font-bold uppercase">Notdienst & Kontakt</p>
                  <a 
                    href={`tel:${CONTACT_DETAILS.phone}`}
                    className="flex items-center gap-3 text-xl font-bold text-brand-black mb-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center shadow-md">
                      <Phone size={20} />
                    </div>
                    {CONTACT_DETAILS.phoneDisplay}
                  </a>
                  <p className="text-sm text-gray-500 pl-14 font-medium">Moers & Umgebung</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};