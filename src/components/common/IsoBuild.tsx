import { memo, useEffect, useRef } from 'react';
import { useTheme } from '@/theme/ThemeProvider';

interface IsoBuildProps {
  className?: string;
  /** Cubes per grid side. */
  grid?: number;
  /** Compact mode: tighter cubes & faster intro (good for mobile). */
  compact?: boolean;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

/** Parse a CSS HSL token like "214 84% 51%" into components. */
function parseHSL(value: string, fallback: HSL): HSL {
  const m = value.trim().match(/([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
  if (!m) return fallback;
  return { h: +m[1], s: +m[2], l: +m[3] };
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

/**
 * Isometric "construction" animation. A grid of cubes rises in a radial wave
 * blended with a diagonal sweep — evoking projects being assembled block by
 * block. Pure Canvas 2D. Honors reduced-motion and theme tokens.
 */
const IsoBuild = memo(function IsoBuild({ className, grid = 8, compact = false }: IsoBuildProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const rootStyles = getComputedStyle(document.documentElement);
    const brand = parseHSL(rootStyles.getPropertyValue('--brand-1'), { h: 244, s: 75, l: 60 });
    const brand2 = parseHSL(rootStyles.getPropertyValue('--brand-2'), { h: 234, s: 75, l: 70 });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Color helpers — blend brand-1 → brand-2 by peak factor.
    const mix = (a: number, b: number, t: number) => a + (b - a) * t;
    const hslColor = (h: number, s: number, l: number, a: number) =>
      `hsla(${h}, ${s}%, ${clamp(l, 0, 100)}%, ${a})`;

    const faceTop = (peak: number, a: number) => {
      const h = mix(brand.h, brand2.h, peak);
      const s = mix(brand.s, brand2.s, peak);
      const l = mix(brand.l + 6, brand2.l + 14, peak);
      return hslColor(h, s, l, a);
    };
    const faceRight = (peak: number, a: number) => {
      const h = mix(brand.h, brand2.h, peak * 0.7);
      const l = mix(brand.l - 14, brand2.l - 6, peak);
      return hslColor(h, brand.s, l, a);
    };
    const faceLeft = (peak: number, a: number) => {
      const h = mix(brand.h, brand2.h, peak * 0.5);
      const l = mix(brand.l - 28, brand2.l - 18, peak);
      return hslColor(h, brand.s, l, a);
    };
    const edge = (a: number) => hslColor(brand.h, brand.s, brand.l - 36, a);

    const drawCube = (
      cx: number,
      cy: number,
      s: number,
      hh: number,
      h: number,
      alpha: number,
      peak: number,
    ) => {
      const topY = cy - h;
      const tTopY = topY - hh;
      const tSideY = topY;
      const tBotY = topY + hh;

      ctx.lineWidth = 1;
      ctx.strokeStyle = edge(alpha * 0.55);

      // Top face (diamond)
      ctx.fillStyle = faceTop(peak, alpha);
      ctx.beginPath();
      ctx.moveTo(cx, tTopY);
      ctx.lineTo(cx + s, tSideY);
      ctx.lineTo(cx, tBotY);
      ctx.lineTo(cx - s, tSideY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Subtle inner highlight on top face for peaks
      if (peak > 0.55) {
        ctx.fillStyle = hslColor(brand2.h, brand2.s, 92, alpha * (peak - 0.55) * 0.7);
        ctx.beginPath();
        ctx.moveTo(cx, tTopY + 1);
        ctx.lineTo(cx + s * 0.55, tSideY);
        ctx.lineTo(cx, tBotY - 1);
        ctx.lineTo(cx - s * 0.55, tSideY);
        ctx.closePath();
        ctx.fill();
      }

      // Left face
      ctx.fillStyle = faceLeft(peak, alpha);
      ctx.beginPath();
      ctx.moveTo(cx - s, tSideY);
      ctx.lineTo(cx, tBotY);
      ctx.lineTo(cx, tBotY + h);
      ctx.lineTo(cx - s, tSideY + h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right face
      ctx.fillStyle = faceRight(peak, alpha);
      ctx.beginPath();
      ctx.moveTo(cx, tBotY);
      ctx.lineTo(cx + s, tSideY);
      ctx.lineTo(cx + s, tSideY + h);
      ctx.lineTo(cx, tBotY + h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    // Precompute cell order (back-to-front by depth).
    const cells: Array<[number, number]> = [];
    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) cells.push([i, j]);
    }
    cells.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
    const maxDist = (grid - 1) * 2;
    const center = (grid - 1) / 2;

    const introDuration = compact ? 1.2 : 1.8;
    const start = performance.now();
    let raf = 0;

    const render = (now: number) => {
      const t = prefersReducedMotion ? introDuration : (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      const sizeBase = compact ? 1.55 : 1.7;
      const s = clamp(Math.min(width, height) / (grid * sizeBase), 10, 44);
      const hh = s / 2;
      const cubeH = s;
      const gap = 1.16;
      const bobAmp = s * 0.95;
      const originX = width / 2;
      const originY = height / 2 - (grid * hh * gap) / 2 + cubeH / 2;

      const intro = clamp(t / introDuration, 0, 1);
      // Ease-out intro
      const introEased = 1 - Math.pow(1 - intro, 3);

      for (const [i, j] of cells) {
        const dist = i + j;
        const appear = clamp((introEased * (maxDist + 5) - dist) / 5, 0, 1);
        if (appear <= 0) continue;

        // Radial distance from grid center → radial ripple
        const dx = i - center;
        const dy = j - center;
        const radial = Math.sqrt(dx * dx + dy * dy);

        // Two layered waves: diagonal sweep + radial ripple
        const diag = 0.5 + 0.5 * Math.sin(t * 1.3 - dist * 0.55);
        const ripple = 0.5 + 0.5 * Math.sin(t * 1.9 - radial * 0.9 + Math.PI / 3);
        const wave = diag * 0.55 + ripple * 0.45;
        const peak = wave * appear;

        const drop = (1 - appear) * s * 2.4;
        const bob = bobAmp * wave * appear;

        const cx = originX + (i - j) * s * gap;
        const cy = originY + (i + j) * hh * gap - bob + drop;

        drawCube(cx, cy, s, hh, cubeH, 0.95 * appear, peak);
      }

      if (!prefersReducedMotion) raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [theme, grid, compact]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
});

export default IsoBuild;
