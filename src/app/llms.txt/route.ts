import { site, SHOP_URL } from "@/lib/site";

// Resumen en Markdown para asistentes de IA (propuesta llms.txt). Se genera
// en el build, como robots.txt y sitemap.xml, y toma el dominio de site.ts.
export const dynamic = "force-static";

const shopSentence = SHOP_URL ? ` Pide en nuestra tienda en línea ${SHOP_URL}` : "";
const shopContact = SHOP_URL ? `\n- Tienda de delivery ${SHOP_URL}` : "";

const body = `# ${site.name}

> ${site.claim} en Perú. Transformamos tu compra en ayuda real, porque el 100% de nuestras ganancias va a organizaciones que trabajan en diversas causas sociales.

${site.name} es un espacio digital y el proyecto benéfico motor de MÁS, un movimiento cultural humanitario de ciudadanos independientes, no político ni partidario. Nacimos para que las compras del día a día ayuden a otros y para multiplicar la ayuda que reciben caridades y ONGs con una nueva fuente de fondos, la promoción de la economía solidaria.

## Cómo llega la ayuda

1. Compras productos que ya necesitas.
2. Marcas y productores venden a través de nosotros.
3. Descontamos impuestos y costos operativos.
4. El 100% de la ganancia va al fondo de impacto.
5. El fondo financia organizaciones y campañas.
6. Mostramos los resultados con evidencia y publicaremos reportes abiertos y periódicos.

## Plataformas

- ${site.name} Delivery, disponible ahora. Te llevamos productos de primera necesidad y comida de restaurantes. Empezaremos con Vanemar, nuestro minimarket aliado, con frutas, verduras, lácteos, pastas, abarrotes y bebidas.${shopSentence}
- ${site.name} Tiendas, próximamente. Tiendas virtuales por categoría, como supermercado, tecnología y moda.
- ${site.name} Vende, próximamente. Un espacio para vender lo que ya no usas o alquilar lo tuyo.

## Causas que apoyamos

Las donaciones llegan a tres causas principales. Alimentación para familias que pasan hambre, a través de comedores y programas de seguridad alimentaria. Salud para quienes viven lejos de un hospital, con campañas itinerantes y la lucha contra la anemia. Y animales en abandono, con rescates y apoyo a albergues.

Además nos mueven problemáticas del Perú y del mundo como la pobreza, el hambre, el acceso a agua segura, la violencia de género, la salud y la salud mental, el acoso escolar, la protección de la Amazonía, el respeto a los animales, la paz y la tecnología ética.

## Afiliación

Organizaciones con una causa social, marcas y bodegas pueden sumarse. Escríbenos a ${site.alliancesEmail}.

## Contacto

- Sitio web ${site.domain}${shopContact}
- Correo ${site.email}
- Alianzas ${site.alliancesEmail}
- Instagram de ${site.name} ${site.instagram}
- TikTok de ${site.name} ${site.tiktok}
- Instagram del movimiento MÁS ${site.movementInstagram}
- TikTok del movimiento MÁS ${site.movementTiktok}
`;

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
