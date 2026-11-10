import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  NecklaceIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

type Tono = "info" | "exito" | "alerta" | "oro" | "oscuro";

const tonos: Record<Tono, { caja: string; chip: string; icono: IconSvgElement }> = {
  info: { caja: "bg-primary-50 ring-primary-100 text-secondary-800", chip: "bg-white text-primary-700 shadow-xs", icono: InformationCircleIcon },
  exito: { caja: "bg-exito-50 ring-exito-100 text-exito-800", chip: "bg-white text-exito-700 shadow-xs", icono: CheckmarkCircle02Icon },
  alerta: { caja: "bg-alerta-50 ring-alerta-100 text-alerta-700", chip: "bg-white text-alerta-600 shadow-xs", icono: AlertCircleIcon },
  oro: { caja: "bg-oro-100 ring-oro-200 text-oro-800", chip: "bg-white text-oro-800 shadow-xs", icono: NecklaceIcon },
  oscuro: { caja: "bg-secondary-950 ring-white/10 text-secondary-200", chip: "bg-white/10 text-primary-300", icono: InformationCircleIcon },
};

/**
 * Componente de información dentro de una pantalla (no es un aviso que
 * flota). Ícono en un chip, título corto en negrita y, si hace falta, una
 * línea más. Entra suave.
 */
export function Nota({
  tono = "info",
  icono,
  titulo,
  children,
  accion,
  className,
  role,
}: {
  tono?: Tono;
  icono?: IconSvgElement;
  titulo: React.ReactNode;
  children?: React.ReactNode;
  accion?: React.ReactNode;
  className?: string;
  role?: "status" | "alert";
}) {
  const t = tonos[tono];
  return (
    <div role={role} className={cn("flex animate-entrar items-start gap-3 rounded-2xl p-3.5 pr-4 ring-1", t.caja, className)}>
      <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-full", t.chip)}>
        <HugeiconsIcon icon={icono ?? t.icono} size={20} strokeWidth={2} aria-hidden />
      </span>
      <div className="min-w-0 flex-1 self-center">
        <p className={cn("font-bold", tono === "oscuro" ? "text-white" : "text-current")}>{titulo}</p>
        {children && <div className="mt-0.5 text-meta font-medium opacity-90">{children}</div>}
        {accion && <div className="mt-3">{accion}</div>}
      </div>
    </div>
  );
}
