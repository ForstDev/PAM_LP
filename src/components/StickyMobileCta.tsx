import { waLink } from "@/lib/whatsapp";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-white/95 p-3 backdrop-blur-sm sm:hidden">
      <a
        href={waLink("Hola, quiero comprar y ayudar. ¿Me ayudan con el catálogo?")}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-full bg-verde py-3 text-center text-sm font-semibold text-foreground"
      >
        Comprar y ayudar
      </a>
    </div>
  );
}
