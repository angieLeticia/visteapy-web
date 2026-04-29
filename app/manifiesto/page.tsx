import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Manifiesto — Visteapy",
  description: "No te vistes. Te conviertes. El manifiesto de Visteapy.",
};

export default function ManifestoPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bone min-h-screen">
        <div className="max-w-2xl mx-auto px-6 pt-40 pb-32">
          <FadeIn direction="none" className="mb-20">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-ink/40">Manifiesto</p>
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

          <div className="space-y-8 font-sans font-light text-ink/70 text-lg leading-[1.9]">
            <FadeIn delay={0.1}>
              <p>
                Hubo una escena que te cambió. Una protagonista que llevaba algo que no podías
                describir con palabras pero que sentías como tuyo. No era la ropa. Era lo que la
                ropa decía sin hablar.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p>
                Visteapy nació de esa idea: que hay personajes que nos resuenan no porque queramos
                ser ellos, sino porque ya somos algo de ellos. Y que la ropa es el puente más
                rápido entre quién eres y quién sabes que puedes ser.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p>
                Cada modo es un universo. Una propuesta estética completa que tiene su propia luz,
                su propio ritmo, su propio silencio. No vendemos prendas sueltas — vendemos la
                coherencia de una escena entera.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p>
                No estamos en el negocio de las tendencias rápidas. Estamos en el negocio de los
                momentos que se recuerdan: la primera vez que entraste a un lugar y sentiste que
                todas las miradas se detuvieron. La foto que guardas como favorita. El día que te
                pusiste algo y pensaste: <em>hoy sí soy yo.</em>
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p>
                Somos colombianas. Sabemos que la elegancia no tiene que ser cara para ser
                verdadera. Sabemos que el estilo es accesible si alguien te ayuda a encontrar el
                tuyo.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="font-serif text-ink text-2xl italic leading-snug pt-8">
                &ldquo;La película empieza cuando te la pones.&rdquo;
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="pt-4 text-ink/50 text-base">
                Para las que viven como protagonistas.
              </p>
            </FadeIn>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
