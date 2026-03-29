export const WHATSAPP_NUMBER = "528112345678"; // Replace with actual number
export const PHONE_NUMBER = "+52 811 234 5678";
export const BUSINESS_NAME = "Tirones Allende";
export const BUSINESS_ADDRESS = "Carretera Nacional, Allende, Nuevo León, México";
export const BUSINESS_HOURS = "Lunes a Sábado: 8:00 AM – 7:00 PM";
export const FACEBOOK_URL = "https://facebook.com/tironesallende";
export const INSTAGRAM_URL = "https://instagram.com/tironesallende";

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_MESSAGES = {
  general: "Hola, me interesa cotizar un tirón de arrastre para mi vehículo.",
  fabrication: "Hola, quiero una cotización de fabricación metálica personalizada.",
  quote: "Hola, quisiera solicitar una cotización personalizada.",
  installation: "Hola, me interesa el servicio de instalación de tirones.",
};
