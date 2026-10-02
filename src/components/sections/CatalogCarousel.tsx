"use client";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import {
  Apple,
  Carrot,
  CupSoda,
  Milk,
  ShoppingBasket,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { SignatureCircle } from "@/components/SignatureCircle";
import { waLink } from "@/lib/whatsapp";

type Category = {
  name: string;
  icon: LucideIcon;
};

// Categorías reales de Iván. Falta confirmar la 7ma — "Pastas" venía
// repetida dos veces en la lista que mandó, así que por ahora van las 6
// que sí están claras.
const categories: Category[] = [
  { name: "Frutas", icon: Apple },
  { name: "Verduras", icon: Carrot },
  { name: "Lácteos", icon: Milk },
  { name: "Pastas", icon: Wheat },
  { name: "Abarrotes", icon: ShoppingBasket },
  { name: "Bebidas", icon: CupSoda },
];

const circleColors = ["verde", "celeste", "azul"] as const;

export function CatalogCarousel() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    breakpoints: {
      "(min-width: 768px)": { active: false },
    },
  });

  return (
    <div ref={emblaRef} className="-mx-4 overflow-hidden px-4 sm:mx-0 sm:overflow-visible sm:px-0">
      <div className="flex gap-6 sm:grid sm:grid-cols-3 sm:gap-8">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: (index % 3) * 0.1 }}
              whileHover={{ y: -4 }}
              className="min-w-[65%] flex-shrink-0 rounded-3xl border border-black/5 p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:min-w-0"
            >
              <SignatureCircle
                color={circleColors[index % circleColors.length]}
                className="h-16 w-16"
                circleClassName="inset-0"
              >
                <div className="flex h-16 w-16 items-center justify-center">
                  <Icon className="h-7 w-7 text-foreground" strokeWidth={1.75} />
                </div>
              </SignatureCircle>

              <p className="mt-5 text-lg font-semibold text-foreground">
                {category.name}
              </p>

              <a
                href={waLink(`Hola, quiero ver el catálogo de ${category.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-foreground underline decoration-verde decoration-2 underline-offset-4"
              >
                Ver por WhatsApp
              </a>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
