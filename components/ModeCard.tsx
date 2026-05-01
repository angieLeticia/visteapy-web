"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mode, formatPrice } from "@/lib/db";

export default function ModeCard({ mode, index }: { mode: Mode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/modo/${mode.slug}`} className="block group relative overflow-hidden">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[3/4]">
          <img
            src={mode.hero_image}
            alt={mode.hero_image_alt}
            className="w-full h-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
            {/* Index */}
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-bone/40 mb-2">
              {String(index + 1).padStart(2, "0")}
            </p>

            {/* Name */}
            <h3
              className="font-serif text-bone leading-tight tracking-tight mb-1.5 text-balance"
              style={{ fontSize: "clamp(1.35rem, 2.5vw, 2rem)" }}
            >
              {mode.name}
            </h3>

            {/* Tagline — always visible, not just on hover */}
            <p className="font-sans font-light text-bone/60 text-xs leading-relaxed mb-4 line-clamp-2">
              {mode.tagline}
            </p>

            {/* Bottom row: price + CTA */}
            <div className="flex items-center justify-between gap-3">
              {mode.min_price ? (
                <p className="font-sans text-xs text-bone/50">
                  desde{" "}
                  <span className="text-bone/80 font-medium">
                    {formatPrice(mode.min_price)}
                  </span>
                </p>
              ) : (
                <span />
              )}

              {/* CTA — always visible */}
              <span className="flex-shrink-0 inline-flex items-center gap-1.5 bg-bone/15 backdrop-blur-sm border border-bone/25 group-hover:bg-violet group-hover:border-violet text-bone font-sans text-[10px] tracking-[0.18em] uppercase px-3.5 py-2 transition-all duration-300">
                Ver looks
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
              </span>
            </div>
          </div>
        </div>

        {/* Accent line */}
        <div className="h-px bg-violet w-0 group-hover:w-full transition-all duration-500" />
      </Link>
    </motion.div>
  );
}
