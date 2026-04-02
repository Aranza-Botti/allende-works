import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, MapPin, Clock, Mail, Send, MessageCircle } from "lucide-react";
import { whatsappLink, WHATSAPP_MESSAGES, PHONE_NUMBER, BUSINESS_ADDRESS, BUSINESS_HOURS, GOOGLE_MAPS_URL, WAZE_URL } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "¿Cuánto tiempo tarda la fabricación de un tirón?", a: "Dependiendo del tipo de vehículo y la complejidad, un tirón personalizado puede estar listo en 1 a 3 días hábiles." },
  { q: "¿Hacen envíos a otras ciudades?", a: "Actualmente nos enfocamos en atención presencial en nuestro taller en Allende, Nuevo León. Sin embargo, puedes consultar por envíos especiales." },
  { q: "¿Qué tipo de garantía ofrecen?", a: "Todos nuestros trabajos incluyen garantía en la soldadura y los materiales utilizados. Te explicamos los detalles al momento de la cotización." },
  { q: "¿Necesito cita previa?", a: "No es obligatorio, pero te recomendamos escribirnos por WhatsApp para confirmar disponibilidad y que te atendamos sin espera." },
  { q: "¿Trabajan con cualquier tipo de vehículo?", a: "Sí, fabricamos tirones para pickups, SUVs, camionetas, vans y vehículos comerciales de cualquier marca y modelo." },
  { q: "¿Cuánto cuesta un tirón de arrastre?", a: "El precio varía según el vehículo y las especificaciones. Contáctanos para una cotización personalizada sin compromiso." },
];

const Contacto = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast({ title: "Mensaje enviado", description: "Te responderemos a la brevedad." });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading tag="Contacto" title="Estamos para ayudarte" description="Escríbenos, llámanos o visítanos en nuestro taller. Respuesta rápida garantizada." />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-gradient-card border border-border rounded-lg p-6 md:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="c-nombre">Nombre</Label>
                  <Input id="c-nombre" required placeholder="Tu nombre" className="mt-1 bg-secondary border-border" />
                </div>
                <div>
                  <Label htmlFor="c-tel">Teléfono</Label>
                  <Input id="c-tel" required placeholder="81 1234 5678" className="mt-1 bg-secondary border-border" />
                </div>
              </div>
              <div>
                <Label htmlFor="c-email">Correo electrónico</Label>
                <Input id="c-email" type="email" placeholder="correo@ejemplo.com" className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label htmlFor="c-msg">Mensaje</Label>
                <Textarea id="c-msg" required placeholder="¿En qué te podemos ayudar?" rows={4} className="mt-1 bg-secondary border-border" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-gradient-accent font-display tracking-wider">
                <Send className="w-4 h-4 mr-2" /> {loading ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </form>

            {/* Info */}
            <div className="space-y-6">
              <div className="bg-gradient-card border border-border rounded-lg p-6 space-y-4">
                <h3 className="font-display text-lg font-semibold text-foreground">Información de contacto</h3>
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-5 h-5 text-primary" /> {PHONE_NUMBER}
                </a>
                <a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5 text-primary" /> WhatsApp directo
                </a>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" /> {BUSINESS_ADDRESS}
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary mt-0.5" /> {BUSINESS_HOURS}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-lg overflow-hidden border border-border h-64">
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
              <div className="flex gap-3">
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <button className="w-full text-sm text-muted-foreground hover:text-primary border border-border rounded-lg py-2 transition-colors">Google Maps</button>
                </a>
                <a href={WAZE_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <button className="w-full text-sm text-muted-foreground hover:text-primary border border-border rounded-lg py-2 transition-colors">Waze</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-graphite">
        <div className="container max-w-2xl">
          <SectionHeading tag="Preguntas frecuentes" title="¿Tienes dudas?" />
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-gradient-card border border-border rounded-lg px-6">
                <AccordionTrigger className="font-display text-sm font-medium text-foreground hover:text-primary">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
