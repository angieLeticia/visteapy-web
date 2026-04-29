import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllModes, getAllModeSlugs, getModeWithProducts } from "@/lib/db";

export const dynamic = "force-dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ModeCard from "@/components/ModeCard";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllModeSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mode = await getModeWithProducts(params.slug);
  if (!mode) return {};
  return {
    title: `${mode.name} — Visteapy`,
    description: mode.opening_poem,
    openGraph: {
      title: `${mode.name} — Visteapy`,
      description: mode.tagline,
      images: [{ url: mode.hero_image, width: 1600, height: 900 }],
    },
  };
}

export default async function ModePage({ params }: Props) {
  const [mode, allModes] = await Promise.all([
    getModeWithProducts(params.slug),
    getAllModes(),
  ]);

  if (!mode) notFound();

  const otherModes = allModes.filter((m) => m.slug !== mode.slug).slice(0, 2);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[85vh] min-h-[500px] overflow-hidden bg-ink">
          {/* TODO: reemplazar con imagen generada por IA siguiendo el moodboard del modo */}
          <img
            src={mode.hero_image}
            alt={mode.hero_image_alt}
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/30 to-ink/80" />

          <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-6 md:px-16 max-w-7xl mx-auto">
            <FadeIn direction="none">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-bone/50 mb-5">
                <Link href="/#modos" className="hover:text-violet transition-colors">
                  Modos
                </Link>
                {" · "}
                <span className="text-bone/30">{mode.name}</span>
              </p>
            </FadeIn>
            <FadeIn>
              <h1
                className="font-serif text-bone text-balance leading-tight tracking-tight mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
              >
                {mode.name}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-sans font-light text-bone/70 text-lg max-w-xl leading-relaxed">
                {mode.tagline}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Opening poem */}
        <section className="bg-bone py-24 md:py-32 px-6 md:px-16">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <p
                className="font-serif text-ink text-balance leading-relaxed italic"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)" }}
              >
                &ldquo;{mode.opening_poem}&rdquo;
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Products lookbook */}
        <section className="bg-bone pb-24 md:pb-36 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16">
              <div className="w-12 h-px bg-violet mb-8" />
              <h2
                className="font-serif text-ink tracking-tight"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                Los looks
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
              {(mode.products ?? []).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Continue watching */}
        {otherModes.length > 0 && (
          <section className="bg-fog py-24 md:py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              <FadeIn className="mb-12">
                <p className="font-serif text-ink/50 italic text-lg">Continúa la función →</p>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {otherModes.map((otherMode, index) => (
                  <ModeCard key={otherMode.slug} mode={otherMode} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
