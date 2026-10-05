"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue } from "motion/react";

/**
 * Contador que sube al entrar en viewport — gesto de firma para las cifras
 * del hambre. Respeta prefers-reduced-motion mostrando el valor final directo.
 */
export function StatCounter({
  to,
  suffix = "",
  decimals = 0,
  className = "",
  onComplete,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  className?: string;
  onComplete?: () => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);

  // Formato del tablero del cliente: coma decimal y espacio fino para miles
  // (19 642), sin agrupar los números de 4 cifras.
  const format = (value: number) => {
    const [int, dec] = value.toFixed(decimals).split(".");
    const grouped =
      int.length > 4 ? int.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0") : int;
    return `${grouped}${dec ? "," + dec : ""}${suffix}`;
  };

  useEffect(() => {
    if (!ref.current) return;
    ref.current.textContent = format(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suffix, decimals]);

  useEffect(() => {
    if (!isInView) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      if (ref.current) {
        ref.current.textContent = format(to);
      }
      onComplete?.();
      return;
    }

    const controls = animate(count, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = format(latest);
        }
      },
      onComplete: () => onComplete?.(),
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, to, suffix, decimals, count]);

  return (
    <span ref={ref} className={className}>
      {format(0)}
    </span>
  );
}
