"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { File01Icon, RefreshIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { contrato as t, rutas } from "@/content/visionario";
import { generarCuotas, useApp } from "@/lib/estado";
import { useGuardia } from "@/lib/guardias";
import { bs, cn, fecha } from "@/lib/utils";
import { AccionFija, BarraFlujo } from "@/components/app/barras";
import { EstadoVacio } from "@/components/app/estado-vacio";
import { DocumentoContrato } from "@/components/contrato/documento-contrato";
import { LienzoFirma, type LienzoFirmaRef } from "@/components/contrato/lienzo-firma";
import { Button, Flecha } from "@/components/ui/button";
import { Festejo } from "@/components/app/festejo";

export function FirmaContrato() {
  const router = useRouter();
  const listo = useGuardia();
  const o = useApp((s) => s.orden);
  const perfil = useApp((s) => s.perfil);
  const firmado = useApp((s) => s.contrato);
  const firmarContrato = useApp((s) => s.firmarContrato);
  const [firma, setFirma] = useState<string | null>(null);
  const [leido, setLeido] = useState(false);
  const [acepto, setAcepto] = useState(false);
  const [intento, setIntento] = useState(false);
  const [verContrato, setVerContrato] = useState(false);
  const lienzo = useRef<LienzoFirmaRef>(null);

  if (!listo) return null;

  if (!o) {
    return (
      <>
        <BarraFlujo titulo={t.titulo} volverA={rutas.panel} />
        <main className="contenedor-flujo flex flex-1 flex-col">
          <EstadoVacio
            icono={File01Icon}
            titulo="Aún no hay contrato para firmar"
            texto="Se prepara cuando llega su orden de compra desde la óptica."
            chips={[{ emoji: "✍️", texto: "Firma en pantalla" }, { emoji: "📄", texto: "Sin papeles", tono: "azul" }]}
          />
        </main>
      </>
    );
  }

  const cuota = generarCuotas(o.total, new Date().toISOString())[0].monto;
  const esMenor = perfil.edad !== null && perfil.edad < 18;

  /* Ya firmado: se muestra la firma guardada */
  if (firmado) {
    return (
      <>
        <BarraFlujo titulo={t.titulo} volverA={rutas.panel} />
        <main className="contenedor-flujo flex-1 pt-10 pb-36 text-center lg:pt-14 lg:pb-8">
          <Festejo emojis={["✍️", "🎉", "📄", "✨", "💙"]} />
          <h2 className="mt-6 animate-aparecer font-titulo text-seccion text-secondary-950 [animation-delay:200ms]">{t.firmado.titulo} 🎉</h2>
          <p className="mt-1 animate-aparecer text-secondary-700 [animation-delay:300ms]">{t.firmado.texto}</p>
          <figure className="tarjeta mt-6 animate-entrar p-4 text-left [animation-delay:400ms]">
            <Image src={firmado.firma} alt="Su firma" width={600} height={200} unoptimized className="h-auto w-full" />
            <figcaption className="cifras mt-2 border-t border-border pt-2 text-meta text-muted-foreground">
              {perfil.nombre} · {fecha(firmado.firmadoEl)}
            </figcaption>
          </figure>
        </main>
        <AccionFija>
          <Button asChild size="lg">
            <Link href={rutas.pago}>
              {t.firmado.accion}
              <Flecha />
            </Link>
          </Button>
        </AccionFija>
      </>
    );
  }

  const abrirContrato = () => {
    setLeido(true);
    setVerContrato(true);
  };

  const enviar = () => {
    setIntento(true);
    if (!acepto || !firma) {
      if (!acepto) document.getElementById("acepto")?.focus();
      else document.getElementById("firma")?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    firmarContrato(firma);
    router.push(rutas.pago);
  };

  return (
    <>
      <BarraFlujo titulo={t.titulo} paso={2} total={3} volverA={rutas.orden} />

      <main className="contenedor-flujo flex-1 animate-paso-adelante pt-4 pb-36 lg:pt-10 lg:pb-8">
        {/* El contrato: una carta con el botón para verlo en pantalla completa */}
        <section aria-label={t.tarjeta.titulo} className="tarjeta flex items-center gap-4 p-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-brillo">
            <HugeiconsIcon icon={File01Icon} size={26} strokeWidth={1.75} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-secondary-950">{t.tarjeta.titulo}</p>
            <p className="text-meta text-muted-foreground">{t.tarjeta.detalle}</p>
          </div>
          <Button variant="secondary" size="sm" className="h-11 px-5" onClick={abrirContrato}>
            {t.tarjeta.ver}
          </Button>
        </section>

        <label
          className={cn(
            "mt-5 flex min-h-14 cursor-pointer items-start gap-3 rounded-2xl border bg-white/80 p-4 font-semibold text-secondary-950 shadow-xs transition-[border-color,background-color,box-shadow] duration-300",
            "has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
            acepto ? "border-primary-500 bg-primary-50 shadow-[0_0_0_3px_rgb(21_125_202/0.14)]" : intento ? "border-alerta-600" : "border-secondary-200 hover:border-primary-300",
          )}
        >
          <input
            id="acepto"
            type="checkbox"
            checked={acepto}
            onChange={(e) => {
              // Solo se acepta lo que se leyó: la primera vez abre el contrato
              if (!leido) return abrirContrato();
              setAcepto(e.target.checked);
            }}
            className="sr-only"
            aria-describedby={intento && !acepto ? "acepto-error" : undefined}
          />
          <span
            aria-hidden
            className={cn(
              "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
              acepto ? "animate-elegir border-primary-600 bg-primary-600 text-white" : "border-secondary-300 bg-white",
            )}
          >
            {acepto && <HugeiconsIcon icon={Tick02Icon} size={16} strokeWidth={3} />}
          </span>
          {t.acepto}
        </label>
        {!leido && <p className="mt-2 text-meta text-muted-foreground">{t.leaPrimero}</p>}
        {intento && !acepto && (
          <p id="acepto-error" className="mt-2 text-meta font-semibold text-destructive">
            {t.faltaAcepto}
          </p>
        )}

        {/* La firma se hace aquí mismo, en un recuadro grande: sin pantalla aparte */}
        <section id="firma" aria-labelledby="firma-titulo" className="mt-8">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h2 id="firma-titulo" className="text-bloque">
              {t.firmaTitulo}
            </h2>
            <Button variant="secondary" size="sm" onClick={() => lienzo.current?.borrar()} disabled={!firma}>
              <HugeiconsIcon icon={RefreshIcon} strokeWidth={2} aria-hidden />
              {t.firmaBorrar}
            </Button>
          </div>
          <LienzoFirma
            ref={lienzo}
            alCambiar={setFirma}
            textoVacio={t.firmaVacia}
            etiqueta={t.firmaTitulo}
            invalido={intento && !firma}
            className="h-80 lg:h-96"
          />
          {intento && !firma && <p className="mt-2 text-meta font-semibold text-destructive">{t.faltaFirma}</p>}
        </section>
      </main>

      <AccionFija>
        <Button size="lg" onClick={enviar}>
          {t.firmar}
          <Flecha />
        </Button>
      </AccionFija>

      <DocumentoContrato
        abierto={verContrato}
        alCambiar={setVerContrato}
        nombre={perfil.nombre}
        total={bs(o.total)}
        cuota={bs(cuota)}
        esMenor={esMenor}
      />
    </>
  );
}
