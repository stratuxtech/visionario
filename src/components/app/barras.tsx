"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Calendar03Icon,
  Cancel01Icon,
  Coins01Icon,
  GlassesIcon,
  MedicalFileIcon,
  Notification01Icon,
  RouteIcon,
} from "@hugeicons/core-free-icons";
import { navegacion, rutas } from "@/content/visionario";
import { situacionActual, useApp, useHidratado } from "@/lib/estado";
import { Avatar } from "@/components/app/avatar";
import { Logo } from "@/components/marca/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Menú global de la app, en este orden: Mi cita es la pantalla inicial. */
const pestanas = [
  { href: rutas.agendar, etiqueta: navegacion.cita, icono: Calendar03Icon },
  { href: rutas.panel, etiqueta: navegacion.estado, icono: RouteIcon },
  { href: rutas.pagos, etiqueta: navegacion.pagos, icono: Coins01Icon },
  { href: rutas.monturas, etiqueta: navegacion.monturas, icono: GlassesIcon },
  { href: rutas.receta, etiqueta: navegacion.receta, icono: MedicalFileIcon },
];

function esActiva(ruta: string, href: string) {
  return href === rutas.panel ? ruta === href : ruta.startsWith(href);
}

/**
 * Hay novedad en "Estado" cuando la situación del paciente cambió desde la
 * última vez que la vio. La primera vez solo se toma nota, sin avisar.
 */
function useNovedadEstado() {
  const ruta = usePathname();
  const hidratado = useHidratado();
  const activa = useApp((s) => s.sesion.activa);
  const clave = useApp((s) => situacionActual(s).clave);
  const visto = useApp((s) => s.estadoVisto);
  const marcar = useApp((s) => s.marcarEstadoVisto);
  const enEstado = ruta === rutas.panel;

  useEffect(() => {
    if (!hidratado || !activa) return;
    if ((visto === null || enEstado) && visto !== clave) marcar(clave);
  }, [hidratado, activa, visto, clave, enEstado, marcar]);

  return hidratado && activa && visto !== null && visto !== clave && !enEstado;
}

/** El círculo rojo del menú: algo cambió en el estado del paciente. */
function PuntoNovedad({ className }: { className?: string }) {
  return (
    <>
      <span aria-hidden className={cn("absolute flex size-3.5", className)}>
        <span className="absolute inset-0 animate-ping rounded-full bg-alerta-500 opacity-60 motion-reduce:hidden" />
        <span className="relative size-3.5 rounded-full bg-alerta-500 ring-2 ring-white" />
      </span>
      <span className="sr-only">, {navegacion.conNovedades}</span>
    </>
  );
}

const estiloBarra = "sticky top-0 z-30 bg-white shadow-[0_1px_0_var(--color-secondary-100),0_6px_20px_-12px_rgb(11_27_56/0.18)]";

/** Barra superior con el logo oficial (homepage y acceso). */
export function BarraMarca({ children, enlaceLogo = rutas.inicio }: { children?: React.ReactNode; enlaceLogo?: string }) {
  return (
    <header className={estiloBarra}>
      <div className="contenedor flex h-16 items-center justify-between gap-3 lg:h-20">
        <Link href={enlaceLogo} className="rounded-sm" aria-label="Visionario, ir al inicio">
          <Logo prioridad className="w-32 lg:w-40" />
        </Link>
        {children && <div className="flex items-center gap-2 lg:gap-3">{children}</div>}
      </div>
    </header>
  );
}

