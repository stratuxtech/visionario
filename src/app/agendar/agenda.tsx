"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Coupon01Icon,
  FavouriteIcon,
  GlassesIcon,
  IdIcon,
  InformationCircleIcon,
  Location01Icon,
  NecklaceIcon,
} from "@hugeicons/core-free-icons";
import { agenda, estado as textoEstado, optica, rutas } from "@/content/visionario";
import { modoCita, useApp } from "@/lib/estado";
import { useGuardia } from "@/lib/guardias";
import { diaCorto, enlaceGoogleCalendar, fechaCita, generarAgenda, rangoHora } from "@/lib/agenda";
import { AccionFija, PantallaApp } from "@/components/app/barras";
import { GoogleLogo } from "@/components/marca/google";
import { Button, Flecha } from "@/components/ui/button";
import { ConNegrita } from "@/components/ui/con-negrita";
import { Nota } from "@/components/ui/nota";
import { Festejo, QueSigue } from "@/components/app/festejo";
import { cn } from "@/lib/utils";

const iconosTraer = [IdIcon, GlassesIcon];

/* La cita en la tarjeta azul oscuro: fecha, hora y lugar */
function TarjetaCita({ inicio, titulo, confirmada, conJoya }: { inicio: string; titulo: string; confirmada: boolean; conJoya: boolean }) {
  const cupon = useApp((s) => s.cupon);
  return (
    <section aria-labelledby="tarjeta-cita" className="relative animate-entrar overflow-hidden rounded-[2rem] bg-secondary-950 p-5 text-white shadow-lg lg:p-7">
      <span aria-hidden className="absolute -top-20 -right-16 size-56 rounded-full bg-primary-500/45 blur-3xl" />
      <span aria-hidden className="absolute -bottom-24 -left-10 size-48 rounded-full bg-oro-400/15 blur-3xl" />
      <div className="relative">
      <h2 id="tarjeta-cita" className="flex items-center gap-2 text-meta font-bold text-primary-300">
        {confirmada && (
          <span className="flex size-6 animate-confirmar items-center justify-center rounded-full bg-exito-500 text-white">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={2.25} aria-hidden />
          </span>
        )}
        {titulo}
      </h2>
      <dl className="mt-4 space-y-4">
        <div className="flex items-start gap-3">
          <HugeiconsIcon icon={Calendar03Icon} size={22} strokeWidth={1.75} aria-hidden className="mt-1 shrink-0 text-primary-300" />
          <div>
            <dt className="sr-only">Fecha</dt>
            <dd className="font-titulo text-seccion leading-tight font-medium text-white">{fechaCita(inicio)}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <HugeiconsIcon icon={Clock01Icon} size={22} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-primary-300" />
          <div>
            <dt className="sr-only">Hora</dt>
            <dd className="cifras text-entrada font-bold text-white">{rangoHora(inicio)}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <HugeiconsIcon icon={Location01Icon} size={22} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-primary-300" />
          <div>
            <dt className="sr-only">Lugar</dt>
            <dd className="text-secondary-100">
              {optica.nombre}, {optica.direccion}
              <span className="block text-meta text-secondary-300">{optica.referencia}</span>
            </dd>
          </div>
        </div>
      </dl>
      {conJoya && (
        <p className="mt-5 flex items-center gap-3 rounded-2xl bg-oro-300 px-3 py-2.5 font-bold text-secondary-950">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-oro-800">
            <HugeiconsIcon icon={NecklaceIcon} size={20} strokeWidth={2} aria-hidden />
          </span>
          {agenda.joyaAviso}
        </p>
      )}
      {cupon && (
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-secondary-800 px-3 py-1 text-meta font-bold text-primary-300">
          <HugeiconsIcon icon={Coupon01Icon} size={16} strokeWidth={2} aria-hidden />
          {agenda.cuponAplicado(cupon.porcentaje, cupon.codigo)}
        </p>
      )}
      </div>
    </section>
  );
}

function QueTraer() {
  const menor = useApp((s) => s.perfil.edad !== null && s.perfil.edad < 18);
  return (
    <section aria-labelledby="traer" className="tarjeta mt-6 p-5">
      <h2 id="traer" className="text-bloque">
        {agenda.confirmada.traer}
      </h2>
      <ul className="mt-3 space-y-2">
        {agenda.confirmada.requisitos.map((r, i) => (
          <li key={r} className="flex items-center gap-3 text-secondary-900">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-800">
              <HugeiconsIcon icon={iconosTraer[i]} size={20} strokeWidth={1.75} aria-hidden />
            </span>
            {r}
          </li>
        ))}
      </ul>
      {menor && (
        <p className="mt-4 flex items-start gap-2 text-meta text-secondary-700">
          <HugeiconsIcon icon={InformationCircleIcon} size={18} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0" />
          {agenda.confirmada.menor}
        </p>
      )}
    </section>
  );
}

