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
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);

  const format = (value: number) =>
    `${value.toLocaleString("es-PE", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;

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
