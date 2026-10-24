"use client";

import { m } from "motion/react";
import { Reveal } from "@/components/Reveal";

type Channel = {
  name: string;
  status: "Ahora" | "Próximamente";
  text: string;
  items?: string[];
  claim: string;
};

// Arquitectura de marca del manual (2.8): la marca madre es AyudemosMás y
// cada canal se nombra AyudemosMás + una palabra.
const channels: Channel[] = [
  {
    name: "AyudemosMás Delivery",
    status: "Ahora",
    text: "Te llevamos lo que necesites. Un canal de ventas para restaurantes y productos de primera necesidad.",
    claim: "Aquí pedir delivery también es ayudar.",
  },
  {
    name: "AyudemosMás Tiendas",
    status: "Próximamente",
    text: "Tiendas virtuales por categoría de productos y servicios.",
    items: ["Supermarket", "Tecnología", "Moda"],
    claim: "Aquí usar tiendas virtuales también es ayudar.",
  },
  {
    name: "AyudemosMás Vende",
    status: "Próximamente",
    text: "Para vender lo que ya no usas o alquilar lo tuyo, como un departamento.",
    claim: "Aquí vender también es ayudar.",
  },
];

const ringColor = ["", "ring-celeste", "ring-azul"];
const dotColor = ["bg-verde", "bg-celeste", "bg-azul"];

/**
 * Punto de partida y evolución: dónde empieza AyudemosMás y qué viene
 * después. Una línea de tiempo que se dibuja al entrar en pantalla.
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
          Empezamos con delivery. Vamos por más.
        </h3>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-foreground">
          Después del delivery vienen las tiendas y un espacio para{" "}
          <br className="hidden lg:inline" />
          vender lo tuyo. En todos, las ganancias van a ayudar.
        </p>
      </Reveal>

      <ol className="relative mt-10 grid gap-5 md:grid-cols-3 md:gap-6 md:pt-10">
        {/* Línea de tiempo: horizontal en escritorio, vertical en celular. */}
        <m.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute left-[16.6%] right-[16.6%] top-[0.6rem] hidden h-0.5 origin-left bg-foreground/20 md:block"
        />
        <m.span
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute bottom-8 left-[0.55rem] top-8 w-0.5 origin-top bg-foreground/20 md:hidden"
        />

        {channels.map((channel, index) => {
          const isNow = channel.status === "Ahora";
          return (
            <m.li
              key={channel.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 * index }}
              className="relative pl-8 md:pl-0"
            >
              {/* Punto de la línea de tiempo; el canal activo late. */}
              <span
                aria-hidden
                className="absolute left-0 top-7 flex h-5 w-5 items-center justify-center md:-top-10 md:left-1/2 md:-translate-x-1/2"
              >
                {isNow && (
                  <span className="absolute h-full w-full animate-ping rounded-full bg-verde opacity-60" />
                )}
                <span
                  className={`relative h-4 w-4 rounded-full ${
                    isNow
                      ? `${dotColor[index]} ring-4 ring-white`
                      : `bg-white ring-2 ${ringColor[index]}`
                  }`}
                />
              </span>

              <m.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`flex h-full flex-col rounded-3xl p-6 ${
                  isNow
                    ? "bg-verde shadow-lg shadow-verde/30"
                    : `bg-white shadow-sm shadow-azul/10 ring-1 ${ringColor[index]}`
                }`}
              >
                <span
                  className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-foreground ${
                    isNow ? "bg-white" : `ring-1 ${ringColor[index]}`
                  }`}
                >
                  {channel.status}
                </span>
                <h4 className="mt-4 text-xl font-bold text-foreground">
                  {channel.name}
                </h4>
                <p className="mt-2 leading-relaxed text-foreground">
                  {channel.text}
                </p>
                {channel.items && (
                  <ul className="mt-3 space-y-1">
                    {channel.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <span aria-hidden className={`h-2 w-2 rounded-full ${dotColor[index]}`} />
                        AyudemosMás {item}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-impact mt-auto pt-5 text-lg">
                  {channel.claim}
                </p>
              </m.div>
            </m.li>
          );
        })}
      </ol>
    </div>
  );
}
