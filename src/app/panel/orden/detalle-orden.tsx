"use client";

import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, File01Icon, NecklaceIcon } from "@hugeicons/core-free-icons";
import { monturas, negocio, orden as t, rutas } from "@/content/visionario";
import { generarCuotas, useApp } from "@/lib/estado";
import { useGuardia } from "@/lib/guardias";
import { bs, dioptria, fecha } from "@/lib/utils";
import { AccionFija, BarraFlujo } from "@/components/app/barras";
import { EstadoVacio } from "@/components/app/estado-vacio";
import { Button, Flecha } from "@/components/ui/button";
import type { OjoReceta } from "@/content/visionario";

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
            chips={[{ emoji: "👓", texto: "Sus lentes" }, { emoji: "💛", texto: "Su joya", tono: "oro" }]}
          >
            <Button asChild variant="outline">
              <Link href={rutas.panel}>Ir a mi estado</Link>
            </Button>
          </EstadoVacio>
        </main>
      </>
    );
  }

  const montura = monturas.find((m) => m.id === o.monturaId);
  const joya = o.joya;
  const nombresTrat = o.tratamientos
    .map((id) => negocio.tratamientos.find((x) => x.id === id)?.nombre)
    .filter(Boolean)
    .join(", ");
  const plan = generarCuotas(o.total, new Date().toISOString());

  return (
    <>
      <BarraFlujo titulo={t.titulo} paso={contratoFirmado ? undefined : 1} total={contratoFirmado ? undefined : 3} volverA={rutas.panel} />

      <main className="contenedor-flujo flex-1 animate-paso-adelante pt-4 pb-36 lg:pt-10 lg:pb-8">
        {/* La montura elegida, en grande */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-primary-50 shadow-md ring-4 ring-white">
          {montura?.imagen && <Image src={montura.imagen} alt={`Montura ${montura.nombre}`} fill priority sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />}
          <span aria-hidden className="absolute inset-0 bg-linear-to-t from-secondary-950/70 to-transparent" />
          <div className="cifras absolute inset-x-4 bottom-3 flex items-end justify-between gap-3 text-white">
            <span>
              <span className="block font-titulo text-bloque font-bold text-white">{montura?.nombre}</span>
              <span className="text-meta text-secondary-100">
                {t.recibida} {fecha(o.recibidaEl)}
              </span>
            </span>
            <span className="vidrio rounded-full px-3 py-1 text-mini text-secondary-950">
              {t.numero} {o.numero}
            </span>
          </div>
        </div>

        <dl className="tarjeta mt-5 divide-y divide-border p-5">
          <Fila etiqueta={t.lente}>{o.lente}</Fila>
          <Fila etiqueta={t.tratamientos}>{nombresTrat || t.sinTratamiento}</Fila>
          <Fila etiqueta={t.montura}>
            {montura?.nombre}
            <span className="block text-meta font-normal text-muted-foreground">
              {montura ? (montura.publico === "adultos" ? "Adultos" : "Niños") : ""}
            </span>
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
          <Fila etiqueta={t.joya}>
            <span className="flex items-center justify-between gap-4">
              <span>
                {joya?.descripcion ?? negocio.garantia.joya}
                {joya && (
                  <span className="cifras mt-1 block text-meta font-normal text-muted-foreground">
                    {t.tasada} <strong className="font-bold text-secondary-950">{bs(joya.tasacion)}</strong>
                  </span>
                )}
              </span>
              {/* Foto de la joya que dejó en garantía; mientras no esté, queda su espacio */}
              <span className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-oro-100 text-oro-800 ring-2 ring-oro-200">
                {joya?.foto ? (
                  <Image src={joya.foto} alt="Foto de su joya" fill sizes="80px" className="object-cover" />
                ) : (
                  <HugeiconsIcon icon={NecklaceIcon} size={32} strokeWidth={1.25} aria-hidden />
                )}
              </span>
            </span>
          </Fila>
        </dl>

        <section aria-labelledby="total" className="relative mt-5 overflow-hidden rounded-[2rem] bg-secondary-950 p-5 text-white shadow-lg lg:p-7">
          <span aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full bg-primary-500/40 blur-3xl" />
          <h2 id="total" className="text-meta font-semibold text-secondary-300">
            {t.total}
          </h2>
          <p className="cifras mt-1 font-titulo text-cifra text-white">{bs(o.total)}</p>
          <p className="mt-1 flex items-center gap-2 text-meta text-secondary-200">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} strokeWidth={2} aria-hidden className="text-exito-400" />
            {t.sinIntereses}
          </p>
          <h3 className="mt-6 text-meta font-semibold text-secondary-300">{t.plan}</h3>
          <ol className="relative mt-3 grid grid-cols-3 gap-2">
            {plan.map((c, i) => (
              <li key={c.numero} className="rounded-2xl bg-white/8 p-3 ring-1 ring-white/10">
                <span className="text-mini text-secondary-300">
                  Cuota {c.numero} de {negocio.cuotas.cantidad}
                </span>
                <span className="cifras mt-1 block font-titulo text-entrada font-bold text-white">{bs(c.monto)}</span>
                <span className="block text-mini font-medium text-secondary-300">{t.cuandoCuota[i]}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <AccionFija>
        {contratoFirmado ? (
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
