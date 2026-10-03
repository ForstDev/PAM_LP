import Image from "next/image";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";
import { SignatureCircle } from "@/components/SignatureCircle";

const areas = [
  "Nutrición",
  "Salud",
  "Agua",
  "Educación",
  "Animales",
  "Amazonas",
  "Paz",
  "Tecnología",
];

export function NgoSection() {
  return (
    <section
      id="afiliacion"
      className="relative isolate overflow-hidden bg-celeste/8 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <GlowOrb className="-right-16 top-1/2 h-80 w-80 -translate-y-1/2 bg-verde/20 blur-2xl" />

      <div className="relative mx-auto grid max-w-[84rem] items-center gap-14 lg:grid-cols-[minmax(0,32rem)_1fr] lg:gap-20">
        {/* Foto con el sistema de imágenes del manual: recorte circular,
            círculo de color detrás y anillos finos como en el brochure. */}
        <Reveal className="mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full border border-verde"
            />
            <div
              aria-hidden
              className="absolute -inset-12 rounded-full border border-celeste"
            />
            <SignatureCircle
              color="verde"
              className="w-full"
              circleClassName="-bottom-5 -left-5 h-[85%] w-[85%]"
            >
              <Image
                src="/manos-alianza.webp"
                alt="Manos unidas en círculo, símbolo de alianza"
                width={640}
                height={640}
                className="aspect-square w-full rounded-full object-cover"
                sizes="(min-width: 1024px) 448px, 320px"
              />
            </SignatureCircle>
            <div
              aria-hidden
              className="absolute -right-2 top-6 h-10 w-10 rounded-full bg-celeste"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-0.5 w-8 bg-verde" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                Afiliación
              </p>
            </div>
            <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-foreground sm:text-5xl">
              ¿Representas una
              <br />
              organización
              <br />
              con una causa social?
            </h2>
            <p className="text-impact mt-5 text-2xl sm:text-3xl">
              Súmate para formar el cambio
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Misiones en las que podemos apoyarte
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {areas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-foreground px-3.5 py-1.5 text-sm font-medium text-foreground"
                >
                  {area}
                </li>
              ))}
            </ul>

            <a
              href={waLink("Hola, represento a una organización con una causa social y quiero conversar sobre una alianza.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block rounded-full bg-verde px-8 py-4 text-base font-semibold text-foreground transition-transform hover:scale-105"
            >
              Conversemos
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
