"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  GlassesIcon,
  IdIcon,
  SecurityCheckIcon,
  Tick02Icon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import { landing, negocio, rutas, textos } from "@/content/optihelp";
import { siguienteRuta, useApp, useHidratado } from "@/lib/estado";
import { diaRelativo, proximosLibres, rangoHora } from "@/lib/agenda";
import { Button, Flecha } from "@/components/ui/button";
import { ChipFlotante } from "@/components/ui/chip-flotante";
import { ConNegrita } from "@/components/ui/con-negrita";
import { Segmentado } from "@/components/ui/opciones";
import { CodigoQR } from "@/components/pago/codigo-qr";
import { bs, cn, repartirCuotas } from "@/lib/utils";

/** A dónde lleva "agendar" según el avance de la persona. */
function useDestinoAgendar() {
  const s = useApp();
  const hidratado = useHidratado();
  return hidratado ? rutas[siguienteRuta(s)] : rutas.registro;
}

/** Barra superior de la homepage: ingresar o volver a su cita. */
export function AccesoBarra() {
  const hidratado = useHidratado();
  const activa = useApp((s) => s.sesion.activa);
  const destino = useDestinoAgendar();
  if (hidratado && activa) {
    return (
      <Button asChild size="sm" block={false}>
        <Link href={destino}>Mi cita</Link>
      </Button>
    );
  }
  return (
    <Button asChild variant="outline" size="sm" block={false}>
      <Link href={rutas.registro}>{textos.acciones.ingresar}</Link>
    </Button>
  );
}

/** Botón principal: agendar cita gratuita. */
export function BotonAgendar({ texto = textos.acciones.agendar, className, block }: { texto?: string; className?: string; block?: boolean }) {
  const destino = useDestinoAgendar();
  return (
    <Button asChild size="lg" block={block} className={className}>
      <Link href={destino}>
        {texto}
        <Flecha />
      </Link>
    </Button>
  );
}

