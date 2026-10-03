import Image from "next/image";
import { site } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { GlowOrb } from "@/components/GlowOrb";

// Lucide quitó los íconos de marcas (incluido Instagram) de su set —
// se dibuja a mano, mismo grosor de trazo que el resto de íconos del sitio.
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-plomo pb-28 pt-16 text-white sm:pb-16">
      <GlowOrb className="-left-16 top-16 h-64 w-64 bg-verde/10 blur-2xl" />

      <div className="relative mx-auto max-w-[84rem] px-4 sm:px-6 lg:px-8">
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
              Benéficos.
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
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white"
                >
                  <InstagramIcon className="h-4 w-4" />
                  @peru.ayudemosmas
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {site.name}. Ecommerce Solidario.</p>
          {/* TODO: texto de política de privacidad/acuerdos legales — pendiente
              de que el cliente confirme el contenido real antes de publicarlo. */}
        </div>
      </div>
    </footer>
  );
}
