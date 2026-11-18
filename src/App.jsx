import React, { useState, useCallback, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { scroller } from 'react-scroll';
import SEO from './components/SEO';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Quotes from './components/Quotes';
import Adventures from './components/Adventures';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Owner from './components/Owner';
import Contact from './components/Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import StickySection from './components/StickySection';
import LessonDetail from './components/LessonDetail';
import { getLessonBySlug } from './data/lessons';

const parseLessonSlugFromHash = () => {
  if (typeof window === 'undefined') return null;
  const match = window.location.hash.match(/^#\/lessons\/([a-z0-9-]+)$/i);
  if (!match) return null;
  const lesson = getLessonBySlug(match[1].toLowerCase());
  return lesson ? lesson.slug : null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeLessonSlug, setActiveLessonSlug] = useState(parseLessonSlugFromHash);
  const [pendingScrollTarget, setPendingScrollTarget] = useState(null);

  const handlePreloaderFinished = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Sync browser back/forward navigation with hash routes
  useEffect(() => {
    const handleHashChange = () => {
      const slug = parseLessonSlugFromHash();
      setActiveLessonSlug(slug);
      if (slug) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Smoothly scroll to a target section after returning from a detail page
  useEffect(() => {
    if (!activeLessonSlug && pendingScrollTarget) {
      const target = pendingScrollTarget;
      const timer = setTimeout(() => {
        if (target === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          scroller.scrollTo(target, {
            smooth: true,
            duration: 500,
            offset: -80,
          });
        }
        setPendingScrollTarget(null);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [activeLessonSlug, pendingScrollTarget]);

  const handleSelectLesson = useCallback((slug) => {
    setActiveLessonSlug(slug);
    if (window.location.hash !== `#/lessons/${slug}`) {
      window.location.hash = `#/lessons/${slug}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigateHome = useCallback((sectionId = 'home') => {
    setPendingScrollTarget(sectionId);
    setActiveLessonSlug(null);
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const activeLesson = activeLessonSlug ? getLessonBySlug(activeLessonSlug) : null;

  const schema = {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "LocalBusiness", "Organization"],
    "name": "East Coast Surf and Paddle",
    "description": "Premium surfing and stand-up paddle boarding (SUP) school located in Puducherry. Certified instructors, beginner surf lessons, and paddling adventures.",
    "url": "https://www.eastcoastsurfandpaddle.com/",
    "telephone": ["+91 9791351801", "+91 9344702133"],
    "email": "eastcoastsurfeastcoastsurf@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "B23, South Street, Chinnamuthaliyarchavadi",
      "addressLocality": "Villupuram (Pondicherry)",
      "addressRegion": "TN",
      "postalCode": "605602",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "11.9781583",
      "longitude": "79.8465745"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "05:30",
      "closes": "18:30"
    }
  };

  return (
    <HelmetProvider>
      <div className="font-poppins relative">
        <SEO 
          title={
            activeLesson
              ? `${activeLesson.title} Lessons in Puducherry | East Coast Surf and Paddle`
              : "Surf School in Puducherry | East Coast Surf and Paddle"
          }
          description={
            activeLesson
              ? activeLesson.shortDescription
              : "Join the best surf school in Pondicherry. Learn surfing, stand-up paddle boarding (SUP), and enjoy water sports in Puducherry. Book your beginner surf lessons today!"
          }
          name="East Coast Surf and Paddle"
          type="website"
          schema={schema}
        />
        {/* Preloader overlay with logo */}
        <Preloader onFinished={handlePreloaderFinished} />

        {/* Main site content - rendered immediately, seamlessly revealed */}
        <div 
          className={`relative z-10 flex flex-col min-h-screen transition-opacity duration-300 ${
            isLoading ? 'opacity-95' : 'opacity-100'
          }`}
        >
          <Navbar
            isDetailPage={Boolean(activeLesson)}
            onNavigateSection={handleNavigateHome}
          />
          <main className="flex-grow relative">
            {activeLesson ? (
              <LessonDetail
                lesson={activeLesson}
                onBack={() => handleNavigateHome('adventures')}
                onSelectLesson={handleSelectLesson}
              />
            ) : (
              <>
                <StickySection id="home" zIndex={1} isFirst>
                  <Hero onSelectLesson={handleSelectLesson} />
                </StickySection>
                <StickySection zIndex={2}>
                  <Quotes />
                </StickySection>
                <StickySection id="adventures" zIndex={3}>
                  <Adventures onSelectLesson={handleSelectLesson} />
                </StickySection>
                <StickySection zIndex={4}>
                  <WhyChooseUs />
                </StickySection>
                <StickySection id="gallery" zIndex={5}>
                  <Gallery />
                </StickySection>
                <StickySection id="testimonials" zIndex={6}>
                  <Testimonials />
                </StickySection>
                <StickySection zIndex={7}>
                  <Owner />
                </StickySection>
                <StickySection id="contact" zIndex={8} isLast>
                  <Contact />
                </StickySection>
              </>
            )}
          </main>
          <FloatingWhatsApp />
          <Footer
            isDetailPage={Boolean(activeLesson)}
            onNavigateSection={handleNavigateHome}
          />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;
