import Image from "next/image";
import { site } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";

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
    <footer className="bg-navy pb-12 pt-16 text-white sm:pb-16">
      <div className="relative mx-auto max-w-[84rem] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <Image
              src="/logo-horizontal.svg"
              alt={site.name}
              width={504}
              height={90}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-white">
              {site.claim}. Parte del movimiento cultural MÁS: Proyectos
              Benéficos.
            </p>
            <p className="mt-4 font-serif text-2xl italic text-white">
              {site.tagline}
            </p>
          </div>

          <div className="text-sm">
            <p className="font-semibold text-white">Contacto</p>
            <ul className="mt-1 text-white">
              <li>
                <a
                  href={waLink("Hola, quisiera más información sobre AyudemosMás Perú.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-3 hover:text-white"
                >
                  WhatsApp Business
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-block py-3 hover:text-white">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.alliancesEmail}`}
                  className="inline-block py-3 hover:text-white"
                >
                  {site.alliancesEmail}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-3 hover:text-white"
                >
                  <InstagramIcon className="h-4 w-4" />
                  {site.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/20 pt-6 text-xs text-white">
          <p>© {new Date().getFullYear()} {site.name}. {site.claim}.</p>
          {/* TODO: texto de política de privacidad/acuerdos legales — pendiente
              de que el cliente confirme el contenido real antes de publicarlo. */}
        </div>
      </div>
    </footer>
  );
}
