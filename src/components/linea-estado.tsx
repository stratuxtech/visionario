"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { estado as t } from "@/content/visionario";
import { cn } from "@/lib/utils";

export interface Parada {
  id: string;
  /** Un solo título largo y simple */
  titulo: string;
  estado: "hecha" | "actual" | "pendiente";
  emoji: string;
  /** Lo que se puede hacer en esta parada (botón) */
  accion?: React.ReactNode;
}

/**
 * El recorrido del paciente como tarjetas horizontales que se deslizan con
 * el dedo (nativo), se arrastran con el mouse o se mueven con las flechas.
 * Al abrir, se acerca a la parada donde está la persona.
 */
export function LineaEstado({ paradas, titulo }: { paradas: Parada[]; titulo: string }) {
  const pista = useRef<HTMLOListElement>(null);
  const arrastre = useRef<{ x: number; inicio: number; movio: boolean } | null>(null);
  const [bordes, setBordes] = useState({ inicio: true, fin: false });

  const medir = useCallback(() => {
    const el = pista.current;
    if (!el) return;
    setBordes({ inicio: el.scrollLeft < 8, fin: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    const el = pista.current;
    const actual = el?.querySelector<HTMLElement>("[aria-current='step']");
    if (!el) return;
    if (actual) {
      const margen = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
      const cabenVarias = el.clientWidth >= actual.offsetWidth * 3;
      el.scrollLeft = Math.max(0, actual.offsetLeft - margen - (cabenVarias ? actual.offsetWidth : 0));
    }
    medir();
    el.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      el.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, [medir]);

  const mover = (dir: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const paso = (el.querySelector("li")?.clientWidth ?? 260) + 12;
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * paso, behavior: reducir ? "auto" : "smooth" });
  };

  /* Arrastrar con el mouse (en el dedo el navegador ya desliza solo) */
  const alPresionar = (e: React.PointerEvent<HTMLOListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    arrastre.current = { x: e.clientX, inicio: e.currentTarget.scrollLeft, movio: false };
  };
  const alMover = (e: React.PointerEvent<HTMLOListElement>) => {
    const a = arrastre.current;
    if (!a) return;
    const dx = e.clientX - a.x;
    if (!a.movio && Math.abs(dx) > 6) {
      a.movio = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.style.scrollSnapType = "none";
    }
    if (a.movio) e.currentTarget.scrollLeft = a.inicio - dx;
  };
  const alSoltar = (e: React.PointerEvent<HTMLOListElement>) => {
    const a = arrastre.current;
    arrastre.current = null;
    if (!a?.movio) return;
    const el = e.currentTarget;
    el.style.scrollSnapType = "";
    // Evita que el arrastre active el botón que quedó debajo
    const bloquear = (ev: Event) => {
      ev.stopPropagation();
      ev.preventDefault();
    };
    el.addEventListener("click", bloquear, { capture: true, once: true });
    setTimeout(() => el.removeEventListener("click", bloquear, { capture: true }), 50);
  };

  return (
    <section aria-labelledby="recorrido">
      <div className="flex items-center justify-between gap-3">
        <h2 id="recorrido" className="font-titulo text-bloque lg:text-[1.5rem]">
          {titulo}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => mover(-1)}
            disabled={bordes.inicio}
            aria-label="Ver paradas anteriores"
            className="flex size-10 items-center justify-center rounded-full bg-white text-secondary-900 shadow-sm transition-[transform,opacity] duration-300 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-35 disabled:hover:translate-y-0 lg:size-12"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} strokeWidth={2.25} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => mover(1)}
            disabled={bordes.fin}
            aria-label="Ver paradas siguientes"
            className="flex size-10 items-center justify-center rounded-full bg-white text-secondary-900 shadow-sm transition-[transform,opacity] duration-300 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-35 disabled:hover:translate-y-0 lg:size-12"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={2.25} aria-hidden />
          </button>
        </div>
      </div>

      <ol
        ref={pista}
        aria-label={titulo}
        onPointerDown={alPresionar}
        onPointerMove={alMover}
        onPointerUp={alSoltar}
        onPointerCancel={alSoltar}
        className="sin-barra relative -mx-5 mt-4 flex cursor-grab snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto overscroll-x-contain px-5 pt-2 pb-12 select-none active:cursor-grabbing lg:-mx-2 lg:scroll-pl-2 lg:px-2"
        style={{ touchAction: "pan-x pan-y" }}
      >
        {paradas.map((p, i) => {
          const actual = p.estado === "actual";
          const hecha = p.estado === "hecha";
          return (
            <li
              key={p.id}
              aria-current={actual ? "step" : undefined}
              className={cn(
                "relative flex w-60 shrink-0 snap-start flex-col rounded-[1.75rem] p-4 transition-[transform,box-shadow] duration-300 lg:w-[calc((100%-2.25rem)/4)]",
                actual ? "bg-primary-600 text-white shadow-brillo" : "bg-white text-secondary-900 shadow-sm",
                p.estado === "pendiente" && "bg-white/70",
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full text-xl",
                    actual ? "bg-white/20" : hecha ? "bg-exito-100" : "bg-secondary-100 grayscale-[0.6]",
                  )}
                  aria-hidden
                >
                  {p.emoji}
                </span>
                {hecha ? (
                  <span className="flex size-7 items-center justify-center rounded-full bg-exito-500 text-white">
                    <HugeiconsIcon icon={Tick02Icon} size={15} strokeWidth={3} aria-hidden />
                    <span className="sr-only">(completado)</span>
                  </span>
                ) : actual ? (
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-mini text-primary-700">{t.ahora}</span>
                ) : (
                  <span className={cn("cifras text-mini", "text-secondary-500")}>{i + 1}</span>
                )}
              </div>
              <p className={cn("mt-4 leading-snug font-semibold", actual ? "text-entrada font-bold text-white" : hecha ? "text-secondary-700" : "text-secondary-800")}>
                {p.titulo}
              </p>
              {p.accion && <div className="mt-auto pt-4">{p.accion}</div>}
            </li>
          );
        })}
      </ol>

      {/* Avance: un punto por parada */}
      <div className="-mt-6 flex justify-center gap-1.5" aria-hidden>
        {paradas.map((p) => (
          <span
            key={p.id}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              p.estado === "actual" ? "w-6 bg-primary-600" : p.estado === "hecha" ? "w-1.5 bg-exito-500" : "w-1.5 bg-secondary-300",
            )}
          />
        ))}
      </div>
    </section>
  );
}
