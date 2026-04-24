"use client";

import type { ReactNode } from "react";
import { useInView } from "@/components/hooks/useInView";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number; // milliseconds
};

/**
 * Simple reveal wrapper — when scrolled into view, applies an `in` data-attribute
 * that unlocks CSS animations defined in globals.css.
 *
 * Use for block elements where we don't need per-word stagger.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}: Props) {
  const { ref, hasBeenSeen } = useInView<HTMLDivElement>(0.3);

  return (
    <Tag
      ref={ref as never}
      data-seen={hasBeenSeen}
      className={`reveal-block ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/**
 * Word-by-word reveal of a string. Each word wipes up from a mask.
 * Pass the sentence as plain text. For inline styling of specific words,
 * use <WordRevealMixed /> instead.
 */
type WordsProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number; // ms between words
  startDelay?: number; // ms before first word
};

export function RevealWords({
  text,
  className = "",
  wordClassName = "",
  stagger = 70,
  startDelay = 0,
}: WordsProps) {
  const { ref, hasBeenSeen } = useInView<HTMLSpanElement>(0.35);
  const words = text.split(" ");

  return (
    <span
      ref={ref}
      data-seen={hasBeenSeen}
      className={`reveal-words ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="word-mask">
          <span
            className={`word-inner ${wordClassName}`}
            style={{ transitionDelay: `${startDelay + i * stagger}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 && <span className="word-space"> </span>}
        </span>
      ))}
    </span>
  );
}
