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
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: EASE_OUT_EXPO },
    },
  };

  return (
    <section
      id="home"
      // min-h-svh respeita a barra do browser no mobile (evita o espaço morto
      // que min-h-screen causava em iOS/Android com a barra de navegação visível).
      // flex-col permite que o scroll indicator feche o layout sem ficar absolute.
      // overflow-hidden evita scroll lateral por margens negativas.
      className="relative min-h-svh md:min-h-screen gradient-dark flex flex-col overflow-hidden"
    >
      <AuroraBackground />
      <FloatingParticles />

      {/*
       * IsoBuild — apenas desktop (hidden lg:block).
       * Wrapper estático (sem opacity:0 do Framer) para que o canvas
       * receba dimensões reais no mount. Fade via CSS no próprio canvas.
       */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[52%] lg:block"
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 75% at 62% 42%, #000 35%, transparent 78%)',
          maskImage:
            'radial-gradient(ellipse 75% 75% at 62% 42%, #000 35%, transparent 78%)',
        }}
        aria-hidden="true"
      >
        <IsoBuild
          className="h-full w-full"
          style={{ animation: 'isoFadeIn 1.2s ease-out forwards' }}
        />
      </div>

      {/*
       * Conteúdo principal — flex-1 ocupa todo o espaço disponível entre
       * o topo e o scroll indicator, centralizando o bloco de texto
       * verticalmente sem deixar vácuo.
       */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="section-container section-spacing pt-24 pb-6 md:pt-32 md:pb-10 lg:pt-40 w-full">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="max-w-6xl w-full"
          >
            {/* Headline */}
            <div className="relative mb-5 md:mb-8 lg:mb-12" style={{ perspective: 1000 }}>
              <motion.h1 variants={line} className="display-xl mb-0.5 md:mb-3">
                {t('hero.line1')}
              </motion.h1>
              <motion.h1 variants={line} className="display-xl mb-0.5 md:mb-3">
                {t('hero.line2')}
              </motion.h1>
              <motion.div variants={line} className="relative inline-block">
                <h1 className="display-xl text-gradient-brand-animated pb-2">{t('hero.line3')}</h1>
                <span className="display-xl text-echo" aria-hidden="true">
                  {t('hero.echoText')}
                </span>
              </motion.div>

              {/* Accent rail — oculto no mobile para evitar overflow lateral */}
              <motion.div
                className="absolute top-2 bottom-2 w-px hidden sm:block"
                style={{
                  left: 0,
                  transform: 'translateX(-1.5rem)',
                  transformOrigin: 'top',
                  background:
                    'linear-gradient(to bottom, transparent, hsl(var(--brand-1) / 0.7), hsl(var(--brand-2) / 0.4), transparent)',
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.7, duration: 1, ease: EASE_OUT_EXPO }}
                aria-hidden="true"
              />
            </div>

            {/* Capabilities — gap vertical menor no mobile */}
            <motion.ul
              variants={item}
              className="mb-5 md:mb-8 lg:mb-12 flex flex-wrap gap-x-4 gap-y-1.5 md:gap-x-6 md:gap-y-2"
            >
              {capabilityKeys.map((capKey, index) => (
                <motion.li
                  key={capKey}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5, ease: EASE_OUT_EXPO }}
                  className="mono-sm text-muted-foreground flex items-center gap-2"
                >
                  <span className="inline-block h-1 w-1 flex-shrink-0 rounded-full bg-brand-1" />
                  {t(capKey)}
                </motion.li>
              ))}
            </motion.ul>

            {/* Subheadline */}
            <motion.p
              variants={item}
              className="body-lg text-muted-foreground w-full max-w-xl mb-7 md:mb-10 lg:mb-12"
            >
              {t('hero.subheadline')}
            </motion.p>

            {/* CTAs — full-width no mobile, auto a partir de sm */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <Magnetic>
                <a href="#contato" className="btn-accent group w-full sm:w-auto justify-center">
                  {t('hero.ctaPrimary')}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a href="#projetos" className="btn-outline w-full sm:w-auto justify-center">
                  {t('hero.ctaSecondary')}
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/*
       * Scroll indicator — fluxo normal (não absolute) no mobile.
       * Fica naturalmente colado ao fim do conteúdo, eliminando o vácuo.
       * No desktop (md+) volta a ser absolute para não empurrar o layout.
       */}
      <motion.a
        href="#sobre"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="
          relative z-10 self-center flex flex-col items-center gap-2 pb-7 pt-2
          text-muted-foreground hover:text-foreground transition-colors
          md:absolute md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:pb-0 md:pt-0
        "
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