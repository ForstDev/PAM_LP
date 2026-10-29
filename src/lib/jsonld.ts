import { site } from "@/lib/site";
import { missions } from "@/components/sections/issuesData";

// Datos estructurados para buscadores y asistentes de IA. Todo sale de datos
// ya publicados en la página o en el manual de marca; no hay cifras nuevas.
export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.domain}/#organization`,
      name: site.name,
      legalName: "IMA Proyectos E.I.R.L.",
      url: site.domain,
      logo: `${site.domain}/logo-512.png`,
      email: site.email,
      slogan: site.tagline,
      description:
        "AyudemosMás es el proyecto benéfico motor del movimiento MÁS: un espacio digital solidario que dona el 100% de sus ganancias a organizaciones que trabajan en diversas causas.",
      areaServed: "PE",
      sameAs: [site.instagram, site.tiktok],
      parentOrganization: {
        "@type": "Organization",
        name: "MÁS",
        url: site.movementInstagram,
        sameAs: [site.movementInstagram, site.movementTiktok],
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "alianzas",
        email: site.alliancesEmail,
        availableLanguage: "es",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.domain}/#website`,
      url: site.domain,
      name: site.name,
      inLanguage: "es-PE",
      publisher: { "@id": `${site.domain}/#organization` },
    },
    {
      "@type": "ItemList",
      name: "Misiones de AyudemosMás",
      itemListElement: missions.map((m, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: m.title,
        description: `En el Perú: ${m.peru} En el mundo: ${m.world}`,
      })),
    },
  ],
};
