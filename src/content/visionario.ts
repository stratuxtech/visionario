/**
 * ARCHIVO ÚNICO DE CONTENIDO — Visionario
 *
 * Todo texto, dato, ruta e imagen de la app sale de aquí. Cambiar un dato en
 * este archivo lo cambia en toda la app. No repita estos valores en componentes.
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
export type PublicoMontura = "adultos" | "ninos";
export type TipoNotificacion =
  | "recordatorio-cuota"
  | "lente-listo"
  | "renovacion-6"
  | "renovacion-12"
  | "recordatorio-cita"
  | "orden-recibida"
  | "pago-confirmado"
  | "cuota-vencida";

export interface Montura {
  id: string;
  codigo: string;
  publico: PublicoMontura;
  nombre: string;
  /** Material real del modelo. Pendiente hasta tener el catálogo. */
  material: string | null;
  /** Ruta de la foto en /public. null = se muestra marcador. */
  imagen: string | null;
  pendiente: boolean;
}

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
  nombre: "Visionario",
  ciudad: "Santa Cruz de la Sierra, Bolivia",
  logo: {
    /** Logo oficial recortado sin el lema, para la barra superior. */
    navbar: { src: "/brand/logo-navbar.png", ancho: 1200, alto: 358 },
    /** Lockup completo con "Accesorios Ópticos": pie y tamaños grandes. */
    completo: { src: "/brand/logo-completo.png", ancho: 1400, alto: 416 },
    /** Isotipo del ojo, fondo transparente: spinner y estados vacíos. */
    isotipo: { src: "/brand/isotipo.png", ancho: 640, alto: 640 },
    alt: "Visionario",
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
  claveAlmacenamiento: "visionario-demo-v1",
} as const;

/* ------------------------------------------------------------------ */
/* Reglas de negocio (docs/reglas_de_negocio.md)                       */
/* ------------------------------------------------------------------ */

export const negocio = {
  moneda: "Bs",
  medidaMinimaDioptrias: 4,
  precioReferencial: {
    minimo: 900,
    maximo: 2000,
    etiqueta: "Referencial",
    nota: "El precio exacto depende de su medida y del tratamiento. Se lo confirmamos en la óptica antes de firmar.",
    pendiente: true,
  },
  cuotas: {
    cantidad: 3,
    frecuencia: "mensual",
    intereses: false,
    /** Supuesto del prototipo: la cuota inicial es la cuota 1 de 3. */
    cuotaInicialEsPrimera: true,
  },
  cita: { duracionMinutos: 60, gratuita: true },
  laboratorio: { diasHabilesMinimo: 1, diasHabilesMaximo: 3 },
  gracia: { meses: 1 },
  garantia: {
    joya: "Oro de 18 quilates",
    custodia: "Bóveda externa de custodia",
    devolucion: "Su joya se le devuelve al pagar la tercera cuota.",
  },
  tratamientos: [
    { id: "antirreflejo", nombre: "Antirreflejo", precio: null, pendiente: true },
    { id: "luz-azul", nombre: "Filtro de luz azul", precio: null, pendiente: true },
    { id: "bifocal", nombre: "Bifocal", precio: null, pendiente: true },
  ],
  renovacionMeses: [6, 12],
  cancelaciones: "Una vez firmado el contrato no hay cancelaciones ni reembolsos.",
  derivacion:
    "Si su evaluación muestra una condición que requiere cirugía, le orientamos hacia otro centro de salud.",
} as const;

/* La tasación de la joya es un proceso manual de la óptica (ERP).
   La app del cliente no la estima: solo explica que se hace en la cita. */

/* ------------------------------------------------------------------ */
/* Óptica                                                              */
/* ------------------------------------------------------------------ */

