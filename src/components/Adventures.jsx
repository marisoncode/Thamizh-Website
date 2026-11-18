import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { LESSONS } from '../data/lessons';

import kidKayakImg from '../assets/kidkayak.webp';
import manSurfImg from '../assets/mansurf.webp';

const LessonCard = ({ lesson, index, onSelectLesson }) => (
  <motion.button
    type="button"
    onClick={() => onSelectLesson?.(lesson.slug)}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ y: -16, scale: 1.03 }}
    className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-transparent hover:border-turquoise hover:shadow-[0_20px_40px_rgba(37,211,102,0.3)] transition-all duration-300 flex flex-col group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-oceanBlue"
  >
    <div className="relative h-64 w-full overflow-hidden">
      <img
        src={lesson.image}
        alt={`${lesson.title} lessons in Puducherry`}
        loading="lazy"
        width={400}
        height={256}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>

    <div className="p-8 flex-grow flex flex-col items-center text-center justify-between w-full">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-oceanBlue">
          {lesson.subtitle}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1 mb-3">
          {lesson.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          {lesson.shortDescription}
        </p>
      </div>

      <span className="inline-flex items-center gap-2 font-bold text-oceanBlue group-hover:text-deepBlue transition-colors">
        Explore {lesson.title}
        <FaArrowRight className="text-sm group-hover:translate-x-1.5 transition-transform duration-300" aria-hidden="true" />
      </span>
    </div>
  </motion.button>
);

const Adventures = ({ onSelectLesson }) => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="text-center mb-14 relative overflow-visible mt-10">
          {/* Decorative ocean cutouts - centered on mobile, flanking on md+ */}
          <div className="flex justify-center gap-4 mb-2 md:contents">
            <img
              src={manSurfImg}
              alt="Man Surfing"
              aria-hidden="true"
              loading="lazy"
              width={224}
              height={224}
              className="w-28 sm:w-36 md:w-48 lg:w-56 object-contain drop-shadow-2xl z-20 pointer-events-none md:absolute md:-top-16 lg:-top-24 md:left-0 lg:left-10"
              style={{ transform: 'scaleX(-1)' }}
            />
            <img
              src={kidKayakImg}
              alt="Kid Kayaking"
              aria-hidden="true"
              loading="lazy"
              width={224}
              height={224}
              className="w-28 sm:w-36 md:w-48 lg:w-56 object-contain drop-shadow-2xl z-20 pointer-events-none md:absolute md:-top-10 lg:-top-20 md:right-0 lg:right-10"
            />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-deepBlue mb-4"
          >
            Our Ocean Lessons
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-vibrantAccent mx-auto rounded-full"
          ></motion.div>
        </div>

        {/* 3 Core Lessons: Surfing, SUP & Kayaking */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {LESSONS.map((lesson, index) => (
            <LessonCard
              key={lesson.slug}
              lesson={lesson}
              index={index}
              onSelectLesson={onSelectLesson}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Adventures;
