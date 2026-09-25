import { Handshake } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/Reveal";
import { SignatureCircle } from "@/components/SignatureCircle";
import { GlowOrb } from "@/components/GlowOrb";

export function NgoSection() {
  return (
    <section id="afiliacion" className="relative isolate overflow-hidden bg-celeste/8 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <GlowOrb className="-right-16 top-1/2 h-80 w-80 -translate-y-1/2 bg-verde/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <h2 className="font-serif text-3xl font-bold uppercase leading-tight text-foreground sm:text-4xl">
            ¿Representas una organización con una causa social?
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
            Súmate como aliada y recibe un fondo constante gracias a cada
            compra que hacemos juntos, sin depender de una sola donación.
          </p>
          <a
            href={waLink("Hola, represento a una organización con una causa social y quiero conversar sobre una alianza.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-verde px-8 py-4 text-base font-semibold text-foreground transition-transform hover:scale-105"
          >
            Conversemos
          </a>
        </Reveal>

        <Reveal delay={0.15} className="hidden justify-self-center lg:block">
          <SignatureCircle color="verde" className="h-56 w-56" circleClassName="inset-0">
            <div className="relative flex h-56 w-56 items-center justify-center">
              <div
                aria-hidden
                className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-celeste"
              />
              <div
                aria-hidden
                className="absolute -bottom-3 -left-6 h-14 w-14 rounded-full bg-celeste/70"
              />
              <Handshake className="h-16 w-16 text-foreground" strokeWidth={1.5} />
            </div>
          </SignatureCircle>
        </Reveal>
      </div>
    </section>
  );
}
