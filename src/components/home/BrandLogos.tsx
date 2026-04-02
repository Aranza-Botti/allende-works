import { motion } from "framer-motion";

const brands = [
  { name: "Ford", svg: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" },
  { name: "RAM", svg: "" },
  { name: "Chevrolet", svg: "" },
  { name: "Toyota", svg: "" },
  { name: "Jeep", svg: "" },
  { name: "Nissan", svg: "" },
  { name: "GMC", svg: "" },
];

const BrandLogos = () => (
  <section className="py-10 md:py-14 border-y border-border/50 bg-background/50 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
    <div className="container relative">
      <p className="text-center text-xs font-display uppercase tracking-[0.3em] text-muted-foreground mb-8">
        Trabajamos con las marcas más populares
      </p>
      <div className="flex items-center justify-center flex-wrap gap-8 md:gap-14">
        {brands.map((brand, i) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-center justify-center group"
          >
            <span className="font-display text-xl md:text-2xl font-bold tracking-wider text-muted-foreground/40 group-hover:text-muted-foreground/80 transition-colors duration-300 select-none">
              {brand.name.toUpperCase()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BrandLogos;
