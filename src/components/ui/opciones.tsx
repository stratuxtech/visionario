"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

/* Tarjeta de opción (referencia: Stratux "Diagnostícate"): se eleva en hover
   y al elegirla se enciende con borde azul, fondo tenue y un resplandor. */
const tarjetaOpcion = (marcada: boolean, error: boolean) =>
  cn(
    "relative flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border bg-white/80 px-4 py-3 font-semibold shadow-xs",
    "transition-[border-color,background-color,box-shadow,transform] duration-300 ease-salida",
    "has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
    marcada
      ? "animate-elegir border-primary-500 bg-primary-50 text-secondary-950 shadow-[0_0_0_3px_rgb(21_125_202/0.14),0_10px_24px_-10px_rgb(15_105_180/0.45)]"
      : "border-secondary-200 text-secondary-900 hover:-translate-y-0.5 hover:border-primary-300 hover:bg-white hover:shadow-md",
    error && !marcada && "border-alerta-200",
  );

function Indicador({ marcada, forma }: { marcada: boolean; forma: "circulo" | "cuadro" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-6 shrink-0 items-center justify-center border-2 transition-colors duration-300",
        forma === "circulo" ? "rounded-full" : "rounded-lg",
        marcada ? "border-primary-600 bg-primary-600 text-white" : "border-secondary-300 bg-white",
      )}
    >
      {marcada && <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={3} className="animate-confirmar" />}
    </span>
  );
}

function Encabezado({ etiqueta, ayuda, idAyuda, ocultar }: { etiqueta: string; ayuda?: string; idAyuda?: string; ocultar: boolean }) {
  return (
    <>
      <legend className={cn("mb-1 text-meta font-bold text-secondary-900", ocultar && "sr-only")}>{etiqueta}</legend>
      {ayuda && (
        <p id={idAyuda} className="mb-3 text-meta text-muted-foreground">
          {ayuda}
        </p>
      )}
    </>
  );
}

