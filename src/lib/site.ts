/**
 * URL pública del sitio (sin barra final), resuelta en build:
 * 1. NEXT_PUBLIC_SITE_URL: override manual (URL completa) para forzar el dominio.
 * 2. VERCEL_PROJECT_PRODUCTION_URL: dominio de producción del proyecto en Vercel.
 *    Cuando se añada el dominio propio en Vercel, se toma automáticamente en el
 *    siguiente deploy (hasta entonces es el *.vercel.app).
 * 3. VERCEL_URL: host del deployment concreto.
 * 4. localhost en desarrollo.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const deployment = process.env.VERCEL_URL;
  const url = explicit
    ? explicit
    : production
      ? `https://${production}`
      : deployment
        ? `https://${deployment}`
        : "http://localhost:3000";
  return url.replace(/\/+$/, "");
}

// Datos oficiales del Manual de Marca AyudemosMás (versión actualizada).
export const site = {
  name: "AyudemosMás",
  claim: "Entorno multiplataforma solidario",
  reach: "Ayudemos al Perú y al Mundo.",
  tagline: "Es hora de ayudar.",
  domain: resolveSiteUrl(),
  email: "contacto@ayudemosmas.org",
  alliancesEmail: "alianzas@ayudemosmas.org",
  instagram: "https://www.instagram.com/ayudemosmas.oficial/",
  instagramHandle: "@ayudemosmas.oficial",
  tiktok: "https://www.tiktok.com/@ayudemosmas.oficial",
  tiktokHandle: "@ayudemosmas.oficial",
  movementInstagram: "https://www.instagram.com/mas.proyectosbeneficos/",
  movementInstagramHandle: "@mas.proyectosbeneficos",
  movementTiktok: "https://www.tiktok.com/@mas.proyectosbeneficos",
  movementTiktokHandle: "@mas.proyectosbeneficos",
} as const;

/** Tienda de AyudemosMás Delivery en Shopify. Los botones que usan ShopLink la abren en una pestaña nueva. */
export const SHOP_URL: string | null = "https://delivery.ayudemosmas.org/";

