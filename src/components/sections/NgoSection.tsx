import Image from "next/image";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";

export function NgoSection() {
  return (
    <section id="afiliacion" className="relative isolate overflow-hidden bg-celeste/8 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <GlowOrb className="-right-16 top-1/2 h-80 w-80 -translate-y-1/2 bg-verde/20 blur-2xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <h2 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            ¿Representas una
            <br />
            organización
            <br />
            con una causa social?
          </h2>
          <p className="text-impact mt-4 text-2xl sm:text-3xl">
            Súmate para formar el cambio
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
            <div className="relative h-48 overflow-hidden rounded-[1.5rem] sm:h-56">
              <Image
                src="/manos-alianza.webp"
                alt="Manos unidas en círculo, símbolo de alianza"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 420px, 320px"
              />
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
