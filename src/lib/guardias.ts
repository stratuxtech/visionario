"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { rutas } from "@/content/visionario";
import { useApp, useHidratado } from "@/lib/estado";

interface Requisitos {
  sesion?: boolean;
  /** Por defecto una pantalla de la app exige los datos completos: no se puede saltar el asistente. */
  perfil?: boolean;
}

/**
 * Protege una pantalla de la app. Devuelve true cuando el estado ya cargó y
 * la persona cumple los requisitos; si no, la lleva al paso que le falta.
 */
export function useGuardia({ sesion = true, perfil = true }: Requisitos = {}) {
  const router = useRouter();
  const hidratado = useHidratado();
  const activa = useApp((s) => s.sesion.activa);
  const perfilCompleto = useApp((s) => s.perfilCompleto);

  const destino = sesion && !activa ? rutas.registro : sesion && perfil && !perfilCompleto ? rutas.perfil : null;

  useEffect(() => {
    if (hidratado && destino) router.replace(destino);
  }, [hidratado, destino, router]);

  return hidratado && !destino;
}
