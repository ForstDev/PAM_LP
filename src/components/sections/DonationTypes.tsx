"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  m,
  useMotionValue,
  useReducedMotion,
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

// La ruleta tiene 6 posiciones cada 60°: las 3 causas aparecen dos veces, así
// el semicírculo visible siempre muestra las tres y el giro nunca se corta.
const SLOT_DEG = 60;
const SLOTS = causes.length * 2;
const AUTO_MS = 4500;

const mod = (n: number, k: number) => ((n % k) + k) % k;
const normalize = (deg: number) => mod(deg + 180, 360) - 180;
// Redondeo a 2 decimales: el HTML del servidor y el del navegador deben coincidir.
const round2 = (n: number) => Math.round(n * 100) / 100;

type Geometry = { cx: number; cy: number; R: number; r: number; height: number; pillW: number };

function geometryFor(width: number): Geometry {
  const R = Math.min(Math.max(width * 0.24, 170), 230);
  const r = R - 74;
  const cx = r + 24;
  const height = Math.round(R * 0.87 * 2 + 150);
  const pillW = Math.min(440, width - (cx + R) - 12);
  return { cx, cy: height / 2, R, r, height, pillW };
}

function CauseBody({ cause }: { cause: Cause }) {
  return (
    <>
      <span className="mt-2 block text-sm leading-relaxed text-foreground sm:text-base">
        {cause.text}
      </span>
      <span className="mt-3 flex flex-wrap gap-1.5">
        {cause.helps.map((help) => (
          <span
            key={help}
            className={`rounded-full px-2.5 py-1 text-xs font-medium text-foreground ${cause.tint}`}
          >
            {help}
          </span>
        ))}
      </span>
    </>
  );
}

/** Una tarjeta de la ruleta: ícono sobre el arco y la cápsula con el texto. */
function WheelItem({
  slot,
  rot,
  geo,
  active,
  visible,
  onSelect,
}: {
  slot: number;
  rot: MotionValue<number>;
  geo: Geometry;
  active: boolean;
  visible: boolean;
  onSelect: () => void;
}) {
  const cause = causes[slot % causes.length];
  const Icon = cause.icon;
  const base = slot * SLOT_DEG;
  const x = useTransform(rot, (r) => round2(geo.cx + geo.R * Math.cos(((base + r) * Math.PI) / 180)));
  const y = useTransform(rot, (r) => round2(geo.cy + geo.R * Math.sin(((base + r) * Math.PI) / 180)));
  // Se desvanece al salir del semicírculo visible (más allá de ±60°).
  const opacity = useTransform(rot, (r) => {
    const a = Math.abs(normalize(base + r));
    return round2(Math.max(0, Math.min(1, (88 - a) / 26)));
  });

  return (
    <m.div
      style={{ x, y, opacity }}
      className={`absolute left-0 top-0 flex -translate-y-1/2 items-center ${
        active ? "z-20" : "z-10"
      } ${visible ? "" : "pointer-events-none"}`}
      aria-hidden={!visible}
    >
      <span
        aria-hidden
        className={`relative z-10 -ml-7 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full ring-4 ring-[#ecfaf6] transition-transform duration-300 ${cause.accent} ${
          active ? "scale-110" : ""
        }`}
      >
        <Icon className="h-6 w-6 text-foreground" strokeWidth={1.75} />
      </span>
      <button
        type="button"
        onClick={onSelect}
        tabIndex={visible ? 0 : -1}
        aria-expanded={active}
        style={{ width: geo.pillW }}
        className={`-ml-7 rounded-[1.75rem] py-3 pl-11 pr-6 text-left transition-[background-color,box-shadow] duration-300 ${
          active ? "bg-white shadow-xl shadow-navy/15" : "bg-white/60 hover:bg-white"
        }`}
      >
        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-foreground">
          {cause.area}
        </span>
        <span className="block text-lg font-bold leading-snug text-foreground">
          {cause.title}
        </span>
        <AnimatePresence initial={false}>
          {active && (
            <m.span
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="block overflow-hidden"
            >
              <CauseBody cause={cause} />
            </m.span>
          )}
        </AnimatePresence>
      </button>
    </m.div>
  );
}

