// TODO: integrar con Instagram Graph API o widget tipo SnapWidget
import FadeIn from "./ui/FadeIn";

const mockImages = [
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80&fit=crop",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80&fit=crop",
  "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80&fit=crop",
  "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&q=80&fit=crop",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80&fit=crop",
  "https://images.unsplash.com/photo-1548624313-0396a39b47fa?w=400&q=80&fit=crop",
  "https://images.unsplash.com/photo-1520012218364-3dbe62c99bee?w=400&q=80&fit=crop",
  "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80&fit=crop",
  "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80&fit=crop",
];

export default function InstagramFeed() {
  return (
    <section className="bg-bone py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12 flex items-end justify-between">
          <div>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-ink/40 mb-3">
              Instagram
            </p>
            <h2 className="font-serif text-ink text-3xl md:text-4xl tracking-tight">
              @visteapy
            </h2>
          </div>
          <a
            href="https://instagram.com/visteapy"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-ink/50 hover:text-terracota transition-colors duration-300"
          >
            Seguir <span>→</span>
          </a>
        </FadeIn>

        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {mockImages.map((src, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="aspect-square overflow-hidden bg-fog group">
                <img
                  src={src}
                  alt={`Visteapy Instagram ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <a
            href="https://instagram.com/visteapy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs tracking-widest uppercase text-ink/50 hover:text-terracota transition-colors"
          >
            Seguir en Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}
