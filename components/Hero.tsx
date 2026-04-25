"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Reveal, RevealWords } from "@/components/hero/RevealText";
import NumberCounter from "@/components/hero/NumberCounter";
import AudienceChart from "@/components/hero/AudienceChart";
import ProgressDots from "@/components/hero/ProgressDots";

/* ========================================================================
 * Homepage Hero — 5-panel showcase.
 *
 * v1 (shipped earlier): CSS scroll-snap, solid color panels, simple reveal.
 * v2 (this): scroll-triggered reveals, word-by-word text wipes, animated
 *            SVG chart for Audience Intelligence, number counters for
 *            stats, progress indicator, drifting gradient backgrounds,
 *            grain texture on ink panels.
 *
 * Future v3: scroll-jacked pan (vertical scroll drives horizontal motion)
 *            — requires framer-motion/GSAP install.
 * ====================================================================== */

type PanelKind = "brand" | "curation" | "audience" | "production" | "cta";
type PanelTheme = "ink" | "cream" | "red";

type PanelConfig = {
  kind: PanelKind;
  theme: PanelTheme;
  index: string;
  kicker: string;
  kickerOpacity: string;
  /** Optional full-bleed background image (path under /public). */
  bgImage?: string;
  /** Optional alt text describing the bg photograph. */
  bgImageAlt?: string;
};

const panels: PanelConfig[] = [
  { kind: "brand", theme: "ink", index: "01", kicker: "GIFLIF Fest", kickerOpacity: "text-cream/50" },
  { kind: "curation", theme: "cream", index: "02", kicker: "Curation", kickerOpacity: "text-ink/50" },
  { kind: "audience", theme: "ink", index: "03", kicker: "Audience Intelligence", kickerOpacity: "text-accent" },
  {
    kind: "production",
    theme: "red",
    index: "04",
    kicker: "Production",
    kickerOpacity: "text-cream/70",
    bgImage: "/images/atmosphere/audience-indiestaan.webp",
    bgImageAlt: "Indiestaan Music Festival audience under stage lights",
  },
  { kind: "cta", theme: "cream", index: "05", kicker: "Let's build", kickerOpacity: "text-ink/50" },
];

const themeClasses: Record<PanelTheme, { bg: string; fg: string; bar: string }> = {
  ink: { bg: "bg-ink panel-ink", fg: "text-cream", bar: "bg-red" },
  cream: { bg: "bg-cream", fg: "text-ink", bar: "bg-red" },
  red: { bg: "bg-red panel-red", fg: "text-cream", bar: "bg-cream" },
};

// ============================================================================

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePanel, setActivePanel] = useState(0);

  // Track which panel is most visible — powers the progress dots.
  useEffect(() => {
    const strip = sectionRef.current;
    if (!strip) return;

    const panelEls = Array.from(
      strip.querySelectorAll<HTMLElement>("[data-panel-index]")
    );
    if (panelEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.panelIndex
            );
            setActivePanel(idx);
          }
        });
      },
      { threshold: [0.5, 0.6, 0.7] }
    );

    panelEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        aria-label="GIFLIF Fest — positioning"
        className="
          hero-strip
          flex flex-col md:flex-row
          md:h-screen md:overflow-x-auto md:overflow-y-hidden
          md:snap-x md:snap-mandatory
        "
      >
        {panels.map((p, i) => (
          <PanelFrame key={p.index} config={p} isFirst={i === 0} dataIndex={i}>
            <PanelContent kind={p.kind} />
          </PanelFrame>
        ))}
      </section>

      <ProgressDots total={panels.length} active={activePanel} />
    </>
  );
}

// ============================================================================

