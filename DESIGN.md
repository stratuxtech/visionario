---
name: Visionario
description: Lentes a medida en 3 cuotas sin intereses, con una joya en garantía. Web app del paciente, celular primero, con look and feel de app (referencias Pling y Stratux).
version: 2 (noviembre 2026)
colors:
  primary-50: "#eef6fd"
  primary-100: "#d9ecfb"
  primary-200: "#b5daf7"
  primary-300: "#84c1f0"
  primary-400: "#4aa3e6"
  primary-500: "#157dca"
  primary-600: "#0f69b4"
  primary-700: "#0b5796"
  primary-800: "#0b4a7d"
  primary-900: "#0c3e68"
  primary-950: "#08284a"
  secondary-50: "#f3f6fb"
  secondary-100: "#e4ebf5"
  secondary-200: "#cad6e8"
  secondary-300: "#a4b6d2"
  secondary-400: "#7489af"
  secondary-500: "#566c95"
  secondary-600: "#42577f"
  secondary-700: "#334568"
  secondary-800: "#233453"
  secondary-900: "#172848"
  secondary-950: "#0b1b38"
  oro-50: "#fffaf0"
  oro-100: "#fff4dc"
  oro-200: "#ffe6b3"
  oro-300: "#ffd27a"
  oro-400: "#f7b93e"
  oro-500: "#e09a12"
  oro-800: "#7a4e00"
  exito-50: "#e8f7ee"
  exito-100: "#cdeed9"
  exito-400: "#4cc27a"
  exito-500: "#22a55a"
  exito-700: "#15803d"
  exito-800: "#166534"
  alerta-50: "#fdf0ee"
  alerta-100: "#fbe0dc"
  alerta-200: "#f3c4bc"
  alerta-500: "#e5484d"
  alerta-600: "#b42318"
  alerta-700: "#912018"
  fondo: "#eaf2fb"
  white: "#ffffff"
typography:
  titular:
    fontFamily: "Ubuntu, system-ui, sans-serif"
    fontSize: "clamp(2.375rem, 1.5rem + 3.6vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  seccion:
    fontFamily: "Ubuntu, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.35rem + 1.7vw, 2.625rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  bloque:
    fontFamily: "Ubuntu, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
  entrada:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.125rem"
    lineHeight: 1.5
  cuerpo:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.5
  meta:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
  mini:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.3
  cifra:
    fontFamily: "Ubuntu, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.7rem + 2vw, 3rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "\"tnum\""
  destacado:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.5rem"
    fontStyle: italic
    lineHeight: 1.3
  boton:
    fontFamily: "Ubuntu, system-ui, sans-serif"
    fontWeight: 700
rounded:
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.25rem"
  2xl: "1.5rem"
  3xl: "2rem"
  bloque: "2.5rem"
  full: "9999px"
spacing:
  contenedor-celular: "1.25rem"
  contenedor-escritorio: "2.5rem"
  toque: "3rem"
  alto-menu: "4.75rem"
  contenedor-max: "72rem"
  flujo-max: "40rem"
shadows:
  xs: "0 1px 2px 0 rgb(11 27 56 / 0.06)"
  sm: "0 1px 2px 0 rgb(11 27 56 / 0.05), 0 4px 12px -2px rgb(11 27 56 / 0.07)"
  md: "0 2px 4px 0 rgb(11 27 56 / 0.05), 0 12px 28px -6px rgb(11 27 56 / 0.12)"
  lg: "0 4px 8px -2px rgb(11 27 56 / 0.06), 0 24px 48px -12px rgb(11 27 56 / 0.2)"
  vidrio: "inset 0 0 0 1px rgb(15 105 180 / 0.08), 0 2px 4px 0 rgb(11 27 56 / 0.05), 0 8px 24px 0 rgb(11 27 56 / 0.08)"
  brillo: "0 16px 36px -10px rgb(15 105 180 / 0.6), 0 6px 16px -6px rgb(15 105 180 / 0.45)"
  brillo-fuerte: "0 22px 44px -10px rgb(15 105 180 / 0.7), 0 8px 18px -6px rgb(15 105 180 / 0.5)"
  brillo-exito: "0 14px 30px -10px rgb(34 165 90 / 0.55)"
motion:
  salida: "cubic-bezier(0.2, 0, 0, 1)"
  resorte: "cubic-bezier(0.16, 1, 0.3, 1)"
  rebote: "cubic-bezier(0.34, 1.56, 0.64, 1)"
  suave: "cubic-bezier(0.65, 0, 0.35, 1)"
  duracion-base: "250ms"
