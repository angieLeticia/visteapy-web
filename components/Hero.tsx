"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] overflow-hidden bg-ink">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        {/* TODO: reemplazar con imagen generada por IA: "cinematic editorial fashion hero, woman in elegant outfit, dramatic lighting, film grain, dark moody atmosphere, 16:9" */}
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80&fit=crop&crop=center"
          alt="Visteapy — moda cinemática"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/20 to-ink/60" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 md:px-16 max-w-7xl mx-auto"
        style={{ y: textY }}
      >
        <motion.p
          className="font-sans text-xs tracking-[0.3em] uppercase text-bone/60 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Bogotá, Colombia
        </motion.p>

        <motion.h1
          className="font-serif text-balance text-bone leading-[1.02] tracking-tight mb-8"
          style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Vístete como
          <br />
          <em>tu película favorita</em>
        </motion.h1>

        <motion.p
          className="font-sans font-light text-bone/75 text-lg md:text-xl max-w-lg mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Cada prenda, una escena. Cada outfit, una historia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <a
            href="#modos"
            className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase text-bone border-b border-bone/40 pb-1 hover:border-violet hover:text-violet transition-all duration-300 group"
          >
            Explorar los modos
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-bone/40 rotate-90 origin-center">
          scroll
        </span>
        <div className="w-px h-12 bg-bone/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-bone/60"
            animate={{ height: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
