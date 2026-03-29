import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, CheckCircle, Send } from "lucide-react";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const vehicleTypes = ["Pickup", "SUV", "Camioneta de trabajo", "Sedán", "Van", "Otro"];
const serviceTypes = [
  "Tirón de arrastre personalizado",
  "Instalación de tirón",
  "Fabricación metálica",
  "Soldadura / reparación",
  "Accesorios de arrastre",
  "Adaptación de vehículo",
  "Otro",
];

const Cotizar = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    whatsapp: "",
    email: "",
    ciudad: "",
    vehiculo_tipo: "",
    marca: "",
    modelo: "",
    anio: "",
    servicio: "",
    mensaje: "",
    contacto_preferido: "whatsapp",
    privacidad: false,
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono || !form.servicio || !form.privacidad) {
      toast({ title: "Campos requeridos", description: "Por favor completa los campos obligatorios.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      nombre: form.nombre,
      telefono: form.telefono,
      whatsapp: form.whatsapp || null,
      email: form.email || null,
      ciudad: form.ciudad || null,
      vehiculo_tipo: form.vehiculo_tipo || null,
      marca: form.marca || null,
      modelo: form.modelo || null,
      anio: form.anio || null,
      servicio: form.servicio,
      mensaje: form.mensaje || null,
      preferred_contact_method: form.contacto_preferido,
      source: "website",
    });
    if (error) {
      toast({ title: "Error", description: "No se pudo enviar. Intenta por WhatsApp.", variant: "destructive" });
      setLoading(false);
      return;
    }
    setLoading(false);
    setSubmitted(true);
    toast({ title: "¡Cotización enviada!", description: "Nos pondremos en contacto contigo pronto." });
  };

  if (submitted) {
    return (
      <Layout>
        <section className="py-24 md:py-32">
          <div className="container max-w-lg text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">¡Solicitud recibida!</h2>
            <p className="text-muted-foreground mb-8">
              Hemos recibido tu solicitud de cotización. Nos pondremos en contacto contigo a la brevedad.
            </p>
            <a href={whatsappLink(`Hola, acabo de enviar una solicitud de cotización. Mi nombre es ${form.nombre}.`)} target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-accent font-display tracking-wider">
                <Phone className="w-4 h-4 mr-2" /> Continuar por WhatsApp
              </Button>
            </a>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <SectionHeading
            tag="Cotización"
            title="Solicita tu cotización"
            description="Llena el formulario y te contactaremos con una cotización personalizada. Sin compromiso."
          />

          <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-card border border-border rounded-lg p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre *</Label>
                <Input id="nombre" value={form.nombre} onChange={(e) => update("nombre", e.target.value)} placeholder="Tu nombre completo" className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input id="telefono" value={form.telefono} onChange={(e) => update("telefono", e.target.value)} placeholder="81 1234 5678" className="mt-1 bg-secondary border-border" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input id="whatsapp" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="Mismo o diferente al teléfono" className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="correo@ejemplo.com" className="mt-1 bg-secondary border-border" />
              </div>
            </div>

            <div>
              <Label htmlFor="ciudad">Ciudad</Label>
              <Input id="ciudad" value={form.ciudad} onChange={(e) => update("ciudad", e.target.value)} placeholder="Allende, Monterrey, etc." className="mt-1 bg-secondary border-border" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Tipo de vehículo</Label>
                <Select onValueChange={(v) => update("vehiculo_tipo", v)}>
                  <SelectTrigger className="mt-1 bg-secondary border-border"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>{vehicleTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="marca">Marca</Label>
                <Input id="marca" value={form.marca} onChange={(e) => update("marca", e.target.value)} placeholder="Ford, Chevrolet, etc." className="mt-1 bg-secondary border-border" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="modelo">Modelo</Label>
                <Input id="modelo" value={form.modelo} onChange={(e) => update("modelo", e.target.value)} placeholder="F-150, Silverado, etc." className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label htmlFor="anio">Año</Label>
                <Input id="anio" value={form.anio} onChange={(e) => update("anio", e.target.value)} placeholder="2024" className="mt-1 bg-secondary border-border" />
              </div>
            </div>

            <div>
              <Label>Servicio solicitado *</Label>
              <Select onValueChange={(v) => update("servicio", v)}>
                <SelectTrigger className="mt-1 bg-secondary border-border"><SelectValue placeholder="¿Qué necesitas?" /></SelectTrigger>
                <SelectContent>{serviceTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="mensaje">Descripción del trabajo</Label>
              <Textarea id="mensaje" value={form.mensaje} onChange={(e) => update("mensaje", e.target.value)} placeholder="Describe lo que necesitas con el mayor detalle posible..." rows={4} className="mt-1 bg-secondary border-border" />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox id="privacidad" checked={form.privacidad} onCheckedChange={(c) => update("privacidad", !!c)} />
              <Label htmlFor="privacidad" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                Acepto que mis datos sean utilizados para recibir una cotización y ser contactado por Tirones Allende. *
              </Label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button type="submit" disabled={loading} className="bg-gradient-accent font-display tracking-wider flex-1">
                <Send className="w-4 h-4 mr-2" /> {loading ? "Enviando..." : "Enviar solicitud"}
              </Button>
              <a href={whatsappLink(WHATSAPP_MESSAGES.quote)} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button type="button" variant="outline" className="w-full font-display tracking-wider border-border text-foreground hover:bg-secondary">
                  <Phone className="w-4 h-4 mr-2" /> Prefiero WhatsApp
                </Button>
              </a>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Cotizar;
