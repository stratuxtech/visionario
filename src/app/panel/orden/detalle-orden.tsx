"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, File01Icon, GiftIcon, InformationCircleIcon } from "@hugeicons/core-free-icons";
import { negocio, orden as t, rutas, textos } from "@/content/optihelp";
import { cuotasPagadas, esContado, generarCuotas, useApp } from "@/lib/estado";
import { useGuardia } from "@/lib/guardias";
import { bs, dioptria, fecha } from "@/lib/utils";
import { AccionFija, BarraFlujo } from "@/components/app/barras";
import { EstadoVacio } from "@/components/app/estado-vacio";
import { Button, Flecha } from "@/components/ui/button";
import type { OjoReceta } from "@/content/optihelp";

export const formatoOjo = (o: OjoReceta) =>
  `${dioptria(o.esfera)} · cil. ${dioptria(o.cilindro)} · eje ${o.eje}°`;

function Fila({ etiqueta, children }: { etiqueta: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="text-meta text-muted-foreground">{etiqueta}</dt>
      <dd className="font-semibold text-secondary-950">{children}</dd>
    </div>
  );
}

export function DetalleOrden() {
  const listo = useGuardia({ sesion: true });
  const o = useApp((s) => s.orden);
  const r = useApp((s) => s.receta);
  const cuotas = useApp((s) => s.cuotas);
  const contratoFirmado = useApp((s) => s.contrato);
  if (!listo) return null;

  if (!o) {
    return (
      <>
        <BarraFlujo titulo={t.titulo} volverA={rutas.panel} />
        <main className="contenedor-flujo flex flex-1 flex-col">
          <EstadoVacio
            icono={File01Icon}
            titulo={t.vacia.titulo}
            texto={t.vacia.texto}
            chips={[{ emoji: "👓", texto: t.vacia.chips.lentes }, { emoji: "🕶️", texto: t.vacia.chips.montura, tono: "azul" }]}
          >
            <Button asChild variant="outline">
              <Link href={rutas.panel}>{t.vacia.accion}</Link>
            </Button>
          </EstadoVacio>
        </main>
      </>
    );
  }

  const contado = esContado(o);
  const pagadoContado = contado && cuotasPagadas(cuotas) > 0 ? cuotas[0] : null;
  const nombresTrat = o.tratamientos
    .map((id) => negocio.tratamientos.find((x) => x.id === id)?.nombre)
    .filter(Boolean)
    .join(", ");
  /* Antes de firmar, las fechas se cuentan desde hoy; después, las del contrato */
  const plan = contratoFirmado ? cuotas : generarCuotas(o.total, new Date().toISOString());
  const ong = o.montura.cubiertaPor;

  return (
    <>
      <BarraFlujo
        titulo={contado ? t.contado.titulo : t.titulo}
        paso={contado ? (pagadoContado ? undefined : 1) : contratoFirmado ? undefined : 1}
        total={contado ? (pagadoContado ? undefined : 2) : contratoFirmado ? undefined : 3}
        volverA={rutas.panel}
      />

      <main className="contenedor-flujo flex-1 animate-paso-adelante pt-4 pb-36 lg:pt-10 lg:pb-8">
        {/* Encabezado: de dónde viene la orden */}
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-titulo text-seccion leading-tight text-secondary-950">{t.encabezado}</h2>
            <p className="cifras mt-1 text-meta text-muted-foreground">
              {t.recibida} {fecha(o.recibidaEl)}
            </p>
          </div>
          <span className="cifras rounded-full bg-primary-50 px-3 py-1 text-mini text-primary-800">
            {t.numero} {o.numero}
          </span>
        </header>

        {contado && (
          <p className="mt-5 flex items-start gap-3 rounded-2xl bg-primary-50 p-4 text-secondary-800 ring-1 ring-primary-100">
            <HugeiconsIcon icon={InformationCircleIcon} size={22} strokeWidth={2} aria-hidden className="mt-0.5 shrink-0 text-primary-700" />
            <span className="font-semibold">{t.contado.aviso}</span>
          </p>
        )}

        <dl className="tarjeta mt-5 divide-y divide-border p-5">
          <Fila etiqueta={t.lente}>{o.lente}</Fila>
          <Fila etiqueta={t.tratamientos}>{nombresTrat || t.sinTratamiento}</Fila>
          <Fila etiqueta={t.montura}>
            {o.montura.descripcion}
            <span className="cifras block text-meta font-normal text-muted-foreground">
              {bs(o.montura.valor)} · {t.monturaIncluida}
            </span>
            {ong && (
              <span className="cifras mt-2 inline-flex items-center gap-2 rounded-full bg-oro-100 px-3 py-1 text-meta font-bold text-oro-800 ring-1 ring-oro-200">
                <HugeiconsIcon icon={GiftIcon} size={16} strokeWidth={2} aria-hidden />
                {t.montoOng.replace("{ong}", ong)}: −{bs(o.montura.valor)}
              </span>
            )}
          </Fila>
          {r && (
            <Fila etiqueta={t.receta}>
              <span className="cifras block">
                <span className="text-muted-foreground">OD </span>
                {formatoOjo(r.ojoDerecho)}
              </span>
              <span className="cifras block">
                <span className="text-muted-foreground">OI </span>
                {formatoOjo(r.ojoIzquierdo)}
              </span>
              <Link href={rutas.receta} className="mt-1 inline-block text-meta">
                {t.verReceta}
              </Link>
            </Fila>
          )}
          <Fila etiqueta={t.atiende.etiqueta}>{t.atiende.valor}</Fila>
          {!contado && <Fila etiqueta={t.financia.etiqueta}>{t.financia.valor}</Fila>}
        </dl>

        {contado ? (
          /* Contado: receta + lentes, un solo pago */
          <section aria-labelledby="total" className="relative mt-5 overflow-hidden rounded-[2rem] bg-secondary-950 p-5 text-white shadow-lg lg:p-7">
            <span aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full bg-primary-500/40 blur-3xl" />
            <dl className="cifras relative space-y-2 text-secondary-200">
              <div className="flex items-baseline justify-between gap-4">
                <dt>{t.contado.receta}</dt>
                <dd className="font-titulo font-bold text-white">{bs(o.receta ?? 0)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt>{t.contado.lentes}</dt>
                <dd className="font-titulo font-bold text-white">{bs(o.precioLista)}</dd>
              </div>
            </dl>
            <h3 id="total" className="relative mt-5 border-t border-white/10 pt-4 text-meta font-semibold text-secondary-300">
              {t.contado.total}
            </h3>
            <p className="cifras relative mt-1 font-titulo text-cifra text-white">{bs(o.total)}</p>
            <p className="relative mt-1 flex items-center gap-2 text-meta text-secondary-200">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} strokeWidth={2} aria-hidden className="text-exito-400" />
              {pagadoContado?.pagadaEl ? t.contado.pagado(fecha(pagadoContado.pagadaEl)) : t.contado.unPago}
            </p>
          </section>
        ) : (
          <section aria-labelledby="total" className="relative mt-5 overflow-hidden rounded-[2rem] bg-secondary-950 p-5 text-white shadow-lg lg:p-7">
            <span aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full bg-primary-500/40 blur-3xl" />
            {ong && (
              <p className="cifras relative text-meta text-secondary-300">
                {t.precioLista}: <s>{bs(o.precioLista)}</s>
              </p>
            )}
            <h2 id="total" className="relative text-meta font-semibold text-secondary-300">
              {t.total}
            </h2>
            <p className="cifras relative mt-1 font-titulo text-cifra text-white">{bs(o.total)}</p>
            <p className="relative mt-1 flex items-center gap-2 text-meta text-secondary-200">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} strokeWidth={2} aria-hidden className="text-exito-400" />
              {t.sinIntereses}
            </p>
            <h3 className="relative mt-6 text-meta font-semibold text-secondary-300">{t.plan}</h3>
            <ol className="relative mt-3 grid gap-2 sm:grid-cols-3">
              {plan.map((c, i) => (
                <li key={c.numero} className="flex items-center justify-between gap-3 rounded-2xl bg-white/8 p-3 ring-1 ring-white/10 sm:block">
                  <span>
                    <span className="block text-mini text-secondary-300">
                      {textos.nombreCuota(c.numero, negocio.cuotas.cantidad)}
                    </span>
                    <span className="block text-mini font-medium text-secondary-300">{t.cuandoCuota[i]}</span>
                  </span>
                  <span className="text-right sm:text-left">
                    <span className="cifras block font-titulo text-entrada font-bold text-white sm:mt-1">{bs(c.monto)}</span>
                    <span className="cifras block text-mini font-bold text-primary-200">{fecha(c.vence)}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}
      </main>

      <AccionFija>
        {contado ? (
          pagadoContado ? (
            <Button asChild variant="outline" size="lg">
              <Link href={rutas.pagos}>{t.contado.verPagos}</Link>
            </Button>
          ) : (
            <Button asChild size="lg">
              <Link href={rutas.pago}>
                {t.contado.accion}
                <Flecha />
              </Link>
            </Button>
          )
        ) : contratoFirmado ? (
          <>
            <p className="mb-2 text-center text-meta text-muted-foreground">{t.firmado(fecha(contratoFirmado.firmadoEl))}</p>
            <Button asChild variant="outline" size="lg">
              <Link href={rutas.pagos}>{t.verCuotas}</Link>
            </Button>
          </>
        ) : (
          <Button asChild size="lg">
            <Link href={rutas.contrato}>
              {t.firmar}
              <Flecha />
            </Link>
          </Button>
        )}
      </AccionFija>
    </>
  );
}
