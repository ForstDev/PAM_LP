import Image from "next/image";
import { GlowOrb } from "@/components/GlowOrb";
import { HeroContent } from "./HeroContent";

export function HeroSection() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-foreground">
      <div className="absolute inset-0">
        <Image
          src="/hero-construccion.png"
          alt="Voluntarios de PerúAyudemosMás construyendo juntos"
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/55 to-foreground/20" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-foreground/70 to-transparent" />
        <GlowOrb className="-right-24 -top-24 h-96 w-96 bg-verde/40 blur-2xl sm:h-[32rem] sm:w-[32rem]" />
      </div>

      <HeroContent />
    </section>
  );
}
