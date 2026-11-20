/**
 * ARCHIVO ÚNICO DE CONTENIDO — OptiHelp
 *
 * Todo texto, dato, ruta e imagen de la app sale de aquí. Cambiar un dato en
 * este archivo lo cambia en toda la app. No repita estos valores en componentes.
 *
 * OptiHelp es la marca de la app: vende, da el crédito y cobra las cuotas.
 * La atención es en la Óptica Visionario, la óptica aliada (docs/CAMBIOS_FASE_1.md).
 *
 * Convenciones:
 * - `pendiente: true` marca un dato que el negocio aún no ha definido
 *   (ver docs/reglas_de_negocio.md). La UI lo muestra como provisional.
 * - `esDemo: true` marca un dato simulado del prototipo. La UI lo etiqueta "Demo".
 * - Voz: español de Bolivia, tratamiento de usted.
 */

/* ------------------------------------------------------------------ */
/* Tipos                                                               */
/* ------------------------------------------------------------------ */

export type EstadoCuota = "pendiente" | "pagada" | "vencida";
/** Crédito: 4 dioptrías o más, 3 cuotas. Contado: menos de 4, un solo pago. */
export type TipoOrden = "credito" | "contado";
export type TipoNotificacion =
  | "recordatorio-cuota"
  | "lente-listo"
  | "renovacion-6"
  | "renovacion-12"
  | "recordatorio-cita"
  | "orden-recibida"
  | "orden-contado"
  | "pago-confirmado"
  | "cuota-vencida";

export interface OjoReceta {
  esfera: number;
  cilindro: number;
  eje: number;
  adicion: number | null;
}

/* ------------------------------------------------------------------ */
/* Marca                                                               */
/* ------------------------------------------------------------------ */

