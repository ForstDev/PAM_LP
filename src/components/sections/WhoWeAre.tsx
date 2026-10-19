import Image from "next/image";
import { HandHeart, TrendingUp, Scale } from "lucide-react";
import { SignatureCircle } from "@/components/SignatureCircle";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { GlowOrb } from "@/components/GlowOrb";
import { BrandRoadmap } from "./BrandRoadmap";

const pillars = [
  {
    icon: HandHeart,
    color: "verde" as const,
    title: "Ayuda inmediata",
    text: "El dinero llega directo a organizaciones que trabajan en diversas causas, sin intermediarios.",
  },
  {
    icon: TrendingUp,
    color: "celeste" as const,
    title: "Ayuda constante",
    text: "Cada compra suma a un ingreso nuevo para las ONG, que no depende de donaciones de una sola vez.",
  },
  {
    // Único lugar de toda la landing donde se menciona política, por pedido
    // explícito del cliente.
    icon: Scale,
    color: "azul" as const,
    title: "Ayudar no tiene partido",
    text: "Somos parte de MÁS, un movimiento caritativo de ciudadanos independientes, no político ni partidario.",
  },
];

export function WhoWeAre() {
  return (
    <section
      id="quienes-somos"
      className="scroll-mt-14 sm:scroll-mt-6 relative isolate overflow-hidden bg-celeste/10 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
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
            alt="Equipo de AyudemosMás"
            width={480}
            height={480}
            className="aspect-square w-full rounded-[2.5rem] object-cover"
          />
        </SignatureCircle>

        <Reveal delay={0.1}>
          <SectionEyebrow>Quiénes somos</SectionEyebrow>
          <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Hagamos crecer la economía solidaria con las plataformas de
            AyudemosMás
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground">
            Somos AyudemosMás, parte del movimiento caritativo MÁS. Nacimos
            para hacer que nuestras acciones del día a día ayuden a otros.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 max-w-[84rem] border-t border-foreground/10 pt-14">
        <Reveal>
          <p className="max-w-2xl text-xl font-semibold leading-snug text-foreground">
            Ayudamos ahora y buscamos que esa ayuda dure.
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

      <BrandRoadmap />

    </section>
  );
}
