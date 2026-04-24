export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-between min-h-screen w-full px-6 py-12 sm:px-12 sm:py-16">
      {/* Top mark */}
      <header className="w-full flex items-center justify-between text-xs tracking-[0.2em] uppercase text-cream/60">
        <span>GIFLIF Fest</span>
        <span className="hidden sm:inline">Est. 2011 · Gurugram · Bhopal</span>
      </header>

      {/* Centre — the pitch */}
      <section className="flex flex-col items-center justify-center text-center max-w-4xl flex-1 gap-8 py-12">
        <div
          aria-hidden="true"
          className="h-1 w-16 bg-red rounded-full animate-pulse"
        />

        <h1
          className="font-serif text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight text-cream"
          style={{ fontFeatureSettings: '"ss01", "ss02"' }}
        >
          We build cultural IPs.
          <br />
          <span className="italic text-cream/80">For brands.</span>{" "}
          <span className="italic text-red">And our own.</span>
        </h1>

        <p className="max-w-xl text-base sm:text-lg text-cream/70 leading-relaxed">
          A creative consultancy behind{" "}
          <span className="text-cream">
            The Great Indian Film &amp; Literature Festival
          </span>{" "}
          and <span className="text-cream">Indiestaan Music Festival</span>.
          We bring curation, audience intelligence, and production to brands,
          universities, and artists we believe in.
        </p>

        <div className="pt-4 text-xs tracking-[0.2em] uppercase text-cream/50">
          A new home arrives soon.
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs tracking-[0.15em] uppercase text-cream/50">
        <span>
          <a
            href="mailto:karan@giflif.in"
            className="hover:text-cream transition-colors"
          >
            karan@giflif.in
          </a>
        </span>
        <span className="flex gap-4">
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
      </footer>
    </main>
  );
}
