import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Phone } from 'lucide-react';
import { Button } from './Button';
import { BeeLogo } from './BeeLogo';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-honeycomb relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated Bee */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.div
              animate={{ y: [-5, 5, -5], rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <BeeLogo className="w-32 h-32 mx-auto drop-shadow-xl" animated={false} />
            </motion.div>
          </motion.div>

          {/* 404 Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-8xl md:text-9xl font-black text-brand-black mb-4">
              4
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-yellow-500 to-yellow-600">0</span>
              4
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-4">
              Hier summt nichts...
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Die gesuchte Seite existiert leider nicht. Vielleicht ist die Biene in eine andere Richtung geflogen?
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/">
              <Button className="w-full sm:w-auto shadow-lg shadow-brand-yellow/20">
                <Home size={18} />
                Zur Startseite
              </Button>
            </Link>
            <button onClick={handleContactClick}>
              <Button variant="outline" className="w-full sm:w-auto">
                <Phone size={18} />
                Kontakt aufnehmen
              </Button>
            </button>
          </motion.div>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8"
          >
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-yellow transition-colors font-medium"
            >
              <ArrowLeft size={16} />
              Zurück zur vorherigen Seite
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