/** Foto circular de la causa activa, con fundido entre una y otra. */
function CausePhoto({
  cause,
  className = "",
  style,
}: {
  cause: Cause;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`relative ${className}`} style={style}>
      <AnimatePresence initial={false}>
        <m.span
          key={cause.accent}
          aria-hidden
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute -bottom-3 -left-3 h-[82%] w-[82%] rounded-full ${cause.accent}`}
        />
      </AnimatePresence>
      <div className="relative h-full w-full overflow-hidden rounded-full ring-8 ring-white">
        <AnimatePresence initial={false}>
          <m.div
            key={cause.image.src}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={cause.image.src}
              alt={cause.image.alt}
              fill
              sizes="(min-width: 768px) 320px, 220px"
              className="object-cover"
            />
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function DonationTypes() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const rot = useMotionValue(0);

  const activeCause = causes[mod(step, causes.length)];
  const activeSlot = mod(step, SLOTS);

  // Gira la ruleta hasta la posición del paso actual.
  useEffect(() => {
    const controls = animate(rot, -step * SLOT_DEG, {
      duration: reduceMotion ? 0 : 0.9,
      ease: [0.65, 0, 0.35, 1],
    });
    return () => controls.stop();
  }, [step, rot, reduceMotion]);

  // Avanza sola en loop; se detiene mientras el usuario la mira o la toca.
  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setStep((s) => s + 1);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused]);

  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const selectSlot = useCallback(
    (slot: number) => {
      let delta = mod(slot - step, SLOTS);
      if (delta > SLOTS / 2) delta -= SLOTS;
      setStep((s) => s + delta);
    },
    [step],
  );

  const selectCause = (index: number) => {
    setStep((s) => s + mod(index - s, causes.length));
  };

  const geo = geometryFor(width || 900);

  return (
    <section
      id="donaciones"
      className="scroll-mt-6 sm:-scroll-mt-2 relative isolate overflow-hidden bg-verde/15 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
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
            Hoy, lo que generan tus compras sostiene estas tres causas. Toca
            una para conocerla.
          </p>
        </Reveal>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Escritorio y tablet: ruleta semicircular. */}
          <div
            ref={wheelRef}
            className="relative mt-8 hidden w-full md:block"
            style={{ height: geo.height }}
          >
            <svg aria-hidden className="absolute inset-0 h-full w-full overflow-visible">
              <circle
                cx={geo.cx}
                cy={geo.cy}
                r={geo.R}
                fill="none"
                stroke="#000"
                strokeOpacity="0.35"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                className={reduceMotion ? "" : "animate-[spin_60s_linear_infinite]"}
                style={{ transformOrigin: `${geo.cx}px ${geo.cy}px` }}
              />
            </svg>

            <CausePhoto
              cause={activeCause}
              className="absolute"
              style={{
                left: geo.cx - geo.r,
                top: geo.cy - geo.r,
                width: geo.r * 2,
                height: geo.r * 2,
              }}
            />

            {Array.from({ length: SLOTS }, (_, slot) => {
              const offset = mod(slot - step + SLOTS / 2, SLOTS) - SLOTS / 2;
              return (
                <WheelItem
                  key={slot}
                  slot={slot}
                  rot={rot}
                  geo={geo}
                  active={slot === activeSlot}
                  visible={Math.abs(offset) <= 1}
                  onSelect={() => selectSlot(slot)}
                />
              );
            })}
          </div>

          {/* Celular: misma idea en vertical, con la foto arriba. */}
          <div className="mt-8 md:hidden">
            <CausePhoto cause={activeCause} className="mx-auto h-52 w-52" />
            <ol className="relative mt-8 space-y-3">
              <span
                aria-hidden
                className="absolute bottom-6 left-7 top-6 border-l-2 border-dashed border-foreground/35"
              />
              {causes.map((cause, index) => {
                const Icon = cause.icon;
                const active = cause === activeCause;
                return (
                  <li key={cause.title} className="relative flex items-start">
                    <span
                      aria-hidden
                      className={`relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full ring-4 ring-[#ecfaf6] transition-transform duration-300 ${cause.accent} ${
                        active ? "scale-110" : ""
                      }`}
                    >
                      <Icon className="h-6 w-6 text-foreground" strokeWidth={1.75} />
                    </span>
                    <button
                      type="button"
                      onClick={() => selectCause(index)}
                      aria-expanded={active}
                      className={`-ml-6 flex-1 rounded-[1.5rem] py-3 pl-9 pr-4 text-left transition-[background-color,box-shadow] duration-300 ${
                        active ? "bg-white shadow-lg shadow-navy/15" : "bg-white/60"
                      }`}
                    >
                      <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-foreground">
                        {cause.area}
                      </span>
                      <span className="block font-bold leading-snug text-foreground">
                        {cause.title}
                      </span>
                      <AnimatePresence initial={false}>
                        {active && (
                          <m.span
                            key="body"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="block overflow-hidden"
                          >
                            <CauseBody cause={cause} />
                          </m.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* Así llega tu ayuda: línea de tiempo con los 6 pasos del brochure. */}
      <div className="relative mx-auto mt-20 max-w-[84rem]">
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
          {steps.map((s, index) => (
            <m.li
              key={s.title}
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
                <span className="block font-semibold text-foreground">{s.title}</span>
                <span className="mt-0.5 block text-sm leading-snug text-foreground">
                  {s.text}
                </span>
              </span>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
