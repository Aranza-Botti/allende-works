export const WHATSAPP_NUMBER = "528261157586";
export const PHONE_NUMBER = "+52 826 115 7586";
export const BUSINESS_NAME = "Tirones Allende";
export const BUSINESS_ADDRESS = "Carr. Nacional 513, Valle de Los Naranjos, 67350 Cdad. de Allende, N.L., México";
export const BUSINESS_HOURS = "Abierto 24 horas";
export const FACEBOOK_URL = "https://www.facebook.com/tirones.allende";
export const INSTAGRAM_URL = "https://www.instagram.com/tirones.allende";
export const TIKTOK_URL = "https://www.tiktok.com/@tirones.allende";
export const GOOGLE_MAPS_URL = "https://maps.google.com/?q=Tirones+Allende+Carr+Nacional+513+Allende+NL";
export const WAZE_URL = "https://waze.com/ul?q=Tirones%20Allende&navigate=yes";
export const GOOGLE_MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.5!2d-100.0167!3d25.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866ecb0f30c9c8a1%3A0x1!2sTirones%20Allende!5e0!3m2!1ses!2smx!4v1";

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_MESSAGES = {
  general: "Hola, me interesa cotizar un tirón de arrastre para mi vehículo.",
  fabrication: "Hola, quiero una cotización de fabricación metálica personalizada.",
  quote: "Hola, quisiera solicitar una cotización personalizada.",
  installation: "Hola, me interesa el servicio de instalación de tirones.",
  welding: "Hola, vi sus trabajos de soldadura especial y quiero una cotización.",
  accessories: "Hola, necesito accesorios de arrastre para mi vehículo.",
  trailers: "Hola, me interesa cotizar la fabricación de un remolque.",
  adaptations: "Hola, quiero una cotización para una adaptación en mi vehículo.",
  followUp: (name: string, days: number) =>
    `Hola ${name}, hace ${days} días cotizaste con nosotros, ¿tienes alguna duda? Estamos para ayudarte.`,
};
