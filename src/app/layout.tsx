import type { Metadata } from "next";
import { Outfit, Tinos } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const tinos = Tinos({
  variable: "--font-tinos",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: "PerúAyudemosMás — Tienda solidaria en Lima | Cada compra ayuda",
  description:
    "Compra productos de primera necesidad y ayuda contra el hambre en el Perú. El 100% de las ganancias va a organizaciones que combaten el hambre. Escríbenos por WhatsApp.",
  keywords: [
    "tienda solidaria Lima",
    "PerúAyudemosMás",
    "tienda benéfica Perú",
    "comprar y ayudar",
    "tienda que dona sus ganancias",
    "hambre en el Perú",
  ],
  openGraph: {
    title: "PerúAyudemosMás — Tienda solidaria en Lima",
    description:
      "Cada compra que haces se convierte en ayuda directa contra el hambre en el Perú.",
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
  alternateName: "Ecommerce Solidario",
  url: site.domain,
  email: site.email,
  telephone: site.phone,
  slogan: "Transformamos tu compra en ayuda real.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${outfit.variable} ${tinos.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
