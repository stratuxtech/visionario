"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon, Cancel01Icon, FavouriteIcon } from "@hugeicons/core-free-icons";
import { catalogo, type Montura } from "@/content/visionario";
import { cn } from "@/lib/utils";

/**
 * La montura en pantalla completa: un carrusel con la foto completa del lente y
 * otra con alguien usándolo. Se desliza con el dedo, con las flechas del teclado
 * o con los botones; la X (o Esc) vuelve al catálogo.
 */
export function VisorMontura({
  montura,
  marcada,
  alMarcar,
  alCerrar,
}: {
  montura: Montura | null;
  marcada: boolean;
  alMarcar: (id: string) => void;
  alCerrar: () => void;
}) {
  return (
    <Dialog.Root open={montura !== null} onOpenChange={(abierto) => !abierto && alCerrar()}>
      <Dialog.Portal>
        {montura && <Contenido key={montura.id} montura={montura} marcada={marcada} alMarcar={alMarcar} />}
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Contenido({ montura, marcada, alMarcar }: { montura: Montura; marcada: boolean; alMarcar: (id: string) => void }) {
  const pista = useRef<HTMLDivElement>(null);
  const [indice, setIndice] = useState(0);

  type Foto = { src: string; etiqueta: string; alt: string };
  const fotos: Foto[] = [];
  if (montura.imagen) fotos.push({ src: montura.imagen, etiqueta: catalogo.visor.lente, alt: `Montura ${montura.nombre}, foto completa` });
  if (montura.imagenPuesta) fotos.push({ src: montura.imagenPuesta, etiqueta: catalogo.visor.puesto, alt: `Persona usando la montura ${montura.nombre}` });

  // Sincroniza el indicador con el deslizamiento
  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    const alMover = () => setIndice(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", alMover, { passive: true });
    return () => el.removeEventListener("scroll", alMover);
  }, []);

  const ir = (n: number) => {
    const el = pista.current;
    if (!el) return;
    const destino = Math.min(Math.max(n, 0), fotos.length - 1);
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: destino * el.clientWidth, behavior: reducir ? "auto" : "smooth" });
    setIndice(destino);
  };

  const alTeclear = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") ir(indice + 1);
    if (e.key === "ArrowLeft") ir(indice - 1);
  };

  return (
    <Dialog.Content
      aria-describedby={undefined}
      onKeyDown={alTeclear}
      className="fixed inset-0 z-50 flex flex-col bg-secondary-950 text-white outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
    >
      <header className="flex shrink-0 items-center gap-2 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 lg:px-8 lg:pt-5">
        <Dialog.Close
          aria-label={catalogo.visor.cerrar}
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-[background-color,transform] duration-300 hover:scale-105 hover:bg-white/20 active:scale-95"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={24} strokeWidth={2} aria-hidden />
        </Dialog.Close>
        <div className="min-w-0 flex-1 px-1">
          <Dialog.Title className="truncate font-titulo text-seccion leading-tight font-bold text-white">{montura.nombre}</Dialog.Title>
          <p className="text-meta font-semibold text-secondary-300">
            {montura.codigo} · {catalogo.publicos[montura.publico]}
          </p>
        </div>
        <button
          type="button"
          onClick={() => alMarcar(montura.id)}
          aria-pressed={marcada}
          aria-label={`${catalogo.meInteresa}: ${montura.nombre}`}
          className={cn(
            "flex h-12 shrink-0 items-center justify-center gap-2 rounded-full px-4 font-titulo text-meta font-bold transition-[background-color,transform] duration-300 ease-rebote hover:scale-105 active:scale-95",
            marcada ? "bg-alerta-500 text-white shadow-md" : "bg-white/10 text-white hover:bg-white/20",
          )}
        >
          <HugeiconsIcon icon={FavouriteIcon} size={20} strokeWidth={2.25} aria-hidden className={cn(marcada && "[&_path]:fill-current")} />
          <span className="hidden sm:inline">{marcada ? catalogo.marcada : catalogo.meInteresa}</span>
        </button>
      </header>

      <div className="relative min-h-0 flex-1">
        <div
          ref={pista}
          className="sin-barra flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
          aria-roledescription="carrusel"
          aria-label={`Fotos de ${montura.nombre}`}
        >
          {fotos.map((f, i) => (
            <figure
              key={f.etiqueta}
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${fotos.length}: ${f.etiqueta}`}
              className="relative m-0 h-full w-full shrink-0 snap-center px-3 pb-2 lg:px-24"
            >
              <div className="relative size-full overflow-hidden rounded-[1.75rem] bg-secondary-900">
                {/* Fondo desenfocado: la foto completa nunca queda con bordes vacíos */}
                <Image src={f.src} alt="" fill sizes="50vw" aria-hidden className="scale-125 object-cover opacity-45 blur-2xl" />
                <Image src={f.src} alt={f.alt} fill sizes="100vw" priority={i === 0} className="object-contain" />
              </div>
            </figure>
          ))}
        </div>

        {/* Flechas: en computadora; en celular se desliza con el dedo */}
        {fotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => ir(indice - 1)}
              disabled={indice === 0}
              aria-label={catalogo.visor.anterior}
              className="absolute top-1/2 left-4 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-secondary-950 shadow-lg transition-[opacity,transform] duration-300 hover:scale-105 disabled:pointer-events-none disabled:opacity-0 lg:flex"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={26} strokeWidth={2.25} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => ir(indice + 1)}
              disabled={indice === fotos.length - 1}
              aria-label={catalogo.visor.siguiente}
              className="absolute top-1/2 right-4 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-secondary-950 shadow-lg transition-[opacity,transform] duration-300 hover:scale-105 disabled:pointer-events-none disabled:opacity-0 lg:flex"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={26} strokeWidth={2.25} aria-hidden />
            </button>
          </>
        )}
      </div>

      {/* Selector: qué foto se ve */}
      <div role="tablist" aria-label="Fotos" className="flex shrink-0 justify-center gap-2 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
        {fotos.map((f, i) => (
          <button
            key={f.etiqueta}
            type="button"
            role="tab"
            aria-selected={i === indice}
            onClick={() => ir(i)}
            className={cn(
              "flex min-h-11 items-center rounded-full px-5 font-titulo text-meta font-bold transition-[background-color,color,box-shadow] duration-300",
              i === indice ? "bg-white text-secondary-950 shadow-md" : "bg-white/10 text-white hover:bg-white/20",
            )}
          >
            {f.etiqueta}
          </button>
        ))}
      </div>
    </Dialog.Content>
  );
}
