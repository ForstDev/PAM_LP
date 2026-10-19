"use client";

import { m } from "motion/react";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";
import { SectionEyebrow } from "@/components/SectionEyebrow";

// Texto alineado a la izquierda y con ancho de línea de ~60 caracteres: los
// párrafos centrados y largos se leen peor que los alineados a un borde.
export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-verde px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <GlowOrb className="left-8 top-16 h-56 w-56 bg-celeste/20 blur-2xl sm:h-64 sm:w-64" />
      <GlowOrb className="bottom-16 right-8 h-48 w-48 bg-celeste/50 blur-2xl sm:h-56 sm:w-56" />

      <div className="relative mx-auto grid max-w-[72rem] gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <Reveal>
          <SectionEyebrow lineClassName="bg-foreground">Movimiento MÁS</SectionEyebrow>
          <h2 className="mt-5 leading-tight">
            <span className="text-impact block text-4xl font-bold sm:text-6xl">
              La ayuda empieza aquí
            </span>
            <span className="mt-4 block text-xl font-semibold text-foreground sm:text-2xl">
              Somos el motor benéfico del Movimiento MÁS.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-[60ch] text-lg leading-relaxed text-foreground">
            MÁS es un movimiento caritativo inspirado en las enseñanzas de
            Margot sobre compasión y generosidad. Nació para resolver la crisis
            global de donaciones, donde la necesidad crece rápido y el
            financiamiento depende de muy pocas personas.
          </p>
          <p className="mt-4 max-w-[60ch] border-l-4 border-foreground pl-4 text-lg font-semibold leading-relaxed text-foreground">
            AyudemosMás es una alternativa para descentralizar las donaciones:
            la ayuda no debe depender de unos pocos, sino de todos.
          </p>
          <m.a
            href={`mailto:${site.alliancesEmail}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-celeste px-7 py-4 text-base font-semibold text-foreground"
          >
            <Mail className="h-5 w-5" strokeWidth={1.75} />
            Escríbenos a {site.alliancesEmail}
          </m.a>
        </Reveal>
      </div>
    </section>
  );
}
