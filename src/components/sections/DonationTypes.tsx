"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { Globe, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";
import { StatCounter } from "@/components/StatCounter";
import { missions } from "./issuesData";

// Los tres tipos de donación que sostiene AyudemosMás hoy. El detalle de cada
// uno sale de las misiones del Tablero, para que nunca se contradigan.
const types = [
  {
    id: "hambre",
    label: "Familias que pasan hambre",
    color: "bg-verde",
    // Posición del satélite dentro del diagrama (en % del lado).
    pos: { left: "50%", top: "17%" },
  },
  {
    id: "salud",
    label: "Hospitales y sus pacientes",
    color: "bg-celeste",
    pos: { left: "78.6%", top: "66.5%" },
  },
  {
    id: "animales",
    label: "Animales en abandono",
    color: "bg-azul",
    pos: { left: "21.4%", top: "66.5%" },
  },
] as const;

// Recorrido de cada compra, tal cual el brochure del manual (10.2).
const steps = [
  { title: "Compra", text: "Eliges productos que ya necesitas." },
  { title: "Venta", text: "Marcas y productores venden a través de nosotros." },
  { title: "Ganancia", text: "Descontamos impuestos y costos operativos." },
  { title: "Fondo", text: "El 100% de la ganancia va al fondo de impacto." },
  { title: "ONG", text: "El fondo financia organizaciones y campañas." },
  { title: "Impacto", text: "Mostramos los resultados con evidencia." },
];

export function DonationTypes() {
  const [activeId, setActiveId] = useState<string>(types[0].id);
  const active = types.find((t) => t.id === activeId) ?? types[0];
  const mission = missions.find((m) => m.id === active.id);

  return (
    <section
      id="donaciones"
      className="scroll-mt-6 sm:-scroll-mt-2 relative isolate overflow-hidden bg-verde/15 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <GlowOrb className="-right-16 top-20 h-64 w-64 bg-celeste/25 blur-2xl" />
      <GlowOrb className="bottom-20 -left-12 h-48 w-48 bg-azul/20 blur-2xl" />

      <div className="relative mx-auto grid max-w-[84rem] items-center gap-12 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-16">
        <div className="order-2 lg:order-1">
          <Reveal>
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-0.5 w-8 bg-verde" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                Donaciones
              </p>
            </div>
            <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              ¿A quién llega tu ayuda?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground">
              Estos son los tres tipos de donación que sostenemos hoy. Elige
              uno y mira qué financia.
            </p>
          </Reveal>

          <ul className="mt-8 max-w-xl divide-y divide-foreground/15 border-y border-foreground/15">
            {types.map((type, index) => {
              const isActive = type.id === activeId;
              return (
                <li key={type.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(type.id)}
                    aria-pressed={isActive}
                    className="group flex min-h-14 w-full items-center gap-4 py-3 text-left"
                  >
                    <span
                      aria-hidden
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-foreground transition-transform duration-200 ${type.color} ${
                        isActive ? "scale-110" : "scale-90 opacity-70 group-hover:scale-100"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`text-lg text-foreground transition-[font-weight] ${
                        isActive ? "font-bold" : "font-medium"
                      }`}
                    >
                      {type.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 max-w-xl" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid gap-5 sm:grid-cols-2"
              >
                {[
                  { icon: MapPin, label: "En el Perú", text: mission?.peru },
                  { icon: Globe, label: "En el mundo", text: mission?.world },
                ].map(({ icon: Icon, label, text }) => (
                  <div key={label}>
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                      {label}
                    </p>
                    <p className="mt-2 leading-snug text-foreground">{text}</p>
                  </div>
                ))}
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Diagrama: el 100% de las ganancias al centro y las tres causas en
            órbita. Las líneas se dibujan al entrar y la órbita gira lento. */}
        <Reveal delay={0.1} className="order-1 mx-auto w-full max-w-[22rem] sm:max-w-[30rem] lg:order-2 lg:max-w-none">
          <div className="relative aspect-square w-full">
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
            >
              <circle
                cx="50"
                cy="50"
                r="33"
                fill="none"
                stroke="#000"
                strokeOpacity="0.2"
                strokeWidth="0.35"
                strokeDasharray="1.2 1.8"
                className="origin-center animate-[spin_90s_linear_infinite]"
              />
              {types.map((type, index) => {
                const x = parseFloat(type.pos.left);
                const y = parseFloat(type.pos.top);
                const isActive = type.id === activeId;
                return (
                  <m.line
                    key={type.id}
                    x1="50"
                    y1="50"
                    x2={x}
                    y2={y}
                    stroke="#000"
                    strokeWidth={isActive ? 0.9 : 0.4}
                    strokeOpacity={isActive ? 0.9 : 0.3}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 + index * 0.15 }}
                  />
                );
              })}
            </svg>

            <div className="absolute left-1/2 top-1/2 flex h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-verde text-center shadow-lg shadow-verde/40">
              <p className="text-3xl font-bold leading-none text-foreground sm:text-5xl">
                <StatCounter to={100} suffix="%" />
              </p>
              <p className="mt-1 max-w-[7rem] text-[0.7rem] font-semibold leading-tight text-foreground sm:text-sm">
                de nuestras ganancias
              </p>
            </div>

            {types.map((type) => {
              const typeMission = missions.find((x) => x.id === type.id);
              const isActive = type.id === activeId;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setActiveId(type.id)}
                  aria-label={type.label}
                  aria-pressed={isActive}
                  className="absolute h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2"
                  style={type.pos}
                >
                  <m.span
                    aria-hidden
                    initial={false}
                    animate={{ scale: isActive ? 1 : 0.7, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`absolute -bottom-[6%] -right-[6%] h-[88%] w-[88%] rounded-full ${type.color}`}
                  />
                  <m.span
                    animate={{ scale: isActive ? 1.06 : 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className={`relative block h-full w-full overflow-hidden rounded-full ring-4 ring-white transition-opacity duration-300 ${
                      isActive ? "" : "opacity-80"
                    }`}
                  >
                    {typeMission?.image && (
                      <Image
                        src={typeMission.image.src}
                        alt=""
                        width={240}
                        height={240}
                        className="h-full w-full object-cover"
                        sizes="(min-width: 640px) 160px, 100px"
                      />
                    )}
                  </m.span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* Así llega tu ayuda: línea de tiempo con los 6 pasos del brochure. */}
      <div className="relative mx-auto mt-20 max-w-[84rem]">
        <Reveal>
          <h3 className="font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            Así llega tu ayuda
          </h3>
          <p className="mt-2 max-w-2xl text-foreground">
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
