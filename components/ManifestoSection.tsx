"use client";
import { motion } from "framer-motion";
import FadeIn from "./ui/FadeIn";

export default function ManifestoSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-ink overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=40&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-16 py-32 text-center">
        <FadeIn direction="none">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-bone/40 mb-16">
            Manifiesto
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <blockquote
            className="font-serif text-bone text-balance leading-tight tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            No te vistes.
            <br />
            <em className="text-bone/70">Te conviertes.</em>
          </blockquote>
        </FadeIn>

        <FadeIn delay={0.3} className="mt-16 max-w-xl mx-auto">
          <p className="font-sans font-light text-bone/60 text-lg leading-[1.8]">
            La ropa es el primer capítulo de tu historia.
            <br />
            Cada outfit es una decisión sobre quién eres hoy.
          </p>
        </FadeIn>

        <FadeIn delay={0.45} className="mt-10 max-w-sm mx-auto">
          <p className="font-sans font-light text-bone/35 text-sm leading-[1.8] italic">
            No vendemos ropa. Vendemos la versión de ti
            que ya sabías que existía.
          </p>
        </FadeIn>

        <FadeIn delay={0.6} className="mt-16">
          <motion.a
            href="/manifiesto"
            className="font-sans text-xs tracking-[0.25em] uppercase text-bone/50 hover:text-terracota transition-colors duration-300 border-b border-bone/20 pb-1"
            whileHover={{ borderColor: "#C1622F" }}
            data-cursor-label="Leer"
          >
            Leer el manifiesto completo →
          </motion.a>
        </FadeIn>
      </div>
    </section>
  );
}
