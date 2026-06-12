import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Wrench, Shield, Cog, Hammer, Link2, Settings, Phone, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import serviceHitch from "@/assets/real-work/image-10.png.asset.json";
import serviceFabrication from "@/assets/real-work/image-2.png.asset.json";
import serviceInstallation from "@/assets/real-work/image-3.png.asset.json";
import serviceMaterials from "@/assets/real-work/image-4.png.asset.json";
import serviceReceiver from "@/assets/real-work/image-5.png.asset.json";
import serviceAttention from "@/assets/real-work/image-6.png.asset.json";
import serviceQuality from "@/assets/real-work/image-7.png.asset.json";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const services = [
  {
    icon: Wrench,
    title: "Tirones de arrastre personalizados",
    desc: "Fabricamos tirones a medida para pickups, SUVs, sedanes y camionetas de trabajo con ajuste limpio y resistente.",
    benefits: ["Ajuste perfecto a tu vehículo", "Fabricado a la medida", "Acabado profesional"],
    ideal: "Ideal para quienes necesitan remolcar con seguridad sin improvisaciones.",
    wa: WHATSAPP_MESSAGES.general,
    img: serviceHitch.url,
  },
  {
    icon: Truck,
    title: "Fabricación de remolques",
    desc: "Desarrollamos soluciones reforzadas para remolque y arrastre, con estructura hecha para el uso real de cada cliente.",
    benefits: ["Diseño personalizado", "Estructura reforzada", "Trabajo sobre especificación"],
    ideal: "Para carga, trabajo diario y necesidades especiales de transporte.",
    wa: WHATSAPP_MESSAGES.trailers,
    img: serviceFabrication.url,
  },
  {
    icon: Settings,
    title: "Instalación de tirones",
    desc: "Servicio profesional de instalación y alineación para que tu tirón quede firme, recto y listo para trabajar.",
    benefits: ["Instalación el mismo día", "Alineación precisa", "Entrega funcional"],
    ideal: "Para quienes buscan una instalación rápida y bien hecha.",
    wa: WHATSAPP_MESSAGES.installation,
    img: serviceInstallation.url,
  },
  {
    icon: Hammer,
    title: "Fabricación metálica a medida",
    desc: "Diseñamos piezas, soportes y estructuras con materiales resistentes y acabados hechos para durar.",
    benefits: ["Materiales de alta resistencia", "Medidas personalizadas", "Acabados sólidos"],
    ideal: "Negocios y particulares que necesitan una pieza hecha específicamente para su proyecto.",
    wa: WHATSAPP_MESSAGES.fabrication,
    img: serviceMaterials.url,
  },
  {
    icon: Shield,
    title: "Soldadura especializada",
    desc: "Realizamos uniones y refuerzos para piezas de arrastre y estructuras que requieren resistencia y precisión.",
    benefits: ["Refuerzos estructurales", "Acabado limpio", "Durabilidad para uso real"],
    ideal: "Para reparaciones y trabajos donde la resistencia no se negocia.",
    wa: WHATSAPP_MESSAGES.welding,
    img: serviceQuality.url,
  },
  {
    icon: Link2,
    title: "Accesorios de arrastre",
    desc: "Integramos receptores, bolas y componentes compatibles para completar tu sistema de arrastre.",
    benefits: ["Receptor de 2 pulgadas", "Compatibilidad funcional", "Listo para instalar"],
    ideal: "Complementa tu tirón con la configuración correcta para tu vehículo.",
    wa: WHATSAPP_MESSAGES.accessories,
    img: serviceReceiver.url,
  },
  {
    icon: Cog,
    title: "Adaptaciones para vehículos",
    desc: "Hacemos ajustes y adaptaciones según el uso de tu unidad, con atención directa durante todo el proceso.",
    benefits: ["Atención personalizada", "Solución a medida", "Trabajo directo en taller"],
    ideal: "Para dueños que necesitan resolver un requerimiento específico en su vehículo.",
    wa: WHATSAPP_MESSAGES.adaptations,
    img: serviceAttention.url,
  },
];

const Servicios = () => (
  <Layout>
    <section className="py-16 md:py-24">
      <div className="container">
        <SectionHeading
          tag="Nuestros servicios"
          title="Todo lo que necesitas en un solo taller"
          description="Ahora con fotos reales de trabajos hechos en el taller para que veas nuestro trabajo tal como sale." 
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
              className="bg-gradient-card rounded-lg border border-border overflow-hidden hover:border-glow transition-colors"
            >
              <div className="aspect-[16/10] overflow-hidden border-b border-border/70">
                <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Servicios;
