import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Wraps a page section in a lightweight sticky stacking curtain panel:
 * - Sections <= viewport height pin at the top while the next section rises over them.
 * - Taller sections scroll naturally to their bottom before pinning (top = vh - height),
 *   so no content is ever cut off or unreachable.
 * - Avoids scaling entire multi-viewport DOM trees or permanent `will-change` promotion,
 *   keeping GPU memory and scroll compositing fast at 60/120fps.
 */
const StickySection = ({
  children,
  zIndex = 1,
  id,
  isFirst = false,
  isLast = false,
}) => {
  const panelRef = useRef(null);
  const endSentinelRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [stickyTop, setStickyTop] = useState(0);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const updateStickyTop = () => {
      const vh = window.innerHeight;
      const height = el.offsetHeight;
      const nextTop = Math.min(0, Math.floor(vh - height));
      setStickyTop((prev) => (prev === nextTop ? prev : nextTop));
    };

    updateStickyTop();

    const resizeObserver = new ResizeObserver(updateStickyTop);
    resizeObserver.observe(el);
    window.addEventListener('resize', updateStickyTop, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateStickyTop);
    };
  }, []);

  // Track the incoming section rising from viewport bottom (0) to top (1)
  const { scrollYProgress } = useScroll({
    target: endSentinelRef,
    offset: ['start end', 'start start'],
  });

  // Pure GPU-composited opacity scrim — zero full-page re-rasterization
  const scrimOpacity = useTransform(scrollYProgress, [0.2, 1], [0, 0.28]);
  const animateCover = !isLast && !shouldReduceMotion;

  return (
    <>
      {id && (
        <div
          id={id}
          className="h-0 w-full pointer-events-none"
          aria-hidden="true"
        />
      )}

      <div
        ref={panelRef}
        style={{
          top: `${stickyTop}px`,
          zIndex,
        }}
        className={`sticky w-full ${
          isFirst ? '' : 'shadow-[0_-8px_24px_rgba(0,0,0,0.14)]'
        }`}
      >
        <div className="relative w-full">
          {children}

          {animateCover && (
            <motion.div
              style={{ opacity: scrimOpacity }}
              className="pointer-events-none absolute inset-0 z-30 bg-slate-950"
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      {/* Non-sticky boundary marker marking where the next section starts rising */}
      <div
        ref={endSentinelRef}
        className="h-px -mt-px w-full pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
};

export default StickySection;
