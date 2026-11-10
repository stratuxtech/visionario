"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formularioPerfil as f, rutas, textos } from "@/content/visionario";
import { useApp, type Perfil } from "@/lib/estado";
import { useGuardia } from "@/lib/guardias";
import { AccionFija, BarraFlujo } from "@/components/app/barras";
import { Button, Flecha } from "@/components/ui/button";
import { Nota } from "@/components/ui/nota";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Opciones, OpcionesMultiples } from "@/components/ui/opciones";

type IdPaso = (typeof f.pasos)[number]["id"];
type Errores = Partial<Record<keyof Perfil, string>>;
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NO_SE = "No sé";

function validar(paso: IdPaso, d: Perfil, pedirCorreo: boolean): Errores {
  const e: Errores = {};
  if (paso === "datos") {
    if (d.nombre.trim().split(/\s+/).length < 2) e.nombre = "Escriba su nombre y apellido.";
    if (!/^[67]\d{7}$/.test(d.whatsapp)) e.whatsapp = textos.errores.whatsapp;
    if (pedirCorreo && !CORREO.test(d.correo.trim())) e.correo = textos.errores.correo;
    if (d.edad === null || d.edad < 1 || d.edad > 110) e.edad = textos.errores.edad;
  }
  if (paso === "vista") {
    if (!d.usoLentes) e.usoLentes = f.elegir;
    if (!d.usoMedidas) e.usoMedidas = f.elegir;
    if (!d.medidaEstimada) e.medidaEstimada = f.elegir;
  }
  if (paso === "origen" && !d.comoNosConocio) e.comoNosConocio = f.elegir;
  return e;
}

/**
 * Asistente de datos en tres pantallas cortas. Es obligatorio: sin los datos
 * completos no se puede entrar a la app (lo exige el guardia de cada pantalla).
 * El correo solo se pregunta si el acceso no lo trajo.
 */
