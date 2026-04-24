"use client";

import { useInView } from "@/components/hooks/useInView";

/**
 * Animated SVG line + area chart for the Audience Intelligence panel.
 * Renders a rising trajectory with dots. Animation draws once when in view.
 * Pure SVG + CSS — no charting library.
 */
export default function AudienceChart() {
  const { ref, hasBeenSeen } = useInView<HTMLDivElement>(0.3);

  // Coordinates for a convincing "targeting precision improves" curve
  const points = [
    { x: 0, y: 160 },
    { x: 80, y: 142 },
    { x: 160, y: 150 },
    { x: 240, y: 108 },
    { x: 320, y: 94 },
    { x: 400, y: 60 },
    { x: 480, y: 40 },
    { x: 560, y: 24 },
  ];

  const linePath =
    "M " + points.map((p) => `${p.x} ${p.y}`).join(" L ");
  const areaPath =
    linePath + ` L 560 200 L 0 200 Z`;

  return (
    <div
      ref={ref}
      data-seen={hasBeenSeen}
      className="audience-chart relative w-full max-w-xl h-40 sm:h-48"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 560 200"
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="audience-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Horizontal rule grid — subtle */}
        {[40, 80, 120, 160].map((y) => (
          <line
            key={y}
            x1="0"
            x2="560"
            y1={y}
            y2={y}
            stroke="var(--color-cream)"
            strokeOpacity="0.07"
            strokeDasharray="2 4"
          />
        ))}

        {/* Filled area under line */}
        <path d={areaPath} fill="url(#audience-area)" className="chart-area" />

        {/* Line itself */}
        <path
          d={linePath}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="chart-line"
        />

        {/* Data points */}
        <g className="chart-dots">
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="var(--color-accent)"
              style={{ transitionDelay: `${i * 90}ms` }}
            />
          ))}
        </g>
      </svg>

      {/* Caption — annotated to hint at meaning, not literal numbers */}
      <div className="mt-3 flex items-center justify-between text-[10px] sm:text-xs tracking-[0.2em] uppercase text-cream/40">
        <span>Pre-sale cold</span>
        <span className="text-accent">→ tickets sold</span>
      </div>
    </div>
  );
}
