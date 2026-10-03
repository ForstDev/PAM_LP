"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { StatCounter } from "@/components/StatCounter";

/**
 * Número puro (sin fondo) que cuenta de 0 a 100, y solo después de terminar
 * de contar aparece el texto que explica a qué va ese 100%.
 */
export function ProfitCounter() {
  const [done, setDone] = useState(false);

  return (
    <div className="flex-shrink-0 text-right">
      <p className="text-5xl font-bold text-foreground sm:text-6xl">
        <StatCounter to={100} suffix="%" onComplete={() => setDone(true)} />
      </p>
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={done ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-1 max-w-[13rem] text-xs leading-snug text-foreground"
      >
        de las ganancias va a causas sociales, una vez cubiertos los costos
        operativos.
      </motion.p>
    </div>
  );
}
