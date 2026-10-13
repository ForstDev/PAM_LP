"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { waLink } from "@/lib/whatsapp";

type Audience = "ong" | "marca";

const tabs: { id: Audience; label: string }[] = [
  { id: "ong", label: "Organizaciones" },
  { id: "marca", label: "Marcas y bodegas" },
];

// Contenido de los brochures del manual: «para ONGs» (10.3) y «para marcas»
// (10.5). Misma estructura en ambos para que el cambio sea suave.
const panels: Record<
  Audience,
  {
    title: string;
    impact: string;
    steps: { title: string; text: string }[];
    cta: string;
    message: string;
  }
> = {
  ong: {
    title: "¿Representas una organización con una causa social?",
    impact: "Tu causa, en cada compra.",
    steps: [
      { title: "Conversamos", text: "Nos cuentas tu causa y lo que más necesitas." },
      { title: "Validamos", text: "Revisamos la acreditación y el sustento de tu organización." },
      { title: "Acordamos", text: "Definimos juntos cómo se asignan y reportan los fondos." },
      { title: "Contamos tu historia", text: "Presentamos tu causa a nuestra comunidad." },
    ],
    cta: "Quiero sumar mi organización",
    message:
      "Hola, represento a una organización con una causa social y quiero conversar sobre una alianza.",
  },
  marca: {
    title: "¿Tienes una marca o una bodega?",
    impact: "Vende más. Ayuda más.",
    steps: [
      { title: "Conversamos", text: "Nos presentas tu marca o bodega y tus productos." },
      { title: "Acordamos", text: "Definimos precios, stock, envíos y condiciones." },
      { title: "Publicamos", text: "Tus productos llegan a la tienda con tu historia." },
      { title: "Compartimos el impacto", text: "Te contamos lo que generaron tus ventas." },
    ],
    cta: "Quiero sumar mi marca o bodega",
    message:
      "Hola, tengo una marca o bodega y quiero conversar sobre cómo vender con ustedes y sumarme a la causa.",
  },
};

/**
 * Afiliación con dos públicos. Los dos paneles ocupan la misma celda de la
 * grilla: el bloque siempre mide lo del panel más alto y el cambio entre
 * pestañas es un fundido, sin saltos de altura.
 */
export function AffiliationPanel() {
  const [audience, setAudience] = useState<Audience>("ong");

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
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
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

      <div className="mt-6 grid">
        {tabs.map(({ id }) => {
          const panel = panels[id];
          const isActive = id === audience;
          return (
            <div
              key={id}
              id={`panel-${id}`}
              role="tabpanel"
              aria-labelledby={`tab-${id}`}
              aria-hidden={!isActive}
              inert={!isActive}
              className={`[grid-area:1/1] transition-[opacity,transform,visibility] duration-300 ease-out ${
                isActive
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-2 opacity-0"
              }`}
            >
              <h2 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                {panel.title}
              </h2>
              <p className="text-impact mt-4 text-2xl sm:text-3xl">
                {panel.impact}
              </p>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                Así empezamos
              </p>
              <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {panel.steps.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm shadow-azul/20"
                  >
                    <span
                      aria-hidden
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-verde text-sm font-bold text-foreground"
                    >
                      {index + 1}
                    </span>
                    <span>
                      <span className="block font-semibold text-foreground">
                        {step.title}
                      </span>
                      <span className="mt-0.5 block text-sm leading-snug text-foreground">
                        {step.text}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <a
                href={waLink(panel.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-verde px-8 py-4 text-base font-semibold text-foreground transition-transform hover:scale-105 active:scale-95"
              >
                {panel.cta}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
