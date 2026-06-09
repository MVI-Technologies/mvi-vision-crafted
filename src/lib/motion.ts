/**
 * Shared Framer Motion presets for MVI Tech.
 * Centralizes the signature easing and reveal variants used across sections.
 */
import type { Variants, Transition } from 'framer-motion';

/** Signature easing — expo-out. Matches the original cubic-bezier(0.16,1,0.3,1). */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
};

/** Container that staggers its children in. */
export const staggerContainer = (stagger = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Fade + rise, with a soft blur for a premium feel. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

/** Default viewport config for whileInView. */
export const viewportOnce = { once: true, margin: '-80px' } as const;
