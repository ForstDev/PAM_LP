import { ImageIcon } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";

export function NgoSection() {
  return (
    <section id="afiliacion" className="relative isolate overflow-hidden bg-celeste/8 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <GlowOrb className="-right-16 top-1/2 h-80 w-80 -translate-y-1/2 bg-verde/20 blur-2xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            ¿Representas una organización con una causa social?
          </h2>
          <p className="text-impact mt-4 text-2xl sm:text-3xl">
            ¿Formamos la alianza?
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

        <Reveal delay={0.15} className="mx-auto w-full max-w-xs justify-self-center lg:max-w-none">
          <div className="relative rounded-[2rem] bg-white p-3 shadow-lg">
            <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-[1.5rem] bg-verde/20 sm:h-56">
              <ImageIcon className="h-12 w-12 text-foreground/40" strokeWidth={1.25} />
            </div>
            <div
              aria-hidden
              className="absolute -right-3 -top-3 h-12 w-12 rounded-full bg-celeste"
            />
            <div
              aria-hidden
              className="absolute -bottom-3 -left-3 h-9 w-9 rounded-full bg-verde"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
