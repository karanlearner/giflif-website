import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Below-the-hero teaser — shown when user continues past the panels.
          Future sessions: replace with Featured Work, Our IPs, Audience
          Intelligence block, Numbers Wall, Press, How We Work, CTA, Footer. */}
      <section className="bg-ink text-cream py-24 px-6 sm:px-12 md:px-20 lg:px-28">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-cream/50 mb-6">
            More sections coming soon
          </p>
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-cream max-w-2xl">
            Selected work, our owned festival IPs, and the full story of how we
            work — all landing here over the next few weeks.
          </h3>
          <p className="mt-8 text-sm text-cream/60 max-w-xl">
            Want a conversation sooner? Write to{" "}
            <a
              href="mailto:karan@giflif.in"
              className="text-cream underline underline-offset-4 hover:text-red transition-colors"
            >
              karan@giflif.in
            </a>
            .
          </p>
        </div>
      </section>

      <footer className="bg-ink text-cream border-t border-cream/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-20 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-[0.15em] uppercase text-cream/50">
          <span>© {new Date().getFullYear()} GIFLIF Fest · Gurugram · Bhopal</span>
          <span className="flex gap-6">
            <a
              href="https://www.instagram.com/giflif_fest/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://in.linkedin.com/company/giflif"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.youtube.com/c/GIFLIFFest"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream transition-colors"
            >
              YouTube
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
