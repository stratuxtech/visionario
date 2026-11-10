"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { negocio, recorrido, textos } from "@/content/visionario";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Barra de progreso de cuotas: se llena al confirmar un pago. */
export function DemoProgreso() {
  const total = negocio.cuotas.cantidad;
  const [pagadas, setPagadas] = useState(1);
  const [desde, setDesde] = useState(0);
  const proporcion = pagadas / total;

  const pagar = () => {
    setDesde(proporcion);
    setPagadas((p) => (p >= total ? 1 : p + 1));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-titulo text-bloque font-medium text-secondary-950" aria-live="polite">
          {textos.progresoCuotas(pagadas, total)}
        </p>
        <p className="cifras shrink-0 text-meta text-muted-foreground">
          {pagadas}/{total}
        </p>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={pagadas}
        aria-label="Cuotas pagadas"
        className="flex h-3 gap-1"
      >
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className="relative flex-1 overflow-hidden rounded-full bg-progreso-pista">
            {i < pagadas && (
              <span
                key={`${i}-${pagadas}`}
                className={cn(
                  "absolute inset-0 origin-left rounded-full bg-progreso",
                  i === pagadas - 1 && desde < proporcion && "animate-llenar",
                )}
              />
            )}
          </span>
        ))}
      </div>
      <Button variant="secondary" size="sm" onClick={pagar}>
        {pagadas >= total ? "Reiniciar ejemplo" : "Confirmar un pago"}
      </Button>
    </div>
  );
}

/** Transición entre pasos del flujo lineal (estilo Subway): izquierda → derecha. */
export function DemoPasos() {
  const pasos = recorrido.paradas.slice(0, 4);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<"adelante" | "atras">("adelante");

  const ir = (n: number) => {
    setDir(n > i ? "adelante" : "atras");
    setI(n);
  };

  return (
    <div className="space-y-5">
      <ol className="flex gap-1.5" aria-label="Pasos">
        {pasos.map((p, n) => (
          <li
            key={p.titulo}
            aria-current={n === i ? "step" : undefined}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-300",
              n <= i ? "bg-primary" : "bg-secondary-200",
            )}
          >
            <span className="sr-only">
              Paso {n + 1}: {p.titulo}
            </span>
          </li>
        ))}
      </ol>

      <div className="min-h-32 overflow-hidden">
        <div key={i} className={dir === "adelante" ? "animate-paso-adelante" : "animate-paso-atras"}>
          <p className="cifras mb-1 text-meta text-muted-foreground">
            Paso {i + 1} de {pasos.length}
          </p>
          <h3 className="mb-2 text-bloque">{pasos[i].titulo}</h3>
          <p className="max-w-prose text-secondary-800">{pasos[i].texto}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" size="icon" onClick={() => ir(i - 1)} disabled={i === 0} aria-label="Paso anterior">
          <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} aria-hidden />
        </Button>
        <Button className="flex-1" onClick={() => ir(i + 1)} disabled={i === pasos.length - 1}>
          {textos.acciones.continuar}
          <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} aria-hidden />
        </Button>
      </div>
    </div>
  );
}