components:
  button-primary:
    backgroundColor: "{colors.primary-600}"
    textColor: "{colors.white}"
    typography: "{typography.boton}"
    rounded: "{rounded.full}"
    shadow: "{shadows.brillo}"
    height: "3rem"
    width: "100%"
  button-primary-lg:
    backgroundColor: "{colors.primary-600}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    height: "3.5rem"
    width: "100%"
  button-primary-hover:
    backgroundColor: "{colors.primary-700}"
    shadow: "{shadows.brillo-fuerte}"
    transform: "translateY(-2px)"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.primary-700}"
    border: "inset 1.5px {colors.primary-200}"
    rounded: "{rounded.full}"
  button-secondary:
    backgroundColor: "{colors.primary-50}"
    textColor: "{colors.primary-800}"
    rounded: "{rounded.full}"
  button-claro:
    backgroundColor: "{colors.white}"
    textColor: "{colors.secondary-950}"
    rounded: "{rounded.full}"
  button-vidrio:
    backgroundColor: "rgb(255 255 255 / 0.72) + blur(16px)"
    textColor: "{colors.secondary-950}"
    rounded: "{rounded.full}"
  input:
    backgroundColor: "rgb(255 255 255 / 0.8)"
    textColor: "{colors.secondary-950}"
    border: "1px {colors.secondary-200}"
    typography: "{typography.entrada}"
    rounded: "{rounded.2xl}"
    height: "3.5rem"
    width: "100%"
  input-focus:
    border: "1px {colors.primary-500}"
    shadow: "0 0 0 4px rgb(21 125 202 / 0.16), 0 8px 24px -8px rgb(15 105 180 / 0.35)"
  opcion:
    backgroundColor: "rgb(255 255 255 / 0.8)"
    border: "1px {colors.secondary-200}"
    rounded: "{rounded.2xl}"
    height: "3.5rem"
  opcion-marcada:
    backgroundColor: "{colors.primary-50}"
    border: "1px {colors.primary-500}"
    shadow: "0 0 0 3px rgb(21 125 202 / 0.14), 0 10px 24px -10px rgb(15 105 180 / 0.45)"
  tarjeta:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.3xl}"
    shadow: "{shadows.sm}"
  tarjeta-oscura:
    backgroundColor: "{colors.secondary-950}"
    textColor: "{colors.white}"
    rounded: "{rounded.3xl}"
    shadow: "{shadows.lg}"
  barra-superior:
    backgroundColor: "{colors.white}"
    height: "4rem / 5rem"
  menu-global:
    backgroundColor: "{colors.white}"
    height: "{spacing.alto-menu}"
    position: "fijo abajo, a todo el ancho, en celular y en escritorio"
---

# Design System: Visionario (v2)

Este documento describe la web app tal como está construida hoy (noviembre 2026, ronda 4). Si el código y este documento no coinciden, manda el código y este archivo se corrige. Los tokens viven en `src/app/globals.css`; los textos, en `src/content/visionario.ts`.

## Overview

**Creative North Star: "Una app luminosa que festeja cada paso"**

Visionario se siente como una app de celular moderna, no como una página informativa: fondo azul muy claro que respira, menús blancos, tarjetas blancas o marino oscuro, botones en píldora con un resplandor azul, elementos que flotan alrededor de las fotos y festejos cuando algo sale bien. El mundo visual combina dos referencias que pidió el cliente:

- **Pling (pling.com.bo):** botones redondeados con resplandor de color, barras de vidrio con desenfoque, fondos con manchas de color suaves, chips flotantes alrededor de un celular o una foto, etiquetas de sección con ícono, palabras destacadas en cursiva, selectores segmentados con una píldora que se desliza, listas con check verde.
- **Stratux (stratux.tech, formularios "Agendar reunión" y "Diagnostícate"):** campos translúcidos con borde de luz que se ilumina al enfocar, opciones como tarjetas que se elevan en hover, botón con la flecha dentro de un chip.

Se toma la mecánica, nunca el tema oscuro: Visionario es solo tema claro. La paleta, la tipografía y el tono siguen la Bible de marca (`docs/visionario_bible_brand_system.md`) con los ajustes de esta versión: azul más saturado tomado del logo, verde de éxito y oro para la joya.

