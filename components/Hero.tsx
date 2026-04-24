/**
 * Homepage Hero — 5-panel horizontal showcase.
 *
 * Desktop: CSS scroll-snap horizontal strip. User swipes / Shift+scrolls
 *          / uses arrow keys to move between panels.
 * Mobile:  panels stack vertically (same content, same order).
 *
 * v1 — pure CSS. No JS libraries.
 * v2 (future) — will upgrade to scroll-jacked: vertical scroll drives
 *                horizontal pan, via framer-motion / GSAP ScrollTrigger.
 */

import type { ReactNode } from "react";

type Panel = {
  index: string; // "01" .. "05"
  kicker: string;
  headline: ReactNode;
  body?: ReactNode;
  proof?: ReactNode;
  cta?: { label: string; href: string };
  bg: string; // Tailwind background class
  fg: string; // Tailwind foreground class
  kickerColor: string; // Tailwind text class for the kicker (small label)
  accentBar: string; // Tailwind class for the thin animated bar
};

const panels: Panel[] = [
  {
    index: "01",
    kicker: "GIFLIF Fest",
    headline: (
      <>
        We build<br className="hidden sm:inline" /> cultural IPs.
      </>
    ),
    body: (
      <>
        <span className="italic text-cream/80">For brands.</span>{" "}
        <span className="italic text-red">And our own.</span>
      </>
    ),
    proof: (
      <>
        Curation · Audience Intelligence · Production.
        <br />
        Under one roof since 2011.
      </>
    ),
    bg: "bg-ink",
    fg: "text-cream",
    kickerColor: "text-cream/50",
    accentBar: "bg-red",
  },
  {
    index: "02",
    kicker: "Curation",
    headline: <>We curate it.</>,
    body: (
      <>
        Artists, speakers, ideas, concepts.
        <br className="hidden sm:inline" /> Eleven years of curatorial
        judgement.
      </>
    ),
    proof: (
      <>
        Ruskin Bond · Javed Akhtar · Lucky Ali · Piyush Mishra · Raghubir
        Yadav · Rahat Indori · Saurabh Shukla
      </>
    ),
    bg: "bg-cream",
    fg: "text-ink",
    kickerColor: "text-ink/50",
    accentBar: "bg-red",
  },
  {
    index: "03",
    kicker: "Audience Intelligence",
    headline: (
      <>
        We know who<br className="hidden sm:inline" /> buys tickets.
      </>
    ),
    body: (
      <>
        Our proprietary audience intelligence layer helps ticketed shows price
        smarter, target better, and attribute reach to actual tickets sold.
      </>
    ),
    proof: (
      <span>
        Running on{" "}
        <span className="text-accent">
          Papon · Gurdas Maan · Raghubir Yadav · Manoj Joshi
        </span>
        .
      </span>
    ),
    bg: "bg-ink",
    fg: "text-cream",
    kickerColor: "text-accent",
    accentBar: "bg-accent",
  },
  {
    index: "04",
    kicker: "Production",
    headline: <>We build it.</>,
    body: (
      <>
        Venue, stage, sound, on-ground — at any scale.
        <br className="hidden sm:inline" /> Meticulous. On time. On budget.
      </>
    ),
    proof: (
      <>
        149 projects · 8 festival editions · 13.8M digital reach (Indiestaan
        Bhopal 2025).
      </>
    ),
    bg: "bg-red",
    fg: "text-cream",
    kickerColor: "text-cream/70",
    accentBar: "bg-cream",
  },
  {
    index: "05",
    kicker: "Let's build",
    headline: (
      <>
        Got a show?<br className="hidden sm:inline" /> A launch? A fest?
      </>
    ),
    body: <>Let's build it — together.</>,
    cta: { label: "Start a brief", href: "/contact" },
    bg: "bg-cream",
    fg: "text-ink",
    kickerColor: "text-ink/50",
    accentBar: "bg-red",
  },
];

// ============================================================================

function Panel({ panel, isFirst }: { panel: Panel; isFirst?: boolean }) {
  return (
    <article
      className={`
        relative flex-shrink-0
        w-full md:w-screen
        h-screen
        md:snap-start
        flex items-center justify-center
        px-6 sm:px-12 md:px-20 lg:px-28
        ${panel.bg} ${panel.fg}
      `}
    >
      {/* Panel counter — top left */}
      <div
        className={`absolute top-6 left-6 sm:top-10 sm:left-12 md:top-12 md:left-20 text-xs tracking-[0.25em] uppercase ${panel.kickerColor}`}
      >
        {panel.index} / 05
      </div>

      {/* Kicker label — top right */}
      <div
        className={`absolute top-6 right-6 sm:top-10 sm:right-12 md:top-12 md:right-20 text-xs tracking-[0.25em] uppercase ${panel.kickerColor}`}
      >
        {panel.kicker}
      </div>

      {/* Center content */}
      <div className="flex flex-col items-start max-w-3xl w-full gap-6 sm:gap-8">
        <div
          aria-hidden="true"
          className={`h-[3px] w-16 ${panel.accentBar} rounded-full animate-pulse-bar`}
        />

        <h2
          className="font-serif leading-[0.95] tracking-tight
                     text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                     animate-float-in"
          style={{ animationDelay: isFirst ? "0.1s" : "0s" }}
        >
          {panel.headline}
        </h2>

        {panel.body && (
          <p
            className="font-serif text-2xl sm:text-3xl md:text-4xl leading-snug max-w-2xl
                       animate-float-in"
            style={{ animationDelay: "0.25s" }}
          >
            {panel.body}
          </p>
        )}

        {panel.proof && (
          <p
            className="text-sm sm:text-base leading-relaxed max-w-xl opacity-70
                       animate-float-in"
            style={{ animationDelay: "0.4s" }}
          >
            {panel.proof}
          </p>
        )}

        {panel.cta && (
          <a
            href={panel.cta.href}
            className="group mt-2 inline-flex items-center gap-3
                       px-8 py-4 rounded-full
                       bg-red text-cream
                       text-sm sm:text-base tracking-wide uppercase
                       transition-transform hover:scale-[1.02]
                       animate-float-in"
            style={{ animationDelay: "0.4s" }}
          >
            <span>{panel.cta.label}</span>
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        )}
      </div>

      {/* Bottom affordance — only on first panel on desktop */}
      {isFirst && (
        <div className="hidden md:flex absolute bottom-10 left-20 items-center gap-3 text-xs tracking-[0.25em] uppercase text-cream/50">
          <span className="inline-block h-[1px] w-10 bg-cream/30 animate-draw-line" />
          <span>Swipe or scroll →</span>
        </div>
      )}

      {/* Mobile affordance — arrow down on first panel */}
      {isFirst && (
        <div className="md:hidden absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs tracking-[0.25em] uppercase text-cream/50">
          <span>Scroll</span>
          <span aria-hidden="true">↓</span>
        </div>
      )}
    </article>
  );
}

// ============================================================================

export default function Hero() {
  return (
    <section
      aria-label="GIFLIF Fest — positioning"
      className="
        hero-strip
        flex flex-col md:flex-row
        md:h-screen md:overflow-x-auto md:overflow-y-hidden
        md:snap-x md:snap-mandatory
      "
    >
      {panels.map((p, i) => (
        <Panel key={p.index} panel={p} isFirst={i === 0} />
      ))}
    </section>
  );
}
