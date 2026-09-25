import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";
import { IssueCardStack } from "./IssueCardStack";

export function IssuesSection() {
  return (
    <section
      id="problematicas"
      className="relative isolate overflow-hidden bg-celeste px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <GlowOrb className="-bottom-24 -left-24 h-80 w-80 bg-verde/25 blur-3xl" />
      <GlowOrb className="-top-16 right-1/4 h-56 w-56 bg-verde/15 blur-2xl" />

      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <h2 className="font-serif text-3xl font-bold uppercase leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Las causas que ya estamos atendiendo
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">
            Cada compra financia un problema real y verificable. Toca una
            cartilla para conocerlo.
          </p>
        </Reveal>

        <div className="mt-14">
          <IssueCardStack />
        </div>
      </div>
    </section>
  );
}
