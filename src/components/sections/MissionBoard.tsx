"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { Globe, ImageIcon, MapPin } from "lucide-react";
import { StatCounter } from "@/components/StatCounter";
import { groups, missions, type Mission } from "./issuesData";

const solid = {
  verde: "bg-verde",
  celeste: "bg-celeste",
  azul: "bg-azul",
} as const;

const tint = {
  verde: "bg-verde/25",
  celeste: "bg-celeste/25",
  azul: "bg-azul/25",
} as const;

// Foto circular de la misión. Mientras no esté la foto, un marcador del
// mismo color mantiene el espacio y la forma.
function MissionPhoto({ mission }: { mission: Mission }) {
  if (!mission.image) {
    return (
      <div
        className={`flex aspect-square w-full items-center justify-center rounded-full ${tint[mission.color]}`}
      >
        <ImageIcon className="h-1/3 w-1/3 text-foreground" strokeWidth={1.25} />
      </div>
    );
  }
  return (
    <Image
      src={mission.image.src}
      alt={mission.image.alt}
      width={480}
      height={480}
      className="aspect-square w-full rounded-full object-cover"
      sizes="(min-width: 768px) 240px, 192px"
    />
  );
}

function MissionDetail({ mission }: { mission: Mission }) {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-xl shadow-azul/20 sm:p-8">
      {/* En celular: cabecera en fila (foto de 5rem + chip y título) y debajo
          la cifra y las cajas a todo el ancho. Desde md: la foto grande ocupa
          la primera columna en todas las filas y el texto queda centrado en
          vertical en la segunda (las filas 1fr de arriba y abajo lo centran),
          igual que el diseño original de escritorio. */}
      <div className="grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-x-4 md:grid-cols-[minmax(0,15rem)_1fr] md:grid-rows-[1fr_auto_auto_1fr] md:gap-x-8 lg:gap-x-12">
        <div className="relative w-20 md:col-start-1 md:row-span-4 md:row-start-1 md:mx-auto md:w-full">
          <div
            aria-hidden
            className={`absolute -bottom-1.5 -right-1.5 h-[80%] w-[80%] rounded-full md:-bottom-3 md:-right-3 ${solid[mission.color]}`}
          />
          <div className="relative">
            <MissionPhoto mission={mission} />
          </div>
        </div>

        <div className="md:col-start-2 md:row-start-2">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-foreground ${solid[mission.color]}`}
          >
            {mission.ods}
          </span>
          <h3 className="mt-3 font-serif text-xl font-bold leading-tight text-foreground md:text-3xl">
            {mission.title}
          </h3>
        </div>

        <div className="col-span-2 md:col-span-1 md:col-start-2 md:row-start-3">
          {mission.stat ? (
            <div className="mt-5">
              <p className="text-4xl font-bold leading-none text-foreground sm:text-5xl">
                <StatCounter
                  to={mission.stat.value}
                  decimals={mission.stat.decimals}
                  suffix={mission.stat.suffix}
                />
              </p>
              <p className="mt-2 text-sm leading-snug text-foreground md:text-base">
                {mission.stat.label}
              </p>
              {mission.source && (
                <p className="mt-1 text-xs text-foreground">
                  Fuente: {mission.source}
                </p>
              )}
            </div>
          ) : (
            <p className="mt-5 text-base font-medium text-foreground">
              {mission.note ?? "Dato y fuente pendientes"}
            </p>
          )}

          {/* Por debajo de sm las dos cajas se juntan en una sola caja tintada
              con una línea fina entre los bloques; desde sm siguen las dos
              cajas lado a lado. */}
          <div className="mt-6 grid gap-4 max-sm:gap-0 max-sm:divide-y max-sm:divide-foreground/10 max-sm:overflow-hidden max-sm:rounded-2xl sm:grid-cols-2">
            {[
              { icon: MapPin, label: "En el Perú", text: mission.peru },
              { icon: Globe, label: "En el mundo", text: mission.world },
            ].map(({ icon: Icon, label, text }) => (
              <div
                key={label}
                className={`rounded-2xl p-4 max-sm:rounded-none ${tint[mission.color]}`}
              >
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                  {label}
                </p>
                <p className="mt-2 leading-snug text-foreground max-sm:text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function MissionBoard() {
  const [groupId, setGroupId] = useState(groups[0].id);
  const [missionId, setMissionId] = useState(groups[0].missionIds[0]);

  const group = groups.find((g) => g.id === groupId) ?? groups[0];
  const groupMissions = group.missionIds
    .map((id) => missions.find((m) => m.id === id))
    .filter((m): m is Mission => Boolean(m));
  const active = groupMissions.find((m) => m.id === missionId) ?? groupMissions[0];

  const selectGroup = (id: string) => {
    const next = groups.find((g) => g.id === id);
    if (!next) return;
    setGroupId(id);
    setMissionId(next.missionIds[0]);
  };

  return (
    <div>
      {/* Paso 1: elegir un tema. Cuatro pestañas en vez de once elementos. */}
      <div
        role="tablist"
        aria-label="Temas de las misiones"
        className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
      >
        {groups.map((g) => {
          const selected = g.id === groupId;
          return (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectGroup(g.id)}
              className="relative min-h-11 rounded-full px-5 py-3 text-sm font-semibold text-foreground sm:text-base"
            >
              {selected && (
                <m.span
                  layoutId="group-pill"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-verde"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              {!selected && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-white/60"
                />
              )}
              <span className="relative">{g.label}</span>
            </button>
          );
        })}
      </div>

      {/* Paso 2: elegir una misión del tema (2 a 4 fotos circulares).
          Por debajo de sm cada botón mide 4rem y el círculo 56 px para que
          las 4 miniaturas quepan sin cortarse desde 320 px de ancho. */}
      <ul className="mt-8 flex justify-between gap-x-2 sm:justify-start sm:gap-x-10">
        {groupMissions.map((mission) => {
          const selected = mission.id === active.id;
          return (
            <li key={mission.id}>
              <button
                type="button"
                onClick={() => setMissionId(mission.id)}
                aria-pressed={selected}
                className="group flex w-16 flex-col items-center gap-2 text-center sm:w-28"
              >
                <span className="relative block h-14 w-14 sm:h-24 sm:w-24">
                  <m.span
                    aria-hidden
                    initial={false}
                    animate={{ scale: selected ? 1 : 0.6, opacity: selected ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`absolute -bottom-1.5 -right-1.5 h-[85%] w-[85%] rounded-full ${solid[mission.color]}`}
                  />
                  <span
                    className={`relative block h-full w-full overflow-hidden rounded-full transition-all duration-300 ${
                      selected ? "" : "opacity-70 group-hover:opacity-100"
                    }`}
                  >
                    <MissionPhoto mission={mission} />
                  </span>
                </span>
                <span
                  className={`text-xs leading-tight text-foreground sm:text-sm ${
                    selected ? "font-semibold" : "font-medium"
                  }`}
                >
                  {mission.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Paso 3: el detalle de la misión elegida. */}
      <div className="mt-8" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <MissionDetail mission={active} />
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
