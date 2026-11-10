import Image from "next/image";
import { marca } from "@/content/visionario";
import { cn } from "@/lib/utils";

/** Logo oficial. `navbar`: sin lema · `completo`: con "Accesorios Ópticos". */
export function Logo({
  variante = "navbar",
  className,
  prioridad = false,
}: {
  variante?: "navbar" | "completo";
  className?: string;
  prioridad?: boolean;
}) {
  const { src, ancho, alto } = marca.logo[variante];
  return (
    <Image
      src={src}
      width={ancho}
      height={alto}
      alt={marca.logo.alt}
      priority={prioridad}
      sizes="(min-width: 768px) 176px, 144px"
      className={cn("h-auto w-36 md:w-44", className)}
    />
  );
}
