# Prompt Claude Code — Visteapy: 3 cambios pendientes

Stack: Next.js App Router + TypeScript + Tailwind + Framer Motion + Supabase.
Los colores ya fueron actualizados: `terracota` reemplaza a `violet` en todo el proyecto.
NO toques ningún archivo que no esté mencionado aquí.

---

## CAMBIO 1 — Sección "Mis Favoritos" en el homepage

### Paso 1: Crear `lib/featured.ts`

Los productos en Supabase no tienen campo "tag". Crea este archivo con listas curadas a mano usando los IDs del mock de `lib/modes.ts`:

```typescript
// lib/featured.ts
import { modes } from "./modes";

export type FeaturedTab = "new" | "bestseller" | "sale";

const allProducts = modes.flatMap((m) =>
  m.products.map((p) => ({ ...p, modeName: m.name, modeSlug: m.slug }))
);

export const featuredProducts: Record<FeaturedTab, typeof allProducts> = {
  new: [
    allProducts.find((p) => p.id === "re-001")!,
    allProducts.find((p) => p.id === "sa-005")!,
    allProducts.find((p) => p.id === "ri-003")!,
    allProducts.find((p) => p.id === "ro-005")!,
    allProducts.find((p) => p.id === "ma-002")!,
    allProducts.find((p) => p.id === "re-005")!,
    allProducts.find((p) => p.id === "sa-001")!,
    allProducts.find((p) => p.id === "ri-004")!,
  ].filter(Boolean),
  bestseller: [
    allProducts.find((p) => p.id === "ma-005")!,
    allProducts.find((p) => p.id === "ri-001")!,
    allProducts.find((p) => p.id === "sa-002")!,
    allProducts.find((p) => p.id === "ro-001")!,
    allProducts.find((p) => p.id === "re-003")!,
    allProducts.find((p) => p.id === "ma-001")!,
    allProducts.find((p) => p.id === "ri-005")!,
    allProducts.find((p) => p.id === "sa-004")!,
  ].filter(Boolean),
  sale: [
    { ...allProducts.find((p) => p.id === "ma-003")!, salePrice: 75000 },
    { ...allProducts.find((p) => p.id === "re-002")!, salePrice: 155000 },
    { ...allProducts.find((p) => p.id === "ri-002")!, salePrice: 89000 },
    { ...allProducts.find((p) => p.id === "ro-003")!, salePrice: 125000 },
    { ...allProducts.find((p) => p.id === "sa-003")!, salePrice: 129000 },
    { ...allProducts.find((p) => p.id === "ma-004")!, salePrice: 109000 },
  ].filter(Boolean) as any,
};
```

### Paso 2: Crear `components/FavoritesSection.tsx`

Componente cliente con `useState` para el tab activo. Diseño:

**Header de la sección:**
- Fondo: `bg-bone`
- Padding: `py-20 md:py-28 px-6 md:px-12`
- Eyebrow: corazón SVG pequeño + texto "MIS FAVORITOS" en `font-sans text-xs tracking-[0.3em] uppercase text-ink/40`
- Tabs debajo: tres botones — "NEW IN" | "LO MÁS VENDIDO" | "REBAJAS"
  - Tab activo: `text-terracota border-b border-terracota pb-1 font-medium`
  - Tab inactivo: `text-ink/40 pb-1`
  - Font: `font-sans text-xs tracking-[0.2em] uppercase`
  - Gap entre tabs: `gap-8`
  - "NEW IN" activo por defecto

**Grid de productos:**
- `grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 mt-10`
- Muestra los 8 primeros productos del tab activo (4 en mobile con scroll, 8 en desktop)
- Animación al cambiar tab: `key={activeTab}` en el grid + `initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}`

**Cada product card en este componente (NO usar el ProductCard existente — ese es para la página de modo):**

```tsx
<div className="group cursor-pointer">
  {/* Imagen */}
  <div className="relative overflow-hidden aspect-[3/4] bg-fog mb-4">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.04]"
      loading="lazy"
    />
    {/* Badge SALE */}
    {tab === "sale" && (
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
    {/* Precio */}
    {tab === "sale" ? (
      <div className="flex items-center gap-2">
        <span className="font-sans text-sm text-terracota">
          {formatPrice(product.salePrice)}
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
    {/* CTA siempre visible */}
    <a
      href={`/modo/${product.modeSlug}`}
      className="inline-block mt-3 font-sans text-[10px] tracking-[0.2em] uppercase text-terracota hover:text-terracota-dark transition-colors duration-300"
    >
      Ver look →
    </a>
  </div>
</div>
```

