"use client";

import { Dialog } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { contrato as t, negocio } from "@/content/visionario";
import { Logo } from "@/components/marca/logo";
import { Button } from "@/components/ui/button";

/** Una hoja del documento, como la vería en un lector de PDF. */
function Hoja({ n, total, children }: { n: number; total: number; children: React.ReactNode }) {
  return (
    <article
      aria-label={t.documento.pagina(n, total)}
      className="mx-auto w-full max-w-2xl rounded-sm bg-white px-6 pt-8 pb-6 text-secondary-950 shadow-md ring-1 ring-secondary-950/5 lg:px-12 lg:pt-12"
    >
      {children}
      <p className="cifras mt-8 border-t border-secondary-200 pt-3 text-center text-meta text-secondary-600">
        {t.documento.pagina(n, total)}
      </p>
    </article>
  );
}

/**
 * El contrato como documento: pantalla completa, se lee desplazándose y se cierra
 * con la X. (Texto provisional: se reemplaza por el PDF legal definitivo.)
 */
export function DocumentoContrato({
  abierto,
  alCambiar,
  nombre,
  total,
  cuota,
  esMenor,
}: {
  abierto: boolean;
  alCambiar: (abierto: boolean) => void;
  nombre: string;
  total: string;
  cuota: string;
  esMenor: boolean;
}) {
  const mitad = Math.ceil(t.condiciones.length / 2);
  const hojas = 2;

  return (
    <Dialog.Root open={abierto} onOpenChange={alCambiar}>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex flex-col bg-secondary-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom"
        >
          <header className="flex h-14 shrink-0 items-center gap-2 bg-secondary-950 px-2 text-white lg:h-16 lg:px-6">
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label={t.documento.cerrar} className="text-white hover:bg-white/10 hover:text-white active:bg-white/15">
                <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} aria-hidden />
              </Button>
            </Dialog.Close>
            <Dialog.Title className="min-w-0 flex-1 truncate font-titulo text-entrada font-medium text-white">
              {t.titulo}
            </Dialog.Title>
            <span className="cifras pr-3 text-meta text-secondary-300">{hojas} págs.</span>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-3 py-4 pb-seguro lg:py-8">
            <Hoja n={1} total={hojas}>
              <Logo className="w-28" />
              <h2 className="mt-6 font-titulo text-seccion leading-tight text-secondary-950">{t.documento.encabezado}</h2>
              <p className="mt-2 font-semibold">{t.documento.partes(nombre)}</p>
              <ol className="mt-6 space-y-5">
                {t.condiciones.slice(0, mitad).map((c, i) => (
                  <li key={c.titulo}>
                    <h3 className="text-cuerpo font-bold">
                      {i + 1}. {c.titulo}
                    </h3>
                    <p className="mt-1 text-secondary-800">{c.texto(total, cuota)}</p>
                  </li>
                ))}
              </ol>
            </Hoja>

            <Hoja n={2} total={hojas}>
              <ol className="space-y-5" start={mitad + 1}>
                {t.condiciones.slice(mitad).map((c, i) => (
                  <li key={c.titulo}>
                    <h3 className="text-cuerpo font-bold">
                      {mitad + i + 1}. {c.titulo}
                    </h3>
                    <p className="mt-1 text-secondary-800">{c.texto(total, cuota)}</p>
                  </li>
                ))}
              </ol>
              {esMenor && <p className="mt-5 rounded-lg bg-primary-50 p-3 text-meta font-semibold text-primary-950">{t.menor}</p>}
              <p className="mt-5 text-meta text-secondary-700">{negocio.cancelaciones}</p>
              <p className="mt-6 rounded-md bg-secondary-100 p-3 text-meta text-secondary-700">{t.documento.provisional}</p>
            </Hoja>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
