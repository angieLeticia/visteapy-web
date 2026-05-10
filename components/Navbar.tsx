"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/lib/siteContent";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = scrolled ? "text-ink" : "text-bone";
  const mutedColor = scrolled ? "text-ink/60" : "text-bone/60";
  const logoSubColor = scrolled ? "text-ink/50" : "text-bone/50";
  const hamburgerColor = scrolled ? "bg-ink" : "bg-bone";

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
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span className={`font-serif text-2xl font-bold tracking-tight ${textColor} transition-colors duration-300`}>
              APY
            </span>
            <span className={`font-sans text-[9px] tracking-[0.25em] uppercase ${logoSubColor} transition-colors duration-300`}>
              visteapy
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#modos"
              className={`font-sans text-xs tracking-widest uppercase ${mutedColor} hover:text-terracota transition-colors duration-300`}
            >
              {siteContent.nav.modos}
            </Link>
            <Link
              href="/manifiesto"
              className={`font-sans text-xs tracking-widest uppercase ${mutedColor} hover:text-terracota transition-colors duration-300`}
            >
              {siteContent.nav.manifesto}
            </Link>
            <Link
              href="/contacto"
              className={`font-sans text-xs tracking-widest uppercase ${mutedColor} hover:text-terracota transition-colors duration-300`}
            >
              {siteContent.nav.contacto}
            </Link>
            <Link
              href="/ia-fashion"
              className={`font-sans text-xs tracking-widest uppercase ${mutedColor} hover:text-terracota transition-colors duration-300`}
            >
              {siteContent.nav.ia}
            </Link>

            {/* CTA */}
            <Link
              href="/#modos"
              className="inline-flex items-center gap-1.5 bg-terracota text-bone font-sans text-[10px] tracking-[0.18em] uppercase px-4 py-2.5 hover:bg-terracota-dark transition-colors duration-300"
            >
              {siteContent.nav.cta}
            </Link>
          </div>

          {/* Mobile: CTA + hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <Link
              href="/#modos"
              className="font-sans text-[10px] tracking-widest uppercase text-terracota border border-terracota/40 px-3 py-2"
            >
              Ver looks
            </Link>
            <button
              className="flex flex-col gap-[5px] p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              <span className={`block w-6 h-[1.5px] ${hamburgerColor} transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block w-6 h-[1.5px] ${hamburgerColor} transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-[1.5px] ${hamburgerColor} transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bone flex flex-col items-center justify-center gap-2"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {[
              { href: "/#modos", label: siteContent.nav.modos },
              { href: "/manifiesto", label: siteContent.nav.manifesto },
              { href: "/contacto", label: siteContent.nav.contacto },
              { href: "/ia-fashion", label: siteContent.nav.ia },
            ].map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-serif text-5xl text-ink hover:text-terracota transition-colors duration-300 py-3"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-8"
            >
              <Link
                href="/#modos"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 bg-terracota text-bone font-sans text-xs tracking-[0.18em] uppercase px-8 py-4 hover:bg-terracota-dark transition-colors duration-300"
              >
                {siteContent.nav.cta}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
