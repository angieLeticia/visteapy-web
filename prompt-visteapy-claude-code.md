# Prompt Maestro — Rediseño Visteapy + open-design
## Para Claude Code · Versión 3.0

---

## CONTEXTO GENERAL

Estás trabajando en **visteapy.com**, una tienda de moda colombiana femenina construida en **Next.js App Router + TypeScript + Tailwind CSS**. La marca tiene una identidad cinematográfica única: "vístete como tu película favorita".

El repositorio ya existe y funciona. **No lo construyas desde cero.** Lee primero toda la estructura antes de tocar cualquier archivo.

Ruta del proyecto: el directorio actual donde estás corriendo.

---

## FASE 1 — PREPARACIÓN: INSTALAR Y LEER OPEN-DESIGN

Antes de escribir una sola línea de código para Visteapy, debes:

### 1.1 Clonar open-design en una carpeta hermana del proyecto

```bash
cd ..
git clone https://github.com/nexu-io/open-design.git open-design
cd open-design
```

### 1.2 Instalar dependencias

```bash
corepack enable
corepack pnpm --version   # debe imprimir 10.33.x
pnpm install
```

Si Node no es versión 24, instálala con nvm:
```bash
nvm install 24 && nvm use 24
```

### 1.3 Leer estos archivos de open-design (OBLIGATORIO antes de diseñar)

Lee cada uno de estos archivos en su totalidad y extrae los valores que usarás:

**Sistema de diseño base:**
```
open-design/design-systems/warm-editorial/DESIGN.md
```
Este es el design system más cercano a la dirección de Visteapy. Extrae:
- Paleta de colores exacta (hex/OKLch)
- Escala tipográfica
- Espaciado y ritmo vertical
- Reglas de layout
- Patrones de componentes
- Anti-patterns explícitos

**Skills de referencia para los componentes que vas a construir:**
```
open-design/skills/web-prototype/SKILL.md
open-design/skills/saas-landing/SKILL.md
open-design/skills/social-carousel/SKILL.md
```
De cada skill extrae:
- Checklist P0/P1/P2 (calidad mínima no negociable)
- Estructura de layout recomendada
- Patrones de componentes que apliquen a e-commerce de moda

**Archivos de ejemplo HTML generados:**
```
open-design/skills/web-prototype/example.html  (si existe)
open-design/skills/saas-landing/example.html   (si existe)
```
Ábrelos mentalmente como referencia visual de calidad editorial.

### 1.4 Crear tu brief de diseño antes de continuar

Después de leer open-design, escribe un archivo `DESIGN-BRIEF.md` en la raíz del proyecto visteapy con:
- Los tokens de color adaptados a la paleta de Visteapy (ver sección 3)
- Las reglas tipográficas que vas a aplicar
- Los 3 componentes principales que vas a construir y su estructura
- Los anti-patterns que evitarás (basado en open-design)

**Solo continúa a la Fase 2 cuando hayas completado este brief.**

---

## FASE 2 — AUDITORÍA DEL PROYECTO ACTUAL

Con el design brief en mano, analiza el proyecto Visteapy:

### 2.1 Lee estos archivos en orden
1. `tailwind.config.js` o `tailwind.config.ts` — paleta actual, tokens, extensiones
2. `app/globals.css` — variables CSS, fuentes, animaciones globales
3. `app/page.tsx` — estructura completa del homepage
4. `app/layout.tsx` — layout raíz, fuentes, metadatos
5. Todos los archivos en `components/` — inventario de componentes existentes
6. `lib/modes.ts` o equivalente — estructura de datos de los modos/colecciones

### 2.2 Documenta lo que encuentres

Anota mentalmente:
- Qué componentes pueden reutilizarse tal cual
- Qué componentes necesitan modificación
- Qué hay que construir desde cero
- Dónde están las referencias al color `violet` para reemplazarlas

---

## FASE 3 — NUEVA PALETA DE COLOR

### 3.1 Actualiza tailwind.config

Reemplaza el color `violet` con los nuevos tokens. Agrega esto al `extend.colors`:

```js
terracota: {
  DEFAULT: '#C1622F',
  light:   '#D4784A',
  dark:    '#9A4A25',
  muted:   '#E8C4B0',
},
arena: {
  DEFAULT: '#F5EFE6',
  dark:    '#EDE4D8',
},
// Mantener los existentes:
// ink, bone, fog, fog-dark — NO modificar
```

### 3.2 Reemplaza todas las referencias

