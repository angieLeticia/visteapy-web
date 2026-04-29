"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mode } from "@/lib/db";

export default function ModeCard({ mode, index }: { mode: Mode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/modo/${mode.slug}`} className="block group relative overflow-hidden">
        <div className="relative overflow-hidden aspect-[3/4]">
          <img
            src={mode.hero_image}
            alt={mode.hero_image_alt}
            className="w-full h-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent transition-opacity duration-500 group-hover:from-ink/85" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-bone/50 mb-3">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3
              className="font-serif text-bone leading-tight tracking-tight mb-3 text-balance"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              {mode.name}
            </h3>
            <p className="font-sans font-light text-bone/70 text-sm leading-relaxed mb-6 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              {mode.tagline}
            </p>
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-bone/60 flex items-center gap-2 group-hover:text-violet transition-colors duration-300">
              Ver looks
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
        <div className="h-px bg-fog w-0 group-hover:w-full transition-all duration-500" />
      </Link>
    </motion.div>
  );
}
