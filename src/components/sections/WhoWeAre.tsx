import Image from "next/image";
import { HandHeart, TrendingUp } from "lucide-react";
import { SignatureCircle } from "@/components/SignatureCircle";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";

export function WhoWeAre() {
  return (
    <section
      id="quienes-somos"
      className="relative isolate overflow-hidden bg-celeste/10 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <GlowOrb className="-right-20 -top-24 h-72 w-72 bg-verde/25 blur-3xl" />
      <GlowOrb className="-bottom-24 -left-16 h-64 w-64 bg-celeste/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <SignatureCircle
          color="celeste"
          className="mx-auto w-full max-w-sm"
          circleClassName="-left-8 -top-8 h-[75%] w-[75%]"
        >
          <Image
            src="/hero-construccion.png"
            alt="Equipo de PerúAyudemosMás"
            width={480}
            height={480}
            className="aspect-square w-full rounded-[2.5rem] object-cover"
          />
        </SignatureCircle>

        <Reveal delay={0.1}>
          <h2 className="font-serif text-3xl font-bold uppercase leading-tight text-foreground sm:text-4xl">
            Un puente entre tu compra diaria y la ayuda directa
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            Somos PerúAyudemosMás, parte del movimiento cultural MÁS.
            Revendemos productos de primera necesidad y destinamos nuestras
            ganancias, una vez cubiertos los costos operativos, a
            organizaciones que ya vienen trabajando en distintas causas
            sociales del Perú.
          </p>
          <p className="mt-6 inline-block rounded-full bg-celeste/20 px-4 py-2 text-sm font-medium text-foreground">
            Somos un movimiento cultural, no político.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl border-t border-foreground/10 pt-14">
        <Reveal>
          <p className="max-w-2xl text-xl font-semibold leading-snug text-foreground">
            En lo inmediato, ayuda real. A largo plazo, una fuente que no se
            agota.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:grid-cols-2">
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
                Los fondos llegan directo a organizaciones que ya trabajan en
                el terreno, sin intermediarios en el camino.
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
                Cada compra semanal se convierte en una fuente de ingresos que
                se sostiene en el tiempo, no en una donación aislada.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
