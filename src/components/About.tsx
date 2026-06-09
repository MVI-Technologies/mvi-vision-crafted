import { memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageProvider';
import { EASE_OUT_EXPO, viewportOnce } from '@/lib/motion';
import SectionHeading from '@/components/common/SectionHeading';

const bulletKeys = [
  { index: '001', key: 'about.bullet1' as const },
  { index: '002', key: 'about.bullet2' as const },
  { index: '003', key: 'about.bullet3' as const },
];

const About = memo(function About() {
  const { t } = useI18n();

  return (
    <section id="sobre" className="section-spacing bg-card relative overflow-hidden">
      {/* faint corner glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(var(--brand-2) / 0.25), transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="section-container relative">
        <SectionHeading label={t('about.label')} title={t('about.title')} />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
          {/* Lead statement */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO }}
          >
            <p className="display-md font-display leading-tight tracking-tight">
              {t('about.description')}
            </p>
          </motion.div>

          {/* Strategic partner block */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT_EXPO }}
          >
            <div className="relative rounded-xl glass p-8 gradient-border">
              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-1/15 text-brand-1">
                  <Sparkles className="h-4 w-4" />
                </span>
                <h3 className="mono-sm text-foreground">{t('about.partnerTitle')}</h3>
              </div>

              <div className="space-y-6">
                {bulletKeys.map((bullet, index) => (
                  <motion.div
                    key={bullet.index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <span className="index-label shrink-0 pt-1 text-brand-1/70">({bullet.index})</span>
                    <p className="body-md text-foreground">{t(bullet.key)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default About;
