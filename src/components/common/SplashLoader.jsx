import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SplashLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fill progress bar over 1.8 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300); // Small buffer before fade out
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-50 bg-[#111827] flex flex-col justify-center items-center font-sans overflow-hidden"
    >
      {/* Golden Glowing Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-premium-gold/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-royal-blue/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col items-center space-y-8 text-center max-w-md px-6 relative z-10">
        
        {/* Animated Brand Rings */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outermost ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-t-premium-gold border-r-transparent border-b-royal-blue border-l-transparent"
          />
          {/* Inner ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-3 rounded-full border-2 border-t-transparent border-r-premium-gold border-b-transparent border-l-royal-blue"
          />
          {/* Central Logo Letter */}
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl font-serif font-black text-premium-gold"
          >
            OW
          </motion.span>
        </div>

        {/* Brand Text */}
        <div className="space-y-2">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl font-bold tracking-widest text-white m-0"
          >
            OPTIC<span className="text-premium-gold ml-2 font-serif font-light">WORLD</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[10px] tracking-[0.25em] text-gray-400 uppercase font-medium"
          >
            "See Better. Look Better. Smell Better."
          </motion.p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-56 space-y-2">
          <div className="w-full bg-gray-800 h-[3px] rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
              className="bg-gradient-to-r from-royal-blue to-premium-gold h-full rounded-full"
            />
          </div>
          <div className="flex justify-between items-center text-[9px] text-gray-500 font-mono tracking-widest uppercase">
            <span>Loading Showroom</span>
            <span>{progress}%</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default SplashLoader;
