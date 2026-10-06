import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

// Tipografías reales del manual de marca — autohospedadas, no sustitutos de
// Google Fonts. Outfit es variable (cubre todo el rango de grosor); FreeSerif
// es estática, así que se declaran sus 4 cortes (regular/bold/italic/bold
// italic) tal como los define el manual.
const outfit = localFont({
  src: "../fonts/outfit/Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
  weight: "100 900",
  display: "swap",
});

const freeserif = localFont({
  src: [
    {
      path: "../fonts/freeserif/FreeSerif.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/freeserif/FreeSerifBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/freeserif/FreeSerifItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/freeserif/FreeSerifBoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-freeserif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: "AyudemosMás Perú | Es hora de ayudar.",
  description:
    "Transformamos tu compra en ayuda real. Compra productos de primera necesidad y el 100% de las ganancias va a organizaciones sociales del Perú. Puesta en marcha: 17 de octubre de 2026.",
  keywords: [
    "e-commerce solidario Perú",
    "AyudemosMás Perú",
    "tienda benéfica Perú",
    "comprar y ayudar",
    "tienda que dona sus ganancias",
    "hambre en el Perú",
  ],
  openGraph: {
    title: "AyudemosMás Perú | E-commerce solidario",
    description:
      "Transformamos tu compra en ayuda real. Es hora de ayudar.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  alternateName: "AyudemosMás",
  url: site.domain,
  email: site.email,
  slogan: "Transformamos tu compra en ayuda real.",
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