export const optica = {
  nombre: "Óptica Visionario",
  direccion: "Centro de Santa Cruz de la Sierra",
  referencia: "Dirección exacta pendiente de confirmar",
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
  monturas: "/monturas",
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
  { ruta: "monturas", titulo: "Catálogo de monturas", fase: 2, historia: null },
  { ruta: "agendar", titulo: "Mi cita", fase: 2, historia: "HU 2.2" },
  { ruta: "panel", titulo: "Mi estado", fase: 2, historia: "HU 4.1" },
  { ruta: "pagos", titulo: "Mis pagos", fase: 4, historia: "HU 4.2" },
  { ruta: "orden", titulo: "Mi orden de compra", fase: 3, historia: "HU 3.1" },
  { ruta: "contrato", titulo: "Firmar contrato", fase: 3, historia: "HU 3.2" },
  { ruta: "pago", titulo: "Pagar cuota", fase: 3, historia: "HU 3.3" },
  { ruta: "receta", titulo: "Mi receta", fase: 4, historia: "HU 4.3" },
  { ruta: "cuenta", titulo: "Mi cuenta", fase: 4, historia: "HU 4.4" },
  { ruta: "notificaciones", titulo: "Notificaciones y promociones", fase: 4, historia: "HU 4.2" },
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
  referencial: "Referencial",
  pendiente: "Dato pendiente",
  cargando: "Cargando…",
  errores: {
    requerido: "Este dato es necesario para continuar.",
    correo: "Revise el correo: debe tener la forma nombre@correo.com.",
    whatsapp: "Escriba su número de 8 dígitos. Ejemplo: 71234567.",
    edad: "Escriba su edad en números.",
    generico: "Algo no salió como esperábamos. Intente de nuevo.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Landing (HU 1.1)                                                    */
/* ------------------------------------------------------------------ */

export const landing = {
  /** Las negritas se marcan con **asteriscos** y se pintan con <ConNegrita>. */
  heroe: {
    etiqueta: "Óptica a medida · Santa Cruz",
    titulo: { antes: "Sus lentes a medida,", resaltado: "en 3 cuotas", despues: "sin intereses." },
    bajada: "Para medidas desde **4 dioptrías**. Solo con su **carnet** y una **joya de oro** en garantía.",
    verComo: "Ver cómo funciona",
    pruebas: ["Medición gratis", "Cita de 60 minutos", "Listos en 1 a 3 días"],
    foto: { src: "/fotos/mujer-lentes.jpg", alt: "Mujer sonriente con sus lentes nuevos" },
    chips: { cita: "Cita gratis · 60 min", cuota: "Cuota 1 pagada", listo: "¡Sus lentes están listos!", joya: "Joya en custodia" },
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
      { cifra: "Bs 900–2.000", texto: "cuesta un lente a medida **al contado**. Imposible de juntar de golpe." },
      { cifra: "+33%", texto: "más ganan las personas que **corrigen su visión**.", fuente: "Estudio THRIVE, 2024" },
      { cifra: "4+ dioptrías", texto: "y sus lentes **deben tallarse a medida**. Las ópticas económicas no los tienen." },
      { cifra: "Cada año", texto: "los lentes se **rayan, se rompen o se pierden**. Sobre todo los de los niños." },
    ],
  },
  comparacion: {
    etiqueta: "Por qué Visionario",
    titulo: { antes: "Lo que hay hoy", resaltado: "no le sirve", despues: "" },
    hoy: "Hoy",
    con: "Con Visionario",
    puntosHoy: [
      "Campañas que llegan **cada tantos meses**",
      "Ópticas baratas que **no hacen medidas altas**",
      "Crédito con **precios muy altos**",
      "Pagar **todo al contado**",
    ],
    puntosCon: [
      "Su cita **cuando usted quiera**, desde el celular",
      "Lentes **tallados a medida** en laboratorio",
      "**3 cuotas iguales** y sin intereses",
      "Solo **carnet y una joya** en garantía",
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
        titulo: "Medimos, elige y **tasamos su joya**.",
        texto: "Elija entre **20 monturas**. Su joya de oro de 18 quilates queda guardada en una bóveda.",
        puntos: ["10 modelos de adulto y 10 de niño", "Tasación en el momento", "Firma su contrato en pantalla"],
      },
      {
        pestana: "Pague y recoja",
        titulo: "Pague por QR y **recoja en 1 a 3 días**.",
        texto: "Paga la primera cuota y le avisamos por **WhatsApp** cuando sus lentes estén listos.",
        puntos: ["Cuotas iguales, sin intereses", "Aviso por WhatsApp", "Su joya vuelve al terminar"],
      },
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
      comun: "Menos de 4: lentes de stock",
      medida: "4 o más: lentes a medida",
    },
    noSabe: "¿No sabe su medida? **La medimos gratis** en su cita.",
  },
  cuotas: {
    etiqueta: "Las cuotas",
    titulo: { antes: "Partes", resaltado: "iguales.", despues: "Sin sorpresas." },
    ejemplo: 900,
    nota: "Ejemplo con un lente de **Bs 900**. El precio exacto se lo damos **antes de firmar** y no cambia.",
    pasos: ["Al firmar", "Al mes", "A los 2 meses"],
    final: "Su joya vuelve",
    gracia: "Si se atrasa, tiene **un mes de gracia**.",
  },
  catalogo: {
    etiqueta: "Monturas",
    titulo: { antes: "20 monturas para", resaltado: "toda la familia", despues: "" },
    texto: "**10 para adultos y 10 para niños**, resistentes y pensadas para durar.",
    accion: "Ver catálogo",
    fotos: ["/fotos/montura-negra.jpg", "/fotos/montura-carey.jpg", "/fotos/nina-optica.jpg"],
  },
  cierre: {
    titulo: { antes: "Su primera cita es", resaltado: "gratis", despues: "" },
    texto: "Traiga su **carnet** y su **joya de oro de 18 quilates**. Nosotros hacemos el resto.",
    accion: "Agendar cita gratuita",
  },
  pie: {
    requisitos: "Para su cita traiga su carnet de identidad y su joya de oro de 18 quilates.",
    creditos: "Fotografías de Pexels",
  },
} as const;

