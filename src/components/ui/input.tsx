import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Campo de texto (referencia: Stratux). Blanco translúcido con borde de luz;
 * en hover se aclara y al enfocar el borde se ilumina en azul con un halo.
 * Siempre ocupa todo el ancho del contenedor.
 */
const estiloCampo = cn(
  "w-full min-w-0 rounded-2xl border border-secondary-200 bg-white/80 px-4 text-entrada text-secondary-950 shadow-xs",
  "transition-[border-color,box-shadow,background-color] duration-300 ease-salida",
  "hover:border-secondary-300 hover:bg-white",
  "focus-visible:border-primary-500 focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_rgb(21_125_202/0.16),0_8px_24px_-8px_rgb(15_105_180/0.35)] focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:bg-secondary-100 disabled:opacity-60",
  "aria-invalid:border-alerta-600 aria-invalid:focus-visible:shadow-[0_0_0_4px_rgb(180_35_24/0.14)]",
);

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(estiloCampo, "h-14", className)} {...props} />;
}

function AreaTexto({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(estiloCampo, "min-h-28 py-3.5", className)} {...props} />;
}

export { AreaTexto, Input, estiloCampo };
