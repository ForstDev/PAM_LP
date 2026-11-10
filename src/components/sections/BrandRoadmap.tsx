"use client";

import { m } from "motion/react";
import { Reveal } from "@/components/Reveal";

type Channel = {
  name: string;
  text: string;
  items?: string[];
  /** Línea final de la lista, sin el prefijo de marca. */
  more?: string;
  claim: string;
};

type Phase = {
  label: string;
  status: string;
  /** La fase en marcha: tarjeta verde, punto que late y canales lado a lado. */
  current: boolean;
  channels: Channel[];
};

// Arquitectura de marca del manual (2.8): la marca madre es AyudemosMás y
// cada canal se nombra AyudemosMás + una palabra.
const phases: Phase[] = [
  {
    label: "Fase 1",
    status: "Llega en noviembre",
    current: true,
    channels: [
      {
        name: "AyudemosMás Delivery",
        text: "Tu comida favorita de restaurantes aliados, hasta la puerta de tu casa.",
        claim: "Aquí pedir delivery también es ayudar.",
      },
      {
        name: "AyudemosMás Supermarket",
        text: "Tu supermercado virtual con productos de primera necesidad, como abarrotes, frutas y verduras, con nuestro propio delivery.",
        claim: "Aquí hacer tus compras también es ayudar.",
      },
    ],
  },
  {
    label: "Fase 2",
    status: "Próximamente",
    current: false,
    channels: [
      {
        name: "AyudemosMás Tiendas",
        text: "Tiendas virtuales por categoría.",
        items: ["Tecnología", "Moda", "Hogar"],
        more: "Y muchas Más",
        claim: "Aquí usar tiendas virtuales también es ayudar.",
      },
    ],
  },
  {
    label: "Fase 3",
    status: "Más adelante",
    current: false,
    channels: [
      {
        name: "AyudemosMás B2B",
        text: "Abastecimiento para empresas y negocios.",
        claim: "Aquí abastecer tu negocio también es ayudar.",
      },
    ],
  },
];

// Verde más oscuro para que la etiqueta de la fase activa se lea sobre blanco.
const currentLabelColor = "text-[color-mix(in_oklab,var(--color-verde),black_40%)]";

function ChannelBody({ channel }: { channel: Channel }) {
  return (
    <>
      <h4 className="text-xl font-bold leading-snug text-foreground break-words sm:text-2xl">
        {channel.name}
      </h4>
      <p className="mt-2 leading-relaxed text-foreground">{channel.text}</p>
      {channel.items && (
        <ul className="mt-3 space-y-1">
          {channel.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-celeste" />
              AyudemosMás {item}
            </li>
          ))}
          {channel.more && (
            <li className="flex items-center gap-2 text-sm text-foreground">
              <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-celeste" />
              {channel.more}
            </li>
          )}
        </ul>
      )}
      <p className="text-impact mt-auto pt-5 text-lg">{channel.claim}</p>
    </>
  );
}

/**
 * Punto de partida y evolución: dónde empieza AyudemosMás y qué viene
 * después, en tres fases. Una línea de tiempo que se dibuja al entrar en
 * pantalla: horizontal en escritorio, vertical a la izquierda en celular.
 */
export function BrandRoadmap() {
  return (
    <div className="relative mx-auto mt-16 max-w-[84rem] border-t border-foreground/10 pt-14">
      <Reveal>
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-0.5 w-8 bg-verde" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
            Punto de partida
          </p>
        </div>
        <h3 className="mt-4 max-w-2xl font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          Empezamos en noviembre. Vamos por más.
        </h3>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-foreground">
          En cada fase, el 100% de las ganancias está dirigido a ayudar.
        </p>
      </Reveal>

      <ol className="relative mt-10 grid gap-8 lg:grid-cols-[2fr_1fr_1fr]">
        {/* Línea de tiempo: horizontal en escritorio, vertical en celular. */}
        <m.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-x-0 top-[0.5625rem] hidden h-0.5 origin-left bg-celeste/60 lg:block"
        />
        <m.span
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute bottom-8 left-[0.5625rem] top-2 w-0.5 origin-top bg-celeste/60 lg:hidden"
        />

        {phases.map((phase, index) => {
          const { current } = phase;
          return (
            <m.li
              key={phase.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 * index }}
              className="relative flex min-w-0 flex-col pl-8 lg:pl-0"
            >
              {/* Punto de la línea de tiempo y etiqueta de la fase; la fase activa late. */}
              <div className="relative flex h-5 items-center lg:h-auto lg:flex-col lg:gap-3">
                <span
                  aria-hidden
                  className="absolute -left-8 top-0 flex h-5 w-5 items-center justify-center lg:static"
                >
                  {current && (
                    <span className="absolute h-full w-full animate-ping rounded-full bg-verde opacity-60" />
                  )}
                  <span
                    className={`relative h-4 w-4 rounded-full ${
                      current
                        ? "bg-verde ring-4 ring-verde/30"
                        : "bg-white ring-2 ring-celeste"
                    }`}
                  />
                </span>
                <p
                  className={`text-xs font-bold uppercase tracking-[0.2em] ${
                    current ? currentLabelColor : "text-foreground/60"
                  }`}
                >
                  {phase.label}
                </p>
              </div>

              <m.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`mt-4 flex flex-1 flex-col rounded-3xl ${
                  current
                    ? "bg-verde p-5 shadow-lg shadow-verde/30 sm:p-7"
                    : "bg-white p-6 shadow-sm shadow-azul/10 ring-1 ring-celeste sm:p-7"
                }`}
              >
                <span
                  className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-foreground ${
                    current ? "bg-white" : "ring-1 ring-celeste"
                  }`}
                >
                  {phase.status}
                </span>

                {current ? (
                  // Fase activa: un canal por tarjeta interna, lado a lado.
                  <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
                    {phase.channels.map((channel) => (
                      <div
                        key={channel.name}
                        className="flex min-w-0 flex-col rounded-2xl bg-white/45 p-5 sm:p-6"
                      >
                        <ChannelBody channel={channel} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 flex flex-1 flex-col">
                    {phase.channels.map((channel) => (
                      <ChannelBody key={channel.name} channel={channel} />
                    ))}
                  </div>
                )}
              </m.div>
            </m.li>
          );
        })}
      </ol>
    </div>
  );
}
