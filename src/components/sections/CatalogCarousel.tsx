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

type Category = {
  name: string;
  icon: LucideIcon;
};

// Categorías reales del catálogo (confirmadas: son 6).
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
            // Por ahora son botones sin destino: todavía no hay tienda a la que
            // llevar (cuando exista la URL de la tienda, aquí va el enlace).
            <motion.button
              type="button"
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: (index % 3) * 0.1 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="flex min-w-[65%] flex-shrink-0 cursor-pointer items-center gap-5 rounded-3xl border border-foreground bg-white p-5 text-left transition-colors hover:bg-verde/15 sm:min-w-0"
            >
              <SignatureCircle
                color={circleColors[index % circleColors.length]}
                className="h-16 w-16 flex-shrink-0"
                circleClassName="inset-0"
              >
                <div className="flex h-16 w-16 items-center justify-center">
                  <Icon className="h-7 w-7 text-foreground" strokeWidth={1.75} />
                </div>
              </SignatureCircle>

              <p className="text-lg font-semibold text-foreground">
                {category.name}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
