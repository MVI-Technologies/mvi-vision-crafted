import { memo } from 'react';
import { cn } from '@/lib/utils';

interface AuroraBackgroundProps {
  className?: string;
  /** Show the subtle dotted grid layer. */
  grid?: boolean;
}

/**
 * Ambient animated background: two drifting aurora blobs (brand colors) plus
 * an optional masked dotted grid. Purely decorative, pointer-events none.
 */
const AuroraBackground = memo(function AuroraBackground({
  className,
  grid = true,
}: AuroraBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)} aria-hidden="true">
      {grid && <div className="absolute inset-0 grid-pattern opacity-70" />}

      <div
        className="absolute -top-1/3 left-1/4 h-[40rem] w-[40rem] aurora-blob animate-aurora"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="absolute top-1/4 -right-32 h-[34rem] w-[34rem] aurora-blob animate-aurora"
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--brand-2) / 0.45), transparent 70%)',
          animationDelay: '-6s',
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 h-[28rem] w-[28rem] aurora-blob animate-aurora"
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--brand-1) / 0.3), transparent 70%)',
          animationDelay: '-12s',
        }}
      />
    </div>
  );
});

export default AuroraBackground;
