import Image from "next/image";
import { site } from "@/lib/site";
import { PrivacyDialog } from "./PrivacyDialog";

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

// Nota musical (forma del logo de TikTok), mismo estilo de trazo.
function TikTokIcon({ className = "" }: { className?: string }) {
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
      <path d="M13 3v13" />
      <path d="M13 3c0 3 2.2 5 5.5 5" />
      <circle cx="9.5" cy="16.5" r="3.5" />
    </svg>
  );
}

type Social = { href: string; label: string; network: "Instagram" | "TikTok" };

const socialGroups: { title: string; links: Social[] }[] = [
  {
    title: site.name,
    links: [
      { href: site.instagram, network: "Instagram", label: `Instagram de ${site.name} (${site.instagramHandle})` },
      { href: site.tiktok, network: "TikTok", label: `TikTok de ${site.name} (${site.tiktokHandle})` },
    ],
  },
  {
    title: "Movimiento MÁS",
    links: [
      {
        href: site.movementInstagram,
        network: "Instagram",
        label: `Instagram del Movimiento MÁS (${site.movementInstagramHandle})`,
      },
      {
        href: site.movementTiktok,
        network: "TikTok",
        label: `TikTok del Movimiento MÁS (${site.movementTiktokHandle})`,
      },
    ],
  },
];

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

          <div className="text-sm sm:w-56">
            <p className="font-semibold text-white">Contacto</p>
            <ul className="mt-1 text-white">
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
            </ul>

            <div className="mt-3 flex flex-col gap-3">
              {socialGroups.map((group) => (
                <div key={group.title}>
                  <p className="text-xs font-semibold text-white">{group.title}</p>
                  <ul className="flex flex-wrap gap-x-5 text-white">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.label}
                          className="inline-flex min-h-11 items-center gap-1.5 hover:text-white"
                        >
                          {link.network === "Instagram" ? (
                            <InstagramIcon className="h-4 w-4" />
                          ) : (
                            <TikTokIcon className="h-4 w-4" />
                          )}
                          {link.network}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-6 text-xs text-white">
          {/* Copyright y firma de FORST en la misma fila desde sm; desde sm el
              logo de FORST se alinea con la columna de Contacto (mismo ancho) y
              enlaza al sitio de FORST. En celular la firma baja debajo del
              copyright, alineada a la izquierda. */}
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-2">
              <p>© {new Date().getFullYear()} {site.name}.</p>
              <span aria-hidden>·</span>
              <PrivacyDialog />
            </div>
            <div className="sm:w-56">
              <a
                href="https://web-forst.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-opacity hover:opacity-80"
              >
                <Image
                  src="/powered-by-forst.png"
                  alt="Powered by FORST"
                  width={600}
                  height={97}
                  className="h-7 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
