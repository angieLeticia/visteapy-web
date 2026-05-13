"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  nombre: string | null;
  phone: string | null;
  avatar_url: string | null;
  marketing_consent: boolean;
}

interface WishlistItem {
  id: string;
  product_id: string;
  mode_slug: string;
  product_name: string | null;
  product_image: string | null;
  product_price: number | null;
  added_at: string;
}

interface Props {
  user: User;
  profile: Profile | null;
  wishlist: WishlistItem[];
}

export default function MiCuentaClient({ user, profile, wishlist: initialWishlist }: Props) {
  const supabase = createClient();

  const [nombre, setNombre] = useState(profile?.nombre ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [marketingConsent, setMarketingConsent] = useState(profile?.marketing_consent ?? false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initialWishlist);

  async function handleSavePerfil(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase
      .from("profiles")
      .update({
        nombre,
        phone,
        marketing_consent: marketingConsent,
        consent_date: marketingConsent ? new Date().toISOString() : null,
      })
      .eq("id", user.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handleRemoveWishlist(itemId: string) {
    await supabase.from("wishlist_items").delete().eq("id", itemId);
    setWishlist((prev) => prev.filter((i) => i.id !== itemId));
  }

  const displayName = nombre || user.email?.split("@")[0] || "Protagonista";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bone pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-5 mb-12">
            <div className="w-16 h-16 rounded-full bg-terracota/15 flex items-center justify-center flex-shrink-0">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={displayName} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="font-serif text-2xl text-terracota">{initials}</span>
              )}
            </div>
            <div>
              <h1 className="font-serif text-3xl text-ink">{displayName}</h1>
              <p className="font-sans text-xs text-ink/40 tracking-wide mt-1">{user.email}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* ── Perfil ── */}
            <div className="bg-white rounded-2xl border border-fog p-8">
              <p className="font-sans text-xs tracking-[0.25em] uppercase text-ink/40 mb-6">Mi perfil</p>
              <form onSubmit={handleSavePerfil} className="space-y-5">
                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-ink/50 mb-2">Nombre</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full border border-fog rounded-xl px-4 py-3 font-sans text-sm text-ink bg-bone focus:outline-none focus:border-ink/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-ink/50 mb-2">Teléfono (opcional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+57 300 000 0000"
                    className="w-full border border-fog rounded-xl px-4 py-3 font-sans text-sm text-ink bg-bone focus:outline-none focus:border-ink/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-ink/50 mb-2">Correo</label>
                  <p className="font-sans text-sm text-ink/40 px-4 py-3 border border-fog rounded-xl bg-fog/30">
                    {user.email}
                  </p>
                </div>

                {/* Preferencias de correo */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded accent-terracota"
                  />
                  <span className="font-sans text-xs text-ink/50 leading-relaxed group-hover:text-ink/70 transition-colors">
                    Quiero recibir correos con novedades y looks exclusivos
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-ink text-bone font-sans text-xs tracking-[0.18em] uppercase py-3.5 rounded-xl hover:bg-ink/80 transition-colors disabled:opacity-50"
                >
                  {saving ? "Guardando…" : saved ? "✓ Guardado" : "Guardar cambios"}
                </button>
              </form>
            </div>

            {/* ── Looks guardados ── */}
            <div className="bg-white rounded-2xl border border-fog p-8">
              <p className="font-sans text-xs tracking-[0.25em] uppercase text-ink/40 mb-6">
                Mis looks guardados
                {wishlist.length > 0 && (
                  <span className="ml-2 bg-terracota/10 text-terracota px-2 py-0.5 rounded-full text-[10px]">
                    {wishlist.length}
                  </span>
                )}
              </p>

              {wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-serif text-lg text-ink/30 italic mb-4">
                    Aún no has guardado ningún look
                  </p>
                  <Link
                    href="/#modos"
                    className="font-sans text-xs tracking-widest uppercase text-terracota hover:text-terracota-dark transition-colors"
                  >
                    Explorar universos →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center group">
                      {item.product_image && (
                        <Link href={`/modo/${item.mode_slug}`}>
                          <img
                            src={item.product_image}
                            alt={item.product_name ?? "Look"}
                            className="w-16 h-16 rounded-lg object-cover bg-fog flex-shrink-0 hover:opacity-80 transition-opacity"
                          />
                        </Link>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-sm text-ink truncate">
                          {item.product_name ?? "Look guardado"}
                        </p>
                        {item.product_price && (
                          <p className="font-sans text-xs text-ink/40 mt-0.5">
                            $ {item.product_price.toLocaleString("es-CO")} COP
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/modo/${item.mode_slug}`}
                          className="font-sans text-[10px] tracking-widest uppercase text-ink/50 hover:text-terracota transition-colors"
                        >
                          Ver →
                        </Link>
                        <button
                          onClick={() => handleRemoveWishlist(item.id)}
                          className="text-ink/30 hover:text-terracota transition-colors text-xs"
                          aria-label="Quitar de guardados"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Link de vuelta */}
          <div className="mt-10 text-center">
            <Link href="/" className="font-sans text-xs tracking-widest uppercase text-ink/30 hover:text-terracota transition-colors">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
