"use client";

import { m } from "motion/react";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";

// Texto alineado a la izquierda y con ancho de línea de ~60 caracteres: los
// párrafos centrados y largos se leen peor que los alineados a un borde.
export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-verde px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <GlowOrb className="left-8 top-16 h-56 w-56 bg-celeste/20 blur-2xl sm:h-64 sm:w-64" />
      <GlowOrb className="bottom-16 right-8 h-48 w-48 bg-celeste/50 blur-2xl sm:h-56 sm:w-56" />

      <div className="relative mx-auto grid max-w-[72rem] gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
        <Reveal>
          <h2 className="leading-tight">
            <span className="text-impact block text-balance text-4xl font-bold sm:text-6xl">
              La ayuda empieza aquí
            </span>
            <span className="mt-4 block text-xl font-semibold text-foreground sm:text-2xl">
              Somos el motor benéfico del Movimiento MÁS.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-[60ch] text-lg leading-relaxed text-foreground">
            MÁS es un movimiento cultural humanitario inspirado en las
            enseñanzas de Margot sobre compasión y generosidad. Nació ante la
            crisis global de donaciones. La necesidad crece rápido y el
            financiamiento está en caída.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="relative mt-12 flex justify-center">
          <m.a
            href={`mailto:${site.alliancesEmail}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex max-w-full items-center gap-2 rounded-full bg-celeste px-5 py-4 text-sm font-semibold text-foreground sm:px-7 sm:text-base"
          >
            <Mail className="h-5 w-5" strokeWidth={1.75} />
            Escríbenos a {site.alliancesEmail}
          </m.a>
        </div>
      </Reveal>
    </section>
  );
}
