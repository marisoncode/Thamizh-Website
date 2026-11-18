import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';

const COVER_SPRING = { stiffness: 120, damping: 28, mass: 0.6, restDelta: 0.001 };

/**
 * Wraps a page section in a sticky stacking curtain panel:
 * - Sections <= viewport height pin at the top while the next section rises over them.
 * - Taller sections scroll naturally to their bottom before pinning (top = vh - height),
 *   so no content is ever cut off or unreachable.
 * - Optional `id` is placed on a non-sticky sentinel before the panel so smooth anchor
 *   scrolling (react-scroll) always lands at the exact document position.
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
      // Pin at top (0) if section fits in viewport; otherwise allow full scrolling
      // through the section and lock right when its bottom hits the viewport bottom.
      setStickyTop(Math.min(0, Math.floor(vh - height)));
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
  const smoothCover = useSpring(scrollYProgress, COVER_SPRING);

  // Gracefully scale back and softly dim this section as the next section covers it
  const panelScale = useTransform(smoothCover, [0.25, 1], [1, 0.96]);
  const scrimOpacity = useTransform(smoothCover, [0.25, 1], [0, 0.32]);

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
          isFirst ? '' : 'shadow-[0_-18px_50px_rgba(0,0,0,0.2)]'
        }`}
      >
        <motion.div
          style={animateCover ? { scale: panelScale, transformOrigin: 'center top' } : undefined}
          className="relative w-full will-change-transform"
        >
          {children}

          {animateCover && (
            <motion.div
              style={{ opacity: scrimOpacity }}
              className="pointer-events-none absolute inset-0 z-30 bg-slate-950"
              aria-hidden="true"
            />
          )}
        </motion.div>
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
