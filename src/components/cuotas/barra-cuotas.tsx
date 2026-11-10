import { cn } from "@/lib/utils";

/**
 * Progreso de cuotas en segmentos (uno por cuota). El segmento recién pagado
 * se llena con animación al confirmar el pago; sin movimiento si se pidió.
 */
export function BarraCuotas({
  pagadas,
  total,
  animarUltima = false,
  claro = false,
  className,
}: {
  pagadas: number;
  total: number;
  animarUltima?: boolean;
  claro?: boolean;
  className?: string;
}) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={pagadas}
      aria-label={`Cuotas pagadas: ${pagadas} de ${total}`}
      className={cn("flex h-3 gap-1.5", className)}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn("relative flex-1 overflow-hidden rounded-full", claro ? "bg-white/15" : "bg-progreso-pista")}
        >
          {i < pagadas && (
            <span
              className={cn(
                "absolute inset-0 origin-left rounded-full bg-progreso",
                animarUltima && i === pagadas - 1 && "animate-llenar",
              )}
            />
          )}
        </span>
      ))}
    </div>
  );
}