Busca en todo el proyecto (con grep) y reemplaza:
- `text-violet` → `text-terracota`
- `bg-violet` → `bg-terracota`
- `border-violet` → `border-terracota`
- `hover:text-violet` → `hover:text-terracota`
- `hover:bg-violet` → `hover:bg-terracota`
- El valor hex `#7C3AED` en cualquier CSS inline → `#C1622F`

Verifica que no quede ninguna referencia al morado/violet en el código visible.

---

## FASE 4 — SECCIÓN "MIS FAVORITOS" (componente nuevo — PRIORIDAD MÁXIMA)

Esta es la sección más importante del rediseño. Va **inmediatamente después del hero** en el homepage.

### 4.1 Datos mock — crear `lib/products.ts`

Si no existe, créalo con esta estructura TypeScript:

```typescript
export type ProductTag = 'new' | 'bestseller' | 'sale'
export type ProductCategory = 'vestido' | 'blusa' | 'falda' | 'conjunto' | 'pantalon'

export interface Product {
  id: string
  name: string                  // Nombre poético estilo Visteapy
  price: number                 // En COP sin puntos (ej: 189000)
  originalPrice?: number        // Solo si está en rebaja
  image: string                 // URL Unsplash curada por estilo
  imageAlt: string
  tags: ProductTag[]
  category: ProductCategory
  modeSlug: string              // A qué modo pertenece
  slug: string                  // Para la URL del producto
  sizes: string[]               // ['XS','S','M','L','XL']
  soldOutSizes?: string[]       // Tallas agotadas
}
```

Crea **12 productos mock** distribuidos así:
- 4 con tag `new` — vestidos y conjuntos, precios entre $159.000 y $289.000
- 4 con tag `bestseller` — blusas, faldas y vestidos más vendidos
- 4 con tag `sale` — con `originalPrice` 20-30% más alto que `price`

Para las imágenes usa Unsplash con queries curadas:
- Vestidos: `https://images.unsplash.com/photo-[id]?w=600&q=80&fit=crop&crop=entropy`
- Busca fotos editoriales de moda femenina, luz natural, fondos neutros

Nombres poéticos de ejemplo: "Vestido Luna de Seda", "Conjunto Tarde en Niza", "Blusa del Último Verano", "Falda Jardín Romano"

### 4.2 Componente `FavoritesSection.tsx`

Crea `components/FavoritesSection.tsx`:

**Estructura visual (basada en los patrones de open-design warm-editorial):**

```
┌─────────────────────────────────────────────────────┐
│  ♥  MIS FAVORITOS                                   │  ← label pequeño + ícono
│                                                     │
│  [ NEW IN ]  Lo más vendido  Rebajas                │  ← tabs estilo línea
│                                                     │
│  [card] [card] [card] [card]                        │  ← grid 4 col desktop
│  [card] [card] [card] [card]                        │     2 col mobile
│                                                     │
│              [ Ver todo ]                           │  ← CTA terracota
└─────────────────────────────────────────────────────┘
```

**Especificaciones del componente:**

Tabs:
- Usa `useState` para el tab activo
- Tab activo: borde inferior 1px `terracota` + texto `terracota` + font-weight 500
- Tabs inactivos: texto `ink/40`, sin borde
- Sin fondo, sin pastillas — solo línea limpia
- Transición suave `transition-colors duration-300`

Product Cards (`ProductCard.tsx` — crea o actualiza):
- Fondo: `bone` (crema) — sin bordes, sin sombras
- Imagen: aspect-ratio 3:4, `object-cover`, overflow hidden
- En hover: zoom suave `scale-[1.03]` con `duration-700 ease-cinematic`
- Badge (si aplica): esquina superior izquierda
  - "NEW" → fondo `ink`, texto `bone`, font-size 10px, tracking-widest
  - "SALE" → fondo `terracota`, texto `bone`
- Debajo de la imagen:
  - Nombre: `font-serif text-sm tracking-wide text-ink uppercase` — 1 línea, truncate
  - Precio: `font-sans text-sm text-terracota font-light`
  - Si hay rebaja: precio original tachado en `ink/30` + precio rebajado en `terracota`
  - CTA: texto `"Ver look →"` en `terracota`, font-size 11px, tracking-widest — siempre visible (no solo en hover)
- Padding: `pt-3 pb-1 px-0` — espaciado editorial, no de tienda común

Grid:
- `grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4`
- Sin bordes entre cards

Animación de entrada:
- Usa el mismo patrón de `whileInView` que existe en el proyecto
- Cards se animan en stagger (delay 0, 0.05, 0.1... por card)

### 4.3 Agrega la sección al homepage

En `app/page.tsx`, importa y agrega `<FavoritesSection />` justo después del hero y antes de la sección del manifiesto.

---

