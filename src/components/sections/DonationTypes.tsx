"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
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
import { ChevronRight, HeartPulse, PawPrint, Utensils, type LucideIcon } from "lucide-react";
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
  ring: string;
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
    ring: "ring-verde",
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
    ring: "ring-celeste",
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
    ring: "ring-azul",
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

type Geometry = {
  cx: number;
  cy: number;
  R: number;
  r: number;
  height: number;
  pillW: number;
  panelW: number;
  panelBelow: boolean;
};

// La ruleta queda a la izquierda y deja espacio a la derecha para el panel de
// información. Si no cabe (tablets angostas), el panel baja bajo la ruleta.
function geometryFor(width: number): Geometry {
  const R = Math.min(Math.max(width * 0.2, 150), 210);
  const r = R - 74;
  const cx = r + 24;
  const height = Math.round(R * 0.87 * 2 + 150);
  // Ancho suficiente para miniatura + título en dos líneas + indicador «›».
  const pillW = width < 1000 ? 280 : 300;
  const panelW = Math.min(380, width - (cx + R + pillW) - 32);
  return { cx, cy: height / 2, R, r, height, pillW, panelW, panelBelow: panelW < 300 };
}

const PANEL_ID = "donacion-detalle";
const PANEL_TITLE_ID = "donacion-detalle-titulo";

/** Miniatura redonda de la foto de la causa (decorativa). */
function CauseThumb({ cause }: { cause: Cause }) {
  return (
    <Image
      src={cause.image.src}
      alt=""
      width={40}
      height={40}
      className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
    />
  );
}

/**
 * Indicador «›» al final de cada cápsula: avisa que se puede tocar. En la
 * cápsula activa el círculo toma el color sólido de la causa. Mientras `pulse`
 * sea true, un anillo late detrás para invitar a la primera interacción.
 */
function ChevronBadge({ cause, active, pulse }: { cause: Cause; active: boolean; pulse: boolean }) {
  return (
    <span
      aria-hidden
      className={`relative ml-auto flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-[transform,background-color] duration-200 ${
        active ? cause.accent : `${cause.tint} group-hover:scale-110`
      }`}
    >
      {pulse && (
        <span className={`absolute inset-0 rounded-full opacity-60 motion-safe:animate-ping ${cause.accent}`} />
      )}
      <ChevronRight
        className={`relative h-4 w-4 text-foreground transition-transform duration-200 ${
          active ? "" : "group-hover:translate-x-0.5"
        }`}
        strokeWidth={2.25}
      />
    </span>
  );
}

/** Texto y etiquetas de la causa (se despliega en la lista del celular). */
function CauseBody({ cause }: { cause: Cause }) {
  return (
    <>
      <p className="text-sm leading-relaxed text-foreground sm:text-base">{cause.text}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {cause.helps.map((help) => (
          <li
            key={help}
            className={`rounded-full px-2.5 py-1 text-xs font-medium text-foreground ${cause.tint}`}
          >
            {help}
          </li>
        ))}
      </ul>
    </>
  );
}

