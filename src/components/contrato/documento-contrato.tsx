"use client";

import Image from "next/image";
import { Dialog } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { contrato as t, empresa, type DatosContrato } from "@/content/optihelp";
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

/** Marca visible de lo que falta revisar con un abogado o completar. */
function Pendiente() {
  return (
    <span className="ml-1 inline-flex rounded-full bg-oro-100 px-2 py-0.5 align-middle text-mini text-oro-800 ring-1 ring-oro-200">
      {t.documento.pendienteLegal}
    </span>
  );
}

type Clausula = (typeof t.condiciones)[number];

function Clausulas({ lista, desde, datos }: { lista: Clausula[]; desde: number; datos: DatosContrato }) {
  return (
    <ol className="space-y-5" start={desde}>
      {lista.map((c, i) => {
        const parrafos = c.parrafos(datos);
        return (
          <li key={c.id}>
            <h3 className="text-cuerpo font-bold">
              {desde + i}. {c.titulo}
            </h3>
            {parrafos.length === 1 ? (
              <p className="mt-1 text-secondary-800">
                {parrafos[0].texto}
                {parrafos[0].pendiente && <Pendiente />}
              </p>
            ) : (
              <ul className="cifras mt-1 list-disc space-y-1 pl-5 text-secondary-800">
                {parrafos.map((p) => (
                  <li key={p.texto}>
                    {p.texto}
                    {p.pendiente && <Pendiente />}
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Un bloque de firma: el trazo (o su lugar), la línea, el nombre, el C.I. y la parte. */
function BloqueFirma({ firma, nombre, ci, parte, vacio }: { firma?: string | null; nombre: string; ci: string; parte: string; vacio: string }) {
  return (
    <div className="flex flex-col">
      <div className="flex h-24 items-end justify-center">
        {firma ? (
          <Image src={firma} alt={`Firma de ${nombre}`} width={300} height={100} unoptimized className="h-full w-auto" />
        ) : (
          <span className="pb-2 text-center text-mini text-secondary-500">{vacio}</span>
        )}
      </div>
      <div className="border-t border-secondary-400 pt-2 text-meta">
        <p className="font-bold text-secondary-950">{nombre}</p>
        <p className="cifras text-secondary-700">{t.documento.firmas.ci(ci)}</p>
        <p className="mt-1 text-mini font-bold tracking-wide text-secondary-600">{parte}</p>
      </div>
    </div>
  );
}

/**
 * El contrato como documento: pantalla completa, se lee desplazándose y se cierra
 * con la X. Sigue el modelo de The Blink Eye: partes con sus datos, cláusulas,
 * fechas exactas de pago, lugar y fecha, y las firmas de las dos partes.
 * (Texto provisional: se reemplaza por el PDF legal definitivo.)
 */
export function DocumentoContrato({
  abierto,
  alCambiar,
  cliente,
  datos,
  fechaFirma,
  firma = null,
  esMenor,
}: {
  abierto: boolean;
  alCambiar: (abierto: boolean) => void;
  cliente: { nombre: string; ci: string; domicilio: string; whatsapp: string };
  datos: DatosContrato;
  /** Fecha del contrato ya formateada (hoy si aún no se firmó) */
  fechaFirma: string;
  /** Trazo de la firma, si ya se firmó */
  firma?: string | null;
  esMenor: boolean;
}) {
  const visibles = t.condiciones.filter((c) => !c.soloConOng || datos.ong);
  const enPrimera = 4;
  const hojas = 3;
  const f = t.documento.firmas;

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
            <span className="cifras pr-3 text-meta text-secondary-300">{t.documento.paginas(hojas)}</span>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-3 py-4 pb-seguro lg:py-8">
            <Hoja n={1} total={hojas}>
              <Logo variante="completo" className="w-36 md:w-40" />
              <h2 className="mt-6 font-titulo text-seccion leading-tight text-secondary-950">{t.documento.encabezado}</h2>
              <div className="mt-4 space-y-2 text-secondary-800">
                <p>
                  {t.documento.partes.optihelp(empresa)}
                  {empresa.pendiente && <Pendiente />}
                </p>
                <p className="cifras">{t.documento.partes.cliente(cliente)}</p>
                <p>{t.documento.partes.optica}</p>
              </div>
              <div className="mt-6">
                <Clausulas lista={visibles.slice(0, enPrimera)} desde={1} datos={datos} />
              </div>
            </Hoja>

            <Hoja n={2} total={hojas}>
              <Clausulas lista={visibles.slice(enPrimera)} desde={enPrimera + 1} datos={datos} />
            </Hoja>

            <Hoja n={3} total={hojas}>
              {esMenor && <p className="rounded-lg bg-primary-50 p-3 text-meta font-semibold text-primary-950">{t.menor}</p>}
              <p className="mt-5 font-semibold">{t.documento.lugarFecha(fechaFirma)}</p>
              <div className="mt-8 grid gap-10 sm:grid-cols-2 sm:gap-8">
                <BloqueFirma firma={firma} nombre={cliente.nombre} ci={cliente.ci || "[C.I.]"} parte={f.cliente} vacio={f.sinFirma} />
                <BloqueFirma nombre={empresa.representante.nombre} ci={empresa.representante.ci} parte={f.optihelp} vacio={f.firmaOptihelp} />
              </div>
              <p className="mt-8 rounded-md bg-secondary-100 p-3 text-meta text-secondary-700">{t.documento.provisional}</p>
            </Hoja>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
