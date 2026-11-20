# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + React, Tailwind CSS v4 con tokens de marca (sin valores arbitrarios), ShadCN UI personalizado, iconos HugeIcons en SVG, fuentes con `next/font`, imágenes con `next/image`. Repositorio GitHub, despliegue en Vercel. Fijado por el cliente en `docs/brief.md` §7.

## Users

Pacientes de bajos recursos de Santa Cruz de la Sierra (Bolivia). El crédito es para medidas desde 4 dioptrías; con menos, se cobra la receta y la venta es al contado. Son trabajadores informales y de oficios manuales (comerciantes, sastres, mecánicos, choferes, artesanos) de zonas periféricas como Plan 3000, Villa 1° de Mayo, Pampa de la Isla y Los Lotes. También madres, padres y tutores que gestionan los lentes de sus hijos. Usan sobre todo el celular, no siempre son nativos digitales, y llegan con ansiedad financiera y preocupación por su salud visual.

## Product Purpose

Web app de paciente (no web informativa) de **OptiHelp** donde la persona crea su cuenta, agenda su cita presencial gratuita de 60 minutos en la **Óptica Visionario** (la óptica aliada), firma su contrato, paga sus 3 cuotas por QR y consulta su receta. Acción principal: registrarse y agendar la cita. Retención: cumplir pagos, consultar receta y renovar. Criterio de corte: una pantalla que no acerca a agendar, pagar o renovar, sobra.

Esta fase es un prototipo sin backend: todo lo que depende de terceros o del tiempo se simula con un simulador de flujos marcado como "Demo", activado por una bandera, con estado en el navegador y datos desde un único archivo de contenido.

## Positioning

**OptiHelp** es la marca de la app: vende, da el crédito y cobra. La atención es en la **Óptica Visionario**, la óptica aliada del centro de Santa Cruz. Lentes tallados a medida para medidas desde 4 dioptrías, pagados en 3 cuotas sin intereses (40% al firmar, 30% al mes, 30% a los dos meses), **sin garantía**: solo con el carnet de identidad y el contrato firmado en la app. Sin acceso bancario y sin financiera. Seguimiento 100% digital.

## Operating Context

- Cita presencial de 60 minutos en la Óptica Visionario: medición clínica (gratis si accede al crédito) y elección de la montura entre las de la óptica.
- Después de la cita, OptiHelp carga la orden en su ERP (lo construye el CTO aparte; aquí se simula). La persona la recibe en la app, completa su carnet y su domicilio, saca una foto del frente y otra de atrás de su carnet, firma el contrato con el dedo y paga por QR la cuota inicial del 40%. Con ese pago se mandan a hacer los lentes.
- Con menos de 4 dioptrías no hay crédito: la orden es al contado (receta + lentes) y se paga una sola vez por QR, sin contrato.
- El laboratorio de la óptica tarda entre 1 y 3 días hábiles (PENDIENTE); aviso por WhatsApp para recojo en la óptica.
- Recordatorios de cuota por WhatsApp y en la app, con QR dinámico. Único medio de pago: QR, a OptiHelp.
- Si se atrasa: 3 días hábiles para ponerse al día; después, interés moratorio de 3% mensual sobre lo vencido y posibles acciones legales (PENDIENTE: revisión legal). Al pagar la 3.ª cuota, los lentes son suyos y recibe un descuento en gafas de sol que pone OptiHelp.
- ONG 1: paga la montura de los clientes que envía; el cliente paga menos.
- Menores: el contrato lo firma su padre, madre o tutor, con sus propios datos.
- Renovación a los 6 y 12 meses con cupón pre-aplicado en la agenda.

## Capabilities and Constraints

