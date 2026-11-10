"use client";

import { useMemo } from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

/**
 * Festejo: el sello del logro aparece con rebote y una lluvia corta de emojis
 * sale disparada desde el centro. Dura 1,6 s y no se repite. Sin movimiento,
 * solo queda el sello.
 */
export function Festejo({
  emojis = ["🎉", "👓", "✨", "💙", "🥳"],
  icono = Tick02Icon,
  tono = "exito",
  className,
}: {
  emojis?: string[];
  icono?: IconSvgElement;
  tono?: "exito" | "azul" | "oro";
  className?: string;
}) {
  // Trayectorias fijas por render (sin azar en cada pintado)
  const particulas = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const angulo = (i / 22) * Math.PI * 2 + (i % 2 ? 0.2 : -0.1);
        const distancia = 110 + ((i * 37) % 70);
        return {
          emoji: emojis[i % emojis.length],
          x: Math.cos(angulo) * distancia,
          y: Math.sin(angulo) * distancia - 30,
          r: ((i * 53) % 120) - 60,
          retraso: (i % 5) * 40,
          tam: 18 + ((i * 7) % 14),
        };
      }),
    [emojis],
  );

  const fondo = { exito: "bg-exito-500 shadow-brillo-exito", azul: "bg-primary-600 shadow-brillo", oro: "bg-oro-400 shadow-md" }[tono];
  const halo = { exito: "bg-exito-400/40", azul: "bg-primary-300/50", oro: "bg-oro-300/60" }[tono];

  return (
    <div className={cn("relative mx-auto flex size-32 items-center justify-center", className)} aria-hidden>
      <span className={cn("absolute inset-2 animate-latido rounded-full motion-reduce:hidden", halo)} />
      <span className={cn("absolute inset-0 rounded-full opacity-25 blur-xl", halo)} />
      <span className={cn("relative flex size-24 animate-confirmar items-center justify-center rounded-full text-white", fondo)}>
        <HugeiconsIcon icon={icono} size={48} strokeWidth={2.5} />
      </span>
      {particulas.map((p, i) => (
        <span
          key={i}
          className="pointer-events-none absolute top-1/2 left-1/2 animate-estallido select-none motion-reduce:hidden"
          style={
            {
              "--x": `${p.x}px`,
              "--y": `${p.y}px`,
              "--r": `${p.r}deg`,
              animationDelay: `${200 + p.retraso}ms`,
              fontSize: p.tam,
            } as React.CSSProperties
          }
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

/**
 * "¿Y ahora qué pasa?": los próximos pasos en una línea corta cada uno.
 * El primero puede venir marcado como hecho.
 */
export function QueSigue({
  titulo = "¿Y ahora qué pasa?",
  pasos,
  className,
}: {
  titulo?: string;
  pasos: { texto: React.ReactNode; emoji: string; hecho?: boolean }[];
  className?: string;
}) {
  return (
    <section aria-label={titulo} className={cn("rounded-3xl bg-white p-5 text-left shadow-md", className)}>
      <h2 className="font-titulo text-bloque">{titulo}</h2>
      <ol className="mt-4 space-y-3">
        {pasos.map((p, i) => (
          <li
            key={i}
            className="flex animate-entrar items-center gap-3"
            style={{ animationDelay: `${500 + i * 140}ms` }}
          >
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-full text-lg",
                p.hecho ? "bg-exito-100" : "bg-primary-50",
              )}
              aria-hidden
            >
              {p.emoji}
            </span>
            <span className="text-secondary-800">{p.texto}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