Importa `formatPrice` desde `@/lib/modes`.

**CTA al final de la sección:**
```tsx
<div className="mt-12 text-center">
  <a
    href="/#modos"
    className="inline-flex items-center gap-2 border border-terracota text-terracota font-sans text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-terracota hover:text-bone transition-all duration-300"
  >
    Ver toda la colección →
  </a>
</div>
```

### Paso 3: Agregar al homepage

En `app/page.tsx`, importa `FavoritesSection` y agrégala **entre Hero y ManifestoSection**:

```tsx
<Hero modes={modes} />
<FavoritesSection />   {/* ← NUEVA */}
<ManifestoSection />
```

---

## CAMBIO 2 — Dos modos nuevos en `lib/modes.ts`

Agrega estos dos modos al array `modes` al final del archivo, antes del cierre del array. Cada uno con 5 productos:

### Modo Francesa Casual (slug: `francesa-casual`)
```typescript
{
  slug: "francesa-casual",
  name: "Modo Francesa Casual",
  tagline: "El estilo que nunca intenta demasiado.",
  openingPoem: "Cafés de esquina, libros a medio leer, el arte de parecer que no te esforzaste. París no es un lugar — es una forma de moverse.",
  palette: ["#C8B99A", "#F2EDE4", "#4A4035", "#D4956A"],
  heroImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&q=80&fit=crop",
  heroImageAlt: "Look casual parisino con luz de mañana",
  products: [
    {
      id: "fc-001",
      name: "Look Café · Rayas Marineras",
      description: "Top de rayas finas azul marino y blanco, cuello bote, fit relajado.",
      price: 129000,
      sizes: ["XS", "S", "M", "L"],
      soldOutSizes: [],
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80&fit=crop",
      reference: "Para las mañanas que se convierten en paseos sin plan",
    },
    {
      id: "fc-002",
      name: "Look Librería · Pantalón Cigarette",
      description: "Pantalón cigarette talle alto en negro, corte impecable, tobillo visible.",
      price: 175000,
      sizes: ["XS", "S", "M", "L"],
      soldOutSizes: ["XS"],
      image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80&fit=crop",
      reference: "La pieza que hace que todo lo demás funcione",
    },
    {
      id: "fc-003",
      name: "Look Boulangerie · Blusa Popelín",
      description: "Blusa en popelín blanco, manga larga, cuello de lazo anudado sin esfuerzo.",
      price: 145000,
      sizes: ["XS", "S", "M"],
      soldOutSizes: [],
      image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80&fit=crop",
      reference: "Elegante sin avisar que lo intentó",
    },
    {
      id: "fc-004",
      name: "Look Marché · Blazer Oversize Beige",
      description: "Blazer oversized en mezcla de lana beige, hombros caídos, botones de carey.",
      price: 245000,
      sizes: ["S", "M", "L"],
      soldOutSizes: [],
      image: "https://images.unsplash.com/photo-1580651214613-f4692d6d138f?w=800&q=80&fit=crop",
      reference: "El tipo de prenda que se presta y no se devuelve",
    },
    {
      id: "fc-005",
      name: "Look Velodrome · Vestido Midi Fluido",
      description: "Vestido midi en viscosa arena, escote V suave, largo de noche que va de día.",
      price: 195000,
      sizes: ["XS", "S", "M", "L"],
      soldOutSizes: [],
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80&fit=crop",
      reference: "Tan versátil como los planes que cambian sobre la marcha",
    },
  ],
},
```

