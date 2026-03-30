import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { motion, useScroll, useTransform } from "framer-motion";

const StickyMobileCTA = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <motion.div
      style={{ opacity }}
      className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-md border-t border-border lg:hidden"
    >
      <a href={whatsappLink(WHATSAPP_MESSAGES.quote)} target="_blank" rel="noopener noreferrer" className="block">
        <Button size="lg" className="w-full bg-gradient-accent font-display tracking-wider text-base">
          <Phone className="w-5 h-5 mr-2" /> Cotiza gratis ahora
        </Button>
      </a>
    </motion.div>
  );
};

export default StickyMobileCTA;
