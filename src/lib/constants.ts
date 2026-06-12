export const WHATSAPP_NUMBER = "528261157586";
export const PHONE_NUMBER = "+52 826 115 7586";
export const BUSINESS_NAME = "Tirones Allende";
export const BUSINESS_ADDRESS = "Carr. Nacional 513, Valle de Los Naranjos, 67350, Allende, N.L.";
export const BUSINESS_HOURS = "Abierto las 24 horas";
export const FACEBOOK_URL = "https://www.facebook.com/tirones.allende";
export const INSTAGRAM_URL = "https://www.instagram.com/tirones.allende";
export const TIKTOK_URL = "https://www.tiktok.com/@tirones.allende";
export const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Tirones%20Allende%20Carr%20Nacional%20513%2C%20Valle%20de%20Los%20Naranjos%2C%2067350%20Cdad.%20de%20Allende%2C%20N.L.%2C%20M%C3%A9xico";
export const WAZE_URL = "https://waze.com/ul?q=Tirones%20Allende%20Allende%20Nuevo%20Leon&navigate=yes";
export const GOOGLE_MAPS_EMBED = "https://www.google.com/maps?q=Tirones%20Allende%20Carr%20Nacional%20513%20Valle%20de%20Los%20Naranjos%2067350%20Cdad.%20de%20Allende%20N.L.%20M%C3%A9xico&z=16&output=embed";


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