/** Campana de notificaciones con contador de no leídas. */
export function BotonAvisos() {
  const ruta = usePathname();
  const hidratado = useHidratado();
  const sinLeer = useApp((s) => s.notificaciones.filter((n) => !n.leida).length);
  const n = hidratado ? sinLeer : 0;
  const actual = ruta === rutas.notificaciones;
  return (
    <Link
      href={rutas.notificaciones}
      aria-current={actual ? "page" : undefined}
      aria-label={n ? `${navegacion.avisos}: ${n} sin leer` : navegacion.avisos}
      className={cn(
        "relative flex size-11 items-center justify-center rounded-full text-secondary-800 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-primary-50",
        actual && "bg-primary-50 text-primary-700",
      )}
    >
      <HugeiconsIcon icon={Notification01Icon} size={24} strokeWidth={1.8} aria-hidden className={cn(n > 0 && "origin-top animate-[campana_2.6s_var(--ease-suave)_1]")} />
      {n > 0 && (
        <span className="cifras absolute top-0.5 right-0.5 flex min-w-5 animate-confirmar items-center justify-center rounded-full bg-alerta-500 px-1 text-mini leading-5 text-white ring-2 ring-white">
          {n}
        </span>
      )}
    </Link>
  );
}

/** Mi cuenta: la foto de perfil, siempre a la derecha de la barra superior. */
export function BotonCuenta() {
  const ruta = usePathname();
  const actual = ruta === rutas.cuenta;
  return (
    <Link
      href={rutas.cuenta}
      aria-label={navegacion.cuenta}
      aria-current={actual ? "page" : undefined}
      className="flex size-11 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-0.5"
    >
      <Avatar className={cn("size-10 ring-2 ring-offset-2 transition-shadow", actual ? "ring-primary-500" : "ring-primary-100")} />
    </Link>
  );
}

/**
 * Barra superior de las pantallas de la app: el título de la pantalla a la
 * izquierda (en celular y en computadora) y, a la derecha, notificaciones y
 * Mi cuenta. Blanca.
 */
export function BarraApp({ titulo }: { titulo: string }) {
  return (
    <header className={estiloBarra}>
      <div className="contenedor flex min-h-16 items-center justify-between gap-3 py-1.5 lg:min-h-20">
        <p aria-hidden className="line-clamp-2 min-w-0 font-titulo text-bloque leading-tight font-bold text-secondary-950 lg:text-[1.625rem]">
          {titulo}
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <BotonAvisos />
          <BotonCuenta />
        </div>
      </div>
    </header>
  );
}

/**
 * Pantalla completa de la app: barra superior, contenido y menú global.
 * El título visible vive en la barra; aquí se repite para lectores de pantalla.
 */
export function PantallaApp({
  titulo,
  ancho = "flujo",
  className,
  children,
}: {
  titulo: string;
  /** Se mantiene por compatibilidad: la barra ya no lleva logo */
  logo?: boolean;
  ancho?: "flujo" | "ancho";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <BarraApp titulo={titulo} />
      <main className={cn(ancho === "ancho" ? "contenedor" : "contenedor-flujo", "flex flex-1 flex-col pt-5 pb-menu lg:pt-10", className)}>
        <h1 className="sr-only">{titulo}</h1>
        {children}
      </main>
      <BarraInferior />
    </>
  );
}

/**
 * Barra de un flujo lineal (registro, datos, proceso, orden, contrato, pago):
 * volver (o cerrar), título corto y el avance por pasos.
 */
