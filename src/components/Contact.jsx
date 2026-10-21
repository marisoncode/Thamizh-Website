import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaQrcode, FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa';
import registrationQr from '../assets/registration_qr.webp';

const Contact = () => {
  const registrationFormUrl = "https://forms.gle/nUiZFAVKDzUiq4w28";

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-deepBlue mb-4"
          >
            Contact Us
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-vibrantAccent mx-auto rounded-full"
          ></motion.div>
        </div>

        {/* Contact Cards */}
        <div className="max-w-5xl mx-auto bg-oceanBlue text-white p-6 md:p-16 rounded-3xl shadow-2xl flex flex-col items-center text-center">
          <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
          <p className="mb-12 text-lightCyan max-w-2xl text-lg">We'd love to hear from you. Reach out to us for any inquiries or to book your adventure.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
            <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-2xl shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-accentLime text-4xl mb-2"><FaPhoneAlt /></div>
              <div>
                <h4 className="font-bold text-xl mb-2 text-deepBlue">Phone Number</h4>
                <div className="text-gray-600 font-medium flex flex-col gap-1">
                  <a href="tel:+919791351801" className="hover:text-oceanBlue transition-colors font-semibold">
                    +91 9791351801
                  </a>
                  <a href="tel:+919344702133" className="hover:text-oceanBlue transition-colors font-semibold">
                    +91 9344702133
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-2xl shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-vibrantAccent text-4xl mb-2"><FaEnvelope /></div>
              <div>
                <h4 className="font-bold text-xl mb-2 text-deepBlue">Email</h4>
                <a 
                  href="mailto:eastcoastsurfeastcoastsurf@gmail.com" 
                  className="text-gray-600 font-medium break-all hover:text-oceanBlue transition-colors"
                >
                  eastcoastsurfeastcoastsurf<wbr />@gmail.com
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-2xl shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-accentOrange text-4xl mb-2"><FaMapMarkerAlt /></div>
              <div>
                <h4 className="font-bold text-xl mb-2 text-deepBlue">Address</h4>
                <p className="text-gray-600 font-medium">
                  B23, South Street,<br />
                  Chinnamuthaliyarchavadi,<br />
                  Villupuram (Pondicherry), TN – 605602
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== ONLINE REGISTRATION & QR CODE SECTION ===== */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mt-12 bg-gradient-to-br from-slate-900 via-deepBlue to-[#0284c7] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden border border-white/10"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-turquoise/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-oceanBlue/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Content */}
            <div className="lg:w-3/5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-turquoise text-xs sm:text-sm font-bold tracking-wide uppercase mb-4">
                <FaQrcode className="text-sm" /> Fast Online Registration
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                Pre-Register for Your Ocean Adventure
              </h3>
              
              <p className="text-lightCyan text-base md:text-lg mb-6 leading-relaxed">
                Save time at the beach! Complete our quick registration form to lock in your preferred session date, time slot, and gear in advance.
              </p>

              <div className="space-y-2.5 mb-8 text-sm sm:text-base text-gray-200">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <FaCheckCircle className="text-accentLime flex-shrink-0" />
                  <span>Instant slot confirmation via WhatsApp or phone call</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <FaCheckCircle className="text-accentLime flex-shrink-0" />
                  <span>Personalized equipment reservation (boards, paddles & life vests)</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <FaCheckCircle className="text-accentLime flex-shrink-0" />
                  <span>100% beginner & non-swimmer friendly coaching</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href={registrationFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-oceanBlue via-[#0284c7] to-turquoise hover:from-turquoise hover:to-oceanBlue text-white font-extrabold rounded-full shadow-[0_10px_25px_rgba(14,165,233,0.4)] hover:shadow-[0_15px_30px_rgba(56,189,248,0.6)] hover:-translate-y-0.5 hover:scale-105 transition-all duration-300 text-base border border-white/20"
                >
                  <span>Open Registration Form</span>
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>
            </div>

            {/* Right Content: QR Code Card */}
            <div className="lg:w-2/5 flex flex-col items-center">
              <div className="bg-white p-6 rounded-3xl shadow-2xl border-4 border-white/90 text-center max-w-[270px] w-full transform hover:scale-105 transition-transform duration-300">
                <div className="relative overflow-hidden rounded-2xl p-2 bg-gradient-to-b from-white to-cyan-50/50">
                  <img
                    src={registrationQr}
                    alt="Scan East Coast Surf and Paddle QR Code to Open Registration Form"
                    width={240}
                    height={240}
                    className="w-full h-auto aspect-square object-contain mx-auto rounded-xl drop-shadow-sm"
                  />
                </div>
                <div className="mt-3">
                  <p className="font-extrabold text-deepBlue text-base flex items-center justify-center gap-1.5">
                    <FaQrcode className="text-oceanBlue" /> Scan to Enquire
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Point phone camera to register online
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Map - Exact location of East Coast Surfs and Paddle */}
        <div className="mt-14 rounded-3xl overflow-hidden shadow-lg h-96 relative border border-gray-200">
          <iframe 
            title="East Coast Surfs and Paddle Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.023249052917!2d79.8439996!3d11.9781635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5365225f96d9e7%3A0x695ab2799872c8e7!2sEast%20Coast%20Surfs%20and%20Paddle!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="mt-4 text-center">
          <a 
            href="https://maps.app.goo.gl/jD5rpDzjbV3Kqubu8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-oceanBlue hover:text-deepBlue font-bold text-sm transition-colors hover:underline"
          >
            <FaMapMarkerAlt /> Open in Google Maps for Directions
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
