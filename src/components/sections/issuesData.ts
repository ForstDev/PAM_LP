export type Mission = {
  id: string;
  number: string;
  title: string;
  ods: string;
  framework: string;
  peru: string;
  world: string;
  color: "verde" | "celeste" | "azul";
  stats?: { value: number; decimals?: number; suffix: string; label: string }[];
  context?: string;
  source?: string;
};

// Las 8 misiones salen del Tablero Oficial de Misiones que entregó el
// cliente. Todavía no hay cifras ni fuentes confirmadas, excepto para
// hambre (INEI / CAF, ya aprobado). Las demás muestran "dato y fuente
// pendientes" hasta que lleguen las fuentes reales; ahí solo se reemplaza.
export const missions: Mission[] = [
  {
    id: "hambre",
    number: "01",
    title: "Nutrición sostenible y cero hambre",
    ods: "ODS 2",
    framework: "Desarrollo Global",
    peru: "Programas de seguridad alimentaria y comedores parroquiales.",
    world: "Proyectos de distribución de alimentos de alta eficiencia.",
    color: "verde",
    stats: [
      { value: 1.1, decimals: 1, suffix: " millones", label: "de peruanos sin comida en 2025" },
      { value: 400, suffix: " mil", label: "en Lima y Callao" },
    ],
    context:
      "En 2025, estas personas se quedaron sin comida o pasaron un día entero sin comer porque no les alcanzó el dinero. El 64% de los peruanos ayudó a un desconocido el último año, pero solo el 13% donó a una organización formal: la generosidad existe, falta el puente.",
    source: "INEI vía RPP, CAF World Giving Index 2023 y World Giving Report 2025",
  },
  {
    id: "salud",
    number: "02",
    title: "Igualdad de salud",
    ods: "ODS 3",
    framework: "Salud Global",
    peru: "Tratamientos médicos itinerantes y combate a la anemia.",
    world: "Insumos médicos críticos en regiones de extrema pobreza.",
    color: "celeste",
  },
  {
    id: "agua",
    number: "03",
    title: "Acceso a agua segura y saneamiento",
    ods: "ODS 6",
    framework: "Infraestructura",
    peru: "Instalación de sistemas de captación de agua en comunidades de la sierra.",
    world: "Filtros de agua comunitarios de alta durabilidad.",
    color: "azul",
  },
  {
    id: "escuelas",
    number: "04",
    title: "Entornos escolares seguros y salud mental",
    ods: "ODS 4",
    framework: "Reducción de Desigualdades",
    peru: "Psicólogos escolares y talleres de prevención contra el acoso escolar.",
    world: "Programas globales de inclusión social infantil.",
    color: "verde",
  },
  {
    id: "animales",
    number: "05",
    title: "Bienestar y respeto animal",
    ods: "ODS 15",
    framework: "Animal Welfare (80K)",
    peru: "Esterilización masiva, rescate y soporte a albergues locales.",
    world: "Campañas contra el confinamiento extremo en la industria.",
    color: "celeste",
  },
  {
    id: "amazonas",
    number: "06",
    title: "Protección del Amazonas y acción climática",
    ods: "ODS 13 y 15",
    framework: "Clima Catastrófico",
    peru: "Brigadas de conservación amazónica contra la deforestación ilegal.",
    world: "Investigación en tecnologías de captura de carbono masiva.",
    color: "azul",
  },
  {
    id: "paz",
    number: "07",
    title: "Paz, estabilidad y ayuda humanitaria",
    ods: "ODS 16",
    framework: "Conflictos de Potencias",
    peru: "Apoyo institucional a refugiados y cultura de paz.",
    world: "Misiones de rescate médico en zonas activas de guerra.",
    color: "verde",
  },
  {
    id: "tecnologia",
    number: "08",
    title: "Gobernanza y ética en nuevas tecnologías",
    ods: "ODS 9",
    framework: "Riesgos de IA (80K)",
    peru: "Preparación y educación digital ante la automatización del empleo.",
    world: "Investigación científica para el control ético de la IA.",
    color: "celeste",
  },
];
