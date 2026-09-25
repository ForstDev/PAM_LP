import type { LucideIcon } from "lucide-react";
import { UtensilsCrossed, Sparkles } from "lucide-react";

export type Issue = {
  id: string;
  title: string;
  icon: LucideIcon;
  color: "verde" | "celeste";
  hasContent: boolean;
  summary: string;
  description: string;
  stats?: { value: number; decimals?: number; suffix: string; label: string }[];
  source?: string;
};

// "Hambre" tiene contenido real y aprobado. Las demás son causas futuras del
// enfoque general de donación (no solo hambre) — todavía sin contenido
// confirmado por el cliente, así que llevan lorem ipsum a propósito hasta
// que se defina qué se muestra ahí.
export const issues: Issue[] = [
  {
    id: "hambre",
    title: "Hambre",
    icon: UtensilsCrossed,
    color: "verde",
    hasContent: true,
    summary: "En su peor momento en 15 años.",
    description:
      "En 2025, estas personas se quedaron sin comida o pasaron un día entero sin comer porque no les alcanzó el dinero. El 64% de los peruanos ayudó a un desconocido el último año, pero solo el 13% donó a una organización formal: la generosidad existe, falta el puente.",
    stats: [
      { value: 1.1, decimals: 1, suffix: " millones", label: "sin comida en 2025" },
      { value: 400, suffix: " mil", label: "en Lima y Callao" },
    ],
    source: "INEI vía RPP · CAF World Giving Index 2023 / World Giving Report 2025",
  },
  {
    id: "proxima-causa-1",
    title: "Próxima causa",
    icon: Sparkles,
    color: "celeste",
    hasContent: false,
    summary: "Contenido en definición con el cliente.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    id: "proxima-causa-2",
    title: "Próxima causa",
    icon: Sparkles,
    color: "verde",
    hasContent: false,
    summary: "Contenido en definición con el cliente.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.",
  },
];
