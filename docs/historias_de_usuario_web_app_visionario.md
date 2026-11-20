# Historias de Usuario: Web App OptiHelp

> La marca de la app es OptiHelp. Visionario es la óptica aliada donde se atiende al cliente. Ver `docs/CAMBIOS_FASE_1.md`.

Este documento detalla las historias de usuario basadas en los flujos de la aplicación web de OptiHelp. Están redactadas desde la perspectiva del usuario final (paciente/cliente) para guiar el desarrollo de la plataforma.

## Épica 1: Descubrimiento y Onboarding

**HU 1.1: Entender la propuesta de valor**
*   **Como** visitante (usuario no autenticado),
*   **quiero** ver una sección didáctica de "Cómo funciona" en la página principal,
*   **para** entender de forma clara que es el proceso más económico del mercado enfocado en medidas medianas a severas.
*   *Criterios de aceptación:* La landing page debe mostrar opciones de "Iniciar Sesión" y "Registrarse", y contener un área educativa que resalte explícitamente el enfoque en medidas altas.

**HU 1.2: Registro e Inicio de sesión rápido**
*   **Como** usuario nuevo o recurrente,
*   **quiero** poder registrarme o iniciar sesión usando mi cuenta de Google (SSO) o correo electrónico,
*   **para** acceder rápidamente a la plataforma sin tener que recordar nuevas contraseñas.
*   *Criterios de aceptación:* Deben existir botones funcionales para Google SSO y registro por email/contraseña.

**HU 1.3: Completar perfil de salud visual**
*   **Como** usuario nuevo,
*   **quiero** llenar un formulario sencillo con mis datos (Nombre, teléfono, correo, edad, historial de uso de lentes/medidas, medida estimada y atribución de marketing),
*   **para** crear mi perfil clínico y comercial en el sistema.
*   *Criterios de aceptación:* El formulario debe ser intuitivo, de un solo paso o pasos cortos, e incluir opciones como "No sé" en la medida estimada.

---

## Épica 2: Pre-Compra y Agendamiento

**HU 2.1: Educación sobre el proceso**
*   **Como** paciente registrado,
*   **quiero** ver una pantalla didáctica que explique paso a paso la experiencia en la óptica y el financiamiento,
*   **para** alinear mis expectativas y sentir seguridad antes de comprometerme.
*   *Criterios de aceptación:* Pantalla ilustrativa (carrusel o infografía) previa al acceso al calendario.

**HU 2.2: Agendar cita presencial**
*   **Como** paciente,
*   **quiero** seleccionar una fecha y hora en un calendario digital,
*   **para** reservar mi bloque de atención de exactamente 60 minutos en la óptica sin tener que hacer filas.
*   *Criterios de aceptación:* El sistema debe mostrar los bloques horarios disponibles de 60 minutos y confirmar la reserva exitosamente.

---

## Épica 3: Compra y Formalización (Integración ERP)

**HU 3.1: Recepción de orden de compra**
*   **Como** paciente evaluado en la clínica,
*   **quiero** recibir una notificación y ver el detalle de mi orden de compra en mi cuenta de la app,
*   **para** verificar mis datos, mis lentes y la montura que elegí en la Óptica Visionario antes de pagar.
*   *Criterios de aceptación:* La orden llega desde el **ERP de OptiHelp** (lo construye el CTO; en el prototipo se simula). La app muestra la medida, la montura elegida y su precio, el total y las 3 cuotas con su porcentaje, su monto y su fecha exacta.

**HU 3.2: Firma de contrato digital**
*   **Como** cliente,
*   **quiero** leer y firmar digitalmente el contrato de financiamiento dibujando con mi dedo en la pantalla del celular,
*   **para** formalizar el pago en 3 cuotas de manera 100% digital (cero papel).
*   *Criterios de aceptación:* Antes de firmar, la persona completa su **número de carnet** (con extensión) y su **domicilio**; el celular viene del perfil y se puede corregir. Sin esos datos no se habilita la firma. Se guardan en el perfil. El contrato sigue el modelo de The Blink Eye (partes, fechas exactas, 3 días hábiles para ponerse al día, interés moratorio y jurisdicción). Se debe desplegar un lienzo (canvas) en pantalla que capture el trazo táctil y lo guarde junto al documento.

