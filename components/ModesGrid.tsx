import ModeCard from "./ModeCard";
import FadeIn from "./ui/FadeIn";
import { Mode } from "@/lib/db";

export default function ModesGrid({ modes }: { modes: Mode[] }) {
  return (
    <section id="modos" className="bg-bone py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16 md:mb-24">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-ink/40 mb-4">
            Colección
          </p>
          <h2
            className="font-serif text-ink text-balance leading-tight tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            Los modos
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {modes.slice(0, 3).map((mode, index) => (
            <ModeCard key={mode.slug} mode={mode} index={index} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6 lg:max-w-[66.66%]">
          {modes.slice(3).map((mode, index) => (
            <ModeCard key={mode.slug} mode={mode} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
