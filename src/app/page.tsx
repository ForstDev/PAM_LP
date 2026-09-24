import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { Hero } from "@/components/sections/Hero";
import { HungerSection } from "@/components/sections/HungerSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { HowWeHelpSection } from "@/components/sections/HowWeHelpSection";
import { CatalogSection } from "@/components/sections/CatalogSection";
import { NgoSection } from "@/components/sections/NgoSection";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <HungerSection />
        <AboutSection />
        <HowWeHelpSection />
        <CatalogSection />
        <NgoSection />
        <FinalCta />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