## FASE 5 — HERO REDISEÑADO

### 5.1 Problema actual

El hero actual es solo imagen full-screen + texto. La usuaria tiene que hacer scroll para ver qué se vende. Esto daña la conversión.

### 5.2 Nuevo layout — split editorial

**Desktop (lg+):**
```
┌──────────────────────────────────────────────────────┐
│                         │                            │
│   IMAGEN CINEMATOGRÁFICA│  [logo APY]                │
│   60% del ancho         │                            │
│   full height           │  Slogan principal          │
│   con overlay sutil     │  (2 líneas, serif grande)  │
│                         │                            │
│                         │  Subtexto poético          │
│                         │                            │
│                         │  ┌──────┐ ┌──────┐         │
│                         │  │modo 1│ │modo 2│  ←mini  │
│                         │  └──────┘ └──────┘  previews│
│                         │                            │
│                         │  [Explorar colección →]    │
│                         │   botón terracota          │
└──────────────────────────────────────────────────────┘
```

**Mobile:** Stack vertical — imagen arriba (50vh), contenido abajo sobre fondo `bone`

### 5.3 Especificaciones

Lado imagen (izquierdo):
- `w-3/5 h-screen` en desktop, `w-full h-[50vh]` en mobile
- Imagen actual de Unsplash mantenida
- Overlay: `bg-gradient-to-r from-transparent to-bone/20`

Lado contenido (derecho):
- Fondo: `bone` (`#FAF7F2`)
- Padding: `px-10 md:px-16 py-16`
- Centrado verticalmente con `flex flex-col justify-center`

Slogan — propón 3 variantes y usa la primera como default (las otras en comentario):
- Variante A: *"Tu próxima escena empieza aquí."*
- Variante B: *"Moda que merece un close-up."*
- Variante C: *"Viste el personaje que quieres ser."*
- Estilo: `font-serif text-ink` tamaño `clamp(2rem, 3.5vw, 3.5rem)`, italic en la segunda línea

Mini previews de modos (2 cards pequeños):
- Toma los 2 primeros modos del array
- Cada uno: imagen `aspect-[3/4] w-28`, nombre del modo debajo en 10px uppercase
- Clickeables → van a `/modo/[slug]`
- Layout: `flex gap-3`

Botón CTA:
- `"Explorar colección →"`
- Estilo: `bg-terracota text-bone px-8 py-3 font-sans text-xs tracking-[0.2em] uppercase hover:bg-terracota-dark transition-colors duration-300`
- Sin border-radius exagerado — `rounded-none` o `rounded-sm` máximo

---

## FASE 6 — MODOS: AGREGAR NUEVOS + MEJORAR CARDS

### 6.1 Agregar 2 modos nuevos en `lib/modes.ts`

Agrega estos modos a los 5 existentes:

**Modo 6 — Francesa Casual** (slug: `francesa-casual`)
- Tagline: *"El estilo que nunca intenta demasiado."*
- Poema: Cafés de esquina, libros a medio leer, el arte de parecer que no te esforzaste. París no es un lugar, es una forma de moverse.
- Paleta: `['#C8B99A', '#F2EDE4', '#4A4035', '#D4956A']`
- Hero image: Unsplash query moda francesa casual, café, luz matutina
- Prendas: rayas marineras, pantalón cigarette, blazer oversize, ballet flats, bolso baguette

**Modo 7 — Noche de Terciopelo** (slug: `noche-terciopelo`)
- Tagline: *"La noche tiene su propio código."*
- Poema: Luces bajas, conversaciones en susurros, un vestido que lo dice todo antes de que abras la boca.
- Paleta: `['#1A1025', '#6B2D5E', '#C4A882', '#E8D5C0']`
- Hero image: Unsplash query elegancia nocturna, terciopelo, luz cálida, editorial
- Prendas: vestido midi terciopelo, jumpsuit satinado, blazer estructurado, mules de tacón, clutch de mano

Cada modo debe tener 4-5 prendas mock en `lib/modes.ts` con la misma estructura existente.

### 6.2 Mejorar los ModeCards existentes

En el componente de cards de modos (probablemente `ModeCard.tsx`), haz estos cambios:

- El **tagline** debe ser visible siempre (no solo en hover) — debajo del nombre del modo, en `text-bone/60 text-sm font-light`
- El CTA `"Ver looks →"` debe verse siempre — color `terracota-muted` que se vuelve `bone` en hover
- Agrega el número de prendas disponibles: `"X looks"` en `text-bone/40 text-[10px] tracking-widest` — arriba del nombre
- El hover mantiene el zoom de imagen existente — no cambiar eso

---

