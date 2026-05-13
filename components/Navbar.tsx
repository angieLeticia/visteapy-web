"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { siteContent } from "@/lib/siteContent";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const router = useRouter();
  const supabase = createClient();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escucha cambios de sesión en tiempo real
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  const textColor = scrolled ? "text-ink" : "text-bone";
  const mutedColor = scrolled ? "text-ink/60" : "text-bone/60";
  const logoSubColor = scrolled ? "text-ink/50" : "text-bone/50";
  const hamburgerColor = scrolled ? "bg-ink" : "bg-bone";

  const navLinks = [
    { href: "/#modos", label: siteContent.nav.modos },
    { href: "/manifiesto", label: siteContent.nav.manifesto },
    { href: "/ia-fashion", label: siteContent.nav.ia },
    { href: "/contacto", label: siteContent.nav.contacto },
  ];

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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-xs tracking-widest uppercase ${mutedColor} hover:text-terracota transition-colors duration-300`}
              >
                {link.label}
              </Link>
            ))}

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-5">
                <Link
                  href="/mi-cuenta"
                  className={`font-sans text-xs tracking-widest uppercase ${mutedColor} hover:text-terracota transition-colors duration-300`}
                >
                  Mi cuenta
                </Link>
                <button
                  onClick={handleLogout}
                  className={`font-sans text-xs tracking-widest uppercase ${mutedColor} hover:text-terracota transition-colors duration-300`}
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className={`font-sans text-xs tracking-widest uppercase ${mutedColor} hover:text-terracota transition-colors duration-300`}
              >
                Iniciar sesión
              </Link>
            )}

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
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-serif text-4xl text-ink hover:text-terracota transition-colors duration-300 py-2"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Auth móvil */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + navLinks.length * 0.07 }}
              className="flex flex-col items-center gap-3 mt-4"
            >
              {user ? (
                <>
                  <Link href="/mi-cuenta" onClick={() => setMenuOpen(false)}
                    className="font-sans text-xs tracking-widest uppercase text-ink/60 hover:text-terracota transition-colors">
                    Mi cuenta
                  </Link>
                  <button onClick={handleLogout}
                    className="font-sans text-xs tracking-widest uppercase text-ink/40 hover:text-terracota transition-colors">
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link href="/auth/login" onClick={() => setMenuOpen(false)}
                  className="font-sans text-xs tracking-widest uppercase text-ink/60 hover:text-terracota transition-colors">
                  Iniciar sesión
                </Link>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="mt-4"
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
