export type Mission = {
  id: string;
  number: string;
  title: string;
  ods: string;
  framework?: string;
  peru: string;
  world: string;
  color: "verde" | "celeste" | "azul";
  stats?: { value: number; decimals?: number; suffix: string; label: string }[];
  context?: string;
  source?: string;
  /** Texto de reemplazo cuando la misión no tiene cifra (p. ej. largo plazo). */
  note?: string;
};

// Las 8 misiones salen del Tablero Oficial de Misiones (versión actualizada
// del cliente). El tablero trae 3 más (pobreza, salud mental por separado y
// violencia de género): quedan fuera hasta que Iván confirme cuáles se suman.
// Cifras y fuentes copiadas tal cual del tablero.
export const missions: Mission[] = [
  {
    id: "hambre",
    number: "01",
    title: "Lucha contra el hambre y la injusticia alimentaria",
    ods: "ODS 2",
    framework: "80K: Desarrollo Global",
    peru: "Programas de seguridad alimentaria y comedores parroquiales.",
    world: "Proyectos de distribución de alimentos de alta eficiencia.",
    color: "verde",
    stats: [
      {
        value: 1.16,
        decimals: 2,
        suffix: " millones",
        label: "de peruanos vivieron inseguridad alimentaria severa en 2025",
      },
      { value: 400, suffix: " mil", label: "en Lima y Callao" },
    ],
    context:
      "El 64% de los peruanos ayudó a un desconocido el último año, pero solo el 13% donó a una organización formal: la generosidad existe, falta el puente.",
    source:
      "INEI, ENAHO 2025; CAF World Giving Index 2023 y World Giving Report 2025",
  },
  {
    id: "salud",
    number: "02",
    title: "Igualdad en el acceso a la salud",
    ods: "ODS 3",
    framework: "80K: Salud Global",
    peru: "Tratamientos médicos itinerantes y combate a la anemia.",
    world: "Insumos médicos críticos en regiones de extrema pobreza.",
    color: "celeste",
    stats: [
      {
        value: 43.4,
        decimals: 1,
        suffix: "%",
        label: "de niñas y niños de 6 a 35 meses tiene anemia",
      },
    ],
    source: "INEI, ENDES 2025",
  },
  {
    id: "agua",
    number: "03",
    title: "Agua segura y saneamiento para todos",
    ods: "ODS 6",
    peru: "Sistemas de captación de agua en comunidades de la sierra.",
    world: "Filtros de agua comunitarios de alta durabilidad.",
    color: "azul",
    stats: [
      {
        value: 3.3,
        decimals: 1,
        suffix: " millones",
        label: "de personas, aproximadamente, no tienen agua por red pública",
      },
    ],
    source: "INEI, ENAPRES 2024",
  },
  {
    id: "escuelas",
    number: "04",
    title: "Escuelas seguras y cuidado de la salud mental",
    ods: "ODS 3 y 4",
    peru: "Talleres de prevención contra el acoso escolar y convivencia en las aulas. Atención psicológica y acompañamiento emocional para escolares, familias y comunidades.",
    world:
      "Programas globales de inclusión social infantil y de salud mental en regiones con pocos servicios.",
    color: "verde",
    stats: [
      {
        value: 19642,
        suffix: "",
        label: "casos de violencia escolar reportados en 2024",
      },
      {
        value: 386132,
        suffix: "",
        label:
          "casos de ansiedad y estrés severo atendidos por el Minsa entre enero y octubre de 2025",
      },
    ],
    source: "Minedu, SíseVe (2024); Minsa (2025)",
  },
  {
    id: "animales",
    number: "05",
    title: "Respeto y protección de los animales",
    ods: "ODS 14 y 15",
    framework: "80K: Animal Welfare",
    peru: "Esterilización masiva, rescate, apoyo a albergues y protección de la fauna marina.",
    world: "Campañas contra el confinamiento extremo en la industria.",
    color: "celeste",
    stats: [
      {
        value: 6,
        suffix: " millones",
        label: "de perros sin hogar se estima que hay en el Perú",
      },
    ],
    source: "Minsa",
  },
  {
    id: "amazonas",
    number: "06",
    title: "Protección de la Amazonía y acción por el clima",
    ods: "ODS 7, 12, 13 y 15",
    framework: "80K: Clima Catastrófico",
    peru: "Brigadas contra la deforestación ilegal y energía solar para comunidades amazónicas.",
    world: "Tecnologías de captura de carbono y consumo responsable.",
    color: "azul",
    stats: [
      {
        value: 3.2,
        decimals: 1,
        suffix: " millones",
        label:
          "de hectáreas de bosque amazónico perdidas entre 2001 y 2024",
      },
    ],
    source: "Minam, Geobosques",
  },
  {
    id: "paz",
    number: "07",
    title: "Paz y ayuda humanitaria para víctimas de guerra",
    ods: "ODS 16",
    framework: "80K: Conflictos entre Potencias",
    peru: "Apoyo institucional a refugiados y cultura de paz.",
    world: "Misiones de rescate médico en zonas activas de guerra.",
    color: "verde",
    stats: [
      {
        value: 1.66,
        decimals: 2,
        suffix: " millones",
        label: "de personas venezolanas viven en el Perú",
      },
    ],
    source: "ACNUR, 2025",
  },
  {
    id: "tecnologia",
    number: "08",
    title: "Tecnología ética al servicio de las personas",
    ods: "ODS 9",
    framework: "80K: Riesgos de IA",
    peru: "Preparación y educación digital ante la automatización del empleo.",
    world: "Investigación científica para el control ético de la IA.",
    color: "celeste",
    note: "Misión de largo plazo.",
  },
];
