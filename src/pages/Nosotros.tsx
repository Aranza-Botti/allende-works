import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { Shield, Users, MapPin, Wrench, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";
import workshopImg from "@/assets/real-work/image-6.png.asset.json";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const stats = [
  { value: "+10", label: "Años de experiencia" },
  { value: "+500", label: "Proyectos completados" },
  { value: "100%", label: "Trabajo personalizado" },
  { value: "5.0", label: "Calificación en Google" },
];

const pillars = [
  { icon: Wrench, title: "Trabajo artesanal", desc: "Cada pieza se fabrica a mano con la precisión que exige el trabajo automotriz." },
  { icon: Users, title: "Atención directa", desc: "Hablas directamente con quien fabrica tu pieza. Sin intermediarios." },
  { icon: Shield, title: "Calidad garantizada", desc: "Usamos materiales de alta resistencia y procesos de soldadura pensados para durar." },
  { icon: MapPin, title: "Ubicación real", desc: "Estamos en Carr Nacional 513, Valle de Los Naranjos, Allende, Nuevo León." },
  { icon: Clock, title: "Respuesta rápida", desc: "En Google aparecemos con atención 24 horas, pero te atendemos mejor con previa cita." },
  { icon: Award, title: "5.0 en Google", desc: "Nuestra ficha actual muestra calificación perfecta y 16 reseñas de clientes." },
];

const Nosotros = () => (
  <Layout>
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading tag="Sobre nosotros" title="Un taller con historia y compromiso" align="left" />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Tirones Allende</strong> trabaja desde Allende, Nuevo León, fabricando e instalando tirones de arrastre con enfoque en ajuste real, resistencia y atención directa.
              </p>
              <p>
                Cada tirón se adapta al vehículo que llega al taller. No trabajamos con soluciones genéricas cuando el proyecto necesita una medida exacta, una alineación correcta y un acabado bien resuelto.
              </p>
              <p>
                Con las fotos reales del taller ahora visibles en el sitio, mostramos mejor el tipo de trabajos que realizamos todos los días: tirones personalizados, instalaciones, adaptaciones y fabricación metálica aplicada al uso real del cliente.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border border-border shadow-card">
            <img src={workshopImg.url} alt="Trabajo real en el taller Tirones Allende" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

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
