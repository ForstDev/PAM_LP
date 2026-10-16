import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import { MotionProvider } from "@/components/MotionProvider";
import { jsonLd } from "@/lib/jsonld";
import "./globals.css";

// Tipografías reales del manual de marca — autohospedadas, no sustitutos de
// Google Fonts. Outfit es variable (cubre todo el rango de grosor); FreeSerif
// es estática, así que se declaran sus 4 cortes (regular/bold/italic/bold
// italic) tal como los define el manual. Los archivos son WOFF2 recortados a
// caracteres latinos (el TTF original pesaba 1,8 MB; ahora ~100 KB en total).
const outfit = localFont({
  src: "../fonts/outfit/Outfit-VariableFont_wght.woff2",
  variable: "--font-outfit",
  weight: "100 900",
  display: "swap",
});

const freeserif = localFont({
  src: [
    {
      path: "../fonts/freeserif/FreeSerif.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/freeserif/FreeSerifBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/freeserif/FreeSerifItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/freeserif/FreeSerifBoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-freeserif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: "AyudemosMás | Entorno multiplataforma solidario en Perú",
  description:
    "Delivery y tiendas solidarias del movimiento MÁS. El 100% de nuestras ganancias va a organizaciones que trabajan en diversas causas. Es hora de ayudar.",
  alternates: { canonical: "/" },
  keywords: [
    "entorno multiplataforma solidario",
    "AyudemosMás",
    "delivery solidario Perú",
    "comprar y ayudar",
    "tienda que dona sus ganancias",
    "comercio solidario Perú",
  ],
  openGraph: {
    title: "AyudemosMás | Es hora de ayudar.",
    description:
      "Entorno multiplataforma solidario: delivery y tiendas que donan el 100% de sus ganancias.",
    url: site.domain,
    siteName: site.name,
    locale: "es_PE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${outfit.variable} ${freeserif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
