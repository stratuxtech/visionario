"use client";

import { useState } from "react";
import { Dialog } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, RefreshIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { contrato } from "@/content/optihelp";
import type { LadoCarnet } from "@/lib/estado";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CarnetDemo } from "@/components/contrato/carnet-demo";

const c = contrato.camara;

/** Las cuatro esquinas del recuadro donde va el carnet */
function Esquinas() {
  const base = "absolute size-9 border-white";
  return (
    <span aria-hidden>
      <span className={cn(base, "-top-1 -left-1 rounded-tl-2xl border-t-4 border-l-4")} />
      <span className={cn(base, "-top-1 -right-1 rounded-tr-2xl border-t-4 border-r-4")} />
      <span className={cn(base, "-bottom-1 -left-1 rounded-bl-2xl border-b-4 border-l-4")} />
      <span className={cn(base, "-right-1 -bottom-1 rounded-br-2xl border-r-4 border-b-4")} />
    </span>
  );
}

/**
 * Cámara simulada a pantalla completa (demo): un visor con el recuadro del
 * carnet y el botón de disparo. Al disparar hay un destello y se muestra la
 * foto para revisarla. No pide permiso a la cámara ni guarda imágenes reales.
 */
export function CamaraCarnet({
  abierta,
  lado,
  alCerrar,
  alCapturar,
}: {
  abierta: boolean;
  /** Qué lado del carnet se fotografía */
  lado: LadoCarnet;
  alCerrar: () => void;
  alCapturar: (lado: LadoCarnet) => void;
}) {
  const [fase, setFase] = useState<"visor" | "revisar">("visor");
  const [destello, setDestello] = useState(false);

  /* Al cerrar o al usar la foto, la próxima vez empieza en el visor */
  const cerrar = () => {
    setFase("visor");
    alCerrar();
  };
  const usar = () => {
    setFase("visor");
    alCapturar(lado);
  };

  const disparar = () => {
    setDestello(true);
    window.setTimeout(() => {
      setFase("revisar");
      setDestello(false);
    }, 180);
  };

  const l = lado;
  const titulo = contrato.datos.fotos.lados[l].camara;

  return (
    <Dialog.Root open={abierta} onOpenChange={(abierto) => !abierto && cerrar()}>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby="camara-instruccion"
          className="fixed inset-0 z-50 flex flex-col bg-secondary-950 text-white outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
        >
          <header className="flex h-14 shrink-0 items-center gap-2 px-2 lg:h-16 lg:px-6">
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label={c.cerrar} className="text-white hover:bg-white/10 hover:text-white active:bg-white/15">
                <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} aria-hidden />
              </Button>
            </Dialog.Close>
            <Dialog.Title className="min-w-0 flex-1 truncate font-titulo text-entrada font-medium text-white">{titulo}</Dialog.Title>
          </header>

          {/* Visor: una mesa en penumbra y el recuadro del carnet */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#4a3f35_0%,#2a2420_55%,#141110_100%)] px-6">
            <span className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-mini font-semibold whitespace-nowrap text-secondary-200 ring-1 ring-white/10">
              {c.demo}
            </span>
            <div className="relative w-full max-w-md">
              {fase === "visor" ? (
                <>
                  <div className="rotate-[-3deg] opacity-85 blur-[0.6px] saturate-[0.85] transition-transform duration-700">
                    <CarnetDemo lado={l} className="drop-shadow-2xl" />
                  </div>
                  <Esquinas />
                </>
              ) : (
                <div className="animate-entrar overflow-hidden rounded-2xl ring-4 ring-white/90">
                  <CarnetDemo lado={l} />
                </div>
              )}
            </div>
            {/* Destello al disparar */}
            <span
              aria-hidden
              className={cn("pointer-events-none absolute inset-0 bg-white transition-opacity duration-150 motion-reduce:hidden", destello ? "opacity-90" : "opacity-0")}
            />
          </div>

          <footer className="shrink-0 px-5 pt-5 pb-seguro text-center lg:pb-8">
            {fase === "visor" ? (
              <>
                <p id="camara-instruccion" className="mx-auto max-w-sm text-secondary-200">
                  {c.instruccion}
                </p>
                <button
                  type="button"
                  onClick={disparar}
                  aria-label={c.disparar}
                  className="mx-auto mt-5 mb-4 flex size-20 items-center justify-center rounded-full border-4 border-white transition-transform duration-200 active:scale-95 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span className="size-15 rounded-full bg-white" />
                </button>
              </>
            ) : (
              <>
                <p className="font-titulo text-bloque font-bold text-white">{c.revisar}</p>
                <p id="camara-instruccion" className="mx-auto mt-1 max-w-sm text-meta text-secondary-200">
                  {c.revisarTexto}
                </p>
                <div className="mx-auto mt-5 mb-4 grid max-w-md gap-3 sm:grid-cols-2">
                  <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 hover:text-white active:bg-white/15" onClick={() => setFase("visor")}>
                    <HugeiconsIcon icon={RefreshIcon} strokeWidth={2} aria-hidden />
                    {c.otra}
                  </Button>
                  <Button size="lg" onClick={usar}>
                    <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} aria-hidden />
                    {c.usar}
                  </Button>
                </div>
              </>
            )}
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
