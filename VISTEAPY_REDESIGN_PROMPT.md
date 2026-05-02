# VISTEAPY — REDISEÑO TOTAL
# Usamos: agency-agents + open-design como base de proceso

---

## FASE 0 — SETUP DE HERRAMIENTAS (hacer PRIMERO, antes de tocar el código)

### 1. Instalar agency-agents en Claude Code
```bash
git clone https://github.com/msitarzewski/agency-agents /tmp/agency-agents
cd /tmp/agency-agents
./scripts/install.sh --tool claude-code
```

Verificar que existan estos archivos después:
- ~/.claude/agents/design-brand-guardian.md
- ~/.claude/agents/design-ui-designer.md
- ~/.claude/agents/design-ux-architect.md
- ~/.claude/agents/design-visual-storyteller.md
- ~/.claude/agents/design-whimsy-injector.md
- ~/.claude/agents/marketing-instagram-curator.md
- ~/.claude/agents/marketing-social-media-strategist.md
- ~/.claude/agents/marketing-content-creator.md
- ~/.claude/agents/marketing-seo-specialist.md

### 2. Clonar open-design para sus skills y design systems
```bash
git clone https://github.com/nexu-io/open-design /tmp/open-design
```

Los skills relevantes para Visteapy están en:
- /tmp/open-design/skills/magazine-poster/
- /tmp/open-design/skills/design-brief/
- /tmp/open-design/skills/wireframe-sketch/
- /tmp/open-design/skills/web-prototype/
- /tmp/open-design/skills/critique/
- /tmp/open-design/skills/social-carousel/
- /tmp/open-design/skills/motion-frames/
- /tmp/open-design/skills/mobile-app/

Leer el contenido de cada skill relevante con: cat /tmp/open-design/skills/[skill-name]/SKILL.md
Leer los design systems: ls /tmp/open-design/design-systems/ y seleccionar los de
categoría luxury/editorial/fashion para usarlos como referencia de tokens de diseño.

---

## FASE 1 — AUDITORÍA Y BRIEF (activar agentes de análisis)

### Activar: design-ux-architect
Activa el agente design-ux-architect. Analiza el repositorio actual (ya estás en el directorio)
y entrega:
1. Un mapa de flujos de usuario actuales
2. Los 5 puntos de fricción más críticos en la experiencia
3. Las oportunidades de UX que el diseño actual está desperdiciando
4. Una arquitectura de información revisada para el nuevo diseño
Contexto: es una tienda de ropa colombiana organizada por "modos" (universos de estilo).

### Activar: design-ux-researcher
Activa el agente design-ux-researcher. Define los 2 perfiles de usuario de Visteapy:
- Perfil A: Mujer 20-30 aspiracional, usa TikTok e Instagram
- Perfil B: Mujer 25-40 con criterio, valora concepto y calidad
Para cada perfil entrega: jobs to be done, pain points actuales en el sitio,
motivaciones de compra, y cómo el concepto de "modos" resuena con cada una.

### Usar skill: design-brief (de open-design)
Leer /tmp/open-design/skills/design-brief/ y seguir su estructura para generar el
design brief formal de Visteapy antes de diseñar nada.

---

## FASE 2 — DISEÑO VISUAL (activar agentes de diseño)

### Activar: design-visual-storyteller
Activa el agente design-visual-storyteller. El proyecto es Visteapy:
tienda de ropa organizada por 7 "modos" o universos de estilo.
Concepto central: "Ropa para cada versión de ti. ¿Cuál eres hoy?"

Diseña la narrativa visual para:
1. El viaje emocional del usuario desde que entra a la home hasta que reserva una pieza
2. El storytelling de cada modo como universo con identidad propia
3. Los momentos de revelación en el scroll que generen deseo

Los 7 modos: Magia Académica / Regencia / Riviera / Sastre / Romántica Oscura /
Francesa Casual / Noche de Terciopelo

### Usar skill: wireframe-sketch (de open-design)
Leer /tmp/open-design/skills/wireframe-sketch/ y producir wireframes para:
- Home (layout editorial asimétrico)
- Página de modo individual
- Mobile layout

### Activar: design-ui-designer
Activa el agente design-ui-designer. Diseña el sistema visual para Visteapy:

PALETA:
- bone #FAF7F2 (fondo principal)
- ink #0F0F0F (texto)
- fog #E8E4DD (fondo secundario)
- terracota #C1622F (acento de marca — usar con PARSIMONIA)

TIPOGRAFÍA:
- Playfair Display: títulos, serif editorial, usada a 80px-200px en desktop
- Inter: cuerpo, labels, caps + tracking wide para elementos secundarios
- JetBrains Mono (añadir): precios, referencias técnicas de producto

PERSONALIDAD: Editorial de lujo silenciosa. Referencias: The Row, Bottega Veneta.
NO es minimalismo vacío. Es minimalismo con tensión y propósito.