/** Una tarjeta de la ruleta: ícono sobre el arco y la cápsula con foto y título. */
function WheelItem({
  slot,
  rot,
  geo,
  active,
  visible,
  pulse,
  onSelect,
}: {
  slot: number;
  rot: MotionValue<number>;
  geo: Geometry;
  active: boolean;
  visible: boolean;
  pulse: boolean;
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
        aria-pressed={active}
        aria-controls={PANEL_ID}
        style={{ width: geo.pillW }}
        className={`group -ml-7 flex h-[4.5rem] items-center gap-3 rounded-[1.75rem] pl-11 pr-4 text-left transition-[transform,background-color,box-shadow] duration-200 hover:translate-x-1 ${
          active
            ? `bg-white shadow-xl shadow-navy/15 ring-2 ${cause.ring}`
            : "bg-white/60 hover:bg-white hover:shadow-lg hover:shadow-navy/10"
        }`}
      >
        <CauseThumb cause={cause} />
        <span className="line-clamp-2 text-base font-bold leading-snug text-foreground">
          {cause.title}
        </span>
        <ChevronBadge cause={cause} active={active} pulse={pulse} />
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

/**
 * Panel con la información de la causa activa (siempre hay una). Al cambiar de
 * causa hace un fundido (la `key` cambia); el contenedor con el id siempre
 * existe para que `aria-controls` funcione. Solo anuncia los cambios a lectores
 * de pantalla cuando los provoca el usuario (`announce`), no el giro automático.
 */
function CausePanel({
  cause,
  announce,
  panelRef,
  className = "",
  style,
}: {
  cause: Cause;
  announce: boolean;
  panelRef?: (el: HTMLDivElement | null) => void;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      ref={panelRef}
      id={PANEL_ID}
      role="region"
      aria-live={announce ? "polite" : "off"}
      aria-labelledby={PANEL_TITLE_ID}
      className={className}
      style={style}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={cause.title}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-navy/15 sm:p-8"
        >
          <span aria-hidden className={`absolute inset-x-0 top-0 h-1.5 ${cause.accent}`} />
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
            <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${cause.accent}`} />
            {cause.area}
          </span>
          <h3
            id={PANEL_TITLE_ID}
            className="mt-3 font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl"
          >
            {cause.title}
          </h3>
          <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-foreground sm:text-lg">
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
        </m.div>
      </AnimatePresence>
    </div>
  );
}

export function DonationTypes() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  // Pasa a true con el primer toque del usuario: apaga el latido y detiene
  // para siempre el giro automático (el usuario queda en control).
  const [hasInteracted, setHasInteracted] = useState(false);
  // Pausas del giro automático: mouse encima y foco de teclado dentro.
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [width, setWidth] = useState(0);
  // Alto del panel flotante, para que nunca desborde el contenedor de la ruleta.
  const [panelH, setPanelH] = useState(0);
  const [panelEl, setPanelEl] = useState<HTMLDivElement | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const rot = useMotionValue(0);

  // La causa activa es la que está al centro de la ruleta; su información se
  // muestra siempre en el panel (escritorio) o desplegada (celular).
  const activeIndex = mod(step, causes.length);
  const activeCause = causes[activeIndex];
  const activeSlot = mod(step, SLOTS);

  // Gira la ruleta hasta la posición del paso actual.
  useEffect(() => {
    const controls = animate(rot, -step * SLOT_DEG, {
      duration: reduceMotion ? 0 : 0.9,
      ease: [0.65, 0, 0.35, 1],
    });
    return () => controls.stop();
  }, [step, rot, reduceMotion]);

  // Avanza sola en loop hasta la primera interacción. Se pausa mientras el
  // mouse está encima o el foco está dentro. Solo corre con la ruleta a la
  // vista (width > 0): en el celular la ruleta está oculta y la lista no debe
  // desplegarse y plegarse sola.
  const paused = hoverPaused || focusPaused;
  const wheelShown = width > 0;
  useEffect(() => {
    if (reduceMotion || hasInteracted || paused || !wheelShown) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setStep((s) => s + 1);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, hasInteracted, paused, wheelShown]);

  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!panelEl) return;
    const ro = new ResizeObserver(([entry]) => {
      const h = Math.ceil(entry.contentRect.height);
      // Durante el cambio de causa puede medir 0 un instante: se ignora.
      if (h > 0) setPanelH(h);
    });
    ro.observe(panelEl);
    return () => ro.disconnect();
  }, [panelEl]);

  // Clic en una cápsula de la ruleta: la lleva al centro por el camino corto.
  // Si ya es la activa no cambia nada (solo cuenta como interacción).
  const selectSlot = (slot: number) => {
    setHasInteracted(true);
    if (slot === activeSlot) return;
    let delta = mod(slot - step, SLOTS);
    if (delta > SLOTS / 2) delta -= SLOTS;
    setStep((s) => s + delta);
  };

  // Lo mismo en la lista del celular.
  const selectCause = (index: number) => {
    setHasInteracted(true);
    if (index === activeIndex) return;
    setStep((s) => s + mod(index - s, causes.length));
  };

  const onPointerEnter = (e: PointerEvent) => {
    if (e.pointerType === "mouse") setHoverPaused(true);
  };
  const onPointerLeave = (e: PointerEvent) => {
    if (e.pointerType === "mouse") setHoverPaused(false);
  };

  const baseGeo = geometryFor(width || 900);
  // El contenedor crece si el panel flotante es más alto que la ruleta; la
  // ruleta y el panel quedan centrados verticalmente.
  const wheelH = baseGeo.panelBelow ? baseGeo.height : Math.max(baseGeo.height, panelH + 32);
  const geo: Geometry = { ...baseGeo, height: wheelH, cy: wheelH / 2 };
  const fadeIn = `transition-opacity duration-300 ${wheelShown ? "opacity-100" : "opacity-0"}`;

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
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onFocusCapture={() => setFocusPaused(true)}
          onBlurCapture={() => setFocusPaused(false)}
        >
          {/* Escritorio y tablet: ruleta semicircular. Invisible hasta medir
              el ancho, para que las cápsulas no salten de posición. */}
          <div
            ref={wheelRef}
            className={`relative mt-8 hidden w-full md:block ${fadeIn}`}
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
                className="motion-safe:animate-[spin_60s_linear_infinite]"
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
              const active = slot === activeSlot;
              const visible = Math.abs(offset) <= 1;
              return (
                <WheelItem
                  key={slot}
                  slot={slot}
                  rot={rot}
                  geo={geo}
                  active={active}
                  visible={visible}
                  pulse={visible && !active && !hasInteracted}
                  onSelect={() => selectSlot(slot)}
                />
              );
            })}

            {!geo.panelBelow && (
              <CausePanel
                cause={activeCause}
                announce={hasInteracted}
                panelRef={setPanelEl}
                className="absolute right-0 top-1/2 z-30 -translate-y-1/2"
                style={{ width: geo.panelW }}
              />
            )}
          </div>

          {/* Tablets angostas: el panel va debajo de la ruleta. */}
          {geo.panelBelow && (
            <CausePanel
              cause={activeCause}
              announce={hasInteracted}
              className={`relative mt-6 hidden w-full max-w-xl md:block ${fadeIn}`}
            />
          )}

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
                const active = index === activeIndex;
                const bodyId = `donacion-movil-${index}`;
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
                    <div
                      className={`-ml-6 min-w-0 flex-1 rounded-[1.5rem] transition-[transform,background-color,box-shadow] duration-200 hover:translate-x-1 ${
                        active
                          ? "bg-white shadow-lg shadow-navy/15"
                          : "bg-white/60 hover:shadow-lg hover:shadow-navy/10"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => selectCause(index)}
                        aria-pressed={active}
                        aria-controls={bodyId}
                        className="group flex w-full items-center gap-3 rounded-[1.5rem] py-3 pl-9 pr-4 text-left"
                      >
                        <CauseThumb cause={cause} />
                        <span className="min-w-0 font-bold leading-snug text-foreground">
                          {cause.title}
                        </span>
                        <ChevronBadge cause={cause} active={active} pulse={!active && !hasInteracted} />
                      </button>
                      {/* Siempre montado (el id existe para aria-controls);
                          plegado y fuera del árbol accesible si no es el activo. */}
                      <m.div
                        id={bodyId}
                        initial={false}
                        animate={active ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        aria-hidden={!active}
                        inert={!active}
                        className="overflow-hidden"
                      >
                        <div className="pb-3 pl-9 pr-4">
                          <CauseBody cause={cause} />
                        </div>
                      </m.div>
                    </div>
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
