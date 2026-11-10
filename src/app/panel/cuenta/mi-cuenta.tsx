"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Camera01Icon, Logout01Icon } from "@hugeicons/core-free-icons";
import { cuenta as t, formularioPerfil as f, navegacion, rutas, textos } from "@/content/visionario";
import { useApp } from "@/lib/estado";
import { useGuardia } from "@/lib/guardias";
import { reducirFoto } from "@/lib/foto";
import { Avatar } from "@/components/app/avatar";
import { PantallaApp } from "@/components/app/barras";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Nota } from "@/components/ui/nota";

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function MiCuenta() {
  const router = useRouter();
  const listo = useGuardia();
  const perfil = useApp((s) => s.perfil);
  const guardar = useApp((s) => s.guardarPerfil);
  const cerrarSesion = useApp((s) => s.cerrarSesion);
  const archivo = useRef<HTMLInputElement>(null);
  const [cambios, setCambios] = useState<{ nombre?: string; whatsapp?: string; correo?: string }>({});
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [guardado, setGuardado] = useState(false);

  if (!listo) return null;
  const d = { nombre: perfil.nombre, whatsapp: perfil.whatsapp, correo: perfil.correo, ...cambios };

  const poner = (k: keyof typeof d, v: string) => {
    setCambios({ ...cambios, [k]: v });
    setGuardado(false);
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (d.nombre.trim().split(/\s+/).length < 2) err.nombre = "Escriba su nombre y apellido.";
    if (!/^[67]\d{7}$/.test(d.whatsapp)) err.whatsapp = textos.errores.whatsapp;
    if (!CORREO.test(d.correo.trim())) err.correo = textos.errores.correo;
    setErrores(err);
    if (Object.keys(err).length) return;
    guardar(d);
    setCambios({});
    setGuardado(true);
  };

  const elegirFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = e.target.files?.[0];
    if (!a) return;
    try {
      guardar({ foto: await reducirFoto(a) });
    } catch {
      setErrores({ foto: textos.errores.generico });
    }
  };

  return (
    <PantallaApp titulo={navegacion.titulos.cuenta}>
      <div className="relative flex flex-col items-center overflow-hidden rounded-[2rem] bg-white p-6 text-center shadow-md">
        <span aria-hidden className="absolute inset-x-0 top-0 h-20 bg-linear-to-br from-primary-500 to-primary-700" />
        <button
          type="button"
          onClick={() => archivo.current?.click()}
          className="group relative mt-4 rounded-full ring-4 ring-white transition-transform duration-300 hover:scale-105"
          aria-label={t.foto}
        >
          <Avatar className="size-24 text-seccion" alt="Su foto de perfil" />
          <span className="absolute -right-1 -bottom-1 flex size-9 items-center justify-center rounded-full bg-primary-600 text-white shadow-brillo ring-2 ring-white">
            <HugeiconsIcon icon={Camera01Icon} size={18} strokeWidth={2} aria-hidden />
          </span>
        </button>
        <div className="relative mt-3 min-w-0">
          <p className="truncate font-titulo text-bloque font-bold text-secondary-950">{perfil.nombre}</p>
          <p className="truncate text-meta text-muted-foreground">{perfil.correo}</p>
          <Button variant="secondary" size="sm" className="mt-3" onClick={() => archivo.current?.click()}>
            <HugeiconsIcon icon={Camera01Icon} strokeWidth={1.75} aria-hidden />
            {t.foto}
          </Button>
          <input ref={archivo} type="file" accept="image/*" className="sr-only" onChange={elegirFoto} aria-label={t.foto} tabIndex={-1} />
        </div>
      </div>
      {errores.foto && <p className="mt-2 text-meta font-semibold text-destructive">{errores.foto}</p>}

      <form onSubmit={enviar} noValidate className="tarjeta mt-5 space-y-5 p-5">
        <h2 className="font-titulo text-bloque">{t.datos}</h2>
        <div className="space-y-2">
          <Label htmlFor="c-nombre">{f.campos.nombre.etiqueta}</Label>
          <Input id="c-nombre" autoComplete="name" value={d.nombre} onChange={(e) => poner("nombre", e.target.value)} aria-invalid={!!errores.nombre} aria-describedby={errores.nombre ? "c-nombre-e" : undefined} />
          {errores.nombre && <p id="c-nombre-e" className="text-meta font-semibold text-destructive">{errores.nombre}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-wa">{f.campos.whatsapp.etiqueta}</Label>
          <Input id="c-wa" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={8} className="cifras" value={d.whatsapp} onChange={(e) => poner("whatsapp", e.target.value.replace(/\D/g, ""))} aria-invalid={!!errores.whatsapp} aria-describedby={errores.whatsapp ? "c-wa-e" : undefined} />
          {errores.whatsapp && <p id="c-wa-e" className="text-meta font-semibold text-destructive">{errores.whatsapp}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-correo">{f.campos.correo.etiqueta}</Label>
          <Input id="c-correo" type="email" inputMode="email" autoComplete="email" value={d.correo} onChange={(e) => poner("correo", e.target.value)} aria-invalid={!!errores.correo} aria-describedby={errores.correo ? "c-correo-e" : undefined} />
          {errores.correo && <p id="c-correo-e" className="text-meta font-semibold text-destructive">{errores.correo}</p>}
        </div>
        <Button type="submit" disabled={!Object.keys(cambios).length}>
          {t.guardar}
        </Button>
        {guardado && (
          <Nota tono="exito" role="status" titulo={`${t.guardado} ✨`} />
        )}
      </form>

      <div className="mt-6">
        <Button
          variant="outline"
          onClick={() => {
            cerrarSesion();
            router.push(rutas.inicio);
          }}
        >
          <HugeiconsIcon icon={Logout01Icon} strokeWidth={1.75} aria-hidden />
          {t.salir}
        </Button>
        <p className="mt-2 text-center text-meta text-muted-foreground">{t.salirAyuda}</p>
      </div>
    </PantallaApp>
  );
}
