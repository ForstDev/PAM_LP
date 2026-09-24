/**
 * Círculo grande y difuminado (glow) — mismo efecto del Hero, reutilizado
 * como textura atmosférica en otras secciones. `className` controla color,
 * opacidad, tamaño, posición y blur (ej. "bg-verde/40 blur-2xl -right-24 -top-24 h-96 w-96").
 */
export function GlowOrb({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`absolute rounded-full ${className}`} />;
}
