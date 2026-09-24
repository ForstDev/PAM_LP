"use client";

import { motion } from "motion/react";
import { waLink } from "@/lib/whatsapp";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function HeroContent() {
  return (
    <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-4 pb-20 pt-32 sm:px-6 sm:pb-28 lg:px-8">
      <motion.h1
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="max-w-2xl text-[clamp(2rem,4.5vw+1rem,4rem)] font-bold leading-tight text-white"
      >
        Transformamos tu compra en ayuda real.
      </motion.h1>

      <motion.p
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
        className="mt-6 max-w-xl text-lg leading-relaxed text-white/90"
      >
        Cada compra que haces con nosotros se convierte en ayuda directa
        contra el hambre en el Perú. 100% de las ganancias, siempre
        transparentes.
      </motion.p>

      <motion.div
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        className="mt-8"
      >
        <a
          href={waLink("Hola, quiero comprar y ayudar. ¿Me ayudan con el catálogo?")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-verde px-8 py-4 text-base font-semibold text-foreground transition-transform hover:scale-105"
        >
          Comprar y ayudar
        </a>
      </motion.div>
    </div>
  );
}
