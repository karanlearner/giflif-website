"use client";

import { useInView } from "@/components/hooks/useInView";

type Props = {
  /** Pass the headline as an array of lines; each line splits into words. */
  lines: Array<{
    text: string;
    /** Optional className applied to this whole line (e.g., italic, color). */
    className?: string;
  }>;
  /** Tailwind classes for the wrapper h tag. */
  className?: string;
  /** Stagger between words in ms. */
  stagger?: number;
  /** Delay before first word in ms. */
  startDelay?: number;
  /** HTML tag — h1 / h2 / h3. */
  as?: "h1" | "h2" | "h3";
};

/**
 * Word-by-word kinetic reveal headline. Each word starts shrunk + rotated
 * and snaps into place when the headline scrolls into view.
 */
export default function KineticHeadline({
  lines,
  className = "",
  stagger = 90,
  startDelay = 100,
  as: Tag = "h1",
}: Props) {
  const { ref, hasBeenSeen } = useInView<HTMLHeadingElement>(0.25);

  let wordIndex = 0;

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, li) => (
        <span
          key={li}
          data-seen={hasBeenSeen}
          className={`kinetic-line ${line.className ?? ""}`}
        >
          {line.text.split(" ").map((word) => {
            const delay = startDelay + wordIndex * stagger;
            wordIndex++;
            return (
              <span
                key={`${li}-${wordIndex}`}
                className="kinetic-word"
                style={{ transitionDelay: `${delay}ms` }}
              >
                {word}
                {/* Non-breaking trailing space */}
                {" "}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
