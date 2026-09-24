import { WHATSAPP_NUMBER } from "./site";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
