import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  Calendar03Icon,
  Coins01Icon,
  GlassesIcon,
  NecklaceIcon,
  SparklesIcon,
  Tick02Icon,
  UserGroupIcon,
  Alert02Icon,
  RouteIcon,
} from "@hugeicons/core-free-icons";
import { landing, marca, negocio, optica, rutas } from "@/content/visionario";
import { BarraMarca } from "@/components/app/barras";
import { Logo } from "@/components/marca/logo";
import { Button, Flecha } from "@/components/ui/button";
import { ChipFlotante } from "@/components/ui/chip-flotante";
import { ConNegrita, Titular } from "@/components/ui/con-negrita";
import { Revelar } from "@/components/ui/revelar";
import { AccesoBarra, BotonAgendar, BotonVerComo, Comparacion, PasosInteractivos } from "@/components/landing/interactivos";
import { bs } from "@/lib/utils";

/** Etiqueta de sección (referencia: Pling): ícono en un círculo tenue y texto azul. */
function Etiqueta({ icono, children }: { icono: IconSvgElement; children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-meta font-semibold text-primary-700">
      <span className="flex size-7 items-center justify-center rounded-full bg-primary-100">
        <HugeiconsIcon icon={icono} size={15} strokeWidth={2} aria-hidden />
      </span>
      {children}
    </p>
  );
}

/* Escala de dioptrías: dónde empieza "a medida" (desde 4) */
function EscalaDioptrias() {
  const marcas = [0, 2, 4, 6, 8, 10];
  const corte = (negocio.medidaMinimaDioptrias / 10) * 100;
  return (
    <figure className="tarjeta p-5 lg:p-6">
      <div className="relative h-3 overflow-hidden rounded-full bg-secondary-100" aria-hidden>
        <span className="absolute inset-y-0 right-0 rounded-full bg-linear-to-r from-primary-400 to-primary-600" style={{ left: `${corte}%` }} />
      </div>
      <div className="cifras relative mt-2 h-5 text-meta text-muted-foreground" aria-hidden>
        {marcas.map((m) => (
          <span key={m} className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full" style={{ left: `${m * 10}%` }}>
            {m === 10 ? "10+" : m}
          </span>
        ))}
      </div>
      <figcaption className="mt-4 grid grid-cols-2 gap-3 text-meta">
        <span className="flex items-start gap-2 text-secondary-700">
          <span className="mt-1 size-3 shrink-0 rounded-full bg-secondary-200" aria-hidden />
          {landing.paraQuien.escala.comun}
        </span>
        <span className="flex items-start gap-2 font-bold text-secondary-950">
          <span className="mt-1 size-3 shrink-0 rounded-full bg-primary-600" aria-hidden />
          {landing.paraQuien.escala.medida}
        </span>
      </figcaption>
    </figure>
  );
}

/* Las 3 cuotas iguales y la joya que vuelve */
function PlanCuotas() {
  const t = landing.cuotas;
  const cuota = t.ejemplo / negocio.cuotas.cantidad;
  return (
    <ol className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {t.pasos.map((cuando, i) => (
        <Revelar como="li" key={cuando} retraso={i * 120} className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/10 lg:p-6">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary-600 font-titulo font-bold text-white">{i + 1}</span>
          <p className="cifras mt-4 font-titulo text-[1.75rem] leading-none font-bold text-white lg:text-[2.25rem]">{bs(cuota)}</p>
          <p className="mt-1 text-meta text-secondary-200">{cuando}</p>
        </Revelar>
      ))}
      <Revelar como="li" retraso={360} className="rounded-3xl bg-oro-300 p-4 text-oro-800 lg:p-6">
        <span className="flex size-9 items-center justify-center rounded-full bg-white">
          <HugeiconsIcon icon={NecklaceIcon} size={18} strokeWidth={2} aria-hidden />
        </span>
        <p className="mt-4 font-titulo text-bloque leading-tight font-bold text-secondary-950 lg:text-[1.5rem]">{t.final} 💛</p>
      </Revelar>
    </ol>
  );
}

const iconosDolor = [Coins01Icon, SparklesIcon, GlassesIcon, Alert02Icon];

