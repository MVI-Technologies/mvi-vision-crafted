import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, memo } from 'react';
import { useI18n } from '@/i18n/LanguageProvider';

const bulletKeys = [
  { index: '001', key: 'about.bullet1' as const },
  { index: '002', key: 'about.bullet2' as const },
  { index: '003', key: 'about.bullet3' as const },
];

const About = memo(function About() {
  const { t } = useI18n();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="sobre" ref={sectionRef} className="section-spacing bg-card">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="mono-label text-muted-foreground mb-4 block">{t('about.label')}</span>
          <h2 className="display-lg">{t('about.title')}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Main text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="body-lg text-muted-foreground leading-relaxed">
              {t('about.description')}
            </p>
          </motion.div>

          {/* Strategic partner block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="border-l border-border pl-6">
              <h3 className="mono-sm text-foreground mb-8">{t('about.partnerTitle')}</h3>
              <div className="space-y-6">
                {bulletKeys.map((bullet, index) => (
                  <motion.div
                    key={bullet.index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <span className="index-label shrink-0">({bullet.index})</span>
                    <p className="body-md text-foreground">{t(bullet.key)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="divider mt-24 origin-left"
        />
      </div>
    </section>
  );
});

export default About;
