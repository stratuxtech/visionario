"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { proceso, rutas } from "@/content/visionario";
import { useApp, useHidratado } from "@/lib/estado";
import { AccionFija, BarraFlujo } from "@/components/app/barras";
import { Button, Flecha } from "@/components/ui/button";
import { ChipFlotante } from "@/components/ui/chip-flotante";
import { ConNegrita, sinMarcas } from "@/components/ui/con-negrita";
import { cn } from "@/lib/utils";

/* Dónde flota cada chip alrededor de la foto */
const lugares = ["top-6 -left-3 lg:-left-8", "top-1/2 -right-3 lg:-right-10", "bottom-8 left-4 lg:-left-6"];
const giros = [-5, 4, -2];

/** La foto del paso con sus chips flotando. Se monta de nuevo en cada paso para animar. */
function Escena({ d, activa }: { d: (typeof proceso.diapositivas)[number]; activa: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[19rem] lg:max-w-sm">
      <span aria-hidden className="absolute -inset-4 rounded-[2.5rem] bg-primary-200/50 blur-2xl" />
      <div className={cn("relative aspect-4/5 max-h-[46dvh] w-full overflow-hidden rounded-[2rem] bg-primary-100 shadow-lg ring-4 ring-white lg:max-h-none", activa && "animate-[aparecer_800ms_var(--ease-resorte)_both]")}>
        <Image
          src={d.foto.src}
          alt={d.foto.alt}
          fill
          sizes="(min-width: 1024px) 384px, 304px"
          className={cn("object-cover transition-transform duration-[1400ms] ease-resorte", activa ? "scale-100" : "scale-110")}
          priority={d.id === "cuotas"}
        />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-secondary-950/30 to-transparent" />
      </div>
      {activa &&
        d.chips.map((c, i) => (
          <ChipFlotante key={`${d.id}-${i}`} emoji={c.emoji} texto={c.texto} tono={i === 2 ? "azul" : "blanco"} retraso={350 + i * 220} giro={giros[i]} className={lugares[i]} />
        ))}
    </div>
  );
}

/**
 * "Cómo funciona": tres pasos con foto y chips animados. Se desliza con el
 * dedo. Desde la homepage se abre encima y la X vuelve a la homepage.
 */
export function Carrusel() {
  const router = useRouter();
  const hidratado = useHidratado();
  const sesion = useApp((s) => s.sesion.activa);
  const marcarVisto = useApp((s) => s.marcarProcesoVisto);
  const [repaso] = useState(() => useApp.getState().procesoVisto);
  const pista = useRef<HTMLDivElement>(null);
  const [indice, setIndice] = useState(0);
  const total = proceso.diapositivas.length;
  const ultima = indice === total - 1;
  const visitante = hidratado && !sesion;

  useEffect(() => {
    if (hidratado && sesion) marcarVisto();
  }, [hidratado, sesion, marcarVisto]);

  // Sincroniza el indicador con el desplazamiento (deslizar con el dedo)
  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    const alMover = () => setIndice(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", alMover, { passive: true });
    return () => el.removeEventListener("scroll", alMover);
  }, []);

  const ir = (n: number) => {
    const el = pista.current;
    if (!el) return;
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: n * el.clientWidth, behavior: reducir ? "auto" : "smooth" });
    setIndice(n);
  };

  const salir = visitante ? rutas.inicio : repaso ? rutas.panel : rutas.agendar;
  const terminar = () => router.push(visitante ? rutas.registro : salir);
  const textoFinal = visitante ? proceso.finalVisitante : repaso ? proceso.finalRepaso : proceso.final;

  return (
    <>
      <BarraFlujo titulo={proceso.titulo} paso={indice + 1} total={total} volverA={salir} cerrar={visitante || repaso} />

      <main className="flex flex-1 flex-col pb-36 lg:mx-auto lg:w-full lg:max-w-5xl lg:justify-center lg:pb-10">
        <div
          ref={pista}
          className="sin-barra flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
          aria-roledescription="carrusel"
          aria-label={proceso.titulo}
        >
          {proceso.diapositivas.map((d, i) => (
            <section
              key={d.id}
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${total}: ${sinMarcas(d.titulo)}`}
              aria-hidden={i !== indice}
              className="w-full shrink-0 snap-center px-6 pt-8 pb-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:pt-12 lg:pb-12"
            >
              <Escena d={d} activa={i === indice} />
              <div className="mt-10 lg:mt-0">
                <p className="text-meta font-bold text-primary-700">
                  {i + 1} / {total}
                </p>
                <h2
                  key={i === indice ? `t-${indice}` : undefined}
                  className={cn(
                    "mt-2 font-titulo text-[1.75rem] leading-[1.15] font-medium text-secondary-900 lg:text-[2.5rem] [&_strong]:font-bold [&_strong]:text-primary-700",
                    i === indice && "animate-aparecer [animation-delay:120ms]",
                  )}
                >
                  <ConNegrita texto={d.titulo} />
                </h2>
                {/* En computadora los controles van junto al texto */}
                <div className="mt-10 hidden items-center gap-3 lg:flex">
                  <Button variant="outline" size="icon" className="size-14 shrink-0" onClick={() => ir(indice - 1)} disabled={indice === 0} aria-label={proceso.anterior}>
                    <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} aria-hidden />
                  </Button>
                  <Button size="lg" className="flex-1" onClick={ultima ? terminar : () => ir(indice + 1)} tabIndex={i === indice ? 0 : -1}>
                    {ultima ? textoFinal : proceso.siguiente}
                    <Flecha />
                  </Button>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2 lg:mt-12" role="tablist" aria-label="Pasos">
          {proceso.diapositivas.map((d, i) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={i === indice}
              aria-label={`Ir al paso ${i + 1}`}
              onClick={() => ir(i)}
              className="flex h-8 items-center px-1"
            >
              <span
                className={cn(
                  "block h-2.5 rounded-full transition-all duration-500 ease-resorte",
                  i === indice ? "w-9 bg-primary-600 shadow-brillo" : "w-2.5 bg-secondary-300 hover:bg-secondary-400",
                )}
              />
            </button>
          ))}
        </div>
      </main>

      <AccionFija className="flex gap-3 lg:hidden">
        <Button variant="outline" size="icon" className="size-14 shrink-0" onClick={() => ir(indice - 1)} disabled={indice === 0} aria-label={proceso.anterior}>
          <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} aria-hidden />
        </Button>
        <Button size="lg" className="flex-1" onClick={ultima ? terminar : () => ir(indice + 1)}>
          {ultima ? textoFinal : proceso.siguiente}
          <Flecha />
        </Button>
      </AccionFija>
    </>
  );
}
