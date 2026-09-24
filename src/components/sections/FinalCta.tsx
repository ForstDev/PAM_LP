"use client";

import { motion } from "motion/react";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-verde px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
      <GlowOrb className="-left-16 -top-20 h-64 w-64 bg-celeste/25 blur-2xl sm:h-80 sm:w-80" />
      <GlowOrb className="-bottom-24 -right-10 h-52 w-52 bg-celeste/60 blur-2xl sm:h-72 sm:w-72" />

      <Reveal className="relative mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-5xl">
          Es hora de ayudar.
        </h2>
        <motion.a
          href={waLink("Hola, quiero comprar y ayudar. ¿Me ayudan con el catálogo?")}
          target="_blank"
          rel="noopener noreferrer"
          animate={{ scale: [1, 1.035, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.08 }}
          className="mt-8 inline-block rounded-full bg-celeste px-8 py-4 text-base font-semibold text-foreground"
        >
          Escríbenos por WhatsApp
        </motion.a>
      </Reveal>
    </section>
  );
}