/* ------------------------------------------------------------------ */
/* El recorrido: una sola línea del primer clic a la joya devuelta.    */
/* Se usa para explicar (landing) y para ubicar al paciente (inicio).  */
/* ------------------------------------------------------------------ */

export type IdParada = "cita" | "medicion" | "joya" | "firma" | "cuota-2" | "cuota-3" | "devolucion";

export const recorrido = {
  titulo: "Cómo funciona",
  paradas: [
    { id: "cita", titulo: "Agenda su cita", texto: "Elija día y hora desde el celular. Le reservamos 60 minutos.", lugar: "app", aviso: "Traiga su joya de oro de 18 quilates" },
    { id: "medicion", titulo: "Medición y montura", texto: "En la óptica medimos su vista sin costo y elige su montura entre 20 modelos.", lugar: "optica" },
    { id: "joya", titulo: "Deja su joya en garantía", texto: "Pesamos su joya de oro de 18 quilates. Queda guardada en una bóveda de custodia.", lugar: "optica" },
    { id: "firma", titulo: "Firma y paga la cuota 1", texto: "Firma su contrato en la pantalla y paga la primera cuota. Fabricamos su lente en 1 a 3 días hábiles.", lugar: "app" },
    { id: "cuota-2", titulo: "Cuota 2", texto: "Un mes después. Le avisamos por WhatsApp antes de la fecha.", lugar: "app" },
    { id: "cuota-3", titulo: "Cuota 3", texto: "Dos meses después de firmar.", lugar: "app" },
    { id: "devolucion", titulo: "Su joya vuelve a sus manos", texto: "Al pagar la tercera cuota le devolvemos su joya.", lugar: "optica" },
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
        { emoji: "💛", texto: "Una joya de oro" },
        { emoji: "✅", texto: "Sin intereses" },
      ],
    },
    {
      id: "optica",
      titulo: "**Agende gratis.** En la óptica le medimos la vista y **tasamos su joya**.",
      foto: { src: "/fotos/examen-vista.jpg", alt: "" },
      chips: [
        { emoji: "📅", texto: "60 min para usted" },
        { emoji: "👓", texto: "Medición gratis" },
        { emoji: "💎", texto: "Joya tasada" },
      ],
    },
    {
      id: "recoger",
      titulo: "**Pague por QR** y recoja sus lentes. Su joya **vuelve con usted** al terminar.",
      foto: { src: "/fotos/nino-lentes.jpg", alt: "" },
      chips: [
        { emoji: "📱", texto: "Cuota 1 pagada" },
        { emoji: "💬", texto: "¡Sus lentes están listos!" },
        { emoji: "🎁", texto: "Joya devuelta" },
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
  joyaAviso: "Recuerde traer su joya de oro de 18 quilates",
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
  calendarioTitulo: "Cita en Visionario",
  calendarioDetalle: "Traiga su carnet de identidad y su joya de oro de 18 quilates.",
  eligeHora: "Elija una hora para continuar",
  confirmada: {
    titulo: "Su cita está reservada",
    traer: "También traiga",
    requisitos: ["Su carnet de identidad", "Sus lentes actuales, si tiene"],
    menor: "Si los lentes son para un menor, debe venir con su padre, madre o tutor.",
    festejo: "¡Su cita está reservada!",
    queSigue: [
      { emoji: "💬", texto: "Le recordamos por **WhatsApp** un día antes" },
      { emoji: "💛", texto: "Traiga su **carnet** y su **joya de oro de 18k**" },
      { emoji: "👓", texto: "Le medimos la vista **gratis** y elige su montura" },
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
    pagar: (n: number) => `Pagar cuota ${n}`,
    verBeneficio: "Ver mi beneficio",
  },
  /** Qué está pasando ahora con el paciente: una frase corta por situación */
  situaciones: {
    "sin-cita": { titulo: "Agende su cita gratuita", detalle: "Traiga su carnet y una joya de oro de 18 quilates." },
    cita: { titulo: (fecha: string) => `Su cita es el ${fecha}`, detalle: "Traiga su carnet y su joya de oro de 18 quilates." },
    orden: { titulo: "Su orden de compra está lista", detalle: "Revísela y firme su contrato." },
    "cuota-1": { titulo: "Pague su cuota 1", detalle: "Así empezamos a fabricar sus lentes." },
    fabricando: { titulo: "Estamos fabricando sus lentes", detalle: "Tardan de 1 a 3 días hábiles. Le avisaremos por WhatsApp." },
    vencida: { titulo: (n: number) => `Su cuota ${n} está vencida`, detalle: "Pague ahora para conservar su joya." },
    listo: { titulo: "Sus lentes están listos", detalle: "Recójalos en la óptica con su carnet de identidad." },
    liquidado: { titulo: "Terminó de pagar", detalle: "Recoja su joya en la óptica." },
  },
  proximaCuota: (n: number, fecha: string) => `Próxima: cuota ${n}, vence el ${fecha}`,
  /** El recorrido: cada parada es un solo título largo y simple */
  paradas: {
    cita: {
      pendiente: "Agende su cita gratuita y traiga su joya de oro de 18 quilates",
      hecha: (fecha: string) => `Su cita es el ${fecha}. Traiga su joya de oro de 18 quilates`,
      pasada: "Cita realizada",
    },
    medicion: { pendiente: "Mida su vista sin costo y elija su montura", hecha: "Medición y montura listas" },
    joya: {
      pendiente: "Tasamos su joya y la guardamos en custodia",
      hecha: (valor: string) => `Su joya fue tasada en ${valor} y está en custodia`,
    },
    firma: {
      pendiente: "Firme su contrato y pague la cuota 1",
      hecha: "Contrato firmado y cuota 1 pagada",
    },
    "cuota-2": "Pague la cuota 2, un mes después",
    "cuota-3": "Pague la cuota 3, dos meses después",
    devolucion: "Su joya vuelve a sus manos al pagar la cuota 3",
  },
  monturasInteres: (n: number) =>
    n === 1 ? "Le interesa 1 montura; se la mostraremos en su cita." : `Le interesan ${n} monturas; se las mostraremos en su cita.`,
} as const;

export const navegacion = {
  cita: "Mi cita",
  estado: "Estado",
  pagos: "Pagos",
  monturas: "Monturas",
  receta: "Receta",
  cuenta: "Mi cuenta",
  avisos: "Notificaciones y promociones",
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
    monturas: "Catálogo",
    receta: "Mi receta",
    cuenta: "Mi cuenta",
    avisos: "Notificaciones y promociones",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Formulario de perfil (HU 1.3) — solo los datos documentados         */
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
  menorDeEdad: "Como el paciente es menor de edad, el contrato lo firma y deja la joya su padre, madre o tutor.",
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
      opciones: ["Entre 4 y 6 dioptrías", "Entre 6 y 8 dioptrías", "Más de 8 dioptrías", "No sé"],
      noSabe: "Atendemos desde 4 dioptrías. Si su medida es menor, igual le regalamos la medición.",
    },
    comoNosConocio: {
      etiqueta: "¿Cómo nos conoció?",
      opciones: ["Facebook", "TikTok", "Instagram", "WhatsApp", "Un familiar o conocido", "Pasé por la óptica", "Otro"],
    },
  },
} as const;

