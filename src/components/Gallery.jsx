import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaPlay, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Media gallery dataset (Surfing, Kayaking & SUP) — add `src` image imports later
const galleryData = [
  { id: 1, type: 'image', category: 'Surfing', src: null, alt: "Surfing the waves" },
  { id: 2, type: 'image', category: 'Kayaking', src: null, alt: "Single seater sea kayaking" },
  { id: 3, type: 'image', category: 'SUP', src: null, alt: "Stand-up paddling at sunrise" },
  { id: 4, type: 'image', category: 'Surfing', src: null, alt: "Catching a massive wave" },
  { id: 5, type: 'image', category: 'Kayaking', src: null, alt: "Double seater kayaking adventure" },
  { id: 6, type: 'image', category: 'SUP', src: null, alt: "Peaceful morning SUP session" },
  { id: 7, type: 'image', category: 'Surfing', src: null, alt: "Beginner surf coaching" },
  { id: 8, type: 'image', category: 'Kayaking', src: null, alt: "Mangrove kayaking trail" },
  { id: 9, type: 'image', category: 'SUP', src: null, alt: "Group paddle boarding" },
  { id: 10, type: 'image', category: 'Surfing', src: null, alt: "Longboard cruising" },
  { id: 11, type: 'image', category: 'Kayaking', src: null, alt: "Coastal sea kayaking" },
  { id: 12, type: 'image', category: 'SUP', src: null, alt: "Calm water SUP glide" },
  { id: 13, type: 'image', category: 'Surfing', src: null, alt: "High tide surf action" },
  { id: 14, type: 'image', category: 'Kayaking', src: null, alt: "Solo mangrove exploration" },
  { id: 15, type: 'image', category: 'SUP', src: null, alt: "Ocean horizon paddle" }
];

const categories = ["All", "Surfing", "Kayaking", "SUP"];
const AUTO_SCROLL_SPEED_PX_PER_SEC = 135;

