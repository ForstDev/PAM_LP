"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Respeta prefers-reduced-motion en todas las animaciones de Motion del
 * sitio (Reveal, círculos, barras): con la preferencia activa se quitan los
 * desplazamientos y escalas y solo quedan los cambios de opacidad.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
