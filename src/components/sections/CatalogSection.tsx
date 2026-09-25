import { CatalogCarousel } from "./CatalogCarousel";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";

export function CatalogSection() {
  return (
    <section id="productos" className="relative isolate overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <GlowOrb className="-left-24 top-0 h-64 w-64 bg-verde/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <Reveal>
            <h2 className="max-w-2xl font-serif text-3xl font-bold uppercase leading-tight text-foreground sm:text-4xl">
              Lo que ya compras cada semana, ahora también ayuda
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="flex-shrink-0 self-start rounded-3xl bg-verde/15 px-5 py-4 text-right">
            <p className="text-2xl font-bold text-foreground">100%</p>
            <p className="text-xs leading-snug text-foreground/70">
              de las ganancias va a causas sociales, una vez cubiertos los
              costos operativos.
            </p>
          </Reveal>
        </div>

        <div className="mt-12">
          <CatalogCarousel />
        </div>
      </div>
    </section>
  );
}