**Key Characteristics:**
- Celular primero (390px). En escritorio la app se mantiene como app: el menú global vive abajo, centrado y a todo el ancho.
- Azul del logo para la acción, con resplandor; marino de la ceja del logo para estructura y tarjetas oscuras.
- Oro para todo lo que es la joya; verde para lo que se cumplió; rojo solo para problemas.
- Movimiento con propósito: entrar, flotar, festejar, deslizar. Siempre con versión sin movimiento.
- Redacción al grano, con **negritas** en las palabras clave.

## Colors

La paleta por defecto de Tailwind está eliminada (`--color-*: initial`). Solo existen estas escalas.

### Primary · Azul Visionario (del iris del logo, `#157DCA`)
- **Azul Acción** (primary-600 `#0F69B4`): botón primario, píldora activa del menú y del selector segmentado, tarjeta de la parada actual del recorrido, chips azules. Texto blanco encima: **5,7:1 (AA)**.
- **Azul Profundo** (primary-700 `#0B5796`): hover del botón primario, enlaces, palabras en negrita de los titulares, texto de acento. Sobre blanco: **7,5:1 (AAA)**.
- **Azul Logo** (primary-500 `#157DCA`): el color exacto del logo. Solo decoración y progreso: iris, barras de pasos, anillo de foco (3,9:1 sobre el fondo, válido para controles), borde de campo enfocado y de opción marcada.
- **Azul Bruma** (primary-50 a 300): fondos de opción marcada y chips (50, 100), manchas del fondo vivo y halos (200, 300).
- **Azul Noche** (primary-800 a 950): texto sobre fondos azules claros.

### Secondary · Marino (de la ceja del logo, `#08285A`)
- **Marino Noche** (secondary-950 `#0B1B38`): títulos y tarjetas oscuras (próxima cita, resumen de pagos, total de la orden, beneficio, "Hoy vs. con Visionario", banda de cuotas de la homepage).
- **Tinta** (secondary-900, 800): texto de cuerpo.
- **Texto de apoyo** (secondary-700 9,6:1 y secondary-600 7,2:1, AAA): ayudas, fechas, etiquetas inactivas del menú.
- **Bruma** (secondary-100 a 300): bordes de campos (200), pistas de progreso, estados pendientes.

### Oro · la joya
oro-300 para el recuadro "Recuerde traer su joya" dentro de la tarjeta oscura y la tarjeta "Su joya vuelve"; oro-100/200 con texto oro-800 (6,6:1) para la nota de la joya y la foto de la joya en custodia. También tiñe la mancha cálida del fondo.

### Éxito
exito-500 para el sello del festejo y los checks de cuotas pagadas; exito-50 con texto exito-800 (6,4:1) para "Pagada", "Pago recibido" y notas positivas; exito-100 para los círculos con check de las listas.

### Alerta
alerta-600/700 con fondo alerta-50 para errores, cuota vencida y el contador de notificaciones; alerta-500 para el círculo rojo de novedades del menú y la etiqueta "Nuevo".

### Fondo
`--background: #EAF2FB` más el **fondo vivo**: dos manchas difuminadas (azul 300 arriba a la izquierda, oro 300 abajo a la derecha) que respiran durante 14 s. Menús y tarjetas son blanco puro `#FFFFFF`.

### Named Rules
**The Blanco Sobre Azul 600 Rule.** El texto sobre el azul de acción siempre es blanco y el azul es el 600 (no el 500 del logo, que no llega a 4,5:1).

**The Oro Es La Joya Rule.** El oro solo aparece cuando se habla de la joya en garantía o en el calor del fondo.

**The Verde Es Cumplido Rule.** El verde marca solo lo que ya pasó bien (pagado, completado, recibido).

## Typography

**Títulos y botones:** Ubuntu (400, 500, 700). **Cuerpo y formularios:** Manrope variable. **Destacados:** Cormorant Garamond itálica.

### Hierarchy
- **Titular** (Ubuntu 700, 38→64px): H1 de la homepage y festejos.
- **Sección** (Ubuntu 700, 28→42px): H2 de cada banda y títulos de festejo.
- **Bloque** (Ubuntu 700, 20px): títulos de tarjeta y barra superior (26px en escritorio).
- **Entrada** (Manrope, 18px): bajadas, texto de campos y botón grande.
- **Cuerpo** (Manrope, 16px): texto corrido.
- **Meta** (Manrope 500, 14px) y **Mini** (Manrope 700, 12px): ayudas, etiquetas de menú, chips.
- **Cifra** (Ubuntu 700, 36→48px, tabular): montos.
- **Destacado** (Cormorant itálica 24px): "Gracias por confiar en nosotros" y agradecimientos.