/** "Ver cómo funciona": abre el onboarding encima; la X vuelve aquí. */
export function BotonVerComo({ className, block, variante = "outline" }: { className?: string; block?: boolean; variante?: "outline" | "vidrio" }) {
  return (
    <Button asChild variant={variante} size="lg" block={block} className={className}>
      <Link href={rutas.proceso}>{landing.heroe.verComo}</Link>
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/* Hoy vs. con OptiHelp (referencia: "Sin Pling / Con Pling")         */
/* ------------------------------------------------------------------ */

export function Comparacion() {
  const [lado, setLado] = useState<"hoy" | "con">("con");
  const t = landing.comparacion;
  const puntos = lado === "hoy" ? t.puntosHoy : t.puntosCon;
  return (
    <div className="mx-auto max-w-2xl">
      <Segmentado
        etiqueta={t.etiqueta}
        valor={lado}
        alCambiar={setLado}
        opciones={[
          { valor: "hoy", texto: t.hoy },
          { valor: "con", texto: t.con },
        ]}
        className="mx-auto max-w-sm"
      />
      <ul key={lado} className={cn("mt-6 space-y-3 rounded-[2rem] p-4 shadow-md lg:p-6", lado === "hoy" ? "bg-white" : "bg-secondary-950")}>
        {puntos.map((p, i) => (
          <li
            key={p}
            className={cn(
              "flex animate-entrar items-center gap-3 rounded-2xl p-3 lg:p-4",
              lado === "hoy" ? "bg-alerta-50 text-secondary-800" : "bg-white/5 text-secondary-100 [&_strong]:text-white",
            )}
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full",
                lado === "hoy" ? "bg-white text-alerta-600 shadow-xs" : "bg-exito-500 text-white shadow-brillo-exito",
              )}
            >
              <HugeiconsIcon icon={lado === "hoy" ? Cancel01Icon : Tick02Icon} size={18} strokeWidth={2.5} aria-hidden />
            </span>
            <span className="lg:text-entrada">
              <ConNegrita texto={p} />
            </span>
            <span className="sr-only">{lado === "hoy" ? "(problema)" : "(solución)"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cómo funciona: tres pestañas con un celular que muestra la app      */
/* ------------------------------------------------------------------ */

/** Marco de celular (CSS): la pantalla de la app vive adentro. */
export function Celular({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative mx-auto w-[17.5rem] lg:w-[19rem]", className)}>
      <span aria-hidden className="absolute -inset-10 rounded-full bg-primary-300/40 blur-3xl" />
      <div className="relative aspect-[9/18.5] overflow-hidden rounded-[2.75rem] border-[10px] border-secondary-950 bg-background shadow-lg">
        <span aria-hidden className="absolute top-2 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-secondary-950" />
        <div className="h-full overflow-hidden pt-10">{children}</div>
      </div>
    </div>
  );
}

/** Pantalla 1: horarios libres reales. Tocar uno lo deja elegido. */
function PantallaAgenda() {
  const router = useRouter();
  const hidratado = useHidratado();
  const preelegir = useApp((s) => s.preelegirHorario);
  const destino = useDestinoAgendar();
  const libres = hidratado ? proximosLibres(3) : [];
  return (
    <div className="px-4">
      <p className="font-titulo text-bloque font-bold text-secondary-950">{landing.horarios.titulo}</p>
      <p className="text-mini font-semibold text-secondary-600">{landing.horarios.nota}</p>
      <ul className="mt-4 space-y-2">
        {(libres.length ? libres : [null, null, null]).map((b, i) => (
          <li key={b?.inicio ?? i} className="animate-entrar" style={{ animationDelay: `${i * 100}ms` }}>
            {b ? (
              <button
                type="button"
                onClick={() => {
                  preelegir(b.inicio);
                  router.push(destino);
                }}
                className={cn(
                  "group flex w-full items-center justify-between gap-2 rounded-2xl px-3 py-2.5 text-left transition-all duration-300 hover:-translate-y-0.5",
                  i === 0 ? "bg-primary-600 text-white shadow-brillo" : "bg-white text-secondary-950 shadow-xs hover:shadow-md",
                )}
              >
                <span>
                  <span className="block text-meta font-bold">{diaRelativo(b.inicio)}</span>
                  <span className={cn("cifras block text-mini", i === 0 ? "text-primary-100" : "text-secondary-600")}>{rangoHora(b.inicio)}</span>
                </span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2.5} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
              </button>
            ) : (
              <span className="block h-14 animate-pulse rounded-2xl bg-white motion-reduce:animate-none" />
            )}
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1.5 text-mini text-primary-800">
        <HugeiconsIcon icon={IdIcon} size={14} strokeWidth={2} aria-hidden />
        {landing.celular.traiga}
      </p>
    </div>
  );
}

/* Ejemplo del celular: la orden de una medida media (precio referencial) */
const ejemplo = negocio.precioReferencial.perfiles.find((p) => p.id === "medio")!.precio;
const inicialEjemplo = repartirCuotas(ejemplo)[0].monto;

/** Pantalla 2: la orden con la montura de la óptica y la cuota inicial. */
function PantallaOptica() {
  const t = landing.celular.orden;
  return (
    <div className="space-y-3 px-4">
      <p className="font-titulo text-bloque font-bold text-secondary-950">{t.titulo}</p>
      <div className="flex animate-entrar items-center gap-3 rounded-2xl bg-white p-3 shadow-xs">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
          <HugeiconsIcon icon={GlassesIcon} size={24} strokeWidth={1.75} aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block text-meta font-bold text-secondary-950">{t.montura}</span>
          <span className="block text-mini font-semibold text-secondary-600">{t.monturaDetalle}</span>
        </span>
      </div>
      <div className="animate-entrar rounded-2xl bg-secondary-950 p-3 text-white shadow-xs [animation-delay:120ms]">
        <span className="block text-mini font-semibold text-secondary-300">{t.total}</span>
        <span className="cifras block font-titulo text-[1.5rem] leading-tight font-bold">{bs(ejemplo)}</span>
        <span className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-white/10 px-2.5 py-1.5 text-mini">
          <span className="text-secondary-200">{t.inicial}</span>
          <span className="cifras font-bold text-white">{bs(inicialEjemplo)}</span>
        </span>
      </div>
      <p className="flex animate-entrar items-center gap-1.5 rounded-full bg-exito-50 px-3 py-1.5 text-mini text-exito-800 [animation-delay:240ms]">
        <HugeiconsIcon icon={SecurityCheckIcon} size={14} strokeWidth={2} aria-hidden />
        {t.sinGarantia}
      </p>
    </div>
  );
}

/** Pantalla 3: pagar con QR y el aviso de WhatsApp. */
function PantallaPago() {
  return (
    <div className="space-y-3 px-4">
      <p className="font-titulo text-bloque font-bold text-secondary-950">{landing.celular.pago.titulo}</p>
      <p className="cifras -mt-2 font-titulo text-[1.75rem] font-bold text-secondary-950">{bs(inicialEjemplo)}</p>
      <div className="mx-auto w-36 animate-entrar">
        <CodigoQR semilla="landing" etiqueta={landing.celular.qr} />
      </div>
      <p className="flex animate-entrar items-center justify-center gap-1.5 rounded-full bg-exito-50 px-3 py-1.5 text-mini text-exito-800 [animation-delay:150ms]">
        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} strokeWidth={2} aria-hidden />
        {landing.celular.pago.recibido}
      </p>
      <div className="flex animate-aviso items-start gap-2 rounded-2xl bg-white p-2.5 shadow-md [animation-delay:600ms]">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-exito-500 text-white">
          <HugeiconsIcon icon={WhatsappIcon} size={16} strokeWidth={2} aria-hidden />
        </span>
        <span className="text-mini text-secondary-800">
          <b>{landing.celular.pago.remitente}</b>
          <br />
          {landing.celular.pago.mensaje}
        </span>
      </div>
    </div>
  );
}

const pantallas = [PantallaAgenda, PantallaOptica, PantallaPago];
const chipsPorPaso = landing.celular.chips;

export function PasosInteractivos() {
  const [paso, setPaso] = useState(0);
  const t = landing.pasos.lista[paso];
  const Pantalla = pantallas[paso];
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center lg:gap-16">
      <div>
        <Segmentado
          etiqueta={landing.pasos.etiqueta}
          valor={String(paso)}
          alCambiar={(v) => setPaso(Number(v))}
          opciones={landing.pasos.lista.map((p, i) => ({
            valor: String(i),
            texto: (
              <>
                <span className="cifras opacity-70">{i + 1}</span> {p.pestana}
              </>
            ),
          }))}
          className="max-w-lg"
        />
        <div key={paso} className="mt-8">
          <h3 className="animate-aparecer font-titulo text-[1.625rem] leading-tight font-medium lg:text-[2rem] [&_strong]:font-bold [&_strong]:text-primary-700">
            <ConNegrita texto={t.titulo} />
          </h3>
          <p className="mt-3 max-w-lg animate-aparecer text-entrada text-secondary-700 [animation-delay:100ms]">
            <ConNegrita texto={t.texto} />
          </p>
          <ul className="mt-6 space-y-3">
            {t.puntos.map((p, i) => (
              <li key={p} className="flex animate-entrar items-center gap-3 font-semibold text-secondary-900" style={{ animationDelay: `${200 + i * 100}ms` }}>
                <span className="flex size-7 items-center justify-center rounded-full bg-exito-100 text-exito-700">
                  <HugeiconsIcon icon={Tick02Icon} size={15} strokeWidth={2.75} aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 hidden max-w-xs lg:block">
            <BotonVerComo />
          </div>
        </div>
      </div>
      <div className="relative mt-12 lg:mt-0">
        <Celular>
          <div key={paso} className="h-full animate-paso-adelante">
            <Pantalla />
          </div>
        </Celular>
        {chipsPorPaso[paso].map((c, i) => (
          <ChipFlotante
            key={`${paso}-${i}`}
            emoji={c.emoji}
            texto={c.texto}
            tono={i === 1 ? "azul" : "blanco"}
            retraso={200 + i * 200}
            giro={i ? 4 : -5}
            className={i ? "right-0 bottom-20 lg:-right-6" : "-top-5 left-0 lg:top-16 lg:-left-8"}
          />
        ))}
      </div>
    </div>
  );
}
