import { agenda, negocio, optica } from "@/content/visionario";

export interface Bloque {
  /** ISO del inicio del bloque */
  inicio: string;
  hora: number;
  libre: boolean;
}

export interface DiaAgenda {
  /** ISO a medianoche local */
  fecha: string;
  bloques: Bloque[];
  libres: number;
}

/** Ocupación de demostración: estable para una misma fecha y hora. */
function ocupadoDemo(d: Date, hora: number) {
  const clave = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${hora}`;
  let h = 0;
  for (const c of clave) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 100 < 38;
}

/**
 * Bloques exactos de 60 minutos dentro del horario de la óptica.
 * `desfaseDias` solo lo usa el simulador demo para "adelantar el reloj" (renovación).
 */
export function generarAgenda(desde = new Date(), desfaseDias = 0): DiaAgenda[] {
  const ahora = new Date(desde.getTime() + desfaseDias * 86_400_000);
  const { dias, apertura, cierre, pausa } = optica.horario;
  const duracion = negocio.cita.duracionMinutos / 60;
  const limite = ahora.getTime() + 60 * 60 * 1000; // al menos 1 h de anticipación
  const resultado: DiaAgenda[] = [];

  for (let i = 0; i < optica.diasVisiblesAgenda; i++) {
    const dia = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + i);
    if (!(dias as readonly number[]).includes(dia.getDay())) continue;

    const bloques: Bloque[] = [];
    for (let hora = apertura; hora + duracion <= cierre; hora += duracion) {
      if (hora >= pausa.desde && hora < pausa.hasta) continue;
      const inicio = new Date(dia.getFullYear(), dia.getMonth(), dia.getDate(), hora);
      bloques.push({
        inicio: inicio.toISOString(),
        hora,
        libre: inicio.getTime() > limite && !ocupadoDemo(dia, hora),
      });
    }
    resultado.push({ fecha: dia.toISOString(), bloques, libres: bloques.filter((b) => b.libre).length });
  }
  return resultado;
}

/** Los próximos N bloques libres (para la landing). */
export function proximosLibres(n: number, ahora = new Date()) {
  return generarAgenda(ahora)
    .flatMap((d) => d.bloques)
    .filter((b) => b.libre)
    .slice(0, n);
}

const fmtHora = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${h % 1 ? "30" : "00"}`;

/** "10:00 – 11:00" */
export function rangoHora(iso: string) {
  const d = new Date(iso);
  const h = d.getHours() + d.getMinutes() / 60;
  return `${fmtHora(h)} – ${fmtHora(h + negocio.cita.duracionMinutos / 60)}`;
}

const fmtDiaSemana = new Intl.DateTimeFormat("es-BO", { weekday: "long" });
const fmtDiaCorto = new Intl.DateTimeFormat("es-BO", { weekday: "short" });
const fmtFechaLarga = new Intl.DateTimeFormat("es-BO", { weekday: "long", day: "numeric", month: "long" });

const mismoDia = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** "Hoy", "Mañana" o "Jueves" */
export function diaRelativo(iso: string, ahora = new Date()) {
  const d = new Date(iso);
  const manana = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1);
  if (mismoDia(d, ahora)) return "Hoy";
  if (mismoDia(d, manana)) return "Mañana";
  const s = fmtDiaSemana.format(d);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** "lun." → "Lun" */
export function diaCorto(iso: string) {
  const s = fmtDiaCorto.format(new Date(iso)).replace(".", "");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** "Lunes 16 de noviembre" */
export function fechaCita(iso: string) {
  const s = fmtFechaLarga.format(new Date(iso)).replace(",", "");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** "10:00" */
export function horaInicio(iso: string) {
  const d = new Date(iso);
  return fmtHora(d.getHours() + d.getMinutes() / 60);
}

/** "20261112T140000Z": formato de fecha que usa Google Calendar (UTC). */
const fechaGoogle = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Enlace que abre Google Calendar con la cita ya cargada; Calendar la recuerda con sus propias notificaciones. */
export function enlaceGoogleCalendar(inicio: string) {
  const desde = new Date(inicio);
  const hasta = new Date(desde.getTime() + negocio.cita.duracionMinutos * 60_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: agenda.calendarioTitulo,
    dates: `${fechaGoogle(desde)}/${fechaGoogle(hasta)}`,
    details: agenda.calendarioDetalle,
    location: `${optica.nombre}, ${optica.direccion}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
