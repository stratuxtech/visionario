"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { File01Icon, IdIcon, RefreshIcon, Tick02Icon, WhatsappIcon } from "@hugeicons/core-free-icons";
import { contrato as t, rutas, textos, type DatosContrato } from "@/content/optihelp";
import { esContado, generarCuotas, useApp, type Cuota, type Orden, type Perfil } from "@/lib/estado";
import { useGuardia } from "@/lib/guardias";
import { bs, cn, fecha } from "@/lib/utils";
import { AccionFija, BarraFlujo } from "@/components/app/barras";
import { EstadoVacio } from "@/components/app/estado-vacio";
import { DocumentoContrato } from "@/components/contrato/documento-contrato";
import { LienzoFirma, type LienzoFirmaRef } from "@/components/contrato/lienzo-firma";
import { Button, Flecha } from "@/components/ui/button";
import { Input, estiloCampo } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Nota } from "@/components/ui/nota";
import { Festejo } from "@/components/app/festejo";

const d = t.datos;

/** Lo que el contrato necesita, ya formateado: total, ONG y fechas de cada cuota. */
function datosContrato(o: Orden, cuotas: Cuota[]): DatosContrato {
  return {
    total: bs(o.total),
    precioLista: bs(o.precioLista),
    ong: o.montura.cubiertaPor,
    cuotas: cuotas.map((c) => ({ fecha: fecha(c.vence), monto: bs(c.monto) })),
  };
}

/** "7712765 SC" → { numero: "7712765", extension: "SC" } */
function separarCi(ci: string) {
  const [numero = "", extension = d.extension.porDefecto] = ci.split(" ");
  return { numero, extension };
}

type Errores = Partial<Record<"ci" | "domicilio" | "whatsapp", string>>;

/**
 * Paso previo a la firma: el contrato lleva el carnet (con extensión) y el
 * domicilio del cliente. El celular viene del perfil y se puede corregir.
 * Se guardan en el perfil para no pedirlos de nuevo.
 */
