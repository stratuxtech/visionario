# 01 · Brief general: Web App Visionario

> Este documento define las decisiones y criterios de la web app de Visionario. Trátalo como decisiones cerradas. Si algo es ambiguo, resuélvelo con lo documentado en el proyecto y anota el supuesto. No inventes fuera de este criterio.
>
> Fuentes de referencia: `visionario_bible_brand_system.md` (sistema de marca), `reglas_de_negocio.md` (reglas), `user_flows_web_app_visionario.md` (flujos) e `historias_de_usuario_web_app_visionario.md` (historias).

---

## 1. Qué es y para quién

- **Tipo de producto:** web app para pacientes. No es una web informativa. Es una aplicación interactiva donde la persona crea su cuenta, agenda su cita, firma su contrato, paga sus cuotas y consulta su receta.
- **Alcance de esta fase:** prototipo sin backend. No hay base de datos, ni pasarela de pagos real, ni inicio de sesión real, ni envío real de WhatsApp o correos. Todo lo que depende de un tercero o del tiempo se simula dentro de la app (ver sección 6).
- **Qué es Visionario:** plataforma de salud visual y financiamiento de impacto social en Santa Cruz de la Sierra, Bolivia. Fabrica lentes de medida mediana a severa (desde ±4.00 dioptrías) para personas de bajos recursos y los paga en cuotas, con una joya de oro de 18 quilates como garantía.
- **Quién la usa:** trabajadores informales y de oficios manuales (comerciantes, sastres, mecánicos, choferes, artesanos) de zonas periféricas como Plan 3000, Villa 1° de Mayo, Pampa de la Isla y Los Lotes. También madres, padres y tutores que gestionan los lentes de sus hijos. Usan sobre todo el celular y no siempre son nativos digitales.
- **Qué debe sentir en los primeros 5 segundos:** alivio y confianza. La persona debe pensar: *"Por fin hay un lugar que me consigue mis lentes sin pedirme una fortuna de una vez, y me explica cada paso."*

## 2. Objetivo (la única acción importante)

- **Acción principal:** que el paciente se registre y agende su cita presencial de 60 minutos en la óptica.
- **Acciones que alimentan el objetivo:** entender cómo funciona el proceso, revisar el catálogo de 20 monturas antes de ir, y estimar cuánto oro necesita dejar en garantía.
- **Acciones posteriores (retención):** seguir su plan de pagos, pagar cuotas, consultar su receta visual y renovar sus lentes.
- **Criterio de corte:** si una pantalla no acerca al paciente a agendar, a cumplir sus pagos o a renovar, sobra.

## 3. Tono y personalidad

- **Tres adjetivos rectores:** accesible, solemne (respetuosa) y confiable.
- **Sensación:** acompañamiento. La persona se siente guiada paso a paso, con control de lo que pasa y sin presión.
- **Voz:** español de Bolivia, tratamiento de **usted**. Educativa y clara. Traduce términos clínicos y financieros a lenguaje cotidiano: en lugar de "tasación prendaria", "Valor estimado de tu joya para cubrir tus lentes".
- **Antimodelo:** nada de software corporativo frío, ni fintech bancaria llena de gráficos complejos, ni clínica estéril. Tampoco infantilizar al usuario, ni meter urgencia agresiva, ni usar emojis en exceso o un tono informal que reste seriedad al compromiso de salud.

## 4. Decisiones de estilo (resumen del design system)

Fuente completa: `visionario_bible_brand_system.md`. Aquí solo las decisiones que guían cada pantalla.

- **Color:**
  - **Primary (cian, base del iris del logo):** es el color de la acción, las conversiones y el progreso. Reservado para botones principales, CTAs, progreso de cuotas y enlaces.
  - **Secondary (azul marino / slate):** es el ancla neutral. Da estructura, solemnidad y legibilidad. Se usa para textos, bordes de formularios y fondos de paneles.
  - **Estados de pago** (pagado, pendiente, vencido): se distinguen siempre con icono y texto, no solo con color.
- **Tipografía:**
  - **Ubuntu** para títulos y encabezados. Geométrica y redondeada, dialoga con el logo.
  - **Manrope** para cuerpo de texto, formularios, cuotas y contratos. Alta legibilidad.
  - **Cormorant Garamond** solo en destacados puntuales: agradecimientos y mensajes de impacto social. Nunca en UI ni en botones.
  - La jerarquía debe ser clara a simple vista: un título dominante por pantalla, subtítulos claros, metadatos discretos.
