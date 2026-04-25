import Hero from "@/components/Hero";
import IpShowcase from "@/components/IpShowcase";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Two cultural IPs — split-screen logo reveal */}
      <IpShowcase />

      {/* "More to come" — quieter teaser, the rest of the home builds out next */}
      <section className="bg-ink text-cream py-20 px-6 sm:px-12 md:px-20 border-t border-cream/10">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <p className="text-xs tracking-[0.3em] uppercase text-cream/40">
            Coming soon
          </p>
          <p className="text-base sm:text-lg text-cream/60 max-w-xl leading-relaxed">
            Selected client work · the full Audience Intelligence story · how
            we work · journal · contact. Building out over the next few weeks.
            For now, write to{" "}
            <a
              href="mailto:karan@giflif.in"
              className="text-cream hover:text-red transition-colors"
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
