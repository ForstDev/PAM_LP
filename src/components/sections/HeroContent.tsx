"use client";

import { m } from "motion/react";
import { site } from "@/lib/site";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function HeroContent() {
  return (
    <div className="relative mx-auto flex min-h-[92vh] max-w-[84rem] flex-col justify-end px-4 pb-20 pt-32 sm:px-6 sm:pb-28 lg:px-8">
      <m.h1
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="max-w-2xl font-serif text-[clamp(2rem,4.5vw+1rem,4rem)] font-bold italic leading-tight text-white"
      >
        Transformamos tu compra en ayuda real
      </m.h1>

      <m.p
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
        className="mt-6 max-w-xl text-lg leading-relaxed text-white/90"
      >
        El 100% de nuestras ganancias va a organizaciones que trabajan en
        diversas causas sociales.
      </m.p>

      <m.div
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        className="mt-8"
      >
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-verde px-6 py-4 text-center text-[0.9375rem] font-semibold text-foreground transition-transform sm:px-8 sm:text-base hover:scale-105 active:scale-95"
        >
          Sé parte de nuestro punto de partida
        </a>
      </m.div>
    </div>
  );
}
