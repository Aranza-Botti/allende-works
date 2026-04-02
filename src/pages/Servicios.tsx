import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wrench, Shield, Cog, Hammer, Link2, Settings, ArrowRight, Phone, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const services = [
  {
    icon: Wrench,
    title: "Tirones de arrastre personalizados",
    desc: "Fabricamos tirones a medida para cualquier tipo de vehículo: pickups, SUVs, camionetas de trabajo y vehículos comerciales.",
    benefits: ["Ajuste perfecto a tu vehículo", "Materiales de alta resistencia", "Capacidad de carga certificada"],
    ideal: "Ideal para quienes necesitan remolcar trailers, remolques o equipo pesado.",
    wa: WHATSAPP_MESSAGES.general,
  },
  {
    icon: Truck,
    title: "Fabricación de remolques",
    desc: "Diseñamos y fabricamos remolques personalizados para carga general, vehículos, motos, lanchas y más. Estructura reforzada y acabados profesionales.",
    benefits: ["Remolques para cualquier uso", "Estructura reforzada", "Diseño personalizado"],
    ideal: "Para negocios, ranchos, transporte de vehículos o equipo pesado.",
    wa: WHATSAPP_MESSAGES.trailers,
  },
  {
    icon: Settings,
    title: "Instalación de tirones",
    desc: "Servicio profesional de instalación con equipo especializado. Montamos el tirón asegurándonos de que quede firme y alineado.",
    benefits: ["Instalación el mismo día", "Alineación precisa", "Prueba de resistencia incluida"],
    ideal: "Para quienes ya tienen su tirón o compran uno con nosotros.",
    wa: WHATSAPP_MESSAGES.installation,
  },
  {
    icon: Hammer,
    title: "Fabricación metálica a medida",
    desc: "Diseñamos y fabricamos piezas metálicas personalizadas: estructuras, soportes, bases, marcos y cualquier pieza en acero o hierro.",
    benefits: ["Diseño según especificaciones", "Corte y soldadura de precisión", "Acabados de calidad"],
    ideal: "Negocios, talleres, constructoras o particulares que requieren piezas únicas.",
    wa: WHATSAPP_MESSAGES.fabrication,
  },
  {
    icon: Shield,
    title: "Soldadura especializada",
    desc: "Servicio de soldadura MIG y TIG para reparaciones, refuerzos estructurales y uniones de alta resistencia.",
    benefits: ["Soldadura MIG y TIG", "Reparación de estructuras", "Refuerzos y adaptaciones"],
    ideal: "Vehículos, maquinaria, estructuras metálicas que necesitan reparación o refuerzo.",
    wa: WHATSAPP_MESSAGES.welding,
  },
  {
    icon: Link2,
    title: "Accesorios de arrastre",
    desc: "Bolas de arrastre, conectores eléctricos, extensiones, cadenas de seguridad y todo para tu sistema de remolque.",
    benefits: ["Variedad de medidas", "Compatibilidad garantizada", "Instalación incluida"],
    ideal: "Complementa tu tirón con los accesorios correctos para un sistema completo.",
    wa: WHATSAPP_MESSAGES.accessories,
  },
  {
    icon: Cog,
    title: "Adaptaciones para vehículos",
    desc: "Modificaciones y adaptaciones metálicas: defensas, portabicicletas, racks de carga, soportes para placa y más.",
    benefits: ["Personalización total", "Funcionalidad y estética", "Resistencia comprobada"],
    ideal: "Dueños de vehículos que buscan personalizar o agregar funcionalidad.",
    wa: WHATSAPP_MESSAGES.adaptations,
  },
];

const Servicios = () => (
  <Layout>
    <section className="py-16 md:py-24">
      <div className="container">
        <SectionHeading
          tag="Nuestros servicios"
          title="Todo lo que necesitas en un solo taller"
          description="Desde la fabricación del tirón hasta remolques completos. Atención personalizada y calidad garantizada."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="bg-gradient-card rounded-lg border border-border p-8 hover:border-glow transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
              <ul className="space-y-2 mb-4">
                {s.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-steel-light italic mb-5">{s.ideal}</p>
              <a href={whatsappLink(s.wa)} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="bg-gradient-accent font-display tracking-wider">
                  <Phone className="w-4 h-4 mr-1" /> Cotizar
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Servicios;
