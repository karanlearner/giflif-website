"use client";

import Link from "next/link";
import { useInView } from "@/components/hooks/useInView";

/**
 * IP Showcase — the two cultural IPs GIFLIF Fest builds and operates.
 *
 * Sits below the homepage hero. Two side-by-side (or stacked on mobile)
 * dramatic blocks. Each one:
 *   - Background photograph of the actual IP, dimmed
 *   - Logo dropped in via a center-out curtain reveal
 *   - Tagline + edition stats fading up beneath
 *   - Edge accent line drawing left-to-right
 *   - On hover: photo brightens, logo lifts with subtle glow
 */

type IpCardProps = {
  /** The IP's full name (used for accessibility / SEO). */
  fullName: string;
  /** Display short name shown above the logo. */
  shortName: string;
  /** Path under /public to the logo PNG (white version). */
  logoSrc: string;
  /** Background photograph path. */
  bgSrc: string;
  /** One-line tagline. */
  tagline: string;
  /** Three short stats (rendered as a row). */
  stats: string[];
  /** Where the "Enter" link goes. */
  href: string;
  /** Accent colour token used for the edge line + hover glow. */
  accent: "red" | "accent";
};

function IpCard({
  fullName,
  shortName,
  logoSrc,
  bgSrc,
  tagline,
  stats,
  href,
  accent,
}: IpCardProps) {
  const { ref, hasBeenSeen } = useInView<HTMLElement>(0.25);
  const accentBg = accent === "red" ? "bg-red" : "bg-accent";
  const accentText = accent === "red" ? "text-red" : "text-accent";

  return (
    <article
      ref={ref}
      data-seen={hasBeenSeen}
      className="ip-card group relative bg-ink min-h-[70vh] lg:min-h-[80vh] flex flex-col justify-end"
    >
      {/* Background photograph */}
      <div
        className="ip-card-bg"
        style={{ backgroundImage: `url('${bgSrc}')` }}
        aria-hidden="true"
      />

      {/* Subtle theme tint over photo */}
      <div
        className={`absolute inset-0 z-0 mix-blend-multiply pointer-events-none ${
          accent === "red" ? "bg-red/15" : "bg-accent/15"
        }`}
        aria-hidden="true"
      />

      {/* Curtain-revealed body */}
      <div className="ip-card-curtain relative z-10 flex flex-col items-start gap-6 px-8 sm:px-12 md:px-16 py-12 sm:py-16 md:py-20">
        {/* Top kicker */}
        <div className="flex items-center gap-4 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-cream/60">
          <span className={`inline-block h-[1px] w-8 ${accentBg}`} />
          <span>Our own</span>
        </div>

        {/* Logo — central, dramatic */}
        <div className="ip-card-logo w-full max-w-md">
          <img
            src={logoSrc}
            alt={`${fullName} logo`}
            className="w-full h-auto select-none pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Meta block */}
        <div className="ip-card-meta flex flex-col gap-5 max-w-xl mt-2">
          <p className={`font-serif text-xl sm:text-2xl md:text-3xl text-cream/95 leading-snug`}>
            {tagline}
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-cream/60">
            {stats.map((s, i) => (
              <span key={s} className="flex items-center gap-5">
                {s}
                {i < stats.length - 1 && (
                  <span className={`${accentText} opacity-50`}>·</span>
                )}
              </span>
            ))}
          </div>

          <Link
            href={href}
            className={`group/cta inline-flex items-center gap-3 mt-2
                        text-sm sm:text-base tracking-[0.15em] uppercase text-cream
                        transition-all duration-300 hover:text-cream`}
          >
            <span className="relative">
              Enter
              <span className={`absolute -bottom-1 left-0 right-0 h-[1px] ${accentBg}
                                origin-left scale-x-0
                                group-hover/cta:scale-x-100
                                transition-transform duration-500 ease-out`} />
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/cta:translate-x-2"
            >
              →
            </span>
          </Link>
        </div>

        {/* Hidden short-name for screen readers */}
        <span className="sr-only">{shortName}</span>
      </div>

      {/* Edge accent — draws in left to right when card enters view */}
      <span aria-hidden="true" className={`ip-card-edge ${accentBg}`} />
    </article>
  );
}

// ============================================================================

export default function IpShowcase() {
  return (
    <section
      aria-label="GIFLIF Fest's owned cultural IPs"
      className="bg-ink text-cream"
    >
      {/* Section heading */}
      <div className="px-6 sm:px-12 md:px-20 py-20 sm:py-28 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-cream/50 mb-6">
          <span className="inline-block h-[1px] w-8 bg-red" />
          <span>The two IPs we build for ourselves</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight max-w-4xl">
          We build cultural IPs for clients.
          <br />
          <span className="italic text-red">And, of course, for ourselves.</span>
        </h2>
        <p className="mt-6 text-base sm:text-lg text-cream/60 max-w-xl leading-relaxed">
          The work below is GIFLIF Fest's own — multi-edition festival
          properties we conceived, produced, and have run since 2015.
        </p>
      </div>

      {/* Two-up split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-cream/10">
        <IpCard
          fullName="The Great Indian Film & Literature Festival"
          shortName="GIFLIF"
          logoSrc="/images/logos/giflif-white.png"
          bgSrc="/images/atmosphere/queue-ruskin.webp"
          tagline="A literary & cultural festival. Conversations, poetry, cinema, plays — with the voices that shape Indian thought."
          stats={["8 editions", "Since 2015", "Bhopal · Gurugram · Raipur"]}
          href="/ips/giflif"
          accent="red"
        />
        <IpCard
          fullName="Indiestaan Music Festival"
          shortName="Indiestaan"
          logoSrc="/images/logos/indiestaan-white.png"
          bgSrc="/images/atmosphere/lucky-ali-stage.webp"
          tagline="Live indie + folk + heritage music. Home of the world's first drive-in music festival."
          stats={["5 editions", "Since 2021", "Sold-out drive-ins"]}
          href="/ips/indiestaan"
          accent="accent"
        />
      </div>
    </section>
  );
}
