import { MessageCircle } from "lucide-react";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { motion } from "framer-motion";

const WhatsAppFloat = () => (
  <motion.a
    href={whatsappLink(WHATSAPP_MESSAGES.general)}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 1, type: "spring" }}
    aria-label="Contactar por WhatsApp"
  >
    <MessageCircle className="w-7 h-7 text-[#fff]" />
  </motion.a>
);

export default WhatsAppFloat;