export function BarraFlujo({
  titulo,
  paso,
  total,
  alVolver,
  volverA,
  cerrar = false,
}: {
  titulo: string;
  paso?: number;
  total?: number;
  alVolver?: () => void;
  volverA?: string;
  /** Muestra una X en vez de la flecha (pantallas que se abren encima) */
  cerrar?: boolean;
}) {
  const router = useRouter();
  const volver = () => {
    if (alVolver) return alVolver();
    if (volverA) return router.push(volverA);
    router.back();
  };

  return (
    <header className={estiloBarra}>
      <div className="mx-auto flex h-16 w-full items-center gap-2 px-2 lg:h-20 lg:max-w-6xl lg:gap-4 lg:px-10">
        <Link href={rutas.inicio} className="mr-2 hidden rounded-sm lg:block" aria-label="Visionario, ir al inicio">
          <Logo className="w-36" />
        </Link>
        <span className="hidden h-8 w-px bg-border lg:block" aria-hidden />
        <Button
          variant="ghost"
          size="icon"
          onClick={volver}
          aria-label={cerrar ? navegacion.cerrar : navegacion.volver}
          className="rounded-full"
        >
          <HugeiconsIcon icon={cerrar ? Cancel01Icon : ArrowLeft01Icon} strokeWidth={2} aria-hidden />
        </Button>
        <h1 className="min-w-0 flex-1 truncate font-titulo text-entrada font-bold text-secondary-950">{titulo}</h1>
        {paso && total && (
          <p className="cifras mr-3 rounded-full bg-primary-50 px-3 py-1 text-meta font-bold text-primary-800 lg:mr-0">
            {navegacion.pasoDe(paso, total)}
          </p>
        )}
      </div>
      {paso && total && (
        <div className="contenedor-flujo flex gap-1.5 pb-3" aria-hidden>
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-secondary-100">
              <span
                className={cn(
                  "absolute inset-0 origin-left rounded-full bg-primary-500 transition-transform duration-700 ease-resorte",
                  i < paso ? "scale-x-100" : "scale-x-0",
                )}
              />
            </span>
          ))}
        </div>
      )}
    </header>
  );
}

/**
 * Menú global, siempre abajo (también en computadora): blanco, a todo el
 * ancho, con las pestañas centradas. La pestaña activa enciende su ícono.
 */
export function BarraInferior() {
  const ruta = usePathname();
  const novedad = useNovedadEstado();
  return (
    <nav
      aria-label={navegacion.menuPrincipal}
      className="fixed inset-x-0 bottom-0 z-30 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_0_var(--color-secondary-100),0_-10px_30px_-14px_rgb(11_27_56/0.22)]"
    >
      <ul className="mx-auto grid h-(--alto-menu) max-w-xl grid-cols-5 px-1 lg:max-w-2xl">
        {pestanas.map(({ href, etiqueta, icono }) => {
          const activa = esActiva(ruta, href);
          return (
            <li key={href} className="flex">
              <Link
                href={href}
                aria-current={activa ? "page" : undefined}
                className={cn(
                  "group flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl text-meta no-underline transition-colors duration-300",
                  activa ? "font-bold text-primary-700" : "font-semibold text-secondary-600 hover:text-secondary-950",
                )}
              >
                <span
                  className={cn(
                    "relative flex h-9 w-14 items-center justify-center rounded-full transition-[background-color,box-shadow,transform] duration-300 ease-resorte",
                    activa
                      ? "animate-elegir bg-primary-600 text-white shadow-brillo"
                      : "group-hover:-translate-y-0.5 group-hover:bg-primary-50 group-hover:text-primary-700",
                  )}
                >
                  <HugeiconsIcon icon={icono} size={22} strokeWidth={activa ? 2.2 : 1.8} aria-hidden />
                  {href === rutas.panel && novedad && <PuntoNovedad className="-top-0.5 right-2" />}
                </span>
                {etiqueta}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * Acción principal de la pantalla. En celular queda fija abajo, al alcance
 * del pulgar, sobre un vidrio (sobre el menú global si `sobreMenu`). En
 * computadora se ubica al final del contenido.
 */
export function AccionFija({
  children,
  className,
  sobreMenu = false,
}: {
  children: React.ReactNode;
  className?: string;
  sobreMenu?: boolean;
}) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 z-20 mx-auto max-w-md px-5 pt-3",
        "bg-linear-to-t from-background via-background/90 to-background/0",
        sobreMenu ? "bottom-menu pb-3" : "pb-seguro bottom-0",
        "lg:static lg:z-auto lg:mx-auto lg:mb-16 lg:w-full lg:max-w-xl lg:bg-none lg:px-0 lg:pt-0 lg:pb-0",
        sobreMenu && "lg:mb-[calc(var(--alto-menu)+2rem)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
