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
              también ayuda…
            </h2>
            <p className="text-impact mt-4 text-2xl sm:text-3xl">
              Muy pronto… más productos en AyudemosMás Delivery
            </p>
            <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-foreground">
              Empezamos con Vanemar, nuestro minimarket aliado,
              <br className="hidden md:inline" /> y pronto sumaremos más markets y
              restaurantes.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ProfitCounter />
          </Reveal>
        </div>

        <div className="mt-16">
          <CatalogCarousel />
        </div>
      </div>
    </section>
  );
}
