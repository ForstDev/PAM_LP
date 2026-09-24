"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Color = "verde" | "celeste";

const colorMap: Record<Color, string> = {
  verde: "bg-verde",
  celeste: "bg-celeste",
};

/**
 * El círculo de color detrás de fotos/íconos — elemento de firma del manual
 * de marca. El círculo "revela" el contenido al entrar en viewport.
 */
export function SignatureCircle({
  color = "verde",
  className = "",
  circleClassName = "",
  children,
}: {
  color?: Color;
  className?: string;
  circleClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`absolute rounded-full ${colorMap[color]} ${circleClassName}`}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
}
