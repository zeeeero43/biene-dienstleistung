
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BeeLogo } from './BeeLogo';
import { Button } from './Button';
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import { TAGLINE } from '../constants';

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Simple Particle Component
const Particle = ({ delay, x, y, size }: { delay: number, x: string, y: string, size: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 0 }}
    animate={{ opacity: [0, 0.6, 0], y: -100 }}
    transition={{ duration: 5, repeat: Infinity, delay: delay, ease: "linear" }}
    className="absolute bg-brand-yellow rounded-full pointer-events-none z-0"
    style={{ left: x, top: y, width: size, height: size }}
  />
);

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-honeycomb">
      
      {/* Background Particles - hidden on small mobile for performance */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        {[...Array(10)].map((_, i) => (
          <Particle 
            key={i} 
            delay={Math.random() * 5} 
            x={`${Math.random() * 100}%`} 
            y={`${50 + Math.random() * 50}%`} 
            size={Math.random() * 6 + 2} 
          />
        ))}
      </div>

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10 pt-20 md:-translate-x-8">
        
        {/* Left: Animated Logo */}
        <motion.div 
          className="order-2 md:order-1 flex justify-center md:justify-end relative"
          style={{ y: y1 }}
        >
          {/* Glowing Backlight - smaller on mobile */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[280px] md:w-[350px] h-[200px] sm:h-[280px] md:h-[350px] bg-brand-yellow/20 rounded-full blur-[60px] sm:blur-[80px] -z-10 animate-pulse"></div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <BeeLogo className="w-48 sm:w-56 md:w-72 lg:w-96 h-48 sm:h-56 md:h-72 lg:h-96 drop-shadow-2xl" animated={true} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: Text Content */}
        <div className="order-1 md:order-2 text-center md:text-left relative z-20">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: y2 }}
          >
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="h-1 bg-brand-yellow"
              ></motion.div>
              <h2 className="text-gray-500 font-bold tracking-[0.3em] text-sm uppercase">
                Meisterbetrieb
              </h2>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-brand-black mb-4 sm:mb-6 leading-[0.9] tracking-tight">
              Biene<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-yellow-500 to-yellow-600 drop-shadow-sm">
                Dienstleistung
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-light mb-4 italic">
              "{TAGLINE}"
            </p>

            {/* Service Area Badge */}
            <p className="text-brand-black font-semibold mb-6 flex items-center justify-center md:justify-start gap-2 bg-white/50 w-fit md:mx-0 mx-auto px-4 py-2 rounded-full border border-gray-100 backdrop-blur-sm">
              <MapPin className="text-brand-yellow fill-brand-yellow" size={20} />
              Ihr Elektriker für Moers und Umgebung
            </p>
            
            <p className="text-gray-500 mb-6 sm:mb-8 md:mb-10 max-w-md mx-auto md:mx-0 leading-relaxed font-medium text-sm sm:text-base">
              Ihr Elektriker Meisterbetrieb in Moers<br/>
              für professionelle Elektroinstallationen
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>
                <Button className="w-full sm:w-auto shadow-xl shadow-brand-yellow/20">
                  Kontakt aufnehmen <ArrowRight size={18} />
                </Button>
              </a>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>
                <Button variant="outline" className="w-full sm:w-auto">
                  Unsere Leistungen
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#services"
        onClick={(e) => scrollToSection(e, 'services')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 hover:text-brand-yellow transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown size={40} strokeWidth={1.5} />
      </motion.a>
    </section>
  );
};
