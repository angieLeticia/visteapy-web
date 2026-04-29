"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-bone/95 backdrop-blur-sm border-b border-fog" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-serif text-2xl font-bold tracking-tight text-ink">APY</span>
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-ink/60">
              visteapy
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/#modos"
              className="font-sans text-xs tracking-widest uppercase text-ink/70 hover:text-violet transition-colors duration-300"
            >
              Modos
            </Link>
            <Link
              href="/manifiesto"
              className="font-sans text-xs tracking-widest uppercase text-ink/70 hover:text-violet transition-colors duration-300"
            >
              Manifiesto
            </Link>
            <Link
              href="/contacto"
              className="font-sans text-xs tracking-widest uppercase text-ink/70 hover:text-violet transition-colors duration-300"
            >
              Contacto
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span
              className={`block w-6 h-px bg-ink transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-ink transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-ink transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bone flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { href: "/#modos", label: "Modos" },
              { href: "/manifiesto", label: "Manifiesto" },
              { href: "/contacto", label: "Contacto" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-4xl text-ink hover:text-violet transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
