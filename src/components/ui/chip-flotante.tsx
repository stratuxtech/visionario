import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

type Tono = "azul" | "exito" | "oro" | "blanco" | "oscuro";

const tonos: Record<Tono, { caja: string; icono: string }> = {
  azul: { caja: "bg-primary-600 text-white shadow-brillo", icono: "bg-white/20 text-white" },
  exito: { caja: "vidrio text-secondary-950", icono: "bg-exito-100 text-exito-700" },
  oro: { caja: "vidrio text-secondary-950", icono: "bg-oro-200 text-oro-800" },
  blanco: { caja: "vidrio text-secondary-950", icono: "bg-primary-100 text-primary-700" },
  oscuro: { caja: "bg-secondary-950 text-white shadow-lg", icono: "bg-white/15 text-primary-300" },
};

/**
 * Píldora que flota alrededor de una foto o ilustración (referencia: Pling,
 * "✓ QR verificado"). Aparece con un pequeño rebote y luego levita.
 * Decorativa: el contenido real siempre está en el texto de la pantalla.
 */
export function ChipFlotante({
  icono,
  emoji,
  texto,
  tono = "blanco",
  retraso = 0,
  giro = 0,
  className,
}: {
  icono?: IconSvgElement;
  emoji?: string;
  texto?: React.ReactNode;
  tono?: Tono;
  /** ms antes de aparecer */
  retraso?: number;
  /** inclinación en grados */
  giro?: number;
  className?: string;
}) {
  const t = tonos[tono];
  const estilo = { "--giro": `${giro}deg`, animationDelay: `${retraso}ms` } as React.CSSProperties;
  return (
    <span aria-hidden className={cn("pointer-events-none absolute z-10 animate-chip", className)} style={estilo}>
      <span
        className={cn("flex animate-flotar items-center gap-2 rounded-full py-1.5 pr-3.5 pl-1.5 text-meta font-bold whitespace-nowrap", t.caja, !texto && "p-1.5 pr-1.5")}
        style={{ "--giro": `${giro}deg`, animationDelay: `${retraso + 700}ms` } as React.CSSProperties}
      >
        {(icono || emoji) && (
          <span className={cn("flex size-7 items-center justify-center rounded-full text-base leading-none", t.icono)}>
            {icono ? <HugeiconsIcon icon={icono} size={16} strokeWidth={2.25} /> : emoji}
          </span>
        )}
        {texto}
      </span>
    </span>
  );
}
