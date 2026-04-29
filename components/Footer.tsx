import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-bone py-16 md:py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 pb-16 border-b border-bone/10">
          <div>
            <div className="flex flex-col leading-none mb-4">
              <span className="font-serif text-3xl font-bold tracking-tight">APY</span>
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-bone/40">
                visteapy
              </span>
            </div>
            <p className="font-sans font-light text-bone/50 text-sm max-w-xs leading-relaxed mt-4">
              La película empieza cuando te la pones.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-4">
            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com/visteapy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs tracking-widest uppercase text-bone/50 hover:text-violet transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com/@visteapy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs tracking-widest uppercase text-bone/50 hover:text-violet transition-colors duration-300"
              >
                TikTok
              </a>
              <Link
                href="/contacto"
                className="font-sans text-xs tracking-widest uppercase text-bone/50 hover:text-violet transition-colors duration-300"
              >
                Contacto
              </Link>
            </div>
            <a
              href="mailto:hola@visteapy.com"
              className="font-sans text-xs text-bone/30 hover:text-bone/60 transition-colors duration-300"
            >
              hola@visteapy.com
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-sans text-[11px] text-bone/30">
            © 2026 Visteapy · Bogotá, Colombia
          </p>
          <p className="font-sans text-[11px] text-bone/20 italic">
            Para las que viven como protagonistas.
          </p>
        </div>
      </div>
    </footer>
  );
}
