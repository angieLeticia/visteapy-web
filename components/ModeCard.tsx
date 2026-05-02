"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mode, formatPrice } from "@/lib/db";
import { modeIdentities } from "@/lib/modeIdentities";

export default function ModeCard({ mode, index }: { mode: Mode; index: number }) {
  const identity = modeIdentities[mode.slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={`/modo/${mode.slug}`}
        className="block group relative overflow-hidden"
        data-cursor-label="Ver look"
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[3/4]">
          <img
            src={mode.hero_image}
            alt={mode.hero_image_alt}
            className="w-full h-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
            {/* Index + descriptor */}
            <div className="flex items-center gap-3 mb-3">
              <p className="font-mono text-[10px] tracking-[0.2em] text-bone/40">
                {identity?.number ?? String(index + 1).padStart(2, "0")}
              </p>
              {identity?.descriptor && (
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-bone/30 truncate">
                  {identity.descriptor}
                </p>
              )}
            </div>

            {/* Name */}
            <h3
              className="font-serif text-bone leading-tight tracking-tight mb-2 text-balance"
              style={{ fontSize: "clamp(1.35rem, 2.5vw, 2rem)" }}
            >
              {mode.name}
            </h3>

            {/* Question retórica — aparece solo en hover */}
            {identity?.question && (
              <p className="font-sans font-light text-bone/0 group-hover:text-bone/50 text-[11px] leading-relaxed mb-3 line-clamp-2 transition-colors duration-400 italic">
                {identity.question}
              </p>
            )}

            {/* Tagline — visible siempre */}
            <p className="font-sans font-light text-bone/55 text-xs leading-relaxed mb-4 line-clamp-2">
              {mode.tagline}
            </p>

            {/* Bottom row */}
            <div className="flex items-center justify-between gap-3">
              {mode.min_price ? (
                <p className="font-mono text-xs text-bone/45">
                  desde{" "}
                  <span className="text-bone/75">
                    {formatPrice(mode.min_price)}
                  </span>
                </p>
              ) : (
                <span />
              )}

              <span className="flex-shrink-0 inline-flex items-center gap-1.5 bg-bone/10 backdrop-blur-sm border border-bone/20 group-hover:bg-terracota group-hover:border-terracota text-bone font-sans text-[10px] tracking-[0.18em] uppercase px-3.5 py-2 transition-all duration-300">
                Ver looks
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
              </span>
            </div>
          </div>
        </div>

        {/* Accent line — color por identidad de modo */}
        <div
          className="h-px w-0 group-hover:w-full transition-all duration-500"
          style={{ backgroundColor: identity?.accent ?? "#C1622F" }}
        />
      </Link>
    </motion.div>
  );
}
