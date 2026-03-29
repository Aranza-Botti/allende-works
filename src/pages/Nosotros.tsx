import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Shield, Users, MapPin, Wrench, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";
import projectFab from "@/assets/project-fabrication.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const stats = [
  { value: "+10", label: "Años de experiencia" },
  { value: "+500", label: "Proyectos completados" },
  { value: "100%", label: "Trabajo personalizado" },
  { value: "4.9", label: "Calificación de clientes" },
];

const pillars = [
  { icon: Wrench, title: "Trabajo artesanal", desc: "Cada pieza se fabrica a mano con la precisión que exige el trabajo automotriz." },
  { icon: Users, title: "Atención directa", desc: "Hablas directamente con quien fabrica tu pieza. Sin intermediarios." },
  { icon: Shield, title: "Calidad garantizada", desc: "Usamos materiales de alta resistencia y procesos de soldadura certificados." },
  { icon: MapPin, title: "Raíces locales", desc: "Somos parte de la comunidad de Allende. Conocemos las necesidades de la zona." },
  { icon: Clock, title: "Disponibilidad", desc: "Horarios amplios y respuesta rápida para que no pierdas tiempo." },
  { icon: Award, title: "Experiencia comprobada", desc: "Más de una década trabajando con vehículos de todo tipo." },
];

const Nosotros = () => (
  <Layout>
    {/* Story */}
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading tag="Sobre nosotros" title="Un taller con historia y compromiso" align="left" />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Tirones Allende</strong> nació de la pasión por el trabajo en metal y la mecánica automotriz. Ubicados sobre la Carretera Nacional en Allende, Nuevo León, hemos construido nuestra reputación pieza por pieza — literalmente.
              </p>
              <p>
                Cada tirón de arrastre que fabricamos se diseña según las dimensiones y necesidades específicas del vehículo. No usamos moldes genéricos ni soluciones improvisadas. Aquí cada trabajo se hace con la medida exacta, la soldadura correcta y el acabado que tu vehículo merece.
              </p>
              <p>
                Nos especializamos en fabricación metálica, soldadura de alta resistencia, instalación profesional de tirones y todo tipo de adaptaciones vehiculares. Atendemos desde dueños de pickups que necesitan remolcar su trailer hasta negocios que requieren soluciones de fabricación industrial.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border border-border shadow-card">
            <img src={projectFab} alt="Taller Tirones Allende" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-12 bg-graphite">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-2">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Pillars */}
    <section className="py-16 md:py-24">
      <div className="container">
        <SectionHeading tag="Nuestros valores" title="Lo que nos distingue" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="bg-gradient-card rounded-lg border border-border p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Nosotros;
