import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Background colour token (Tailwind class). */
  bg?: string;
  /** Foreground / text colour token (Tailwind class). */
  fg?: string;
  /** Initial rotation in degrees. */
  rotate?: number;
  /** Add a pulsing dot before the text. */
  pulse?: boolean;
  /** Wobble continuously (slow). */
  float?: boolean;
  /** Floating duration in seconds. */
  floatDuration?: number;
  className?: string;
};

/**
 * Vibrant rotated badge sticker — used to add visual personality
 * around headlines and content blocks. GenZ poster-coded.
 */
export default function StickerBadge({
  children,
  bg = "bg-lime",
  fg = "text-ink",
  rotate = -4,
  pulse = false,
  float = false,
  floatDuration = 6,
  className = "",
}: Props) {
  return (
    <span
      className={`sticker ${bg} ${fg} ${pulse ? "sticker-pulse" : ""} ${
        float ? "sticker-float" : ""
      } ${className}`}
      style={
        {
          transform: `rotate(${rotate}deg)`,
          ["--rot" as string]: `${rotate}deg`,
          ["--wobble-duration" as string]: `${floatDuration}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}
