# Stack técnico final — Landing PerúAyudemosMás

> Fusión de `propuesta-stack-paracaridad.md` (consejo de 5 asesores IA) y
> `prompt-stack-ayudemosmas.txt` (chat previo), resuelta contra la fuente de
> verdad del proyecto: `prompt-claude-code-peruayudemosmas.md`. Donde las dos
> propuestas asumían cosas que el brief final no pide, gana el brief.

## Decisión final

**Next.js 16 (App Router, Server Components maximizados, `'use client'` solo
donde hay interacción real) + TypeScript + Tailwind CSS v4 + Motion.**

| Capa | Elección | Por qué |
|---|---|---|
| Framework | Next.js 16, App Router, SSG/SSR (nunca CSR puro) | Coincide en ambas propuestas y con el requisito no-negociable de renderizado del brief |
| Lenguaje | TypeScript | Sin contradicción entre propuestas |
| Estilos | Tailwind CSS v4, tokens = paleta oficial del manual (`#7FDBC2`, `#66C0DA`, `#B597CB`) | v4 explícito en la propuesta del consejo; la otra no especifica versión, no hay conflicto real |
| Animación | Motion (ex-Framer Motion), uso discreto: fade + scale desde el círculo de marca, 400-500ms ease-out, contador para las cifras del hambre | Ambas propuestas coinciden en Motion como estándar; ambas descartan Lenis y cursor personalizado — aquí no aportan nada a un visitante que solo quiere llegar a WhatsApp |
| Tipografía | `next/font/google` — **Outfit** (principal) + **Tinos** como sustituto de FreeSerif (métricamente compatible con Times, la familia en la que se basa FreeSerif; alternativa de respaldo: PT Serif — a confirmar viendo ambas en la sección del hambre) | Autohospedado, sin request a terceros (mejor para Ley 29733), sin layout shift |
| Iconos | Lucide | Recomendado por la propuesta del consejo, sin objeción de la otra |
| Catálogo (6 categorías, mobile) | Embla Carousel si el layout de categorías necesita scroll horizontal en mobile | ~7KB, gestos táctiles nativos, sin estilos por defecto que puedan verse genéricos |
| Hosting | Vercel | Integración nativa con Next.js, preview deploys para que Iván revise antes de la Cumbre (24-set-2026) |
| Analítica | Vercel Web Analytics + Speed Insights | Cookieless, ayuda a minimizar datos capturados (Ley 29733), métrica de éxito: clics al botón de WhatsApp |
| SEO | Metadata API nativa + JSON-LD Organization/NGO + `sitemap.ts`/`robots.ts` | Landing de una sola página: no aplica la lógica de "cada página compite por su keyword" de un sitio multi-página |

## Descartado para esta versión (y por qué)

- **Procesador de pagos (Stripe/PayPal/Culqi/Niubiz).** El brief final es
  explícito: *"Sin carrito, sin pago en línea"*. El e-commerce completo
  (Shopify) es un desarrollo aparte del cliente que ni se menciona ni se
  enlaza desde esta landing. Esta era la única pieza donde las dos propuestas
  realmente contradecían al brief, no entre sí.
- **CMS headless (Sanity).** Tiene sentido para un catálogo real con fotos y
  precios por producto — no es este caso. Son 6 categorías (ícono + nombre +
  link de WhatsApp), placeholder pendiente de confirmar con Iván. Se maneja
  como un arreglo tipado en código; se reevalúa si el cliente pide
  autogestión del catálogo sin depender de un desarrollador.
- **React Hook Form + Zod + Server Actions + Resend/React Email.** La
  propuesta del consejo asumía un formulario de contacto. La estructura final
  no tiene ningún formulario — las 7 secciones resuelven todo con CTAs
  `wa.me` (incluida la sección para ONGs). No hay campo que capture datos
  personales, así que tampoco cambia nada del análisis de Ley 29733.
- **Radix UI / Base UI.** Sin modal, tabs ni acordeón en la estructura
  aprobada. Se incorpora solo si Tuning revela una necesidad real (ej. menú
  mobile), no por adelantado.
- **View Transitions API.** Resuelve transiciones entre páginas; esta landing
  es de una sola página con scroll vertical, no hay rutas entre las que
  transicionar.
- **GSAP/ScrollTrigger.** Gratis desde 2025 y coherente en ambas propuestas
  como "no obligatorio" — solo se justifica para secciones de scroll con pin,
  y la sección del hambre en la estructura final es una sección normal, no
  una secuencia pin-and-reveal. Se reabre solo si en Tuning se decide narrar
  el impacto de esa forma.
- **Aceternity UI / Magic UI, tsParticles, SplitType, canvas-confetti.**
  Decorativos y no pedidos por la dirección creativa, que además advierte
  explícitamente contra el tono "app juvenil genérica" — el riesgo de que se
  vea "hecho con plantilla" pesa más que el beneficio visual. Sin formulario
  de contacto tampoco hay momento de "confirmación" para el confetti.

## Regla para no reabrir este debate

Esta decisión se mantiene para toda la producción de esta landing. Se
reconsidera un ítem descartado solo si cambia el alcance del proyecto (ej.
el cliente pide checkout, o pide autogestión de catálogo) — nunca a mitad de
Tuning por preferencia estética.
