"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { StatCounter } from "@/components/StatCounter";
import { issues } from "./issuesData";

const colorBg = { verde: "bg-verde", celeste: "bg-celeste" } as const;

export function IssueCardStack() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = issues.find((issue) => issue.id === activeId) ?? null;

  return (
    <>
      {/* Cartillas acumuladas, como un archivero — círculos apilados, sin
          texto por defecto (así nunca se pisan entre sí). Al pasar el mouse
          se levanta y asoma un título en una etiqueta flotante; el click
          abre la cartilla completa. En mobile, el tap abre directo. */}
      <div className="relative flex h-40 items-start pl-2">
        {issues.map((issue, index) => {
          const Icon = issue.icon;
          return (
            <motion.button
              key={issue.id}
              type="button"
              layoutId={`issue-card-${issue.id}`}
              onClick={() => setActiveId(issue.id)}
              initial={false}
              whileHover={{ y: -14, scale: 1.08 }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
              className="group absolute top-0"
              style={{ left: index * 52, zIndex: index }}
            >
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full ring-4 ring-white sm:h-24 sm:w-24 ${colorBg[issue.color]} shadow-md transition-shadow group-hover:shadow-xl`}
              >
                <Icon className="h-8 w-8 text-foreground sm:h-9 sm:w-9" strokeWidth={1.5} />
              </div>

              <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-36 -translate-x-1/2 scale-90 rounded-2xl bg-white px-3 py-2 text-center opacity-0 shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                <p className="text-xs font-semibold text-foreground">
                  {issue.title}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-foreground/60">
                  {issue.summary}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar"
              onClick={() => setActiveId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            />
            <motion.div
              layoutId={`issue-card-${active.id}`}
              className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-xl -translate-y-1/2 rounded-[2rem] bg-white p-8 shadow-2xl sm:inset-x-auto"
            >
              <button
                type="button"
                aria-label="Cerrar"
                onClick={() => setActiveId(null)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5 text-foreground hover:bg-foreground/10"
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full ${colorBg[active.color]}`}
              >
                {(() => {
                  const Icon = active.icon;
                  return <Icon className="h-8 w-8 text-foreground" strokeWidth={1.5} />;
                })()}
              </div>

              <h3 className="mt-5 font-serif text-2xl font-bold uppercase leading-tight text-foreground">
                {active.title}
              </h3>

              {!active.hasContent && (
                <p className="mt-2 inline-block rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/60">
                  Contenido en definición con el cliente
                </p>
              )}

              {active.stats && (
                <div className="mt-5 grid grid-cols-2 gap-4">
                  {active.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-serif text-3xl font-bold text-foreground">
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

              <p className="mt-5 leading-relaxed text-foreground/80">
                {active.description}
              </p>

              {active.source && (
                <p className="mt-4 text-sm text-foreground/60">
                  Fuente: {active.source}
                </p>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
