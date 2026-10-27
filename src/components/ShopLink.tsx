import type { ReactNode } from "react";
import { SHOP_URL } from "@/lib/site";

type ShopLinkProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

/**
 * Botón de compra. Abre la tienda (Shopify) en una pestaña nueva; si SHOP_URL
 * se deja en null, se muestra igual pero no redirige a ningún lado.
 */
export function ShopLink({ className, children, onClick }: ShopLinkProps) {
  if (SHOP_URL) {
    return (
      <a
        href={SHOP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
