---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/panel/inicio.tsx","src/app/agendar/agenda.tsx"]
---

# Visionario · App del paciente (landing + app)

Scope: toda la web app del paciente. Landing `/` en modo Persuade; el resto (`/registro`, `/registro/perfil`, `/proceso`, `/monturas`, `/agendar`, `/panel/**`) en modo Operate. Celular primero (390px es la vista principal); escritorio adaptado desde 1024px.

Audiencia: trabajadores informales de periferias de Santa Cruz con medidas ≥ ±4 D, poca experiencia digital, ansiedad financiera. Acción: registrarse y agendar la cita de 60 min; después, firmar, pagar 3 cuotas y renovar.

Restricciones: mundo visual fijado por el brief del cliente (cian 500 + slate, Ubuntu/Manrope/Cormorant, radio 0,5rem, HugeIcons, ShadCN). Botón principal cian 500 con texto marino (decisión del cliente por AA). Sin estimador de joya (decisión del cliente). Sin backend; simulador "Demo".

Nota de proceso: esta dirección se registró al final de la fase 2 porque el motor de Impeccable no pudo descargarse (HTTP 504) durante la fase de dirección; la ronda de conceptos (concept-seed) no se ejecutó. El mundo visual lo fija el brief del cliente.

## Direction contract

THESIS: El recorrido del paciente es una sola línea con paradas, del primer clic a la joya devuelta; la app lo usa para explicar (landing) y para ubicar ("Usted está aquí"). Rechaza la landing de clínica con hero de foto + tarjetas de beneficios y el dashboard fintech de gráficos.

OWN-WORLD: Fondo slate 50, superficies blancas, bloques de decisión en marino 950 con la acción en cian 500 y texto marino; títulos Ubuntu, cuerpo Manrope, Cormorant solo para agradecer; el iris del logo (círculo cian, pupila marina, brillo blanco) como marcador del presente; HugeIcons de trazo fino; estados de pago con icono + texto.

STORY: El visitante entiende que sus lentes a medida se pagan en 3 cuotas sin intereses con una joya en garantía, ve horarios libres reales y toca uno; luego la app lo guía paso a paso (datos, proceso, cita, orden, firma, cuotas) siempre mostrando dónde está y cuál es su próximo paso.

FIRST VIEWPORT: Celular: barra con logo oficial (sin lema) e "Iniciar sesión"; H1 Ubuntu Bold de 3 líneas; bajada de 4 líneas; tres garantías con check; tarjeta marina "Próximos horarios libres" con 3 horarios tocables y el CTA cian "Agendar cita gratuita" dentro de la tarjeta. Escritorio: oferta a la izquierda, tarjeta de horarios a la derecha (26rem).

FORM: Recorrido-línea (transit/Subway del pitch) como gesto propio; posición 1 en la lista propia; seed: none (roll skipped: el motor de Impeccable no estaba disponible durante la fase de dirección; el mundo visual lo fija el brief del cliente).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
