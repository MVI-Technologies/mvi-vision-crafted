import { memo, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: 'div' | 'section' | 'span' | 'li';
  /** When false, animates every time it enters the viewport. */
  once?: boolean;
}

/**
 * Lightweight scroll-reveal wrapper. Defaults to the shared fadeUp variant
 * and the standard viewport margin so reveals feel consistent everywhere.
 */
const Reveal = memo(function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = 'div',
  once = true,
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={once ? viewportOnce : { ...viewportOnce, once: false }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
});

export default Reveal;