export const marca = {
  nombre: "OptiHelp",
  /** La óptica donde se atiende al cliente. No es la marca de la app. */
  opticaAliada: "Óptica Visionario",
  ciudad: "Santa Cruz de la Sierra, Bolivia",
  irAlInicio: "OptiHelp, ir al inicio",
  /** Título y descripción de la página (metadatos) */
  lema: "Lentes a medida en 3 cuotas",
  descripcion:
    "Lentes a medida en 3 cuotas sin intereses, solo con su carnet. Le atendemos en la Óptica Visionario, en Santa Cruz de la Sierra.",
  logo: {
    /** Logo de OptiHelp (sin lema) para la barra superior. */
    navbar: { src: "/brand/logo-navbar.png", ancho: 1200, alto: 223 },
    /** El mismo dibujo en tamaño grande: pie, acceso y contrato. */
    completo: { src: "/brand/logo-completo.png", ancho: 1400, alto: 260 },
    /** Versión blanca, sobre fondos oscuros (tarjetas marino, cierre). */
    blanco: { src: "/brand/logo-blanco.png", ancho: 1400, alto: 260 },
    /** Isotipo del ojo, fondo transparente: spinner y estados vacíos. */
    isotipo: { src: "/brand/isotipo.png", ancho: 640, alto: 640 },
    alt: "OptiHelp",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Bandera de demo (simulador de flujos)                               */
/* ------------------------------------------------------------------ */

export const demo = {
  /** Se apaga con NEXT_PUBLIC_DEMO=false sin tocar el resto de la app. */
  activo: process.env.NEXT_PUBLIC_DEMO !== "false",
  etiqueta: "Demo",
  /** Solo lo muestra el simulador de flujos */
  aviso: "Prototipo de demostración. Ningún pago, firma ni mensaje de esta app tiene validez real.",
  /** v2: la forma de los datos cambió en la Fase 1; así no se cargan datos viejos. */
  claveAlmacenamiento: "optihelp-demo-v2",
} as const;

/* ------------------------------------------------------------------ */
/* Reglas de negocio (docs/reglas_de_negocio.md)                       */
/* ------------------------------------------------------------------ */

export const negocio = {
  moneda: "Bs",
  /** Mínimo para acceder al crédito. Con menos: receta cobrada y lentes al contado. */
  medidaMinimaCredito: 4,
  precioReferencial: {
    minimo: 825,
    maximo: 3490,
    etiqueta: "Referencial",
    nota: "El precio exacto depende de su medida y de la montura que elija. Se lo confirmamos en su orden antes de firmar.",
    /** Precios con una montura de precio promedio. PENDIENTE: cotizaciones reales del laboratorio. */
    perfiles: [
      { id: "basico", medida: "Menos de 4 dioptrías", precio: 825, precioTradicional: 950, credito: false },
      { id: "medio", medida: "Media (4 a 6 dioptrías)", precio: 1740, precioTradicional: 2040, credito: true },
      { id: "alto", medida: "Alta (más de 6 dioptrías)", precio: 3490, precioTradicional: 4140, credito: true },
    ],
    pendiente: true,
  },
  contado: {
    receta: { precio: 100, esDemo: true, pendiente: true },
    texto: "Con menos de 4 dioptrías no accede al crédito. Le cobramos la receta y puede comprar sus lentes al contado.",
  },
  cuotas: {
    cantidad: 3,
    porcentajes: [0.4, 0.3, 0.3],
    /** Meses desde la firma: el mismo día de cada mes, como en el contrato de referencia */
    mesesDesdeFirma: [0, 1, 2],
    intereses: false,
    medio: "QR",
  },
  cita: { duracionMinutos: 60, gratuita: true },
  laboratorio: { diasHabilesMinimo: 1, diasHabilesMaximo: 3, pendiente: true },
  atraso: {
    diasHabilesParaRegularizar: 3,
    interesMoratorioMensual: 0.03,
    /** Días hábiles: de lunes a sábado, como el horario de la óptica. PENDIENTE: confirmar si el sábado cuenta. */
    diasHabiles: [1, 2, 3, 4, 5, 6],
    pendiente: true, // revisión legal
  },
  tratamientos: [
    { id: "antirreflejo", nombre: "Antirreflejo", precio: null, pendiente: true },
    { id: "luz-azul", nombre: "Filtro de luz azul", precio: null, pendiente: true },
    { id: "bifocal", nombre: "Bifocal", precio: null, pendiente: true },
  ],
  beneficios: {
    /** ONG 1: paga la montura de los clientes que ella envía. */
    ongMontura: { texto: "La montura la paga {ong}.", pendiente: true },
  },
  renovacionMeses: [6, 12],
  cancelaciones: "Una vez firmado el contrato no hay cancelaciones ni reembolsos.",
  derivacion:
    "Si su evaluación muestra una condición que requiere cirugía, le orientamos hacia otro centro de salud.",
} as const;

/* ------------------------------------------------------------------ */
/* Datos del vendedor (para el contrato)                               */
/* PENDIENTE: OptiHelp debe estar constituida (NIT) antes de vender.   */
/* ------------------------------------------------------------------ */

export const empresa = {
  razonSocial: "[Razón social de OptiHelp]",
  nit: "[NIT]",
  representante: { nombre: "[Nombre del representante legal]", ci: "[C.I.]" },
  domicilio: "[Domicilio legal]",
  ciudad: "Santa Cruz de la Sierra, Bolivia",
  pendiente: true,
};

/* ------------------------------------------------------------------ */
/* Óptica aliada                                                       */
/* ------------------------------------------------------------------ */

export const optica = {
  nombre: "Óptica Visionario",
  rol: "Nuestra óptica aliada",
  direccion: "Centro de Santa Cruz de la Sierra",
  referencia: "Dirección exacta pendiente de confirmar",
  horarioTexto: "Horario pendiente de confirmar",
  /** Horario provisional para generar bloques de 60 minutos en la agenda. */
  horario: {
    /** 1 = lunes … 6 = sábado */
    dias: [1, 2, 3, 4, 5, 6],
    apertura: 9,
    cierre: 18,
    pausa: { desde: 13, hasta: 14 },
  },
  diasVisiblesAgenda: 14,
  pendiente: true,
} as const;

/* ------------------------------------------------------------------ */
/* Rutas                                                               */
/* ------------------------------------------------------------------ */

export const rutas = {
  inicio: "/",
  ingresar: "/ingresar",
  registro: "/registro",
  perfil: "/registro/perfil",
  proceso: "/proceso",
  agendar: "/agendar",
  panel: "/panel",
  orden: "/panel/orden",
  contrato: "/panel/contrato",
  pagos: "/pagos",
  pago: "/pagos/pagar",
  receta: "/receta",
  cuenta: "/panel/cuenta",
  notificaciones: "/panel/notificaciones",
  liquidacion: "/panel/liquidado",
  sistema: "/sistema",
  mapa: "/mapa",
} as const;

export type ClaveRuta = keyof typeof rutas;

/** Mapa de pantallas por fase de construcción (para stubs y el índice del prototipo). */
export const pantallas: {
  ruta: ClaveRuta;
  titulo: string;
  fase: number;
  historia: string | null;
}[] = [
  { ruta: "inicio", titulo: "Inicio", fase: 2, historia: "HU 1.1" },
  { ruta: "ingresar", titulo: "Ingresar", fase: 2, historia: "HU 1.2" },
  { ruta: "registro", titulo: "Crear cuenta", fase: 2, historia: "HU 1.2" },
  { ruta: "perfil", titulo: "Sus datos", fase: 2, historia: "HU 1.3" },
  { ruta: "proceso", titulo: "Cómo es el proceso", fase: 2, historia: "HU 2.1" },
  { ruta: "agendar", titulo: "Mi cita", fase: 2, historia: "HU 2.2" },
  { ruta: "panel", titulo: "Mi estado", fase: 2, historia: "HU 4.1" },
  { ruta: "pagos", titulo: "Mis pagos", fase: 4, historia: "HU 4.2" },
  { ruta: "orden", titulo: "Mi orden de compra", fase: 3, historia: "HU 3.1 · 3.4 · 3.5" },
  { ruta: "contrato", titulo: "Firmar contrato", fase: 3, historia: "HU 3.2" },
  { ruta: "pago", titulo: "Pagar cuota", fase: 3, historia: "HU 3.3" },
  { ruta: "receta", titulo: "Mis recetas", fase: 4, historia: "HU 4.3" },
  { ruta: "cuenta", titulo: "Mi cuenta", fase: 4, historia: "HU 4.4" },
  { ruta: "notificaciones", titulo: "Notificaciones", fase: 4, historia: "HU 4.2" },
  { ruta: "liquidacion", titulo: "Lentes pagados", fase: 5, historia: "HU 5.1" },
];

/* ------------------------------------------------------------------ */
/* Textos compartidos                                                  */
/* ------------------------------------------------------------------ */

export const textos = {
  acciones: {
    agendar: "Agendar cita gratuita",
    registrarse: "Crear cuenta",
    ingresar: "Ingresar",
    continuar: "Continuar",
    volver: "Volver",
    verCuotas: "Ver mis cuotas pendientes",
    pagarCuota: "Pagar cuota",
    firmar: "Firmar contrato",
    borrarFirma: "Borrar y firmar de nuevo",
    cerrarSesion: "Cerrar sesión",
    guardar: "Guardar cambios",
    conGoogle: "Continuar con Google",
    conCorreo: "Continuar con correo",
  },
  estadosCuota: {
    pagada: { etiqueta: "Pagada", descripcion: "Pago recibido" },
    pendiente: { etiqueta: "Pendiente", descripcion: "Por pagar" },
    vencida: { etiqueta: "Vencida", descripcion: "Fecha de pago superada" },
  } satisfies Record<EstadoCuota, { etiqueta: string; descripcion: string }>,
  progresoCuotas: (pagadas: number, total: number) =>
    pagadas === total
      ? `Ha pagado sus ${total} cuotas`
      : `Ha pagado ${pagadas} de ${total} cuotas`,
  faltanCuotas: (faltan: number) =>
    faltan === 1 ? "Le falta 1 cuota" : `Le faltan ${faltan} cuotas`,
  /** "Cuota inicial" para la 1; "Cuota 2 de 3" para las demás. */
  nombreCuota: (n: number, total: number) => (n === 1 ? "Cuota inicial" : `Cuota ${n} de ${total}`),
  porcentaje: (p: number) => `${Math.round(p * 100)}%`,
  referencial: "Referencial",
  pendiente: "Dato pendiente",
  cargando: "Cargando…",
  errores: {
    requerido: "Este dato es necesario para continuar.",
    correo: "Revise el correo: debe tener la forma nombre@correo.com.",
    whatsapp: "Escriba su número de 8 dígitos. Ejemplo: 71234567.",
    edad: "Escriba su edad en números.",
    ci: "Escriba su número de carnet, solo números. Ejemplo: 7712765.",
    domicilio: "Escriba su zona, barrio o calle.",
    generico: "Algo no salió como esperábamos. Intente de nuevo.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Landing (HU 1.1)                                                    */
/* ------------------------------------------------------------------ */

export const landing = {
  /** Las negritas se marcan con **asteriscos** y se pintan con <ConNegrita>. */
  heroe: {
    etiqueta: "Lentes en cuotas · Santa Cruz",
    titulo: { antes: "Sus lentes a medida,", resaltado: "en 3 cuotas", despues: "sin intereses." },
    bajada: "Para medidas desde **4 dioptrías**. Solo con su **carnet**. Le atendemos en la **Óptica Visionario**.",
    verComo: "Ver cómo funciona",
    pruebas: ["Medición gratis", "Sin garantía", "Listos en 1 a 3 días"],
    foto: { src: "/fotos/mujer-lentes.jpg", alt: "Mujer sonriente con sus lentes nuevos" },
    chips: { cita: "Cita gratis · 60 min", cuota: "Cuota inicial pagada", listo: "¡Sus lentes están listos!", atencion: "Óptica Visionario" },
  },
  horarios: {
    titulo: "Próximos horarios libres",
    nota: "Cita gratuita de 60 minutos en la óptica",
    verTodos: "Ver todos los horarios",
  },
  dolor: {
    etiqueta: "El problema",
    titulo: { antes: "Ver mal le cuesta", resaltado: "trabajo,", despues: "estudio y salud." },
    datos: [
      { cifra: "Bs 1.740–3.490", texto: "cuesta un lente a medida **al contado**. Imposible de juntar de golpe.", fuente: "Precio referencial" },
      { cifra: "+33%", texto: "más ganan las personas que **corrigen su visión**.", fuente: "Estudio THRIVE, 2024" },
      { cifra: "4+ dioptrías", texto: "y sus lentes **deben tallarse a medida**. Las ópticas económicas no los tienen." },
      { cifra: "Cada año", texto: "los lentes se **rayan, se rompen o se pierden**. Sobre todo los de los niños." },
    ],
  },
  comparacion: {
    etiqueta: "Por qué OptiHelp",
    titulo: { antes: "Lo que hay hoy", resaltado: "no le sirve", despues: "" },
    hoy: "Hoy",
    con: "Con OptiHelp",
    puntosHoy: [
      "Campañas que llegan **cada tantos meses**",
      "Ópticas baratas que **no hacen medidas altas**",
      "Crédito con **precios muy altos**",
      "Pagar **todo al contado**",
    ],
    puntosCon: [
      "Su cita **cuando usted quiera**, desde el celular",
      "Lentes **tallados a medida** en laboratorio",
      "**3 cuotas** sin intereses",
      "Solo su **carnet**, sin garantía",
    ],
  },
  pasos: {
    etiqueta: "Cómo funciona",
    titulo: { antes: "Tres pasos y", resaltado: "vuelve a ver bien", despues: "" },
    lista: [
      {
        pestana: "Agende",
        titulo: "Una hora **solo para usted**.",
        texto: "Elija día y hora desde su celular. La cita y la medición son **gratis**.",
        puntos: ["Bloques de 60 minutos", "Medición sin costo", "Recordatorio por WhatsApp"],
      },
      {
        pestana: "En la óptica",
        titulo: "Medimos su vista y **elige su montura**.",
        texto: "En la **Óptica Visionario** le medimos la vista y elige su montura entre las de la óptica.",
        puntos: ["Medición sin costo", "Monturas de la óptica", "Firma su contrato en el celular"],
      },
      {
        pestana: "Pague y recoja",
        titulo: "Pague el 40% por QR y **recoja en 1 a 3 días**.",
        texto: "Con su primer pago mandamos a hacer sus lentes y le avisamos por **WhatsApp** cuando estén listos.",
        puntos: ["Cuotas sin intereses", "Aviso por WhatsApp", "Todo por QR"],
      },
    ],
  },
  /** Lo que muestra el celular de ejemplo en "Cómo funciona" (montos referenciales) */
  celular: {
    traiga: "Traiga su carnet",
    orden: {
      titulo: "Su orden",
      montura: "Montura · Óptica Visionario",
      monturaDetalle: "Elegida por usted en la óptica",
      total: "Precio total · referencial",
      inicial: "Cuota inicial 40%",
      sinGarantia: "Sin garantía: solo su carnet",
    },
    pago: {
      titulo: "Cuota inicial",
      recibido: "Pago recibido",
      remitente: "OptiHelp",
      mensaje: "¡Sus lentes están listos! Recójalos en la Óptica Visionario.",
    },
    qr: "Código QR de ejemplo",
    chips: [
      [
        { emoji: "📅", texto: "60 min para usted" },
        { emoji: "💬", texto: "Recordatorio por WhatsApp" },
      ],
      [
        { emoji: "👓", texto: "Medición gratis" },
        { emoji: "🤝", texto: "Sin garantía" },
      ],
      [
        { emoji: "📱", texto: "Pago por QR" },
        { emoji: "🎉", texto: "¡Listos!" },
      ],
    ],
  },
  paraQuien: {
    etiqueta: "Para quién es",
    titulo: { antes: "Para quienes ver bien es", resaltado: "su herramienta", despues: "" },
    texto: "Costureras, mecánicos, comerciantes, choferes, estudiantes y **niños** con medidas medianas y severas.",
    fotos: [
      { src: "/fotos/sastre.jpg", alt: "Sastre con lentes en su taller", rol: "Sastre" },
      { src: "/fotos/nina-escuela.jpg", alt: "Niña con lentes en su escuela", rol: "Estudiante" },
      { src: "/fotos/trabajador-taller.jpg", alt: "Mecánico con lentes en su taller", rol: "Mecánico" },
      { src: "/fotos/nino-lentes.jpg", alt: "Niño sonriente con lentes", rol: "Niño" },
    ],
    escala: {
      comun: "Menos de 4: receta y lentes al contado",
      medida: "4 o más: lentes en 3 cuotas",
    },
    noSabe: "¿No sabe su medida? **Se la medimos** en su cita.",
  },
  /** Una línea opcional para quien llega enviado por una ONG */
  ong: "¿Le envía una ONG? Díganos en su registro: puede pagar menos por su montura.",
  cuotas: {
    etiqueta: "Las cuotas",
    titulo: { antes: "Una cuota inicial y", resaltado: "dos más pequeñas.", despues: "" },
    ejemplo: 1000,
    nota: "Ejemplo con un lente de **Bs 1.000**. El precio exacto se lo damos **antes de firmar** y no cambia.",
    pasos: ["Al mandar a hacer", "Al mes", "A los 2 meses"],
    final: "Listo, son suyos",
    atraso: "Si se atrasa, tiene **3 días hábiles** para ponerse al día sin recargo.",
  },
  dondeAtendemos: {
    etiqueta: "Dónde le atendemos",
    titulo: { antes: "En la", resaltado: "Óptica Visionario", despues: "" },
    texto: "Nuestra óptica aliada en el centro de Santa Cruz: ahí le medimos la vista, elige su montura y recoge sus lentes.",
    direccion: "Dirección exacta pendiente de confirmar",
    horario: "Horario pendiente de confirmar",
    /** Foto marcador hasta tener la foto real de la óptica */
    foto: { src: "/fotos/optica-espejo.jpg", alt: "Foto de referencia de una óptica", etiqueta: "Foto de referencia" },
    pendiente: true,
  },
  cierre: {
    titulo: { antes: "Su primera cita es", resaltado: "gratis", despues: "" },
    texto: "Traiga su **carnet de identidad**. Nosotros hacemos el resto.",
    accion: "Agendar cita gratuita",
  },
  pie: {
    requisitos: "Para su cita traiga su carnet de identidad.",
    atencion: "Atención en la",
    creditos: "Fotografías de Pexels",
  },
} as const;

/* ------------------------------------------------------------------ */
/* El recorrido: una sola línea del primer clic a los lentes pagados.  */
/* Se usa para explicar (sistema visual) y para ubicar al paciente.    */
/* ------------------------------------------------------------------ */

export type IdParada = "cita" | "medicion" | "firma" | "recojo" | "cuota-2" | "cuota-3" | "terminado";

export const recorrido = {
  titulo: "Cómo funciona",
  paradas: [
    { id: "cita", titulo: "Agenda su cita", texto: "Elija día y hora desde el celular. Le reservamos 60 minutos.", lugar: "app", aviso: "Traiga su carnet de identidad" },
    { id: "medicion", titulo: "Medición y montura", texto: "En la Óptica Visionario medimos su vista y elige su montura.", lugar: "optica" },
    { id: "firma", titulo: "Firma y paga el 40%", texto: "Firma su contrato en el celular y paga la cuota inicial por QR. Con eso mandamos a hacer sus lentes.", lugar: "app" },
    { id: "recojo", titulo: "Recoge sus lentes", texto: "En 1 a 3 días hábiles. Le avisamos por WhatsApp.", lugar: "optica" },
    { id: "cuota-2", titulo: "Cuota 2", texto: "Un mes después. Le avisamos antes por WhatsApp.", lugar: "app" },
    { id: "cuota-3", titulo: "Cuota 3", texto: "Dos meses después.", lugar: "app" },
    { id: "terminado", titulo: "Terminó de pagar", texto: "Sus lentes son suyos y tiene un descuento en gafas de sol.", lugar: "app" },
  ] satisfies { id: IdParada; titulo: string; texto: string; lugar: "app" | "optica"; aviso?: string }[],
  lugares: { app: "Desde su celular", optica: "En la óptica" },
  aquiEsta: "Usted está aquí",
} as const;

/* ------------------------------------------------------------------ */
/* Autenticación simulada (HU 1.2)                                     */
/* ------------------------------------------------------------------ */

export const acceso = {
  /** Los dos caminos conviven en una misma pantalla: "Crear cuenta" primero, "Ingresar" después. */
  pestanas: { registro: "Crear cuenta", ingreso: "Ingresar" },
  registro: { titulo: "Cree su cuenta", enviar: "Crear cuenta" },
  ingreso: { titulo: "Bienvenido de nuevo", enviar: "Ingresar" },
  conGoogle: { registro: "Registrarme con Google", ingreso: "Ingresar con Google" },
  separador: "o con su correo",
  datosDespues: "Al crear su cuenta le pediremos unos datos para atenderle.",
  correo: "Correo electrónico",
  contrasena: "Contraseña",
  contrasenaAyuda: "Al menos 6 caracteres.",
  mostrar: "Mostrar contraseña",
  ocultar: "Ocultar contraseña",
  errores: {
    contrasena: "La contraseña debe tener al menos 6 caracteres.",
  },
  privacidad: "Solo le pedimos lo necesario para atenderle.",
} as const;

/* ------------------------------------------------------------------ */
/* Educación del proceso (carrusel antes de la agenda — HU 2.1)        */
/* ------------------------------------------------------------------ */

export const proceso = {
  titulo: "Cómo funciona",
  /** Tres pasos, solo título (con negritas). Las fotos y chips cuentan el resto. */
  diapositivas: [
    {
      id: "cuotas",
      titulo: "Sus lentes a medida en **3 cuotas sin intereses**.",
      foto: { src: "/fotos/mujer-lentes.jpg", alt: "" },
      chips: [
        { emoji: "🪪", texto: "Su carnet" },
        { emoji: "✅", texto: "Sin intereses" },
        { emoji: "🤝", texto: "Sin garantía" },
      ],
    },
    {
      id: "optica",
      titulo: "**Agende gratis.** En la Óptica Visionario le medimos la vista y **elige su montura**.",
      foto: { src: "/fotos/examen-vista.jpg", alt: "" },
      chips: [
        { emoji: "📅", texto: "Su hora" },
        { emoji: "👓", texto: "Medición gratis" },
        { emoji: "🕶️", texto: "Monturas de la óptica" },
      ],
    },
    {
      id: "recoger",
      titulo: "**Pague el 40% por QR** y recoja sus lentes. El resto, en 2 cuotas.",
      foto: { src: "/fotos/nino-lentes.jpg", alt: "" },
      chips: [
        { emoji: "📱", texto: "Cuota inicial pagada" },
        { emoji: "💬", texto: "¡Sus lentes están listos!" },
        { emoji: "🕶️", texto: "Descuento en gafas de sol" },
      ],
    },
  ],
  anterior: "Anterior",
  siguiente: "Siguiente",
  saltar: "Saltar",
  final: "Ir a mi cita",
  finalRepaso: "Volver a mi estado",
  finalVisitante: "Agendar cita gratuita",
} as const;

/* ------------------------------------------------------------------ */
/* Agenda (HU 2.2)                                                     */
/* ------------------------------------------------------------------ */

export const agenda = {
  titulo: "Mi cita",
  carnetAviso: "Traiga su carnet de identidad",
  dia: "Elija el día",
  hora: "Elija la hora",
  manana: "Mañana",
  tarde: "Tarde",
  ocupado: "Ocupado",
  sinHorarios: "Ya no quedan horarios libres este día. Elija otro día.",
  confirmar: "Confirmar cita",
  cambiar: "Cambiar horario de mi cita",
  mantener: "Mantener mi cita actual",
  calendario: "Agregar a Google Calendar",
  calendarioTitulo: "Cita en Óptica Visionario (OptiHelp)",
  calendarioDetalle: "Traiga su carnet de identidad.",
  eligeHora: "Elija una hora para continuar",
  confirmada: {
    titulo: "Su cita está reservada",
    traer: "También traiga",
    requisitos: ["Su carnet de identidad", "Sus lentes actuales, si tiene"],
    menor: "Si los lentes son para un menor, debe venir con su padre, madre o tutor.",
    festejo: "¡Su cita está reservada!",
    queSigue: [
      { emoji: "💬", texto: "Le recordamos por **WhatsApp** un día antes" },
      { emoji: "🪪", texto: "Traiga su **carnet**" },
      { emoji: "👓", texto: "Le medimos la vista y elige su montura en la óptica" },
    ],
  },
  tarjeta: { reservada: "Su cita", realizada: "Cita realizada" },
  verEstado: "Ver mi estado",
  cupon: (porcentaje: number) => `Descuento de ${porcentaje}% aplicado a su próxima compra`,
  cuponAplicado: (porcentaje: number, codigo: string) => `Descuento de ${porcentaje}% aplicado · ${codigo}`,
} as const;

/* ------------------------------------------------------------------ */
/* Mi estado (antes "inicio") y navegación                             */
/* ------------------------------------------------------------------ */

export const estado = {
  guia: "Ver cómo consigo mis lentes",
  recorrido: "Su recorrido",
  ahora: "Ahora",
  acciones: {
    agendar: "Agendar mi cita",
    verCita: "Ver mi cita",
    verOrden: "Ver mi orden",
    pagar: (n: number) => (n === 1 ? "Pagar cuota inicial" : `Pagar cuota ${n}`),
    pagarContado: "Pagar por QR",
    verBeneficio: "Ver mi beneficio",
  },
  /** Qué está pasando ahora con el paciente: una frase corta por situación */
  situaciones: {
    "sin-cita": { titulo: "Agende su cita gratuita", detalle: "Traiga su carnet de identidad." },
    cita: { titulo: (fecha: string) => `Su cita es el ${fecha}`, detalle: "Traiga su carnet de identidad." },
    orden: { titulo: "Su orden de compra está lista", detalle: "Revísela y firme su contrato." },
    contado: { titulo: "Su orden al contado está lista", detalle: "Su medida no requiere crédito. Revise su receta y pague por QR." },
    "cuota-1": { titulo: "Pague su cuota inicial", detalle: "Con ese pago mandamos a hacer sus lentes." },
    fabricando: { titulo: "Estamos fabricando sus lentes", detalle: "Tardan de 1 a 3 días hábiles. Le avisaremos por WhatsApp." },
    vencida: { titulo: (n: number) => `Su cuota ${n} está vencida`, detalle: "Póngase al día en 3 días hábiles para evitar el interés por atraso." },
    listo: { titulo: "Sus lentes están listos", detalle: "Recójalos en la Óptica Visionario con su carnet de identidad." },
    liquidado: { titulo: "Terminó de pagar", detalle: "Sus lentes son suyos. Tiene un descuento en gafas de sol." },
  },
  proximaCuota: (n: number, fecha: string) => `Próxima: cuota ${n}, vence el ${fecha}`,
  /** Tarjeta de la orden al contado (sin recorrido de cuotas) */
  contado: {
    titulo: "Su orden al contado",
    total: "Total a pagar",
    verOrden: "Ver mi orden y mi receta",
  },
  /** El recorrido: cada parada es un solo título largo y simple */
  paradas: {
    cita: {
      pendiente: "Agende su cita gratuita y traiga su carnet de identidad",
      hecha: (fecha: string) => `Su cita es el ${fecha}. Traiga su carnet de identidad`,
      pasada: "Cita realizada",
    },
    medicion: { pendiente: "En la Óptica Visionario medimos su vista y elige su montura", hecha: "Medición y montura listas" },
    firma: {
      pendiente: "Firme su contrato y pague el 40% por QR",
      hecha: "Contrato firmado y cuota inicial pagada",
    },
    recojo: {
      pendiente: "Recoja sus lentes en 1 a 3 días hábiles. Le avisamos por WhatsApp",
      hecha: "Sus lentes están listos en la óptica",
    },
    "cuota-2": "Pague la cuota 2, un mes después",
    "cuota-3": "Pague la cuota 3, dos meses después",
    terminado: "Terminó de pagar: sus lentes son suyos y tiene un descuento en gafas de sol",
  },
} as const;

export const navegacion = {
  cita: "Mi cita",
  estado: "Estado",
  pagos: "Pagos",
  receta: "Recetas",
  cuenta: "Mi cuenta",
  avisos: "Notificaciones",
  /** Etiqueta corta para la pestaña del menú global */
  avisosCorto: "Avisos",
  conNovedades: "hay novedades",
  volver: "Volver",
  cerrar: "Cerrar",
  menuPrincipal: "Navegación principal",
  pasoDe: (n: number, total: number) => `Paso ${n} de ${total}`,
  /** Título de cada pantalla en la barra superior */
  titulos: {
    cita: "Mi cita",
    estado: "Mi estado",
    pagos: "Mis pagos",
    receta: "Mis recetas",
    cuenta: "Mi cuenta",
    avisos: "Notificaciones",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Formulario de perfil (HU 1.3) — solo los datos documentados         */
/* El registro NO pide carnet ni domicilio: se piden antes de firmar.  */
/* ------------------------------------------------------------------ */

export const formularioPerfil = {
  /** Tres pantallas cortas. Hasta completarlas no se entra a la app. */
  pasos: [
    { id: "datos", titulo: "Para empezar" },
    { id: "vista", titulo: "Sobre su vista" },
    { id: "origen", titulo: "¿Cómo nos conoció?" },
  ],
  barra: "Sus datos",
  continuar: "Continuar",
  terminar: "Terminar",
  menorDeEdad: "Como el paciente es menor de edad, el contrato lo firma su padre, madre o tutor.",
  elegir: "Elija una opción",
  elegirVarias: "Puede marcar varias",
  campos: {
    nombre: { etiqueta: "Nombre completo", ejemplo: "Ej.: Rosa Mamani Flores" },
    whatsapp: { etiqueta: "Número de WhatsApp", ejemplo: "Ej.: 71234567" },
    correo: { etiqueta: "Correo electrónico", ejemplo: "nombre@correo.com" },
    edad: { etiqueta: "Edad", ejemplo: "Ej.: 42" },
    usoLentes: { etiqueta: "¿Ha usado lentes antes?", opciones: ["Sí", "No"] },
    usoMedidas: { etiqueta: "¿Le han medido la vista antes?", opciones: ["Sí", "No"] },
    medidaEstimada: {
      etiqueta: "¿Cuál es su medida aproximada?",
      opciones: ["Menos de 4 dioptrías", "Entre 4 y 6 dioptrías", "Más de 6 dioptrías", "No sé"],
      /** Opciones que muestran la aclaración de abajo */
      conAclaracion: ["Menos de 4 dioptrías", "No sé"],
      noSabe: "El crédito es para medidas desde 4 dioptrías. Si su medida es menor, le cobramos la receta y puede comprar sus lentes al contado.",
    },
    comoNosConocio: {
      etiqueta: "¿Cómo nos conoció?",
      opciones: ["Facebook", "TikTok", "Instagram", "WhatsApp", "Un familiar o conocido", "Una ONG o fundación", "Pasé por la Óptica Visionario", "Otro"],
      /** La opción que muestra la pregunta por la ONG */
      ong: "Una ONG o fundación",
    },
    /** Solo si eligió "Una ONG o fundación". Opcional y no aplica descuento por sí solo. */
    institucion: {
      etiqueta: "¿Cómo se llama la ONG?",
      ejemplo: "Ej.: Fundación Ver Bien",
      ayuda: "Es opcional. Si la ONG le ayuda con su montura, se lo confirmamos en su orden.",
    },
  },
} as const;

/* ------------------------------------------------------------------ */
/* Notificaciones (plantillas)                                         */
/* ------------------------------------------------------------------ */

export const notificaciones: Record<TipoNotificacion, { titulo: string; texto: string; accion: string | null; ruta: ClaveRuta | null }> = {
  "recordatorio-cita": {
    titulo: "Su cita es mañana",
    texto: "Traiga su carnet de identidad.",
    accion: "Ver mi cita",
    ruta: "agendar",
  },
  "orden-recibida": {
    titulo: "Su orden de compra está lista",
    texto: "Revise sus lentes, firme el contrato y pague la cuota inicial.",
    accion: "Ver mi orden",
    ruta: "orden",
  },
  "orden-contado": {
    titulo: "Su receta y su orden están listas",
    texto: "Su medida no requiere crédito. Revise el precio al contado.",
    accion: "Ver mi orden",
    ruta: "orden",
  },
  "pago-confirmado": {
    titulo: "Recibimos su pago",
    texto: "Su pago quedó registrado. Gracias por cumplir.",
    accion: "Ver mis pagos",
    ruta: "pagos",
  },
  "lente-listo": {
    titulo: "Sus lentes están listos",
    texto: "Recójalos en la Óptica Visionario con su carnet de identidad.",
    accion: "Ver mi estado",
    ruta: "panel",
  },
  "recordatorio-cuota": {
    titulo: "Su próxima cuota vence pronto",
    texto: "Pague con QR desde la app en un minuto.",
    accion: "Pagar cuota",
    ruta: "pago",
  },
  "cuota-vencida": {
    titulo: "Tiene una cuota vencida",
    texto: "Tiene 3 días hábiles para ponerse al día sin recargo.",
    accion: "Pagar cuota",
    ruta: "pago",
  },
  "renovacion-6": {
    titulo: "Ya pasaron 6 meses",
    texto: "Revise su medida con un descuento ya aplicado.",
    accion: "Agendar con descuento",
    ruta: "agendar",
  },
  "renovacion-12": {
    titulo: "Ya pasó un año con sus lentes",
    texto: "Agende su revisión con su descuento ya aplicado.",
    accion: "Agendar con descuento",
    ruta: "agendar",
  },
};

/* ------------------------------------------------------------------ */
/* Cupones (PENDIENTE: porcentajes reales)                             */
/* ------------------------------------------------------------------ */

export const cupones = {
  renovacion: { codigo: "RENUEVA", porcentaje: 10, esDemo: true, pendiente: true },
  liquidacion: {
    codigo: "GRACIAS",
    porcentaje: 15,
    producto: "Gafas de sol",
    pagaDescuento: "OptiHelp",
    esDemo: true,
    pendiente: true,
  },
} as const;

/* ------------------------------------------------------------------ */
/* Simulador de flujos                                                 */
/* ------------------------------------------------------------------ */

export const simulador = {
  titulo: "Simulador de flujos",
  descripcion: "Dispara lo que en la vida real haría el ERP de OptiHelp, la óptica o el paso del tiempo.",
  abrir: "Abrir simulador de demo",
  cerrar: "Cerrar simulador",
  acciones: {
    ordenErp: "Simular orden del ERP (crédito)",
    ordenOng: "Simular orden con montura pagada por ONG",
    ordenContado: "Simular orden al contado (menos de 4 dioptrías)",
    pagoCuota: "Simular pago de cuota",
    laboratorio: "Simular laboratorio listo",
    mora: "Simular vencimiento o mora",
    liquidacion: "Simular liquidación",
    notificacion: "Mostrar notificación",
    reiniciar: "Reiniciar demo",
  },
  descripciones: {
    ordenErp: "Tras la cita se carga la orden con la medida, la montura y el precio.",
    ordenOng: "La misma orden, pero la ONG aliada paga la montura y el cliente paga menos.",
    ordenContado: "La medida es menor a 4 dioptrías: receta cobrada y lentes al contado, sin contrato.",
    pagoCuota: "Marca como pagada la próxima cuota (o el pago único del contado).",
    laboratorio: "El laboratorio terminó los lentes: aviso para recoger en la óptica.",
    mora: "La próxima cuota pasa a vencida y empiezan los 3 días hábiles para regularizar.",
    liquidacion: "Paga todas las cuotas pendientes de una vez.",
    reiniciar: "Borra todo y vuelve al visitante sin cuenta.",
  },
  requisitos: {
    sesion: "Requiere una cuenta iniciada",
    orden: "Ya hay una orden: solo puede haber una",
    contrato: "Requiere contrato firmado",
    pago: "Requiere contrato firmado u orden al contado",
    cuotas: "No quedan cuotas pendientes",
    laboratorio: "Requiere la cuota inicial o el pago al contado",
  },
  tipoNotificacion: "Tipo de notificación",
  estado: "Estado actual",
  filas: { cuenta: "Cuenta", cita: "Cita", orden: "Orden", cuotas: "Cuotas" },
  tiposOrden: { credito: "crédito", ong: "crédito con ONG", contado: "al contado" },
  mapa: "Mapa del prototipo",
  sistema: "Sistema visual",
  confirmarReinicio: "¿Reiniciar la demo? Se borran la cuenta, la cita y los pagos simulados.",
  tiposNotificacion: [
    { tipo: "recordatorio-cuota", etiqueta: "Recordatorio de cuota" },
    { tipo: "lente-listo", etiqueta: "Lente listo" },
    { tipo: "renovacion-6", etiqueta: "Renovación a 6 meses" },
    { tipo: "renovacion-12", etiqueta: "Renovación a 12 meses" },
    { tipo: "recordatorio-cita", etiqueta: "Recordatorio de cita" },
  ] satisfies { tipo: TipoNotificacion; etiqueta: string }[],
} as const;

/* ------------------------------------------------------------------ */
/* Datos semilla (se inyectan con el simulador; "Reiniciar demo" vuelve aquí) */
/* ------------------------------------------------------------------ */

export const semilla = {
  /** Persona de demostración que usa el acceso simulado con Google. */
  usuarioGoogle: {
    nombre: "Rosa Mamani Flores",
    correo: "rosa.mamani@correo.com",
    /** Foto de perfil de ejemplo (Pexels) */
    foto: "/fotos/avatar-rosa.jpg",
    esDemo: true,
  },
  /** Orden de crédito que OptiHelp carga en su ERP tras la cita. */
  orden: {
    numero: "OC-0001",
    tipo: "credito" as TipoOrden,
    optica: "Óptica Visionario",
    lente: "Lente orgánico tallado a medida", // perfil medio por la receta demo (−5,25)
    tratamientos: ["antirreflejo"],
    montura: { descripcion: "Montura elegida en la Óptica Visionario", valor: 240, cubiertaPor: null as string | null },
    receta: null as number | null, // solo en contado: precio de la receta
    precioLista: 1740,
    total: 1740,
    esDemo: true,
  },
  /** Nombre de la ONG de demostración que paga la montura. PENDIENTE: nombre real. */
  ongDemo: "ONG aliada (demo)",
  /** Orden al contado: receta demo con −2,50 / −2,00 · perfil básico */
  ordenContado: {
    numero: "OC-0001",
    tipo: "contado" as TipoOrden,
    optica: "Óptica Visionario",
    lente: "Lente orgánico",
    tratamientos: [] as string[],
    montura: { descripcion: "Montura elegida en la Óptica Visionario", valor: 240, cubiertaPor: null as string | null },
    receta: 100 as number | null,
    precioLista: 825,
    total: 925,
    esDemo: true,
  },
  receta: {
    fecha: null as string | null, // se fija a la fecha de la cita al simular la orden
    profesional: "Optometrista",
    ojoDerecho: { esfera: -5.25, cilindro: -1.5, eje: 180, adicion: null } satisfies OjoReceta,
    ojoIzquierdo: { esfera: -4.75, cilindro: -1.0, eje: 170, adicion: null } satisfies OjoReceta,
    distanciaPupilar: 62,
    esDemo: true,
  },
  /** Receta de la orden al contado: menos de 4 dioptrías */
  recetaContado: {
    fecha: null as string | null,
    profesional: "Optometrista",
    ojoDerecho: { esfera: -2.5, cilindro: -0.5, eje: 180, adicion: null } satisfies OjoReceta,
    ojoIzquierdo: { esfera: -2.0, cilindro: -0.25, eje: 170, adicion: null } satisfies OjoReceta,
    distanciaPupilar: 62,
    esDemo: true,
  },
} as const;

/* ------------------------------------------------------------------ */
/* Fase 3 · Orden de compra (HU 3.1 · 3.4 · 3.5)                       */
/* ------------------------------------------------------------------ */

export const orden = {
  titulo: "Su orden de compra",
  bajada: "Revise que todo esté correcto antes de firmar.",
  vacia: {
    titulo: "Su orden llegará después de su cita",
    texto: "Cuando termine su cita en la Óptica Visionario, su orden aparecerá aquí con el detalle de sus lentes.",
    chips: { lentes: "Sus lentes", montura: "Su montura" },
    accion: "Ir a mi estado",
  },
  encabezado: "Su orden · Óptica Visionario",
  numero: "Orden",
  recibida: "Recibida el",
  lente: "Lente",
  tratamientos: "Tratamiento",
  sinTratamiento: "Sin tratamiento adicional",
  montura: "Montura",
  monturaIncluida: "Incluida en el precio total",
  montoOng: "Pagada por {ong}",
  atiende: { etiqueta: "Le atiende", valor: "Óptica Visionario" },
  financia: { etiqueta: "Crédito de", valor: "OptiHelp" },
  receta: "Su medida",
  verReceta: "Ver receta completa",
  precioLista: "Precio de sus lentes",
  total: "Precio total",
  sinIntereses: "Sin intereses. Este monto no cambia.",
  plan: "Así quedan sus 3 cuotas",
  cuandoCuota: ["Hoy, al mandar a hacer (40%)", "En un mes (30%)", "En dos meses (30%)"],
  firmar: "Revisar y firmar contrato",
  firmado: (fecha: string) => `Contrato firmado el ${fecha}`,
  verCuotas: "Ver mis cuotas",
  ojoDerecho: "Ojo derecho",
  ojoIzquierdo: "Ojo izquierdo",
  /** Orden al contado: menos de 4 dioptrías, sin crédito */
  contado: {
    titulo: "Su orden al contado",
    aviso: "Su medida es menor a 4 dioptrías, por eso no aplica el crédito.",
    receta: "Receta",
    lentes: "Lentes al contado",
    total: "Total a pagar",
    unPago: "Un solo pago por QR, a OptiHelp.",
    accion: "Pagar por QR",
    pagado: (fecha: string) => `Pagado el ${fecha}`,
    verPagos: "Ver mi pago",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Fase 3 · Contrato (HU 3.2)                                          */
/* TEXTO PROVISIONAL, basado en el contrato de The Blink Eye           */
/* (docs/CAMBIOS_FASE_1.md §5). Debe revisarlo un abogado antes del    */
/* lanzamiento (reglas §14).                                           */
/* ------------------------------------------------------------------ */

/** Lo que el contrato necesita para armar sus cláusulas (ya formateado). */
export interface DatosContrato {
  total: string;
  precioLista: string;
  /** Nombre de la ONG que paga la montura, si aplica */
  ong: string | null;
  cuotas: { fecha: string; monto: string }[];
}

export const contrato = {
  titulo: "Contrato",
  tarjeta: { titulo: "Contrato de compra en cuotas", detalle: "Léalo antes de firmar", ver: "Ver" },
  vacio: {
    titulo: "Aún no hay contrato para firmar",
    texto: "Se prepara cuando OptiHelp carga su orden de compra después de su cita.",
    chips: { firma: "Firma en pantalla", papel: "Sin papeles" },
  },
  contado: {
    titulo: "Su orden es al contado",
    texto: "Con una medida menor a 4 dioptrías no hay contrato de crédito. Pague su orden por QR.",
    accion: "Ver mi orden",
  },
  /** Paso previo a la firma: datos que el contrato necesita */
  datos: {
    titulo: "Sus datos para el contrato",
    texto: "El contrato lleva su carnet y su domicilio. Los guardamos para no pedírselos de nuevo.",
    menor: "Como el paciente es menor de edad, escriba los datos del padre, madre o tutor que firma.",
    ci: { etiqueta: "Número de carnet (C.I.)", ejemplo: "Ej.: 7712765" },
    extension: { etiqueta: "Extensión", opciones: ["SC", "LP", "CB", "OR", "PT", "CH", "TJ", "BE", "PD"], porDefecto: "SC" },
    domicilio: { etiqueta: "Domicilio", ejemplo: "Ej.: Plan 3000, calle 5, casa 12" },
    whatsapp: { etiqueta: "Celular (WhatsApp)", ayuda: "Viene de su perfil. Corríjalo si cambió." },
    continuar: "Continuar al contrato",
    resumen: "Sus datos",
    cambiar: "Cambiar",
  },
  documento: {
    cerrar: "Cerrar contrato",
    pagina: (n: number, total: number) => `Página ${n} de ${total}`,
    paginas: (n: number) => `${n} págs.`,
    encabezado: "Contrato de compra en cuotas sin interés",
    partes: {
      optihelp: (e: { razonSocial: string; nit: string; representante: { nombre: string; ci: string }; domicilio: string }) =>
        `Entre ${e.razonSocial}, con NIT ${e.nit}, representada por ${e.representante.nombre}, con C.I. ${e.representante.ci}, con domicilio en ${e.domicilio} (en adelante, OPTIHELP);`,
      cliente: (c: { nombre: string; ci: string; domicilio: string; whatsapp: string }) =>
        `y ${c.nombre || "[Nombre]"}, con C.I. ${c.ci || "[C.I.]"}, domiciliado en ${c.domicilio || "[Domicilio]"}, celular ${c.whatsapp || "[Celular]"} (en adelante, EL CLIENTE).`,
      optica: "La Óptica Visionario realiza la medición, la fabricación y la entrega de los lentes.",
    },
    lugarFecha: (fecha: string) => `Firmado en Santa Cruz de la Sierra, el ${fecha}.`,
    firmas: {
      cliente: "EL CLIENTE",
      optihelp: "OPTIHELP",
      ci: (ci: string) => `C.I. ${ci}`,
      sinFirma: "Firma al pie de la pantalla de firma",
      firmaOptihelp: "[Firma del representante legal]",
    },
    pendienteLegal: "Pendiente de revisión legal",
    provisional: "Texto provisional, pendiente de revisión legal.",
  },
  /** Cláusulas en orden. `soloConOng`: solo si una ONG paga la montura. */
  condiciones: [
    {
      id: "objeto",
      titulo: "Objeto del contrato",
      parrafos: (d: DatosContrato) => [
        { texto: `EL CLIENTE compra a OPTIHELP lentes completos (lente y montura) por un precio total de ${d.total}, que paga en tres (3) cuotas sin intereses.` },
      ],
    },
    {
      id: "ong",
      titulo: "Ayuda de una ONG",
      soloConOng: true,
      parrafos: (d: DatosContrato) => [{ texto: `${d.ong} paga la montura. Por eso su total es ${d.total} en lugar de ${d.precioLista}.` }],
    },
    {
      id: "forma",
      titulo: "Forma de pago",
      parrafos: () => [
        { texto: "Todas las cuotas se pagan por QR, a OPTIHELP, desde la app o desde el enlace que le enviamos por WhatsApp." },
      ],
    },
    {
      id: "fechas",
      titulo: "Fechas de pago",
      parrafos: (d: DatosContrato) => [
        { texto: `1.ª cuota: ${d.cuotas[0]?.fecha} — ${d.cuotas[0]?.monto} (se paga hoy; con este pago se mandan a hacer los lentes)` },
        { texto: `2.ª cuota: ${d.cuotas[1]?.fecha} — ${d.cuotas[1]?.monto}` },
        { texto: `3.ª cuota: ${d.cuotas[2]?.fecha} — ${d.cuotas[2]?.monto}` },
      ],
    },
    {
      id: "garantia",
      titulo: "Sin garantía",
      parrafos: () => [{ texto: "EL CLIENTE no deja ninguna garantía. Solo firma este contrato con su carnet de identidad." }],
    },
    {
      id: "responsabilidad",
      titulo: "Responsabilidad del cliente",
      parrafos: () => [
        { texto: "EL CLIENTE se compromete a pagar en las fechas indicadas." },
        { texto: "Si se atrasa, tiene tres (3) días hábiles para ponerse al día." },
        { texto: "Si no lo hace, la deuda tendrá un interés por atraso de tres por ciento (3%) mensual sobre el monto vencido, hasta que lo pague.", pendiente: true },
        { texto: "Además, OPTIHELP podrá iniciar las acciones legales que correspondan y reportar la deuda a las centrales de información crediticia.", pendiente: true },
      ],
    },
    {
      id: "datos",
      titulo: "Sus datos",
      parrafos: () => [
        { texto: "OPTIHELP guarda sus datos y su historial de pagos para atenderle y para ofrecerle crédito en futuras compras.", pendiente: true },
      ],
    },
    {
      id: "cancelaciones",
      titulo: "Sin cancelaciones",
      parrafos: () => [{ texto: "Una vez firmado, el contrato no se puede cancelar y las cuotas pagadas no se devuelven." }],
    },
    {
      id: "jurisdiccion",
      titulo: "Jurisdicción",
      parrafos: () => [{ texto: "Para cualquier controversia, ambas partes se someten a los tribunales de Santa Cruz de la Sierra, Bolivia." }],
    },
  ] as {
    id: string;
    titulo: string;
    soloConOng?: boolean;
    parrafos: (d: DatosContrato) => { texto: string; pendiente?: boolean }[];
  }[],
  menor: "Como el paciente es menor de edad, este contrato lo firma su padre, madre o tutor, con sus propios datos.",
  acepto: "Leí y acepto las condiciones del contrato",
  leaPrimero: "Abra el contrato y léalo para poder aceptarlo.",
  firmaTitulo: "Su firma",
  firmaVacia: "Firme aquí con el dedo",
  firmaBorrar: "Borrar",
  firmar: "Firmar contrato",
  faltaFirma: "Agregue su firma para continuar.",
  faltaAcepto: "Marque la casilla para aceptar las condiciones.",
  firmado: {
    titulo: "Contrato firmado",
    texto: "Guardamos su firma junto al contrato. Le enviamos una copia por WhatsApp.",
    copiaDemo: "Envío por WhatsApp simulado (demo)",
    ver: "Ver contrato firmado",
    accion: "Pagar cuota inicial",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Fase 3 y 4 · Pago de cuotas (HU 3.3 · 4.2)                          */
/* ------------------------------------------------------------------ */

export const pago = {
  titulo: (n: number, total: number) => textos.nombreCuota(n, total),
  barra: "Pagar cuota",
  pagoUnico: "Pago único",
  vence: "Vence el",
  pagaA: { etiqueta: "Paga a", valor: "OptiHelp" },
  protegido: "Pago protegido",
  escanee: "Escanee el QR con la app de su banco",
  qr: "Código QR de pago",
  yaPague: "Ya pagué",
  verificando: "Verificando su pago…",
  sinCuotas: {
    titulo: "Aún no hay cuotas por pagar",
    texto: "Sus cuotas se activan cuando firma su contrato.",
    accion: "Ir a mis pagos",
  },
  sinPendientes: {
    titulo: "No tiene cuotas pendientes",
    texto: "Pagó todas sus cuotas. ¡Gracias por cumplir!",
    accion: "Ver mi beneficio",
    accionContado: "Ver mi estado",
  },
  exito: {
    titulo: "¡Recibimos su pago!",
    gracias: "Gracias por confiar en nosotros.",
    volver: "Ver mi estado",
    queSigue: "¿Y ahora qué pasa?",
    /** Después de la cuota inicial: empieza la fabricación */
    trasPrimera: [
      { emoji: "✅", texto: "**Cuota inicial** pagada", hecho: true },
      { emoji: "🔬", texto: "Mandamos a hacer sus lentes: listos en **1 a 3 días hábiles**" },
      { emoji: "💬", texto: "Le avisamos por **WhatsApp** cuando estén listos" },
      { emoji: "👓", texto: "Los recoge en la Óptica Visionario con su **carnet**" },
    ],
    /** Después del pago al contado */
    trasContado: [
      { emoji: "✅", texto: "**Pago** recibido", hecho: true },
      { emoji: "🔬", texto: "Mandamos a hacer sus lentes: listos en **1 a 3 días hábiles**" },
      { emoji: "💬", texto: "Le avisamos por **WhatsApp** cuando estén listos" },
      { emoji: "👓", texto: "Los recoge en la Óptica Visionario con su **carnet**" },
    ],
    /** Después de una cuota intermedia: falta la siguiente */
    trasIntermedia: (n: number, siguiente: number, vence: string) => [
      { emoji: "✅", texto: `**Cuota ${n}** pagada`, hecho: true },
      { emoji: "📅", texto: `Su **cuota ${siguiente}** vence el **${vence}**` },
      { emoji: "🕶️", texto: "Al terminar, sus lentes son suyos y tiene un **descuento en gafas de sol**" },
    ],
  },
  vencida: (fecha: string) => `Tiene hasta el ${fecha} para ponerse al día sin recargo.`,
} as const;

/* ------------------------------------------------------------------ */
/* Fase 4 · Panel de cuotas (HU 4.1 · 4.2)                             */
/* ------------------------------------------------------------------ */

export const cuotasPanel = {
  titulo: "Mis pagos",
  vacia: {
    titulo: "Aquí verá sus pagos",
    texto: "Su plan de 3 cuotas aparecerá cuando su orden esté lista.",
    chips: { qr: "Pago por QR", cuotas: "3 cuotas sin intereses", garantia: "Sin garantía" },
  },
  plan: {
    titulo: "Su plan de 3 cuotas",
    resumen: (total: string) => `${total} · 3 cuotas sin intereses`,
    texto: "Se activa al firmar su contrato.",
    accion: "Revisar mi orden",
  },
  cuota: (n: number, porcentaje: string) => `Cuota ${n} · ${porcentaje}`,
  adelantar: (n: number) => `Adelantar cuota ${n}`,
  restante: "Le falta pagar",
  pagado: "Pagado",
  total: "Total",
  resumen: "Resumen de sus cuotas",
  pagar: (n: number) => (n === 1 ? "Pagar cuota inicial" : `Pagar cuota ${n}`),
  pagadaEl: (fecha: string) => `Pagada el ${fecha}`,
  venceEl: (fecha: string) => `Vence el ${fecha}`,
  alertaVencida: {
    titulo: "Tiene una cuota vencida",
    texto: (fecha: string) =>
      `Tiene hasta el ${fecha} para ponerse al día sin recargo. Después, la deuda tiene un interés por atraso de 3% mensual sobre lo vencido.`,
  },
  alertaProxima: {
    titulo: "Su cuota vence pronto",
    texto: (dias: number) => (dias <= 0 ? "Vence hoy." : dias === 1 ? "Vence mañana." : `Vence en ${dias} días.`),
  },
  /** Orden al contado: un solo pago */
  contado: {
    titulo: "Su pago al contado",
    texto: "Su medida es menor a 4 dioptrías: paga sus lentes y su receta en un solo pago por QR.",
    accion: "Pagar por QR",
    pagado: (fecha: string) => `Pagado el ${fecha}`,
  },
} as const;

/* ------------------------------------------------------------------ */
/* Fase 4 · Receta visual (HU 4.3)                                     */
/* ------------------------------------------------------------------ */

export const receta = {
  titulo: "Mis recetas",
  vacia: {
    titulo: "Su receta aparecerá aquí",
    texto: "La verá después de su medición en la óptica.",
  },
  encabezado: "Receta óptica",
  fecha: "Medición del",
  profesional: "Registrada por",
  ojos: {
    derecho: { sigla: "OD", nombre: "Ojo derecho" },
    izquierdo: { sigla: "OI", nombre: "Ojo izquierdo" },
  },
  columnas: {
    esfera: { etiqueta: "Esfera", ayuda: "Cuánto aumento necesita. Con menos (−) ve mal de lejos; con más (+), de cerca." },
    cilindro: { etiqueta: "Cilindro", ayuda: "Corrige el astigmatismo." },
    eje: { etiqueta: "Eje", ayuda: "La dirección del cilindro, en grados." },
    adicion: { etiqueta: "Adición", ayuda: "Aumento extra para ver de cerca." },
  },
  distanciaPupilar: "Distancia entre pupilas",
  ayudaToque: "Toque un término para ver qué significa",
  unidad: "dioptrías",
} as const;

/* ------------------------------------------------------------------ */
/* Fase 4 · Mi cuenta (HU 4.4)                                         */
/* ------------------------------------------------------------------ */

export const cuenta = {
  titulo: "Mi cuenta",
  foto: "Cambiar foto",
  datos: "Mis datos",
  guardar: "Guardar cambios",
  guardado: "Sus datos se guardaron.",
  salir: "Cerrar sesión",
  salirAyuda: "Podrá volver a entrar con su correo o con Google.",
} as const;

/* ------------------------------------------------------------------ */
/* Fase 4 · Avisos                                                     */
/* ------------------------------------------------------------------ */

export const avisos = {
  titulo: "Notificaciones",
  vacio: {
    titulo: "Aún no tiene notificaciones",
    texto: "Aquí verá sus recordatorios y promociones.",
  },
  marcarTodas: "Marcar todos como leídos",
  nuevo: "Nuevo",
} as const;

/* ------------------------------------------------------------------ */
/* Fase 5 · Liquidación, upsell y renovación (HU 5.1 · 5.2 · 5.3)      */
/* ------------------------------------------------------------------ */

export const liquidacion = {
  titulo: "¡Sus lentes ya son suyos!",
  barra: "¡Felicidades!",
  destacado: "Gracias por confiar en nosotros y por cumplir con cada cuota.",
  pagadas: (total: number) => `${total} de ${total} cuotas pagadas`,
  beneficio: {
    titulo: (producto: string) => `${producto} con descuento`,
    texto: (porcentaje: number) =>
      `Por terminar sus pagos, tiene ${porcentaje}% de descuento en unas gafas de sol. El descuento lo pone OptiHelp.`,
    codigo: "Su código",
    accion: "Usar mi descuento",
    usado: "Descuento guardado: lo verá aplicado al agendar.",
  },
  volverAComprar: "Puede volver a comprar en cuotas cuando lo necesite.",
  renovacion: "Le avisaremos a los 6 y a los 12 meses para revisar su medida, con un descuento ya aplicado.",
  volver: "Ir a mi estado",
} as const;
