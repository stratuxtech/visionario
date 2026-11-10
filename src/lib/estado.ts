"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  cupones,
  demo,
  negocio,
  semilla,
  type ClaveRuta,
  type EstadoCuota,
  type IdParada,
  type OjoReceta,
  type TipoNotificacion,
} from "@/content/visionario";
import { sumarMeses } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Modelo                                                              */
/* ------------------------------------------------------------------ */

export interface Perfil {
  nombre: string;
  whatsapp: string;
  correo: string;
  edad: number | null;
  usoLentes: string | null;
  usoMedidas: string | null;
  medidaEstimada: string | null;
  comoNosConocio: string | null;
  foto: string | null;
}

export interface Cuota {
  numero: number;
  monto: number;
  vence: string;
  estado: EstadoCuota;
  pagadaEl: string | null;
}

export interface Orden {
  numero: string;
  lente: string;
  tratamientos: readonly string[];
  monturaId: string;
  total: number;
  recibidaEl: string;
  /** Joya en garantía: su foto (si ya la subió la óptica) y el valor de la tasación */
  joya?: { descripcion: string; tasacion: number; foto: string | null };
}

export interface Receta {
  fecha: string;
  profesional: string;
  ojoDerecho: OjoReceta;
  ojoIzquierdo: OjoReceta;
  distanciaPupilar: number;
}

export interface Notificacion {
  id: string;
  tipo: TipoNotificacion;
  creadaEl: string;
  leida: boolean;
}

export type EstadoLaboratorio = "sin-orden" | "fabricando" | "listo";

interface Datos {
  sesion: { activa: boolean; metodo: "google" | "correo" | null };
  perfil: Perfil;
  perfilCompleto: boolean;
  procesoVisto: boolean;
  cita: { inicio: string; creadaEl: string } | null;
  cupon: { codigo: string; porcentaje: number; producto?: string } | null;
  /** Última situación que la persona vio en "Mi estado" (para avisar de novedades) */
  estadoVisto: string | null;
  orden: Orden | null;
  receta: Receta | null;
  contrato: { firmadoEl: string; firma: string } | null;
  cuotas: Cuota[];
  laboratorio: EstadoLaboratorio;
  liquidadoEl: string | null;
  notificaciones: Notificacion[];
  /** Monturas marcadas como "me interesa" en el catálogo */
  monturasInteres: string[];
  /** Horario tocado en la landing antes de tener cuenta */
  horarioPreelegido: string | null;
  /** Solo demo: días que el simulador adelanta el reloj (renovación a 6 o 12 meses) */
  desfaseDias: number;
}

interface Acciones {
  iniciarSesion: (metodo: "google" | "correo", correo?: string) => void;
  cerrarSesion: () => void;
  guardarPerfil: (cambios: Partial<Perfil>, completo?: boolean) => void;
  marcarProcesoVisto: () => void;
  agendarCita: (inicio: string) => void;
  alternarMontura: (id: string) => void;
  preelegirHorario: (inicio: string | null) => void;
  marcarEstadoVisto: (clave: string) => void;
  usarBeneficio: () => void;
  marcarTodasLeidas: () => void;
  firmarContrato: (firma: string) => void;
  pagarCuota: (numero?: number) => void;
  marcarLeida: (id: string) => void;
  /* Simulador de flujos (solo con demo.activo) */
  simular: {
    ordenErp: () => void;
    pagoCuota: () => void;
    laboratorioListo: () => void;
    mora: () => void;
    liquidacion: () => void;
    notificacion: (tipo: TipoNotificacion) => void;
    reiniciar: () => void;
  };
}

export type EstadoApp = Datos & Acciones;

/* ------------------------------------------------------------------ */
/* Datos iniciales (visitante sin sesión)                              */
/* ------------------------------------------------------------------ */

const perfilVacio: Perfil = {
  nombre: "",
  whatsapp: "",
  correo: "",
  edad: null,
  usoLentes: null,
  usoMedidas: null,
  medidaEstimada: null,
  comoNosConocio: null,
  foto: null,
};

