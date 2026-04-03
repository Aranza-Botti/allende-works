import { motion } from "framer-motion";

const brands = [
  "Ford", "RAM", "Chevrolet", "Toyota", "Jeep", "Nissan", "GMC",
  "Dodge", "Honda", "Volkswagen", "Mazda", "Mitsubishi", "Hyundai", "Kia",
  "Isuzu", "Suzuki", "Mercedes-Benz", "BMW",
];

const BrandLogos = () => (
  <section className="py-8 md:py-10 bg-transparent relative overflow-hidden -mt-16 z-10">
    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
    <p className="text-center text-[10px] font-display uppercase tracking-[0.3em] text-muted-foreground/50 mb-6 relative z-20">
      Trabajamos con las marcas más populares
    </p>
    <div className="relative">
      <motion.div
        className="flex gap-12 md:gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {[...brands, ...brands].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display text-lg md:text-xl font-bold tracking-wider text-muted-foreground/25 hover:text-muted-foreground/50 transition-colors duration-300 select-none shrink-0"
          >
            {name.toUpperCase()}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

export default BrandLogos;
