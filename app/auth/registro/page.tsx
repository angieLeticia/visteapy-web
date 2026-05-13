"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function RegistroPage() {
  const supabase = createClient();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleRegistro(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          full_name: nombre,
          marketing_consent: marketingConsent,
          consent_date: marketingConsent ? new Date().toISOString() : null,
        },
      },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        setError("Ya existe una cuenta con ese correo. ¿Quieres iniciar sesión?");
      } else {
        setError(error.message);
      }
      setLoading(false);
      return;
    }

    // Correo de bienvenida — fire-and-forget, no bloquea el flujo
    fetch("/api/email/bienvenida", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nombre }),
    }).catch(() => {/* silencioso — el correo es opcional */});

    setSuccess(true);
    setLoading(false);
  }

  async function handleGoogle() {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  }

  if (success) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-terracota/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-terracota text-2xl">✓</span>
          </div>
          <h2 className="font-serif text-2xl text-ink mb-3">Revisa tu correo</h2>
          <p className="font-sans text-sm text-ink/50 leading-relaxed mb-8">
            Te enviamos un enlace de confirmación a <strong>{email}</strong>.
            Haz clic en él para activar tu cuenta.
          </p>
          <Link
            href="/auth/login"
            className="font-sans text-xs tracking-widest uppercase text-ink/50 hover:text-terracota transition-colors"
          >
            Volver al inicio de sesión →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center">
            <span className="font-serif text-3xl font-bold tracking-tight text-ink">APY</span>
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-ink/40">visteapy</span>
          </Link>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink/40 mt-6">
            Crear cuenta
          </p>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-fog rounded-xl py-3.5 font-sans text-sm text-ink/70 hover:border-ink/30 hover:text-ink transition-colors duration-300 mb-6"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Registrarme con Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-fog" />
          <span className="font-sans text-xs text-ink/30">o</span>
          <div className="flex-1 h-px bg-fog" />
        </div>

        <form onSubmit={handleRegistro} className="space-y-4">
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-ink/50 mb-2">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Tu nombre"
              className="w-full border border-fog rounded-xl px-4 py-3.5 font-sans text-sm text-ink bg-bone focus:outline-none focus:border-ink/30 transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-ink/50 mb-2">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@correo.com"
              className="w-full border border-fog rounded-xl px-4 py-3.5 font-sans text-sm text-ink bg-bone focus:outline-none focus:border-ink/30 transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-ink/50 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Mínimo 8 caracteres"
              className="w-full border border-fog rounded-xl px-4 py-3.5 font-sans text-sm text-ink bg-bone focus:outline-none focus:border-ink/30 transition-colors"
            />
          </div>

          {/* Consentimiento de marketing — RGPD */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded accent-terracota cursor-pointer"
            />
            <span className="font-sans text-xs text-ink/50 leading-relaxed group-hover:text-ink/70 transition-colors">
              Acepto recibir correos con novedades, looks y ofertas exclusivas de Visteapy.
              Puedes darte de baja en cualquier momento.
            </span>
          </label>

          {/* Términos */}
          <p className="font-sans text-xs text-ink/40 leading-relaxed">
            Al registrarte aceptas nuestra{" "}
            <Link href="/politica-privacidad" className="underline hover:text-terracota transition-colors">
              Política de Privacidad
            </Link>{" "}
            y{" "}
            <Link href="/terminos" className="underline hover:text-terracota transition-colors">
              Términos y Condiciones
            </Link>.
          </p>

          {error && (
            <p className="font-sans text-xs text-terracota bg-terracota/8 rounded-lg px-4 py-3">
              {error}{" "}
              {error.includes("correo") && (
                <Link href="/auth/login" className="underline">Iniciar sesión</Link>
              )}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-bone font-sans text-xs tracking-[0.18em] uppercase py-4 rounded-xl hover:bg-ink/80 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Creando cuenta…" : "Crear mi cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center font-sans text-xs text-ink/40">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="hover:text-terracota transition-colors">
            Iniciar sesión →
          </Link>
        </p>
      </div>
    </div>
  );
}
