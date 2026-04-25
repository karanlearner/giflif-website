"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Seconds for one full loop. Lower = faster. */
  duration?: number;
  /** Gap between repeated content blocks. CSS length. */
  gap?: string;
  /** Reverse direction. */
  reverse?: boolean;
  /** Tailwind classes for the wrapper. */
  className?: string;
};

/**
 * Infinite-scroll horizontal marquee.
 * Duplicates children inline so the seam never shows.
 * Pure CSS animation — pauses on hover for accessibility.
 */
export default function Marquee({
  children,
  duration = 38,
  gap = "4rem",
  reverse = false,
  className = "",
}: Props) {
  return (
    <div
      className={`marquee ${className}`}
      data-direction={reverse ? "reverse" : "forward"}
      style={
        {
          ["--marquee-duration" as string]: `${duration}s`,
          ["--marquee-gap" as string]: gap,
        } as React.CSSProperties
      }
    >
      {/* Two identical tracks side-by-side for seamless loop */}
      <div className="marquee__track">{children}</div>
      <div className="marquee__track" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
