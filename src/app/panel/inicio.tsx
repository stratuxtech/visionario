"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { AlertCircleIcon, ArrowRight01Icon, PlayIcon } from "@hugeicons/core-free-icons";
import { estado as t, navegacion, rutas } from "@/content/visionario";
import { paradaActual, proximaCuota, situacionActual, useApp, type TipoSituacion } from "@/lib/estado";
import { useGuardia } from "@/lib/guardias";
import { fechaCita, horaInicio } from "@/lib/agenda";
import { bs, cn, fecha } from "@/lib/utils";
import { PantallaApp } from "@/components/app/barras";
import { LineaEstado, type Parada } from "@/components/linea-estado";
import { Button, Flecha } from "@/components/ui/button";
import type { IdParada } from "@/content/visionario";

const ORDEN: IdParada[] = ["cita", "medicion", "joya", "firma", "cuota-2", "cuota-3", "devolucion"];
const EMOJIS: Record<IdParada, string> = {
  cita: "📅",
  medicion: "👓",
  joya: "💛",
  firma: "✍️",
  "cuota-2": "📱",
  "cuota-3": "📱",
  devolucion: "🎁",
};
const EMOJI_SITUACION: Record<TipoSituacion, string> = {
  "sin-cita": "📅",
  cita: "🗓️",
  orden: "📄",
  "cuota-1": "📱",
  fabricando: "🔬",
  vencida: "⚠️",
  listo: "🎉",
  liquidado: "💛",
};

/** Tarjeta pequeña: siempre permite volver a ver cómo funciona todo. */
function GuiaProceso() {
  return (
    <Link
      href={rutas.proceso}
      className="group flex items-center gap-3 rounded-full bg-secondary-950 py-2 pr-2 pl-2 font-semibold text-white no-underline shadow-md transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg lg:col-start-2 lg:row-start-1"
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-primary-600 shadow-brillo">
        <HugeiconsIcon icon={PlayIcon} size={16} strokeWidth={2.5} aria-hidden className="translate-x-px [&_path]:fill-current" />
      </span>
      <span className="min-w-0 flex-1 text-cuerpo">{t.guia}</span>
      <span className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-0.5">
        <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2.25} aria-hidden />
      </span>
    </Link>
  );
}

/** Dónde está la persona ahora y qué sigue, en una frase corta. */
function EstadoActual() {
  const s = useApp();
  const { tipo, cuota } = situacionActual(s);
  const sit = t.situaciones;
  const proxima = proximaCuota(s.cuotas);

  const titulo: Record<TipoSituacion, string> = {
    "sin-cita": sit["sin-cita"].titulo,
    cita: s.cita ? sit.cita.titulo(`${fechaCita(s.cita.inicio).toLowerCase()} a las ${horaInicio(s.cita.inicio)}`) : "",
    orden: sit.orden.titulo,
    "cuota-1": sit["cuota-1"].titulo,
    fabricando: sit.fabricando.titulo,
    vencida: sit.vencida.titulo(cuota?.numero ?? 0),
    listo: sit.listo.titulo,
    liquidado: sit.liquidado.titulo,
  };
  const detalle: Record<TipoSituacion, string> = {
    "sin-cita": sit["sin-cita"].detalle,
    cita: sit.cita.detalle,
    orden: sit.orden.detalle,
    "cuota-1": sit["cuota-1"].detalle,
    fabricando: sit.fabricando.detalle,
    vencida: sit.vencida.detalle,
    listo: sit.listo.detalle,
    liquidado: sit.liquidado.detalle,
  };
  const alerta = tipo === "vencida";
  const bien = tipo === "listo" || tipo === "liquidado";

  return (
    <section
      aria-labelledby="estado-actual"
      className={cn(
        "relative animate-entrar overflow-hidden rounded-[2rem] p-5 shadow-md lg:col-start-1 lg:row-start-1 lg:p-7",
        alerta ? "bg-alerta-50 ring-1 ring-alerta-100" : bien ? "bg-exito-50 ring-1 ring-exito-100" : "bg-white",
      )}
    >
      <span aria-hidden className={cn("absolute -top-16 -right-12 size-44 rounded-full blur-3xl", alerta ? "bg-alerta-200/60" : bien ? "bg-exito-100" : "bg-primary-200/60")} />
      <div className="relative flex items-start gap-4">
        <span
          aria-hidden
          className={cn(
            "flex size-14 shrink-0 animate-confirmar items-center justify-center rounded-2xl text-[1.75rem]",
            alerta ? "bg-white text-alerta-600" : bien ? "bg-white" : "bg-primary-50",
          )}
        >
          {alerta ? <HugeiconsIcon icon={AlertCircleIcon} size={30} strokeWidth={2} /> : EMOJI_SITUACION[tipo]}
        </span>
        <div className="min-w-0">
          <h2 id="estado-actual" className={cn("font-titulo text-bloque leading-tight font-bold lg:text-[1.625rem]", alerta ? "text-alerta-700" : bien ? "text-exito-800" : "text-secondary-950")}>
            {titulo[tipo]}
          </h2>
          <p className={cn("mt-1.5", alerta ? "text-alerta-700" : bien ? "text-exito-800" : "text-secondary-700")}>{detalle[tipo]}</p>
        </div>
      </div>
      {tipo === "fabricando" && proxima && (
        <p className="cifras relative mt-4 inline-flex rounded-full bg-primary-50 px-3 py-1.5 text-meta font-bold text-primary-800">
          {t.proximaCuota(proxima.numero, fecha(proxima.vence))}
        </p>
      )}
    </section>
  );
}

