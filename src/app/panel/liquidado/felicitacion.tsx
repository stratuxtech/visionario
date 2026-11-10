"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, NecklaceIcon, SunglassesIcon } from "@hugeicons/core-free-icons";
import { cupones, liquidacion as t, negocio, rutas } from "@/content/visionario";
import { useApp } from "@/lib/estado";
import { useGuardia } from "@/lib/guardias";
import { BarraApp } from "@/components/app/barras";
import { BarraCuotas } from "@/components/cuotas/barra-cuotas";
import { Festejo } from "@/components/app/festejo";
import { Button, Flecha } from "@/components/ui/button";

export function Felicitacion() {
  const router = useRouter();
  const listo = useGuardia();
  const liquidado = useApp((s) => s.liquidadoEl);
  const cupon = useApp((s) => s.cupon);
  const usarBeneficio = useApp((s) => s.usarBeneficio);
  const b = cupones.liquidacion;
  const usado = cupon?.codigo === b.codigo;

  useEffect(() => {
    if (listo && !liquidado) router.replace(rutas.panel);
  }, [listo, liquidado, router]);

  if (!listo || !liquidado) return null;

  return (
    <>
      <BarraApp titulo="¡Felicidades!" />
      <main className="contenedor flex-1 pt-10 pb-16 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <section className="text-center lg:text-left">
            <Festejo emojis={["🎉", "👓", "💛", "🥳", "✨", "🎊"]} tono="oro" className="lg:mx-0" />
            <h1 className="mt-8 animate-aparecer text-titular [animation-delay:200ms]">{t.titulo}</h1>
            <p className="mx-auto mt-5 max-w-md animate-aparecer font-destacado [animation-delay:300ms] text-destacado text-secondary-900 italic lg:mx-0">
              {t.destacado}
            </p>
            <div className="mx-auto mt-8 max-w-sm lg:mx-0">
              <BarraCuotas pagadas={negocio.cuotas.cantidad} total={negocio.cuotas.cantidad} animarUltima />
              <p className="mt-3 flex items-center justify-center gap-2 text-meta font-bold text-exito-800 lg:justify-start">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} strokeWidth={2} aria-hidden />
                3 de 3 cuotas pagadas
              </p>
            </div>
          </section>

          <div className="space-y-4">
            <section className="flex animate-entrar items-start gap-4 rounded-[2rem] bg-oro-100 p-5 ring-1 ring-oro-200 [animation-delay:400ms]">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-oro-800 shadow-sm">
                <HugeiconsIcon icon={NecklaceIcon} size={24} strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <h2 className="text-bloque">{t.joya.titulo}</h2>
                <p className="mt-1 text-secondary-800">{t.joya.texto}</p>
              </div>
            </section>

            <section aria-labelledby="beneficio" className="animate-entrar overflow-hidden rounded-[2rem] bg-secondary-950 text-white shadow-lg [animation-delay:550ms]">
              <div className="p-5 lg:p-7">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-brillo">
                  <HugeiconsIcon icon={SunglassesIcon} size={26} strokeWidth={1.75} aria-hidden />
                </span>
                <h2 id="beneficio" className="mt-4 font-titulo text-seccion text-white">
                  {t.beneficio.titulo(b.producto)}
                </h2>
                <p className="mt-2 text-secondary-200">{t.beneficio.texto(b.porcentaje)}</p>
                <p className="mt-5 text-meta text-secondary-300">{t.beneficio.codigo}</p>
                <p className="cifras mt-1 inline-block rounded-2xl border-2 border-dashed border-primary-300 px-4 py-2 font-titulo text-seccion font-bold tracking-wider text-primary-300">
                  {b.codigo} · {b.porcentaje}%
                </p>
              </div>
              <div className="border-t border-white/10 bg-secondary-900 p-5">
                {usado ? (
                  <p role="status" className="mb-3 flex items-center gap-2 text-meta font-semibold text-primary-300">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} strokeWidth={2} aria-hidden />
                    {t.beneficio.usado}
                  </p>
                ) : null}
                <Button
                  size="lg"
                  variant="claro"
                  onClick={() => {
                    usarBeneficio();
                    router.push(rutas.agendar);
                  }}
                >
                  {t.beneficio.accion}
                  <Flecha />
                </Button>
              </div>
            </section>

            <p className="text-meta text-secondary-700">{t.renovacion}</p>
            <Button asChild variant="outline">
              <Link href={rutas.panel}>{t.volver}</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
