import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";
import { SignatureCircle } from "@/components/SignatureCircle";
import { AffiliationPanel } from "./AffiliationPanel";

export function NgoSection() {
  return (
    <section
      id="afiliacion"
      className="relative isolate overflow-hidden bg-celeste/8 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <GlowOrb className="-right-16 top-1/2 h-80 w-80 -translate-y-1/2 bg-verde/20 blur-2xl" />

      <div className="relative mx-auto grid max-w-[84rem] items-center gap-14 lg:grid-cols-[minmax(0,32rem)_1fr] lg:gap-20">
        {/* Foto con el sistema de imágenes del manual: recorte circular,
            círculo de color detrás y anillos finos como en el brochure. */}
        <Reveal className="mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full border border-verde"
            />
            <div
              aria-hidden
              className="absolute -inset-12 rounded-full border border-celeste"
            />
            <SignatureCircle
              color="azul"
              className="w-full"
              circleClassName="-bottom-5 -left-5 h-[85%] w-[85%]"
            >
              {/* Ilustración del manual de marca: negro con las manos
                  "calando" el fondo, que es el verde de la marca. */}
              <div className="aspect-square w-full overflow-hidden rounded-full border-[10px] border-black bg-verde">
                <Image
                  src="/manos-alianza.svg"
                  alt="Manos unidas en círculo, símbolo de alianza"
                  width={1600}
                  height={1066}
                  className="h-full w-full object-cover object-[50%_55%]"
                  sizes="(min-width: 1024px) 448px, 320px"
                />
              </div>
            </SignatureCircle>
            <div
              aria-hidden
              className="absolute -right-2 top-6 h-10 w-10 rounded-full bg-celeste"
            />
          </div>
        </Reveal>

        <Reveal>
          <AffiliationPanel />
        </Reveal>
      </div>
    </section>
  );
}
