"use client";

import { useState } from "react";
import { m } from "motion/react";
import { Check } from "lucide-react";
import { StatCounter } from "@/components/StatCounter";

const values = ["Cero crueldad animal", "Opciones vegetarianas", "Opciones veganas"];

/**
 * Número puro (sin fondo) que cuenta de 0 a 100, y solo después de terminar
 * de contar aparece el texto que explica a qué va ese 100%. Debajo, los
 * valores del catálogo (siempre visibles); desde sm los checks quedan en una
 * columna recta pegada al borde derecho.
 */
export function ProfitCounter() {
  const [done, setDone] = useState(false);

  return (
    <div className="flex-shrink-0 text-left sm:text-right">
      <p className="text-5xl font-bold text-foreground sm:text-6xl">
        <StatCounter to={100} suffix="%" onComplete={() => setDone(true)} />
      </p>
      <m.p
        initial={{ opacity: 0, y: 6 }}
        animate={done ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-1 max-w-[13rem] text-xs leading-snug text-foreground"
      >
        de las ganancias va a organizaciones y causas sociales.
      </m.p>
      <ul className="mt-5 space-y-2">
        {values.map((value) => (
          <li
            key={value}
            className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-foreground sm:flex-row-reverse sm:justify-start"
          >
            <span
              aria-hidden
              className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-verde/40"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
