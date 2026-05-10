import FadeIn from "./ui/FadeIn";

export default function InstagramFeed() {
  return (
    <section className="bg-bone py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16 flex items-end justify-between">
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

        {/* CTA card — se reemplaza por widget real cuando haya contenido */}
        <FadeIn>
          <a
            href="https://instagram.com/visteapy"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col md:flex-row items-center justify-between gap-8 border border-fog rounded-2xl px-10 py-12 hover:border-terracota-muted transition-colors duration-500"
          >
            <div className="text-center md:text-left">
              <p className="font-serif text-ink text-2xl md:text-3xl tracking-tight mb-3">
                Las escenas están llegando.
              </p>
              <p className="font-sans text-sm text-ink/50 leading-relaxed max-w-sm">
                Síguenos para ver los looks antes que nadie —
                inspiraciones, detrás de cámaras y las prendas recién llegadas.
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              {/* Instagram icon */}
              <div className="w-16 h-16 rounded-2xl bg-fog group-hover:bg-terracota-muted transition-colors duration-500 flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-ink/60 group-hover:text-terracota transition-colors duration-500"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <span className="font-sans text-xs tracking-widest uppercase text-ink/50 group-hover:text-terracota transition-colors duration-300">
                Seguir →
              </span>
            </div>
          </a>
        </FadeIn>

        <div className="mt-8 text-center md:hidden">
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
