"use client";

/**
 * SIMULADOR DE FLUJOS (solo demo).
 * Vive únicamente aquí y se monta en layout.tsx cuando demo.activo es true.
 * Para quitarlo: NEXT_PUBLIC_DEMO=false. No hay que tocar nada más.
 */

import { useState } from "react";
import Link from "next/link";
import { Dialog } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Invoice01Icon,
  Coins01Icon,
  TestTube01Icon,
  AlertCircleIcon,
  Award01Icon,
  Notification01Icon,
  RefreshIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons";
import { demo, negocio, rutas, simulador, type TipoNotificacion } from "@/content/visionario";
import { cuotasPagadas, proximaCuota, useApp, useHidratado } from "@/lib/estado";
import { fechaCita, rangoHora } from "@/lib/agenda";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Simulador() {
  const hidratado = useHidratado();
  const s = useApp();
  const [abierto, setAbierto] = useState(false);
  const [tipo, setTipo] = useState<TipoNotificacion>(simulador.tiposNotificacion[0].tipo);
  const [confirmando, setConfirmando] = useState(false);

  if (!hidratado) return null;

  const pagadas = cuotasPagadas(s.cuotas);
  const hayPendiente = !!proximaCuota(s.cuotas);

  const acciones: {
    id: keyof typeof simulador.descripciones;
    icono: typeof Invoice01Icon;
    hacer: () => void;
    bloqueo: string | null;
  }[] = [
    {
      id: "ordenErp",
      icono: Invoice01Icon,
      hacer: s.simular.ordenErp,
      bloqueo: !s.sesion.activa ? simulador.requisitos.sesion : s.orden ? simulador.requisitos.orden : null,
    },
    {
      id: "pagoCuota",
      icono: Coins01Icon,
      hacer: s.simular.pagoCuota,
      bloqueo: !s.contrato ? simulador.requisitos.contrato : !hayPendiente ? simulador.requisitos.cuotas : null,
    },
    {
      id: "laboratorio",
      icono: TestTube01Icon,
      hacer: s.simular.laboratorioListo,
      bloqueo: s.laboratorio !== "fabricando" ? simulador.requisitos.laboratorio : null,
    },
    {
      id: "mora",
      icono: AlertCircleIcon,
      hacer: s.simular.mora,
      bloqueo: !s.contrato ? simulador.requisitos.contrato : !hayPendiente ? simulador.requisitos.cuotas : null,
    },
    {
      id: "liquidacion",
      icono: Award01Icon,
      hacer: s.simular.liquidacion,
      bloqueo: !s.contrato ? simulador.requisitos.contrato : !hayPendiente ? simulador.requisitos.cuotas : null,
    },
  ];

  const ejecutar = (hacer: () => void) => {
    hacer();
    setAbierto(false);
  };

  const estado: [string, string][] = [
    ["Cuenta", s.sesion.activa ? (s.perfil.nombre || s.perfil.correo || "Iniciada") : "Visitante"],
    ["Cita", s.cita ? `${fechaCita(s.cita.inicio)} · ${rangoHora(s.cita.inicio)}` : "Sin cita"],
    ["Orden", s.orden ? s.orden.numero : "Sin orden"],
    ["Cuotas", s.contrato ? `${pagadas} de ${negocio.cuotas.cantidad} pagadas` : "Sin contrato"],
  ];

  return (
    <Dialog.Root
      open={abierto}
      onOpenChange={(v) => {
        setAbierto(v);
        setConfirmando(false);
      }}
    >
      {/* Pestaña lateral: siempre a mano y sin tapar acciones ni contenido */}
      <div className="pointer-events-none fixed inset-x-0 top-1/2 z-40 mx-auto flex max-w-md justify-end lg:max-w-none">
        <Dialog.Trigger asChild>
          <button
            type="button"
            aria-label={simulador.abrir}
            className="pointer-events-auto flex w-5 flex-col items-center gap-1 rounded-l-md bg-secondary-950 py-2.5 text-meta leading-none font-bold text-white shadow-md transition-[width] duration-150 hover:w-7"
          >
            <HugeiconsIcon icon={PlayIcon} size={12} strokeWidth={2.5} aria-hidden />
            <span className="rotate-180 [writing-mode:vertical-rl]">{demo.etiqueta}</span>
          </button>
        </Dialog.Trigger>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-secondary-950/40 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="pb-seguro fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] max-w-md flex-col rounded-t-2xl lg:inset-x-auto lg:top-0 lg:right-0 lg:bottom-0 lg:max-h-none lg:w-md lg:rounded-none lg:rounded-l-2xl bg-card shadow-lg outline-none data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom">
          <div className="flex items-start justify-between gap-3 border-b border-border px-5 pt-4 pb-3">
            <div>
              <p className="mb-1 inline-flex rounded-full bg-secondary-950 px-2.5 py-0.5 text-meta font-bold text-white">
                {demo.etiqueta}
              </p>
              <Dialog.Title className="font-titulo text-bloque font-medium text-secondary-950">
                {simulador.titulo}
              </Dialog.Title>
              <Dialog.Description className="text-meta text-muted-foreground">{simulador.descripcion}</Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label={simulador.cerrar}>
                <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} aria-hidden />
              </Button>
            </Dialog.Close>
          </div>

          <div className="overflow-y-auto px-5 py-4">
            <h3 className="mb-2 text-meta font-bold text-secondary-700">{simulador.estado}</h3>
            <dl className="mb-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 rounded-lg bg-secondary-50 p-3 text-meta">
              {estado.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="cifras truncate font-semibold text-secondary-900">{v}</dd>
                </div>
              ))}
            </dl>

            <ul className="space-y-2">
              {acciones.map(({ id, icono, hacer, bloqueo }) => (
                <li key={id}>
                  <button
                    type="button"
                    disabled={!!bloqueo}
                    onClick={() => ejecutar(hacer)}
                    className="flex w-full items-start gap-3 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:bg-secondary-50 disabled:hover:bg-secondary-50"
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md",
                        bloqueo ? "bg-secondary-100 text-secondary-500" : "bg-primary-100 text-primary-900",
                      )}
                    >
                      <HugeiconsIcon icon={icono} size={20} strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className={cn("block font-bold", bloqueo ? "text-secondary-600" : "text-secondary-950")}>
                        {simulador.acciones[id as keyof typeof simulador.acciones]}
                      </span>
                      <span className="block text-meta text-muted-foreground">
                        {bloqueo ?? simulador.descripciones[id]}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-lg border border-border p-3">
              <label htmlFor="sim-tipo" className="mb-2 flex items-center gap-2 font-bold text-secondary-950">
                <HugeiconsIcon icon={Notification01Icon} size={20} strokeWidth={1.75} aria-hidden />
                {simulador.tipoNotificacion}
              </label>
              <div className="flex gap-2">
                <select
                  id="sim-tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as TipoNotificacion)}
                  className="h-12 min-w-0 flex-1 rounded-md border-2 border-input bg-card px-3 text-cuerpo text-secondary-950"
                >
                  {simulador.tiposNotificacion.map((t) => (
                    <option key={t.tipo} value={t.tipo}>
                      {t.etiqueta}
                    </option>
                  ))}
                </select>
                <Button
                  disabled={!s.sesion.activa}
                  onClick={() => ejecutar(() => s.simular.notificacion(tipo))}
                >
                  {simulador.acciones.notificacion.split(" ")[0]}
                </Button>
              </div>
              {!s.sesion.activa && (
                <p className="mt-2 text-meta text-muted-foreground">{simulador.requisitos.sesion}</p>
              )}
            </div>

            <div className="mt-6 space-y-3">
              {confirmando ? (
                <div className="rounded-lg bg-vencida-fondo p-3">
                  <p className="mb-3 text-meta font-semibold text-vencida">{simulador.confirmarReinicio}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => {
                        s.simular.reiniciar();
                        setAbierto(false);
                        window.location.assign(rutas.inicio);
                      }}
                    >
                      {simulador.acciones.reiniciar}
                    </Button>
                    <Button variant="outline" onClick={() => setConfirmando(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <Button variant="outline" block onClick={() => setConfirmando(true)}>
                  <HugeiconsIcon icon={RefreshIcon} strokeWidth={2} aria-hidden />
                  {simulador.acciones.reiniciar}
                </Button>
              )}
              <div className="flex justify-center gap-6 pt-1">
                <Link href={rutas.mapa} onClick={() => setAbierto(false)} className="text-meta font-semibold">
                  {simulador.mapa}
                </Link>
                <Link href={rutas.sistema} onClick={() => setAbierto(false)} className="text-meta font-semibold">
                  {simulador.sistema}
                </Link>
              </div>
              <p className="flex items-start gap-2 text-meta text-muted-foreground">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0" />
                {demo.aviso}
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