Entrega:
1. Sistema de componentes: Navbar, Hero, ModeCard, ProductCard, Footer
2. Especificaciones de spacing y grid (layout asimétrico)
3. Estados interactivos (hover, focus, active) para cada componente
4. Tokens de animación: duration, easing, stagger values

### Activar: design-whimsy-injector
Activa el agente design-whimsy-injector. El sitio Visteapy necesita momentos
de personalidad y deleite que lo hagan memorable sin perder elegancia.
Propón 5 micro-interacciones o momentos sorpresa específicos que:
- Sean inesperados pero coherentes con una marca editorial de lujo
- Refuercen el concepto de "modos" como identidades propias
- Funcionen para el usuario aspiracional (20-30) y el de criterio (25-40)
Incluye especificaciones técnicas de implementación para cada uno.

### Usar skill: critique (de open-design)
Después de generar el diseño, leer /tmp/open-design/skills/critique/ y usarlo
para hacer una crítica del diseño antes de implementar.
¿Qué es genérico? ¿Qué contradice la identidad de marca? ¿Qué puede ser más audaz?

---

## FASE 3 — SISTEMA DE IDENTIDAD POR MODO

### Activar: design-brand-guardian
Activa el agente design-brand-guardian. Visteapy tiene un sistema de "modos"
(universos de estilo). Cada modo debe tener identidad visual propia pero
coherente con la marca paraguas.

Crea las guías de identidad para cada modo:
- Magia Académica: tono verde musgo oscuro, sensación de biblioteca antigua
- Regencia: azul prussian profundo, dorado sutil, dramático
- Riviera: azul mediterráneo, blanco cal, luminoso
- Sastre: gris carbón, líneas precisas, poder ejecutivo
- Romántica Oscura: bordó profundo, pétalos, sombra
- Francesa Casual: arena cálida, espontáneo, cotidiano
- Noche de Terciopelo: negro absoluto, brillo, noche

Para cada modo entrega:
- Color hex exacto del acento
- Descriptor en 3 palabras
- Pregunta retórica que lo representa
- Imagen tipo/mood en palabras
- Tipografía tratamiento específico (size, weight, tracking)
- Temperatura emocional del hover/transición

---

## FASE 4 — ESTRATEGIA DE MARKETING DIGITAL

### Activar: marketing-instagram-curator
Activa el agente marketing-instagram-curator. Visteapy es una tienda de moda
colombiana. Cada "modo" es un universo de estilo. El concepto: las mujeres tienen
múltiples versiones de sí mismas y la ropa las ayuda a expresarlas.

Entrega:
1. Estrategia de contenido Instagram para los primeros 30 días post-lanzamiento
2. Cómo traducir los 7 modos a contenido visual de Instagram/Reels
3. Tipo de posts, frecuencia, hashtags estratégicos
4. Cómo integrar el feed de Instagram al sitio web de manera elegante

### Activar: marketing-social-media-strategist
Activa el agente marketing-social-media-strategist. Define la estrategia de
lanzamiento digital de Visteapy en Colombia:
- Canales prioritarios y por qué
- Voz de marca en cada canal (Instagram vs TikTok vs WhatsApp)
- Cómo el concepto de "modos" se convierte en contenido viral
- KPIs de los primeros 90 días

### Activar: marketing-content-creator
Activa el agente marketing-content-creator. Crea el copy para todo el sitio web.

Copy a reemplazar (de genérico a voz de marca):
- "Productos" → _____
- "Ver todos" → _____
- Hero tagline → algo que comunique "ropa para cada versión de ti"
- Sección modos → texto introductorio
- Cada modo: descriptor + pregunta retórica + primer párrafo de su página
- Manifesto completo (para /manifiesto)
- Copy de todos los botones CTA
- Mensajes WhatsApp pre-llenados por modo
- Textos del footer

Voz: íntima, directa, poética sin pretensión. Como una amiga con criterio
impecable. Primera persona hacia la usuaria.

### Activar: marketing-seo-specialist
Activa el agente marketing-seo-specialist. Optimiza el SEO de Visteapy para
Colombia. Páginas: / , /modo/[slug] (7 modos), /manifiesto, /contacto.
Stack: Next.js 14 App Router.
Entrega: metadata strategy, keywords por página, structured data para productos,
implementación en App Router.

---

## FASE 5 — PROTOTIPO Y VALIDACIÓN

### Usar skill: web-prototype (de open-design)
Leer /tmp/open-design/skills/web-prototype/ y construir un prototipo HTML
interactivo de la homepage nueva antes de tocar el código de Next.js.
Esto permite validar visualmente el diseño sin romper el sitio actual.

### Usar skill: magazine-poster (de open-design)
Leer /tmp/open-design/skills/magazine-poster/ y crear un poster editorial
de cada modo que sirva como:
a) Asset de Instagram/marketing
b) Guía visual para el hero de cada página de modo

### Usar skill: social-carousel (de open-design)
Leer /tmp/open-design/skills/social-carousel/ y crear los carruseles de
introducción a los 7 modos que también sirvan para Instagram.

