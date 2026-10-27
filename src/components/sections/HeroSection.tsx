import Image from "next/image";
import { GlowOrb } from "@/components/GlowOrb";
import { HeroContent } from "./HeroContent";

export function HeroSection() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <Image
          src="/hero-voluntarios-v3.webp"
          alt="Voluntarios de AyudemosMás con polos blancos levantan juntos un panel de madera para construir una vivienda en una zona arenosa"
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/55 to-navy/20" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy/70 to-transparent" />
        <GlowOrb className="-left-24 -top-24 h-96 w-96 bg-verde/30 blur-2xl sm:h-[32rem] sm:w-[32rem]" />
      </div>
      {/* La foto está editada: la aclaración va como texto real (no dentro de
          la imagen) para que se lea en cualquier ancho de pantalla. */}
      <p className="absolute bottom-3 right-3 z-10 rounded-full bg-navy/60 px-3 py-1 text-[11px] italic text-white backdrop-blur-sm sm:bottom-auto sm:right-6 sm:top-6 sm:text-xs">
        *La forma en la que quisiéramos vernos en el futuro.
      </p>

      <HeroContent />
    </section>
  );
}
