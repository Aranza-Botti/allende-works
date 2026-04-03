import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_ADDRESS, GOOGLE_MAPS_URL, WAZE_URL } from "@/lib/constants";
import { motion } from "framer-motion";

const GoogleMapSection = () => (
  <section className="py-16 md:py-24 bg-graphite">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="font-display text-xs uppercase tracking-[0.3em] text-primary mb-3 block">Ubicación</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Visítanos en nuestro taller</h2>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm">{BUSINESS_ADDRESS}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg overflow-hidden border border-border shadow-card h-80 md:h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14386.5!2d-100.02!3d25.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866ecb0f30c9c8a1%3A0x7bfae3da3f77df0!2sAllende%2C+N.L.!5e0!3m2!1ses!2smx!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Tirones Allende"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gradient-card border border-border rounded-lg p-6 flex-1">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">Carr. Nacional 513</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-1">Valle de Los Naranjos</p>
            <p className="text-sm text-muted-foreground">67350 Cdad. de Allende, N.L.</p>
            <p className="text-xs text-primary mt-3 font-medium">atención con previa cita</p>
          </div>

          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full font-display tracking-wider border-border text-foreground hover:bg-secondary hover:border-primary/30 transition-all">
              <ExternalLink className="w-4 h-4 mr-2" /> Abrir en Google Maps
            </Button>
          </a>
          <a href={WAZE_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full font-display tracking-wider border-border text-foreground hover:bg-secondary hover:border-primary/30 transition-all">
              <Navigation className="w-4 h-4 mr-2" /> Abrir en Waze
            </Button>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default GoogleMapSection;
