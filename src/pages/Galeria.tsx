import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { motion, AnimatePresence } from "framer-motion";
import projectHitch from "@/assets/project-hitch-1.jpg";
import projectFab from "@/assets/project-fabrication.jpg";
import projectBall from "@/assets/project-ball-mount.jpg";
import { X } from "lucide-react";

const categories = ["Todos", "Tirones", "Fabricación", "Instalación", "Accesorios"];

const projects = [
  { title: "Tirón para Silverado 2022", category: "Tirones", vehicle: "Chevrolet Silverado", img: projectHitch, desc: "Tirón personalizado de alta resistencia con acabado en negro mate." },
  { title: "Fabricación de base industrial", category: "Fabricación", vehicle: "Estructura metálica", img: projectFab, desc: "Base de soporte para maquinaria pesada con soldadura MIG." },
  { title: "Bola de arrastre ajustable", category: "Accesorios", vehicle: "Ford F-150", img: projectBall, desc: "Sistema de bola ajustable de tres posiciones." },
  { title: "Tirón para RAM 1500", category: "Tirones", vehicle: "RAM 1500", img: projectHitch, desc: "Tirón clase IV con recubrimiento anticorrosivo." },
  { title: "Soporte para remolque", category: "Fabricación", vehicle: "Remolque especial", img: projectFab, desc: "Estructura reforzada para remolque de doble eje." },
  { title: "Instalación completa SUV", category: "Instalación", vehicle: "Toyota Fortuner", img: projectBall, desc: "Instalación profesional de tirón con arnés eléctrico." },
];

const Galeria = () => {
  const [active, setActive] = useState("Todos");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = active === "Todos" ? projects : projects.filter((p) => p.category === active);

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading tag="Galería" title="Nuestros trabajos" description="Cada proyecto refleja la calidad y precisión que nos caracteriza." />

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 rounded-lg text-sm font-display tracking-wider transition-colors ${
                  active === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="group rounded-lg overflow-hidden bg-gradient-card border border-border hover:border-glow transition-all cursor-pointer shadow-card"
                onClick={() => setLightbox(i)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-display uppercase tracking-widest text-primary">{p.category}</span>
                  <h3 className="font-display text-lg font-semibold text-foreground mt-1">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.vehicle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-foreground" onClick={() => setLightbox(null)}>
              <X className="w-8 h-8" />
            </button>
            <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <img src={filtered[lightbox].img} alt={filtered[lightbox].title} className="w-full rounded-lg" />
              <div className="mt-4">
                <h3 className="font-display text-2xl font-bold text-foreground">{filtered[lightbox].title}</h3>
                <p className="text-muted-foreground mt-2">{filtered[lightbox].desc}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Galeria;