- **Densidad:** media-baja. Mucho aire entre bloques, un solo objetivo por pantalla, pasos visibles. Botones y áreas de toque grandes, pensados para celular.
- **Forma:** bordes redondeados suaves. Botones primarios con relleno sólido para que la persona sepa exactamente dónde tocar. Estados hover y selección sutiles, sin ruido.
- **Iconos:** librería HugeIcons. Trazo limpio y amigable. **Siempre en SVG.**
- **Logo:** el logotipo oficial en la barra superior y el pie, como sello de confianza. No se escribe el nombre con tipografía en lugar del logo. El isotipo del ojo puede servir como spinner o estado vacío.
- **Fotografía:** personas reales de la comunidad (comerciantes, sastres, mecánicos) en su entorno, con luz natural, colores reales y gestos de alivio y dignidad. No se muestran máquinas de tallado, neón ni estética cibernética.
- **Movimiento:** la interfaz sí tiene animación; no debe sentirse plana. Regla de oro: **la animación explica o reconforta, nunca decora.** Ejemplos de uso:
  - Transición entre pasos del flujo lineal de la sede (de izquierda a derecha, estilo Subway).
  - La barra de progreso de cuotas se llena al confirmar un pago.
  - La firma se dibuja en tiempo real sobre el lienzo.
  - Entrada suave de notificaciones y de la pantalla de felicitación al liquidar.
  - Carrusel educativo con transiciones suaves y controles claros.
  - Micro-respuestas al seleccionar una montura o confirmar un botón.
  - Duraciones cortas y suaves. Ninguna animación bloquea la acción del usuario.
  - **Obligatorio:** cada animación debe tener una versión sin movimiento para quien active `prefers-reduced-motion`.

## 5. Manías y preferencias

- Nada de fondos de partículas, gradientes ruidosos ni efectos de plantilla vieja.
- Iconos siempre en SVG. Ningún emoji como icono funcional de la interfaz.
- Sí a las animaciones, pero con propósito (ver sección 4).
- Ninguna pantalla debe verse como una plantilla genérica: cada bloque debe tener una función clara.

## 6. Must-haves y no-goes

### Must-haves

**Arquitectura de la app (según `user_flows_web_app_visionario.md`):**

1. **Landing (usuario no autenticado):** propuesta de valor, sección "Cómo funciona" con énfasis en medidas medianas a severas, y botones "Iniciar sesión" y "Registrarse".
2. **Autenticación:** acceso con Google (SSO) y con correo y contraseña. Simulados en el prototipo.
3. **Formulario de perfil:** pasos cortos. Nombre, WhatsApp, correo, edad, uso previo de lentes, medida estimada (con opción "No sé") y cómo nos conoció.
4. **Educación del proceso:** carrusel o infografía que explica la visita, la joya y las 3 cuotas, antes de abrir el calendario.
5. **Catálogo de 20 monturas** (10 adultos, 10 niños) visible antes de agendar. Sin monturas fuera de catálogo.
6. **Estimador de garantía:** según la medida aproximada y el peso en gramos de la joya, muestra un valor estimado. Es referencial y debe decirlo.
7. **Agenda:** calendario con bloques exactos de 60 minutos.
8. **Orden de compra:** la orden generada en la óptica aparece en la cuenta con el detalle del lente, la montura y el monto total.
9. **Firma de contrato:** lienzo táctil para firmar con el dedo, con las condiciones de las 3 cuotas visibles.
10. **Pago de la cuota 1 de 3:** pago por QR o enlace (simulado). Al confirmar, el estado pasa a "1/3 pagado".
11. **Panel de deuda:** progreso visible ("Has pagado 1 de 3 cuotas"), cuotas pendientes con su fecha, pago de las cuotas 2 y 3, y alertas de vencimiento.
12. **Receta visual (historial clínico):** solo lectura, con los datos de cada ojo y la fecha de la medición.
13. **Mi cuenta:** editar datos, cambiar foto de perfil y cerrar sesión.
14. **Liquidación:** al pagar la cuota 3, pantalla de felicitación con descuento exclusivo para un producto secundario (ej. gafas de sol).
15. **Renovación:** notificación a los 6 y 12 meses. Al hacer clic, lleva a agendar con el cupón ya aplicado.
16. **Responsive mobile-first.** El flujo completo debe funcionar bien en un celular.
17. **Simulador de flujos** (ver siguiente bloque).

**Simulador de flujos (crítico):** la persona que descargue la aplicación debe poder recorrerla de punta a punta sin backend. Todo lo que depende de un tercero o del tiempo tiene un botón de simulación:

- **Simular orden del ERP:** llega una orden de compra desde la óptica.
- **Simular pago de cuota:** marca una cuota como pagada y actualiza el progreso.
- **Simular laboratorio listo:** el lente está listo y se dispara la notificación para recoger o pedir delivery.
- **Simular vencimiento o mora:** activa el estado de cuota vencida y el periodo de gracia.
- **Simular liquidación:** completa el pago de la cuota 3 y dispara la felicitación.
- **Simular notificaciones:** un selector deja elegir el tipo (recordatorio de cuota, lente listo, renovación a 6 meses, renovación a 12 meses, recordatorio de cita) y lo muestra como lo vería la persona.
- **Reiniciar demo:** vuelve a los datos semilla.

Reglas del simulador:
- Vive en un solo lugar y se activa con una bandera de demo, para poder quitarlo sin tocar el resto.
- Se ve claramente como "Demo" para que nadie crea que el pago o la firma tienen validez real.
- El estado se guarda en el navegador y todo sale de un único archivo de datos de contenido.

### No-goes

- **Nada de backend.** Ni base de datos, ni API real, ni pasarela real, ni WhatsApp o SSO reales. Todo simulado.
- **No hay página suelta de "Adquirir".** Todo flujo de compra ocurre dentro de la app.
- **No se inventan precios.** Los precios por rango de dioptrías no están definidos. Se muestra el rango de referencia (Bs 900 a Bs 2.000) con la etiqueta "referencial".
- **No se atienden patologías que requieran cirugía.** Si la pantalla de evaluación lo menciona, deriva a otro centro de salud.
- **No se pide ningún dato innecesario** a la persona durante el registro.
- **No hay tono de urgencia agresiva** ni contadores de escasez.

## 7. Stack y restricciones técnicas

- **Framework:** Next.js con React.
- **Estilos:** Tailwind CSS. Los tokens de color, tipografía y radio se mapean desde el design system. No se usan valores arbitrarios sueltos.
- **Componentes:** ShadCN UI, sobre Tailwind. Se personaliza con los tokens de marca.
- **Iconos:** HugeIcons, siempre en SVG.
- **Repositorio:** GitHub.
- **Despliegue:** Vercel.
- **Sin backend:** estado en el cliente. Los datos semilla viven en un único archivo de contenido o configuración.
- **Fuentes:** cargadas con `next/font`.
- **Imágenes:** `next/image`, en formatos modernos y optimizados.
- **Rendimiento:** las animaciones usan propiedades que corren por GPU (transformación y opacidad), sin afectar los Core Web Vitals.
- **Accesibilidad:** contraste WCAG AA, operable por teclado, etiquetas visibles en formularios, áreas de toque cómodas en celular y soporte completo de `prefers-reduced-motion`.
- **Idioma:** español, con tratamiento de usted.

### Reglas de construcción para quien ejecute

1. **Lee toda la documentación del proyecto antes de escribir código**, empezando por este brief y el design system. Trátalos como decisiones cerradas.
2. **Construye por fases** y entrega un resumen al final de cada una:
   - **Fase 1, andamiaje:** estructura de rutas, tema con tokens de marca, archivo de contenido, simulador de flujos y navegación.
   - **Fase 2, descubrimiento y agenda:** landing, autenticación simulada, perfil, educación y calendario.
   - **Fase 3, compra:** orden, firma y pago de la cuota 1.
   - **Fase 4, panel post-compra:** deuda, cuotas, receta visual y mi cuenta.
   - **Fase 5, fidelización:** liquidación, upsell y renovación.
3. **Revisa visualmente lo que construyes, sin esperar a que yo lo señale.** Después de cada pantalla, levanta la app y toma capturas en móvil y en escritorio. Revisa jerarquía, contraste, alineación, textos cortados, estados vacíos, estados de error y que cada animación funcione, también en su versión sin movimiento. Corrige antes de seguir. No entregues una fase con errores visibles que ya conoces.
4. **Verifica contra las historias de usuario** de cada fase antes de darla por cerrada.
5. **Declara lo que no pudiste verificar.** Si algo no se pudo probar, dilo en el resumen; no lo des por bueno.

## 8. Puntos abiertos (no bloquean el prototipo)

- **Plazo de pago:** las reglas de negocio dicen 3 cuotas fijas mensuales; el pitch y la solución mencionan entre 3 y 6 meses. El prototipo usa **3 cuotas**.
- **Cuota inicial:** no está definido si es la cuota 1 de 3 o un monto aparte. El prototipo la trata como la cuota 1 de 3.
- **Precios por dioptrías:** pendientes. El prototipo usa el rango referencial de Bs 900 a Bs 2.000, marcado como referencial.
- **Logo oficial y fotografías reales:** no están en el proyecto. Se usan marcadores claros que se reemplazarán después.
- **Joyas aceptadas y criterio de tasación por gramo:** pendientes. El prototipo usa un valor por gramo simulado y lo etiqueta como demo.