/* ------------------------------------------------------------------ */
/* Catálogo de monturas — 10 adultos + 10 niños (catálogo cerrado)     */
/* PENDIENTE: nombres, materiales y fotos reales.                      */
/* ------------------------------------------------------------------ */

/* Nombres de demostración hasta tener el catálogo real del negocio */
const nombresAdultos = ["Illimani", "Aurora", "Sajama", "Cumbre", "Sierra", "Ámbar", "Pampa", "Cedro", "Alba", "Chaco"];
const nombresNinos = ["Colibrí", "Tucán", "Mariposa", "Cóndor", "Zorrito", "Delfín", "Picaflor", "Ranita", "Jaguar", "Panda"];

const crearMonturas = (publico: PublicoMontura, prefijo: string, nombres: string[]): Montura[] =>
  nombres.map((nombre, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      id: `${prefijo.toLowerCase()}-${n}`,
      codigo: `${prefijo}-${n}`,
      publico,
      nombre,
      material: null,
      /* Fotos de ejemplo (Pexels) hasta tener las fotos reales del catálogo */
      imagen: `/fotos/monturas/${prefijo.toLowerCase()}-${n}.jpg`,
      pendiente: true,
    };
  });

export const monturas: Montura[] = [
  ...crearMonturas("adultos", "A", nombresAdultos),
  ...crearMonturas("ninos", "N", nombresNinos),
];