function DatosFirmante({ perfil, esMenor, alGuardar }: { perfil: Perfil; esMenor: boolean; alGuardar: (cambios: Partial<Perfil>) => void }) {
  const inicial = separarCi(perfil.ci);
  const [numero, setNumero] = useState(inicial.numero);
  const [extension, setExtension] = useState(inicial.extension);
  const [domicilio, setDomicilio] = useState(perfil.domicilio);
  const [whatsapp, setWhatsapp] = useState(perfil.whatsapp);
  const [errores, setErrores] = useState<Errores>({});

  const enviar = () => {
    const e: Errores = {};
    if (!/^\d{5,10}$/.test(numero)) e.ci = textos.errores.ci;
    if (domicilio.trim().length < 3) e.domicilio = textos.errores.domicilio;
    if (!/^[67]\d{7}$/.test(whatsapp)) e.whatsapp = textos.errores.whatsapp;
    setErrores(e);
    const primero = Object.keys(e)[0];
    if (primero) {
      document.getElementById(`campo-${primero}`)?.focus();
      return;
    }
    alGuardar({ ci: `${numero} ${extension}`, domicilio: domicilio.trim(), whatsapp });
  };

  const error = (k: keyof Errores) =>
    errores[k] ? (
      <p id={`${k}-error`} className="text-meta font-semibold text-destructive">
        {errores[k]}
      </p>
    ) : null;

  return (
    <>
      <main className="contenedor-flujo flex-1 animate-paso-adelante pt-4 pb-36 lg:pt-10 lg:pb-8">
        <h2 className="font-titulo text-seccion text-secondary-950">{d.titulo}</h2>
        <p className="mt-1 text-secondary-700">{d.texto}</p>
        {esMenor && <Nota tono="info" titulo={d.menor} className="mt-4" />}

        <form
          id="form-datos-contrato"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            enviar();
          }}
          className="tarjeta mt-6 space-y-6 p-5"
        >
          <div className="space-y-2">
            <Label htmlFor="campo-ci">{d.ci.etiqueta}</Label>
            <div className="flex gap-2">
              <Input
                id="campo-ci"
                inputMode="numeric"
                maxLength={10}
                placeholder={d.ci.ejemplo}
                value={numero}
                onChange={(e) => {
                  setNumero(e.target.value.replace(/\D/g, ""));
                  if (errores.ci) setErrores({ ...errores, ci: undefined });
                }}
                className="cifras flex-1"
                aria-invalid={!!errores.ci}
                aria-describedby={errores.ci ? "ci-error" : undefined}
              />
              <label htmlFor="campo-extension" className="sr-only">
                {d.extension.etiqueta}
              </label>
              <select
                id="campo-extension"
                value={extension}
                onChange={(e) => setExtension(e.target.value)}
                className={cn(estiloCampo, "h-14 w-24 shrink-0 px-3 font-semibold")}
              >
                {d.extension.opciones.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>
            {error("ci")}
          </div>

          <div className="space-y-2">
            <Label htmlFor="campo-domicilio">{d.domicilio.etiqueta}</Label>
            <Input
              id="campo-domicilio"
              autoComplete="street-address"
              placeholder={d.domicilio.ejemplo}
              value={domicilio}
              onChange={(e) => {
                setDomicilio(e.target.value);
                if (errores.domicilio) setErrores({ ...errores, domicilio: undefined });
              }}
              aria-invalid={!!errores.domicilio}
              aria-describedby={errores.domicilio ? "domicilio-error" : undefined}
            />
            {error("domicilio")}
          </div>

          <div className="space-y-2">
            <Label htmlFor="campo-whatsapp">{d.whatsapp.etiqueta}</Label>
            <Input
              id="campo-whatsapp"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={8}
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value.replace(/\D/g, ""));
                if (errores.whatsapp) setErrores({ ...errores, whatsapp: undefined });
              }}
              className="cifras"
              aria-invalid={!!errores.whatsapp}
              aria-describedby={errores.whatsapp ? "whatsapp-error" : "whatsapp-ayuda"}
            />
            {error("whatsapp") ?? (
              <p id="whatsapp-ayuda" className="text-meta text-muted-foreground">
                {d.whatsapp.ayuda}
              </p>
            )}
          </div>
        </form>
      </main>

      <AccionFija>
        <Button type="submit" form="form-datos-contrato" size="lg">
          {d.continuar}
          <Flecha />
        </Button>
      </AccionFija>
    </>
  );
}

