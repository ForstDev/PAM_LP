import Image from "next/image";
import { HandHeart, TrendingUp, Scale } from "lucide-react";
import { SignatureCircle } from "@/components/SignatureCircle";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";
import { RecambioFeature } from "./RecambioFeature";

const pillars = [
  {
    icon: HandHeart,
    color: "verde" as const,
    title: "Ayuda inmediata",
    text: "Los fondos llegan directo a organizaciones que ya trabajan en el terreno, sin intermediarios en el camino.",
  },
  {
    icon: TrendingUp,
    color: "celeste" as const,
    title: "Fondo constante",
    text: "Cada compra semanal se convierte en una fuente de ingresos que se sostiene en el tiempo, no en una donación aislada.",
  },
  {
    // Único lugar de toda la landing donde se menciona política, por pedido
    // explícito del cliente.
    icon: Scale,
    color: "azul" as const,
    title: "Ayudar no tiene partido",
    text: "Somos parte del movimiento cultural MÁS, independiente y apartidario. No respaldamos partidos ni candidaturas.",
  },
];

export function WhoWeAre() {
  return (
    <section
      id="quienes-somos"
      className="relative isolate overflow-hidden bg-celeste/10 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <GlowOrb className="-right-12 top-16 h-56 w-56 bg-verde/20 blur-2xl" />
      <GlowOrb className="bottom-16 -left-10 h-52 w-52 bg-azul/25 blur-2xl" />

      <div className="relative mx-auto grid max-w-[84rem] items-center gap-12 lg:grid-cols-2">
        <SignatureCircle
          color="celeste"
          className="mx-auto w-full max-w-sm"
          circleClassName="-left-8 -top-8 h-[75%] w-[75%]"
        >
          <Image
            src="/hero-construccion.webp"
            alt="Equipo de AyudemosMás Perú"
            width={480}
            height={480}
            className="aspect-square w-full rounded-[2.5rem] object-cover"
          />
        </SignatureCircle>

        <Reveal delay={0.1}>
          <h2 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Un puente entre tu compra diaria y la ayuda directa
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground">
            Somos AyudemosMás Perú, parte del movimiento cultural MÁS.
            Revendemos productos de primera necesidad y destinamos el 100% de
            nuestras ganancias a organizaciones que ya vienen trabajando en
            distintas causas sociales del Perú.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 max-w-[84rem] border-t border-foreground/10 pt-14">
        <Reveal>
          <p className="max-w-2xl text-xl font-semibold leading-snug text-foreground">
            En lo inmediato, ayuda real. A largo plazo, una fuente que no se
            agota.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal
                key={pillar.title}
                delay={0.1 * (index + 1)}
                className="flex items-start gap-5"
              >
                <SignatureCircle
                  color={pillar.color}
                  className="h-16 w-16 flex-shrink-0"
                  circleClassName="inset-0"
                >
                  <div className="flex h-16 w-16 items-center justify-center">
                    <Icon className="h-7 w-7 text-foreground" strokeWidth={1.75} />
                  </div>
                </SignatureCircle>
                <div>
                  <p className="font-semibold text-foreground">{pillar.title}</p>
                  <p className="mt-1 text-foreground">{pillar.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <RecambioFeature />
    </section>
  );
}
