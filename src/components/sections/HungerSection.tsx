import { StatCounter } from "@/components/StatCounter";
import { Reveal } from "@/components/Reveal";
import { GlowOrb } from "@/components/GlowOrb";

export function HungerSection() {
  return (
    <section className="relative isolate overflow-hidden bg-celeste px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div
        aria-hidden
        className="absolute -right-32 top-1/2 hidden h-[36rem] w-[36rem] -translate-y-1/2 rounded-full border-[3rem] border-verde/15 lg:block"
      />
      <GlowOrb className="-bottom-24 -left-24 h-80 w-80 bg-verde/25 blur-3xl" />
      <GlowOrb className="-top-16 right-1/4 h-56 w-56 bg-verde/15 blur-2xl" />

      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <h2 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
            El hambre en el Perú está en su peor momento en 15 años.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <Reveal delay={0.1}>
            <p className="font-serif text-5xl font-bold text-foreground sm:text-6xl">
              <StatCounter to={1.1} decimals={1} suffix=" millones" />
            </p>
            <p className="mt-3 font-serif text-lg leading-relaxed text-foreground/80">
              de peruanos se quedaron sin comida o pasaron un día entero sin
              comer porque no les alcanzó el dinero, en 2025.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="font-serif text-5xl font-bold text-foreground sm:text-6xl">
              <StatCounter to={400} suffix=" mil" />
            </p>
            <p className="mt-3 font-serif text-lg leading-relaxed text-foreground/80">
              personas en Lima y Callao viven esa misma cifra.
            </p>
          </Reveal>
        </div>
        <p className="mt-4 text-sm text-foreground/70">Fuente: INEI, vía RPP</p>

        <Reveal delay={0.1} className="mt-14 border-t border-foreground/15 pt-10">
          <p className="font-serif text-2xl leading-relaxed text-foreground sm:text-3xl">
            El <strong>64%</strong> de los peruanos ayudó a un desconocido el
            último año, pero solo el <strong>13%</strong> donó a una
            organización formal. La generosidad existe — falta el puente.
          </p>
          <p className="mt-4 text-sm text-foreground/70">
            Fuente: CAF World Giving Index 2023 / World Giving Report 2025
          </p>
        </Reveal>
      </div>
    </section>
  );
}
