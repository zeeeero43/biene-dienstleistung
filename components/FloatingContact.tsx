
import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CONTACT_DETAILS } from '../constants';
import { motion } from 'framer-motion';

export const FloatingContact: React.FC = () => {
  return (
    <motion.a
      href={`https://wa.me/49${CONTACT_DETAILS.phone.substring(1)}`}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ 
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 3
        },
        default: { duration: 0.5 }
      }}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20bd5a] transition-colors flex items-center justify-center cursor-pointer group hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]"
      title="WhatsApp Chat starten"
      aria-label="WhatsApp Kontakt"
    >
      <WhatsAppIcon size={32} />
      <span className="absolute right-full mr-4 bg-brand-black text-white px-4 py-2 rounded-lg shadow-xl text-sm font-bold opacity-0 translate-x-4 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 group-hover:translate-x-0 group-focus:translate-x-0 group-active:translate-x-0 transition-all whitespace-nowrap pointer-events-none hidden sm:block">
        WhatsApp Chat starten
        <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-brand-black rotate-45"></span>
      </span>
    </motion.a>
  );
};