export const datosIniciales: Datos = {
  sesion: { activa: false, metodo: null },
  perfil: perfilVacio,
  perfilCompleto: false,
  procesoVisto: false,
  cita: null,
  cupon: null,
  estadoVisto: null,
  orden: null,
  receta: null,
  contrato: null,
  cuotas: [],
  laboratorio: "sin-orden",
  liquidadoEl: null,
  notificaciones: [],
  monturasInteres: [],
  horarioPreelegido: null,
  desfaseDias: 0,
};

/* ------------------------------------------------------------------ */
/* Reglas                                                              */
/* ------------------------------------------------------------------ */

/**
 * Reparte el total en cuotas exactamente iguales (regla: Bs 900 = 300 + 300 +
 * 300). Por eso el precio total siempre es múltiplo de la cantidad de cuotas:
 * si no lo fuera, se redondea la cuota al boliviano y el total se ajusta.
 */
export const montoCuota = (total: number) => Math.round(total / negocio.cuotas.cantidad);

export function generarCuotas(total: number, desde: string): Cuota[] {
  const n = negocio.cuotas.cantidad;
  const monto = montoCuota(total);
  return Array.from({ length: n }, (_, i) => ({
    numero: i + 1,
    monto,
    vence: sumarMeses(desde, i),
    estado: "pendiente" as const,
    pagadaEl: null,
  }));
}

export const cuotasPagadas = (c: Cuota[]) => c.filter((x) => x.estado === "pagada").length;
export const proximaCuota = (c: Cuota[]) => c.find((x) => x.estado !== "pagada") ?? null;

const ahora = () => new Date().toISOString();
const nuevaNotificacion = (tipo: TipoNotificacion): Notificacion => ({
  id: `${tipo}-${Date.now()}`,
  tipo,
  creadaEl: ahora(),
  leida: false,
});

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

