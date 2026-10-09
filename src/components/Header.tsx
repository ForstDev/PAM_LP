"use client";

import { useState } from "react";
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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`sticky top-0 z-40 border-b bg-white/90 backdrop-blur-sm transition-shadow duration-300 ${
          scrolled ? "border-black/5 shadow-sm" : "border-transparent"
        }`}
      >
        <div className="mx-auto grid h-20 max-w-[90rem] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-10">
          {/* El logo siempre lleva al inicio (hero) de la landing. */}
          <Link href="#top" className="flex items-center gap-2 justify-self-start">
            <Image
              src="/logo-horizontal.svg"
              alt="AyudemosMás Perú"
              width={504}
              height={90}
              className="h-12 w-auto sm:h-14"
              priority
            />
          </Link>

          <nav className="hidden items-center justify-center gap-7 whitespace-nowrap xl:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium text-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-verde transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <a
              href={waLink("Hola, quiero comprar y ayudar. ¿Me ayudan con el catálogo?")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-verde px-5 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-105 sm:inline-block"
            >
              Comprar y ayudar
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full text-foreground xl:hidden"
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
          la esquina superior derecha, encima de todo (incluido el header). */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 xl:hidden"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                transformOrigin: "top right",
                width: "min(100vw, 440px)",
                height: "min(100vw, 440px)",
                borderBottomLeftRadius: "100%",
              }}
              className="fixed right-0 top-0 z-40 bg-verde/85 shadow-xl backdrop-blur-sm xl:hidden"
            >
              <div className="flex h-full flex-col items-end justify-start gap-1.5 pt-20 pr-6 text-right">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-white/25"
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  href={waLink("Hola, quiero comprar y ayudar. ¿Me ayudan con el catálogo?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 rounded-full bg-celeste px-5 py-3.5 text-center text-sm font-semibold text-foreground"
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
