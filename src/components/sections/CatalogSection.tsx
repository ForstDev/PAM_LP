import { CatalogCarousel } from "./CatalogCarousel";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";
import { ProfitCounter } from "./ProfitCounter";
import { waLink } from "@/lib/whatsapp";

export function CatalogSection() {
  return (
    <section id="productos" className="relative isolate overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <GlowOrb className="-left-16 top-16 h-56 w-56 bg-verde/15 blur-2xl" />

      <div className="relative mx-auto max-w-[84rem]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <Reveal>
            <h2 className="max-w-2xl font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Lo que ya compras cada semana, ahora también ayuda
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ProfitCounter />
          </Reveal>
        </div>

        <div className="mt-12">
          <CatalogCarousel />
        </div>

        <Reveal delay={0.1} className="mt-10">
          <a
            href={waLink("Hola, quiero consultar los productos disponibles.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-verde px-8 py-4 text-base font-semibold text-foreground transition-transform hover:scale-105"
          >
            Consultar productos por WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
