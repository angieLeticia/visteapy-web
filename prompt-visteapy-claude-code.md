# Proyecto: Rediseño de visteapy.com

## Contexto del proyecto

Estoy trabajando en **visteapy.com**, una tienda de moda colombiana femenina con identidad cinematográfica ("vístete como tu película favorita"). El sitio está construido en **Next.js App Router + Tailwind CSS**.

Tengo el repositorio clonado localmente. Antes de hacer cualquier cambio, abre el proyecto y revisa la estructura de archivos y el código existente para entender la arquitectura actual.

---

## Referencia de diseño

Toma inspiración visual de **https://www.paulylingerie.com/** — en especial estos elementos:
- Cómo presenta los productos desde el primer scroll (hero con productos visibles)
- La forma en que los product cards muestran precio, nombre y CTA de forma limpia
- La navegación: cómo está organizada y qué tan prominente es el call-to-action de compra
- El tono premium y elegante sin perder legibilidad

No copies el diseño literal — adáptalo a la identidad de Visteapy (colores: `ink` para oscuro, `bone` para crema, `violet` para acento, `fog` para gris claro).

---

## Herramienta: open-design

Clona y revisa el repositorio **https://github.com/nexu-io/open-design** para usar sus componentes UI pre-construidos. El objetivo es **ahorrar tokens y tiempo** usando componentes listos en lugar de escribir todo desde cero. Antes de implementar cualquier componente nuevo (cards de producto, navegación, hero, etc.), revisa qué ofrece open-design y úsalo como base.

Instrucciones:
1. Revisa el README y la estructura de componentes disponibles en open-design
2. Identifica qué componentes se pueden adaptar para cada sección
3. Instala las dependencias necesarias si las hubiera
4. Adapta los componentes al sistema de diseño de Visteapy (tokens de color y tipografía existentes)

---

## Cambios a implementar

### 1. Hero / Portada (PRIORIDAD ALTA)

**Problema actual:** El hero tiene imagen full-screen con texto poético pero NO muestra productos. El usuario tiene que hacer scroll para ver qué se vende.

**Objetivo:** Mostrar los productos/modos desde la primera pantalla visible, sin perder el impacto cinematográfico.

**Qué hacer:**
- Rediseña el hero para que incluya una vista previa de al menos 2-3 "Modos" (productos) visibles en el viewport inicial — pueden ser thumbnails, un carrusel horizontal, o un layout dividido (imagen grande + grid lateral)
- Agrega un CTA claro de compra ("Ver looks" / "Explorar modos") visible sin hacer scroll
- Revisa y mejora el slogan actual: *"Vístete como tu película favorita"* y *"Cada prenda, una escena. Cada outfit, una historia."* — propón 2-3 variantes más atractivas y con más gancho comercial, manteniendo el tono cinematográfico y poético de la marca

### 2. Grilla de productos — "Los Modos" (PRIORIDAD ALTA)

**Problema actual:** Los cards de modos son visualmente bonitos pero están orientados a la exploración, no a la conversión. El texto descriptivo del hover solo aparece en hover y no hay precio ni CTA directa de compra.

**Objetivo:** Mejorar los product cards para aumentar la intención de compra.

**Qué hacer:**
- Rediseña los cards de "Los Modos" usando componentes de open-design como base
- Agrega información de precio o rango de precios si está disponible en los datos
- Haz el CTA ("Ver looks" / botón de compra) más prominente y visible sin necesidad de hover
- Mejora la jerarquía visual: nombre del modo → tagline → CTA
- Considera agregar un badge o indicador de "Nuevo" / "Popular" si el dato existe
- Mantén el aspect ratio 3:4 y la estética editorial actual

### 3. Navegación / Header (PRIORIDAD MEDIA)

**Problema actual:** La navegación es muy minimalista (solo Modos / Manifiesto / Contacto). Para una tienda, falta orientación hacia la compra.

**Objetivo:** Mejorar la navegación para facilitar el journey de compra.

**Qué hacer:**
- Evalúa si se debe agregar un ícono de carrito / bolsa en el header
- Considera agregar un CTA secundario visible en el header (ej: "Comprar" o "Ver colección")
- Mejora la visibilidad del header en mobile (el menú hamburguesa actual es muy discreto)
- Usa componentes de open-design para el header/navbar si hay algo apropiado

---

## Restricciones importantes (NO cambiar)

- **Paleta de colores actual**: mantén los tokens `ink`, `bone`, `violet`, `fog`, `fog-dark`
- **Tipografía**: mantén la fuente serif para títulos y sans para cuerpo
- **Identidad de marca**: cinematográfica, poética, colombiana — nada que suene genérico o de e-commerce masivo
- **Performance**: el sitio ya tiene buenas prácticas de imagen (lazy loading, Unsplash con params). Mantenlas.
- **Animaciones**: mantén las transiciones suaves (`ease-cinematic`, `duration-700`) que ya existen

---

## Entregables esperados

1. Los archivos modificados con los cambios implementados
2. Un resumen de qué componentes de open-design usaste y cómo los adaptaste
3. Las 3 variantes de slogan propuestas para que yo elija
4. Si encontraste decisiones de diseño ambiguas, documéntalas para que yo las revise

---

## Orden de trabajo recomendado

1. Analiza la estructura del repo local de visteapy.com
2. Clona y revisa open-design para identificar componentes útiles
3. Implementa el Hero rediseñado (incluye propuestas de slogan)
4. Implementa la grilla de productos mejorada
5. Implementa los cambios de navegación
6. Revisa que todo sea responsive (mobile-first)