- Sin catálogo de monturas: las monturas son de la Óptica Visionario, que decide cuáles ofrece y a qué precio. La orden solo muestra la montura elegida y su precio.
- Tratamientos: antirreflejo, filtro de luz azul, bifocal (precio PENDIENTE).
- Precios referenciales: Bs 825 al contado + receta (menos de 4 dioptrías), Bs 1.740 (media) y Bs 3.490 (alta), siempre etiquetados "Referencial" y marcados pendientes. No se inventan precios.
- Sin garantía de ningún tipo y sin financiera en la Fase 1.
- Web app que se usa como app de celular (decisión del cliente, 2026-11-09): mobile-first estricto; el escritorio es secundario pero adaptado (decisión del cliente, 2026-11-09): desde 1024px navegación superior y composiciones a dos columnas en landing, inicio, cuenta y felicitación; los flujos usan una columna de lectura.
- Sin cancelaciones ni reembolsos tras firmar.
- Patologías que requieren cirugía: se deriva a otro centro de salud.
- No se pide ningún dato innecesario en el registro: el carnet y el domicilio se piden recién antes de firmar el contrato. Sin página suelta de "Adquirir".
- PENDIENTES: precios reales del laboratorio, precio de la receta (demo Bs 100), porcentaje del descuento en gafas de sol (demo 15%), datos legales de OptiHelp para el contrato, revisión legal (moratorio, reporte a centrales, firma dibujada), plazo del laboratorio, dirección, horario y foto de la Óptica Visionario, garantía de producto.

## Brand Commitments

- Adjetivos rectores: accesible, solemne (respetuosa), confiable. Sensación de acompañamiento, sin presión.
- Voz: español de Bolivia, tratamiento de usted, educativa; traduce lo clínico y financiero a lenguaje cotidiano. Sin urgencia agresiva, sin contadores de escasez, sin infantilizar, sin exceso de emojis.
- Sistema de marca fijado en `docs/optihelp_bible_brand_system.md`: primario cian (500 `#3DA9DF`), secundario slate/marino; Ubuntu (títulos), Manrope (cuerpo y UI), Cormorant Garamond solo en destacados de impacto/agradecimiento; radio por defecto ~0.5rem; HugeIcons en SVG; fotografía documental de personas reales con luz natural.
- Decisión del cliente (2026-11-09): botón primario en cian 500 con texto marino oscuro para cumplir WCAG AA.
- Logo de OptiHelp sin lema: `logo-navbar` (barra) y `logo-completo` (pie, acceso, contrato) son el mismo dibujo en dos tamaños; `logo-blanco` sobre fondos oscuros. Colores del logo: marino `#08285B`, azul `#177ECB`, cian `#3DA9DF`.
- Logo oficial obligatorio en barra superior y pie; nunca se reemplaza por el nombre en tipografía. El isotipo del ojo puede servir como spinner o estado vacío.
- Animación que explica o reconforta, nunca decora; siempre con alternativa `prefers-reduced-motion`.

## Evidence on Hand

- Logos de OptiHelp en `public/brand/` (PNG a color y blanco, isotipo, y los SVG originales `optihelp-*.svg`); favicon e ícono en `src/app/`. Los archivos de `public/logo/` son del logo anterior de Visionario y ya no se usan.
- Fuentes en `public/tipografias/` (Ubuntu estáticas, Manrope y Cormorant Garamond variables).
- Ausentes y no fabricables: fotografías reales de la comunidad, foto de la Óptica Visionario, testimonios, precios reales del laboratorio, dirección y horario de la óptica, datos legales de OptiHelp. Se usan marcadores claramente identificados.

## Product Principles

1. Un solo objetivo por pantalla, con el siguiente paso siempre visible.
2. Certeza antes que persuasión: montos, fechas y condiciones explícitos antes de cualquier compromiso.
3. Dignidad: profesionalismo y respeto, nunca condescendencia ni presión.
4. Todo lo simulado se declara como "Demo".

## Accessibility & Inclusion

WCAG AA de contraste, operable por teclado, etiquetas visibles en formularios, áreas de toque grandes en celular, estados de pago distinguidos con icono y texto (no solo color), soporte completo de `prefers-reduced-motion`. Usuarios con baja visión y poca experiencia digital.
