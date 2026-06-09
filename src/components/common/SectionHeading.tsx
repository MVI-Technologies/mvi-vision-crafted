import { memo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  /** Small mono eyebrow label, e.g. "(Serviços)". */
  label: string;
  /** Main display title. */
  title: ReactNode;
  /** Optional supporting paragraph below the title. */
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Consistent section header: animated index line + eyebrow + display title.
 */
const SectionHeading = memo(function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'mb-14 md:mb-20',
        isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl',
        className
      )}
    >
      <div className={cn('flex items-center gap-3 mb-5', isCenter && 'justify-center')}>
        <motion.span
          className="h-px w-8 bg-gradient-to-r from-brand-1 to-brand-2"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          style={{ transformOrigin: 'left' }}
        />
        <motion.span
          className="mono-label text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {label}
        </motion.span>
      </div>

      <motion.h2
        className="display-lg"
        initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          className={cn(
            'body-lg text-muted-foreground mt-6',
            isCenter ? 'mx-auto' : 'max-w-2xl'
          )}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT_EXPO }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
});

export default SectionHeading;
