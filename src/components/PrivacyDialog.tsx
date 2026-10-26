"use client";

import { useId, useRef, type MouseEvent, type ReactNode } from "react";
import { X } from "lucide-react";
import { site } from "@/lib/site";
import { EMAIL_TOKEN, privacyPolicy } from "./privacyPolicy";

// Reemplaza el marcador {email} por un enlace mailto al correo de contacto.
function withEmailLinks(text: string): ReactNode[] {
  return text.split(EMAIL_TOKEN).flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <a key={i} href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>,
          part,
        ],
  );
}

/**
 * Botón "Política de privacidad" del footer + ventana flotante con la
 * política. Usa el <dialog> nativo con showModal(), que ya da trampa de
 * foco, cierre con Esc, capa superior, fondo inerte y devuelve el foco
 * al botón al cerrar.
 */
export function PrivacyDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  // Un clic cuyo destino es el propio <dialog> cae en el fondo (backdrop),
  // porque el panel interior lo cubre por completo.
  const onDialogClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="-my-3 py-3 text-xs text-white underline-offset-4 hover:underline"
      >
        {privacyPolicy.title}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={onDialogClick}
        className="privacy-dialog m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-2xl rounded-3xl bg-white p-0 text-foreground shadow-2xl"
      >
        <div className="flex max-h-[85vh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-foreground/10 px-6 py-5 sm:px-8">
            <h2 id={titleId} className="font-serif text-2xl font-bold">
              {privacyPolicy.title}
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-foreground/5"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="overflow-y-auto px-6 py-6 text-sm leading-relaxed sm:px-8 sm:text-base">
            <p>{withEmailLinks(privacyPolicy.intro)}</p>
            {privacyPolicy.sections.map((section) => (
              <section key={section.title}>
                <h3 className="mt-6 font-semibold">{section.title}</h3>
                <p className="mt-2">{withEmailLinks(section.text)}</p>
              </section>
            ))}
            <p className="mt-8 text-xs">{privacyPolicy.updated}</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
