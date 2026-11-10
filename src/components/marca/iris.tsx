import { cn } from "@/lib/utils";

/**
 * El iris del isotipo como marcador de "usted está aquí".
 * Dibujo propio a partir de las formas del logo (círculo cian, pupila marina, brillo).
 */
export function Iris({ className, latido = false }: { className?: string; latido?: boolean }) {
  return (
    <span className={cn("relative inline-flex size-7 shrink-0", className)} aria-hidden>
      {latido && (
        <span className="absolute inset-0 animate-latido rounded-full bg-primary-300 motion-reduce:hidden" />
      )}
      <svg viewBox="0 0 28 28" className="relative size-full">
        <circle cx="14" cy="14" r="13" fill="var(--color-primary-500)" />
        <circle cx="12.5" cy="14.5" r="6" fill="var(--color-secondary-950)" />
        <circle cx="18.6" cy="9.8" r="3.4" fill="var(--color-white)" />
        <circle cx="18.6" cy="18.2" r="3.4" fill="var(--color-white)" />
      </svg>
    </span>
  );
}
