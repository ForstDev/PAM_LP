"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { SignatureCircle } from "@/components/SignatureCircle";

// Foto con el sistema de imágenes del manual: recorte circular, círculo de
// color detrás y anillos finos como en el brochure. Los anillos se dibujan
// al entrar en pantalla y la etiqueta flota sobre el borde de la foto.
export function RecambioFeature() {
  return (
    <div className="relative mx-auto mt-16 max-w-[84rem] overflow-hidden rounded-[2.5rem] bg-azul/15 px-6 py-14 sm:px-12 lg:px-16 lg:py-16">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-0.5 w-8 bg-azul" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Diálogo plural
            </p>
          </div>
          <p className="mt-5 max-w-xl text-xl leading-relaxed text-foreground sm:text-2xl">
            Cuando nuestra misión se cruza con asuntos públicos, valoramos el
            diálogo plural y apartidario.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground">
            Por eso asistimos a una conversación de Recambio en la Cumbre Perú
            Sostenible 2026 para aprender sobre democracia y sostenibilidad.
          </p>
          <a
            href="https://www.recambio.pe/"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-verde px-7 py-3.5 text-base font-semibold text-foreground transition-transform hover:scale-105"
          >
            Conoce a Recambio
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.75}
            />
          </a>
        </Reveal>

        <div className="order-1 mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:order-2 lg:max-w-none">
          <div className="relative p-8 sm:p-10">
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="absolute inset-0 rounded-full border border-verde"
            />
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
              className="absolute inset-3 rounded-full border border-celeste sm:inset-4"
            />
            <SignatureCircle
              color="azul"
              className="w-full"
              circleClassName="-bottom-4 -right-4 h-[80%] w-[80%]"
            >
              <Image
                src="/recambio-cumbre.jpg"
                alt="Conversación de Recambio en la Cumbre Perú Sostenible 2026"
                width={480}
                height={480}
                className="aspect-square w-full rounded-full object-cover object-[50%_58%]"
                sizes="(min-width: 1024px) 384px, 320px"
              />
            </SignatureCircle>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
              className="absolute -bottom-1 left-1/2 w-max max-w-[92%] -translate-x-1/2 rounded-full bg-white px-4 py-2 text-center text-xs font-medium text-foreground shadow-lg shadow-azul/30 sm:text-sm"
            >
              Cumbre Perú Sostenible 2026
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