export const useApp = create<EstadoApp>()(
  persist(
    (set, get) => {
      const notificar = (tipo: TipoNotificacion) =>
        set((s) => ({ notificaciones: [nuevaNotificacion(tipo), ...s.notificaciones] }));

      const pagarCuota = (numero?: number) => {
        const { cuotas } = get();
        const objetivo = numero ?? proximaCuota(cuotas)?.numero;
        if (!objetivo) return;
        const nuevas = cuotas.map((c) =>
          c.numero === objetivo ? { ...c, estado: "pagada" as const, pagadaEl: ahora() } : c,
        );
        const liquidado = cuotasPagadas(nuevas) === negocio.cuotas.cantidad;
        set({ cuotas: nuevas, liquidadoEl: liquidado ? ahora() : null });
        notificar("pago-confirmado");
      };

      return {
        ...datosIniciales,

        iniciarSesion: (metodo, correo) =>
          set((s) => ({
            sesion: { activa: true, metodo },
            perfil:
              metodo === "google"
                ? { ...s.perfil, nombre: semilla.usuarioGoogle.nombre, correo: semilla.usuarioGoogle.correo, foto: s.perfil.foto ?? semilla.usuarioGoogle.foto }
                : { ...s.perfil, correo: correo ?? s.perfil.correo, foto: s.perfil.foto ?? semilla.usuarioGoogle.foto },
          })),

        cerrarSesion: () => set({ sesion: { activa: false, metodo: null } }),

        guardarPerfil: (cambios, completo) =>
          set((s) => ({ perfil: { ...s.perfil, ...cambios }, perfilCompleto: completo ?? s.perfilCompleto })),

        marcarProcesoVisto: () => set({ procesoVisto: true }),

        agendarCita: (inicio) => set({ cita: { inicio, creadaEl: ahora() }, horarioPreelegido: null }),

        alternarMontura: (id) =>
          set((s) => ({
            monturasInteres: s.monturasInteres.includes(id)
              ? s.monturasInteres.filter((x) => x !== id)
              : [...s.monturasInteres, id],
          })),

        preelegirHorario: (inicio) => set({ horarioPreelegido: inicio }),

        marcarEstadoVisto: (clave) => set({ estadoVisto: clave }),

        usarBeneficio: () =>
          set({
            cupon: {
              codigo: cupones.liquidacion.codigo,
              porcentaje: cupones.liquidacion.porcentaje,
              producto: cupones.liquidacion.producto,
            },
          }),

        marcarTodasLeidas: () => set((s) => ({ notificaciones: s.notificaciones.map((n) => ({ ...n, leida: true })) })),

        firmarContrato: (firma) => {
          const { orden } = get();
          if (!orden) return;
          const firmadoEl = ahora();
          set({ contrato: { firmadoEl, firma }, cuotas: generarCuotas(orden.total, firmadoEl) });
        },

        pagarCuota: (numero) => {
          pagarCuota(numero);
          if (get().cuotas[0]?.estado === "pagada" && get().laboratorio === "sin-orden") {
            set({ laboratorio: "fabricando" });
          }
        },

        marcarLeida: (id) =>
          set((s) => ({ notificaciones: s.notificaciones.map((n) => (n.id === id ? { ...n, leida: true } : n)) })),

        simular: {
          ordenErp: () => {
            const fechaCita = get().cita?.inicio ?? ahora();
            set({
              orden: { ...semilla.orden, recibidaEl: ahora() },
              receta: { ...semilla.receta, fecha: fechaCita },
            });
            notificar("orden-recibida");
          },
          pagoCuota: () => get().pagarCuota(),
          laboratorioListo: () => {
            set({ laboratorio: "listo" });
            notificar("lente-listo");
          },
          mora: () => {
            const proxima = proximaCuota(get().cuotas);
            if (!proxima) return;
            set((s) => ({
              cuotas: s.cuotas.map((c) => (c.numero === proxima.numero ? { ...c, estado: "vencida" as const } : c)),
            }));
            notificar("cuota-vencida");
          },
          liquidacion: () => {
            const pendientes = get().cuotas.filter((c) => c.estado !== "pagada");
            pendientes.forEach((c) => pagarCuota(c.numero));
            if (get().laboratorio === "sin-orden") set({ laboratorio: "fabricando" });
          },
          notificacion: (tipo) => {
            if (tipo === "renovacion-6" || tipo === "renovacion-12") {
              set({
                cupon: { codigo: cupones.renovacion.codigo, porcentaje: cupones.renovacion.porcentaje },
                desfaseDias: tipo === "renovacion-6" ? 182 : 365,
              });
            }
            notificar(tipo);
          },
          reiniciar: () => set({ ...datosIniciales }),
        },
      };
    },
    {
      name: demo.claveAlmacenamiento,
      storage: createJSONStorage(() => localStorage),
      /* Solo se guardan los datos, nunca las acciones */
      partialize: (s): Datos => {
        const claves = Object.keys(datosIniciales) as (keyof Datos)[];
        return Object.fromEntries(claves.map((k) => [k, s[k]])) as unknown as Datos;
      },
    },
  ),
);

/* ------------------------------------------------------------------ */
/* Dónde está el paciente                                              */
/* ------------------------------------------------------------------ */

type Situacion = Pick<
  Datos,
  "sesion" | "perfilCompleto" | "procesoVisto" | "cita" | "orden" | "contrato" | "cuotas" | "liquidadoEl"
>;

/**
 * Siguiente pantalla según el avance de la persona. Sin cuenta: registro.
 * Sin datos completos: el asistente (no se puede saltar). Luego, una sola vez,
 * la explicación del proceso. Después "Mi cita" es la pantalla inicial, hasta
 * que la cita ya se realizó y el seguimiento vive en "Mi estado".
 */
export function siguienteRuta(s: Situacion): ClaveRuta {
  if (!s.sesion.activa) return "registro";
  if (!s.perfilCompleto) return "perfil";
  if (!s.procesoVisto) return "proceso";
  if (s.orden && !s.liquidadoEl) return "panel";
  return "agendar";
}

