import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.webp';
import heroBg from '../assets/elegant_hero_bg.webp';

const Preloader = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [isSplitting, setIsSplitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Quick, responsive preloader that ensures smooth experience without penalizing LCP
    let timer1;
    let timer2;
    let timer3;

    // Preload hero background image
    const img = new Image();
    img.src = heroBg;

    // Fast, smooth progress transition
    setProgress(45);
    timer1 = setTimeout(() => {
      setProgress(100);
      timer2 = setTimeout(() => {
        setIsSplitting(true);
        timer3 = setTimeout(() => {
          setIsDone(true);
          onFinished();
        }, 700);
      }, 250);
    }, 300);

    return () => {
      img.onload = null;
      img.onerror = null;
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onFinished]);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">

      {/* ===== TOP WAVE CURTAIN ===== */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isSplitting ? '-100%' : 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-full h-1/2 z-[9999]"
      >
        <div className="w-full h-full bg-gradient-to-b from-[#03045e] to-[#0077b6] relative">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="absolute -bottom-[1px] left-0 w-full h-20 sm:h-24"
          >
            <motion.path
              fill="#0077b6"
              d="M0,40 C180,100 360,0 540,50 C720,100 900,10 1080,60 C1200,90 1350,30 1440,50 L1440,0 L0,0 Z"
              animate={!isSplitting ? {
                d: [
                  "M0,40 C180,100 360,0 540,50 C720,100 900,10 1080,60 C1200,90 1350,30 1440,50 L1440,0 L0,0 Z",
                  "M0,70 C180,10 360,90 540,30 C720,0 900,80 1080,20 C1200,50 1350,80 1440,40 L1440,0 L0,0 Z",
                  "M0,40 C180,100 360,0 540,50 C720,100 900,10 1080,60 C1200,90 1350,30 1440,50 L1440,0 L0,0 Z"
                ]
              } : undefined}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      </motion.div>

      {/* ===== BOTTOM WAVE CURTAIN ===== */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isSplitting ? '100%' : 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 w-full h-1/2 z-[9999]"
      >
        <div className="w-full h-full bg-gradient-to-t from-[#03045e] to-[#0077b6] relative">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="absolute -top-[1px] left-0 w-full h-20 sm:h-24"
          >
            <motion.path
              fill="#0077b6"
              d="M0,80 C180,20 360,110 540,60 C720,20 900,100 1080,50 C1200,20 1350,80 1440,60 L1440,120 L0,120 Z"
              animate={!isSplitting ? {
                d: [
                  "M0,80 C180,20 360,110 540,60 C720,20 900,100 1080,50 C1200,20 1350,80 1440,60 L1440,120 L0,120 Z",
                  "M0,50 C180,100 360,20 540,80 C720,110 900,30 1080,90 C1200,60 1350,30 1440,70 L1440,120 L0,120 Z",
                  "M0,80 C180,20 360,110 540,60 C720,20 900,100 1080,50 C1200,20 1350,80 1440,60 L1440,120 L0,120 Z"
                ]
              } : undefined}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      </motion.div>

      {/* ===== FOAM / SPRAY PARTICLES on split ===== */}
      <AnimatePresence>
        {isSplitting && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 1,
                  x: `${15 + i * 10}vw`,
                  y: '50%',
                  scale: 0.6
                }}
                animate={{ 
                  opacity: 0,
                  y: `${i % 2 === 0 ? -30 : 130}%`,
                  scale: 0
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute z-[10000] w-2 h-2 sm:w-3 sm:h-3 bg-white/60 rounded-full blur-[1px]"
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* ===== CENTER CONTENT (Logo + Progress) ===== */}
      <motion.div
        animate={{ 
          opacity: isSplitting ? 0 : 1,
          scale: isSplitting ? 1.15 : 1
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute inset-0 z-[10001] flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Logo with spinning rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          className="relative z-10 flex items-center justify-center"
        >
          {/* Rotating outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle
                cx="100" cy="100" r="95"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2"
                strokeDasharray="15 10"
              />
            </svg>
          </motion.div>

          {/* Rotating inner glow ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute"
            style={{ width: '85%', height: '85%' }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle
                cx="100" cy="100" r="95"
                fill="none"
                stroke="rgba(0,180,216,0.4)"
                strokeWidth="3"
                strokeDasharray="40 30"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Logo image */}
          <img
            src={logo}
            alt="East Coast Surf and Paddle"
            width={192}
            height={192}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-full relative z-10"
          />
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative z-10 mt-8 w-48 sm:w-56"
        >
          <div className="h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00b4d8] via-white to-[#90e0ef] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Preloader;
