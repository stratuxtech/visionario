"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Revela su contenido (desde un leve desenfoque, hacia arriba) cuando entra
 * en pantalla. Solo para contenido narrativo de la homepage: nunca precios,
 * formularios ni contratos.
 */
export function Revelar({
  children,
  retraso = 0,
  className,
  como: Etiqueta = "div",
}: {
  children: React.ReactNode;
  retraso?: number;
  className?: string;
  como?: "div" | "li" | "section" | "figure";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mostrar = () => (el.dataset.visible = "true");
    if (!("IntersectionObserver" in window)) return void mostrar();
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          mostrar();
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Etiqueta
      ref={ref as React.Ref<never>}
      data-visible="false"
      className={cn("revelar", className)}
      style={{ "--retraso": `${retraso}ms` } as React.CSSProperties}
    >
      {children}
    </Etiqueta>
  );
}
