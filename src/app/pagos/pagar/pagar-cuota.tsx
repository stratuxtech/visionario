"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Coins01Icon, SecurityCheckIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { negocio, pago as t, rutas } from "@/content/visionario";
import { proximaCuota, useApp } from "@/lib/estado";
import { useGuardia } from "@/lib/guardias";
import { bs, fecha } from "@/lib/utils";
import { AccionFija, BarraFlujo } from "@/components/app/barras";
import { EstadoVacio } from "@/components/app/estado-vacio";
import { CodigoQR } from "@/components/pago/codigo-qr";
import { IsotipoCarga } from "@/components/marca/isotipo-carga";
import { Festejo, QueSigue } from "@/components/app/festejo";
import { Button, Flecha } from "@/components/ui/button";
import { ConNegrita } from "@/components/ui/con-negrita";
import { Nota } from "@/components/ui/nota";

type Fase = "elegir" | "verificando" | "listo";

/** Pago de una cuota con QR. La cuota la elige Mis pagos (?cuota=n); sin ella, la próxima. */
export function PagarCuota() {
  const router = useRouter();
  const pedida = Number(useSearchParams().get("cuota")) || null;
  const listo = useGuardia();
  const cuotas = useApp((s) => s.cuotas);
  const contrato = useApp((s) => s.contrato);
  const liquidado = useApp((s) => s.liquidadoEl);
  const pagarCuota = useApp((s) => s.pagarCuota);
  const [fase, setFase] = useState<Fase>("elegir");
  const [pagada, setPagada] = useState<number | null>(null);

  // Al pagar la última cuota, la felicitación toma el relevo
  useEffect(() => {
    if (fase === "listo" && liquidado) router.replace(rutas.liquidacion);
  }, [fase, liquidado, router]);

  if (!listo) return null;
  const total = negocio.cuotas.cantidad;

  if (!contrato) {
    return (
      <>
        <BarraFlujo titulo="Pagar cuota" volverA={rutas.pagos} />
        <main className="contenedor-flujo flex flex-1 flex-col">
          <EstadoVacio
            icono={Coins01Icon}
            titulo="Aún no hay cuotas por pagar"
            texto="Sus cuotas se activan cuando firma su contrato."
            chips={[{ emoji: "📱", texto: "Pago por QR" }, { emoji: "✅", texto: "Sin intereses", tono: "exito" }]}
          >
            <Button asChild variant="outline" block>
              <Link href={rutas.pagos}>Ir a mis pagos</Link>
            </Button>
          </EstadoVacio>
        </main>
      </>
    );
  }

  /* Pago confirmado: se festeja y se dice, en corto, qué pasa ahora */
  if (fase === "listo" && pagada) {
    const siguiente = cuotas.find((x) => x.estado !== "pagada");
    const pasos = pagada === 1 ? t.exito.trasPrimera : siguiente ? t.exito.trasIntermedia(pagada, siguiente.numero, fecha(siguiente.vence)) : [];
    return (
      <>
        <main className="contenedor-flujo flex flex-1 flex-col items-center pt-12 pb-40 text-center lg:pt-16 lg:pb-8">
          <Festejo emojis={["🎉", "💙", "👓", "✨", "🥳"]} />
          <h1 className="mt-8 animate-aparecer text-seccion [animation-delay:200ms]">{t.exito.titulo}</h1>
          <p className="mt-2 animate-aparecer font-destacado text-destacado text-secondary-800 italic [animation-delay:300ms]">{t.exito.gracias}</p>
          {pasos.length > 0 && (
            <QueSigue
              titulo={t.exito.queSigue}
              pasos={pasos.map((p) => ({ ...p, texto: <ConNegrita texto={p.texto} /> }))}
              className="mt-8 w-full animate-aparecer [animation-delay:400ms]"
            />
          )}
        </main>
        <AccionFija>
          <Button asChild size="lg">
            <Link href={rutas.panel}>
              {t.exito.volver}
              <Flecha />
            </Link>
          </Button>
        </AccionFija>
      </>
    );
  }

  const cuota = cuotas.find((x) => x.numero === pedida && x.estado !== "pagada") ?? proximaCuota(cuotas);

  if (!cuota) {
    return (
      <>
        <BarraFlujo titulo="Pagar cuota" volverA={rutas.pagos} />
        <main className="contenedor-flujo flex flex-1 flex-col">
          <EstadoVacio icono={Tick02Icon} titulo="No tiene cuotas pendientes" texto="Pagó todas sus cuotas. ¡Gracias por cumplir!">
            <Button asChild>
              <Link href={rutas.liquidacion}>Ver mi beneficio</Link>
            </Button>
          </EstadoVacio>
        </main>
      </>
    );
  }

  if (fase === "verificando") {
    return (
      <main className="flex flex-1 items-center justify-center px-5">
        <IsotipoCarga etiqueta={`${t.verificando} ${t.titulo(cuota.numero, total)} · ${bs(cuota.monto)}`} />
      </main>
    );
  }

  const confirmar = () => {
    setFase("verificando");
    setTimeout(() => {
      pagarCuota(cuota.numero);
      setPagada(cuota.numero);
      setFase("listo");
      window.scrollTo({ top: 0 });
    }, 1400);
  };

  const esPrimera = cuota.numero === 1;

  return (
    <>
      <BarraFlujo
        titulo={t.titulo(cuota.numero, total)}
        paso={esPrimera ? 3 : undefined}
        total={esPrimera ? 3 : undefined}
        volverA={rutas.pagos}
      />

      <main className="contenedor-flujo flex flex-1 animate-paso-adelante flex-col items-center pt-6 pb-36 text-center lg:pt-12 lg:pb-8">
        <section className="tarjeta w-full p-6">
          <p className="cifras inline-flex rounded-full bg-primary-50 px-3 py-1 text-meta font-bold text-primary-800">{t.titulo(cuota.numero, total)}</p>
          <p className="cifras mt-3 font-titulo text-cifra text-secondary-950">{bs(cuota.monto)}</p>
          <p className="cifras mt-1 text-secondary-700">
            {t.vence} {fecha(cuota.vence)}
          </p>

          {cuota.estado === "vencida" && (
            <Nota tono="alerta" titulo={t.vencida} className="mt-4 text-left" role="alert" />
          )}

          {/* El QR con una línea de escaneo que lo recorre */}
          <div className="relative mx-auto mt-6 w-full max-w-60">
            <CodigoQR semilla={`${contrato.firmadoEl}-${cuota.numero}`} etiqueta={t.qr} />
            <span aria-hidden className="pointer-events-none absolute inset-x-2 top-2 h-1 animate-[escanear_2.6s_var(--ease-suave)_infinite] rounded-full bg-primary-500/70 shadow-[0_0_16px_4px_rgb(21_125_202/0.45)] motion-reduce:hidden" />
          </div>
          <p className="mt-4 font-semibold text-secondary-950">{t.escanee}</p>
        </section>

        <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-exito-50 px-4 py-2 font-bold text-exito-800">
          <HugeiconsIcon icon={SecurityCheckIcon} size={20} strokeWidth={2} aria-hidden />
          {t.protegido}
        </p>
      </main>

      <AccionFija>
        <Button size="lg" onClick={confirmar}>
          {t.yaPague}
          <Flecha />
        </Button>
      </AccionFija>
    </>
  );
}
