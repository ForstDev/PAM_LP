"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { waLink } from "@/lib/whatsapp";

const navLinks = [
  { href: "#quienes-somos", label: "¿Quiénes somos?" },
  { href: "#problematicas", label: "Problemáticas" },
  { href: "#donaciones", label: "Donaciones" },
  { href: "#productos", label: "Productos" },
  { href: "#afiliacion", label: "Afiliación" },
];

const buyMessage = "Hola, quiero comprar y ayudar. ¿Me ayudan con el catálogo?";

/**
 * Sección visible en pantalla: marca el enlace activo del menú para que el
 * usuario sepa siempre en qué parte de la página está.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Una franja en el centro de la pantalla decide qué sección manda.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const top = document.getElementById("top");
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    sections.forEach((el) => observer.observe(el));
    if (top) observer.observe(top);
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = navLinks.map((link) => link.href.slice(1));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const active = useActiveSection(sectionIds);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <>
      {/* Barra de progreso de lectura, muy fina, en el borde superior. */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-verde"
      />

      {/* Header flotante en forma de píldora: se despega del borde, deja ver
          el contenido detrás y gana sombra al hacer scroll. */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4"
      >
        <div
          className={`mx-auto flex h-16 max-w-[84rem] items-center justify-between gap-3 rounded-full bg-white/85 pl-4 pr-2 ring-1 ring-black/5 backdrop-blur-md transition-shadow duration-300 sm:pl-6 ${
            scrolled ? "shadow-lg shadow-navy/15" : "shadow-sm"
          }`}
        >
          {/* El logo siempre lleva al inicio (hero) de la landing. */}
          <Link href="#top" className="flex flex-shrink-0 items-center" aria-label="AyudemosMás, ir al inicio">
            <Image
              src="/logo-horizontal.svg"
              alt="AyudemosMás"
              width={456}
              height={99}
              className="h-8 w-auto sm:h-9"
              priority
            />
          </Link>

          <nav aria-label="Secciones" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className="relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-verde/20 xl:px-4"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-verde/45"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex flex-shrink-0 items-center gap-1">
            <a
              href={waLink(buyMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-verde px-5 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-105 active:scale-95 sm:inline-block"
            >
              Comprar y ayudar
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              className="flex h-12 w-12 items-center justify-center rounded-full text-foreground transition-colors hover:bg-verde/20 lg:hidden"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" strokeWidth={1.75} />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menú mobile — cuarto de círculo verde translúcido que se abre desde
          la esquina superior derecha, por debajo de la píldora del header
          (así el botón de cerrar siempre queda a la vista). */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-30 lg:hidden"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                transformOrigin: "top right",
                width: "clamp(380px, 100vw, 440px)",
                height: "clamp(380px, 100vw, 440px)",
                borderBottomLeftRadius: "100%",
              }}
              className="fixed right-0 top-0 z-30 bg-verde/90 shadow-xl backdrop-blur-sm lg:hidden"
            >
              <div className="flex h-full flex-col items-end justify-start gap-0.5 pr-6 pt-[5.5rem] text-right">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl px-3 py-1.5 text-base font-medium text-foreground transition-colors hover:bg-white/25"
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  href={waLink(buyMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 rounded-full bg-celeste px-4 py-3 text-center text-sm font-semibold text-foreground sm:hidden"
                >
                  Comprar y ayudar
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
