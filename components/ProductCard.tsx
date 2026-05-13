"use client";
import { useState, useEffect } from "react";
import { Product, formatPrice } from "@/lib/db";
import WhatsAppButton from "./WhatsAppButton";
import FadeIn from "./ui/FadeIn";
import { createClient } from "@/utils/supabase/client";

export default function ProductCard({ product, index, modeSlug }: { product: Product; index: number; modeSlug: string }) {
  const supabase = createClient();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [savingWishlist, setSavingWishlist] = useState(false);

  // Verificar si ya está guardado al montar
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: item } = await supabase
        .from("wishlist_items")
        .select("id")
        .eq("user_id", data.user.id)
        .eq("product_id", product.id)
        .maybeSingle();
      setSaved(!!item);
    });
  }, [product.id]);

  async function handleWishlist() {
    setSavingWishlist(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // No autenticada: redirige al login
      window.location.href = "/auth/login";
      return;
    }

    if (saved) {
      // Quitar de wishlist
      await supabase
        .from("wishlist_items")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", product.id);
      setSaved(false);
    } else {
      // Agregar a wishlist
      await supabase.from("wishlist_items").insert({
        user_id: user.id,
        product_id: product.id,
        mode_slug: modeSlug,
        product_name: product.name,
        product_image: product.image,
        product_price: product.price,
      });
      setSaved(true);
    }
    setSavingWishlist(false);
  }

  const isSoldOut = (size: string) => product.sold_out_sizes?.includes(size) ?? false;

  return (
    <FadeIn delay={index * 0.1}>
      <article className="group">
        <div className="relative overflow-hidden bg-fog mb-5" style={{ aspectRatio: "4/5" }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />

          {/* Botón guardar look */}
          <button
            onClick={handleWishlist}
            disabled={savingWishlist}
            title={saved ? "Quitar de guardados" : "Guardar look"}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              saved
                ? "bg-terracota text-bone"
                : "bg-bone/80 backdrop-blur-sm text-ink/60 opacity-0 group-hover:opacity-100"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        <div className="px-1">
          <h3 className="font-serif text-ink text-lg md:text-xl leading-snug tracking-tight mb-2 text-balance">
            {product.name}
          </h3>

          {product.reference && (
            <p className="font-sans text-xs text-ink/40 italic mb-3 leading-relaxed">
              {product.reference}
            </p>
          )}

          <p className="font-sans font-light text-ink/60 text-sm leading-relaxed mb-4">
            {product.description}
          </p>

          <p className="font-mono text-ink text-base tracking-tight mb-5">{formatPrice(product.price)}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {product.sizes.map((size) => {
              const sold = isSoldOut(size);
              const active = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => !sold && setSelectedSize(active ? null : size)}
                  disabled={sold}
                  className={`font-sans text-xs w-10 h-10 border transition-all duration-200 ${
                    sold
                      ? "border-fog text-ink/25 line-through cursor-not-allowed"
                      : active
                        ? "border-terracota bg-terracota text-bone"
                        : "border-fog text-ink/70 hover:border-ink"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>

          <WhatsAppButton
            lookName={product.name}
            size={selectedSize ?? undefined}
            className="w-full"
          />
        </div>
      </article>
    </FadeIn>
  );
}
