import ModeCard from "./ModeCard";
import FadeIn from "./ui/FadeIn";
import { Mode } from "@/lib/db";

export default function ModesGrid({ modes }: { modes: Mode[] }) {
  const first = modes.slice(0, 3);
  const second = modes.slice(3, 5);
  const third = modes.slice(5);

  return (
    <section id="modos" className="bg-bone py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16 md:mb-24">
          <div className="flex items-start justify-between flex-wrap gap-8">
            <div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-ink/40 mb-4">
                Los universos
              </p>
              <h2
                className="font-serif text-ink text-balance leading-tight tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
              >
                ¿Cuál eres
                <br />
                <em className="text-ink/50">hoy?</em>
              </h2>
            </div>
            <p className="font-sans font-light text-ink/40 text-sm max-w-xs leading-[1.8] md:text-right self-end">
              Cada modo es una versión de ti.
              <br />
              Algunas las conoces. Otras, todavía no.
            </p>
          </div>
        </FadeIn>

        {/* Fila 1: 3 columnas */}
        {first.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
            {first.map((mode, index) => (
              <ModeCard key={mode.slug} mode={mode} index={index} />
            ))}
          </div>
        )}

        {/* Fila 2: 2 columnas anchas (60%/40% en desktop) */}
        {second.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6 lg:grid-cols-5">
            {second.map((mode, index) => (
              <div key={mode.slug} className={index === 0 ? "lg:col-span-3" : "lg:col-span-2"}>
                <ModeCard mode={mode} index={index + 3} />
              </div>
            ))}
          </div>
        )}

        {/* Fila 3: columnas restantes */}
        {third.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {third.map((mode, index) => (
              <ModeCard key={mode.slug} mode={mode} index={index + 5} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
