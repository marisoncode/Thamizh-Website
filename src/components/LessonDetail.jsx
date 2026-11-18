import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaArrowRight } from 'react-icons/fa';
import { BsWhatsapp } from 'react-icons/bs';
import { LESSONS, buildLessonWhatsAppUrl } from '../data/lessons';

const LessonDetail = ({ lesson, onBack, onSelectLesson }) => {
  const otherLessons = LESSONS.filter((item) => item.slug !== lesson.slug);
  const whatsappUrl = buildLessonWhatsAppUrl(lesson.title);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="relative min-h-[58vh] bg-deepBlue flex items-end overflow-hidden pt-24 pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${lesson.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deepBlue via-deepBlue/75 to-deepBlue/40" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-white">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-lightCyan hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 transition-all mb-8 cursor-pointer"
          >
            <FaArrowLeft aria-hidden="true" />
            Back to All Lessons
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-widest text-turquoise mb-3">
              {lesson.subtitle}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
              {lesson.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
              {lesson.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-oceanBlue hover:bg-turquoise text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:scale-105 transition-all"
              >
                <BsWhatsapp className="text-xl" aria-hidden="true" />
                Book {lesson.title} via WhatsApp
              </a>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 px-5 py-3 rounded-full text-sm font-semibold">
                <FaClock className="text-vibrantAccent" aria-hidden="true" />
                <span>{lesson.duration}</span>
                <span className="text-white/40">|</span>
                <span className="font-bold text-lightCyan">{lesson.startingPrice}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages & Pricing Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deepBlue mb-3">
              {lesson.title} Packages
            </h2>
            <div className="w-24 h-1 bg-vibrantAccent mx-auto rounded-full" />
          </div>

          <div
            className={`grid grid-cols-1 gap-8 max-w-5xl mx-auto ${
              lesson.packages.length === 1
                ? 'md:grid-cols-1 max-w-md'
                : 'md:grid-cols-2'
            }`}
          >
            {lesson.packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={`${pkg.name} in Puducherry`}
                    loading="lazy"
                    width={480}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow font-extrabold text-oceanBlue">
                    {pkg.price}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-deepBlue/90 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1.5">
                    <FaClock className="text-vibrantAccent text-xs" aria-hidden="true" />
                    {pkg.duration}
                  </div>
                </div>
                <div className="p-7 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Placeholder Details Block (ready for full page details later) */}
          <div className="max-w-5xl mx-auto mt-14 bg-white rounded-3xl p-8 md:p-12 shadow-md border border-dashed border-oceanBlue/40 text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-oceanBlue bg-lightCyan px-4 py-1.5 rounded-full mb-4">
              Lesson Details
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-deepBlue mb-3">
              More {lesson.title} Details Coming Soon
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {lesson.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Explore Other Lessons */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-deepBlue mb-3">
              Explore Other Lessons
            </h2>
            <div className="w-20 h-1 bg-vibrantAccent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {otherLessons.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => onSelectLesson(item.slug)}
                className="group bg-gray-50 hover:bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border-2 border-transparent hover:border-turquoise transition-all duration-300 flex items-center gap-5 p-4 text-left cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width={120}
                  height={120}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="flex-grow">
                  <span className="text-xs font-bold uppercase tracking-wide text-oceanBlue">
                    {item.startingPrice}
                  </span>
                  <h3 className="text-xl font-bold text-deepBlue mt-0.5 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-oceanBlue group-hover:text-deepBlue mt-2">
                    View Details
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LessonDetail;
