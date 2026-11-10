"use client";

import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AlertCircleIcon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  Coins01Icon,
  Coupon01Icon,
  Invoice01Icon,
  Notification01Icon,
  TestTube01Icon,
} from "@hugeicons/core-free-icons";
import { avisos as t, navegacion, notificaciones, rutas, type TipoNotificacion } from "@/content/visionario";
import { useApp } from "@/lib/estado";
import { useGuardia } from "@/lib/guardias";
import { fecha } from "@/lib/utils";
import { PantallaApp } from "@/components/app/barras";
import { EstadoVacio } from "@/components/app/estado-vacio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconos: Record<TipoNotificacion, typeof Calendar03Icon> = {
  "recordatorio-cita": Calendar03Icon,
  "orden-recibida": Invoice01Icon,
  "pago-confirmado": CheckmarkCircle02Icon,
  "lente-listo": TestTube01Icon,
  "recordatorio-cuota": Coins01Icon,
  "cuota-vencida": AlertCircleIcon,
  "renovacion-6": Coupon01Icon,
  "renovacion-12": Coupon01Icon,
};

const hora = new Intl.DateTimeFormat("es-BO", { hour: "2-digit", minute: "2-digit" });

export function ListaAvisos() {
  const router = useRouter();
  const listo = useGuardia({ sesion: true });
  const lista = useApp((s) => s.notificaciones);
  const marcarLeida = useApp((s) => s.marcarLeida);
  const marcarTodas = useApp((s) => s.marcarTodasLeidas);
  if (!listo) return null;
  const sinLeer = lista.some((n) => !n.leida);

  return (
    <PantallaApp titulo={navegacion.titulos.avisos}>
        {sinLeer && (
          <div className="flex justify-end">
            <Button variant="link" size="sm" onClick={marcarTodas}>
              {t.marcarTodas}
            </Button>
          </div>
        )}

        {lista.length === 0 ? (
          <EstadoVacio
            icono={Notification01Icon}
            titulo={t.vacio.titulo}
            texto={t.vacio.texto}
            chips={[
              { emoji: "📅", texto: "Recordatorios" },
              { emoji: "🎁", texto: "Promociones", tono: "oro" },
              { emoji: "💬", texto: "Avisos", tono: "azul" },
            ]}
          />
        ) : (
          <ul className="mt-2 space-y-2.5">
            {lista.map((n, i) => {
              const p = notificaciones[n.tipo];
              const urgente = n.tipo === "cuota-vencida";
              return (
                <li key={n.id} className="animate-entrar" style={{ animationDelay: `${Math.min(i, 6) * 70}ms` }}>
                  <button
                    type="button"
                    onClick={() => {
                      marcarLeida(n.id);
                      if (p.ruta) router.push(rutas[p.ruta]);
                    }}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-3xl p-4 text-left shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md",
                      n.leida ? "bg-white/80" : "bg-white ring-2 ring-primary-200",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-2xl",
                        urgente ? "bg-vencida-fondo text-vencida" : n.leida ? "bg-secondary-100 text-secondary-700" : "bg-primary-600 text-white shadow-brillo",
                      )}
                    >
                      <HugeiconsIcon icon={iconos[n.tipo]} size={20} strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="font-bold text-secondary-950">{p.titulo}</span>
                        {!n.leida && (
                          <span className="shrink-0 rounded-full bg-alerta-500 px-2 py-0.5 text-mini text-white">
                            {t.nuevo}
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block text-meta text-secondary-700">{p.texto}</span>
                      <span className="cifras mt-1 block text-meta text-muted-foreground">
                        {fecha(n.creadaEl)} · {hora.format(new Date(n.creadaEl))}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
    </PantallaApp>
  );
}