### Named Rules
**The Una Palabra Brillante Rule.** Cada titular de la homepage tiene como máximo una palabra o frase destacada (`.resaltado`): Cormorant itálica 700 (bold) con un brillo azul lento (700→500→700, 5 s). Sobre fondos oscuros o azules se usa `.resaltado-claro` (oro→blanco). Nunca en botones, formularios ni montos.

**The Negrita Clave Rule.** La redacción marca las palabras clave con `**asteriscos**` en el archivo de contenido y el componente `ConNegrita` las pinta en negrita (800, marino 950; azul 700 en los títulos del onboarding y de "Cómo funciona").

**The Cifras Alineadas Rule.** Dinero, fechas, horas y dioptrías usan cifras tabulares.

## Layout

- **Celular primero.** La columna de la app mide hasta 28rem; en tablet hasta 42rem; desde 1024px ocupa la pantalla.
- **Contenedores:** general (1.25rem de margen, máx. 72rem en escritorio) y de flujo (columna de 40rem).
- **Barra superior blanca:** el título de la pantalla a la izquierda (también en escritorio) y, a la derecha, el acceso a Monturas (ícono de lentes) y el avatar de Mi cuenta. Sin logo dentro de la app: el logo vive en la homepage, el acceso, las barras de flujo en escritorio y el contrato.
- **Menú global abajo, siempre:** blanco, a todo el ancho de la pantalla, con las 5 pestañas (Mi cita, Estado, Pagos, Receta, Avisos) centradas en un ancho máximo de 42rem. Alto de 76px más la zona segura. El contenido reserva ese espacio con `pb-menu`.
- **Acción principal fija** en celular, sobre un degradado del fondo (sobre el menú si la pantalla lo tiene); en escritorio pasa al final del contenido.
- **Botones a todo el ancho** por defecto (tamaños `default` y `lg`); solo los pequeños (`sm`), los de ícono y los que se piden con `block={false}` se ajustan a su contenido. En la homepage de escritorio los CTA del héroe y del cierre se ponen lado a lado con ancho automático.

## Elevation & Depth

Capas: fondo azul claro vivo → tarjetas blancas (sombra sm) → tarjetas oscuras (sombra lg) → elementos flotantes de vidrio (sombra vidrio). Las acciones azules llevan **resplandor** (sombra de color del azul de acción) que crece en hover; el éxito lleva resplandor verde. Las tarjetas oscuras y azules tienen manchas internas difuminadas (azul 500 al 40%, oro al 15–20%) que dan profundidad.

**Vidrio** (`.vidrio`): blanco al 72% con `backdrop-filter: blur(16px) saturate(1.4)` (con prefijo `-webkit-` para Safari) y un borde de luz azul al 8%. Se usa en chips flotantes, el selector segmentado, el botón vidrio, las etiquetas sobre fotos y las notificaciones flotantes.

## Shapes

Curvas generosas como el iris: tarjetas de 2rem, bloques grandes de 2.5rem, campos y opciones de 1rem, y **todo botón, chip, pestaña y selector en píldora**. Fotos con radio de 1.75 a 2.5rem y un anillo blanco de 4 a 8px.

## Components

### Botones (`src/components/ui/button.tsx`)
Píldora, Ubuntu 700, a todo el ancho por defecto. En hover suben 2px y crece el resplandor; al presionar se hunden (escala 0.97). Transición de 300 ms con la curva de salida.
- **default:** azul 600, texto blanco, resplandor.
- **outline:** blanco con borde de luz azul 200 (azul 400 en hover), texto azul 700.
- **secondary:** azul 50 con texto azul 800 (acciones dentro de tarjetas: "Cambiar horario", "Adelantar cuota", "Borrar").
- **claro:** blanco sobre tarjetas oscuras o azules.
- **vidrio:** sobre fotos o fondos de color.
- **exito / destructive / ghost / link.**
- **`<Flecha />`:** la flecha va dentro de un chip circular que avanza 2px en hover (referencia Stratux).
- Tamaños: `lg` 56px, `default` 48px, `sm` 40px, `icon` 48px.

### Campos (`input.tsx`)
56px, radio 1rem, blanco al 80% con borde secondary-200 de 1px, texto de 18px. Hover: borde 300 y blanco pleno. Foco: borde azul 500 con halo de 4px azul al 16% y un resplandor suave. Error: borde alerta 600 y halo rojo. Etiqueta siempre visible arriba (Meta 700). Siempre a todo el ancho.

