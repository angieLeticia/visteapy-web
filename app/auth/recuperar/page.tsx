"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function RecuperarPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRecuperar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback?next=/mi-cuenta/cambiar-password`,
    });

    if (error) {
      setError("No pudimos enviar el correo. Intenta nuevamente.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-bone flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center">
            <span className="font-serif text-3xl font-bold tracking-tight text-ink">APY</span>
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-ink/40">visteapy</span>
          </Link>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink/40 mt-6">
            Recuperar contraseña
          </p>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-terracota/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-terracota text-2xl">✉</span>
            </div>
            <h2 className="font-serif text-2xl text-ink mb-3">Correo enviado</h2>
            <p className="font-sans text-sm text-ink/50 leading-relaxed mb-8">
              Revisa tu bandeja de entrada en <strong>{email}</strong>.
              El enlace expira en 24 horas.
            </p>
            <Link
              href="/auth/login"
              className="font-sans text-xs tracking-widest uppercase text-ink/50 hover:text-terracota transition-colors"
            >
              Volver al inicio de sesión →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleRecuperar} className="space-y-4">
            <p className="font-sans text-sm text-ink/50 text-center mb-6 leading-relaxed">
              Escribe tu correo y te enviamos un enlace para restablecer tu contraseña.
            </p>

            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-ink/50 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@correo.com"
                className="w-full border border-fog rounded-xl px-4 py-3.5 font-sans text-sm text-ink bg-bone focus:outline-none focus:border-ink/30 transition-colors"
              />
            </div>

            {error && (
              <p className="font-sans text-xs text-terracota bg-terracota/8 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink text-bone font-sans text-xs tracking-[0.18em] uppercase py-4 rounded-xl hover:bg-ink/80 transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Enviando…" : "Enviar enlace"}
            </button>

            <div className="text-center">
              <Link href="/auth/login" className="font-sans text-xs text-ink/40 hover:text-terracota transition-colors">
                ← Volver al inicio de sesión
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
