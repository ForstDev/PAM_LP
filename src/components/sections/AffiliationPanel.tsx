"use client";

import { useState, type KeyboardEvent } from "react";
import { m } from "motion/react";
import { site } from "@/lib/site";

type Audience = "ong" | "restaurante" | "marca";

const tabs: { id: Audience; label: string }[] = [
  { id: "ong", label: "Organizaciones" },
  { id: "restaurante", label: "Restaurantes" },
  { id: "marca", label: "Marcas y bodegas" },
];

// Contenido para los tres públicos: organizaciones (brochure «para ONGs»,
// 10.3), restaurantes (AyudemosMás Delivery) y marcas y bodegas (brochure
// «para marcas», 10.5, en AyudemosMás Supermarket). Misma estructura en los
// tres para que el cambio sea suave.
const panels: Record<
  Audience,
  {
    title: string;
    /** Corte opcional del título en dos líneas (solo donde ambas caben). */
    titleLines?: [string, string];
    impact: string;
    /** Plataforma donde se publica (chip bajo la frase de impacto). */
    platform?: string;
    steps: { title: string; text: string }[];
    cta: string;
    /** Asunto del correo a alianzas. */
    subject: string;
  }
> = {
  ong: {
    title: "¿Representas una organización con una causa social?",
    titleLines: ["¿Representas una organización", "con una causa social?"],
    impact: "Tu causa, en cada compra.",
    steps: [
      { title: "Conversamos", text: "Nos cuentas tu causa y lo que más necesitas." },
      { title: "Validamos", text: "Revisamos la acreditación y el sustento de tu organización." },
      { title: "Acordamos", text: "Definimos juntos cómo se asignan y reportan los fondos." },
      { title: "Contamos tu historia", text: "Presentamos tu causa a nuestra comunidad." },
    ],
    cta: "Quiero sumar mi organización",
    subject: "Quiero sumar mi organización a AyudemosMás",
  },
  restaurante: {
    title: "¿Tienes un restaurante?",
    impact: "Vende más. Ayuda más.",
    platform: "AyudemosMás Delivery",
    steps: [
      { title: "Conversamos", text: "Nos presentas tu restaurante y tu carta." },
      { title: "Publicamos", text: "Tu carta llega a AyudemosMás Delivery y nuestra flota lleva tus pedidos." },
      { title: "Compartimos el impacto", text: "Te contamos lo que generaron tus ventas." },
    ],
    cta: "Quiero sumar mi restaurante",
    subject: "Quiero sumar mi restaurante a AyudemosMás",
  },
  marca: {
    title: "¿Tienes una marca o una bodega?",
    impact: "Vende más. Ayuda más.",
    platform: "AyudemosMás Supermarket",
    steps: [
      { title: "Conversamos", text: "Nos presentas tu marca o bodega y tus productos." },
      { title: "Acordamos", text: "Definimos precios, stock y condiciones." },
      { title: "Compartimos el impacto", text: "Te contamos lo que generaron tus ventas." },
    ],
    cta: "Quiero sumar mi marca o bodega",
    subject: "Quiero sumar mi marca o bodega a AyudemosMás",
  },
};

/**
 * Afiliación con tres públicos (organizaciones, restaurantes y marcas y
 * bodegas). Los tres paneles ocupan la misma celda de la grilla: el bloque
 * siempre mide lo del panel más alto y el cambio entre pestañas es un
 * fundido, sin saltos de altura. Las flechas izquierda/derecha (e Inicio/Fin)
 * mueven entre pestañas, con tabindex itinerante.
 */
export function AffiliationPanel() {
  const [audience, setAudience] = useState<Audience>("ong");

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = tabs.findIndex((tab) => tab.id === audience);
    let next: number;
    if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    const id = tabs[next].id;
    setAudience(id);
    document.getElementById(`tab-${id}`)?.focus();
  }

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
        onKeyDown={handleKeyDown}
        className="mt-5 flex w-full rounded-full sm:inline-flex sm:w-auto bg-white p-1 shadow-sm shadow-azul/20"
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
              tabIndex={selected ? 0 : -1}
              onClick={() => setAudience(tab.id)}
              className="relative flex-1 rounded-full px-2 py-2.5 text-xs font-semibold leading-tight text-foreground sm:flex-none sm:whitespace-nowrap sm:px-5 sm:py-3 sm:text-sm"
            >
              {selected && (
                <m.span
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
              <h2 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-[2.875rem]">
                {panel.titleLines ? (
                  <>
                    {panel.titleLines[0]}
                    <br className="hidden sm:max-lg:inline xl:inline" />{" "}
                    {panel.titleLines[1]}
                  </>
                ) : (
                  panel.title
                )}
              </h2>
              <p className="text-impact mt-4 text-2xl sm:text-3xl">
                {panel.impact}
              </p>
              {panel.platform && (
                <p className="mt-3 inline-flex rounded-full bg-white/60 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-foreground ring-1 ring-celeste">
                  {panel.platform}
                </p>
              )}

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
                href={`mailto:${site.alliancesEmail}?subject=${encodeURIComponent(panel.subject)}`}
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
