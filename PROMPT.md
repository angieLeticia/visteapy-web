# Proyecto: Visteapy — Sitio web cinemático para una marca de ropa

Vas a construir desde cero el sitio web de **Visteapy**, una marca colombiana de ropa femenina que vende **outfits inspirados en películas y series**. La idea no es vender prendas sueltas: es vender **una experiencia** — "vístete como tu personaje favorito".

Quiero que el sitio se vea **caro, editorial y cinemático**, como una mezcla entre Vogue y un tráiler de película. La marca debe sentirse premium aunque los precios sean accesibles.

## Contexto de negocio

- **Marca:** Visteapy (Instagram y TikTok: @visteapy, logo "APY")
- **País:** Colombia (precios en COP, español únicamente)
- **Modelo de venta:** Catálogo visual + reserva por WhatsApp (NO checkout, NO carrito, NO pagos en línea — la cliente ve el look, hace clic en "Reservar por WhatsApp" y el botón abre WhatsApp con un mensaje pre-llenado).
- **Estado del inventario:** Aún no tengo producto. El sitio debe poder **lanzarse con placeholders y datos mock** y ser fácil de actualizar cuando llegue inventario real.

## Stack técnico (obligatorio)

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **TypeScript**
- **Framer Motion** para animaciones premium (fade-ins, parallax suave, transiciones cinematográficas)
- **next/image** para optimización de imágenes
- **next/font** con **Playfair Display** (serif editorial para títulos) + **Inter** (sans para cuerpo)
- Despliegue pensado para **Vercel** (gratis)
- Estructura limpia que pueda evolucionar a un CMS (Sanity, Contentful) más adelante — por ahora datos mock en archivos `.ts`.

## Identidad visual

- **Estilo:** Editorial Vogue × cinemático. Tipografías serif grandes, mucho espacio en blanco, fotos a pantalla completa, layouts asimétricos como revista de moda.
- **Paleta:**
  - Base: blanco hueso `#FAF7F2`, negro tinta `#0F0F0F`, gris niebla `#E8E4DD`
  - Acento de marca (violeta APY): `#7C3AED`
  - El violeta se usa **con moderación** — solo en botones primarios, subrayados, hover, y detalles. La mayoría del sitio es neutra elegante. Cada "modo película" puede tener su propia sub-paleta sutil.
- **Tipografía:**
  - Títulos: Playfair Display, peso 400-700, tracking apretado, tamaños grandes (clamp 3rem → 8rem en hero)
  - Cuerpo: Inter, peso 300-400, line-height generoso (1.7+)
  - Acentos en itálica para la voz "poética"
- **Logo:** Voy a entregar el logo APY violeta. Por ahora pon un placeholder con texto "APY" en Playfair Display + un pequeño "visteapy" debajo en Inter espaciado.

## Tono del copy (TEXTOS)

**Cinemático poético**. Frases cortas, evocativas, como subtítulos de tráiler. Ejemplos del tipo de escritura que quiero:

> "Cada prenda, una escena. Cada outfit, una historia."
> "No te vistes. Te conviertes."
> "La película empieza cuando te la pones."
> "Para las que viven como protagonistas."

**Reglas del copy:**
- Español de Colombia, voseo NO (usar "tú")
- Femenino implícito (la cliente, ella, protagonista)
- Frases cortas, mucho ritmo
- Cero corporativo, cero "compra ahora", cero descuentos gritados
- Si dudas, escribe **menos** y deja que la imagen hable

## Estructura del sitio (páginas)

### 1. `/` — Home

Secciones en orden:

1. **Hero a pantalla completa** con video o imagen de fondo (placeholder cinematográfico, formato 16:9 cubriendo viewport entero), un titular gigante en serif: **"Vístete como tu película favorita"**, subtítulo poético, CTA "Explorar los modos" que hace scroll suave a la siguiente sección.
2. **Manifiesto de marca** — sección a pantalla completa con un texto poético corto (3-4 líneas máximo) sobre fondo claro o foto editorial. Tipografía gigante.
3. **Grid de "Modos película"** — al menos 5 modos, cada uno como una carta grande con imagen cinematográfica de fondo, nombre del modo, una frase, hover con zoom sutil. Click → va a `/modo/[slug]`.
4. **Sección "Cómo funciona"** — 3 pasos en horizontal con números grandes en serif: **01.** Eliges tu look · **02.** Nos escribes por WhatsApp · **03.** Te llega a casa. Diseño editorial, no infografía corporativa.
5. **Feed de Instagram embedido** — placeholder con grid 3x3 de fotos de @visteapy (usa imágenes mock por ahora, deja un comentario claro `// TODO: integrar con Instagram Graph API o widget tipo SnapWidget`).
6. **Footer** — minimalista: logo APY, links a IG/TikTok, "© 2026 Visteapy · Bogotá, Colombia", un correo de contacto placeholder.

