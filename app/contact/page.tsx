import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — GIFLIF Fest",
  description:
    "Start a brief with GIFLIF Fest. We build cultural IPs for brands, universities, and artists.",
};

export default function Contact() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 sm:px-12 bg-ink text-cream">
      <div className="max-w-2xl w-full flex flex-col items-start gap-8">
        <div
          aria-hidden="true"
          className="h-[3px] w-16 bg-red rounded-full animate-pulse-bar"
        />

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight">
          Let's build<br />
          <span className="italic text-red">something.</span>
        </h1>

        <p className="text-base sm:text-lg text-cream/70 max-w-lg leading-relaxed">
          The full brief form is coming in a few days. For now — tell us what
          you have in mind by email. We read everything and usually respond
          within 48 hours on business days.
        </p>

        <a
          href="mailto:karan@giflif.in?subject=GIFLIF%20Fest%20—%20Project%20enquiry"
          className="group inline-flex items-center gap-3
                     px-8 py-4 rounded-full
                     bg-red text-cream
                     text-sm sm:text-base tracking-wide uppercase
                     transition-transform hover:scale-[1.02]"
        >
          <span>karan@giflif.in</span>
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </a>

        <div className="pt-8 text-xs tracking-[0.15em] uppercase text-cream/40">
          <a href="/" className="hover:text-cream transition-colors">
            ← Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
