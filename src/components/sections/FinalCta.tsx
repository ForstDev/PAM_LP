"use client";

import { motion } from "motion/react";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-verde px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
      <GlowOrb className="left-8 top-16 h-56 w-56 bg-celeste/20 blur-2xl sm:h-64 sm:w-64" />
      <GlowOrb className="bottom-16 right-8 h-48 w-48 bg-celeste/50 blur-2xl sm:h-56 sm:w-56" />

      <Reveal className="relative mx-auto max-w-2xl">
        <h2 className="text-impact text-3xl font-bold leading-tight sm:text-5xl">
          La ayuda empieza aquí
        </h2>
        <p className="mt-4 text-lg text-foreground">
          Escríbenos por cualquier duda, propuesta o idea.
        </p>
        <motion.a
          href={waLink("Hola, me gustaría conversar con PerúAyudemosMás.")}
          target="_blank"
          rel="noopener noreferrer"
          animate={{ scale: [1, 1.035, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.08 }}
          className="mt-8 inline-block rounded-full bg-celeste px-8 py-4 text-base font-semibold text-foreground"
        >
          Escríbenos
        </motion.a>
      </Reveal>
    </section>
  );
}
