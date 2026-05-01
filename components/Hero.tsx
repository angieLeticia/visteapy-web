"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Mode, formatPrice } from "@/lib/db";

interface HeroProps {
  modes: Mode[];
}

export default function Hero({ modes }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const previewModes = modes.slice(0, 3);

  return (
    <section ref={ref} className="relative h-screen min-h-[640px] overflow-hidden bg-ink">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        {/* TODO: reemplazar con imagen generada por IA: "cinematic editorial fashion hero, woman in elegant outfit, dramatic lighting, film grain, dark moody atmosphere, 16:9" */}
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80&fit=crop&crop=center"
          alt="Visteapy — moda cinemática"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/80" />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-between pt-20 md:pt-32 pb-0 px-6 md:px-16 max-w-7xl mx-auto"
        style={{ y: textY }}
      >
        {/* Top: headline + CTA */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <motion.p
            className="font-sans text-xs tracking-[0.3em] uppercase text-bone/50 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Bogotá, Colombia
          </motion.p>

          <motion.h1
            className="font-serif text-balance text-bone leading-[1.02] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            La ropa de
            <br />
            <em>las protagonistas.</em>
          </motion.h1>

          <motion.p
            className="font-sans font-light text-bone/65 text-base md:text-lg max-w-sm mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Para las que lo son.
          </motion.p>

          <motion.div
            className="flex items-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="#modos"
              className="inline-flex items-center gap-2 bg-violet text-bone font-sans text-xs tracking-[0.18em] uppercase px-7 py-3.5 hover:bg-violet-dark transition-colors duration-300"
            >
              Ver los looks
              <span>→</span>
            </a>
            <a
              href="/manifiesto"
              className="font-sans text-xs tracking-[0.18em] uppercase text-bone/50 hover:text-bone transition-colors duration-300 border-b border-bone/20 pb-0.5"
            >
              Nuestra historia
            </a>
          </motion.div>
        </div>

        {/* Bottom: mode preview strip */}
        {previewModes.length > 0 && (
          <motion.div
            className="relative z-10 pb-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
          >
            {/* Label */}
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-bone/40 mb-3 hidden md:block">
              Modos disponibles
            </p>

            {/* Cards strip — horizontally scrollable on mobile */}
            <div className="flex gap-3 overflow-x-auto pb-6 md:pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
              style={{ touchAction: "pan-x" }}
            >
              {previewModes.map((mode, i) => (
                <Link
                  key={mode.slug}
                  href={`/modo/${mode.slug}`}
                  className="group flex-shrink-0 snap-start w-[72vw] md:w-auto md:flex-1 flex items-center gap-3 bg-bone/10 backdrop-blur-sm border border-bone/15 hover:border-violet/60 hover:bg-bone/15 transition-all duration-300 p-3"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 overflow-hidden">
                    <img
                      src={`${mode.hero_image.split("?")[0]}?w=120&q=70&fit=crop`}
                      alt={mode.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[10px] tracking-widest uppercase text-bone/40 mb-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="font-serif text-bone text-sm leading-tight truncate">
                      {mode.name.replace("Modo ", "")}
                    </p>
                    {mode.min_price && (
                      <p className="font-sans text-[11px] text-bone/50 mt-0.5">
                        desde {formatPrice(mode.min_price)}
                      </p>
                    )}
                  </div>
                  <span className="text-bone/30 group-hover:text-violet group-hover:translate-x-0.5 transition-all duration-300 text-sm flex-shrink-0">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
