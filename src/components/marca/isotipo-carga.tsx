import Image from "next/image";
import { marca, textos } from "@/content/visionario";
import { cn } from "@/lib/utils";

/**
 * Indicador de carga con el isotipo del ojo. El ojo parpadea (escala
 * vertical), no gira: comunica "estamos mirando su caso".
 * Sin movimiento con prefers-reduced-motion.
 */
export function IsotipoCarga({ etiqueta = textos.cargando, className }: { etiqueta?: string; className?: string }) {
  return (
    <div role="status" aria-live="polite" className={cn("flex flex-col items-center gap-3", className)}>
      <Image
        src={marca.logo.isotipo.src}
        width={64}
        height={64}
        alt=""
        aria-hidden
        className="size-16 animate-parpadeo motion-reduce:animate-none"
      />
      <span className="text-meta text-muted-foreground">{etiqueta}</span>
    </div>
  );
}