export const catalogo = {
  titulo: "Catálogo",
  publicos: { adultos: "Adultos", ninos: "Niños" } satisfies Record<PublicoMontura, string>,
  materialesDisponibles: ["Acetato", "Aluminio", "Metal"],
  sinFoto: "Foto pendiente",
  meInteresa: "Me interesa",
  marcada: "Le interesa",
  agendar: "Agendar mi cita",
} as const;

/* ------------------------------------------------------------------ */
/* Notificaciones (plantillas)                                         */
/* ------------------------------------------------------------------ */

export const notificaciones: Record<TipoNotificacion, { titulo: string; texto: string; accion: string | null; ruta: ClaveRuta | null }> = {
  "recordatorio-cita": {
    titulo: "Su cita es mañana",
    texto: "Traiga su carnet de identidad y su joya de oro de 18 quilates.",
    accion: "Ver mi cita",
    ruta: "agendar",
  },
  "orden-recibida": {
    titulo: "Su orden de compra está lista",
    texto: "Revise sus lentes, firme el contrato y pague la cuota 1.",
    accion: "Ver mi orden",
    ruta: "orden",
  },
  "pago-confirmado": {
    titulo: "Recibimos su pago",
    texto: "Su cuota quedó registrada. Gracias por cumplir.",
    accion: "Ver mis pagos",
    ruta: "pagos",
  },
  "lente-listo": {
    titulo: "Sus lentes están listos",
    texto: "Recójalos en la óptica con su carnet de identidad.",
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
    texto: "Está en su mes de gracia. Pague para conservar su joya.",
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
    esDemo: true,
    pendiente: true,
  },
} as const;

/* ------------------------------------------------------------------ */
/* Simulador de flujos                                                 */
/* ------------------------------------------------------------------ */

