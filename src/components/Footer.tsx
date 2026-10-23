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
              width={456}
              height={99}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-white">
              Transformamos tu compra en ayuda real. Parte de MÁS, un
              movimiento cultural humanitario.
            </p>
            <p className="mt-4 font-serif text-2xl italic text-white">
              {site.tagline}
            </p>
            <p className="mt-1 text-sm text-white">{site.reach}</p>
          </div>

          <div className="text-sm">
            <p className="font-semibold text-white">Contacto</p>
            <ul className="mt-1 text-white">
              <li>
                <a
                  href={waLink("Hola, quisiera más información sobre AyudemosMás.")}
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

        <div className="mt-12 border-t border-white/20 pt-6 text-xs text-white">
          {/* Copyright y firma de FORST en la misma fila desde sm; en celular
              la firma baja debajo del copyright, alineada a la izquierda. */}
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {site.name}.</p>
            <Image
              src="/powered-by-forst.png"
              alt="Powered by FORST"
              width={600}
              height={97}
              className="h-5 w-auto"
            />
          </div>
          {/* TODO: texto de política de privacidad/acuerdos legales — pendiente
              de que el cliente confirme el contenido real antes de publicarlo. */}
        </div>
      </div>
    </footer>
  );
}