### 2. `/modo/[slug]` — Página de cada Modo Película

Cada modo es una mini-experiencia:

1. **Hero del modo** con imagen cinematográfica del universo de la película (sin usar stills oficiales con copyright — usa placeholders moodboard con instrucciones para reemplazar por imágenes generadas con IA o de stock curadas).
2. **Frase de apertura** poética que evoque la película sin nombrarla explícitamente como producto oficial.
3. **Lookbook editorial** — galería asimétrica de prendas (mock data), tipo revista. Algunas fotos a pantalla completa, otras en grid, márgenes generosos.
4. **Cada prenda como ficha:**
   - Foto principal (formato 4:5)
   - Nombre del look (ej. "Look Hermione · Tarde de biblioteca")
   - Precio en COP formateado (ej. "$ 189.000 COP")
   - Tallas disponibles (S, M, L, XL — mostrar como chips, marcar las agotadas con tachado)
   - Pequeña referencia opcional al personaje/película (texto sutil, no protagónico — usar lenguaje genérico tipo "inspirado en la magia académica de los 90s" en vez de "Hermione Granger")
   - **Botón "Reservar por WhatsApp"** que abra `https://wa.me/57XXXXXXXXXX?text=Hola%20Visteapy%2C%20me%20interesa%20el%20look%20[NOMBRE]%20talla%20[TALLA]` (el número es placeholder `57XXXXXXXXXX`, dejar comentario claro `// TODO: reemplazar por número real cuando esté listo`).
5. **Navegación a otros modos** al final ("Continúa la función → ").

### 3. `/manifiesto` — Página opcional con el manifiesto largo de marca

Editorial, una columna estrecha, tipografía grande, mucho espacio. Tipo ensayo de revista de moda.

### 4. `/contacto` — Mínima

Correo, IG, TikTok. CTA principal: "Escríbenos por WhatsApp".

## Modos película iniciales (datos mock para empezar)

Crea estos 5 modos como datos de ejemplo en `lib/modes.ts`. Cada uno con 4-6 prendas mock:

1. **Modo Magia Académica** (slug: `magia-academica`) — inspirado en el universo Harry Potter. Estética dark academia. Sub-paleta: verdes oscuros, dorados tenues, borgoña, beige. Prendas: faldas plisadas, sweaters cuello alto, blusas oxford, blazers, bufandas tejidas.
2. **Modo Regencia** (slug: `regencia`) — inspirado en Orgullo y Prejuicio / Bridgerton. Sub-paleta: lavanda empolvado, crema, rosa palo, dorado. Prendas: vestidos talle imperio, blusas con bordados, faldas largas con vuelo, mangas abullonadas.
3. **Modo Riviera** (slug: `riviera`) — inspirado en Llámame por tu Nombre / verano italiano años 80. Sub-paleta: blanco roto, azul mediterráneo, terracota, dorado del sol. Prendas: blusas de lino, shorts altos, vestidos midi sueltos, sandalias.
4. **Modo Sastre** (slug: `sastre`) — inspirado en Gambito de Dama. Sub-paleta: camel, blanco, negro, mostaza. Estética 60s mod. Prendas: vestidos shift, abrigos camel, blusas geométricas, sastrería femenina.
5. **Modo Romántica Oscura** (slug: `romantica-oscura`) — inspirado en Crepúsculo / Wuthering Heights estética grunge etérea. Sub-paleta: gris piedra, vino, negro, lavanda gris. Prendas: vestidos con encaje, abrigos largos, botas, blusas con capas.

Para cada prenda mock, inventa nombre poético, precio entre $89.000 y $295.000 COP, y 2-3 tallas disponibles.

## Imágenes

Como no tengo banco de fotos aún:

