import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ tag, title, description, className, align = "center" }: SectionHeadingProps) => (
  <div className={cn("mb-10 md:mb-14", align === "center" && "text-center", className)}>
    {tag && (
      <span className="inline-block font-display text-xs uppercase tracking-[0.2em] text-primary mb-3">
        {tag}
      </span>
    )}
    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
