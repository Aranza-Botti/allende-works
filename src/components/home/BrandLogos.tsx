import { motion } from "framer-motion";

const brands = [
  "Ford", "RAM", "Chevrolet", "Toyota", "Jeep", "Nissan", "GMC",
  "Dodge", "Honda", "Volkswagen", "Mazda", "Mitsubishi", "Hyundai", "Kia",
  "Isuzu", "Suzuki", "Mercedes-Benz", "BMW",
];

const BrandLogos = () => (
  <section className="relative -mt-32 z-10 overflow-hidden pt-32 pb-12 md:pt-36 md:pb-14">
    <div className="absolute inset-0 bg-transparent pointer-events-none" />
    <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-transparent to-transparent pointer-events-none" />
    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background/30 pointer-events-none" />
    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background/40 to-transparent z-10 pointer-events-none" />
    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background/40 to-transparent z-10 pointer-events-none" />

    <div className="relative z-20">
      <p className="text-center text-[10px] font-display uppercase tracking-[0.3em] text-muted-foreground/45 mb-6">
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
              className="font-display text-lg md:text-xl font-bold tracking-wider text-muted-foreground/20 hover:text-muted-foreground/45 transition-colors duration-300 select-none shrink-0"
            >
              {name.toUpperCase()}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default BrandLogos;
