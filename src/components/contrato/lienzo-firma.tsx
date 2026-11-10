"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PencilEdit02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface LienzoFirmaRef {
  borrar: () => void;
}

/**
 * Lienzo táctil para firmar con el dedo (o el mouse). La línea se dibuja en
 * tiempo real, suavizada con curvas. Entrega la firma como imagen PNG.
 */
export const LienzoFirma = forwardRef<
  LienzoFirmaRef,
  { alCambiar: (firma: string | null) => void; textoVacio: string; etiqueta: string; invalido?: boolean; className?: string }
>(function LienzoFirma({ alCambiar, textoVacio, etiqueta, invalido, className }, ref) {
  const lienzo = useRef<HTMLCanvasElement>(null);
  const puntos = useRef<{ x: number; y: number }[]>([]);
  const dibujando = useRef(false);
  // Mientras el dedo dibuja, la página entera queda quieta (segundo candado)
  const liberar = useRef<(() => void) | null>(null);
  const [vacio, setVacio] = useState(true);
  // El callback se guarda en una ref: un padre que lo recrea no borra la firma
  const avisar = useRef(alCambiar);
  useEffect(() => {
    avisar.current = alCambiar;
  }, [alCambiar]);

  // El navegador no debe tomar el gesto como desplazamiento mientras se firma
  useEffect(() => {
    const c = lienzo.current;
    if (!c) return;
    const bloquear = (e: TouchEvent) => e.preventDefault();
    c.addEventListener("touchstart", bloquear, { passive: false });
    c.addEventListener("touchmove", bloquear, { passive: false });
    return () => {
      c.removeEventListener("touchstart", bloquear);
      c.removeEventListener("touchmove", bloquear);
      liberar.current?.();
    };
  }, []);

  const congelarPagina = () => {
    if (liberar.current) return;
    const html = document.documentElement;
    const antes = { overflow: html.style.overflow, overscroll: html.style.overscrollBehavior };
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    const quieto = (ev: TouchEvent) => ev.preventDefault();
    document.addEventListener("touchmove", quieto, { passive: false });
    liberar.current = () => {
      html.style.overflow = antes.overflow;
      html.style.overscrollBehavior = antes.overscroll;
      document.removeEventListener("touchmove", quieto);
      liberar.current = null;
    };
  };

  // Ajusta la resolución a la pantalla (nítido en celulares de alta densidad)
  useEffect(() => {
    const c = lienzo.current;
    if (!c) return;
    const ajustar = () => {
      const r = c.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      c.width = Math.round(r.width * dpr);
      c.height = Math.round(r.height * dpr);
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 3;
      ctx.strokeStyle = getComputedStyle(c).getPropertyValue("--color-secondary-950").trim() || "#13212c";
      ctx.fillStyle = ctx.strokeStyle;
      setVacio(true);
      avisar.current(null);
    };
    ajustar();
    let ancho = c.getBoundingClientRect().width;
    const obs = new ResizeObserver(() => {
      const nuevo = c.getBoundingClientRect().width;
      if (Math.abs(nuevo - ancho) > 1) {
        ancho = nuevo;
        ajustar();
      }
    });
    obs.observe(c);
    return () => obs.disconnect();
  }, []);

  useImperativeHandle(ref, () => ({
    borrar: () => {
      const c = lienzo.current;
      const ctx = c?.getContext("2d");
      if (!c || !ctx) return;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.restore();
      setVacio(true);
      avisar.current(null);
    },
  }));

  const punto = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const empezar = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType !== "mouse") congelarPagina();
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dibujando.current = true;
    const p = punto(e);
    puntos.current = [p];
    const ctx = e.currentTarget.getContext("2d");
    ctx?.beginPath();
    ctx?.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
    ctx?.fill();
    if (vacio) setVacio(false);
  };

  const mover = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dibujando.current) return;
    const ctx = e.currentTarget.getContext("2d");
    if (!ctx) return;
    const p = punto(e);
    const pts = puntos.current;
    pts.push(p);
    if (pts.length < 3) return;
    const [a, b] = [pts[pts.length - 3], pts[pts.length - 2]];
    const medio1 = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const medio2 = { x: (b.x + p.x) / 2, y: (b.y + p.y) / 2 };
    ctx.beginPath();
    ctx.moveTo(medio1.x, medio1.y);
    ctx.quadraticCurveTo(b.x, b.y, medio2.x, medio2.y);
    ctx.stroke();
  };

  const terminar = () => {
    liberar.current?.();
    if (!dibujando.current) return;
    dibujando.current = false;
    puntos.current = [];
    avisar.current(lienzo.current?.toDataURL("image/png") ?? null);
  };

  return (
    <div
      className={cn(
        "relative h-52 touch-none overflow-hidden overscroll-none rounded-[1.75rem] border-2 border-dashed bg-white shadow-sm transition-[border-color,box-shadow] duration-300",
        invalido ? "border-alerta-600" : vacio ? "border-primary-200" : "border-primary-500 shadow-[0_0_0_4px_rgb(21_125_202/0.12)]",
        className,
      )}
    >
      {vacio && (
        <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 text-secondary-500" aria-hidden>
          {/* Un trazo de ejemplo que se dibuja solo: "firme aquí" */}
          <svg viewBox="0 0 160 50" className="w-40 text-primary-300" fill="none">
            <path
              d="M6 34c10-18 18-24 22-16s-6 20 2 18 14-26 22-22-4 22 6 20 12-18 20-16 2 14 10 12 14-10 22-8"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="220"
              style={{ "--largo": 220, animation: "var(--animate-dibujar)", animationDuration: "2.4s", animationIterationCount: "infinite" } as React.CSSProperties}
            />
          </svg>
          <span className="flex items-center gap-2 font-semibold">
            <HugeiconsIcon icon={PencilEdit02Icon} size={18} strokeWidth={2} />
            {textoVacio}
          </span>
        </span>
      )}
      <span className="pointer-events-none absolute inset-x-6 bottom-12 border-b-2 border-secondary-200" aria-hidden />
      <canvas
        ref={lienzo}
        role="img"
        aria-label={etiqueta}
        className="absolute inset-0 size-full cursor-crosshair touch-none"
        onPointerDown={empezar}
        onPointerMove={mover}
        onPointerUp={terminar}
        onPointerCancel={terminar}
      />
    </div>
  );
});