export const simulador = {
  titulo: "Simulador de flujos",
  descripcion: "Dispara lo que en la vida real haría la óptica, el banco o el paso del tiempo.",
  abrir: "Abrir simulador de demo",
  cerrar: "Cerrar simulador",
  acciones: {
    ordenErp: "Simular orden del ERP",
    pagoCuota: "Simular pago de cuota",
    laboratorio: "Simular laboratorio listo",
    mora: "Simular vencimiento o mora",
    liquidacion: "Simular liquidación",
    notificacion: "Mostrar notificación",
    reiniciar: "Reiniciar demo",
  },
  descripciones: {
    ordenErp: "La óptica envía la orden de compra tras la cita.",
    pagoCuota: "Marca como pagada la próxima cuota.",
    laboratorio: "El laboratorio terminó el lente: aviso para recoger o delivery.",
    mora: "La próxima cuota pasa a vencida y empieza el mes de gracia.",
    liquidacion: "Paga todas las cuotas pendientes de una vez.",
    reiniciar: "Borra todo y vuelve al visitante sin cuenta.",
  },
  requisitos: {
    sesion: "Requiere una cuenta iniciada",
    orden: "Ya llegó la orden",
    contrato: "Requiere contrato firmado (fase 3)",
    cuotas: "No quedan cuotas pendientes",
    laboratorio: "Requiere la cuota 1 pagada",
  },
  tipoNotificacion: "Tipo de notificación",
  estado: "Estado actual",
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
  /** Orden que "llega" desde el ERP de la óptica tras la cita. */
  orden: {
    numero: "OC-0001",
    lente: "Lente orgánico de alto índice, tallado a medida",
    tratamientos: ["antirreflejo"],
    monturaId: "a-03",
    /** Joya que el cliente dejó en garantía: foto (pendiente) y valor de la tasación. */
    joya: { descripcion: "Cadena de oro de 18 quilates", tasacion: 1800, foto: "/fotos/cadena-oro.jpg" as string | null },
    /** Monto demo dentro del rango referencial (Bs 900 – Bs 2.000). */
    total: 1350,
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
  joya: { descripcion: "Cadena de oro 18k", gramos: 4.2, esDemo: true },
} as const;

/* ------------------------------------------------------------------ */
/* Fase 3 · Orden de compra (HU 3.1)                                   */
/* ------------------------------------------------------------------ */

export const orden = {
  titulo: "Su orden de compra",
  bajada: "Revise que todo esté correcto antes de firmar.",
  vacia: {
    titulo: "Su orden llegará después de su cita",
    texto: "Cuando el optometrista termine su evaluación, la orden aparecerá aquí con el detalle de sus lentes.",
  },
  numero: "Orden",
  recibida: "Recibida el",
  lente: "Lente",
  tratamientos: "Tratamiento",
  sinTratamiento: "Sin tratamiento adicional",
  montura: "Montura",
  receta: "Su medida",
  verReceta: "Ver receta completa",
  joya: "Garantía en custodia",
  tasada: "Tasada en",
  total: "Precio total",
  sinIntereses: "Sin intereses. Este monto no cambia.",
  plan: "Así quedan sus 3 cuotas",
  cuandoCuota: ["Al firmar", "Un mes después", "Dos meses después"],
  firmar: "Revisar y firmar contrato",
  firmado: (fecha: string) => `Contrato firmado el ${fecha}`,
  verCuotas: "Ver mis cuotas",
  ojoDerecho: "Ojo derecho",
  ojoIzquierdo: "Ojo izquierdo",
} as const;

/* ------------------------------------------------------------------ */
/* Fase 3 · Contrato (HU 3.2)                                          */
/* TEXTO PROVISIONAL: resume docs/reglas_de_negocio.md. Debe revisarlo */
/* un abogado antes del lanzamiento (ver brief §8 y reglas §12).       */
/* ------------------------------------------------------------------ */

export const contrato = {
  titulo: "Contrato",
  tarjeta: { titulo: "Contrato de financiamiento", detalle: "Léalo antes de firmar", ver: "Ver" },
  documento: {
    cerrar: "Cerrar contrato",
    pagina: (n: number, total: number) => `Página ${n} de ${total}`,
    encabezado: "Contrato de financiamiento de lentes",
    partes: (nombre: string) => `Entre Visionario y ${nombre || "el cliente"}.`,
    provisional: "Texto provisional, pendiente de revisión legal.",
  },
  condiciones: [
    {
      titulo: "Precio y cuotas",
      texto: (total: string, cuota: string) =>
        `El precio total de sus lentes es ${total}. Lo paga en 3 cuotas mensuales de ${cuota}, sin intereses. La primera cuota se paga hoy.`,
    },
    {
      titulo: "Su joya como garantía",
      texto: () =>
        "Su joya de oro de 18 quilates queda guardada en una bóveda de custodia externa. Se le devuelve cuando paga la tercera cuota.",
    },
    {
      titulo: "Si se atrasa",
      texto: () =>
        "Tiene un mes de gracia después de la fecha de la última cuota. No se cobran intereses por atraso.",
    },
    {
      titulo: "Si no completa el pago",
      texto: () =>
        "Si al terminar el mes de gracia no completó el pago, la joya queda con Visionario para cubrir la deuda. Si su valor no alcanza, Visionario le pedirá el monto que falte.",
    },
    {
      titulo: "Sin cancelaciones",
      texto: () => "Una vez firmado, el contrato no se puede cancelar y las cuotas pagadas no se devuelven.",
    },
  ],
  menor:
    "Como el paciente es menor de edad, este contrato lo firma su padre, madre o tutor, que es quien deja la joya en garantía.",
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
    texto: "Guardamos su firma junto al contrato.",
    accion: "Pagar cuota 1",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Fase 3 y 4 · Pago de cuotas (HU 3.3 · 4.2)                          */
/* ------------------------------------------------------------------ */

export const pago = {
  titulo: (n: number, total: number) => `Cuota ${n} de ${total}`,
  vence: "Vence el",
  protegido: "Pago protegido",
  escanee: "Escanee el QR con la app de su banco",
  qr: "Código QR de pago",
  yaPague: "Ya pagué",
  verificando: "Verificando su pago…",
  exito: {
    titulo: "¡Recibimos su pago!",
    gracias: "Gracias por confiar en nosotros.",
    volver: "Ver mi estado",
    queSigue: "¿Y ahora qué pasa?",
    /** Después de la cuota 1: empieza la fabricación */
    trasPrimera: [
      { emoji: "✅", texto: "**Cuota 1** pagada", hecho: true },
      { emoji: "🔬", texto: "Fabricamos sus lentes en **1 a 3 días hábiles**" },
      { emoji: "💬", texto: "Le avisamos por **WhatsApp** cuando estén listos" },
      { emoji: "👓", texto: "Los recoge en la óptica con su **carnet**" },
    ],
    /** Después de una cuota intermedia: falta la siguiente */
    trasIntermedia: (n: number, siguiente: number, vence: string) => [
      { emoji: "✅", texto: `**Cuota ${n}** pagada`, hecho: true },
      { emoji: "📅", texto: `Su **cuota ${siguiente}** vence el **${vence}**` },
      { emoji: "💛", texto: "Al terminar, **le devolvemos su joya**" },
    ],
  },
  vencida: "Esta cuota está vencida. Aún está en su mes de gracia.",
} as const;

/* ------------------------------------------------------------------ */
/* Fase 4 · Panel de cuotas (HU 4.1 · 4.2)                             */
/* ------------------------------------------------------------------ */

export const cuotasPanel = {
  titulo: "Mis pagos",
  vacia: {
    titulo: "Aquí verá sus pagos",
    texto: "Su plan de 3 cuotas aparecerá cuando su orden esté lista.",
  },
  plan: {
    titulo: "Su plan de 3 cuotas",
    texto: "Se activa al firmar su contrato.",
    accion: "Revisar mi orden",
  },
  adelantar: (n: number) => `Adelantar cuota ${n}`,
  restante: "Le falta pagar",
  pagado: "Pagado",
  total: "Total",
  pagar: (n: number) => `Pagar cuota ${n}`,
  pagadaEl: (fecha: string) => `Pagada el ${fecha}`,
  venceEl: (fecha: string) => `Vence el ${fecha}`,
  alertaVencida: {
    titulo: "Tiene una cuota vencida",
    texto: (fecha: string) => `Puede pagarla sin intereses hasta el ${fecha}, fin de su mes de gracia. Después de esa fecha la joya queda con Visionario.`,
  },
  alertaProxima: {
    titulo: "Su cuota vence pronto",
    texto: (dias: number) => (dias <= 0 ? "Vence hoy." : dias === 1 ? "Vence mañana." : `Vence en ${dias} días.`),
  },
} as const;

/* ------------------------------------------------------------------ */
/* Fase 4 · Receta visual (HU 4.3)                                     */
/* ------------------------------------------------------------------ */

export const receta = {
  titulo: "Mi receta",
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
  titulo: "Notificaciones y promociones",
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
  destacado: "Gracias por confiar en nosotros y por cumplir con cada cuota.",
  joya: {
    titulo: "Su joya está lista para volver",
    texto: "Recójala en la óptica presentando su carnet de identidad.",
  },
  beneficio: {
    titulo: (producto: string) => `${producto} con descuento`,
    texto: (porcentaje: number) =>
      `Por terminar sus pagos, tiene ${porcentaje}% de descuento en un segundo producto. Se aplica automáticamente en su próxima visita.`,
    codigo: "Su código",
    accion: "Usar mi descuento",
    usado: "Descuento guardado: lo verá aplicado al agendar.",
  },
  renovacion: "Le avisaremos a los 6 y a los 12 meses para revisar su medida, con un descuento ya aplicado.",
  volver: "Ir a mi estado",
} as const;