## FASE 7 — HEADER / NAVEGACIÓN

Cambios puntuales, no un rediseño completo:

1. **Reemplaza todos los colores `violet`** en el header por `terracota` (ya cubierto en Fase 3 pero verifica aquí también)

2. **Agrega ícono de bolsa/carrito** en el lado derecho del nav, antes del menú hamburguesa en mobile:
   - Ícono SVG de bolsa de compras (dibújalo inline o usa `lucide-react` si ya está instalado)
   - Por ahora es decorativo — no implementa carrito (agregar `cursor-default` y un tooltip `"Próximamente"` en hover si quieres)
   - Color: `ink/70`, hover: `terracota`
   - Tamaño: `w-5 h-5`

3. **Mobile hamburger**: aumenta el área de toque a `p-3` (ya tiene `p-2`) y cambia las líneas de `w-6` a `w-5` para que se vea más refinado

---

## FASE 8 — VERIFICACIÓN DE CALIDAD (checklist P0 — no entregar sin esto)

Antes de terminar, verifica cada punto. Estos son los P0 de open-design adaptados a Visteapy:

### Visual
- [ ] No hay ningún tono morado/violet visible en el sitio
- [ ] Los botones primarios usan terracota (#C1622F), no otros colores
- [ ] Los cards de producto respiran — hay espacio suficiente entre elementos
- [ ] La tipografía serif se usa solo para títulos, sans para cuerpo y UI
- [ ] Las imágenes no están estiradas ni cortadas de forma extraña (object-cover correcto)

### UX / Conversión
- [ ] Los productos son visibles sin hacer scroll en el hero (en desktop)
- [ ] La sección "Mis Favoritos" carga con el tab "NEW IN" activo por defecto
- [ ] El CTA de cada product card es visible sin hover
- [ ] El botón de WhatsApp sigue funcionando en las páginas de modo

### Código
- [ ] `npm run build` no arroja errores TypeScript
- [ ] No hay `any` nuevo introducido sin justificación
- [ ] Los componentes nuevos son mobile-first y se ven bien en 375px (iPhone SE)
- [ ] Las animaciones no causan layout shift (no usar `transform` en el tamaño del contenedor)
- [ ] Las imágenes usan `next/image` con `width`, `height` o `fill` correctamente

### open-design compliance
- [ ] El `DESIGN-BRIEF.md` fue creado y refleja los tokens reales usados
- [ ] Los anti-patterns de `warm-editorial/DESIGN.md` fueron respetados
- [ ] Los checklists P0 de los skills consultados fueron satisfechos

---

## FASE 9 — ENTREGABLES FINALES

Cuando termines todas las fases, entrégame:

1. **Lista de archivos modificados** — con una línea describiendo qué cambió en cada uno
2. **`DESIGN-BRIEF.md`** — el documento de diseño basado en open-design
3. **Las 3 variantes de slogan** — en `lib/copy.ts` o comentadas en el Hero
4. **Instrucciones para agregar productos reales** — en el README, sección "Cómo actualizar el inventario"
5. **Instrucciones para agregar nuevos modos** — en el README, sección "Cómo agregar un nuevo modo"

---

## NOTAS FINALES — NO NEGOCIABLES

- **No instales librerías nuevas** sin documentar por qué son necesarias
- **No toques** `PROMPT.md` (el prompt original del proyecto)
- **No cambies** la arquitectura de carpetas existente
- **No elimines** animaciones o transiciones que ya funcionan bien
- **Mantén** el tono poético en todos los textos — cero corporativo
- Si encuentras una decisión de diseño ambigua, **documéntala en el DESIGN-BRIEF.md** y elige la opción más conservadora (la que menos rompa lo existente)
- El sitio se ve principalmente en **mobile** (tráfico de Instagram) — mobile-first siempre

---

## ORDEN DE EJECUCIÓN ESTRICTO

```
1. Clonar e instalar open-design
2. Leer warm-editorial/DESIGN.md + skills relevantes
3. Escribir DESIGN-BRIEF.md
4. Auditar proyecto Visteapy actual
5. Actualizar tailwind.config (nueva paleta)
6. Buscar y reemplazar todas las referencias a violet
7. Crear/actualizar lib/products.ts con 12 mocks
8. Agregar 2 nuevos modos a lib/modes.ts
9. Construir FavoritesSection.tsx + ProductCard.tsx
10. Rediseñar Hero
11. Mejorar ModeCards
12. Actualizar Header
13. Correr checklist P0 completo
14. Entregar resumen de cambios
```

No saltes pasos. No empieces a codear antes de tener el DESIGN-BRIEF.md listo.
