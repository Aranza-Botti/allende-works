import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Facebook, Instagram, ExternalLink, Navigation } from "lucide-react";
import {
  BUSINESS_NAME,
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
  PHONE_NUMBER,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  TIKTOK_URL,
  GOOGLE_MAPS_URL,
  WAZE_URL,
  whatsappLink,
  WHATSAPP_MESSAGES,
} from "@/lib/constants";

const Footer = () => (
  <footer className="bg-graphite border-t border-border">
    <div className="container py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="font-display text-xl font-bold tracking-wider text-foreground mb-4">
            TIRONES<span className="text-gradient"> ALLENDE</span>
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Especialistas en tirones de arrastre, remolques personalizados, fabricación metálica y soldadura de alta calidad en Allende, Nuevo León.
          </p>
          <div className="flex gap-3">
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-surface-hover transition-all">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-surface-hover transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-surface-hover transition-all" aria-label="TikTok">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z"/></svg>
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-steel-light mb-4">Enlaces</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Inicio", path: "/" },
              { label: "Servicios", path: "/servicios" },
              { label: "Galería", path: "/galeria" },
              { label: "Cotizar", path: "/cotizar" },
              { label: "Nosotros", path: "/nosotros" },
              { label: "Contacto", path: "/contacto" },
            ].map((l) => (
              <Link key={l.path} to={l.path} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-steel-light mb-4">Contacto</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4 text-primary" /> {PHONE_NUMBER}
            </a>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" /> <span>{BUSINESS_ADDRESS}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-primary mt-0.5" /> {BUSINESS_HOURS}
            </div>
          </div>
        </div>

        {/* Navigate */}
        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-steel-light mb-4">¿Cómo llegar?</h4>
          <div className="flex flex-col gap-3">
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink className="w-4 h-4 text-primary" /> Google Maps
            </a>
            <a href={WAZE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Navigation className="w-4 h-4 text-primary" /> Waze
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {BUSINESS_NAME}. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
