"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ImageIcon } from "lucide-react";
import { StatCounter } from "@/components/StatCounter";
import { missions, type Mission } from "./issuesData";

const accentBar = {
  verde: "bg-verde",
  celeste: "bg-celeste",
  azul: "bg-azul",
} as const;

const imageTint = {
  verde: "bg-verde/20",
  celeste: "bg-celeste/20",
  azul: "bg-azul/20",
} as const;

function MissionDetail({ mission }: { mission: Mission }) {
  return (
    <article className="rounded-3xl border border-foreground bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-foreground px-3 py-1 text-xs font-semibold text-foreground">
          {mission.ods}
        </span>
        <span className="rounded-full border border-foreground px-3 py-1 text-xs font-medium text-foreground">
          {mission.framework}
        </span>
      </div>

      <h3 className="mt-4 font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl">
        {mission.title}
      </h3>

      <div
        className={`mt-6 flex aspect-[16/6] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-foreground ${imageTint[mission.color]}`}
      >
        <ImageIcon className="h-8 w-8 text-foreground" strokeWidth={1.25} />
        <span className="text-xs font-medium text-foreground">
          Imagen por definir
        </span>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
            En el Perú
          </p>
          <p className="mt-2 leading-relaxed text-foreground">{mission.peru}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
            En el mundo
          </p>
          <p className="mt-2 leading-relaxed text-foreground">{mission.world}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-foreground pt-6">
        {mission.stats ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              {mission.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-foreground">
                    <StatCounter
                      to={stat.value}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="text-sm text-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
            {mission.context && (
              <p className="mt-4 leading-relaxed text-foreground">
                {mission.context}
              </p>
            )}
            {mission.source && (
              <p className="mt-3 text-xs text-foreground">
                Fuente: {mission.source}
              </p>
            )}
          </>
        ) : (
          <p className="inline-block rounded-full border border-foreground px-3 py-1 text-xs font-medium text-foreground">
            Dato y fuente pendientes
          </p>
        )}
      </div>
    </article>
  );
}

export function MissionBoard() {
  const [activeId, setActiveId] = useState<string>(missions[0].id);
  const active = missions.find((m) => m.id === activeId) ?? missions[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-start lg:gap-12">
      {/* Archivero: cada misión es una cartilla alineada con borde propio.
          En mobile el detalle se despliega justo debajo de la cartilla. */}
      <ul className="flex flex-col gap-3">
        {missions.map((mission) => {
          const isActive = mission.id === activeId;
          return (
            <li key={mission.id}>
              <button
                type="button"
                onClick={() => setActiveId(mission.id)}
                aria-expanded={isActive}
                aria-controls={`mission-${mission.id}`}
                className={`relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-foreground bg-white py-4 pl-6 pr-4 text-left transition-transform duration-200 ease-out hover:translate-x-1 ${
                  isActive ? "translate-x-2 shadow-md hover:translate-x-2" : ""
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 w-2 ${accentBar[mission.color]}`}
                />
                <span className="text-sm font-semibold tabular-nums text-foreground">
                  {mission.number}
                </span>
                <span className="font-medium leading-snug text-foreground">
                  {mission.title}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    id={`mission-${mission.id}`}
                    key="detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden lg:hidden"
                  >
                    <div className="pt-3">
                      <MissionDetail mission={mission} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:sticky lg:top-28 lg:block">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <MissionDetail mission={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
