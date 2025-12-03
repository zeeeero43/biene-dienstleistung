
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Zap } from 'lucide-react';
import { Button } from './Button';
import { CONTACT_DETAILS } from '../constants';

export const EmergencyBanner: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 py-12 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex w-20 h-20 bg-white rounded-full items-center justify-center shadow-lg animate-pulse">
              <Zap size={40} className="text-red-600 fill-red-600" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <Zap size={24} className="md:hidden text-white fill-white" />
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase drop-shadow-sm">
                  Notdienst 24/7
                </h2>
              </div>
              <p className="text-white/90 text-lg font-medium max-w-xl">
                Stromausfall? Kurzschluss? Technische Störung? <br className="hidden sm:block"/>
                Wir sind rund um die Uhr für Sie in der Region im Einsatz.
              </p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href={`tel:${CONTACT_DETAILS.phone}`}>
              <button className="bg-white text-red-600 hover:bg-gray-50 px-8 py-4 rounded-full font-black text-xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 group">
                <Phone size={24} className="group-hover:rotate-12 transition-transform" />
                <span>JETZT ANRUFEN</span>
              </button>
            </a>
            <div className="text-center mt-2 text-white/80 text-sm font-bold tracking-wider">
              {CONTACT_DETAILS.phoneDisplay}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
