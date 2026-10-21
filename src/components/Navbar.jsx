import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes, FaFileAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.webp';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const whatsappUrl = "https://wa.me/919791351801?text=Hello%20East%20Coast%20Surf%20and%20Paddle%2C%0A%0AI%20came%20across%20your%20website%20and%20would%20like%20to%20know%20more%20about%20your%20ocean%20adventures%20and%20pricing.%0A%0APlease%20share%20the%20details.%0A%0AThank%20you.";
  const registrationFormUrl = "https://forms.gle/nUiZFAVKDzUiq4w28";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'Adventures', to: 'adventures' },
    { name: 'Gallery', to: 'gallery' },
    { name: 'Testimonials', to: 'testimonials' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-1' : 'bg-white py-2'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={logoImg} alt="East Coast Surf & Paddle Logo" width={80} height={80} className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md" />
          <span className="text-base md:text-xl font-bold tracking-wide text-deepBlue leading-tight drop-shadow-sm">
            East Coast<br/>
            <span className="text-oceanBlue text-sm md:text-xl block md:inline">Surf & Paddle</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <ul className="flex gap-5 lg:gap-6">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  activeClass="!text-oceanBlue border-b-2 border-oceanBlue"
                  className="cursor-pointer font-bold text-gray-800 hover:text-oceanBlue transition-colors border-b-2 border-transparent pb-1"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="hidden xl:flex flex-col items-end mr-1">
            <span className="text-xs font-bold text-gray-700">Open All Days</span>
            <span className="text-xs font-bold text-oceanBlue">5:30 AM - 6:30 PM</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a 
              href={registrationFormUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 border-2 border-oceanBlue text-oceanBlue hover:bg-oceanBlue hover:text-white font-bold px-4 py-2 rounded-full hover:scale-105 transition-all shadow-sm text-sm"
            >
              <FaFileAlt className="text-xs" />
              Enquire
            </a>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-oceanBlue text-white font-bold px-5 py-2.5 rounded-full hover:bg-deepBlue hover:scale-105 transition-all shadow-md text-sm"
            >
              Book Now
            </a>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <a 
            href={registrationFormUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs font-bold border-2 border-oceanBlue text-oceanBlue px-3 py-1.5 rounded-full hover:bg-oceanBlue hover:text-white transition-colors"
          >
            Enquire
          </a>
          <button onClick={() => setNavOpen(!navOpen)} aria-label="Toggle Navigation" className="text-3xl text-deepBlue focus:outline-none">
            {navOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {navOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setNavOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 w-72 h-screen bg-white shadow-2xl z-50 md:hidden flex flex-col justify-between pb-8"
            >
              <div>
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <span className="font-bold text-deepBlue">Menu</span>
                  <button onClick={() => setNavOpen(false)} aria-label="Close Navigation" className="text-2xl text-deepBlue focus:outline-none">
                    <FaTimes aria-hidden="true" />
                  </button>
                </div>
                <ul className="flex flex-col py-2">
                  {navLinks.map((link, index) => (
                    <li key={index} className="w-full">
                      <Link
                        to={link.to}
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-100}
                        activeClass="!text-oceanBlue border-l-4 border-oceanBlue bg-gray-50"
                        onClick={() => setNavOpen(false)}
                        className="block w-full py-3.5 px-8 text-lg font-bold text-gray-800 hover:text-oceanBlue border-l-4 border-transparent transition-all"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-6 space-y-3">
                <div className="text-center py-2 bg-gray-50 rounded-xl">
                  <span className="block text-xs font-bold text-gray-600">Open All Days</span>
                  <span className="block text-sm font-bold text-oceanBlue">5:30 AM - 6:30 PM</span>
                </div>
                <a 
                  href={registrationFormUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => setNavOpen(false)} 
                  className="inline-flex items-center justify-center gap-2 border-2 border-oceanBlue text-oceanBlue font-bold py-3 rounded-full shadow-sm text-center w-full hover:bg-oceanBlue hover:text-white transition-colors"
                >
                  <FaFileAlt /> Enquire / Register Form
                </a>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => setNavOpen(false)} 
                  className="bg-oceanBlue text-white font-bold py-3 rounded-full shadow-md block text-center w-full hover:bg-deepBlue transition-colors"
                >
                  Book via WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