export function FirmaContrato() {
  const router = useRouter();
  const listo = useGuardia();
  const o = useApp((s) => s.orden);
  const perfil = useApp((s) => s.perfil);
  const cuotas = useApp((s) => s.cuotas);
  const firmado = useApp((s) => s.contrato);
  const firmarContrato = useApp((s) => s.firmarContrato);
  const guardarPerfil = useApp((s) => s.guardarPerfil);
  const [editarDatos, setEditarDatos] = useState(false);
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
            titulo={t.vacio.titulo}
            texto={t.vacio.texto}
            chips={[{ emoji: "✍️", texto: t.vacio.chips.firma }, { emoji: "📄", texto: t.vacio.chips.papel, tono: "azul" }]}
          />
        </main>
      </>
    );
  }

  /* Contado: no hay contrato de crédito */
  if (esContado(o)) {
    return (
      <>
        <BarraFlujo titulo={t.titulo} volverA={rutas.panel} />
        <main className="contenedor-flujo flex flex-1 flex-col">
          <EstadoVacio icono={File01Icon} titulo={t.contado.titulo} texto={t.contado.texto}>
            <Button asChild>
              <Link href={rutas.orden}>{t.contado.accion}</Link>
            </Button>
          </EstadoVacio>
        </main>
      </>
    );
  }

  const esMenor = perfil.edad !== null && perfil.edad < 18;
  const cliente = { nombre: perfil.nombre, ci: perfil.ci, domicilio: perfil.domicilio, whatsapp: perfil.whatsapp };

  /* Ya firmado: se muestra la firma guardada y el contrato firmado */
  if (firmado) {
    return (
      <>
        <BarraFlujo titulo={t.titulo} volverA={rutas.panel} />
        <main className="contenedor-flujo flex-1 pt-10 pb-36 text-center lg:pt-14 lg:pb-8">
          <Festejo emojis={["✍️", "🎉", "📄", "✨", "💙"]} />
          <h2 className="mt-6 animate-aparecer font-titulo text-seccion text-secondary-950 [animation-delay:200ms]">{t.firmado.titulo} 🎉</h2>
          <p className="mt-1 animate-aparecer text-secondary-700 [animation-delay:300ms]">{t.firmado.texto}</p>
          <p className="mt-3 inline-flex animate-aparecer items-center gap-2 rounded-full bg-exito-50 px-3 py-1 text-meta font-semibold text-exito-800 [animation-delay:350ms]">
            <HugeiconsIcon icon={WhatsappIcon} size={16} strokeWidth={2} aria-hidden />
            {t.firmado.copiaDemo}
          </p>
          <figure className="tarjeta mt-6 animate-entrar p-4 text-left [animation-delay:400ms]">
            <Image src={firmado.firma} alt="Su firma" width={600} height={200} unoptimized className="h-auto w-full" />
            <figcaption className="cifras mt-2 border-t border-border pt-2 text-meta text-muted-foreground">
              {perfil.nombre} · C.I. {perfil.ci} · {fecha(firmado.firmadoEl)}
            </figcaption>
          </figure>
          <Button variant="secondary" className="mt-4" onClick={() => setVerContrato(true)}>
            <HugeiconsIcon icon={File01Icon} strokeWidth={2} aria-hidden />
            {t.firmado.ver}
          </Button>
        </main>
        <AccionFija>
          <Button asChild size="lg">
            <Link href={rutas.pago}>
              {t.firmado.accion}
              <Flecha />
            </Link>
          </Button>
        </AccionFija>
        <DocumentoContrato
          abierto={verContrato}
          alCambiar={setVerContrato}
          cliente={cliente}
          datos={datosContrato(o, cuotas)}
          fechaFirma={fecha(firmado.firmadoEl)}
          firma={firmado.firma}
          esMenor={esMenor}
        />
      </>
    );
  }

  /* Primero los datos del contrato: sin carnet ni domicilio no se habilita la firma */
  if (editarDatos || !perfil.ci || !perfil.domicilio) {
    return (
      <>
        <BarraFlujo titulo={t.titulo} paso={2} total={3} volverA={rutas.orden} />
        <DatosFirmante
          perfil={perfil}
          esMenor={esMenor}
          alGuardar={(cambios) => {
            guardarPerfil(cambios);
            setEditarDatos(false);
            window.scrollTo({ top: 0 });
          }}
        />
      </>
    );
  }

  const hoy = new Date().toISOString();

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
        {/* Los datos que van en el contrato, con la opción de corregirlos */}
        <section aria-labelledby="datos-resumen" className="tarjeta flex items-start gap-4 p-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
            <HugeiconsIcon icon={IdIcon} size={26} strokeWidth={1.75} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p id="datos-resumen" className="font-bold text-secondary-950">
              {d.resumen}
            </p>
            <p className="cifras text-meta text-secondary-700">
              C.I. {perfil.ci} · {perfil.whatsapp}
            </p>
            <p className="truncate text-meta text-secondary-700">{perfil.domicilio}</p>
          </div>
          <Button variant="secondary" size="sm" className="h-11 px-4" onClick={() => setEditarDatos(true)}>
            {d.cambiar}
          </Button>
        </section>

        {/* El contrato: una carta con el botón para verlo en pantalla completa */}
        <section aria-label={t.tarjeta.titulo} className="tarjeta mt-4 flex items-center gap-4 p-4">
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
        cliente={cliente}
        datos={datosContrato(o, generarCuotas(o.total, hoy))}
        fechaFirma={fecha(hoy)}
        esMenor={esMenor}
      />
    </>
  );
}
