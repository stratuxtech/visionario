"use client";

import { useEffect, useRef, useState } from "react";
import { cn, decimal } from "@/lib/utils";

function luminancia(rgb: number[]) {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contraste(a: number[], b: number[]) {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

function aRgb(css: string) {
  const m = css.match(/\d+(\.\d+)?/g);
  return m ? m.slice(0, 3).map(Number) : [0, 0, 0];
}

function aHex(rgb: number[]) {
  return `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

const BLANCO = [255, 255, 255];
const MARINO = [19, 33, 44];

/**
 * Fila de una escala de color. Lee el valor real del token (única fuente:
 * globals.css) y muestra su contraste con blanco y con marino 950.
 */
export function MuestraColor({ clase, paso, uso }: { clase: string; paso: string; uso?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [info, setInfo] = useState<{ hex: string; blanco: number; marino: number } | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const rgb = aRgb(getComputedStyle(ref.current).backgroundColor);
    setInfo({ hex: aHex(rgb), blanco: contraste(rgb, BLANCO), marino: contraste(rgb, MARINO) });
  }, []);

  return (
    <li className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 py-2">
      <span ref={ref} className={cn("size-12 rounded-md border border-secondary-950/10", clase)} aria-hidden />
      <span className="min-w-0">
        <span className="block font-bold text-secondary-950">
          {paso}
          {info && <span className="cifras ml-2 font-medium text-muted-foreground">{info.hex}</span>}
        </span>
        {uso && <span className="block truncate text-meta text-muted-foreground">{uso}</span>}
      </span>
      {info && (
        <span className="cifras text-right text-meta text-secondary-700">
          <span className={cn("block", info.blanco >= 4.5 && "font-bold text-secondary-950")}>
            {decimal(info.blanco)} <span className="sr-only">de contraste con</span>blanco
          </span>
          <span className={cn("block", info.marino >= 4.5 && "font-bold text-secondary-950")}>
            {decimal(info.marino)} <span className="sr-only">de contraste con</span>marino
          </span>
        </span>
      )}
    </li>
  );
}