function PanelFrame({
  config,
  isFirst,
  dataIndex,
  children,
}: {
  config: PanelConfig;
  isFirst?: boolean;
  dataIndex: number;
  children: ReactNode;
}) {
  const t = themeClasses[config.theme];
  return (
    <article
      data-panel-index={dataIndex}
      className={`
        relative flex-shrink-0
        w-full md:w-screen
        h-screen
        md:snap-start
        flex items-center
        px-6 sm:px-12 md:px-20 lg:px-28
        overflow-hidden
        ${t.bg} ${t.fg}
      `}
    >
      {/* Optional full-bleed background photograph */}
      {config.bgImage && (
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <img
            src={config.bgImage}
            alt={config.bgImageAlt ?? ""}
            className="w-full h-full object-cover scale-[1.02] panel-bg-photo"
            loading="lazy"
          />
          {/* Theme-tinted overlay — keeps the panel's brand colour while letting the photo breathe through */}
          <div
            className={`absolute inset-0 mix-blend-multiply ${
              config.theme === "red"
                ? "bg-red/70"
                : config.theme === "ink"
                ? "bg-ink/70"
                : "bg-cream/40"
            }`}
          />
          {/* Vignette for type legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-ink/30" />
        </div>
      )}

      {/* Top-left: panel index */}
      <div
        className={`absolute z-10 top-6 left-6 sm:top-10 sm:left-12 md:top-12 md:left-20
                    text-xs tracking-[0.25em] uppercase ${config.kickerOpacity}
                    font-mono`}
      >
        {config.index} / 05
      </div>

      {/* Top-right: kicker label */}
      <div
        className={`absolute z-10 top-6 right-6 sm:top-10 sm:right-12 md:top-12 md:right-20
                    text-xs tracking-[0.25em] uppercase ${config.kickerOpacity}`}
      >
        {config.kicker}
      </div>

      <div className="relative z-10 max-w-4xl w-full">{children}</div>

      {/* First panel scroll affordance */}
      {isFirst && (
        <>
          <div
            className="hidden md:flex absolute bottom-10 left-20
                       items-center gap-3 text-xs tracking-[0.25em] uppercase text-cream/50"
          >
            <span className="inline-block h-[1px] w-10 bg-cream/30 animate-draw-line" />
            <span>Swipe or scroll →</span>
          </div>
          <div
            className="md:hidden absolute bottom-10 left-1/2 -translate-x-1/2
                       flex flex-col items-center gap-2 text-xs tracking-[0.25em] uppercase text-cream/50"
          >
            <span>Scroll</span>
            <span aria-hidden="true" className="animate-bounce">
              ↓
            </span>
          </div>
        </>
      )}
    </article>
  );
}

// ============================================================================
// Per-panel content — each gets its own treatment
// ============================================================================

function PanelContent({ kind }: { kind: PanelKind }) {
  switch (kind) {
    case "brand":
      return <BrandPanel />;
    case "curation":
      return <CurationPanel />;
    case "audience":
      return <AudiencePanel />;
    case "production":
      return <ProductionPanel />;
    case "cta":
      return <CtaPanel />;
  }
}

// ---- Panel 01 — BRAND ----
function BrandPanel() {
  return (
    <div className="flex flex-col items-start gap-6 sm:gap-8">
      <Reveal>
        <div
          aria-hidden="true"
          className="h-[3px] w-16 bg-red rounded-full animate-pulse-bar"
        />
      </Reveal>

      <h1 className="font-serif leading-[0.95] tracking-tight text-cream
                     text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        <RevealWords text="We build" stagger={80} startDelay={100} />
        <br className="hidden sm:inline" />
        <RevealWords text="cultural IPs." stagger={80} startDelay={280} />
      </h1>

      <p className="font-serif text-2xl sm:text-3xl md:text-4xl leading-snug">
        <span className="italic text-cream/80">
          <RevealWords text="For brands." stagger={80} startDelay={900} />
        </span>{" "}
        <span className="italic text-red">
          <RevealWords text="And our own." stagger={80} startDelay={1150} />
        </span>
      </p>

      <Reveal as="p" delay={1600} className="text-sm sm:text-base text-cream/60 max-w-xl leading-relaxed">
        Curation · Audience Intelligence · Production.
        <br />
        Under one roof since 2011.
      </Reveal>
    </div>
  );
}

// ---- Panel 02 — CURATION ----
const CURATED_PORTRAITS = [
  { slug: "ruskin-bond", name: "Ruskin Bond", role: "Author", year: "Bhopal · 2018" },
  { slug: "javed-akhtar", name: "Javed Akhtar", role: "Poet · Lyricist", year: "Gurugram · 2016" },
  { slug: "gulzar", name: "Gulzar", role: "Poet · Filmmaker", year: "Gurugram · 2016" },
  { slug: "lucky-ali", name: "Lucky Ali", role: "Musician", year: "Indiestaan · Bhopal · 2023" },
  { slug: "piyush-mishra", name: "Piyush Mishra", role: "Actor · Lyricist", year: "Bhopal · 2019" },
  { slug: "rahat-indori", name: "Rahat Indori", role: "Poet", year: "Bhopal · 2017" },
  { slug: "saurabh-shukla", name: "Saurabh Shukla", role: "Actor · Director", year: "Bhopal · 2018" },
  { slug: "taapsee-pannu", name: "Taapsee Pannu", role: "Actor", year: "Bhopal · 2018" },
];

function CurationPanel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ROTATION_MS = 4200;

  // Auto-rotate the masked image inside the letterforms
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CURATED_PORTRAITS.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [paused]);

  const current = CURATED_PORTRAITS[index];
  const portraitUrl = `url('/images/curation/${current.slug}.webp')`;

  return (
    <div
      className="curation-stage relative w-full flex flex-col items-start justify-center gap-8 sm:gap-10 md:gap-12 py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Pulse bar + meta */}
      <div className="flex items-center gap-5">
        <Reveal>
          <div
            aria-hidden="true"
            className="h-[3px] w-16 bg-red rounded-full animate-pulse-bar"
          />
        </Reveal>
        <Reveal as="span" delay={200} className="text-[10px] tracking-[0.3em] uppercase text-ink/50 font-mono">
          {String(index + 1).padStart(2, "0")} / {String(CURATED_PORTRAITS.length).padStart(2, "0")} ·
          {" "}{current.year}
        </Reveal>
      </div>

      {/* Hero — text-mask. The portrait lives INSIDE the letterforms. */}
      <h2
        key={current.slug}
        aria-label={`We curate it. Featured: ${current.name}, ${current.role}.`}
        className="text-portrait-mask font-serif leading-[0.85] tracking-tighter
                   text-[clamp(4rem,18vw,15rem)]
                   md:text-[clamp(6rem,16vw,17rem)]"
        style={
          {
            ["--portrait-image" as string]: portraitUrl,
          } as React.CSSProperties
        }
      >
        We curate <span className="italic">it.</span>
      </h2>

      {/* Name plate — switches with the portrait */}
      <div
        key={"plate-" + current.slug}
        className="flex flex-col gap-1 carousel-nameplate"
      >
        <div className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-red leading-none">
          {current.name}
        </div>
        <div className="text-xs sm:text-sm tracking-[0.2em] uppercase text-ink/60 mt-2">
          {current.role}
        </div>
      </div>

      {/* Thin progress strip across all 8 voices, anchored bottom of panel block */}
      <div className="absolute -bottom-2 left-0 right-0 flex gap-1.5 max-w-3xl">
        {CURATED_PORTRAITS.map((_, i) => (
          <div
            key={i}
            className="h-[2px] flex-1 bg-ink/15 overflow-hidden"
          >
            <div
              className={`h-full bg-red ${
                i === index
                  ? "carousel-progress-active"
                  : i < index
                  ? "w-full"
                  : "w-0"
              }`}
              style={
                i === index && !paused
                  ? { animationDuration: `${ROTATION_MS}ms` }
                  : undefined
              }
            />
          </div>
        ))}
      </div>

      {/* Tiny pre-load layer — keeps next images warm so swap is instant */}
      <div className="hidden">
        {CURATED_PORTRAITS.map((p) => (
          <img key={p.slug} src={`/images/curation/${p.slug}.webp`} alt="" />
        ))}
      </div>
    </div>
  );
}