export default function Inicio() {
  const h = landing.heroe;
  return (
    <>
      <BarraMarca>
        <Link href="#como-funciona" className="hidden rounded-full px-4 py-2 font-semibold text-secondary-800 no-underline transition-colors hover:bg-primary-50 lg:block">
          {landing.pasos.etiqueta}
        </Link>
        <Link href={rutas.monturas} className="hidden rounded-full px-4 py-2 font-semibold text-secondary-800 no-underline transition-colors hover:bg-primary-50 lg:block">
          {landing.catalogo.etiqueta}
        </Link>
        <AccesoBarra />
      </BarraMarca>

      <main className="flex-1 overflow-x-clip">
        {/* ------------------------------------------------ Héroe */}
        <section className="contenedor pt-8 pb-16 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-12 lg:pt-16 lg:pb-24">
          <div>
            <div className="animate-aparecer">
              <Etiqueta icono={GlassesIcon}>{h.etiqueta}</Etiqueta>
            </div>
            <h1 className="mt-4 animate-aparecer text-titular [animation-delay:100ms]">
              <Titular partes={h.titulo} />
            </h1>
            <p className="mt-5 max-w-xl animate-aparecer text-entrada text-secondary-700 [animation-delay:200ms] lg:text-[1.25rem]">
              <ConNegrita texto={h.bajada} />
            </p>
            <div className="mt-8 flex animate-aparecer flex-col gap-3 [animation-delay:300ms] lg:flex-row">
              <BotonAgendar className="lg:w-auto" />
              <BotonVerComo className="lg:w-auto" />
            </div>
            <ul className="mt-7 flex animate-aparecer flex-wrap gap-2 [animation-delay:400ms]">
              {h.pruebas.map((p) => (
                <li key={p} className="vidrio flex items-center gap-1.5 rounded-full py-1.5 pr-3.5 pl-1.5 text-meta font-bold text-secondary-900">
                  <span className="flex size-6 items-center justify-center rounded-full bg-exito-100 text-exito-700">
                    <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={2.75} aria-hidden />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* La foto con la app flotando alrededor */}
          <div className="relative mx-auto mt-14 w-full max-w-sm lg:mt-0 lg:max-w-md">
            <span aria-hidden className="absolute -inset-8 rounded-full bg-primary-300/40 blur-3xl" />
            <span aria-hidden className="absolute -right-6 -bottom-6 size-40 rounded-full bg-oro-300/50 blur-3xl" />
            <div className="relative aspect-4/5 animate-[aparecer_1s_var(--ease-resorte)_both] overflow-hidden rounded-[2.5rem] shadow-lg ring-8 ring-white">
              <Image src={h.foto.src} alt={h.foto.alt} fill priority sizes="(min-width: 1024px) 448px, 384px" className="object-cover" />
            </div>
            <ChipFlotante icono={Calendar03Icon} texto={h.chips.cita} retraso={600} giro={-4} className="-top-4 -left-3 lg:-left-12" />
            <ChipFlotante emoji="✅" texto={h.chips.cuota} tono="exito" retraso={850} giro={3} className="top-1/3 -right-3 lg:-right-10" />
            <ChipFlotante emoji="💬" texto={h.chips.listo} tono="azul" retraso={1100} giro={-2} className="bottom-16 -left-4 lg:-left-14" />
            <ChipFlotante icono={NecklaceIcon} texto={h.chips.joya} tono="oro" retraso={1350} giro={4} className="-right-2 -bottom-4 lg:right-6" />
          </div>
        </section>

        {/* ------------------------------------------------ El problema */}
        <section aria-labelledby="dolor" className="contenedor py-16 lg:py-24">
          <Revelar>
            <Etiqueta icono={Alert02Icon}>{landing.dolor.etiqueta}</Etiqueta>
            <h2 id="dolor" className="mt-3 max-w-3xl text-seccion">
              <Titular partes={landing.dolor.titulo} />
            </h2>
          </Revelar>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {landing.dolor.datos.map((d, i) => {
              const oscura = i === 1;
              return (
                <Revelar
                  como="li"
                  key={d.cifra}
                  retraso={i * 110}
                  className={oscura ? "rounded-[2rem] bg-secondary-950 p-6 text-secondary-200 shadow-lg [&_strong]:text-white" : "tarjeta p-6 text-secondary-700"}
                >
                  <span className={oscura ? "flex size-11 items-center justify-center rounded-2xl bg-white/10 text-primary-300" : "flex size-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-700"}>
                    <HugeiconsIcon icon={iconosDolor[i]} size={22} strokeWidth={1.8} aria-hidden />
                  </span>
                  <p className={oscura ? "cifras mt-5 font-titulo text-[2rem] leading-none font-bold text-white" : "cifras mt-5 font-titulo text-[2rem] leading-none font-bold text-primary-700"}>{d.cifra}</p>
                  <p className="mt-3">
                    <ConNegrita texto={d.texto} />
                  </p>
                  {"fuente" in d && <p className="mt-3 text-mini text-secondary-400">{d.fuente}</p>}
                </Revelar>
              );
            })}
          </ul>
        </section>

        {/* ------------------------------------------------ Hoy vs. con Visionario */}
        <section aria-labelledby="comparacion" className="contenedor py-16 text-center lg:py-24">
          <Revelar>
            <Etiqueta icono={SparklesIcon}>{landing.comparacion.etiqueta}</Etiqueta>
            <h2 id="comparacion" className="mx-auto mt-3 max-w-2xl text-seccion">
              <Titular partes={landing.comparacion.titulo} />
            </h2>
          </Revelar>
          <div className="mt-10 text-left">
            <Comparacion />
          </div>
        </section>

        {/* ------------------------------------------------ Cómo funciona */}
        <section id="como-funciona" aria-labelledby="pasos" className="contenedor scroll-mt-24 py-16 lg:py-24">
          <Revelar>
            <Etiqueta icono={RouteIcon}>{landing.pasos.etiqueta}</Etiqueta>
            <h2 id="pasos" className="mt-3 max-w-2xl text-seccion">
              <Titular partes={landing.pasos.titulo} />
            </h2>
          </Revelar>
          <div className="mt-10">
            <PasosInteractivos />
          </div>
          <div className="mt-10 lg:hidden">
            <BotonVerComo />
          </div>
        </section>

        {/* ------------------------------------------------ Para quién */}
        <section aria-labelledby="para-quien" className="contenedor py-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <div>
            <Revelar>
              <Etiqueta icono={UserGroupIcon}>{landing.paraQuien.etiqueta}</Etiqueta>
              <h2 id="para-quien" className="mt-3 text-seccion">
                <Titular partes={landing.paraQuien.titulo} />
              </h2>
              <p className="mt-4 max-w-xl text-entrada text-secondary-700">
                <ConNegrita texto={landing.paraQuien.texto} />
              </p>
            </Revelar>
            <Revelar retraso={150} className="mt-8">
              <EscalaDioptrias />
              <p className="mt-5 flex items-center gap-2.5 text-secondary-800">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-exito-100 text-exito-700">
                  <HugeiconsIcon icon={Tick02Icon} size={16} strokeWidth={2.75} aria-hidden />
                </span>
                <span>
                  <ConNegrita texto={landing.paraQuien.noSabe} />
                </span>
              </p>
            </Revelar>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-3 lg:mt-0 lg:gap-4">
            {landing.paraQuien.fotos.map((f, i) => (
              <Revelar como="li" key={f.src} retraso={i * 120} className={i % 2 ? "translate-y-8" : ""}>
                <figure className="group relative aspect-3/4 overflow-hidden rounded-[1.75rem] shadow-md ring-4 ring-white">
                  <Image src={f.src} alt={f.alt} fill sizes="(min-width: 1024px) 280px, 45vw" className="object-cover transition-transform duration-700 ease-resorte group-hover:scale-105" />
                  <figcaption className="vidrio absolute bottom-3 left-3 rounded-full px-3 py-1 text-meta font-bold text-secondary-950">{f.rol}</figcaption>
                </figure>
              </Revelar>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------ Cuotas */}
        <section aria-labelledby="cuotas" className="contenedor py-16 lg:py-24">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-secondary-950 px-5 py-10 shadow-lg lg:px-14 lg:py-16">
            <span aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-primary-500/40 blur-3xl" />
            <span aria-hidden className="absolute -bottom-32 -left-16 size-72 rounded-full bg-oro-400/20 blur-3xl" />
            <div className="relative">
              <p className="inline-flex items-center gap-2 text-meta font-semibold text-primary-300">
                <span className="flex size-7 items-center justify-center rounded-full bg-white/10">
                  <HugeiconsIcon icon={Coins01Icon} size={15} strokeWidth={2} aria-hidden />
                </span>
                {landing.cuotas.etiqueta}
              </p>
              <h2 id="cuotas" className="mt-3 text-seccion text-white">
                {landing.cuotas.titulo.antes} <span className="resaltado resaltado-claro">{landing.cuotas.titulo.resaltado}</span> {landing.cuotas.titulo.despues}
              </h2>
              <div className="mt-8 lg:mt-12">
                <PlanCuotas />
              </div>
              <div className="mt-8 space-y-2 text-secondary-200 lg:flex lg:gap-10 lg:space-y-0 [&_strong]:text-white">
                <p>
                  <ConNegrita texto={landing.cuotas.nota} />
                </p>
                <p className="shrink-0">
                  <ConNegrita texto={landing.cuotas.gracia} />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ Monturas */}
        <section aria-labelledby="catalogo" className="contenedor py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center lg:gap-16 lg:py-24">
          <Revelar>
            <Etiqueta icono={GlassesIcon}>{landing.catalogo.etiqueta}</Etiqueta>
            <h2 id="catalogo" className="mt-3 text-seccion">
              <Titular partes={landing.catalogo.titulo} />
            </h2>
            <p className="mt-4 text-entrada text-secondary-700">
              <ConNegrita texto={landing.catalogo.texto} />
            </p>
            <Button asChild variant="outline" size="lg" className="mt-8 lg:w-auto">
              <Link href={rutas.monturas}>
                {landing.catalogo.accion}
                <Flecha />
              </Link>
            </Button>
          </Revelar>
          <div className="mt-10 grid grid-cols-3 gap-3 lg:mt-0">
            {landing.catalogo.fotos.map((src, i) => (
              <Revelar key={src} retraso={i * 120} className={i === 1 ? "-translate-y-6" : ""}>
                <div className="group relative aspect-3/4 overflow-hidden rounded-[1.5rem] shadow-md ring-4 ring-white">
                  <Image src={src} alt="" fill sizes="(min-width: 1024px) 220px, 30vw" className="object-cover transition-transform duration-700 ease-resorte group-hover:scale-110" />
                </div>
              </Revelar>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------ Cierre */}
        <section className="contenedor pt-8 pb-16 lg:pb-24">
          <Revelar className="relative overflow-hidden rounded-[2.5rem] bg-primary-600 px-6 py-12 text-center shadow-brillo-fuerte lg:py-20">
            <span aria-hidden className="absolute -top-20 -left-20 size-64 rounded-full bg-primary-400/60 blur-3xl" />
            <span aria-hidden className="absolute -right-10 -bottom-24 size-64 rounded-full bg-oro-300/40 blur-3xl" />
            <div className="relative">
              <h2 className="text-titular text-white">
                {landing.cierre.titulo.antes} <span className="resaltado resaltado-claro">{landing.cierre.titulo.resaltado}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-entrada text-primary-50 [&_strong]:text-white">
                <ConNegrita texto={landing.cierre.texto} />
              </p>
              <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 lg:max-w-xl lg:flex-row lg:justify-center">
                <Button asChild variant="claro" size="lg" className="lg:w-auto">
                  <Link href={rutas.registro}>
                    {landing.cierre.accion}
                    <Flecha />
                  </Link>
                </Button>
                <BotonVerComo variante="vidrio" className="lg:w-auto" />
              </div>
            </div>
          </Revelar>
        </section>
      </main>

      <footer className="bg-white">
        <div className="contenedor space-y-5 pt-12 pb-12 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-12 lg:space-y-0">
          <Logo variante="completo" className="w-48" />
          <div className="space-y-3 text-meta text-secondary-700">
            <p>{landing.pie.requisitos}</p>
            <p>
              {optica.nombre} · {optica.direccion}
              <br />
              <span className="text-muted-foreground">{optica.referencia}</span>
            </p>
          </div>
          <div className="space-y-1 text-meta text-muted-foreground">
            <p>
              © {marca.nombre} · {marca.ciudad}
            </p>
            <p>{landing.pie.creditos}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
