import { Reveal } from "@/components/Reveal";
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
          <h2 className="max-w-3xl font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Los desafíos que nos mueven a ayudar
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground">
            Cada compra impulsa el trabajo de organizaciones que enfrentan
            estos desafíos en el Perú y en el mundo. Conoce cada misión y la
            ayuda que recibe.
          </p>
        </Reveal>

        <div className="mt-12">
          <MissionBoard />
        </div>
      </div>
    </section>
  );
}