const Gallery = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const halfWidthRef = useRef(0);
  const dragStateRef = useRef({ active: false, startX: 0, startScrollLeft: 0, moved: false });
  const resumeTimerRef = useRef(null);

  const filteredData = activeFilter === "All"
    ? galleryData
    : galleryData.filter((item) => item.category === activeFilter);

  const shouldLoop = filteredData.length >= 3;
  const displayItems = shouldLoop ? [...filteredData, ...filteredData] : filteredData;

  // Pause auto-scroll completely when Gallery is off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '100px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cache track half-width so rAF never forces layout reads every frame
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      halfWidthRef.current = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [activeFilter]);

  const pauseTemporarily = useCallback((durationMs = 1200) => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, durationMs);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // Reset scroll position when switching categories
  const handleFilterChange = (category) => {
    setActiveFilter(category);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  };

  // Fast, continuous seamless auto-scroll via requestAnimationFrame (only while visible)
  useEffect(() => {
    if (shouldReduceMotion || !shouldLoop || !isInView || isPaused || isDragging || selectedMedia) {
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    let rafId;
    let lastTime = performance.now();
    let carry = 0;

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      carry += AUTO_SCROLL_SPEED_PX_PER_SEC * dt;
      const step = Math.floor(carry);
      if (step >= 1) {
        carry -= step;
        track.scrollLeft += step;
        const halfWidth = halfWidthRef.current;
        if (halfWidth > 0 && track.scrollLeft >= halfWidth) {
          track.scrollLeft -= halfWidth;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [shouldReduceMotion, shouldLoop, isInView, isPaused, isDragging, selectedMedia, activeFilter]);

  // Keyboard navigation & Escape close inside Lightbox
  useEffect(() => {
    if (!selectedMedia) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMedia(null);
      } else if (e.key === 'ArrowRight') {
        const idx = filteredData.findIndex((item) => item.id === selectedMedia.id);
        if (idx !== -1) {
          setSelectedMedia(filteredData[(idx + 1) % filteredData.length]);
        }
      } else if (e.key === 'ArrowLeft') {
        const idx = filteredData.findIndex((item) => item.id === selectedMedia.id);
        if (idx !== -1) {
          setSelectedMedia(filteredData[(idx - 1 + filteredData.length) % filteredData.length]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia, filteredData]);

  // Manual arrow buttons
  const handleManualStep = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    pauseTemporarily(1500);

    const cardStep = window.innerWidth < 640 ? 280 : 356;
    const halfWidth = track.scrollWidth / 2;

    if (shouldLoop && direction < 0 && track.scrollLeft <= cardStep) {
      track.scrollLeft += halfWidth;
    }

    track.scrollBy({
      left: direction * cardStep,
      behavior: 'smooth',
    });
  };

  // Mouse click-and-drag horizontal scrolling on desktop
  const handleMouseDown = (e) => {
    const track = trackRef.current;
    if (!track) return;
    dragStateRef.current = {
      active: true,
      startX: e.pageX,
      startScrollLeft: track.scrollLeft,
      moved: false,
    };
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    const state = dragStateRef.current;
    const track = trackRef.current;
    if (!state.active || !track) return;

    const deltaX = e.pageX - state.startX;
    if (Math.abs(deltaX) > 6) {
      state.moved = true;
    }
    if (state.moved) {
      e.preventDefault();
      track.scrollLeft = state.startScrollLeft - deltaX;
    }
  };

  const endMouseDrag = () => {
    if (!dragStateRef.current.active) return;
    dragStateRef.current.active = false;
    setIsDragging(false);
    if (dragStateRef.current.moved) {
      pauseTemporarily(1200);
    }
  };

  const handleCardClick = (item) => {
    if (dragStateRef.current.moved) {
      dragStateRef.current.moved = false;
      return;
    }
    setSelectedMedia(item);
  };

  const handleLightboxNav = (direction) => {
    if (!selectedMedia) return;
    const idx = filteredData.findIndex((item) => item.id === selectedMedia.id);
    if (idx === -1) return;
    const nextIdx = (idx + direction + filteredData.length) % filteredData.length;
    setSelectedMedia(filteredData[nextIdx]);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-deepBlue mb-4"
          >
            Our Gallery
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-vibrantAccent mx-auto rounded-full"
          />
        </div>

        {/* Category Filters & Manual Carousel Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleFilterChange(category)}
                className={`px-5 py-2 rounded-full font-semibold text-sm md:text-base transition-all duration-300 cursor-pointer ${
                  activeFilter === category
                    ? 'bg-oceanBlue text-white shadow-lg scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleManualStep(-1)}
              aria-label="Scroll gallery left"
              className="w-11 h-11 rounded-full bg-white text-deepBlue border border-gray-200 hover:bg-oceanBlue hover:text-white hover:border-oceanBlue shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <FaChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => handleManualStep(1)}
              aria-label="Scroll gallery right"
              className="w-11 h-11 rounded-full bg-white text-deepBlue border border-gray-200 hover:bg-oceanBlue hover:text-white hover:border-oceanBlue shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <FaChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Fast Automated + Manual Horizontal Carousel */}
      <div
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          endMouseDrag();
          setIsPaused(false);
        }}
      >
        {/* Subtle edge fade gradients */}
        <div
          className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-16 lg:w-24 z-10 bg-gradient-to-r from-gray-50 to-transparent"
          aria-hidden="true"
        />
        <div
          className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-16 lg:w-24 z-10 bg-gradient-to-l from-gray-50 to-transparent"
          aria-hidden="true"
        />

        <div
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={endMouseDrag}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => pauseTemporarily(1200)}
          onWheel={() => pauseTemporarily(1200)}
          className={`flex gap-5 md:gap-6 overflow-x-auto hide-scrollbar px-6 md:px-14 py-4 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {displayItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedMedia(item);
                }
              }}
              aria-label={`Open ${item.alt}`}
              className="group relative flex-shrink-0 w-[260px] sm:w-[300px] md:w-[336px] aspect-square rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border-2 border-white hover:border-turquoise transition-all duration-300 bg-gradient-to-br from-deepBlue via-oceanBlue to-turquoise/80 focus:outline-none focus:ring-2 focus:ring-oceanBlue"
            >
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  draggable={false}
                  width={336}
                  height={336}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 text-center">
                  <p className="text-white font-bold text-lg md:text-xl leading-snug drop-shadow-md">
                    {item.alt}
                  </p>
                </div>
              )}

              {/* Category Pill */}
              <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-sm text-deepBlue text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {item.category}
              </div>

              {/* Video Indicator Badge */}
              {item.type === 'video' && (
                <div className="absolute top-3.5 right-3.5 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <FaPlay size={10} aria-hidden="true" /> VIDEO
                </div>
              )}

              {/* Bottom Caption + Hover Play (shown over real images) */}
              {item.src && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent flex flex-col justify-end p-5 transition-opacity duration-300">
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-md border border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FaPlay className="text-white text-xl ml-1 drop-shadow-lg" aria-hidden="true" />
                      </div>
                    </div>
                  )}
                  <p className="text-white font-bold text-base md:text-lg leading-snug drop-shadow-md">
                    {item.alt}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal (portaled above sticky stacking layers) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
              onClick={() => setSelectedMedia(null)}
            >
              {/* Close Button */}
              <button
                type="button"
                aria-label="Close media preview"
                className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-all z-50 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMedia(null);
                }}
              >
                <FaTimes size={24} aria-hidden="true" />
              </button>

              {/* Lightbox Prev / Next */}
              {filteredData.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous media"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLightboxNav(-1);
                    }}
                    className="absolute left-4 md:left-8 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3.5 transition-all z-50 cursor-pointer"
                  >
                    <FaChevronLeft size={20} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next media"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLightboxNav(1);
                    }}
                    className="absolute right-4 md:right-8 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3.5 transition-all z-50 cursor-pointer"
                  >
                    <FaChevronRight size={20} aria-hidden="true" />
                  </button>
                </>
              )}

              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative max-w-5xl w-full max-h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {!selectedMedia.src ? (
                  <div className="w-full max-w-2xl aspect-video bg-gradient-to-br from-deepBlue via-oceanBlue to-turquoise/80 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-10 text-center border border-white/20">
                    <span className="text-xs font-bold uppercase tracking-widest bg-white/20 text-white px-4 py-1 rounded-full mb-4">
                      {selectedMedia.category}
                    </span>
                    <p className="text-white text-2xl md:text-3xl font-bold">{selectedMedia.alt}</p>
                  </div>
                ) : selectedMedia.type === 'image' ? (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="w-full aspect-video bg-black rounded-lg shadow-2xl flex items-center justify-center border border-white/10 relative overflow-hidden">
                    <img src={selectedMedia.src} alt={selectedMedia.alt} className="w-full h-full object-cover opacity-50 blur-sm" />
                    <div className="absolute flex flex-col items-center">
                      <FaPlay className="text-white text-6xl mb-4 opacity-80" aria-hidden="true" />
                      <p className="text-white text-xl">Video Highlights</p>
                      <p className="text-white/70 text-sm mt-2">{selectedMedia.alt}</p>
                    </div>
                  </div>
                )}

                <div className="absolute -bottom-10 left-0 w-full text-center">
                  <p className="text-white text-lg font-medium">{selectedMedia.alt}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Gallery;
