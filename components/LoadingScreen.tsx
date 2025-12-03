import React from 'react';
import { motion } from 'framer-motion';
import { BeeLogo } from './BeeLogo';

export const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
      className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center"
    >
      {/* Animated Bee Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <BeeLogo className="w-32 h-32" variant="light" />
        </motion.div>
      </motion.div>

      {/* Company Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <h1 className="text-4xl font-bold text-white tracking-tight">BIENE</h1>
        <p className="text-sm text-brand-yellow font-bold tracking-[0.3em] uppercase mt-1">Dienstleistung</p>
      </motion.div>

      {/* Loading Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden"
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="h-full w-1/2 bg-gradient-to-r from-transparent via-brand-yellow to-transparent"
        />
      </motion.div>
    </motion.div>
  );
};
