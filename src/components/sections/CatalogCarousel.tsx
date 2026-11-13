"use client";

import useEmblaCarousel from "embla-carousel-react";
import { m } from "motion/react";
import {
  Apple,
  Carrot,
  CupSoda,
  Leaf,
  Milk,
  Plus,
  Rabbit,
  ShoppingBasket,
  Sprout,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { SignatureCircle } from "@/components/SignatureCircle";

type CatalogItem = {
  name: string;
  /** Aclaración opcional en letra menor, debajo del nombre. */
  note?: string;
  icon: LucideIcon;
  color: "verde" | "celeste" | "azul";
};

// Los íconos son componentes (no serializables), así que las listas viven
// aquí, en el lado cliente, y la sección solo elige cuál mostrar por clave.
const catalogs = {
  // Valores que comparten los restaurantes aliados de AyudemosMás Delivery.
  restaurantes: [
    { name: "Restaurantes con opciones vegetarianas", icon: Leaf, color: "celeste" },
    { name: "Restaurantes con opciones veganas", icon: Sprout, color: "celeste" },
    {
      name: "Restaurantes libres de crueldad animal",
      note: "(producción pecuaria y ganadería ética al 100%)",
      icon: Rabbit,
      color: "celeste",
    },
  ],
  // Categorías reales del supermercado (confirmadas: son 6). Primera fila
  // en azul, segunda en verde.
  supermercado: [
    { name: "Frutas", icon: Apple, color: "azul" },
    { name: "Verduras", icon: Carrot, color: "azul" },
    { name: "Lácteos", icon: Milk, color: "azul" },
    { name: "Pastas", icon: Wheat, color: "verde" },
    { name: "Abarrotes", icon: ShoppingBasket, color: "verde" },
    { name: "Bebidas", icon: CupSoda, color: "verde" },
  ],
} satisfies Record<string, CatalogItem[]>;

/**
 * Grilla de tarjetas del catálogo (restaurantes o categorías del
 * supermercado). En móvil (< 768px) es un carrusel con swipe horizontal
 * (Embla); desde sm/md pasa a grilla de 3 columnas. Opcionalmente cierra con
 * una tarjeta estática a todo el ancho ("Muy pronto…").
 */
export function CatalogCarousel({
  catalog,
  comingSoon,
}: {
  catalog: keyof typeof catalogs;
  comingSoon?: string;
}) {
  const items: CatalogItem[] = catalogs[catalog];
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    breakpoints: {
      "(min-width: 768px)": { active: false },
    },
  });

  return (
    <div>
      <div ref={emblaRef} className="-mx-4 overflow-hidden px-4 sm:mx-0 sm:overflow-visible sm:px-0">
        <div className="flex gap-6 sm:grid sm:grid-cols-3 sm:gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              // Por ahora son botones sin destino: todavía no hay tienda a la que
              // llevar (cuando exista la URL de la tienda, aquí va el enlace).
              <m.button
                type="button"
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: (index % 3) * 0.1 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="flex min-w-[65%] max-w-[85%] flex-shrink-0 cursor-pointer items-center gap-5 rounded-3xl border border-foreground bg-white p-5 text-left transition-colors hover:bg-verde/15 sm:min-w-0 sm:max-w-none"
              >
                <SignatureCircle
                  color={item.color}
                  className="h-16 w-16 flex-shrink-0"
                  circleClassName="inset-0"
                >
                  <div className="flex h-16 w-16 items-center justify-center">
                    <Icon className="h-7 w-7 text-foreground" strokeWidth={1.75} />
                  </div>
                </SignatureCircle>

                <p className="text-lg font-semibold text-foreground">
                  {item.name}
                  {item.note && (
                    <span className="mt-0.5 block text-sm font-normal leading-snug">
                      {item.note}
                    </span>
                  )}
                </p>
              </m.button>
            );
          })}
        </div>
      </div>

      {comingSoon && (
        // Tarjeta estática (no es botón): solo anuncia lo que viene.
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-6 flex items-center justify-center gap-4 rounded-3xl border border-foreground/10 bg-white p-5 text-center sm:mt-8"
        >
          <span
            aria-hidden
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-celeste/15"
          >
            <Plus className="h-6 w-6 text-foreground" strokeWidth={1.75} />
          </span>
          <p className="text-lg font-semibold text-foreground">{comingSoon}</p>
        </m.div>
      )}
    </div>
  );
}
