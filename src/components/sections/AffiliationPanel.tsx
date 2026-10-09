"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { groups } from "./issuesData";

type Audience = "ong" | "bodega";

const tabs: { id: Audience; label: string }[] = [
  { id: "ong", label: "Soy una organización" },
  { id: "bodega", label: "Tengo una bodega" },
];

const content = {
  ong: {
    title: "¿Representas una organización con una causa social?",
    impact: "Súmate para formar el cambio",
    cta: "Quiero sumar mi organización",
    message:
      "Hola, represento a una organización con una causa social y quiero conversar sobre una alianza.",
  },
  bodega: {
    title: "¿Tienes una bodega y quieres ayudar?",
    impact: "Suma tu bodega a la causa",
    cta: "Quiero sumar mi bodega",
    message:
      "Hola, tengo una bodega y quiero conversar sobre cómo sumarme a la causa vendiendo productos de primera necesidad.",
  },
} as const;

/**
 * Bloque de afiliación con dos públicos: organizaciones sociales y bodegas
 * aliadas. Un selector arriba cambia el contenido sin alargar la sección.
 */
export function AffiliationPanel() {
  const [audience, setAudience] = useState<Audience>("ong");
  const current = content[audience];

  return (
    <div>
      <div className="flex items-center gap-3">
        <span aria-hidden className="h-0.5 w-8 bg-verde" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
          Afiliación
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Tipo de afiliación"
        className="mt-5 inline-flex rounded-full bg-white p-1 shadow-sm shadow-azul/20"
      >
        {tabs.map((tab) => {
          const selected = tab.id === audience;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setAudience(tab.id)}
              className="relative whitespace-nowrap rounded-full px-4 py-3 text-sm font-semibold text-foreground sm:px-5"
            >
              {selected && (
                <motion.span
                  layoutId="affiliation-pill"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-verde"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 min-h-[22rem]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={audience}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h2 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {current.title}
            </h2>
            <p className="text-impact mt-4 text-2xl sm:text-3xl">
              {current.impact}
            </p>

            {audience === "ong" ? (
              <>
                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                  Temas en los que podemos apoyarte
                </p>
                <ul className="mt-3 grid grid-cols-2 gap-3">
                  {groups.map((group) => (
                    <li
                      key={group.id}
                      className="rounded-2xl bg-white px-4 py-3 shadow-sm shadow-azul/20"
                    >
                      <p className="font-semibold text-foreground">
                        {group.label}
                      </p>
                      <p className="text-sm text-foreground">
                        {group.missionIds.length} misiones
                      </p>
                    </li>
                  ))}
                </ul>
                <a
                  href="#problematicas"
                  className="group mt-4 inline-flex items-center gap-1.5 py-2 text-sm font-medium text-foreground"
                >
                  <span className="border-b border-foreground">
                    Ver las 11 misiones
                  </span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </a>
              </>
            ) : (
              <p className="mt-7 max-w-md text-lg leading-relaxed text-foreground">
                Tus productos de primera necesidad pueden ayudar a las causas.
                Cuéntanos de tu bodega y conversamos cómo sumarla.
              </p>
            )}

            <a
              href={waLink(current.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-verde px-8 py-4 text-base font-semibold text-foreground transition-transform hover:scale-105"
            >
              {current.cta}
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
