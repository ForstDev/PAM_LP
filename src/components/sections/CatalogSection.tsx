import { CatalogCarousel } from "./CatalogCarousel";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { GlowOrb } from "@/components/GlowOrb";
import { ProfitCounter } from "./ProfitCounter";

export function CatalogSection() {
  return (
    <section id="productos" className="relative isolate overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <GlowOrb className="-left-16 top-16 h-56 w-56 bg-verde/15 blur-2xl" />

      <div className="relative mx-auto max-w-[84rem]">
        <Reveal>
          <SectionEyebrow>Productos</SectionEyebrow>
        </Reveal>
        <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <Reveal>
            <h2 className="max-w-2xl font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Lo que ya compras cada semana,<br className="hidden md:inline" /> ahora
              también ayuda.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ProfitCounter />
          </Reveal>
        </div>

        {/* Bloque 1: restaurantes aliados */}
        <div className="mt-16">
          <Reveal>
            <h3 className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xl font-bold text-foreground sm:text-2xl">
              AyudemosMás Delivery
              <span className="relative top-[2px] rounded-full px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest ring-1 ring-celeste sm:text-xs">
                Restaurantes
              </span>
            </h3>
            <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-foreground sm:text-base">
              Nuestros restaurantes aliados compartirán los valores de las ONGs de
              bienestar animal, producción sostenible y más con las que trabajamos.
            </p>
          </Reveal>
          <div className="mt-8">
            <CatalogCarousel catalog="restaurantes" />
          </div>
        </div>

        <div className="mt-10 border-t border-foreground/10 pt-10 sm:mt-12 sm:pt-12">
          {/* Bloque 2: supermercado virtual */}
          <Reveal>
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">
              AyudemosMás Supermarket
            </h3>
            <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-foreground sm:text-base">
              Los productos de nuestro supermercado virtual, con delivery propio,
              también estarán alineados con esas mismas ONGs.
            </p>
          </Reveal>
          <div className="mt-8">
            <CatalogCarousel catalog="supermercado" comingSoon="Muy pronto, más categorías" />
          </div>
        </div>
      </div>
    </section>
  );
}
