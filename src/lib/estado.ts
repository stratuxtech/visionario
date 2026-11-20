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
  type TipoOrden,
} from "@/content/optihelp";
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
  /** ONG que lo envía (opcional). No aplica descuento por sí sola. */
  institucion: string | null;
  /** Carnet con extensión ("7712765 SC"). Se pide recién antes de firmar. */
  ci: string;
  /** Zona, barrio o calle. Se pide recién antes de firmar. */
  domicilio: string;
  foto: string | null;
}

export interface Cuota {
  numero: number;
  monto: number;
  /** 0,4 · 0,3 · 0,3 en crédito; 1 en el pago único del contado */
  porcentaje: number;
  vence: string;
  estado: EstadoCuota;
  pagadaEl: string | null;
}

export interface Orden {
  numero: string;
  tipo: TipoOrden;
  optica: string;
  lente: string;
  tratamientos: readonly string[];
  /** La montura la elige el cliente en la óptica; `cubiertaPor`: la ONG que la paga */
  montura: { descripcion: string; valor: number; cubiertaPor: string | null };
  /** Solo en contado: precio de la receta */
  receta: number | null;
  /** Precio de los lentes antes de la ayuda de la ONG */
  precioLista: number;
  total: number;
  recibidaEl: string;
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
  /** En crédito: las 3 cuotas (al firmar). En contado: un solo pago (al llegar la orden). */
  cuotas: Cuota[];
  laboratorio: EstadoLaboratorio;
  liquidadoEl: string | null;
  notificaciones: Notificacion[];
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
    ordenOng: () => void;
    ordenContado: () => void;
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
  institucion: null,
  ci: "",
  domicilio: "",
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
  horarioPreelegido: null,
  desfaseDias: 0,
};

/* ------------------------------------------------------------------ */
/* Reglas                                                              */
/* ------------------------------------------------------------------ */

/**
 * Reparte el total con `negocio.cuotas.porcentajes` (40 / 30 / 30). Cada cuota
 * se redondea al boliviano y la última es el resto, así la suma da siempre el
 * total exacto (Bs 1.740 = 696 + 522 + 522). Vencen el mismo día de cada mes
 * desde la firma, como en el contrato de referencia.
 */
export function generarCuotas(total: number, desde: string): Cuota[] {
  const { porcentajes, mesesDesdeFirma } = negocio.cuotas;
  let asignado = 0;
  return porcentajes.map((porcentaje, i) => {
    const ultima = i === porcentajes.length - 1;
    const monto = ultima ? total - asignado : Math.round(total * porcentaje);
    asignado += monto;
    return {
      numero: i + 1,
      monto,
      porcentaje,
      vence: sumarMeses(desde, mesesDesdeFirma[i]),
      estado: "pendiente" as const,
      pagadaEl: null,
    };
  });
}

/** Orden al contado: un solo pago por QR, al 100%. */
export function generarPagoUnico(total: number, desde: string): Cuota[] {
  return [{ numero: 1, monto: total, porcentaje: 1, vence: desde, estado: "pendiente", pagadaEl: null }];
}

