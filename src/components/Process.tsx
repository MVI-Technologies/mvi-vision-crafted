import { memo } from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import { useI18n, TranslationKey } from '@/i18n/LanguageProvider';
import { EASE_OUT_EXPO, viewportOnce } from '@/lib/motion';
import SectionHeading from '@/components/common/SectionHeading';

interface Step {
  num: string;
  icon: typeof Search;
  titleKey: TranslationKey;
  descKey: TranslationKey;
}

const steps: Step[] = [
  { num: '01', icon: Search, titleKey: 'process.step1.title', descKey: 'process.step1.description' },
  { num: '02', icon: PenTool, titleKey: 'process.step2.title', descKey: 'process.step2.description' },
  { num: '03', icon: Code2, titleKey: 'process.step3.title', descKey: 'process.step3.description' },
  { num: '04', icon: Rocket, titleKey: 'process.step4.title', descKey: 'process.step4.description' },
];

const Process = memo(function Process() {
  const { t } = useI18n();

  return (
    <section id="processo" className="section-spacing relative overflow-hidden">
      <div className="section-container relative">
        <SectionHeading
          label={t('process.label')}
          title={t('process.title')}
          description={t('process.description')}
        />

        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line on large screens */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px lg:block"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--border)), transparent)' }}
            aria-hidden="true"
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: index * 0.12, ease: EASE_OUT_EXPO }}
                className="group relative rounded-xl border border-border bg-card/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-1/40 hover:bg-card"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-1/10 text-brand-1 transition-colors duration-300 group-hover:bg-brand-1/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-4xl font-bold text-muted/40 transition-colors duration-300 group-hover:text-brand-1/30">
                    {step.num}
                  </span>
                </div>
                <h3 className="display-md mb-3 text-xl md:text-2xl">{t(step.titleKey)}</h3>
                <p className="body-md text-muted-foreground">{t(step.descKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default Process;
