"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/components/hooks/useInView";

type Props = {
  target: number;
  durationMs?: number;
  /** Displayed suffix/prefix — e.g. "M", "x", "+" */
  suffix?: string;
  prefix?: string;
  /** Decimals to keep when rendering (e.g. 1 for 13.8) */
  decimals?: number;
  className?: string;
};

/**
 * Counts up from 0 → target when scrolled into view.
 * One-shot — stays at the final value.
 */
export default function NumberCounter({
  target,
  durationMs = 1600,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: Props) {
  const { ref, hasBeenSeen } = useInView<HTMLSpanElement>(0.4);
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!hasBeenSeen) return;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [hasBeenSeen, target, durationMs]);

  const display =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
