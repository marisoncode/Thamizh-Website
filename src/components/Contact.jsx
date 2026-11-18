import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="py-20 bg-gray-50">
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