/** Qué muestra "Mi cita": elegir horario, la cita reservada o la cita ya realizada. */
export type ModoCita = "reservar" | "reservada" | "realizada";

export function modoCita(s: Pick<Datos, "cita" | "liquidadoEl" | "orden">): ModoCita {
  if (!s.cita) return "reservar";
  // Tras liquidar, solo una cita nueva (renovación o beneficio) cuenta
  if (s.liquidadoEl) return s.cita.creadaEl > s.liquidadoEl ? "reservada" : "reservar";
  if (s.orden) return "realizada";
  return "reservada";
}

/** Una cita solo está "vigente" si aún no pasó y el paciente no terminó su ciclo. */
export function citaVigente(s: Pick<Datos, "cita" | "liquidadoEl" | "orden">) {
  if (!s.cita || new Date(s.cita.inicio).getTime() < Date.now() - 60 * 60 * 1000) return false;
  if (s.liquidadoEl) return s.cita.creadaEl > s.liquidadoEl;
  return !s.orden;
}

/** Último día del mes de gracia: fecha de la última cuota + gracia. */
export function finDeGracia(cuotas: Cuota[]) {
  const ultima = cuotas[cuotas.length - 1];
  return ultima ? sumarMeses(ultima.vence, negocio.gracia.meses) : null;
}

/** Días que faltan hasta una fecha (negativo si ya pasó). */
export function diasHasta(iso: string) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const d = new Date(iso);
  d.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - hoy.getTime()) / 86_400_000);
}

/** Parada actual en el recorrido (la línea de la landing y del inicio). */
export function paradaActual(s: Situacion): IdParada {
  if (s.contrato) {
    const pagadas = cuotasPagadas(s.cuotas);
    if (pagadas >= negocio.cuotas.cantidad) return "devolucion";
    if (pagadas === 0) return "firma";
    return pagadas === 1 ? "cuota-2" : "cuota-3";
  }
  if (s.orden) return "firma";
  if (s.cita) return "medicion";
  return "cita";
}

/* ------------------------------------------------------------------ */
/* Qué le está pasando ahora al paciente                               */
/* ------------------------------------------------------------------ */

export type TipoSituacion = "sin-cita" | "cita" | "orden" | "cuota-1" | "fabricando" | "vencida" | "listo" | "liquidado";

/**
 * La situación actual con una clave propia. Cada cambio produce una clave
 * distinta: así se sabe cuándo hay una novedad que avisar en el menú.
 */
export function situacionActual(
  s: Pick<Datos, "cita" | "orden" | "contrato" | "cuotas" | "laboratorio" | "liquidadoEl">,
): { tipo: TipoSituacion; clave: string; cuota: Cuota | null } {
  const proxima = proximaCuota(s.cuotas);
  const hecho = (tipo: TipoSituacion, detalle: string | number = "", cuota: Cuota | null = proxima) => ({
    tipo,
    clave: detalle === "" ? tipo : tipo + ":" + detalle,
    cuota,
  });
  if (s.liquidadoEl) return hecho("liquidado", "", null);
  const vencida = s.cuotas.find((c) => c.estado === "vencida");
  if (vencida) return hecho("vencida", vencida.numero, vencida);
  if (s.laboratorio === "listo") return hecho("listo", proxima?.numero ?? 0);
  if (s.contrato && cuotasPagadas(s.cuotas) === 0) return hecho("cuota-1", "", s.cuotas[0] ?? null);
  if (s.contrato) return hecho("fabricando", proxima?.numero ?? 0);
  if (s.orden) return hecho("orden", "", null);
  if (s.cita) return hecho("cita", s.cita.inicio, null);
  return hecho("sin-cita", "", null);
}

/** true cuando el estado guardado en el navegador ya se cargó (evita parpadeos de hidratación). */
export function useHidratado() {
  return useSyncExternalStore(
    (avisar) => useApp.persist.onFinishHydration(avisar),
    () => useApp.persist.hasHydrated(),
    () => false,
  );
}
