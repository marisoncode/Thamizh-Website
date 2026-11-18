import React from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaArrowRight } from 'react-icons/fa';

import heroBg from '../assets/elegant_hero_bg.webp';
import surfHeroImg from '../assets/Hero Section Images/SURF.jpeg';
import supHeroImg from '../assets/Hero Section Images/SUPP.jpeg';
import kayakHeroImg from '../assets/Hero Section Images/KAYAK.jpeg';

const HERO_SPRING = { stiffness: 120, damping: 28, mass: 0.6, restDelta: 0.001 };

const HERO_CARDS = [
  {
    title: 'Surfing',
    subtitle: 'Ride the Waves',
    lessonSlug: 'surfing',
    img: surfHeroImg,
    delay: 0.15,
    staggerClass: 'md:translate-y-4',
  },
  {
    title: 'SUP',
    subtitle: 'Stand-Up Paddle',
    lessonSlug: 'sup',
    img: supHeroImg,
    delay: 0.3,
    staggerClass: 'md:-translate-y-4',
  },
  {
    title: 'Kayaking',
    subtitle: 'Sea & Mangroves',
    lessonSlug: 'kayaking',
    img: kayakHeroImg,
    delay: 0.45,
    staggerClass: 'md:translate-y-4',
  },
];

const Hero = ({ onSelectLesson }) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, HERO_SPRING);
  const bgScale = useTransform(smoothScrollY, [0, 700], [1, 1.12]);

  const whatsappUrl = "https://wa.me/919791351801?text=Hello%20East%20Coast%20Surf%20and%20Paddle%2C%0A%0AI%20came%20across%20your%20website%20and%20would%20like%20to%20know%20more%20about%20your%20ocean%20adventures%20and%20pricing.%0A%0APlease%20share%20the%20details.%0A%0AThank%20you.";

  return (
    <section className="relative min-h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] md:min-h-[540px] bg-deepBlue flex items-center justify-center py-8 md:py-6 overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div
        style={shouldReduceMotion ? undefined : { scale: bgScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deepBlue/90 via-oceanBlue/70 to-deepBlue/30"></div>
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:w-1/2 text-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-5 text-white tracking-tight"
            style={{ textShadow: "0px 10px 30px rgba(0,0,0,0.8)" }}
          >
            Surfing & Paddling Adventures in <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500 drop-shadow-lg">
              Pondicherry
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-lg"
          >
            Surf the waves, paddle through paradise, and create unforgettable memories with East Coast Surf and Paddle.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link to="adventures" smooth={true} duration={500} offset={-70} className="flex">
              <button className="inline-flex items-center justify-center px-7 py-3 md:py-3.5 md:px-9 text-base md:text-lg font-bold bg-oceanBlue text-white rounded-full hover:bg-turquoise hover:-translate-y-1 hover:scale-105 transition-all duration-300 shadow-lg border border-oceanBlue cursor-pointer">
                Explore Adventures
              </button>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center px-7 py-3 md:py-3.5 md:px-9 text-base md:text-lg font-bold text-deepBlue transition-all duration-300 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.8)] hover:-translate-y-1 hover:scale-105 overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white via-[#e0f7fa] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></span>
              <span className="relative flex items-center gap-2">
                Book Now
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 text-[#00d4ff] group-hover:translate-x-1 transition-transform duration-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right: 3 Clean Editorial Lesson Cards (Surf, SUP, Kayak) */}
        <div className="lg:w-1/2 w-full">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 h-[230px] sm:h-[310px] md:h-[380px] lg:h-[420px]">
            {HERO_CARDS.map((card, idx) => (
              <div key={card.lessonSlug} className={`h-full ${card.staggerClass}`}>
                <motion.button
                  type="button"
                  onClick={() => onSelectLesson?.(card.lessonSlug)}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: card.delay, ease: 'easeOut' }}
                  whileHover={shouldReduceMotion ? undefined : { y: -10, scale: 1.03 }}
                  aria-label={`Explore ${card.title} lessons`}
                  className="relative h-full w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border-2 border-white/25 hover:border-turquoise hover:shadow-[0_20px_45px_rgba(0,0,0,0.5),0_0_25px_rgba(56,189,248,0.45)] transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-turquoise"
                >
                  <img
                    src={card.img}
                    alt={`${card.title} adventures in Puducherry`}
                    loading={idx < 2 ? 'eager' : 'lazy'}
                    width={300}
                    height={420}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-3 sm:bottom-5 left-2.5 sm:left-4 right-2.5 sm:right-4">
                    <span className="hidden sm:block text-[11px] font-semibold uppercase tracking-wider text-turquoise/90 mb-0.5">
                      {card.subtitle}
                    </span>
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-white font-bold text-sm sm:text-lg md:text-xl leading-tight drop-shadow-md">
                        {card.title}
                      </h3>
                      <FaArrowRight
                        className="hidden sm:block text-xs text-turquoise opacity-80 group-hover:translate-x-1 group-hover:opacity-100 transition-all flex-shrink-0"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
