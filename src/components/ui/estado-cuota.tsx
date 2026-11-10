import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, Clock01Icon, AlertCircleIcon } from "@hugeicons/core-free-icons";
import { textos, type EstadoCuota as Estado } from "@/content/visionario";
import { cn } from "@/lib/utils";

const config = {
  pagada: { icono: CheckmarkCircle02Icon, clases: "bg-pagada-fondo text-pagada" },
  pendiente: { icono: Clock01Icon, clases: "bg-pendiente-fondo text-pendiente" },
  vencida: { icono: AlertCircleIcon, clases: "bg-vencida-fondo text-vencida" },
} as const;

/** Estado de una cuota: icono + texto + color (nunca solo color). */
export function EstadoCuota({ estado, className }: { estado: Estado; className?: string }) {
  const { icono, clases } = config[estado];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full py-1 pr-3 pl-2 text-meta font-bold",
        clases,
        className,
      )}
    >
      <HugeiconsIcon icon={icono} size={18} strokeWidth={2} aria-hidden />
      {textos.estadosCuota[estado].etiqueta}
    </span>
  );
}
