import { CatalogCarousel } from "./CatalogCarousel";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";

export function CatalogSection() {
  return (
    <section id="productos" className="relative isolate overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <GlowOrb className="-left-24 top-0 h-64 w-64 bg-verde/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Lo que ya compras cada semana, ahora también ayuda.
          </h2>
        </Reveal>

        <div className="mt-12">
          <CatalogCarousel />
        </div>
      </div>
    </section>
  );
}