export function FormPerfil() {
  const router = useRouter();
  const listo = useGuardia({ sesion: true, perfil: false });
  const perfilGuardado = useApp((s) => s.perfil);
  const guardarPerfil = useApp((s) => s.guardarPerfil);

  // Se calcula una sola vez con lo ya guardado
  const [pedirCorreo] = useState(() => !CORREO.test(useApp.getState().perfil.correo.trim()));
  const [paso, setPaso] = useState(() => {
    const p = useApp.getState().perfil;
    const primero = f.pasos.findIndex((x) => Object.keys(validar(x.id, p, !CORREO.test(p.correo.trim()))).length > 0);
    return primero === -1 ? 0 : primero;
  });
  const [dir, setDir] = useState<"adelante" | "atras">("adelante");
  const [datos, setDatos] = useState<Perfil | null>(null);
  const [errores, setErrores] = useState<Errores>({});

  if (!listo) return null;
  const d = datos ?? perfilGuardado;
  const total = f.pasos.length;
  const actual = f.pasos[paso];
  const origenes = d.comoNosConocio ? d.comoNosConocio.split(", ") : [];

  const poner = <K extends keyof Perfil>(k: K, v: Perfil[K]) => {
    setDatos({ ...d, [k]: v });
    if (errores[k]) setErrores({ ...errores, [k]: undefined });
  };

  const avanzar = () => {
    const e = validar(actual.id, d, pedirCorreo);
    setErrores(e);
    const primero = Object.keys(e)[0];
    if (primero) {
      document.getElementById(`campo-${primero}`)?.focus();
      return;
    }
    const ultimo = paso === total - 1;
    guardarPerfil(d, ultimo);
    if (ultimo) {
      router.push(useApp.getState().procesoVisto ? rutas.agendar : rutas.proceso);
      return;
    }
    setDir("adelante");
    setPaso(paso + 1);
    window.scrollTo({ top: 0 });
  };

  const retroceder = () => {
    if (paso === 0) return router.push(rutas.inicio);
    setDir("atras");
    setPaso(paso - 1);
  };

  const err = (k: keyof Perfil) =>
    errores[k] ? (
      <p id={`${k}-error`} className="text-meta font-semibold text-destructive">
        {errores[k]}
      </p>
    ) : null;

  return (
    <>
      <BarraFlujo titulo={f.barra} paso={paso + 1} total={total} alVolver={retroceder} />

      <main className="contenedor-flujo flex-1 pt-5 pb-32 lg:pt-12 lg:pb-8">
        <form
          key={actual.id}
          id="form-perfil"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            avanzar();
          }}
          className={dir === "adelante" ? "animate-paso-adelante" : "animate-paso-atras"}
        >
          <h2 className="font-titulo text-seccion text-secondary-950">{actual.titulo}</h2>
          <div className="tarjeta mt-6 p-5">

          <div className="space-y-6">
            {actual.id === "datos" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="campo-nombre">{f.campos.nombre.etiqueta}</Label>
                  <Input
                    id="campo-nombre"
                    autoComplete="name"
                    autoCapitalize="words"
                    placeholder={f.campos.nombre.ejemplo}
                    value={d.nombre}
                    onChange={(e) => poner("nombre", e.target.value)}
                    aria-invalid={!!errores.nombre}
                    aria-describedby={errores.nombre ? "nombre-error" : undefined}
                  />
                  {err("nombre")}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campo-whatsapp">{f.campos.whatsapp.etiqueta}</Label>
                  <Input
                    id="campo-whatsapp"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={8}
                    placeholder={f.campos.whatsapp.ejemplo}
                    value={d.whatsapp}
                    onChange={(e) => poner("whatsapp", e.target.value.replace(/\D/g, ""))}
                    className="cifras"
                    aria-invalid={!!errores.whatsapp}
                    aria-describedby={errores.whatsapp ? "whatsapp-error" : undefined}
                  />
                  {err("whatsapp")}
                </div>

                {pedirCorreo && (
                  <div className="space-y-2">
                    <Label htmlFor="campo-correo">{f.campos.correo.etiqueta}</Label>
                    <Input
                      id="campo-correo"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder={f.campos.correo.ejemplo}
                      value={d.correo}
                      onChange={(e) => poner("correo", e.target.value)}
                      aria-invalid={!!errores.correo}
                      aria-describedby={errores.correo ? "correo-error" : undefined}
                    />
                    {err("correo")}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="campo-edad">{f.campos.edad.etiqueta}</Label>
                  <Input
                    id="campo-edad"
                    inputMode="numeric"
                    maxLength={3}
                    placeholder={f.campos.edad.ejemplo}
                    value={d.edad ?? ""}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "");
                      poner("edad", v ? Number(v) : null);
                    }}
                    className="cifras"
                    aria-invalid={!!errores.edad}
                    aria-describedby={errores.edad ? "edad-error" : undefined}
                  />
                  {err("edad")}
                  {d.edad !== null && d.edad < 18 && <Nota tono="info" titulo={f.menorDeEdad} className="mt-3" />}
                </div>
              </>
            )}

            {actual.id === "vista" && (
              <>
                <div id="campo-usoLentes" tabIndex={-1}>
                  <Opciones
                    nombre="usoLentes"
                    etiqueta={f.campos.usoLentes.etiqueta}
                    opciones={f.campos.usoLentes.opciones}
                    valor={d.usoLentes}
                    alCambiar={(v) => poner("usoLentes", v)}
                    error={errores.usoLentes}
                    columnas={2}
                  />
                </div>
                <div id="campo-usoMedidas" tabIndex={-1}>
                  <Opciones
                    nombre="usoMedidas"
                    etiqueta={f.campos.usoMedidas.etiqueta}
                    opciones={f.campos.usoMedidas.opciones}
                    valor={d.usoMedidas}
                    alCambiar={(v) => poner("usoMedidas", v)}
                    error={errores.usoMedidas}
                    columnas={2}
                  />
                </div>
                <div id="campo-medidaEstimada" tabIndex={-1}>
                  <Opciones
                    nombre="medidaEstimada"
                    etiqueta={f.campos.medidaEstimada.etiqueta}
                    opciones={f.campos.medidaEstimada.opciones}
                    valor={d.medidaEstimada}
                    alCambiar={(v) => poner("medidaEstimada", v)}
                    error={errores.medidaEstimada}
                  />
                  {d.medidaEstimada === NO_SE && (
                    <Nota role="status" tono="exito" titulo={f.campos.medidaEstimada.noSabe} className="mt-3" />
                  )}
                </div>
              </>
            )}

            {actual.id === "origen" && (
              <div id="campo-comoNosConocio" tabIndex={-1}>
                <OpcionesMultiples
                  nombre="comoNosConocio"
                  etiqueta={f.campos.comoNosConocio.etiqueta}
                  ocultarEtiqueta
                  ayuda={f.elegirVarias}
                  opciones={f.campos.comoNosConocio.opciones}
                  valores={origenes}
                  alCambiar={(v) => poner("comoNosConocio", v.length ? v.join(", ") : null)}
                  error={errores.comoNosConocio}
                />
              </div>
            )}
          </div>
          </div>
        </form>
      </main>

      <AccionFija>
        <Button type="submit" form="form-perfil" size="lg">
          {paso === total - 1 ? f.terminar : f.continuar}
          <Flecha />
        </Button>
      </AccionFija>
    </>
  );
}
