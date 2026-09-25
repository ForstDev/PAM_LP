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
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`sticky top-0 z-40 border-b bg-white/90 backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? "border-black/5 shadow-sm" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* El logo siempre lleva al inicio (hero) de la landing. */}
        <Link href="#top" className="flex items-center gap-2">
          <Image
            src="/logo-horizontal.svg"
            alt="PerúAyudemosMás"
            width={560}
            height={100}
            className="h-14 w-auto sm:h-16"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-verde transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

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
          className="flex h-11 w-11 items-center justify-center rounded-full text-foreground lg:hidden"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" strokeWidth={1.75} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={1.75} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Área invisible para cerrar al tocar fuera de la burbuja — no oscurece la pantalla. */}
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 top-24 z-30 lg:hidden"
            />
            <motion.nav
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: "top right" }}
              className="absolute right-4 top-20 z-40 w-60 rounded-[28px] bg-verde p-4 shadow-xl lg:hidden"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-2xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-white/25"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={waLink("Hola, quiero comprar y ayudar. ¿Me ayudan con el catálogo?")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-full bg-celeste px-5 py-3.5 text-center text-sm font-semibold text-foreground"
              >
                Comprar y ayudar
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
