import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const IMAGES = [
  "/hero-voluntarios-v3.webp",
  "/quienes-somos-cumbre-v2.webp",
  "/manos-circulo.webp",
  "/opengraph-image",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.domain,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: IMAGES.map((path) => `${site.domain}${path}`),
    },
  ];
}
