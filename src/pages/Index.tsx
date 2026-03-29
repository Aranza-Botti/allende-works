import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Shield, Wrench, Clock, Star, CheckCircle, ChevronRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import heroImg from "@/assets/hero-welding.jpg";
import projectHitch from "@/assets/project-hitch-1.jpg";
import projectFab from "@/assets/project-fabrication.jpg";
import projectBall from "@/assets/project-ball-mount.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const values = [
  { icon: Wrench, title: "Hecho a la medida", desc: "Cada tirón se fabrica según las dimensiones exactas de tu vehículo." },
  { icon: Shield, title: "Instalación profesional", desc: "Montaje seguro con acabados de primera calidad." },
  { icon: Clock, title: "Atención rápida", desc: "Respuesta inmediata y tiempos de entrega competitivos." },
  { icon: Star, title: "Calidad en soldadura", desc: "Soldadura MIG/TIG de alta resistencia con materiales certificados." },
  { icon: MessageCircle, title: "Cotización personalizada", desc: "Te explicamos cada detalle antes de empezar el trabajo." },
  { icon: CheckCircle, title: "Servicio confiable", desc: "Años de experiencia respaldando cada proyecto que entregamos." },
];

const services = [
  { title: "Tirones de arrastre", desc: "Fabricación personalizada para pickups, SUVs y camionetas de trabajo.", img: projectHitch },
  { title: "Bolas y accesorios", desc: "Bolas de arrastre, conectores eléctricos y accesorios de remolque.", img: projectBall },
  { title: "Fabricación metálica", desc: "Estructuras, soportes, bases y piezas metálicas a medida.", img: projectFab },
];

const testimonials = [
  { name: "Carlos M.", rating: 5, text: "Excelente trabajo en mi Silverado. El tirón quedó perfecto y la instalación fue rápida. Muy recomendado." },
  { name: "Roberto G.", rating: 5, text: "Mandé fabricar una base especial para mi remolque y quedó de primera. Precio justo y buen trato." },
  { name: "María L.", rating: 5, text: "Me explicaron todo el proceso desde el inicio. Se nota la experiencia y la calidad del trabajo." },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Soldadura de tirón de arrastre en taller" className="w-full h-full object-cover opacity-40" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>
      <div className="container relative z-10 py-20 md:py-32">
        <motion.div initial="hidden" animate="visible" className="max-w-2xl">
          <motion.span variants={fadeUp} custom={0} className="inline-block font-display text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Allende, Nuevo León
          </motion.span>
          <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] text-foreground">
            Tirones de arrastre<br />
            <span className="text-gradient">a tu medida</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
            Fabricación, instalación y soldadura de alta calidad. Soluciones personalizadas para cada vehículo con la confianza de un taller especializado.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-accent font-display tracking-wider text-base w-full sm:w-auto">
                <Phone className="w-5 h-5 mr-2" /> Cotizar por WhatsApp
              </Button>
            </a>
            <Link to="/cotizar">
              <Button size="lg" variant="outline" className="font-display tracking-wider text-base border-border text-foreground hover:bg-secondary w-full sm:w-auto">
                Solicitar cotización <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} custom={4} className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Trabajo garantizado</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> +10 años experiencia</span>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="py-16 md:py-24 bg-graphite">
      <div className="container">
        <SectionHeading tag="¿Por qué elegirnos?" title="Calidad que se nota en cada detalle" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="bg-gradient-card rounded-lg border border-border p-6 hover:border-glow transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <v.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="py-16 md:py-24">
      <div className="container">
        <SectionHeading tag="Nuestros servicios" title="Soluciones especializadas" description="Desde la fabricación del tirón hasta la instalación completa. Todo en un solo taller." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="group rounded-lg overflow-hidden bg-gradient-card border border-border hover:border-glow transition-all shadow-card"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                <Link to="/servicios" className="inline-flex items-center text-sm text-primary font-medium hover:gap-2 transition-all gap-1">
                  Ver más <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/servicios">
            <Button variant="outline" className="font-display tracking-wider border-border text-foreground hover:bg-secondary">
              Ver todos los servicios <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-16 md:py-24 bg-graphite">
      <div className="container">
        <SectionHeading tag="Testimonios" title="Lo que dicen nuestros clientes" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="bg-gradient-card rounded-lg border border-border p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
              <span className="font-display text-sm font-semibold text-foreground">{t.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-accent opacity-10" />
      <div className="container relative z-10 text-center">
        <SectionHeading
          tag="¿Listo para empezar?"
          title="Solicita tu cotización hoy"
          description="Cuéntanos qué necesitas y te damos una cotización sin compromiso. Respuesta rápida por WhatsApp o formulario."
        />
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href={whatsappLink(WHATSAPP_MESSAGES.quote)} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-gradient-accent font-display tracking-wider text-base w-full sm:w-auto">
              <Phone className="w-5 h-5 mr-2" /> Cotizar por WhatsApp
            </Button>
          </a>
          <Link to="/cotizar">
            <Button size="lg" variant="outline" className="font-display tracking-wider text-base border-border text-foreground hover:bg-secondary w-full sm:w-auto">
              Formulario de cotización <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
