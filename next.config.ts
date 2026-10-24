import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 es el valor por defecto; 85 solo se usa en la foto del hero.
    qualities: [75, 85],
  },
};

export default nextConfig;
