"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { marca, notificaciones, rutas, type TipoNotificacion } from "@/content/visionario";
import { useApp, useHidratado, type Notificacion } from "@/lib/estado";

const DURACION = 7000;

/**
 * Muestra cada notificación nueva como la vería la persona en su celular:
 * entra suave sobre la zona de acciones (en computadora, arriba a la
 * derecha) y se va sola. No bloquea la pantalla, no tapa títulos ni datos, no aparece si la persona ya está donde lleva el aviso y se
 * retira al cambiar de pantalla.
 */
export function Avisos() {
  const router = useRouter();
  const ruta = usePathname();
  const hidratado = useHidratado();
  const ultima = useApp((s) => s.notificaciones[0]);
  const marcarLeida = useApp((s) => s.marcarLeida);
  const [aviso, setAviso] = useState<{ n: Notificacion; ruta: string } | null>(null);
  const vista = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    // Hasta cargar lo guardado no se decide nada: al recargar, lo que ya
    // existía no se anuncia de nuevo
    if (!hidratado) return;
    if (vista.current === undefined) {
      vista.current = ultima?.id ?? null;
      return;
    }
    if (!ultima || ultima.id === vista.current) return;
    vista.current = ultima.id;
    if (Date.now() - new Date(ultima.creadaEl).getTime() > 10_000) return;
    const destino = notificaciones[ultima.tipo].ruta;
    const aqui = window.location.pathname;
    if (destino && rutas[destino] === aqui) return;
    // La pantalla de pago ya celebra el pago: el aviso sobraría
    if (ultima.tipo === "pago-confirmado" && aqui.startsWith(rutas.pago)) return;
    const mostrar = setTimeout(() => setAviso({ n: ultima, ruta: aqui }), 0);
    const ocultar = setTimeout(() => setAviso((v) => (v?.n.id === ultima.id ? null : v)), DURACION);
    return () => {
      clearTimeout(mostrar);
      clearTimeout(ocultar);
    };
  }, [ultima, hidratado]);

  // Al cambiar de pantalla el aviso deja de mostrarse (ya no corresponde)
  const visible = aviso && aviso.ruta === ruta ? aviso.n : null;
  if (!visible) return <div aria-live="polite" className="sr-only" />;
  const plantilla = notificaciones[visible.tipo as TipoNotificacion];

  const abrir = () => {
    marcarLeida(visible.id);
    setAviso(null);
    if (plantilla.ruta) router.push(rutas[plantilla.ruta]);
  };

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-3 z-50 mx-auto max-w-md px-3 pt-[env(safe-area-inset-top)] lg:top-24 lg:right-6 lg:left-auto lg:mx-0 lg:w-sm lg:px-0">
      <div
        key={visible.id}
        role="status"
        className="vidrio pointer-events-auto flex animate-aviso items-start gap-3 rounded-3xl p-3 pr-2 shadow-lg"
      >
        <span className="relative mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
          <Image src={marca.logo.isotipo.src} width={32} height={32} alt="" className="size-8" />
          <span className="absolute -top-1 -right-1 size-3.5 rounded-full bg-alerta-500 ring-2 ring-white" aria-hidden />
        </span>
        <button type="button" onClick={abrir} className="min-w-0 flex-1 rounded-xl text-left">
          <span className="block font-titulo font-bold text-secondary-950">{plantilla.titulo}</span>
          <span className="mt-0.5 block text-meta font-medium text-secondary-700">{plantilla.texto}</span>
          {plantilla.accion && (
            <span className="mt-2 inline-flex items-center rounded-full bg-primary-600 px-3 py-1 text-meta font-bold text-white">
              {plantilla.accion}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setAviso(null)}
          aria-label="Cerrar aviso"
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-secondary-600 transition-colors hover:bg-white"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={2} aria-hidden />
        </button>
      </div>
    </div>
  );
}
