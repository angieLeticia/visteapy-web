import FadeIn from "./ui/FadeIn";
import { siteContent } from "@/lib/siteContent";

const { howItWorks } = siteContent;

export default function HowItWorks() {
  return (
    <section className="bg-fog py-24 md:py-36 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-20 md:mb-28">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-ink/40 mb-4">
            {howItWorks.eyebrow}
          </p>
          <h2
            className="font-serif text-ink text-balance leading-tight tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            {howItWorks.headline}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {howItWorks.steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.15} direction="up">
              <div className="flex flex-col">
                <span
                  className="font-mono leading-none mb-6 select-none"
                  style={{
                    fontSize: "clamp(4rem, 8vw, 7rem)",
                    color: "#D8D3CC",
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </span>
                <div className="w-12 h-px bg-terracota mb-6" />
                <h3 className="font-serif text-ink text-2xl mb-4 tracking-tight">{step.title}</h3>
                <p className="font-sans font-light text-ink/60 text-base leading-[1.8]">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
