"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { waLink } from "@/lib/whatsapp";

const navLinks = [
  { href: "#quienes-somos", label: "¿Quiénes somos?" },
  { href: "#productos", label: "Productos" },
  { href: "#afiliacion", label: "Afiliación" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
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
          className="hidden rounded-full bg-verde px-5 py-2.5 text-sm font-semibold text-foreground transition-transform hover:scale-105 sm:inline-block"
        >
          Comprar y ayudar
        </a>
      </div>
    </motion.header>
  );
}
