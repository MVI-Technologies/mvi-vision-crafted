import { memo, useEffect, useRef } from 'react';
import { useTheme } from '@/theme/ThemeProvider';

interface IsoBuildProps {
  className?: string;
  /** Cubes per grid side. */
  grid?: number;
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
 * Isometric "construction" animation, à la Resend's hero. A grid of cubes
 * rises in diagonal waves, evoking projects being assembled block by block.
 * Pure Canvas 2D — no 3D libraries. Honors reduced-motion and theme tokens.
 */
const IsoBuild = memo(function IsoBuild({ className, grid = 8 }: IsoBuildProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rootStyles = getComputedStyle(document.documentElement);
    const brand = parseHSL(rootStyles.getPropertyValue('--brand-1'), { h: 214, s: 84, l: 51 });

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

    const faceTop = (a: number) =>
      `hsla(${brand.h}, ${brand.s}%, ${clamp(brand.l + 8, 0, 100)}%, ${a})`;
    const faceRight = (a: number) =>
      `hsla(${brand.h}, ${brand.s}%, ${clamp(brand.l - 12, 0, 100)}%, ${a})`;
    const faceLeft = (a: number) =>
      `hsla(${brand.h}, ${brand.s}%, ${clamp(brand.l - 26, 0, 100)}%, ${a})`;
    const edge = (a: number) =>
      `hsla(${brand.h}, ${brand.s}%, ${clamp(brand.l - 34, 0, 100)}%, ${a})`;

    const drawCube = (cx: number, cy: number, s: number, hh: number, h: number, alpha: number) => {
      const topY = cy - h;
      const tTopY = topY - hh;
      const tSideY = topY;
      const tBotY = topY + hh;

      ctx.lineWidth = 1;
      ctx.strokeStyle = edge(alpha * 0.6);

      // Top face (diamond)
      ctx.fillStyle = faceTop(alpha);
      ctx.beginPath();
      ctx.moveTo(cx, tTopY);
      ctx.lineTo(cx + s, tSideY);
      ctx.lineTo(cx, tBotY);
      ctx.lineTo(cx - s, tSideY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Left face
      ctx.fillStyle = faceLeft(alpha);
      ctx.beginPath();
      ctx.moveTo(cx - s, tSideY);
      ctx.lineTo(cx, tBotY);
      ctx.lineTo(cx, tBotY + h);
      ctx.lineTo(cx - s, tSideY + h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right face
      ctx.fillStyle = faceRight(alpha);
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

    const start = performance.now();
    let raf = 0;

    const render = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      const s = clamp(Math.min(width, height) / (grid * 1.7), 12, 42);
      const hh = s / 2;
      const cubeH = s; // fixed edge → real cube proportions
      const gap = 1.16; // spacing so each cube reads individually
      const bobAmp = s * 0.85;
      const originX = width / 2;
      const originY = height / 2 - (grid * hh * gap) / 2 + cubeH / 2;

      // Staggered build-in over ~1.8s, then a continuous diagonal wave.
      const intro = clamp(t / 1.8, 0, 1);

      for (const [i, j] of cells) {
        const dist = i + j;
        const appear = clamp((intro * (maxDist + 5) - dist) / 5, 0, 1);
        if (appear <= 0) continue;

        const drop = (1 - appear) * s * 2.2; // cubes fall into place
        const wave = 0.5 + 0.5 * Math.sin(t * 1.4 - dist * 0.5);
        const bob = bobAmp * wave * appear;

        const cx = originX + (i - j) * s * gap;
        const cy = originY + (i + j) * hh * gap - bob + drop;

        drawCube(cx, cy, s, hh, cubeH, 0.95 * appear);
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [theme, grid]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
});

export default IsoBuild;
