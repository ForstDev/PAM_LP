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
    <footer className="relative isolate overflow-hidden bg-navy pb-28 pt-16 text-white sm:pb-16">
      {/* Burbujas difuminadas de tamaños variados, solo con colores de la
          paleta. Todas a >=48px del borde superior para no cortarse en la
          costura con la sección anterior. */}
      <GlowOrb className="-left-20 top-20 h-72 w-72 bg-verde/20 blur-2xl" />
      <GlowOrb className="-right-16 top-24 h-56 w-56 bg-celeste/20 blur-2xl" />
      <GlowOrb className="bottom-6 right-1/4 h-40 w-40 bg-azul/25 blur-xl" />
      <GlowOrb className="bottom-10 left-1/3 h-24 w-24 bg-celeste/30 blur-lg" />
      <GlowOrb className="left-1/4 top-16 h-14 w-14 bg-azul/40 blur-md" />
      <GlowOrb className="right-1/3 top-20 h-10 w-10 bg-verde/50 blur-sm" />
      <GlowOrb className="bottom-24 right-10 h-6 w-6 bg-celeste/60 blur-sm" />
      <GlowOrb className="bottom-16 left-10 h-8 w-8 bg-verde/40 blur-sm" />
      <GlowOrb className="left-1/2 top-28 h-20 w-20 bg-azul/20 blur-lg" />

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
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {site.claim}. Parte del movimiento cultural MÁS: Proyectos
              Benéficos.
            </p>
            <p className="mt-4 font-serif text-2xl italic text-white">
              {site.tagline}
            </p>
          </div>

          <div className="text-sm">
            <p className="font-semibold text-white">Contacto</p>
            <ul className="mt-3 space-y-2 text-white/70">
              <li>
                <a
                  href={waLink("Hola, quisiera más información sobre AyudemosMás Perú.")}
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
                  href={`mailto:${site.alliancesEmail}`}
                  className="hover:text-white"
                >
                  {site.alliancesEmail}
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
                  {site.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {site.name}. {site.claim}.</p>
          {/* TODO: texto de política de privacidad/acuerdos legales — pendiente
              de que el cliente confirme el contenido real antes de publicarlo. */}
        </div>
      </div>
    </footer>
  );
}