/** Grupo de opciones grandes (radio nativo, área de toque completa). */
export function Opciones({
  nombre,
  etiqueta,
  ayuda,
  opciones,
  valor,
  alCambiar,
  error,
  columnas = 1,
  ocultarEtiqueta = false,
}: {
  nombre: string;
  etiqueta: string;
  ayuda?: string;
  opciones: readonly string[];
  valor: string | null;
  alCambiar: (v: string) => void;
  error?: string;
  columnas?: 1 | 2 | 3;
  ocultarEtiqueta?: boolean;
}) {
  const idAyuda = ayuda ? `${nombre}-ayuda` : undefined;
  const idError = error ? `${nombre}-error` : undefined;
  return (
    <fieldset aria-describedby={[idAyuda, idError].filter(Boolean).join(" ") || undefined} aria-invalid={!!error}>
      <Encabezado etiqueta={etiqueta} ayuda={ayuda} idAyuda={idAyuda} ocultar={ocultarEtiqueta} />
      <div className={cn("mt-2 grid gap-2.5", columnas === 2 && "grid-cols-2", columnas === 3 && "grid-cols-3")}>
        {opciones.map((op) => {
          const marcada = valor === op;
          return (
            <label key={op} className={tarjetaOpcion(marcada, !!error && !valor)}>
              <input type="radio" name={nombre} value={op} checked={marcada} onChange={() => alCambiar(op)} className="sr-only" />
              <Indicador marcada={marcada} forma="circulo" />
              {op}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={idError} className="mt-2 text-meta font-semibold text-destructive">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/** Opciones con selección múltiple (casillas grandes, área de toque completa). */
export function OpcionesMultiples({
  nombre,
  etiqueta,
  ayuda,
  opciones,
  valores,
  alCambiar,
  error,
  ocultarEtiqueta = false,
}: {
  nombre: string;
  etiqueta: string;
  ayuda?: string;
  opciones: readonly string[];
  valores: readonly string[];
  alCambiar: (v: string[]) => void;
  error?: string;
  ocultarEtiqueta?: boolean;
}) {
  const idAyuda = ayuda ? `${nombre}-ayuda` : undefined;
  const idError = error ? `${nombre}-error` : undefined;
  const alternar = (op: string) => alCambiar(valores.includes(op) ? valores.filter((v) => v !== op) : [...valores, op]);
  return (
    <fieldset aria-describedby={[idAyuda, idError].filter(Boolean).join(" ") || undefined} aria-invalid={!!error}>
      <Encabezado etiqueta={etiqueta} ayuda={ayuda} idAyuda={idAyuda} ocultar={ocultarEtiqueta} />
      <div className="mt-2 grid gap-2.5">
        {opciones.map((op) => {
          const marcada = valores.includes(op);
          return (
            <label key={op} className={tarjetaOpcion(marcada, !!error && !valores.length)}>
              <input type="checkbox" name={nombre} value={op} checked={marcada} onChange={() => alternar(op)} className="sr-only" />
              <Indicador marcada={marcada} forma="cuadro" />
              {op}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={idError} className="mt-2 text-meta font-semibold text-destructive">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/**
 * Selector segmentado (referencia: Pling, "Antes / Durante / Después").
 * Una píldora azul se desliza hasta la opción elegida.
 */
export function Segmentado<T extends string>({
  opciones,
  valor,
  alCambiar,
  etiqueta,
  className,
}: {
  opciones: readonly { valor: T; texto: React.ReactNode }[];
  valor: T;
  alCambiar: (v: T) => void;
  etiqueta: string;
  className?: string;
}) {
  const caja = useRef<HTMLDivElement>(null);
  const [pildora, setPildora] = useState<{ x: number; w: number } | null>(null);

  useLayoutEffect(() => {
    const medir = () => {
      const el = caja.current?.querySelector<HTMLElement>(`[data-valor="${valor}"]`);
      if (el) setPildora({ x: el.offsetLeft, w: el.offsetWidth });
    };
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, [valor]);

  return (
    <div ref={caja} role="tablist" aria-label={etiqueta} className={cn("vidrio relative flex rounded-full p-1.5", className)}>
      {pildora && (
        <span
          aria-hidden
          className="absolute top-1.5 bottom-1.5 left-0 rounded-full bg-primary-600 shadow-brillo transition-[transform,width] duration-500 ease-resorte"
          style={{ width: pildora.w, transform: `translateX(${pildora.x}px)` }}
        />
      )}
      {opciones.map((o) => {
        const activa = o.valor === valor;
        return (
          <button
            key={o.valor}
            type="button"
            role="tab"
            aria-selected={activa}
            data-valor={o.valor}
            onClick={() => alCambiar(o.valor)}
            className={cn(
              "relative z-10 flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full px-3 font-titulo text-meta font-bold whitespace-nowrap transition-colors duration-300 lg:px-5 lg:text-cuerpo",
              activa ? "text-white" : "text-secondary-700 hover:text-secondary-950",
            )}
          >
            {o.texto}
          </button>
        );
      })}
    </div>
  );
}

/** Interruptor (toggle) grande, con el círculo que se desliza con resorte. */
export function Interruptor({
  activo,
  alCambiar,
  etiqueta,
  detalle,
}: {
  activo: boolean;
  alCambiar: (v: boolean) => void;
  etiqueta: string;
  detalle?: string;
}) {
  return (
    <label className="flex min-h-14 cursor-pointer items-center gap-4 rounded-2xl bg-white px-4 py-3 shadow-xs">
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-secondary-950">{etiqueta}</span>
        {detalle && <span className="block text-meta text-muted-foreground">{detalle}</span>}
      </span>
      <input type="checkbox" role="switch" checked={activo} onChange={(e) => alCambiar(e.target.checked)} className="peer sr-only" />
      <span
        aria-hidden
        className={cn(
          "relative h-8 w-14 shrink-0 rounded-full transition-colors duration-300 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
          activo ? "bg-primary-600 shadow-brillo" : "bg-secondary-200",
        )}
      >
        <span
          className={cn(
            "absolute top-1 left-1 size-6 rounded-full bg-white shadow-md transition-transform duration-500 ease-rebote",
            activo && "translate-x-6",
          )}
        />
      </span>
    </label>
  );
}