### Opciones (`opciones.tsx`)
- **Opciones / OpcionesMultiples:** tarjetas de 56px que se elevan en hover; marcada con borde azul 500, fondo azul 50, anillo y resplandor; el indicador (círculo o cuadrado) se llena de azul 600 y el check entra con rebote.
- **Segmentado:** selector de vidrio en píldora; una píldora azul con resplandor se desliza hasta la opción elegida (500 ms, curva de resorte). Se usa en Adultos/Niños, Hoy/Con Visionario y los pasos de "Cómo funciona".
- **Interruptor:** toggle de 56×32px; la bolita se desliza con rebote y el riel se enciende en azul con resplandor.

### Notas de información (`nota.tsx`)
Componente de información dentro de una pantalla (no flota): ícono en un chip blanco, título en negrita y, si hace falta, una línea más. Tonos: `info` (azul 50), `exito` (verde 50), `alerta` (rojo 50), `oro` (joya) y `oscuro`. Entran con un leve deslizamiento.

### Notificaciones flotantes (`avisos.tsx`)
Tarjeta de vidrio con radio 1.5rem que entra desde arriba con rebote (arriba a la derecha en escritorio): isotipo en un chip blanco con punto rojo, título Ubuntu, texto y la acción como píldora azul. Se van solas a los 7 s. La pestaña Avisos del menú global muestra un contador rojo con las notificaciones sin leer. Las notificaciones son parte del núcleo de la app y por eso viven en el menú global; Monturas, de uso menos frecuente, queda en la barra superior.

### Chips flotantes (`chip-flotante.tsx`)
Píldoras de vidrio (o azules, verdes de éxito, oro) con un ícono o emoji en un círculo. Aparecen con un pequeño rebote escalonado y luego levitan (6 s, 10px). Decorativos (`aria-hidden`): la información real siempre está en el texto. Se usan alrededor de fotos (homepage, onboarding), del celular simulado y de los estados vacíos.

### Estados vacíos (`estado-vacio.tsx`)
Centrados en el espacio libre. Un círculo blanco con el ícono del tema sobre un disco azul con resplandor, un anillo punteado que gira lento, un halo que late y hasta tres chips flotando con lo que va a aparecer ahí. Título y texto entran desde un leve desenfoque.

### Festejos (`festejo.tsx`)
- **Festejo:** sello circular (verde, azul u oro) que entra con rebote y giro, con un halo que late y una lluvia de 22 emojis (🎉👓✨💙🥳…) que sale disparada desde el centro y se desvanece en 1,6 s. Se usa al reservar la cita, firmar el contrato, pagar una cuota y liquidar.
- **QueSigue ("¿Y ahora qué pasa?"):** tarjeta blanca con los próximos pasos, uno por línea, cada uno con un emoji en un círculo (verde si ya se cumplió). Después de pagar la cuota 1: fabricación en 1 a 3 días hábiles, aviso por WhatsApp, recojo en la óptica con el carnet.

### Tarjetas
- **tarjeta:** blanca, radio 2rem, sombra sm.
- **tarjeta oscura:** marino 950, radio 2rem, sombra lg, manchas internas azul y oro.
- **tarjetas de cuota:** una por cuota, con círculo numerado (azul con resplandor para la próxima, verde con check para la pagada) y la acción dentro.

### Recorrido (`linea-estado.tsx`)
Tarjetas horizontales (240px en celular, cuatro por fila en escritorio) que se deslizan con el dedo (nativo, con snap), se arrastran con el mouse y se mueven con flechas. Hecha: blanca con emoji en círculo verde y check. Actual: tarjeta azul 600 con resplandor, chip "Ahora" y la acción como botón claro. Pendiente: blanca translúcida con emoji atenuado. Debajo, un punto por parada. Al abrir se centra en la parada actual.

### Homepage
Héroe con etiqueta de sección, titular con palabra brillante, bajada con negritas, dos CTA ("Agendar cita gratuita" y "Ver cómo funciona", que abre el onboarding con una X que vuelve aquí), pruebas con check verde y una foto con cuatro chips flotantes. Luego: el problema (cuatro datos del pitch, uno en tarjeta oscura), "Hoy vs. con Visionario" (segmentado), "Cómo funciona" (tres pestañas con un celular simulado que muestra horarios libres reales, la joya tasada y el pago QR con el aviso de WhatsApp), para quién (fotos de adultos y niños), las cuotas iguales (tarjeta oscura: Bs 300 + 300 + 300 y "Su joya vuelve"), monturas y un cierre azul con CTA.

