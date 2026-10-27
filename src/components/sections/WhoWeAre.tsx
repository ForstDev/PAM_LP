import { Fragment } from "react";
import Image from "next/image";
import { HandHeart, TrendingUp, Scale } from "lucide-react";
import { SignatureCircle } from "@/components/SignatureCircle";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { GlowOrb } from "@/components/GlowOrb";
import { BrandRoadmap } from "./BrandRoadmap";

// Saltos de línea pedidos por el cliente (`lines`). Se activan desde xl, donde
// con el ícono arriba del texto cada línea entra completa (medido); debajo
// de ese ancho el texto fluye normal.
const pillars = [
  {
    icon: HandHeart,
    color: "verde" as const,
    title: "Ayuda inmediata",
    lines: [
      "El dinero llega directo a organizaciones que trabajan en diversas causas, sin intermediarios.",
    ],
  },
  {
    icon: TrendingUp,
    color: "celeste" as const,
    title: "Ayuda constante",
    lines: [
      "Cada compra suma a un ingreso nuevo",
      "para las ONG, que no depende de donaciones",
      "de una sola vez.",
    ],
    breakClass: "hidden xl:inline",
  },
  {
    // Único lugar de toda la landing donde se menciona política, por pedido
    // explícito del cliente.
    icon: Scale,
    color: "azul" as const,
    title: "Ayudar no tiene partido",
    lines: [
      "Somos parte de MÁS, un movimiento cultural humanitario de ciudadanos independientes,",
      "no político ni partidario.",
    ],
    breakClass: "hidden xl:inline",
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
        {/* Recorte circular del manual de marca. La foto ya viene recortada en
            cuadrado para que entren las caras de todas las personas del stand. */}
        <figure className="mx-auto w-full max-w-sm">
          <SignatureCircle
            color="celeste"
            className="w-full"
            circleClassName="-left-8 -top-8 h-[75%] w-[75%]"
          >
            <Image
              src="/quienes-somos-cumbre-v2.webp"
              alt="Conversación con ONGs en un stand de la Cumbre Perú Sostenible"
              width={480}
              height={480}
              className="aspect-square w-full rounded-full object-cover"
              sizes="(min-width: 640px) 384px, calc(100vw - 2rem)"
            />
          </SignatureCircle>
          <figcaption className="mt-5 text-center text-sm leading-relaxed text-foreground lg:text-left">
            Conversamos con varias ONGs en la{" "}
            <br className="hidden lg:inline" />
            Cumbre Perú Sostenible, en septiembre de 2026.
          </figcaption>
        </figure>

        <Reveal delay={0.1}>
          <SectionEyebrow>Quiénes somos</SectionEyebrow>
          <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Hagamos crecer la economía solidaria con las plataformas de
            AyudemosMás
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground">
            Somos AyudemosMás, parte de MÁS, un movimiento cultural
            humanitario. Nacimos para hacer que nuestras acciones del día a día
            ayuden a otros.
          </p>
          <p className="mt-5 max-w-[60ch] border-l-4 border-verde pl-4 text-lg font-semibold leading-relaxed text-foreground">
            AyudemosMás multiplica la ayuda que reciben caridades y ONGs con
            una nueva fuente de fondos, la promoción de la economía solidaria.
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
                className="flex items-start gap-5 lg:flex-col lg:gap-4"
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
                  <p className="mt-1 text-foreground">
                    {pillar.lines.map((line, i) => (
                      <Fragment key={line}>
                        {i > 0 && (
                          <>
                            {" "}
                            <br className={pillar.breakClass} />
                          </>
                        )}
                        {line}
                      </Fragment>
                    ))}
                  </p>
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
