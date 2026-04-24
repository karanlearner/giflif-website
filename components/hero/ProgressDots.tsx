"use client";

type Props = {
  total: number;
  active: number; // 0-indexed
};

/**
 * Small progress indicator — 5 dots showing which panel is active.
 * Sits fixed at the bottom-center of the viewport (desktop only, hidden on mobile).
 */
export default function ProgressDots({ total, active }: Props) {
  return (
    <div
      aria-hidden="true"
      className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40
                 items-center gap-2 px-4 py-2 rounded-full
                 backdrop-blur-md bg-ink/40 border border-cream/10"
    >
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === active;
        return (
          <span
            key={i}
            className={`
              block rounded-full transition-all duration-500 ease-out
              ${
                isActive
                  ? "w-8 h-[6px] bg-red"
                  : "w-[6px] h-[6px] bg-cream/30"
              }
            `}
          />
        );
      })}
      <span className="ml-2 text-[10px] tracking-[0.25em] uppercase text-cream/60 font-mono">
        {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
