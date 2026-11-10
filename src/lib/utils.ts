import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { negocio } from "@/content/visionario";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["titular", "seccion", "bloque", "entrada", "cuerpo", "meta", "destacado", "cifra"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatoBs = new Intl.NumberFormat("es-BO", { maximumFractionDigits: 0, useGrouping: "always" });

/** "Bs 1.350" (espacio no separable: el monto nunca se parte en dos líneas) */
export function bs(monto: number) {
  return `${negocio.moneda} ${formatoBs.format(monto)}`;
}

/** Decimal con coma: 6,2 */
export function decimal(valor: number, digitos = 1) {
  return valor.toFixed(digitos).replace(".", ",");
}

const formatoFecha = new Intl.DateTimeFormat("es-BO", { day: "numeric", month: "long", year: "numeric" });
const formatoFechaLarga = new Intl.DateTimeFormat("es-BO", { weekday: "long", day: "numeric", month: "long" });

/** "9 de noviembre de 2026" */
export function fecha(iso: string) {
  return formatoFecha.format(new Date(iso));
}

/** "lunes, 9 de noviembre" */
export function fechaLarga(iso: string) {
  return formatoFechaLarga.format(new Date(iso));
}

/** Dioptrías con signo: "−5,25" / "+2,00" */
export function dioptria(valor: number) {
  const signo = valor > 0 ? "+" : valor < 0 ? "−" : "";
  return `${signo}${Math.abs(valor).toFixed(2).replace(".", ",")}`;
}

/** Suma meses a una fecha ISO (vencimientos mensuales). */
export function sumarMeses(iso: string, meses: number) {
  const d = new Date(iso);
  d.setMonth(d.getMonth() + meses);
  return d.toISOString();
}