// ---- Panel 03 — AUDIENCE INTELLIGENCE (the moat) ----
function AudiencePanel() {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16 w-full">
      <div className="flex flex-col items-start gap-6 sm:gap-8 flex-1 min-w-0">
        <Reveal>
          <div
            aria-hidden="true"
            className="h-[3px] w-16 bg-accent rounded-full animate-pulse-bar"
          />
        </Reveal>

        <h2 className="font-serif leading-[0.95] tracking-tight text-cream
                       text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          <RevealWords text="We know who" stagger={90} startDelay={100} />
          <br className="hidden sm:inline" />
          <RevealWords text="buys tickets." stagger={90} startDelay={400} />
        </h2>

        <Reveal as="p" delay={1100} className="text-base sm:text-lg text-cream/80 max-w-xl leading-relaxed">
          A proprietary audience intelligence layer — built over a decade of
          running ticketed shows. Helps you price smarter, target better, and
          attribute reach to actual tickets sold.
        </Reveal>

        <Reveal as="p" delay={1350} className="text-xs sm:text-sm tracking-[0.15em] uppercase text-cream/50">
          Running on{" "}
          <span className="text-accent">
            Papon · Gurdas Maan · Raghubir Yadav · Manoj Joshi
          </span>
        </Reveal>
      </div>

      {/* Chart on right side (desktop) / below (mobile) */}
      <div className="w-full lg:max-w-md lg:pt-6">
        <AudienceChart />
      </div>
    </div>
  );
}

