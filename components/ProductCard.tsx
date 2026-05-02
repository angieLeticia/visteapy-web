"use client";
import { useState } from "react";
import { Product, formatPrice } from "@/lib/db";
import WhatsAppButton from "./WhatsAppButton";
import FadeIn from "./ui/FadeIn";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

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
