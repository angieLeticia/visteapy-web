import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Maneja el callback de OAuth (Google, etc.) y el magic link
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/mi-cuenta";

  if (code) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      // Si es un usuario nuevo (OAuth), enviar correo de bienvenida
      const isNew = data.user.created_at === data.user.updated_at ||
        (new Date().getTime() - new Date(data.user.created_at).getTime()) < 30_000;

      if (isNew && data.user.email) {
        const nombre = data.user.user_metadata?.full_name ?? data.user.user_metadata?.name ?? "";
        fetch(`${origin}/api/email/bienvenida`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.user.email, nombre }),
        }).catch(() => {/* silencioso */});
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Si algo falla, redirige al login con error
  return NextResponse.redirect(`${origin}/auth/login?error=auth`);
}