// ---- Panel 04 — PRODUCTION ----
function ProductionPanel() {
  return (
    <div className="flex flex-col items-start gap-6 sm:gap-8">
      <Reveal>
        <div
          aria-hidden="true"
          className="h-[3px] w-16 bg-cream rounded-full animate-pulse-bar"
        />
      </Reveal>

      <h2 className="font-serif leading-[0.95] tracking-tight text-cream
                     text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        <RevealWords text="We build it." stagger={90} startDelay={100} />
      </h2>

      <Reveal as="p" delay={500} className="font-serif text-2xl sm:text-3xl md:text-4xl leading-snug text-cream/90 max-w-2xl">
        Venue. Stage. Sound. On-ground — at any scale.
      </Reveal>

      {/* Big number grid */}
      <Reveal as="div" delay={900} className="grid grid-cols-3 gap-6 sm:gap-12 pt-6 sm:pt-10 w-full max-w-2xl">
        <Stat number={149} suffix="+" label="Projects since 2011" />
        <Stat number={8} label="Festival editions" />
        <Stat number={13.8} decimals={1} suffix="M" label="Digital reach (2025)" />
      </Reveal>
    </div>
  );
}

function Stat({
  number,
  decimals = 0,
  suffix = "",
  label,
}: {
  number: number;
  decimals?: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-l-2 border-cream/30 pl-4 sm:pl-6">
      <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream leading-none">
        <NumberCounter target={number} decimals={decimals} suffix={suffix} />
      </span>
      <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-cream/70 leading-snug">
        {label}
      </span>
    </div>
  );
}

// ---- Panel 05 — CTA ----
function CtaPanel() {
  return (
    <div className="flex flex-col items-start gap-6 sm:gap-8 max-w-3xl">
      <Reveal>
        <div
          aria-hidden="true"
          className="h-[3px] w-16 bg-red rounded-full animate-pulse-bar"
        />
      </Reveal>

      <h2 className="font-serif leading-[0.95] tracking-tight text-ink
                     text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        <RevealWords text="Got a show?" stagger={90} startDelay={100} />
        <br className="hidden sm:inline" />
        <RevealWords text="A launch?" stagger={90} startDelay={380} />{" "}
        <span className="italic text-red">
          <RevealWords text="A fest?" stagger={90} startDelay={620} />
        </span>
      </h2>

      <Reveal as="p" delay={1100} className="font-serif text-2xl sm:text-3xl md:text-4xl leading-snug text-ink">
        Let's build it — together.
      </Reveal>

      <Reveal as="div" delay={1400}>
        <a
          href="/contact"
          className="group inline-flex items-center gap-3
                     px-8 py-4 rounded-full
                     bg-red text-cream
                     text-sm sm:text-base tracking-wide uppercase
                     transition-all duration-300
                     hover:shadow-[0_12px_40px_-8px_rgba(179,18,26,0.5)]
                     hover:scale-[1.02]"
        >
          <span>Start a brief</span>
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </Reveal>

      <Reveal as="p" delay={1600} className="text-xs sm:text-sm tracking-[0.15em] uppercase text-ink/50 pt-4">
        or write to{" "}
        <a
          href="mailto:karan@giflif.in"
          className="text-ink hover:text-red transition-colors"
        >
          karan@giflif.in
        </a>
      </Reveal>
    </div>
  );
}
