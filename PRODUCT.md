# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + React, Tailwind CSS v4 con tokens de marca (sin valores arbitrarios), ShadCN UI personalizado, iconos HugeIcons en SVG, fuentes con `next/font`, imágenes con `next/image`. Repositorio GitHub, despliegue en Vercel. Fijado por el cliente en `docs/brief.md` §7.

## Users

Pacientes de bajos recursos de Santa Cruz de la Sierra (Bolivia) con medidas medianas a severas (desde ±4.00 dioptrías): trabajadores informales y de oficios manuales (comerciantes, sastres, mecánicos, choferes, artesanos) de zonas periféricas como Plan 3000, Villa 1° de Mayo, Pampa de la Isla y Los Lotes. También madres, padres y tutores que gestionan los lentes de sus hijos. Usan sobre todo el celular, no siempre son nativos digitales, y llegan con ansiedad financiera y preocupación por su salud visual.

## Product Purpose

Web app de paciente (no web informativa) donde la persona crea su cuenta, agenda su cita presencial gratuita de 60 minutos, firma su contrato, paga sus 3 cuotas y consulta su receta. Acción principal: registrarse y agendar la cita. Retención: cumplir pagos, consultar receta y renovar. Criterio de corte: una pantalla que no acerca a agendar, pagar o renovar, sobra.

Esta fase es un prototipo sin backend: todo lo que depende de terceros o del tiempo se simula con un simulador de flujos marcado como "Demo", activado por una bandera, con estado en el navegador y datos desde un único archivo de contenido.

## Positioning

Lentes orgánicos de alto índice tallados a medida para medidas medianas a severas, pagados en 3 cuotas fijas mensuales sin intereses, con una joya de oro de 18 quilates como única garantía y sin acceso bancario. Proceso presencial lineal tipo "Subway" (medición → montura → tasación de joya → firma y pago) y seguimiento 100% digital.

## Operating Context

- Cita presencial de 60 minutos en la óptica del centro de Santa Cruz: medición clínica gratuita, elección de montura del catálogo cerrado, tasación de la joya en gramos, firma del contrato digital y pago de la cuota 1 de 3.
- El laboratorio externo tarda entre 2 y 10 días hábiles; aviso para recojo en tienda o delivery.
- Recordatorios de cuota por WhatsApp y en la app, con QR dinámico. Medios de pago: efectivo o QR.
- Periodo de gracia de 1 mes; si no se completa el pago, Visionario se queda con la joya. Al pagar la 3.ª cuota, la joya se devuelve.
- Menores: firma y deja la joya su padre, madre o tutor.
- Renovación a los 6 y 12 meses con cupón pre-aplicado en la agenda.

## Capabilities and Constraints

- Catálogo cerrado de 20 monturas (10 adultos, 10 niños). Sin monturas fuera de catálogo.
- Tratamientos: antirreflejo, filtro de luz azul, bifocal (precio PENDIENTE).
- Precio del lente: rango referencial Bs 900 a Bs 2.000, siempre etiquetado "referencial". No se inventan precios.
- Sin estimador de garantía (decisión del cliente, 2026-11-09): la tasación de la joya es un proceso manual de la óptica que vive en el ERP. La app solo explica que la joya se pesa en la cita.
- Web app que se usa como app de celular (decisión del cliente, 2026-11-09): mobile-first estricto; el escritorio es secundario pero adaptado (decisión del cliente, 2026-11-09): desde 1024px navegación superior y composiciones a dos columnas en landing, inicio, cuenta y felicitación; los flujos usan una columna de lectura.
- Sin cancelaciones ni reembolsos tras firmar.
- Patologías que requieren cirugía: se deriva a otro centro de salud.
- No se pide ningún dato innecesario en el registro. Sin página suelta de "Adquirir".
- PENDIENTES: tabla de precios por dioptrías, monto de cuota inicial (el prototipo la trata como cuota 1 de 3), plazo 3 vs 3–6 meses (prototipo: 3), garantía de producto, horarios y dirección exacta de la óptica, catálogo real de monturas.

## Brand Commitments

- Adjetivos rectores: accesible, solemne (respetuosa), confiable. Sensación de acompañamiento, sin presión.
- Voz: español de Bolivia, tratamiento de usted, educativa; traduce lo clínico y financiero a lenguaje cotidiano. Sin urgencia agresiva, sin contadores de escasez, sin infantilizar, sin exceso de emojis.
- Sistema de marca fijado en `docs/visionario_bible_brand_system.md`: primario cian (500 `#3DA9DF`), secundario slate/marino; Ubuntu (títulos), Manrope (cuerpo y UI), Cormorant Garamond solo en destacados de impacto/agradecimiento; radio por defecto ~0.5rem; HugeIcons en SVG; fotografía documental de personas reales con luz natural.
- Decisión del cliente (2026-11-09): botón primario en cian 500 con texto marino oscuro para cumplir WCAG AA.
- Decisión del cliente (2026-11-09): en la barra superior se usa el logo oficial recortado sin el lema "Accesorios Ópticos"; el lockup completo solo en pie y tamaños grandes.
- Logo oficial obligatorio en barra superior y pie; nunca se reemplaza por el nombre en tipografía. El isotipo del ojo puede servir como spinner o estado vacío.
- Animación que explica o reconforta, nunca decora; siempre con alternativa `prefers-reduced-motion`.

## Evidence on Hand

- Logos raster en `public/logo/` (lockup completo PNG transparente, isotipo PNG con fondo blanco, `.ico`). Sin SVG.
- Fuentes en `public/tipografias/` (Ubuntu estáticas, Manrope y Cormorant Garamond variables).
- Ausentes y no fabricables: fotografías reales de la comunidad, fotos de las 20 monturas, testimonios, precios por dioptría, dirección/horarios de la óptica. Se usan marcadores claramente identificados.

## Product Principles

1. Un solo objetivo por pantalla, con el siguiente paso siempre visible.
2. Certeza antes que persuasión: montos, fechas y condiciones explícitos antes de cualquier compromiso.
3. Dignidad: profesionalismo y respeto, nunca condescendencia ni presión.
4. Todo lo simulado se declara como "Demo".

## Accessibility & Inclusion

WCAG AA de contraste, operable por teclado, etiquetas visibles en formularios, áreas de toque grandes en celular, estados de pago distinguidos con icono y texto (no solo color), soporte completo de `prefers-reduced-motion`. Usuarios con baja visión y poca experiencia digital.
