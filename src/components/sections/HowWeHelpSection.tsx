import { HandHeart, TrendingUp } from "lucide-react";
import { SignatureCircle } from "@/components/SignatureCircle";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";

export function HowWeHelpSection() {
  return (
    <section className="relative isolate overflow-hidden bg-verde/10 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <GlowOrb className="-top-20 right-0 h-72 w-72 bg-celeste/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            En lo inmediato, ayuda real. A largo plazo, una fuente constante de
            fondos.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">
            Cada compra financia directamente el trabajo de organizaciones que
            ya combaten el hambre en el país, para que no dependan solo de
            grandes donantes.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <Reveal delay={0.1} className="flex items-start gap-5">
            <SignatureCircle
              color="verde"
              className="h-16 w-16 flex-shrink-0"
              circleClassName="inset-0"
            >
              <div className="flex h-16 w-16 items-center justify-center">
                <HandHeart className="h-7 w-7 text-foreground" strokeWidth={1.75} />
              </div>
            </SignatureCircle>
            <div>
              <p className="font-semibold text-foreground">Ayuda inmediata</p>
              <p className="mt-1 text-foreground/75">
                Fondos que llegan directo a organizaciones que ya trabajan
                contra el hambre, sin intermediarios.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="flex items-start gap-5">
            <SignatureCircle
              color="celeste"
              className="h-16 w-16 flex-shrink-0"
              circleClassName="inset-0"
            >
              <div className="flex h-16 w-16 items-center justify-center">
                <TrendingUp className="h-7 w-7 text-foreground" strokeWidth={1.75} />
              </div>
            </SignatureCircle>
            <div>
              <p className="font-semibold text-foreground">Fondo constante</p>
              <p className="mt-1 text-foreground/75">
                Cada compra semanal se vuelve una fuente de ingresos
                sostenida, no una donación aislada.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