### Usar skill: motion-frames (de open-design)
Leer /tmp/open-design/skills/motion-frames/ y especificar los frames clave
de las animaciones principales: entrada del hero, transición entre modos,
scroll-driven manifesto, page transitions.

---

## FASE 6 — IMPLEMENTACIÓN (ahora sí, código)

Con todos los outputs anteriores como guía, implementar en el repo actual.

Stack: Next.js 14 + TypeScript + Tailwind CSS + Framer Motion + Supabase

### Archivos a CREAR:
- lib/modeIdentities.ts (colores, descriptores, preguntas por modo)
- lib/animations.ts (variantes Framer Motion centralizadas)
- lib/siteContent.ts (todo el copy del sitio)
- components/ui/CustomCursor.tsx (cursor editorial, solo desktop, pointer: fine)

### Archivos a MODIFICAR (en este orden):
1. components/Navbar.tsx
2. components/Hero.tsx
3. components/ModesGrid.tsx + ModeCard.tsx
4. app/modo/[slug]/page.tsx
5. components/FavoritesSection.tsx
6. components/ManifestoSection.tsx
7. components/Footer.tsx
8. app/layout.tsx
9. app/globals.css

### Identidades por modo (lib/modeIdentities.ts):
```typescript
export const modeIdentities = {
  'magia-academica': {
    accent: '#2D4A22',
    descriptor: 'Curiosa. Profunda. Atemporal.',
    question: '¿Qué versión de ti vive entre páginas y pergaminos?',
    number: '01'
  },
  'regencia': {
    accent: '#1B3A5C',
    descriptor: 'Dramática. Exquisita. Irresistible.',
    question: '¿Cuándo fue la última vez que entraste a un cuarto y lo cambiaste todo?',
    number: '02'
  },
  'riviera': {
    accent: '#4A7FA5',
    descriptor: 'Luminosa. Libre. Mediterránea.',
    question: '¿Cuándo fue la última vez que el sol te dio en la cara sin pedir permiso?',
    number: '03'
  },
  'sastre': {
    accent: '#2A2A2A',
    descriptor: 'Precisa. Poderosa. Sin excusas.',
    question: '¿Qué versión de ti no pide permiso para ocupar espacio?',
    number: '04'
  },
  'romantica-oscura': {
    accent: '#4A1528',
    descriptor: 'Intensa. Misteriosa. Verdadera.',
    question: '¿Qué tan profundo puede ir tu estilo?',
    number: '05'
  },
  'francesa-casual': {
    accent: '#C4A882',
    descriptor: 'Fácil. Espontánea. Siempre lista.',
    question: '¿Y si hoy no tienes que intentarlo tanto?',
    number: '06'
  },
  'noche-de-terciopelo': {
    accent: '#080808',
    descriptor: 'Nocturna. Magnética. Inevitable.',
    question: '¿Quién eres cuando la noche te da permiso de ser tú misma?',
    number: '07'
  }
}
```

### Sistema de animaciones (lib/animations.ts):
```typescript
import { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
}

export const imageReveal: Variants = {
  hidden: { scale: 1.08, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5 } }
}
```

---

## FASE 7 — QA FINAL

### Activar: design-ux-researcher (segunda pasada)
Evalúa el resultado final contra los dos perfiles definidos en Fase 1.
¿El sitio convierte para la mujer 20-30 aspiracional?
¿Y para la de 25-40 con criterio?
Lista los 3 cambios más impactantes que quedarían para v2.

### Usar skill: critique (de open-design) — segunda pasada
Crítica final del sitio implementado. ¿Cumple el brief?
¿Hay algo que aún se sienta genérico?

---

## CHECKLIST DE ÉXITO

- [ ] Alguien ve el sitio 5 segundos y recuerda que se llama Visteapy
- [ ] Cada modo tiene color, descriptor y pregunta retórica propia
- [ ] El copy suena como una persona real hablándote, no un e-commerce
- [ ] El cursor personalizado existe y funciona en desktop
- [ ] Mobile es igual de hermoso (sin parallax, sin cursor custom)
- [ ] No hay animación que se sienta como template de Framer Motion
- [ ] La terracota aparece máximo 3-4 veces en toda la página
- [ ] Los precios están en fuente monospace
- [ ] prefers-reduced-motion está respetado

---

## CONTEXTO TÉCNICO
- Repo: https://github.com/angieLeticia/visteapy-web
- Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion + Supabase
- Deploy: Vercel (auto en push a main)
- Paleta: bone #FAF7F2 / ink #0F0F0F / fog #E8E4DD / terracota #C1622F
- Fuentes actuales: Playfair Display + Inter (añadir JetBrains Mono)
- Imágenes: Unsplash placeholders (reemplazar por fotos reales al lanzar)
- WhatsApp: 57XXXXXXXXXX (pendiente número real)
- Supabase: tablas modes + products, RLS solo lectura pública
- Variables de entorno: NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
