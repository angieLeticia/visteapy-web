import FadeIn from "./ui/FadeIn";

const steps = [
  {
    number: "01",
    title: "Eliges tu look",
    description: "Explora los modos película. Encuentra el universo que te habla hoy.",
  },
  {
    number: "02",
    title: "Nos escribes por WhatsApp",
    description: "Un mensaje es todo lo que separa entre tú y tu outfit favorito.",
  },
  {
    number: "03",
    title: "Te llega a casa",
    description: "Nosotras nos encargamos del resto. Tú solo tienes que convertirte.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-fog py-24 md:py-36 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-20 md:mb-28">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-ink/40 mb-4">
            El proceso
          </p>
          <h2
            className="font-serif text-ink text-balance leading-tight tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Tan fácil como
            <br />
            <em>vivir tu película</em>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.15} direction="up">
              <div className="flex flex-col">
                <span
                  className="font-serif text-fog-dark leading-none mb-6 select-none"
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
