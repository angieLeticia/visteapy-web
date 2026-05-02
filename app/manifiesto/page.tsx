import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/ui/FadeIn";
import { siteContent } from "@/lib/siteContent";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manifiesto — Visteapy",
  description: "No te vistes. Te conviertes. El manifiesto de Visteapy.",
};

const { manifestoPage } = siteContent;

export default function ManifestoPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bone min-h-screen">
        <div className="max-w-2xl mx-auto px-6 pt-40 pb-32">
          <FadeIn direction="none" className="mb-20">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-ink/40">
              {manifestoPage.eyebrow}
            </p>
          </FadeIn>

          <FadeIn>
            <h1
              className="font-serif text-ink leading-tight tracking-tight mb-16 text-balance"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              No te vistes.
              <br />
              <em>Te conviertes.</em>
            </h1>
          </FadeIn>

          <div className="space-y-10 font-sans font-light text-ink/70 text-lg leading-[1.9]">
            {manifestoPage.body.map((paragraph, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.05}>
                {i === manifestoPage.body.length - 1 ? (
                  <p className="font-serif text-ink text-2xl italic leading-snug pt-8">
                    &ldquo;{paragraph}&rdquo;
                  </p>
                ) : (
                  <p>{paragraph}</p>
                )}
              </FadeIn>
            ))}

            <FadeIn delay={0.5}>
              <p className="pt-4 text-ink/50 text-base">{siteContent.footer.made_in}</p>
            </FadeIn>
          </div>

          <FadeIn delay={0.6} className="mt-20 pt-16 border-t border-fog">
            <Link
              href="/#modos"
              className="font-sans text-xs tracking-[0.25em] uppercase text-terracota hover:text-terracota-dark transition-colors duration-300 border-b border-terracota/30 pb-1"
              data-cursor-label="Ver"
            >
              Explorar los universos →
            </Link>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  );
}
