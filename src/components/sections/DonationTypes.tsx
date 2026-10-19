"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { HeartPulse, PawPrint, Utensils, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";
import { SectionEyebrow } from "@/components/SectionEyebrow";

type Cause = {
  area: string;
  title: string;
  text: string;
  helps: string[];
  icon: LucideIcon;
  image: { src: string; alt: string };
  accent: string;
  tint: string;
};

// Los tres tipos de donación que sostiene AyudemosMás hoy. Se describe en qué
// consiste cada ayuda; no se nombran organizaciones porque aún no hay
// alianzas confirmadas. Fotos: Pexels (36318467, 5998455, 4697573).
const causes: Cause[] = [
  {
    area: "Alimentación",
    title: "Familias que pasan hambre",
    text: "Llevamos comida a familias que no tienen lo suficiente, a través de comedores y programas de seguridad alimentaria.",
    helps: ["Comedores y ollas comunes", "Canastas de víveres", "Nutrición infantil"],
    icon: Utensils,
    image: { src: "/donaciones/alimentacion.webp", alt: "Plato de comida servido en un comedor" },
    accent: "bg-verde",
    tint: "bg-verde/25",
  },
  {
    area: "Salud",
    title: "Hospitales y sus pacientes",
    text: "Apoyamos la atención médica de quienes viven lejos de un hospital, con campañas itinerantes y la lucha contra la anemia.",
    helps: ["Campañas médicas", "Lucha contra la anemia", "Medicinas e insumos"],
    icon: HeartPulse,
    image: { src: "/donaciones/salud.webp", alt: "Pediatra revisando a una niña con el estetoscopio" },
    accent: "bg-celeste",
    tint: "bg-celeste/25",
  },
  {
    area: "Animales",
    title: "Animales en abandono",
    text: "Damos una segunda oportunidad a perros y gatos de la calle con esterilizaciones, rescates y apoyo a albergues.",
    helps: ["Esterilización", "Rescate", "Albergues"],
    icon: PawPrint,
    image: { src: "/donaciones/animales.webp", alt: "Perros esperando adopción en un albergue" },
    accent: "bg-azul",
    tint: "bg-azul/25",
  },
];

// Recorrido de cada compra, tal cual el brochure del manual (10.2).
const steps = [
  { title: "Compra", text: "Eliges productos que ya necesitas." },
  { title: "Venta", text: "Marcas y productores venden a través de nosotros." },
  { title: "Ganancia", text: "Descontamos impuestos y costos operativos." },
  { title: "Fondo", text: "El 100% de la ganancia va al fondo de impacto." },
  { title: "ONG", text: "El fondo financia organizaciones y campañas." },
  { title: "Impacto", text: "Mostramos los resultados con evidencia." },
];

/**
 * Una tarjeta del mazo. Se queda pegada arriba mientras la siguiente sube y
 * la cubre; al quedar debajo se achica un poco, como cartas que se apilan.
 */
function CauseCard({
  cause,
  index,
  total,
  progress,
}: {
  cause: Cause;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: enter } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const imageScale = useTransform(enter, [0, 1], [1.25, 1]);
  const Icon = cause.icon;

  return (
    <div
      ref={cardRef}
      className="sticky flex min-h-[37rem] items-start justify-center sm:h-[30rem] sm:min-h-0 lg:h-[32rem]"
      style={{ top: `calc(6.5rem + ${index * 1.5}rem)` }}
    >
      <m.article
        style={reduceMotion ? undefined : { scale }}
        className="grid w-full origin-top overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-navy/10 sm:h-[27rem] md:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="relative h-44 overflow-hidden sm:h-52 md:h-full">
          <m.div
            style={reduceMotion ? undefined : { scale: imageScale }}
            className="absolute inset-0"
          >
            <Image
              src={cause.image.src}
              alt={cause.image.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </m.div>
          <span
            aria-hidden
            className={`absolute -bottom-10 -right-10 h-32 w-32 rounded-full ${cause.accent} opacity-90`}
          />
          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
            {String(index + 1).padStart(2, "0")} de {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
            <span
              aria-hidden
              className={`flex h-8 w-8 items-center justify-center rounded-full ${cause.accent}`}
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
            </span>
            {cause.area}
          </p>
          <h3 className="mt-4 font-serif text-2xl font-bold leading-tight text-foreground sm:text-4xl">
            {cause.title}
          </h3>
          <p className="mt-3 max-w-[48ch] leading-relaxed text-foreground sm:text-lg">
            {cause.text}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {cause.helps.map((help) => (
              <li
                key={help}
                className={`rounded-full px-3 py-1.5 text-sm font-medium text-foreground ${cause.tint}`}
              >
                {help}
              </li>
            ))}
          </ul>
        </div>
      </m.article>
    </div>
  );
}

export function DonationTypes() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="donaciones"
      // overflow-clip (no hidden) para que las tarjetas puedan quedar pegadas.
      className="scroll-mt-6 sm:-scroll-mt-2 relative isolate overflow-clip bg-verde/15 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <GlowOrb className="-right-16 top-20 h-64 w-64 bg-celeste/25 blur-2xl" />
      <GlowOrb className="bottom-1/3 -left-12 h-48 w-48 bg-azul/20 blur-2xl" />

      <div className="relative mx-auto max-w-[72rem]">
        <Reveal>
          <SectionEyebrow>Donaciones</SectionEyebrow>
          <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            ¿A quién llega tu ayuda?
          </h2>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-foreground">
            Hoy, lo que generan tus compras sostiene estas tres causas.
          </p>
        </Reveal>

        <div ref={stackRef} className="relative mt-10">
          {causes.map((cause, index) => (
            <CauseCard
              key={cause.title}
              cause={cause}
              index={index}
              total={causes.length}
              progress={scrollYProgress}
            />
          ))}
          {/* Pausa: el mazo completo queda a la vista antes de seguir. Debe
              ser un elemento (no padding) para que cuente en el sticky. */}
          <div aria-hidden className="h-32" />
        </div>
      </div>

      {/* Así llega tu ayuda: línea de tiempo con los 6 pasos del brochure. */}
      <div className="relative mx-auto mt-0 max-w-[84rem]">
        <Reveal>
          <h3 className="font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            Así llega tu ayuda
          </h3>
          <p className="mt-2 max-w-[60ch] text-foreground">
            Vas a poder saber qué pasó con tu compra: publicaremos reportes
            abiertos y periódicos.
          </p>
        </Reveal>

        <ol className="relative mt-10 grid gap-8 lg:grid-cols-6 lg:gap-4">
          <m.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute left-[8.3%] right-[8.3%] top-[1.05rem] hidden h-0.5 origin-left bg-foreground/25 lg:block"
          />
          <m.span
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute bottom-4 left-[1.05rem] top-4 w-0.5 origin-top bg-foreground/25 lg:hidden"
          />
          {steps.map((step, index) => (
            <m.li
              key={step.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 * index }}
              className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-3 lg:text-center"
            >
              <span
                aria-hidden
                className={`relative z-10 flex h-[2.1rem] w-[2.1rem] flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-foreground ring-4 ring-[#ecfaf6] ${
                  index === 3 ? "bg-verde" : "bg-white"
                }`}
              >
                {index + 1}
              </span>
              <span>
                <span className="block font-semibold text-foreground">{step.title}</span>
                <span className="mt-0.5 block text-sm leading-snug text-foreground">
                  {step.text}
                </span>
              </span>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
