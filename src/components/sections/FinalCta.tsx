"use client";

import { m } from "motion/react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-verde px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
      <GlowOrb className="left-8 top-16 h-56 w-56 bg-celeste/20 blur-2xl sm:h-64 sm:w-64" />
      <GlowOrb className="bottom-16 right-8 h-48 w-48 bg-celeste/50 blur-2xl sm:h-56 sm:w-56" />

      <Reveal className="relative mx-auto max-w-3xl">
        <h2 className="leading-tight">
          <span className="text-impact block text-4xl font-bold sm:text-6xl">
            La ayuda empieza aquí
          </span>
          <span className="mt-3 block text-xl font-semibold text-foreground sm:text-2xl">
            Somos el proyecto benéfico motor del Movimiento MÁS
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground">
          MÁS es un movimiento caritativo nacido de las enseñanzas de Margot
          sobre compasión y generosidad. Surgió para enfrentar la crisis de las
          donaciones en el mundo: la necesidad crece más rápido que el
          financiamiento y gran parte de la ayuda depende de pocos donantes.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-relaxed text-foreground">
          AyudemosMás es una segunda fuente de donaciones: la ayuda no depende
          de unos pocos, depende de todos.
        </p>

        <p className="mx-auto mt-8 max-w-xl text-lg text-foreground">
          Si tienes alguna duda sobre AyudemosMás o el movimiento MÁS,
          escríbenos por correo.
        </p>
        <m.a
          href={`mailto:${site.alliancesEmail}`}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 inline-block rounded-full bg-celeste px-8 py-4 text-base font-semibold text-foreground"
        >
          Escribir a {site.alliancesEmail}
        </m.a>
      </Reveal>
    </section>
  );
}