/** Mi estado: cómo funciona (tarjeta pequeña), dónde estoy y el recorrido horizontal. */
export function Inicio() {
  const listo = useGuardia();
  const s = useApp();
  if (!listo) return null;

  const actual = paradaActual(s);
  const indiceActual = ORDEN.indexOf(actual);
  const proxima = proximaCuota(s.cuotas);
  const cuotaUnoPagada = s.cuotas[0]?.estado === "pagada";

  /* La acción vive en la tarjeta azul de la parada actual: botón blanco */
  const ir = (href: string, texto: string) => (
    <Button asChild variant="claro" size="default">
      <Link href={href}>
        {texto}
        <Flecha />
      </Link>
    </Button>
  );

  const accion: Partial<Record<IdParada, React.ReactNode>> = {};
  if (actual === "cita") accion.cita = ir(rutas.agendar, t.acciones.agendar);
  if (actual === "medicion") accion.medicion = ir(rutas.agendar, t.acciones.verCita);
  if (actual === "firma") {
    accion.firma = !s.contrato
      ? ir(rutas.orden, t.acciones.verOrden)
      : !cuotaUnoPagada && proxima
        ? ir(rutas.pago, t.acciones.pagar(proxima.numero))
        : null;
  }
  if ((actual === "cuota-2" || actual === "cuota-3") && proxima) accion[actual] = ir(rutas.pago, t.acciones.pagar(proxima.numero));
  if (actual === "devolucion") accion.devolucion = ir(rutas.liquidacion, t.acciones.verBeneficio);

  /* Cada parada dice lo que corresponde a su momento: nada de "agende" si ya agendó */
  const textos: Record<IdParada, string> = {
    cita: s.cita
      ? s.orden
        ? t.paradas.cita.pasada
        : t.paradas.cita.hecha(`${fechaCita(s.cita.inicio).toLowerCase()} a las ${horaInicio(s.cita.inicio)}`)
      : t.paradas.cita.pendiente,
    medicion: s.orden ? t.paradas.medicion.hecha : t.paradas.medicion.pendiente,
    joya: s.orden ? t.paradas.joya.hecha(bs(s.orden.joya?.tasacion ?? 0)) : t.paradas.joya.pendiente,
    firma: cuotaUnoPagada ? t.paradas.firma.hecha : t.paradas.firma.pendiente,
    "cuota-2": t.paradas["cuota-2"],
    "cuota-3": t.paradas["cuota-3"],
    devolucion: t.paradas.devolucion,
  };

  const paradas: Parada[] = ORDEN.map((id, i) => ({
    id,
    titulo: textos[id],
    emoji: EMOJIS[id],
    estado: i < indiceActual ? "hecha" : i === indiceActual ? "actual" : "pendiente",
    accion: accion[id],
  }));

  return (
    <PantallaApp titulo={navegacion.titulos.estado} ancho="ancho">
      <div className="space-y-4 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-x-8 lg:space-y-0">
        <GuiaProceso />
        <EstadoActual />
      </div>

      <div className="mt-8 lg:mt-12">
        <LineaEstado paradas={paradas} titulo={t.recorrido} />
      </div>
    </PantallaApp>
  );
}
