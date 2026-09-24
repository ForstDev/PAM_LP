"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Envoltorio de entrada estándar — fade + translateY al entrar en viewport.
 * Firma de movimiento del sitio: 450ms ease-out, sin rebote. Usar `delay`
 * para escalonar (stagger) elementos dentro de la misma sección.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