### Onboarding (`proceso/carrusel.tsx`)
Tres pasos, solo título con negritas: (1) 3 cuotas sin intereses, (2) agende gratis, medición y tasación de la joya, (3) pague por QR, recoja y su joya vuelve. Cada paso tiene una foto que entra con escala y tres chips flotantes. Se desliza con el dedo; puntos de avance con píldora activa.

### Firma (`lienzo-firma.tsx`)
Recuadro de 320px (384px en escritorio), blanco con borde punteado azul 200 y radio 1.75rem; mientras está vacío, un trazo de ejemplo se dibuja solo. Al firmar: borde azul 500 con halo. Bloqueo de desplazamiento doble: `touch-action: none` + `preventDefault` en el lienzo y, mientras el dedo dibuja, la página entera queda quieta (`overflow: hidden` en `html` y `touchmove` bloqueado en el documento). Al soltar se libera.

### Pago
Tarjeta blanca con chip "Cuota N de 3", el monto en Cifra, la fecha y el QR con una línea de escaneo animada; debajo, el chip verde "Pago protegido". Las cuotas son siempre **iguales** (`montoCuota = total / 3`).

### Fotografía
Fotos de Pexels (licencia libre, créditos en `public/fotos/CREDITOS.md`): adultos y niños con lentes, consulta óptica, monturas y la cadena de oro. Siempre con radio grande, anillo blanco y, si llevan texto encima, un degradado marino. El avatar por defecto del usuario de ejemplo es `public/fotos/avatar-rosa.jpg`. Las 20 monturas del catálogo usan fotos de ejemplo (`public/fotos/monturas/a-01…n-10.jpg`) hasta tener las reales.

## Motion

- **Curvas:** salida `cubic-bezier(0.2, 0, 0, 1)` (botones, transiciones, tomada de Pling), resorte `cubic-bezier(0.16, 1, 0.3, 1)` (lo que entra y se desliza), rebote `cubic-bezier(0.34, 1.56, 0.64, 1)` (selecciones, sellos, chips).
- **Entradas:** `aparecer` 700 ms (desde 18px abajo con desenfoque de 8px), `entrar` 520 ms, `paso-adelante/atrás` 420 ms, `aviso` 520 ms con rebote, `chip` 700 ms, `confirmar` 640 ms (sello con giro), `elegir` 380 ms.
- **Continuas:** `flotar` 6 s, `respirar` 14 s (fondo), `brillo` 5 s (palabra destacada), `girar` 18 s (anillo de vacíos), `latido` 2.4 s, `escanear` 2.6 s (QR), campana una vez.
- **Revelar al hacer scroll** (`<Revelar>`): solo en la homepage, con desenfoque y escalonado.
- **Sin movimiento:** con `prefers-reduced-motion` todas las animaciones y transiciones se reducen a 1 ms, los festejos dejan solo el sello y el contenido revelable aparece de inmediato.

## Compatibilidad
Probado en Chromium (Chrome, y por motor Brave y Opera) y en WebKit (motor de Safari) con Playwright, en celular y escritorio. `backdrop-filter` lleva prefijo `-webkit-`; las variables, `color-mix` y `:has()` requieren Safari 16.4 o superior (requisito de Tailwind v4).

## Do's and Don'ts

### Do:
- **Do** usar azul 600 con texto blanco en toda acción principal, con resplandor.
- **Do** poner el menú global abajo, blanco y a todo el ancho, también en escritorio.
- **Do** mostrar el título de la pantalla en la barra superior, sin logo dentro de la app.
- **Do** festejar cada logro (cita, firma, pago, liquidación) y decir en corto qué pasa ahora.
- **Do** usar oro para la joya, verde para lo cumplido y rojo solo para problemas, siempre con ícono y texto.
- **Do** marcar las palabras clave con negrita y escribir al grano.
- **Do** dar a cada animación su versión sin movimiento.
- **Do** mantener las cuotas exactamente iguales.

### Don't:
- **Don't** usar tema oscuro como base: lo oscuro solo vive en tarjetas puntuales.
- **Don't** poner texto sobre el azul 500 del logo: el 500 es decoración y progreso.
- **Don't** poner el logo o el iris como adorno en pantallas de la app (receta, pagos, estado).
- **Don't** usar más de una palabra brillante por titular, ni en botones, formularios o montos.
- **Don't** incluir un estimador de la joya: la tasación es manual en la óptica.
- **Don't** dejar elementos flotantes sobre botones o el texto que hay que leer.
- **Don't** distinguir un estado solo por color.
