"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import { acceso, rutas, textos } from "@/content/visionario";
import { siguienteRuta, useApp, useHidratado } from "@/lib/estado";
import { BarraMarca } from "@/components/app/barras";
import { Button, Flecha } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleLogo } from "@/components/marca/google";
import { IsotipoCarga } from "@/components/marca/isotipo-carga";
import { cn } from "@/lib/utils";

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Acceso a la app. Registrarse e ingresar viven en la misma pantalla, como dos
 * pestañas: "Crear cuenta" primero e "Ingresar" después. Ambas terminan en el
 * asistente de datos si la persona aún no los completó.
 */
export function FormAcceso({ modo }: { modo: "registro" | "ingreso" }) {
  const router = useRouter();
  const t = acceso[modo];
  const hidratado = useHidratado();
  const iniciarSesion = useApp((s) => s.iniciarSesion);
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [ver, setVer] = useState(false);
  const [errores, setErrores] = useState<{ correo?: string; contrasena?: string }>({});
  const [cargando, setCargando] = useState<"google" | "correo" | null>(null);

  // Quien ya tiene sesión no necesita ver el acceso otra vez
  useEffect(() => {
    if (!hidratado || cargando) return;
    const s = useApp.getState();
    if (s.sesion.activa) router.replace(rutas[siguienteRuta(s)]);
  }, [hidratado, cargando, router]);

  /** Simula la espera de un proveedor real y continúa al siguiente paso. */
  const continuar = (metodo: "google" | "correo") => {
    setCargando(metodo);
    setTimeout(() => {
      iniciarSesion(metodo, metodo === "correo" ? correo.trim() : undefined);
      router.replace(rutas[siguienteRuta(useApp.getState())]);
    }, 900);
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevos: typeof errores = {};
    if (!CORREO.test(correo.trim())) nuevos.correo = textos.errores.correo;
    if (contrasena.length < 6) nuevos.contrasena = acceso.errores.contrasena;
    setErrores(nuevos);
    if (Object.keys(nuevos).length) {
      document.getElementById(nuevos.correo ? "correo" : "contrasena")?.focus();
      return;
    }
    continuar("correo");
  };

  if (cargando) {
    return (
      <div className="flex flex-1 items-center justify-center px-5">
        <IsotipoCarga etiqueta={cargando === "google" ? "Conectando con Google…" : "Preparando su cuenta…"} />
      </div>
    );
  }

  return (
    <>
      <BarraMarca />
      <main className="contenedor-flujo flex-1 animate-paso-adelante pt-4 pb-10 lg:pt-12 lg:pb-16">
        <h1 className="text-seccion">{t.titulo}</h1>

        <nav aria-label="Crear cuenta o ingresar" className="vidrio relative mt-5 grid grid-cols-2 gap-1 rounded-full p-1.5">
          {(["registro", "ingreso"] as const).map((m) => (
            <Link
              key={m}
              href={m === "registro" ? rutas.registro : rutas.ingresar}
              replace
              aria-current={modo === m ? "page" : undefined}
              className={cn(
                "flex h-11 items-center justify-center rounded-full font-titulo font-bold no-underline transition-[background-color,color,box-shadow] duration-300",
                modo === m ? "bg-primary-600 text-white shadow-brillo" : "text-secondary-700 hover:text-secondary-950",
              )}
            >
              {acceso.pestanas[m]}
            </Link>
          ))}
        </nav>

        <div className="tarjeta mt-6 p-5">
        <Button variant="outline" size="lg" onClick={() => continuar("google")}>
          <GoogleLogo className="size-6!" />
          {acceso.conGoogle[modo]}
        </Button>

        <div className="my-6 flex items-center gap-3 text-meta text-muted-foreground" aria-hidden>
          <span className="h-px flex-1 bg-border" />
          {acceso.separador}
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={enviar} noValidate className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="correo">{acceso.correo}</Label>
            <Input
              id="correo"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="nombre@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              aria-invalid={!!errores.correo}
              aria-describedby={errores.correo ? "correo-error" : undefined}
            />
            {errores.correo && (
              <p id="correo-error" className="text-meta font-semibold text-destructive">
                {errores.correo}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contrasena">{acceso.contrasena}</Label>
            <div className="relative">
              <Input
                id="contrasena"
                type={ver ? "text" : "password"}
                autoComplete={modo === "registro" ? "new-password" : "current-password"}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="pr-14"
                aria-invalid={!!errores.contrasena}
                aria-describedby={errores.contrasena ? "contrasena-error" : "contrasena-ayuda"}
              />
              <button
                type="button"
                onClick={() => setVer((v) => !v)}
                aria-label={ver ? acceso.ocultar : acceso.mostrar}
                aria-pressed={ver}
                className="absolute inset-y-0 right-1 my-auto flex size-11 items-center justify-center rounded-full text-secondary-600 transition-colors hover:bg-primary-50 hover:text-secondary-950"
              >
                <HugeiconsIcon icon={ver ? ViewOffSlashIcon : ViewIcon} size={22} strokeWidth={1.75} aria-hidden />
              </button>
            </div>
            {errores.contrasena ? (
              <p id="contrasena-error" className="text-meta font-semibold text-destructive">
                {errores.contrasena}
              </p>
            ) : modo === "registro" ? (
              <p id="contrasena-ayuda" className="text-meta text-muted-foreground">
                {acceso.contrasenaAyuda}
              </p>
            ) : null}
          </div>

          <Button type="submit" size="lg" className="mt-2">
            {t.enviar}
            <Flecha />
          </Button>
        </form>
        </div>

        {modo === "registro" && <p className="mt-5 text-center text-meta text-secondary-700">{acceso.datosDespues}</p>}

      </main>
    </>
  );
}
