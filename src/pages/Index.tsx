import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Shield, Wrench, Clock, Star, CheckCircle, ChevronRight, MessageCircle, Zap, Users } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import AnimatedCounter from "@/components/home/AnimatedCounter";
import StickyMobileCTA from "@/components/home/StickyMobileCTA";
import BrandLogos from "@/components/home/BrandLogos";
import GoogleMapSection from "@/components/home/GoogleMapSection";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import heroImg from "@/assets/hero-welding.jpg";
import projectHitch from "@/assets/project-hitch-1.jpg";
import projectFab from "@/assets/project-fabrication.jpg";
import projectBall from "@/assets/project-ball-mount.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

const values = [
  { icon: Wrench, title: "Hecho a la medida", desc: "Cada tirón se fabrica según las dimensiones exactas de tu vehículo." },
  { icon: Shield, title: "Instalación profesional", desc: "Montaje seguro con acabados de primera calidad." },
  { icon: Clock, title: "Abiertos 24 horas", desc: "Disponibilidad total para atender tus necesidades." },
  { icon: Star, title: "Calidad en soldadura", desc: "Soldadura MIG/TIG de alta resistencia con materiales certificados." },
  { icon: MessageCircle, title: "Cotización personalizada", desc: "Te explicamos cada detalle antes de empezar el trabajo." },
  { icon: CheckCircle, title: "5.0 ★ en Google", desc: "Calificación perfecta respaldada por clientes reales." },
];

const services = [
  { title: "Tirones de arrastre", desc: "Fabricación personalizada para pickups, SUVs y camionetas de trabajo.", img: projectHitch, wa: WHATSAPP_MESSAGES.general },
  { title: "Remolques a medida", desc: "Diseño y fabricación de remolques personalizados para cualquier necesidad.", img: projectFab, wa: WHATSAPP_MESSAGES.trailers },
  { title: "Fabricación metálica", desc: "Estructuras, soportes, bases y piezas metálicas a medida.", img: projectBall, wa: WHATSAPP_MESSAGES.fabrication },
];

const testimonials = [
  { name: "Carlos M.", rating: 5, text: "Excelente trabajo en mi Silverado. El tirón quedó perfecto y la instalación fue rápida. Muy recomendado.", vehicle: "Chevrolet Silverado" },
  { name: "Roberto G.", rating: 5, text: "Mandé fabricar una base especial para mi remolque y quedó de primera. Precio justo y buen trato.", vehicle: "Ford F-150" },
  { name: "María L.", rating: 5, text: "Me explicaron todo el proceso desde el inicio. Se nota la experiencia y la calidad del trabajo.", vehicle: "Toyota Hilux" },
];

const Index = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Layout>
      <StickyMobileCTA />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-hero">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <video autoPlay muted loop playsInline poster={heroImg} className="w-full h-full object-cover opacity-20">
            <source src="/welding-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="container relative z-10 py-20 md:py-32">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.span variants={fadeUp} custom={0} className="inline-block font-display text-xs uppercase tracking-[0.3em] text-primary mb-4">
              ALLENDE, NUEVO LEÓN
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] text-foreground">
              Tirones de arrastre<br />
              <span className="text-primary">a tu medida</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Fabricación, instalación, remolques y soldadura de alta calidad. Soluciones personalizadas para cada vehículo.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gradient-accent font-display tracking-wider text-base w-full sm:w-auto urgency-pulse relative overflow-hidden group">
                  <Phone className="w-5 h-5 mr-2" /> Cotizar por WhatsApp
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </Button>
              </a>
              <Link to="/cotizar">
                <Button size="lg" variant="outline" className="font-display tracking-wider text-base border-border text-foreground hover:bg-secondary hover:border-primary/30 w-full sm:w-auto transition-all duration-300">
                  Solicitar cotización <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Star className="w-4 h-4 fill-primary text-primary" /> 5.0 en Google</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> +10 años de experiencia</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> +1,200 seguidores</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* Brand logos */}
      <BrandLogos />

      {/* Counters */}
      <section className="py-12 md:py-16 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-graphite" />
        <div className="container relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter end={500} suffix="+" label="Clientes atendidos" />
          <AnimatedCounter end={10} suffix="+" label="Años de experiencia" />
          <AnimatedCounter end={1200} suffix="+" label="Proyectos completados" />
          <AnimatedCounter end={5} suffix=".0" label="Estrellas en Google" />
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-graphite">
        <div className="container">
          <SectionHeading tag="¿Por qué elegirnos?" title="Calidad que se nota en cada detalle" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={i} variants={scaleIn}
                className="bg-gradient-card rounded-lg border border-border p-6 hover:border-glow transition-all group text-left hover-lift cursor-default"
              >
                <div className="gap-3 mb-3 flex items-center">
                  <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-all duration-300">
                    <v.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">{v.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container relative z-10">
          <SectionHeading tag="Nuestros servicios" title="Soluciones especializadas" description="Desde la fabricación del tirón hasta remolques completos. Todo en un solo taller." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={i} variants={fadeUp}
                className="group rounded-lg overflow-hidden bg-gradient-card border border-border hover:border-glow transition-all shadow-card hover-lift"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                  <div className="flex gap-3">
                    <a href={whatsappLink(s.wa)} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button size="sm" className="w-full bg-gradient-accent font-display tracking-wider text-xs">
                        <Phone className="w-3.5 h-3.5 mr-1" /> Cotizar
                      </Button>
                    </a>
                    <Link to="/servicios" className="inline-flex items-center text-sm text-primary font-medium gap-1 group-hover:gap-2 transition-all shrink-0">
                      Ver más <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center mt-10">
            <Link to="/servicios">
              <Button variant="outline" className="font-display tracking-wider border-border text-foreground hover:bg-secondary hover:border-primary/30 transition-all duration-300">
                Ver todos los servicios <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-graphite relative overflow-hidden">
        <div className="container relative z-10">
          <SectionHeading tag="Testimonios" title="Lo que dicen nuestros clientes" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={i} variants={scaleIn}
                className="bg-gradient-card rounded-lg border border-border p-6 hover-lift relative group"
              >
                <span className="absolute top-4 right-5 font-display text-6xl text-primary/10 leading-none select-none group-hover:text-primary/15 transition-colors">"</span>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="font-display text-xs font-bold text-primary">{t.name[0]}</span>
                  </div>
                  <div>
                    <span className="font-display text-sm font-semibold text-foreground block">{t.name}</span>
                    <span className="text-xs text-muted-foreground">{t.vehicle}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <GoogleMapSection />

      {/* CTA */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-accent opacity-[0.03]" />
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-display uppercase tracking-widest text-primary mb-6">
              <Zap className="w-3 h-3" /> Respuesta inmediata
            </span>
          </motion.div>
          <SectionHeading tag="¿Listo para empezar?" title="Solicita tu cotización hoy" description="Cuéntanos qué necesitas y te damos una cotización sin compromiso." />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={whatsappLink(WHATSAPP_MESSAGES.quote)} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-accent font-display tracking-wider text-base w-full sm:w-auto urgency-pulse relative overflow-hidden group">
                <Phone className="w-5 h-5 mr-2" /> Cotizar por WhatsApp
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Button>
            </a>
            <Link to="/cotizar">
              <Button size="lg" variant="outline" className="font-display tracking-wider text-base border-border text-foreground hover:bg-secondary hover:border-primary/30 w-full sm:w-auto transition-all duration-300">
                Formulario de cotización <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-6 text-xs text-muted-foreground">
            Sin compromiso · Sin costo · Respuesta garantizada
          </motion.p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
