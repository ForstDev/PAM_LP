"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ImageIcon, X } from "lucide-react";
import { StatCounter } from "@/components/StatCounter";
import { issues } from "./issuesData";

const colorBg = { verde: "bg-verde", celeste: "bg-celeste", azul: "bg-azul" } as const;
const colorBorder = {
  verde: "border-verde/40",
  celeste: "border-celeste/40",
  azul: "border-azul/40",
} as const;

export function IssueCardStack() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = issues.find((issue) => issue.id === activeId) ?? null;
  const stacked = issues.filter((issue) => issue.id !== activeId);

  return (
    <div className="flex flex-col items-start gap-8 lg:flex-row">
      {/* Cartillas acumuladas, como un archivero — todavía sin fotografía
          real, así que muestran un placeholder de imagen. Hover levanta la
          cartilla y asoma el título; click la "gradúa" fuera del stack
          hacia el panel de detalle. */}
      <div className="relative h-64 w-full max-w-[19rem] flex-shrink-0 sm:h-72 lg:w-72">
        {stacked.map((issue, index) => (
          <motion.button
            key={issue.id}
            type="button"
            layoutId={`issue-card-${issue.id}`}
            onClick={() => setActiveId(issue.id)}
            initial={false}
            whileHover={{ y: -12, x: 6 }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
            className={`group absolute top-0 flex h-56 w-40 flex-col items-center justify-center gap-3 rounded-[1.75rem] shadow-md transition-shadow hover:shadow-xl sm:h-64 sm:w-48 ${colorBg[issue.color]}`}
            style={{ left: index * 40, zIndex: index, rotate: index % 2 === 0 ? -3 : 2 }}
          >
            <ImageIcon
              className="h-10 w-10 text-foreground/50"
              strokeWidth={1.25}
            />

            <div className="pointer-events-none absolute -bottom-3 left-1/2 w-40 -translate-x-1/2 translate-y-full scale-90 rounded-2xl bg-white px-3 py-2 text-center opacity-0 shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
              <p className="text-xs font-semibold text-foreground">
                {issue.title}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-foreground/60">
                {issue.summary}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Panel de detalle — aparece al lado del stack (no como modal). En
          mobile se apila debajo, a todo el ancho. */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            layoutId={`issue-card-${active.id}`}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full flex-1 overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-lg sm:p-8"
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setActiveId(null)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5 text-foreground hover:bg-foreground/10"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>

            <div className="flex flex-col gap-6 sm:flex-row">
              <div
                className={`flex h-32 w-full flex-shrink-0 items-center justify-center rounded-2xl border-2 bg-foreground/[0.03] sm:h-auto sm:w-40 ${colorBorder[active.color]}`}
              >
                <ImageIcon className="h-10 w-10 text-foreground/35" strokeWidth={1.25} />
              </div>

              <div className="min-w-0 flex-1 pr-8">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${colorBg[active.color]}`}
                  />
                  <h3 className="text-2xl font-bold leading-tight text-foreground">
                    {active.title}
                  </h3>
                </div>

                {!active.hasContent && (
                  <p className="mt-2 inline-block rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/60">
                    Contenido en definición con el cliente
                  </p>
                )}

                {active.stats && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {active.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-3xl font-bold text-foreground">
                          <StatCounter
                            to={stat.value}
                            decimals={stat.decimals}
                            suffix={stat.suffix}
                          />
                        </p>
                        <p className="text-sm text-foreground/70">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="mt-4 leading-relaxed text-foreground/80">
                  {active.description}
                </p>

                {active.source && (
                  <p className="mt-4 text-xs text-foreground/50">
                    Fuente: {active.source}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
