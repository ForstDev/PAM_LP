import Image from "next/image";
import { site } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { GlowOrb } from "@/components/GlowOrb";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-foreground pb-28 pt-16 text-white sm:pb-16">
      <GlowOrb className="-left-20 -top-24 h-72 w-72 bg-verde/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <Image
              src="/logo-horizontal.svg"
              alt={site.name}
              width={560}
              height={100}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {site.claim}. Parte del movimiento cultural MÁS: Proyectos
              Benéficos. Somos un movimiento cultural, no político.
            </p>
          </div>

          <div className="text-sm">
            <p className="font-semibold text-white">Contacto</p>
            <ul className="mt-3 space-y-2 text-white/70">
              <li>
                <a
                  href={waLink("Hola, quisiera más información sobre PerúAyudemosMás.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp Business
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} {site.name} — Ecommerce Solidario.
        </div>
      </div>
    </footer>
  );
}
