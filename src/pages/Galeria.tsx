import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import realProject1 from "@/assets/real-work/image.png.asset.json";
import realProject2 from "@/assets/real-work/image-2.png.asset.json";
import realProject3 from "@/assets/real-work/image-3.png.asset.json";
import realProject4 from "@/assets/real-work/image-4.png.asset.json";
import realProject5 from "@/assets/real-work/image-5.png.asset.json";
import realProject6 from "@/assets/real-work/image-6.png.asset.json";
import realProject7 from "@/assets/real-work/image-7.png.asset.json";
import realProject8 from "@/assets/real-work/image-8.png.asset.json";
import realProject9 from "@/assets/real-work/image-9.png.asset.json";

const categories = ["Todos", "Tirones", "Fabricación", "Instalación", "Accesorios"];

const projects = [
  { title: "Tirón para SUV Jetour", category: "Tirones", vehicle: "Trabajo personalizado", img: realProject1.url, desc: "Instalación real en taller con acabado limpio y lista para cita." },
  { title: "Fabricación para BMW X6", category: "Fabricación", vehicle: "Fabricación a la medida", img: realProject2.url, desc: "Trabajo hecho a la medida del vehículo con enfoque en ajuste y presencia." },
  { title: "Instalación para Toyota RAV4", category: "Instalación", vehicle: "Entrega el mismo día", img: realProject3.url, desc: "Instalación terminada el mismo día de la cita con alineación limpia." },
  { title: "Estructura reforzada Tacoma", category: "Fabricación", vehicle: "Materiales de alta resistencia", img: realProject4.url, desc: "Proyecto con materiales pensados para uso fuerte y mayor durabilidad." },
  { title: "Receptor de 2 pulgadas", category: "Accesorios", vehicle: "Ford Ranger", img: realProject5.url, desc: "Configuración con receptor de 2 pulgadas lista para operación." },
  { title: "Adaptación en Nissan Frontier", category: "Instalación", vehicle: "Atención personalizada", img: realProject6.url, desc: "Trabajo directo en taller con ajuste específico para la unidad." },
  { title: "Tirón para Mustang", category: "Tirones", vehicle: "Proyecto terminado", img: realProject7.url, desc: "Proyecto finalizado con enfoque en calidad visual y funcionalidad." },
  { title: "Entrega programada X-Trail", category: "Tirones", vehicle: "Instalación lista", img: realProject8.url, desc: "Trabajo listo para entregar o programar según la necesidad del cliente." },
  { title: "Tacoma lista para trabajo", category: "Tirones", vehicle: "Cliente satisfecho", img: realProject9.url, desc: "Otra entrega real del taller, lista para uso de arrastre." },
];

const Galeria = () => {
  const [active, setActive] = useState("Todos");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = active === "Todos" ? projects : projects.filter((p) => p.category === active);

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading tag="Galería" title="Trabajos reales del taller" description="Estas imágenes corresponden a instalaciones y fabricaciones reales de Tirones Allende." />

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setActive(c);
                  setLightbox(null);
                }}
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
                <div className="aspect-[4/5] overflow-hidden bg-secondary/30">
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
              <img src={filtered[lightbox].img} alt={filtered[lightbox].title} className="w-full max-h-[80vh] object-contain rounded-lg mx-auto" />
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
