import { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/**
 * Floating "scroll to top" control that fades in after the hero is scrolled
 * past. Positioned bottom-left so it never collides with the chatbot widget.
 */
const BackToTop = memo(function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollTop}
          aria-label="Back to top"
          className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full glass-strong text-foreground hover:text-brand-1 transition-colors"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
});

export default BackToTop;
