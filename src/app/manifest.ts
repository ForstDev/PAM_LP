import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AyudemosMás",
    short_name: "AyudemosMás",
    description: "Espacio Digital solidario. Es hora de ayudar.",
    start_url: "/",
    display: "standalone",
    lang: "es-PE",
    background_color: "#ffffff",
    theme_color: "#7FDBC2",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
