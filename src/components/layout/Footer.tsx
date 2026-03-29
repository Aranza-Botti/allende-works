import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import {
  BUSINESS_NAME,
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
  PHONE_NUMBER,
  FACEBOOK_URL,
  INSTAGRAM_URL,
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
          <p className="text-muted-foreground text-sm leading-relaxed">
            Especialistas en tirones de arrastre personalizados, fabricación metálica y soldadura de alta calidad en Allende, Nuevo León.
          </p>
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
              <MapPin className="w-4 h-4 text-primary mt-0.5" /> {BUSINESS_ADDRESS}
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-primary mt-0.5" /> {BUSINESS_HOURS}
            </div>
          </div>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-steel-light mb-4">Síguenos</h4>
          <div className="flex gap-3">
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-surface-hover transition-all">
              <Facebook className="w-5 h-5" />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-surface-hover transition-all">
              <Instagram className="w-5 h-5" />
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