/**
 * Mi cita: la pantalla inicial de la app. Sin cita, se elige el horario; con
 * cita, la tarjeta azul con los datos de la cita y qué traer.
 */
export function Agenda() {
  const listo = useGuardia();
  const cita = useApp((s) => s.cita);
  const modo = useApp(modoCita);
  const cupon = useApp((s) => s.cupon);
  const interes = useApp((s) => s.monturasInteres.length);
  const preelegido = useApp((s) => s.horarioPreelegido);
  const agendarCita = useApp((s) => s.agendarCita);
  const desfase = useApp((s) => s.desfaseDias);

  const dias = useMemo(() => (listo ? generarAgenda(undefined, desfase) : []), [listo, desfase]);
  const [cambiando, setCambiando] = useState(false);
  const [recien, setRecien] = useState(false);
  const [diaElegido, setDiaElegido] = useState<string | null>(null);
  const [bloqueElegido, setBloqueElegido] = useState<string | null>(null);

  if (!listo) return null;

  /* Con cita: la tarjeta azul */
  if (cita && modo !== "reservar" && !cambiando) {
    return (
      <PantallaApp titulo={agenda.titulo}>
        {recien && modo === "reservada" && (
          <div className="mb-6 text-center">
            <Festejo icono={Calendar03Icon} tono="azul" emojis={["🎉", "📅", "👓", "✨", "💙"]} />
            <p className="mt-5 animate-aparecer font-titulo text-seccion font-bold text-secondary-950 [animation-delay:200ms]">{agenda.confirmada.festejo}</p>
          </div>
        )}
        <TarjetaCita
          inicio={cita.inicio}
          titulo={modo === "realizada" ? agenda.tarjeta.realizada : agenda.tarjeta.reservada}
          confirmada={recien && modo === "reservada"}
          conJoya={modo === "reservada"}
        />
        {modo === "reservada" ? (
          <>
            <div className="mt-4 grid gap-3">
              <Button asChild variant="outline" size="lg">
                <a href={enlaceGoogleCalendar(cita.inicio)} target="_blank" rel="noopener noreferrer">
                  <GoogleLogo className="size-5" />
                  {agenda.calendario}
                </a>
              </Button>
              <Button variant="secondary" size="lg" onClick={() => setCambiando(true)}>
                {agenda.cambiar}
              </Button>
            </div>
            {recien && (
              <QueSigue
                pasos={agenda.confirmada.queSigue.map((p) => ({ ...p, texto: <ConNegrita texto={p.texto} /> }))}
                className="mt-6"
              />
            )}
            <QueTraer />
            {interes > 0 && (
              <Link
                href={rutas.monturas}
                className="tarjeta mt-4 flex items-center gap-3 p-4 text-secondary-900 no-underline transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <HugeiconsIcon icon={FavouriteIcon} size={20} strokeWidth={2} aria-hidden className="shrink-0 text-primary-800 [&_path]:fill-current" />
                <span className="flex-1 text-meta font-semibold">{textoEstado.monturasInteres(interes)}</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} aria-hidden className="text-secondary-600" />
              </Link>
            )}
          </>
        ) : (
          <Button asChild size="lg" className="mt-4">
            <Link href={rutas.panel}>
              {agenda.verEstado}
              <Flecha />
            </Link>
          </Button>
        )}
      </PantallaApp>
    );
  }

  /* Elegir horario */
  const libreDe = (iso: string | null) =>
    iso ? dias.flatMap((d) => d.bloques).find((b) => b.inicio === iso && b.libre)?.inicio ?? null : null;
  const bloque = bloqueElegido ?? libreDe(preelegido);
  const diaDeBloque = bloque ? dias.find((d) => d.bloques.some((b) => b.inicio === bloque))?.fecha : null;
  const dia = diaElegido ?? diaDeBloque ?? dias.find((d) => d.libres > 0)?.fecha ?? dias[0]?.fecha;
  const diaActual = dias.find((d) => d.fecha === dia);
  const manana = diaActual?.bloques.filter((b) => b.hora < 13) ?? [];
  const tarde = diaActual?.bloques.filter((b) => b.hora >= 13) ?? [];

  const grupo = (titulo: string, bloques: typeof manana) =>
    bloques.length ? (
      <div>
        <h3 className="mb-2 text-meta font-bold text-secondary-700">{titulo}</h3>
        <ul className="grid grid-cols-2 gap-2">
          {bloques.map((b) => {
            const elegido = bloque === b.inicio;
            return (
              <li key={b.inicio}>
                <button
                  type="button"
                  disabled={!b.libre}
                  onClick={() => setBloqueElegido(b.inicio)}
                  aria-pressed={elegido}
                  className={cn(
                    "cifras flex min-h-14 w-full flex-col items-center justify-center rounded-2xl border px-2 py-2 font-bold transition-[background-color,border-color,box-shadow,transform] duration-300 ease-salida",
                    elegido
                      ? "animate-elegir border-primary-600 bg-primary-600 text-white shadow-brillo"
                      : "border-secondary-200 bg-white text-secondary-950 shadow-xs hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md",
                    "disabled:translate-y-0 disabled:border-transparent disabled:bg-secondary-100/70 disabled:font-medium disabled:text-secondary-600 disabled:line-through disabled:shadow-none",
                  )}
                >
                  {rangoHora(b.inicio)}
                  {!b.libre && <span className="text-meta font-medium no-underline">{agenda.ocupado}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    ) : null;

  return (
    <>
      <PantallaApp titulo={agenda.titulo} className="pb-60 lg:pb-8">
        {cita && modo === "reservada" && (
          <Button variant="link" size="sm" className="mb-2" onClick={() => setCambiando(false)}>
            {agenda.mantener}
          </Button>
        )}

        <Nota tono="oro" titulo={agenda.joyaAviso} />

        {cupon && (
          <Nota tono="exito" icono={Coupon01Icon} className="mt-3" titulo={cupon.producto ? `${cupon.porcentaje}% de descuento en ${cupon.producto.toLowerCase()}` : agenda.cupon(cupon.porcentaje)}>
            {cupon.codigo}
          </Nota>
        )}

        <h2 className="mt-6 text-bloque">{agenda.dia}</h2>
        <ul
          className="sin-barra -mx-5 -mb-6 mt-1 flex snap-x scroll-px-5 gap-2 overflow-x-auto px-5 pt-2 pb-9 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
          aria-label={agenda.dia}
        >
          {dias.map((d) => {
            const fecha = new Date(d.fecha);
            const elegido = d.fecha === dia;
            return (
              <li key={d.fecha} className="snap-start">
                <button
                  type="button"
                  onClick={() => {
                    setDiaElegido(d.fecha);
                    setBloqueElegido(null);
                  }}
                  disabled={d.libres === 0}
                  aria-pressed={elegido}
                  aria-label={`${fechaCita(d.fecha)}, ${d.libres} horarios libres`}
                  className={cn(
                    "flex h-20 w-16 flex-col items-center justify-center rounded-2xl border transition-[background-color,border-color,box-shadow,transform] duration-300 ease-salida",
                    elegido
                      ? "animate-elegir border-primary-600 bg-primary-600 text-white shadow-brillo"
                      : "border-secondary-200 bg-white text-secondary-950 shadow-xs hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md",
                    "disabled:opacity-45 disabled:hover:translate-y-0",
                  )}
                >
                  <span className={cn("text-meta", elegido ? "text-primary-100" : "text-muted-foreground")}>
                    {diaCorto(d.fecha)}
                  </span>
                  <span className="cifras font-titulo text-bloque font-bold">{fecha.getDate()}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <h2 className="mt-7 text-bloque">{agenda.hora}</h2>
        {diaActual && <p className="mt-1 text-meta text-muted-foreground">{fechaCita(diaActual.fecha)}</p>}
        <div key={dia} className="mt-4 animate-entrar space-y-5">
          {diaActual && diaActual.libres > 0 ? (
            <>
              {grupo(agenda.manana, manana)}
              {grupo(agenda.tarde, tarde)}
            </>
          ) : (
            <Nota tono="info" titulo={agenda.sinHorarios} />
          )}
        </div>
      </PantallaApp>

      <AccionFija sobreMenu>
        {bloque && (
          <p className="cifras mb-2 text-center text-meta font-semibold text-secondary-900" aria-live="polite">
            {fechaCita(bloque)} · {rangoHora(bloque)}
          </p>
        )}
        <Button
          size="lg"
          disabled={!bloque}
          onClick={() => {
            if (!bloque) return;
            agendarCita(bloque);
            setCambiando(false);
            setRecien(true);
            window.scrollTo({ top: 0 });
          }}
        >
          {bloque ? agenda.confirmar : agenda.eligeHora}
          {bloque && <Flecha />}
        </Button>
      </AccionFija>
    </>
  );
}
