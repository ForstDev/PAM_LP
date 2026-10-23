import { CatalogCarousel } from "./CatalogCarousel";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { GlowOrb } from "@/components/GlowOrb";
import { ProfitCounter } from "./ProfitCounter";

const values = [
  "Cero crueldad animal",
  "Opciones vegetarianas",
  "Opciones veganas",
];

export function CatalogSection() {
  return (
    <section id="productos" className="scroll-mt-6 sm:-scroll-mt-2 relative isolate overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <GlowOrb className="-left-16 top-16 h-56 w-56 bg-verde/15 blur-2xl" />

      <div className="relative mx-auto max-w-[84rem]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <Reveal>
            <SectionEyebrow>Productos</SectionEyebrow>
            <h2 className="mt-5 max-w-2xl font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Lo que ya compras cada semana, ahora también ayuda…
            </h2>
            <p className="text-impact mt-4 text-2xl sm:text-3xl">
              Muy pronto… más productos en AyudemosMás Delivery
            </p>
            <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-foreground">
              Empezamos con Vanemar, nuestro minimarket aliado, y pronto
              sumaremos más markets y restaurantes.
            </p>

            {/* Valores que se están verificando: se presentan como "en
                proceso" hasta que la verificación esté completa. */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                En proceso de verificación
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {values.map((value) => (
                  <li
                    key={value}
                    className="rounded-full bg-verde/25 px-3 py-1.5 text-sm font-medium text-foreground"
                  >
                    {value}
                  </li>
                ))}
              </ul>
              <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-foreground">
                Trabajamos con una organización y profesionales que verificarán
                que cada producto cumpla estos valores.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ProfitCounter />
          </Reveal>
        </div>

        <div className="mt-12">
          <CatalogCarousel />
        </div>
      </div>
    </section>
  );
}
