"use client";

import { useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HeartPulse, PawPrint, Utensils, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";

type Series = {
  id: string;
  name: string;
  funds: string;
  color: string;
  icon: LucideIcon;
  values: number[];
};

// Gráfico ilustrativo del Tablero Oficial de Misiones: no hay cifras reales
// todavía (los montos se publican mes a mes desde las primeras ventas), así
// que las curvas muestran solo la forma de la idea: más compras, más ayuda.
// Nueve puntos por serie: uno por cada etiqueta del eje y uno intermedio.
const series: Series[] = [
  {
    id: "familias",
    name: "Familias que pasan hambre",
    funds: "Comedores y programas de seguridad alimentaria.",
    color: "#7fdbc2",
    icon: Utensils,
    values: [8, 16, 22, 20, 38, 50, 62, 74, 92],
  },
  {
    id: "hospitales",
    name: "Hospitales y sus pacientes",
    funds: "Tratamientos médicos itinerantes y combate a la anemia.",
    color: "#66c0da",
    icon: HeartPulse,
    values: [6, 10, 16, 19, 30, 38, 48, 60, 74],
  },
  {
    id: "animales",
    name: "Animales en abandono",
    funds: "Esterilización, rescate y apoyo a albergues.",
    color: "#7ba4db",
    icon: PawPrint,
    values: [3, 5, 9, 8, 18, 22, 28, 36, 44],
  },
];

const xLabels = [
  { top: "Puesta en marcha", bottom: "17 oct 2026" },
  { top: "Mes 3" },
  { top: "Mes 6" },
  { top: "Mes 9" },
  { top: "1 año" },
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

const W = 800;
const H = 440;
const PAD = { l: 20, r: 24, t: 24, b: 16 };
const POINTS = 9;

const px = (i: number) => PAD.l + (i / (POINTS - 1)) * (W - PAD.l - PAD.r);
const py = (v: number) => PAD.t + (1 - v / 100) * (H - PAD.t - PAD.b);
const labelX = (i: number) => px(i * 2);

// Curva suave (Catmull-Rom → Bézier) que pasa por todos los puntos.
function smoothPath(points: [number, number][]) {
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

const paths = series.map((s) => {
  const pts = s.values.map((v, i) => [px(i), py(v)] as [number, number]);
  const line = smoothPath(pts);
  const area = `${line} L ${px(POINTS - 1)} ${py(0)} L ${px(0)} ${py(0)} Z`;
  return { line, area, pts };
});

export function DonationGrowth() {
  // `hovered` es la vista previa al pasar el mouse; `selected` queda fijo al
  // tocar una tarjeta (útil en celular, donde no hay hover).
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [scrub, setScrub] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const focus = hovered ?? selected;

  // Recorre el gráfico con el puntero: se engancha a la etiqueta más cercana.
  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    xLabels.forEach((_, i) => {
      if (Math.abs(labelX(i) - x) < Math.abs(labelX(nearest) - x)) nearest = i;
    });
    setScrub(nearest);
  };

  return (
    <section
      id="donaciones"
      className="scroll-mt-5 sm:-scroll-mt-3 relative isolate overflow-hidden bg-verde/15 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <GlowOrb className="-right-16 top-20 h-64 w-64 bg-celeste/25 blur-2xl" />
      <GlowOrb className="bottom-20 -left-12 h-48 w-48 bg-azul/20 blur-2xl" />
      <GlowOrb className="bottom-24 right-1/4 h-16 w-16 bg-verde/40 blur-lg" />

      <div className="relative mx-auto grid max-w-[84rem] gap-12 xl:grid-cols-[minmax(0,24rem)_1fr] xl:items-center xl:gap-14">
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
          <p className="mt-5 text-lg leading-relaxed text-foreground">
            Mientras más compras, más ayuda llega. Los montos reales se
            publicarán cada mes desde las primeras ventas.
          </p>

          {/* Tarjetas seleccionables: resaltan su línea en el gráfico. */}
          <ul className="mt-8 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {series.map((s) => {
              const Icon = s.icon;
              const isOn = focus === s.id;
              const isPinned = selected === s.id;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setHovered(s.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(s.id)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setSelected(isPinned ? null : s.id)}
                    aria-pressed={isPinned}
                    className={`flex h-full w-full items-start gap-3 rounded-2xl bg-white p-4 text-left transition-all duration-200 ${
                      isOn
                        ? "-translate-y-0.5 shadow-lg shadow-azul/30"
                        : "shadow-sm shadow-azul/10"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: s.color }}
                    >
                      <Icon className="h-5 w-5 text-foreground" strokeWidth={1.75} />
                    </span>
                    <span>
                      <span className="block font-semibold leading-snug text-foreground">
                        {s.name}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-foreground">
                        {s.funds}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="rounded-3xl bg-navy p-4 text-white shadow-xl shadow-navy/20 sm:p-6">
            <div className="relative">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="h-auto w-full touch-pan-y"
                role="img"
                aria-label="Gráfico ilustrativo: la ayuda a familias con hambre, hospitales y animales en abandono crece desde la puesta en marcha hasta el primer año."
                onPointerMove={onPointerMove}
                onPointerDown={onPointerMove}
                onPointerLeave={() => setScrub(null)}
              >
                <defs>
                  {series.map((s) => (
                    <linearGradient key={s.id} id={`area-${s.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={s.color} stopOpacity={0.45} />
                      <stop offset="100%" stopColor={s.color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>

                {[0, 25, 50, 75, 100].map((v) => (
                  <line
                    key={v}
                    x1={PAD.l}
                    x2={W - PAD.r}
                    y1={py(v)}
                    y2={py(v)}
                    stroke="#fff"
                    strokeOpacity={v === 0 ? 0.5 : 0.14}
                    strokeDasharray={v === 0 ? undefined : "4 6"}
                  />
                ))}
                {xLabels.map((_, i) => (
                  <line
                    key={i}
                    x1={labelX(i)}
                    x2={labelX(i)}
                    y1={PAD.t}
                    y2={py(0)}
                    stroke="#fff"
                    strokeOpacity={0.14}
                    strokeDasharray="4 6"
                  />
                ))}

                {/* Área degradada bajo la serie resaltada. */}
                {series.map((s, idx) => (
                  <path
                    key={`area-${s.id}`}
                    d={paths[idx].area}
                    fill={`url(#area-${s.id})`}
                    style={{
                      opacity: focus === s.id ? 1 : 0,
                      transition: "opacity 250ms ease-out",
                    }}
                  />
                ))}

                {series.map((s, idx) => {
                  const last = paths[idx].pts[POINTS - 1];
                  const dim = focus !== null && focus !== s.id;
                  return (
                    <g
                      key={s.id}
                      style={{
                        opacity: dim ? 0.2 : 1,
                        transition: "opacity 200ms ease-out",
                      }}
                    >
                      <motion.path
                        d={paths[idx].line}
                        fill="none"
                        stroke={s.color}
                        strokeWidth={focus === s.id ? 7 : 5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: reduceMotion ? 1 : 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                          duration: reduceMotion ? 0 : 1.6,
                          delay: reduceMotion ? 0 : idx * 0.15,
                          ease: "easeOut",
                        }}
                      />
                      <motion.circle
                        cx={last[0]}
                        cy={last[1]}
                        r={8}
                        fill={s.color}
                        stroke="#434b56"
                        strokeWidth={3}
                        initial={{ opacity: reduceMotion ? 1 : 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                          duration: 0.3,
                          delay: reduceMotion ? 0 : 1.6 + idx * 0.15,
                        }}
                      />
                    </g>
                  );
                })}

                {/* Guía vertical al recorrer el gráfico. */}
                {scrub !== null && (
                  <g pointerEvents="none">
                    <line
                      x1={labelX(scrub)}
                      x2={labelX(scrub)}
                      y1={PAD.t}
                      y2={py(0)}
                      stroke="#fff"
                      strokeOpacity={0.7}
                      strokeWidth={2}
                    />
                    {series.map((s, idx) => (
                      <circle
                        key={s.id}
                        cx={labelX(scrub)}
                        cy={paths[idx].pts[scrub * 2][1]}
                        r={7}
                        fill={s.color}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </g>
                )}
              </svg>

              {/* Burbuja de la guía: solo nombra el momento, sin cifras. */}
              <AnimatePresence>
                {scrub !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`pointer-events-none absolute top-2 rounded-xl bg-white px-3 py-2 text-xs text-foreground shadow-lg ${
                      scrub === 0
                        ? ""
                        : scrub === xLabels.length - 1
                          ? "-translate-x-full"
                          : "-translate-x-1/2"
                    }`}
                    style={{ left: `${(labelX(scrub) / W) * 100}%` }}
                  >
                    <p className="font-semibold">{xLabels[scrub].top}</p>
                    <p>
                      {scrub === 0 ? "Empieza la ayuda" : "La ayuda sigue creciendo"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative mt-3 h-[4.5rem] text-xs leading-tight text-white sm:h-12 sm:text-sm">
                {xLabels.map((label, i) => (
                  <p
                    key={label.top}
                    className={`absolute top-0 ${
                      i === 0
                        ? "w-14 text-left sm:w-auto sm:whitespace-nowrap"
                        : i === xLabels.length - 1
                          ? "-translate-x-full whitespace-nowrap text-right"
                          : "-translate-x-1/2 whitespace-nowrap text-center"
                    }`}
                    style={{ left: `${(labelX(i) / W) * 100}%` }}
                  >
                    <span className="font-semibold">{label.top}</span>
                    {label.bottom && (
                      <>
                        <br />
                        {label.bottom}
                      </>
                    )}
                  </p>
                ))}
              </div>
            </div>

            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4">
              <span className="rounded-full bg-verde px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                Gráfico ilustrativo, sin cifras
              </span>
              <span className="max-w-sm text-sm text-white">
                Recorre el gráfico o toca una causa para resaltarla.
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* Así llega tu ayuda: el recorrido de cada sol, del brochure. */}
      <div className="relative mx-auto mt-16 max-w-[84rem]">
        <Reveal>
          <h3 className="font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            Así llega tu ayuda
          </h3>
          <p className="mt-2 max-w-2xl text-foreground">
            Cada compra podrá responder «¿qué pasó con mi compra?», con
            reportes abiertos y periódicos.
          </p>
        </Reveal>
        <ol className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 * index }}
              className="rounded-2xl bg-white p-4 shadow-sm shadow-azul/10"
            >
              <span
                aria-hidden
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-foreground ${
                  index === 3 ? "bg-verde" : "bg-verde/35"
                }`}
              >
                {index + 1}
              </span>
              <p className="mt-3 font-semibold text-foreground">{step.title}</p>
              <p className="mt-1 text-sm leading-snug text-foreground">
                {step.text}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