### Modo Noche de Terciopelo (slug: `noche-terciopelo`)
```typescript
{
  slug: "noche-terciopelo",
  name: "Modo Noche de Terciopelo",
  tagline: "La noche tiene su propio código.",
  openingPoem: "Luces bajas, conversaciones en susurros, un vestido que lo dice todo antes de que abras la boca. La noche merece sus propias reglas.",
  palette: ["#1A1025", "#6B2D5E", "#C4A882", "#E8D5C0"],
  heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80&fit=crop",
  heroImageAlt: "Look nocturno elegante con luz cálida y sombras dramáticas",
  products: [
    {
      id: "nt-001",
      name: "Look Velvet · Vestido Midi Terciopelo",
      description: "Vestido midi en terciopelo vino oscuro, escote en V, sin mangas, caída perfecta.",
      price: 275000,
      sizes: ["XS", "S", "M"],
      soldOutSizes: [],
      image: "https://images.unsplash.com/photo-1551163943-3f7253a97843?w=800&q=80&fit=crop",
      reference: "El vestido que recuerdan aunque no recuerden el nombre",
    },
    {
      id: "nt-002",
      name: "Look Champagne · Jumpsuit Satinado",
      description: "Jumpsuit en satén champagne, pantalón ancho, escote corazón sutil.",
      price: 255000,
      sizes: ["XS", "S", "M", "L"],
      soldOutSizes: ["XS"],
      image: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=800&q=80&fit=crop",
      reference: "Una sola pieza que resuelve toda la noche",
    },
    {
      id: "nt-003",
      name: "Look Penumbra · Blazer Estructurado Negro",
      description: "Blazer oversized en negro mate con solapa satinada, botones escondidos.",
      price: 265000,
      sizes: ["S", "M", "L"],
      soldOutSizes: [],
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&fit=crop",
      reference: "La armadura elegante de las que llegan y se notan",
    },
    {
      id: "nt-004",
      name: "Look Luna · Falda Midi con Abertura",
      description: "Falda midi negra con abertura lateral hasta la rodilla, talle alto, tela fluida.",
      price: 185000,
      sizes: ["XS", "S", "M", "L"],
      soldOutSizes: [],
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&fit=crop",
      reference: "Cada paso, una decisión",
    },
    {
      id: "nt-005",
      name: "Look Intermission · Top con Plumas",
      description: "Top negro con detalle de plumas en el escote, manga corta, fit ceñido.",
      price: 215000,
      sizes: ["XS", "S", "M"],
      soldOutSizes: ["M"],
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80&fit=crop",
      reference: "El tipo de detalle que convierte una blusa en un personaje",
    },
  ],
},
```

**IMPORTANTE:** Estos modos van en `lib/modes.ts` (el mock local). NO van a Supabase todavía — eso es trabajo manual posterior. Los modos nuevos aparecerán en el `FavoritesSection` porque ese componente lee de `lib/modes.ts`, no de Supabase.

---

## CAMBIO 3 — Hero: mostrar productos más prominentemente

El hero actual ya muestra un strip de modos al fondo, pero es pequeño. Mejóralo sin cambiar la arquitectura full-screen — solo el strip inferior:

En `components/Hero.tsx`, en la sección del strip de modos (el div con `flex gap-3 overflow-x-auto`):

1. **Amplía los cards** de modos: cambia `w-14 h-14 md:w-16 md:h-16` por `w-16 h-16 md:w-20 md:h-20` en la imagen thumbnail.

2. **Agrega el precio** si existe:
```tsx
{mode.min_price && (
  <p className="font-sans text-[11px] text-terracota-muted mt-0.5">
    desde {formatPrice(mode.min_price)}
  </p>
)}
```
(ya existe este bloque, solo cambia el color de `text-bone/50` a `text-terracota-muted`)

3. **Agrega un label encima del strip** que invite a actuar:
```tsx
<p className="font-sans text-[10px] tracking-[0.3em] uppercase text-bone/40 mb-3 hidden md:block">
  ↓ Elige tu universo
</p>
```

4. **En el botón CTA principal** del hero (el `"Ver los looks"`), agrega debajo un texto secundario visible:
```tsx
<span className="font-sans text-[10px] tracking-widest uppercase text-bone/30">
  {modes.length} universos · {modes.reduce((acc, m) => acc + (m.products?.length ?? 0), 0)} looks
</span>
```
Este span va dentro del mismo `motion.div` que contiene el botón CTA, debajo del `flex items-center gap-5`.

---

## VERIFICACIÓN FINAL

Antes de terminar:
- [ ] `npm run build` sin errores TypeScript
- [ ] La sección "Mis Favoritos" aparece en el homepage entre el Hero y el Manifiesto
- [ ] Los tres tabs funcionan y muestran productos distintos
- [ ] Los 7 modos totales aparecen en `lib/modes.ts`
- [ ] El tab "REBAJAS" muestra el precio tachado + precio rebajado en terracota
- [ ] En mobile (375px) el grid es de 2 columnas y los tabs caben en una línea
