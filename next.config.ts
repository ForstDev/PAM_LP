import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// CSP: la página se prerenderiza de forma estática (SSG), así que no hay un
// nonce por petición posible sin volverla dinámica. Next inyecta scripts
// inline de hidratación y nosotros añadimos el JSON-LD inline en
// src/app/layout.tsx, por eso script-src necesita 'unsafe-inline'.
// 'unsafe-eval' y ws: solo se permiten en desarrollo (HMR / React Refresh).
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  // motion y next/font inyectan estilos inline.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  // Fuentes autohospedadas con next/font/local.
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  // Solo en producción, para no romper http://localhost en desarrollo.
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  // Sin `preload` por ahora: el dominio propio aún no está conectado. Se puede
  // añadir `; preload` más adelante, cuando el dominio sea definitivo.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  images: {
    // 75 es el valor por defecto; 85 solo se usa en la foto del hero.
    qualities: [75, 85],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
