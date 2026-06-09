import { memo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin brand-gradient progress bar pinned to the top of the viewport,
 * reflecting overall page scroll. Sits above the navbar.
 */
const ScrollProgress = memo(function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-brand-1 via-brand-2 to-brand-1"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
});

export default ScrollProgress;