export const esContado = (o: Pick<Orden, "tipo"> | null) => o?.tipo === "contado";
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
        // En contado el pago único también marca liquidadoEl (sin pantalla de cliente cumplido)
        const liquidado = nuevas.length > 0 && cuotasPagadas(nuevas) === nuevas.length;
        set({ cuotas: nuevas, liquidadoEl: liquidado ? ahora() : null });
        notificar("pago-confirmado");
      };

      /** La orden de crédito que carga el ERP de OptiHelp (con o sin ONG). */
      const cargarOrdenCredito = (ong: string | null) => {
        const fechaCita = get().cita?.inicio ?? ahora();
        const base = semilla.orden;
        set({
          orden: {
            ...base,
            montura: { ...base.montura, cubiertaPor: ong },
            total: ong ? base.precioLista - base.montura.valor : base.total,
            recibidaEl: ahora(),
          },
          receta: { ...semilla.receta, fecha: fechaCita },
        });
        notificar("orden-recibida");
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

        /* Solo crédito: el contado no tiene contrato */
        firmarContrato: (firma) => {
          const { orden } = get();
          if (!orden || esContado(orden)) return;
          const firmadoEl = ahora();
          set({ contrato: { firmadoEl, firma }, cuotas: generarCuotas(orden.total, firmadoEl) });
        },

        /* El primer pago (cuota inicial o pago único) manda a hacer los lentes */
        pagarCuota: (numero) => {
          pagarCuota(numero);
          if (get().cuotas[0]?.estado === "pagada" && get().laboratorio === "sin-orden") {
            set({ laboratorio: "fabricando" });
          }
        },

        marcarLeida: (id) =>
          set((s) => ({ notificaciones: s.notificaciones.map((n) => (n.id === id ? { ...n, leida: true } : n)) })),

        simular: {
          ordenErp: () => cargarOrdenCredito(null),
          ordenOng: () => cargarOrdenCredito(semilla.ongDemo),
          ordenContado: () => {
            const fechaCita = get().cita?.inicio ?? ahora();
            const recibidaEl = ahora();
            set({
              orden: { ...semilla.ordenContado, recibidaEl },
              receta: { ...semilla.recetaContado, fecha: fechaCita },
              cuotas: generarPagoUnico(semilla.ordenContado.total, recibidaEl),
            });
            notificar("orden-contado");
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
  "sesion" | "perfilCompleto" | "procesoVisto" | "cita" | "orden" | "contrato" | "cuotas" | "laboratorio" | "liquidadoEl"
>;

/**
 * Siguiente pantalla según el avance de la persona. Sin cuenta: registro.
 * Sin datos completos: el asistente (no se puede saltar). Luego, una sola vez,
 * la explicación del proceso. Después "Mi cita" es la pantalla inicial, hasta
 * que la cita ya se realizó y el seguimiento vive en "Mi estado". Con una
 * orden al contado sin pagar, la orden (ahí se paga).
 */
export function siguienteRuta(s: Pick<Situacion, "sesion" | "perfilCompleto" | "procesoVisto" | "orden" | "cuotas" | "liquidadoEl">): ClaveRuta {
  if (!s.sesion.activa) return "registro";
  if (!s.perfilCompleto) return "perfil";
  if (!s.procesoVisto) return "proceso";
  if (esContado(s.orden)) return cuotasPagadas(s.cuotas) === 0 ? "orden" : "panel";
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

/**
 * Último día para ponerse al día sin recargo: la fecha de vencimiento más 3
 * días hábiles (de lunes a sábado, como el horario de la óptica; PENDIENTE
 * confirmar si el sábado cuenta). Después corre el interés por atraso.
 */
export function fechaLimiteRegularizar(vence: string) {
  const d = new Date(vence);
  const habiles: readonly number[] = negocio.atraso.diasHabiles;
  let faltan = negocio.atraso.diasHabilesParaRegularizar;
  while (faltan > 0) {
    d.setDate(d.getDate() + 1);
    if (habiles.includes(d.getDay())) faltan--;
  }
  return d.toISOString();
}

/** Días que faltan hasta una fecha (negativo si ya pasó). */
export function diasHasta(iso: string) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const d = new Date(iso);
  d.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - hoy.getTime()) / 86_400_000);
}

/**
 * Parada actual en el recorrido de crédito (Mi estado). El contado no tiene
 * recorrido de cuotas: Mi estado solo muestra su orden.
 */
export function paradaActual(s: Pick<Situacion, "cita" | "orden" | "contrato" | "cuotas" | "laboratorio">): IdParada {
  if (s.contrato) {
    const pagadas = cuotasPagadas(s.cuotas);
    if (pagadas >= negocio.cuotas.cantidad) return "terminado";
    if (pagadas === 0) return "firma";
    if (pagadas === 1) return s.laboratorio === "listo" ? "cuota-2" : "recojo";
    return "cuota-3";
  }
  if (s.orden) return "firma";
  if (s.cita) return "medicion";
  return "cita";
}

/* ------------------------------------------------------------------ */
/* Qué le está pasando ahora al paciente                               */
/* ------------------------------------------------------------------ */

export type TipoSituacion =
  | "sin-cita"
  | "cita"
  | "orden"
  | "contado"
  | "cuota-1"
  | "fabricando"
  | "vencida"
  | "listo"
  | "liquidado";

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
  /* Contado: orden por pagar → fabricación → listos para recoger */
  if (esContado(s.orden)) {
    if (cuotasPagadas(s.cuotas) === 0) return hecho("contado", "", s.cuotas[0] ?? null);
    return s.laboratorio === "listo" ? hecho("listo", "contado", null) : hecho("fabricando", "contado", null);
  }
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
