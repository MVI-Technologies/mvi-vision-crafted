import { memo, ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
}

/**
 * Wraps content so it gently follows the cursor while hovered — a tactile,
 * "alive" micro-interaction used on the primary CTAs. Disabled for touch /
 * reduced-motion via the pointer check.
 */
const Magnetic = memo(function Magnetic({
  children,
  className,
  strength = 0.4,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.6 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  );
});

export default Magnetic;
