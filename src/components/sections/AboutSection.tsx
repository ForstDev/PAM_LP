import Image from "next/image";
import { SignatureCircle } from "@/components/SignatureCircle";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";

export function AboutSection() {
  return (
    <section
      id="quienes-somos"
      className="relative isolate overflow-hidden bg-celeste/10 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <GlowOrb className="-right-20 -bottom-24 h-72 w-72 bg-verde/30 blur-3xl" />

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
          <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Un puente entre tu compra diaria y la ayuda directa.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            Somos PerúAyudemosMás, parte del movimiento cultural MÁS.
            Revendemos productos de primera necesidad y donamos el 100% de
            nuestras ganancias — lo que queda después de cubrir los costos
            operativos — a organizaciones que combaten el hambre.
          </p>
          <p className="mt-6 inline-block rounded-full bg-celeste/20 px-4 py-2 text-sm font-medium text-foreground">
            Somos un movimiento cultural, no político.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
