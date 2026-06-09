import { memo, ReactNode, Children } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  /** Scroll direction. */
  reverse?: boolean;
  className?: string;
  /** Tailwind animation duration override class, e.g. "[animation-duration:60s]". */
  speedClassName?: string;
}

/**
 * Seamless infinite marquee. Duplicates its children so the -50% translate
 * loop is gapless. Pauses on hover and fades at both edges.
 */
const Marquee = memo(function Marquee({
  children,
  reverse = false,
  className,
  speedClassName,
}: MarqueeProps) {
  const items = Children.toArray(children);

  return (
    <div className={cn('mask-fade-x overflow-hidden', className)}>
      <div
        className={cn(
          'flex w-max pause-on-hover',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          speedClassName
        )}
      >
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1}
            className="flex shrink-0 items-center gap-4 pr-4"
          >
            {items}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Marquee;
