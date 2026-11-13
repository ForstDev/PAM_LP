import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { GlowOrb } from "@/components/GlowOrb";
import { MissionBoard } from "./MissionBoard";

export function IssuesSection() {
  return (
    <section
      id="problematicas"
      className="relative isolate overflow-hidden bg-celeste/20 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <GlowOrb className="bottom-16 -left-16 h-64 w-64 bg-verde/20 blur-2xl" />
      <GlowOrb className="top-16 right-1/4 h-56 w-56 bg-azul/15 blur-2xl" />

      <div className="relative mx-auto max-w-[84rem]">
        <Reveal>
          <SectionEyebrow>Problemáticas</SectionEyebrow>
          <h2 className="mt-5 max-w-4xl font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Ayudamos a las ONGs cuyas misiones…
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground">
            …son enfrentar la variedad de problemáticas que hay en el Perú y en
            el mundo.
          </p>
          <div className="mt-6 flex max-w-3xl items-start gap-3 rounded-2xl bg-white/70 px-4 py-3 shadow-sm shadow-azul/10">
            <span
              aria-hidden
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-verde text-xs font-bold lowercase text-foreground"
            >
              i
            </span>
            <p className="text-sm leading-relaxed text-foreground">
              <strong>¿Qué es un ODS?</strong> Son los Objetivos de Desarrollo
              Sostenible: 17 metas que la ONU y 193 países acordaron en 2015
              con el fin de luchar de forma histórica contra la pobreza,
              cuidar el planeta y mejorar la vida de todas las personas hacia
              2030.
            </p>
          </div>
        </Reveal>

        <div className="mt-12">
          <MissionBoard />
        </div>
      </div>
    </section>
  );
}
