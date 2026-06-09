import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n, TranslationKey } from '@/i18n/LanguageProvider';
import { EASE_OUT_EXPO, viewportOnce } from '@/lib/motion';

interface Stat {
  valueKey: TranslationKey;
  labelKey: TranslationKey;
}

const stats: Stat[] = [
  { valueKey: 'stats.projects.value', labelKey: 'stats.projects.label' },
  { valueKey: 'stats.response.value', labelKey: 'stats.response.label' },
  { valueKey: 'stats.tech.value', labelKey: 'stats.tech.label' },
  { valueKey: 'stats.commitment.value', labelKey: 'stats.commitment.label' },
];

/**
 * Animates a numeric value up from 0 while preserving any suffix/prefix
 * (e.g. "8+", "48h", "100%"). Falls back to the raw string if no number found.
 */
function CountUp({ value, play }: { value: string; play: boolean }) {
  const match = useMemo(() => value.match(/^(\D*)(\d+)(\D*)$/), [value]);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!play || !match) return;
    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];
    const duration = 1200;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${prefix}${Math.round(target * eased)}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, match]);

  return <span>{display}</span>;
}

const Stats = memo(function Stats() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, viewportOnce);

  return (
    <section ref={ref} className="section-container py-16 md:py-24">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.valueKey}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_OUT_EXPO }}
            className="group relative bg-card p-8 text-center transition-colors duration-300 hover:bg-accent/40 md:p-10"
          >
            <div className="display-md text-gradient-brand mb-2 font-display">
              <CountUp value={t(stat.valueKey)} play={inView} />
            </div>
            <p className="mono-sm text-muted-foreground">{t(stat.labelKey)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
});

export default Stats;
