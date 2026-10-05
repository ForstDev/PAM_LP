"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";

// Gráfico ilustrativo del Tablero Oficial de Misiones: no hay cifras reales
// todavía (los montos se publican mes a mes desde las primeras ventas), así
// que las curvas muestran solo la forma de la idea: más compras, más ayuda.
// Nueve puntos por serie: uno por cada etiqueta del eje y uno intermedio.
const series = [
  {
    id: "familias",
    name: "Familias que pasan hambre",
    color: "#7fdbc2",
    values: [8, 16, 22, 20, 38, 50, 62, 74, 92],
  },
  {
    id: "hospitales",
    name: "Hospitales y sus pacientes",
    color: "#66c0da",
    values: [6, 10, 16, 19, 30, 38, 48, 60, 74],
  },
  {
    id: "guerra",
    name: "Víctimas de guerra",
    color: "#7ba4db",
    values: [4, 9, 12, 17, 22, 31, 36, 47, 56],
  },
  {
    id: "animales",
    name: "Animales en abandono",
    color: "#000000",
    values: [3, 5, 9, 8, 18, 22, 28, 36, 44],
  },
] as const;

const xLabels = [
  { top: "Puesta en marcha", bottom: "17 oct 2026" },
  { top: "Mes 3" },
  { top: "Mes 6" },
  { top: "Mes 9" },
  { top: "1 año" },
];

const W = 800;
const H = 440;
const PAD = { l: 20, r: 24, t: 24, b: 16 };

const px = (i: number, count: number) =>
  PAD.l + (i / (count - 1)) * (W - PAD.l - PAD.r);
const py = (v: number) => PAD.t + (1 - v / 100) * (H - PAD.t - PAD.b);

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

export function DonationGrowth() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const labelLeft = (i: number) =>
    `${(px(i * 2, 9) / W) * 100}%`;

  return (
    <section
      id="impacto"
      className="relative isolate overflow-hidden bg-verde/15 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <GlowOrb className="-right-16 top-20 h-64 w-64 bg-celeste/25 blur-2xl" />
      <GlowOrb className="bottom-20 -left-12 h-48 w-48 bg-azul/20 blur-2xl" />
      <GlowOrb className="bottom-24 right-1/4 h-16 w-16 bg-verde/40 blur-lg" />

      <div className="relative mx-auto grid max-w-[84rem] gap-12 xl:grid-cols-[minmax(0,24rem)_1fr] xl:items-center xl:gap-14">
        <Reveal>
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-0.5 w-8 bg-verde" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Hacia dónde va tu ayuda
            </p>
          </div>
          <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Mientras más compras, más ayuda llega
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground">
            Así crecerá la ayuda desde la puesta en marcha. Los montos reales se
            publicarán cada mes a partir de las primeras ventas.
          </p>

          <ul className="mt-8 flex flex-col gap-2.5">
            {series.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(s.id)}
                  onBlur={() => setHovered(null)}
                  aria-label={`Resaltar ${s.name} en el gráfico`}
                  className={`flex w-full items-center gap-3 rounded-full border bg-white px-4 py-2.5 text-left font-medium text-foreground transition-colors ${
                    hovered === s.id ? "border-foreground" : "border-foreground/30"
                  }`}
                >
                  <span
                    aria-hidden
                    className="h-3.5 w-3.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="rounded-3xl border border-foreground bg-white p-4 sm:p-6">
            <div className="relative">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="h-auto w-full"
                role="img"
                aria-label="Gráfico ilustrativo: la ayuda a familias con hambre, hospitales, víctimas de guerra y animales en abandono crece desde la puesta en marcha hasta el primer año."
              >
                {[0, 25, 50, 75, 100].map((v) => (
                  <line
                    key={v}
                    x1={PAD.l}
                    x2={W - PAD.r}
                    y1={py(v)}
                    y2={py(v)}
                    stroke="#000"
                    strokeOpacity={v === 0 ? 0.6 : 0.12}
                    strokeDasharray={v === 0 ? undefined : "4 6"}
                  />
                ))}
                {xLabels.map((_, i) => (
                  <line
                    key={i}
                    x1={px(i * 2, 9)}
                    x2={px(i * 2, 9)}
                    y1={PAD.t}
                    y2={py(0)}
                    stroke="#000"
                    strokeOpacity={0.12}
                    strokeDasharray="4 6"
                  />
                ))}

                {series.map((s, idx) => {
                  const pts = s.values.map(
                    (v, i) => [px(i, 9), py(v)] as [number, number],
                  );
                  const last = pts[pts.length - 1];
                  const dim = hovered !== null && hovered !== s.id;
                  return (
                    <g
                      key={s.id}
                      style={{
                        opacity: dim ? 0.15 : 1,
                        transition: "opacity 200ms ease-out",
                      }}
                    >
                      <motion.path
                        d={smoothPath(pts)}
                        fill="none"
                        stroke={s.color}
                        strokeWidth={s.id === "animales" ? 3.5 : 5}
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
                        stroke="#000"
                        strokeWidth={2}
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
              </svg>

              <div className="relative mt-3 h-[4.5rem] text-xs leading-tight text-foreground sm:h-12 sm:text-sm">
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
                    style={{ left: labelLeft(i) }}
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

            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-foreground pt-4">
              <span className="rounded-full border border-foreground px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                Gráfico ilustrativo, sin cifras
              </span>
              <span className="max-w-sm text-sm text-foreground">
                Junto a AyudemosMás Perú, diversas caridades y ONGs tendrán más
                ayuda en sus misiones.
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
