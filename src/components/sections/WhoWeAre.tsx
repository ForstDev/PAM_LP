import Image from "next/image";
import { HandHeart, TrendingUp, ArrowRight } from "lucide-react";
import { SignatureCircle } from "@/components/SignatureCircle";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";

export function WhoWeAre() {
  return (
    <section
      id="quienes-somos"
      className="relative isolate overflow-hidden bg-celeste/10 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <GlowOrb className="-right-12 top-16 h-56 w-56 bg-verde/20 blur-2xl" />
      <GlowOrb className="bottom-16 -left-10 h-52 w-52 bg-azul/25 blur-2xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <SignatureCircle
          color="celeste"
          className="mx-auto w-full max-w-sm"
          circleClassName="-left-8 -top-8 h-[75%] w-[75%]"
        >
          <Image
            src="/hero-construccion.png"
            alt="Equipo de PerúAyudemosMás"
            width={480}
            height={480}
            className="aspect-square w-full rounded-[2.5rem] object-cover"
          />
        </SignatureCircle>

        <Reveal delay={0.1}>
          <h2 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Un puente entre tu compra diaria y la ayuda directa
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            Somos PerúAyudemosMás, parte del movimiento cultural MÁS.
            Revendemos productos de primera necesidad y destinamos nuestras
            ganancias, una vez cubiertos los costos operativos, a
            organizaciones que ya vienen trabajando en distintas causas
            sociales del Perú.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl border-t border-foreground/10 pt-14">
        <Reveal>
          <p className="max-w-2xl text-xl font-semibold leading-snug text-foreground">
            En lo inmediato, ayuda real. A largo plazo, una fuente que no se
            agota.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          <Reveal delay={0.1} className="flex items-start gap-5">
            <SignatureCircle
              color="verde"
              className="h-16 w-16 flex-shrink-0"
              circleClassName="inset-0"
            >
              <div className="flex h-16 w-16 items-center justify-center">
                <HandHeart className="h-7 w-7 text-foreground" strokeWidth={1.75} />
              </div>
            </SignatureCircle>
            <div>
              <p className="font-semibold text-foreground">Ayuda inmediata</p>
              <p className="mt-1 text-foreground/75">
                Los fondos llegan directo a organizaciones que ya trabajan en
                el terreno, sin intermediarios en el camino.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="flex items-start gap-5">
            <SignatureCircle
              color="celeste"
              className="h-16 w-16 flex-shrink-0"
              circleClassName="inset-0"
            >
              <div className="flex h-16 w-16 items-center justify-center">
                <TrendingUp className="h-7 w-7 text-foreground" strokeWidth={1.75} />
              </div>
            </SignatureCircle>
            <div>
              <p className="font-semibold text-foreground">Fondo constante</p>
              <p className="mt-1 text-foreground/75">
                Cada compra semanal se convierte en una fuente de ingresos que
                se sostiene en el tiempo, no en una donación aislada.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Tercer pilar — "Ayudar no tiene partido". Único lugar de toda la
          landing donde se menciona política, por pedido explícito del
          cliente. Orden en mobile: título, foto, pie de foto, párrafos,
          enlace. En desktop: foto a la izquierda, texto a la derecha,
          mismo ancho/estilo que el bloque de "Quiénes somos" de arriba. */}
      <div className="relative mx-auto mt-16 max-w-6xl border-t border-foreground/10 pt-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-12">
          <Reveal className="order-1 lg:order-none lg:col-start-2 lg:row-start-1">
            <h3 className="font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              Ayudar no tiene partido
            </h3>
          </Reveal>

          <Reveal
            delay={0.1}
            className="order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2"
          >
            <SignatureCircle
              color="azul"
              className="mx-auto w-full max-w-xs lg:mx-0"
              circleClassName="-right-6 -bottom-6 h-[70%] w-[70%]"
            >
              <Image
                src="/recambio-cumbre.jpg"
                alt="Conversación de Recambio en la Cumbre Perú Sostenible 2026"
                width={420}
                height={420}
                className="aspect-square w-full rounded-[2rem] object-cover"
              />
            </SignatureCircle>
          </Reveal>

          <Reveal
            delay={0.15}
            className="order-3 lg:order-none lg:col-start-1 lg:row-start-2"
          >
            <p className="mx-auto max-w-xs text-center text-sm text-foreground/60 lg:mx-0 lg:text-left">
              Conversación de Recambio · Cumbre Perú Sostenible 2026
            </p>
          </Reveal>

          <Reveal
            delay={0.2}
            className="order-4 lg:order-none lg:col-start-2 lg:row-start-2"
          >
            <p className="text-foreground/80">
              AyudemosMás es el emprendimiento social motor de MÁS, un
              movimiento cultural de iniciativas de impacto social. Somos
              independientes y apartidarios: no respaldamos partidos
              políticos ni candidaturas.
            </p>
            <p className="mt-4 text-foreground/80">
              Cuando nuestra misión se cruza con asuntos públicos, valoramos
              el diálogo plural y apartidario. Por eso asistimos a una
              conversación de Recambio en la Cumbre Perú Sostenible 2026
              para aprender sobre democracia y sostenibilidad.
            </p>
            <a
              href="https://www.recambio.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              Conoce a Recambio
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.75}
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
