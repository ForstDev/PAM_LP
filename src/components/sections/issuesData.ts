export type MissionColor = "verde" | "celeste" | "azul";

export type Mission = {
  id: string;
  /** Nombre corto: miniaturas y pestañas. */
  name: string;
  /** Nombre completo, tal cual el Tablero Oficial de Misiones. */
  title: string;
  ods: string;
  peru: string;
  world: string;
  color: MissionColor;
  stat?: { value: number; decimals?: number; suffix: string; label: string };
  source?: string;
  /** Texto de reemplazo cuando la misión no tiene cifra (p. ej. largo plazo). */
  note?: string;
  /** Foto (WebP cuadrada) en /public/misiones. Si falta, se muestra un marcador. */
  image?: { src: string; alt: string };
};

export type MissionGroup = {
  id: string;
  label: string;
  missionIds: string[];
};

// Las 11 misiones confirmadas por el cliente (Tablero Oficial de Misiones).
// Cifras y fuentes copiadas tal cual del tablero. Fotos: Pexels (licencia
// libre para uso comercial, sin atribución obligatoria); IDs de origen:
// pobreza 4115447, hambre 6994946, agua 11612595, género 4834133, salud
// 7578797, escuelas 8618015, salud mental 1149923, Amazonía 29152688,
// animales 30129027, paz 32034569, tecnología 6482236. Se agrupan en 4 temas para
// que nadie tenga que recorrer 11 elementos seguidos.
export const missions: Mission[] = [
  {
    id: "pobreza",
    image: { src: "/misiones/pobreza.webp", alt: "Vista aérea de viviendas precarias con techos de calamina" },
    name: "Pobreza",
    title: "Reducción de la pobreza y mayor acceso a vivienda digna",
    ods: "ODS 1, 8, 10 y 11",
    peru: "Vivienda digna y emprendimientos para familias de asentamientos humanos.",
    world: "Transferencias directas de dinero a familias en pobreza extrema.",
    color: "verde",
    stat: {
      value: 8.8,
      decimals: 1,
      suffix: " millones",
      label: "de peruanos vivían en pobreza monetaria en 2025 (25,7%)",
    },
    source: "INEI, 2025",
  },
  {
    id: "hambre",
    image: { src: "/misiones/hambre.webp", alt: "Caja de donación con pastas, latas y botellas de agua" },
    name: "Hambre",
    title: "Lucha contra el hambre y la injusticia alimentaria",
    ods: "ODS 2",
    peru: "Programas de seguridad alimentaria y comedores parroquiales.",
    world: "Proyectos de distribución de alimentos de alta eficiencia.",
    color: "celeste",
    stat: {
      value: 1.16,
      decimals: 2,
      suffix: " millones",
      label: "de peruanos vivieron inseguridad alimentaria severa en 2025",
    },
    source: "INEI, ENAHO 2025",
  },
  {
    id: "agua",
    image: { src: "/misiones/agua.webp", alt: "Manos recibiendo agua limpia de un manantial" },
    name: "Agua segura",
    title: "Agua segura y saneamiento para todos",
    ods: "ODS 6",
    peru: "Sistemas de captación de agua en comunidades de la sierra.",
    world: "Filtros de agua comunitarios de alta durabilidad.",
    color: "azul",
    stat: {
      value: 3.3,
      decimals: 1,
      suffix: " millones",
      label: "de personas, aproximadamente, no tienen agua por red pública",
    },
    source: "INEI, ENAPRES 2024",
  },
  {
    id: "genero",
    image: { src: "/misiones/genero.webp", alt: "Mujeres bailando juntas tomadas de las manos en un parque" },
    name: "Sin violencia",
    title: "Igualdad de género y una vida libre de violencia",
    ods: "ODS 5",
    peru: "Casas refugio y acompañamiento legal y psicológico para mujeres que sufren violencia.",
    world: "Programas contra el matrimonio infantil y la violencia de género.",
    color: "verde",
    stat: {
      value: 119,
      suffix: "",
      label: "víctimas de feminicidio entre enero y octubre de 2025",
    },
    source: "MIMP, 2025",
  },
  {
    id: "salud",
    image: { src: "/misiones/salud.webp", alt: "Médica explicando un resultado a un paciente en consulta" },
    name: "Salud",
    title: "Igualdad en el acceso a la salud",
    ods: "ODS 3",
    peru: "Tratamientos médicos itinerantes y combate a la anemia.",
    world: "Insumos médicos críticos en regiones de extrema pobreza.",
    color: "celeste",
    stat: {
      value: 43.4,
      decimals: 1,
      suffix: "%",
      label: "de niñas y niños de 6 a 35 meses tiene anemia",
    },
    source: "INEI, ENDES 2025",
  },
  {
    id: "escuelas",
    image: { src: "/misiones/escuelas.webp", alt: "Niña sonriendo en su carpeta con útiles escolares" },
    name: "Sin acoso escolar",
    title: "Escuelas seguras y libres de acoso escolar",
    ods: "ODS 4",
    peru: "Talleres de prevención contra el acoso escolar y convivencia en las aulas.",
    world: "Programas globales de inclusión social infantil.",
    color: "azul",
    stat: {
      value: 19642,
      suffix: "",
      label: "casos de violencia escolar reportados en 2024",
    },
    source: "Minedu, SíseVe",
  },
  {
    id: "mental",
    image: { src: "/misiones/mental.webp", alt: "Persona caminando hacia el sol por un camino tranquilo" },
    name: "Salud mental",
    title: "Cuidado de la salud mental",
    ods: "ODS 3 (meta 3.4)",
    peru: "Atención psicológica y acompañamiento emocional para escolares, familias y comunidades.",
    world: "Programas de salud mental en regiones con pocos servicios.",
    color: "verde",
    stat: {
      value: 386132,
      suffix: "",
      label:
        "casos de ansiedad y estrés severo atendidos por el Minsa entre enero y octubre de 2025",
    },
    source: "Minsa, 2025",
  },
  {
    id: "amazonia",
    image: { src: "/misiones/amazonia.webp", alt: "Vista aérea de un río entre la selva amazónica con un bote" },
    name: "Amazonía",
    title: "Protección de la Amazonía y acción por el clima",
    ods: "ODS 7, 12, 13 y 15",
    peru: "Brigadas contra la deforestación ilegal y energía solar para comunidades amazónicas.",
    world: "Tecnologías de captura de carbono y consumo responsable.",
    color: "celeste",
    stat: {
      value: 3.2,
      decimals: 1,
      suffix: " millones",
      label: "de hectáreas de bosque amazónico perdidas entre 2001 y 2024",
    },
    source: "Minam, Geobosques",
  },
  {
    id: "animales",
    image: { src: "/misiones/animales.webp", alt: "Dos cachorros callejeros abrazados" },
    name: "Animales",
    title: "Respeto y protección de los animales",
    ods: "ODS 14 y 15",
    peru: "Esterilización masiva, rescate, apoyo a albergues y protección de la fauna marina.",
    world: "Campañas contra el confinamiento extremo en la industria.",
    color: "azul",
    stat: {
      value: 6,
      suffix: " millones",
      label: "de perros sin hogar se estima que hay en el Perú",
    },
    source: "Minsa",
  },
  {
    id: "paz",
    image: { src: "/misiones/paz.webp", alt: "Paloma blanca entre otras palomas" },
    name: "Paz",
    title: "Paz y ayuda humanitaria para víctimas de guerra",
    ods: "ODS 16",
    peru: "Apoyo institucional a refugiados y cultura de paz.",
    world: "Misiones de rescate médico en zonas activas de guerra.",
    color: "verde",
    stat: {
      value: 1.66,
      decimals: 2,
      suffix: " millones",
      label: "de personas venezolanas viven en el Perú",
    },
    source: "ACNUR, 2025",
  },
  {
    id: "tecnologia",
    image: { src: "/misiones/tecnologia.webp", alt: "Niña aprendiendo las letras con una laptop en el sofá" },
    name: "Tecnología ética",
    title: "Tecnología ética al servicio de las personas",
    ods: "ODS 9",
    peru: "Preparación y educación digital ante la automatización del empleo.",
    world: "Investigación científica para el control ético de la IA.",
    color: "celeste",
    note: "Misión de largo plazo.",
  },
];

export const groups: MissionGroup[] = [
  { id: "personas", label: "Personas", missionIds: ["pobreza", "hambre", "agua", "genero"] },
  { id: "salud", label: "Salud y escuela", missionIds: ["salud", "escuelas", "mental"] },
  { id: "planeta", label: "Planeta", missionIds: ["amazonia", "animales"] },
  { id: "futuro", label: "Paz y futuro", missionIds: ["paz", "tecnologia"] },
];
