"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { featuredProducts, FeaturedTab, FeaturedProduct, SaleProduct } from "@/lib/featured";
import { formatPrice } from "@/lib/modes";

const TABS: { id: FeaturedTab; label: string }[] = [
  { id: "new", label: "NEW IN" },
  { id: "bestseller", label: "LO MÁS VENDIDO" },
  { id: "sale", label: "REBAJAS" },
];

export default function FavoritesSection() {
  const [activeTab, setActiveTab] = useState<FeaturedTab>("new");
  const products = (featuredProducts[activeTab] as (FeaturedProduct | SaleProduct)[]).slice(0, 8);

  return (
    <section className="bg-bone py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#C1622F">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-ink/40">
              MIS FAVORITOS
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-8">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-sans text-xs tracking-[0.2em] uppercase pb-1 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "text-terracota border-b border-terracota font-medium"
                    : "text-ink/40 hover:text-ink/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10"
        >
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Imagen */}
              <div className="relative overflow-hidden aspect-[3/4] bg-fog mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.04]"
                  loading="lazy"
                />
                {activeTab === "sale" && (
                  <span className="absolute top-3 left-3 bg-terracota text-bone font-sans text-[10px] tracking-widest uppercase px-2 py-1">
                    REBAJA
                  </span>
                )}
              </div>
              {/* Info */}
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-ink/40 mb-1">
                  {product.modeName}
                </p>
                <h3 className="font-serif text-ink text-sm leading-snug mb-2 line-clamp-2">
                  {product.name}
                </h3>
                {activeTab === "sale" ? (
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm text-terracota">
                      {formatPrice((product as SaleProduct).salePrice)}
                    </span>
                    <span className="font-sans text-xs text-ink/30 line-through">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                ) : (
                  <span className="font-sans text-sm text-terracota">
                    {formatPrice(product.price)}
                  </span>
                )}
                <a
                  href={`/modo/${product.modeSlug}`}
                  className="inline-block mt-3 font-sans text-[10px] tracking-[0.2em] uppercase text-terracota hover:text-terracota-dark transition-colors duration-300"
                >
                  Ver look →
                </a>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/#modos"
            className="inline-flex items-center gap-2 border border-terracota text-terracota font-sans text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-terracota hover:text-bone transition-all duration-300"
          >
            Ver toda la colección →
          </a>
        </div>
      </div>
    </section>
  );
}