**HU 3.3: Pago de la primera cuota**
*   **Como** cliente con contrato firmado,
*   **quiero** pagar por QR mi cuota inicial, que es el **40%** del total,
*   **para** que manden a hacer mis lentes.
*   *Criterios de aceptación:* El pago se hace por QR y se le paga a OptiHelp. Al confirmar el pago, el estado de la deuda pasa a "1/3 pagado" y el laboratorio empieza a fabricar los lentes.

**HU 3.4: Montura pagada por una ONG**
*   **Como** cliente enviado por una ONG,
*   **quiero** ver en mi orden que la montura ya está pagada por la ONG,
*   **para** saber cuánto pago yo.
*   *Criterios de aceptación:* La orden muestra la nota "Pagada por {ONG}: −Bs {valor}", el total ya descontado y las cuotas calculadas sobre ese total. El contrato incluye la cláusula de la ayuda de la ONG.

**HU 3.5: Receta y compra al contado (menos de 4 dioptrías)**
*   **Como** paciente con menos de 4 dioptrías,
*   **quiero** ver mi receta y cuánto cuestan mis lentes al contado,
*   **para** decidir si los compro.
*   *Criterios de aceptación:* La orden muestra el aviso de que no aplica el crédito, el costo de la receta, el precio de los lentes al contado y el total. No pide contrato. Se paga una sola vez por QR.

---

## Épica 4: Panel Principal y Mi Cuenta (Dashboard)

**HU 4.1: Visualización del estado de deuda**
*   **Como** cliente activo,
*   **quiero** ver un panel claro que muestre cuántas cuotas he pagado y cuántas me faltan,
*   **para** tener control financiero sobre mi deuda con OptiHelp.
*   *Criterios de aceptación:* El dashboard debe mostrar un indicador visual de progreso (ej. "Has pagado 1 de 3 cuotas").

**HU 4.2: Pago de cuotas pendientes**
*   **Como** cliente activo,
*   **quiero** poder acceder a un código QR o enlace desde mi panel para pagar mi segunda y tercera cuota,
*   **para** liquidar mi financiamiento en las fechas correspondientes.
*   *Criterios de aceptación:* Botones de pago activos para cuotas pendientes. Alertas automatizadas avisando de fechas de vencimiento.

**HU 4.3: Consultar receta visual (Historial Clínico)**
*   **Como** paciente,
*   **quiero** tener un apartado dedicado en mi cuenta donde pueda ver los datos exactos de mi medida asignada,
*   **para** disponer de mi información clínica de forma transparente en cualquier momento.
*   *Criterios de aceptación:* Los datos de dioptrías (ojo izquierdo/derecho, etc.) deben ser visibles y fáciles de leer.

**HU 4.4: Gestión de perfil**
*   **Como** usuario,
*   **quiero** poder cambiar mi foto de perfil, actualizar mis datos y cerrar sesión,
*   **para** mantener mi cuenta segura y actualizada.
*   *Criterios de aceptación:* Opciones básicas de CRUD para datos del usuario e imagen.

---

## Épica 5: Fidelización y Renovación (LTV)

**HU 5.1: Hito de finalización y Upsell**
*   **Como** cliente que paga su tercera y última cuota,
*   **quiero** ver una pantalla de felicitación que incluya un descuento en gafas de sol,
*   **para** sentirme recompensado y aprovechar para comprar un producto secundario.
*   *Criterios de aceptación:* Animación o mensaje de felicitación al registrar el tercer pago: los lentes son suyos (no hay ninguna garantía que devolver). Banner con el descuento en gafas de sol, que **pone OptiHelp**, y la línea "Puede volver a comprar en cuotas cuando lo necesite".

**HU 5.2: Notificaciones de renovación**
*   **Como** cliente antiguo (después de 6 o 12 meses),
*   **quiero** recibir alertas o recordatorios automáticos sugiriendo la actualización de mi medida,
*   **para** mantener mi salud visual óptima y no usar lentes desactualizados.
*   *Criterios de aceptación:* El sistema debe programar alertas por tiempo transcurrido desde la última compra.

**HU 5.3: Agendamiento sin fricción (con promoción)**
*   **Como** cliente notificado para renovación,
*   **quiero** hacer clic en el recordatorio y ser llevado al calendario con un código de descuento ya aplicado,
*   **para** agendar mi nueva cita de forma rápida y más económica.
*   *Criterios de aceptación:* El enlace de la notificación debe redirigir al paso de agendamiento inyectando un cupón de descuento en la sesión del usuario.