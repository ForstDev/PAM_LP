"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

const loadFeatures = () =>
  import("./motionFeatures").then((mod) => mod.default);

/**
 * Carga Motion de forma diferida (los componentes usan `m`, la versión
 * liviana) y respeta prefers-reduced-motion en todas las animaciones: con la
 * preferencia activa se quitan desplazamientos y escalas.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
