import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { IssuesSection } from "@/components/sections/IssuesSection";
import { CatalogSection } from "@/components/sections/CatalogSection";
import { NgoSection } from "@/components/sections/NgoSection";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WhoWeAre />
        <IssuesSection />
        <CatalogSection />
        <NgoSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
