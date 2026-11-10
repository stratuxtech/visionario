"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon, GlassesIcon } from "@hugeicons/core-free-icons";
import { catalogo, monturas, navegacion, rutas, type PublicoMontura } from "@/content/visionario";
import { useApp, useHidratado } from "@/lib/estado";
import { AccionFija, BarraFlujo, PantallaApp } from "@/components/app/barras";
import { Button, Flecha } from "@/components/ui/button";
import { Segmentado } from "@/components/ui/opciones";
import { cn } from "@/lib/utils";

export function Catalogo() {
  const hidratado = useHidratado();
  const alternar = useApp((s) => s.alternarMontura);
  const sesion = useApp((s) => s.sesion.activa);
  const marcadas = useApp((s) => s.monturasInteres);
  const [publico, setPublico] = useState<PublicoMontura>("adultos");
  const conSesion = hidratado && sesion;
  const interes = hidratado ? marcadas : [];
  const lista = monturas.filter((m) => m.publico === publico);

  const contenido = (
    <>
      <Segmentado
        etiqueta="Tipo de montura"
        valor={publico}
        alCambiar={setPublico}
        opciones={(Object.keys(catalogo.publicos) as PublicoMontura[]).map((p) => ({
          valor: p,
          texto: (
            <>
              {catalogo.publicos[p]} <span className="cifras opacity-70">· 10</span>
            </>
          ),
        }))}
        className="lg:max-w-sm"
      />

      <ul
        id="lista-monturas"
        role="tabpanel"
        aria-labelledby={`tab-${publico}`}
        key={publico}
        className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5"
      >
        {lista.map((m) => {
          const marcada = interes.includes(m.id);
          return (
            <li
              key={m.id}
              className="group tarjeta animate-entrar overflow-hidden transition-[transform,box-shadow] duration-300 ease-salida hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${(lista.indexOf(m) % 8) * 60}ms` }}
            >
              <div className="relative aspect-4/5 overflow-hidden bg-primary-50">
                {m.imagen ? (
                  <Image src={m.imagen} alt={`Montura ${m.nombre}`} fill sizes="(min-width: 1024px) 260px, (min-width: 640px) 30vw, 45vw" className="object-cover transition-transform duration-700 ease-resorte group-hover:scale-105" />
                ) : (
                  <span className="flex size-full items-center justify-center text-secondary-400">
                    <HugeiconsIcon icon={GlassesIcon} size={40} strokeWidth={1.25} aria-hidden />
                  </span>
                )}
                <span className="vidrio absolute top-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-mini text-secondary-900">{m.codigo}</span>
                <button
                  type="button"
                  onClick={() => alternar(m.id)}
                  aria-pressed={marcada}
                  aria-label={`${catalogo.meInteresa}: ${m.nombre}`}
                  className={cn(
                    "absolute top-2 right-2 flex size-11 items-center justify-center rounded-full transition-[background-color,color,transform,box-shadow] duration-300 ease-rebote hover:scale-110",
                    marcada ? "animate-elegir bg-alerta-500 text-white shadow-md" : "vidrio text-secondary-800",
                  )}
                >
                  <HugeiconsIcon icon={FavouriteIcon} size={20} strokeWidth={marcada ? 2.25 : 2} aria-hidden className={cn(marcada && "[&_path]:fill-current")} />
                </button>
              </div>
              <div className="px-3.5 py-3">
                <p className="min-w-0 truncate font-titulo text-bloque leading-tight font-bold text-secondary-950">{m.nombre}</p>
                <p className="text-mini font-semibold text-secondary-600">{marcada ? catalogo.marcada : catalogo.publicos[m.publico]}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );

  /* Con cuenta: es una pantalla más de la app */
  if (conSesion) {
    return (
      <PantallaApp titulo={navegacion.titulos.monturas} ancho="ancho">
        {contenido}
      </PantallaApp>
    );
  }

  /* Sin cuenta: se puede mirar el catálogo antes de registrarse */
  return (
    <>
      <BarraFlujo titulo={catalogo.titulo} volverA={rutas.inicio} />
      <main className="contenedor flex-1 pt-4 pb-32 lg:pt-10 lg:pb-8">
        <h1 className="sr-only">{catalogo.titulo}</h1>
        {contenido}
      </main>
      <AccionFija>
        <Button asChild size="lg">
          <Link href={rutas.registro}>
            {interes.length
              ? `${catalogo.agendar} · ${interes.length} ${interes.length === 1 ? "elegida" : "elegidas"}`
              : catalogo.agendar}
            <Flecha />
          </Link>
        </Button>
      </AccionFija>
    </>
  );
}
