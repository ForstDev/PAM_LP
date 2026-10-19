/**
 * Etiqueta corta sobre el título de cada sección: raya + texto en mayúsculas.
 * La misma en toda la landing para que el usuario sepa siempre dónde está.
 */
export function SectionEyebrow({
  children,
  lineClassName = "bg-verde",
  className = "",
}: {
  children: string;
  lineClassName?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span aria-hidden className={`h-0.5 w-8 ${lineClassName}`} />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
        {children}
      </p>
    </div>
  );
}