- Usa **placeholders inteligentes** con `https://images.unsplash.com/...` con queries curadas por modo (ej: `?academia,library`, `?regency,dress`, `?riviera,linen`).
- Para las imágenes hero de cada modo, deja **comentarios visibles** en el código indicando: `// TODO: reemplazar con imagen generada por IA siguiendo el moodboard X`.
- Crea un archivo `/public/moodboards/README.md` que liste qué imagen IA generar para cada modo, con un prompt sugerido para la IA generadora (ej. "moody library at dusk, candlelight, autumn academia aesthetic, cinematic 35mm film grain, no people").

## Animaciones (importantes para el feel "caro")

- **Fade-in al hacer scroll** en cada sección (Framer Motion `whileInView`).
- **Parallax sutil** en imágenes hero (la imagen se mueve más lento que el scroll).
- **Hover suave** en cartas de modos: zoom 1.03x + overlay oscuro 20% + título que sube ligeramente.
- **Cursor personalizado** opcional (un círculo pequeño con `mix-blend-mode: difference`) — solo si no rompe en mobile.
- **Transición de página** tipo cortinaje cinematográfico al entrar/salir (Framer Motion `AnimatePresence`).
- **Textos con `text-balance`** para que los títulos se vean editoriales.
- Todo debe ser **mobile-first** y funcionar perfecto en celular antes que en desktop (la mayoría de mi tráfico vendrá de Instagram).

## Performance y SEO

- **Lighthouse score objetivo:** 90+ en todas las métricas.
- Metadatos por página con `generateMetadata`.
- Open Graph images por modo.
- Sitemap automático.
- Schema.org básico (Organization + Product mock).
- `font-display: swap`.
- Lazy loading de todo lo que no sea hero.

## Estructura de carpetas esperada

```
visteapy-web/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Home
│   ├── modo/[slug]/page.tsx        # Modo película
│   ├── manifiesto/page.tsx
│   ├── contacto/page.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── ModeCard.tsx
│   ├── ProductCard.tsx
│   ├── WhatsAppButton.tsx
│   ├── InstagramFeed.tsx
│   ├── Manifesto.tsx
│   ├── HowItWorks.tsx
│   ├── Footer.tsx
│   └── ui/  (componentes base)
├── lib/
│   ├── modes.ts                    # Datos mock de los 5 modos
│   ├── products.ts                 # Datos mock de productos
│   └── whatsapp.ts                 # Helper para construir links
├── public/
│   ├── moodboards/README.md
│   └── logo/  (placeholder)
└── README.md
```

## Lo que NO debes hacer

- NO uses imágenes oficiales de películas con copyright (Disney, Warner, etc.)
- NO menciones a personajes o películas por su nombre exacto en el copy público — usa lenguaje evocativo ("magia académica", "verano italiano", "regencia romántica")
- NO incluyas carrito de compras, checkout, ni integración con pasarelas de pago
- NO uses emojis en el copy del sitio (la marca es seria/editorial)
- NO uses gradientes coloridos ni neón — la elegancia viene del contraste y el espacio
- NO satures de violeta — es un acento, no el protagonista visual
- NO uses Bootstrap, Material UI ni component libraries pre-hechas — Tailwind puro

## Entregable

Cuando termines, quiero:

1. Proyecto Next.js funcional, `npm run dev` levantando sin errores.
2. Las 5 páginas de modos navegables con datos mock.
3. Botones de WhatsApp funcionando con número placeholder y mensaje pre-llenado.
4. README con instrucciones para: cambiar el número de WhatsApp, agregar productos nuevos, agregar nuevos modos, reemplazar imágenes mock por reales, desplegar en Vercel.
5. Capturas o descripción de cómo se ve cada página principal.

## Cómo trabajar

- **Empieza por la estructura y los datos mock** antes de pulir visualmente.
- Después construye el Home completo con todas sus secciones.
- Después una página de modo (`magia-academica`) hasta que esté perfecta.
- Después replica para las otras 4.
- Al final pule animaciones y performance.
- Pregúntame solo cuando tengas decisiones realmente bloqueantes — para todo lo demás, usa el mejor criterio editorial premium.

Empieza ya. Crea el proyecto, instala dependencias, y muéstrame primero el árbol de archivos antes de escribir mucho código, para que pueda confirmar que vamos bien.
