# Visteapy Web

Sitio web cinemático de Visteapy — marca colombiana de ropa femenina inspirada en películas y series.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — paleta personalizada (bone, ink, fog, violet)
- **Framer Motion** — animaciones cinematográficas
- **Fuentes:** Playfair Display (serif) + Inter (sans)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Cómo hacer cambios comunes

### Cambiar el número de WhatsApp

Edita `lib/whatsapp.ts`, línea 2:

```ts
const WHATSAPP_NUMBER = "57XXXXXXXXXX"; // → reemplaza con el número real, ej: "573001234567"
```

### Agregar un producto nuevo a un modo

Edita `lib/modes.ts`. Dentro del modo correspondiente, agrega un objeto al array `products`:

```ts
{
  id: "ma-006",           // ID único (prefijo del modo + número)
  name: "Look Nombre · Descripción corta",
  description: "Descripción de la prenda.",
  price: 145000,          // Precio en COP sin puntos
  sizes: ["S", "M", "L"],
  soldOutSizes: [],       // Tallas agotadas (aparecen tachadas)
  image: "https://...",   // URL de imagen (Unsplash o propia)
  reference: "Texto poético opcional que evoca el universo del modo",
}
```

### Agregar un modo nuevo

En `lib/modes.ts`, agrega un objeto al array `modes` con esta estructura:

```ts
{
  slug: "nombre-del-modo",      // URL: /modo/nombre-del-modo
  name: "Modo Nombre",
  tagline: "Frase corta de impacto.",
  openingPoem: "Texto poético largo que abre la página del modo.",
  palette: ["#hex1", "#hex2"],
  heroImage: "https://...",
  heroImageAlt: "Descripción de la imagen hero",
  products: [ /* arreglo de productos */ ],
}
```

### Reemplazar imágenes mock por imágenes reales

1. Sube tus fotos a `/public/images/` o usa un CDN
2. Reemplaza las URLs `images.unsplash.com/...` en `lib/modes.ts` por tus URLs
3. Para fotos propias en `/public/`: usa rutas relativas como `/images/mi-foto.jpg`

Consulta `public/moodboards/README.md` para los prompts de IA por modo.

### Actualizar metadatos SEO

Edita `app/layout.tsx` para metadatos globales. Cada página de modo genera sus metadatos automáticamente desde `lib/modes.ts`.

## Despliegue en Vercel

1. Crea una cuenta en [vercel.com](https://vercel.com) (gratis)
2. Conecta tu repositorio de GitHub
3. Vercel detecta Next.js automáticamente — haz clic en Deploy

No se necesita ninguna variable de entorno para el estado actual del sitio.

## Estructura de carpetas

```
app/
  layout.tsx          # Layout raíz, fuentes, metadatos globales
  page.tsx            # Home
  modo/[slug]/        # Página dinámica de cada modo
  manifiesto/         # Manifiesto de marca
  contacto/           # Página de contacto
  globals.css         # Estilos base

components/
  Navbar.tsx          # Navegación sticky con menú móvil
  Hero.tsx            # Hero a pantalla completa con parallax
  ManifestoSection.tsx
  ModesGrid.tsx       # Grid de tarjetas de modos
  ModeCard.tsx        # Tarjeta individual de modo
  HowItWorks.tsx      # Sección 3 pasos
  InstagramFeed.tsx   # Grid 3x3 mock (TODO: API real)
  ProductCard.tsx     # Ficha de producto con selector de talla
  WhatsAppButton.tsx  # Botón con link pre-llenado
  Footer.tsx
  ui/
    FadeIn.tsx        # Wrapper animado Framer Motion
    PageTransition.tsx

lib/
  modes.ts            # Datos mock de modos y productos
  whatsapp.ts         # Helper para construir URLs de WhatsApp

public/
  moodboards/README.md  # Prompts de IA para generar imágenes por modo
```
