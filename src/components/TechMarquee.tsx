import { memo } from 'react';
import { useI18n } from '@/i18n/LanguageProvider';
import Marquee from '@/components/common/Marquee';
import { techStack } from '@/data/tech';

/**
 * Infinite tech-stack ribbon that bridges the Hero and About sections,
 * reinforcing the "engineering that scales" message with familiar tooling.
 */
const TechMarquee = memo(function TechMarquee() {
  const { t } = useI18n();

  return (
    <section aria-label={t('tech.label')} className="border-y border-border bg-card/40 py-10">
      <div className="section-container mb-6">
        <span className="mono-label text-muted-foreground">{t('tech.label')}</span>
      </div>
      <Marquee speedClassName="[animation-duration:45s]">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="mx-2 inline-flex items-center gap-3 text-2xl md:text-4xl font-display font-medium text-muted-foreground/60 transition-colors duration-300 hover:text-foreground"
          >
            {tech}
            <span className="h-1.5 w-1.5 rounded-full bg-brand-1/50" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </section>
  );
});

export default TechMarquee;
