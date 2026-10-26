// Contenido de la Política de privacidad (Ley N.º 29733, Perú).
// Regla del cliente: el texto visible no lleva dos puntos ni guiones.
// El marcador {email} se reemplaza por un enlace mailto al correo de contacto.

export type PrivacySection = {
  title: string;
  text: string;
};

export const EMAIL_TOKEN = "{email}";

export const privacyPolicy = {
  title: "Política de privacidad",
  intro:
    "En AyudemosMás cuidamos tus datos personales. Aquí te contamos qué información recibimos cuando visitas esta página o nos escribes, para qué la usamos y cómo puedes ejercer tus derechos, de acuerdo con la Ley N.º 29733, Ley de Protección de Datos Personales del Perú, y su reglamento.",
  sections: [
    {
      title: "Quién es responsable de tus datos",
      text: "El responsable es AyudemosMás, parte de MÁS, un movimiento cultural humanitario. Para cualquier consulta sobre esta política puedes escribirnos a {email}.",
    },
    {
      title: "Qué datos recibimos",
      text: "Esta página no tiene formularios ni te pide registrarte. Solo recibimos tus datos cuando tú decides escribirnos por WhatsApp, por correo o por Instagram. En ese caso recibimos tu nombre, tu número de teléfono o tu correo y lo que nos cuentes en tu mensaje. Además, como ocurre en cualquier sitio web, nuestro proveedor de alojamiento registra datos técnicos básicos de la visita, como la dirección IP y el tipo de navegador, para mantener la página segura y funcionando.",
    },
    {
      title: "Para qué los usamos",
      text: "Usamos tus datos para responder tus consultas, coordinar tus pedidos de delivery y conversar contigo si representas una organización, una marca o una bodega que quiere sumarse. No vendemos ni alquilamos tus datos, y no te enviaremos publicidad sin tu permiso.",
    },
    {
      title: "Con quién los compartimos",
      text: "Para funcionar usamos servicios de terceros, como WhatsApp de Meta para los mensajes, nuestro proveedor de correo y Vercel para alojar esta página. Algunos guardan la información en servidores fuera del Perú, y cada uno la trata según su propia política de privacidad. Solo compartimos lo necesario para atenderte.",
    },
    {
      title: "Cookies",
      text: "Esta página no usa cookies de publicidad ni herramientas de seguimiento de terceros.",
    },
    {
      title: "Cuánto tiempo los guardamos",
      text: "Guardamos tus datos solo el tiempo necesario para atender tu consulta o tu pedido, o mientras mantengamos una relación contigo. Después los eliminamos.",
    },
    {
      title: "Tus derechos",
      text: "Puedes pedirnos en cualquier momento acceder a tus datos, corregirlos, eliminarlos u oponerte a que los usemos. Son tus derechos de acceso, rectificación, cancelación y oposición. Escríbenos a {email} con tu pedido y te responderemos dentro de los plazos que fija la ley. Si sientes que no atendimos tu solicitud, puedes acudir a la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.",
    },
    {
      title: "Menores de edad",
      text: "Esta página está pensada para personas mayores de edad. Si tienes menos de 18 años, pide a tu madre, padre o tutor que se comunique con nosotros.",
    },
    {
      title: "Cambios en esta política",
      text: "Podemos actualizar esta política cuando sea necesario. Si lo hacemos, cambiaremos la fecha que aparece al final.",
    },
  ] satisfies PrivacySection[],
  updated: "Actualizada en octubre de 2026.",
} as const;
