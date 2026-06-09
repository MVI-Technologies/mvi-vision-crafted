import { memo, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageProvider';
import { EASE_OUT_EXPO } from '@/lib/motion';
import AuroraBackground from '@/components/common/AuroraBackground';
import Magnetic from '@/components/common/Magnetic';
import IsoBuild from '@/components/common/IsoBuild';

const capabilityKeys = [
  'hero.capability1',
  'hero.capability2',
  'hero.capability3',
  'hero.capability4',
  'hero.capability5',
] as const;

/** Drifting accent particles — kept light (CSS transforms only). */
function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 10 + 14,
        delay: Math.random() * 6,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: 'hsl(var(--brand-1) / 0.5)',
          }}
          animate={{ y: [0, -28, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

const Hero = memo(function Hero() {
  const { t } = useI18n();

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };

  const line: Variants = {
    hidden: { opacity: 0, y: 60, rotateX: -40 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 1, ease: EASE_OUT_EXPO },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen gradient-dark flex items-center overflow-hidden"
    >
      <AuroraBackground />
      <FloatingParticles />

      {/* Isometric "construction" animation — desktop: right side overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[52%] lg:block"
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 75% at 62% 42%, #000 35%, transparent 78%)',
          maskImage: 'radial-gradient(ellipse 75% 75% at 62% 42%, #000 35%, transparent 78%)',
        }}
        aria-hidden="true"
      >
        <IsoBuild className="h-full w-full" />
      </motion.div>

      <div className="section-container section-spacing pt-28 md:pt-40 relative z-10">
        {/* Mobile/tablet: isometric build above the headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO }}
          className="pointer-events-none mb-8 h-44 w-full sm:h-56 md:h-64 lg:hidden"
          style={{
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 80% at 50% 50%, #000 40%, transparent 85%)',
            maskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, #000 40%, transparent 85%)',
          }}
          aria-hidden="true"
        >
          <IsoBuild className="h-full w-full" grid={6} compact />
        </motion.div>


        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-6xl">
          {/* Headline */}
          <div className="relative mb-8 md:mb-12" style={{ perspective: 1000 }}>
            <motion.h1 variants={line} className="display-xl mb-1 md:mb-3">
              {t('hero.line1')}
            </motion.h1>
            <motion.h1 variants={line} className="display-xl mb-1 md:mb-3">
              {t('hero.line2')}
            </motion.h1>
            <motion.div variants={line} className="relative inline-block">
              <h1 className="display-xl text-gradient-brand-animated pb-2">{t('hero.line3')}</h1>
              <span className="display-xl text-echo" aria-hidden="true">
                {t('hero.echoText')}
              </span>
            </motion.div>

            {/* Accent rail */}
            <motion.div
              className="absolute -left-4 md:-left-8 top-2 bottom-2 w-px"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.7, duration: 1, ease: EASE_OUT_EXPO }}
              style={{
                transformOrigin: 'top',
                background: 'linear-gradient(to bottom, transparent, hsl(var(--brand-1) / 0.7), hsl(var(--brand-2) / 0.4), transparent)',
              }}
              aria-hidden="true"
            />
          </div>

          {/* Capabilities */}
          <motion.ul variants={item} className="mb-8 md:mb-12 flex flex-wrap gap-x-6 gap-y-2">
            {capabilityKeys.map((capKey, index) => (
              <motion.li
                key={capKey}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5, ease: EASE_OUT_EXPO }}
                className="mono-sm text-muted-foreground flex items-center gap-2"
              >
                <span className="inline-block h-1 w-1 rounded-full bg-brand-1" />
                {t(capKey)}
              </motion.li>
            ))}
          </motion.ul>

          {/* Subheadline */}
          <motion.p variants={item} className="body-lg text-muted-foreground max-w-xl mb-10 md:mb-12">
            {t('hero.subheadline')}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#contato" className="btn-accent group">
                {t('hero.ctaPrimary')}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a href="#projetos" className="btn-outline">
                {t('hero.ctaSecondary')}
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#sobre"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={t('hero.scroll')}
      >
        <span className="mono-label tracking-[0.3em]">{t('hero.scroll')}</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
});

export default Hero;
