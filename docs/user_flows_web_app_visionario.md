# Documento de Arquitectura: User Flows de la Web App (Usuario Final)

> La marca de la app es OptiHelp. Visionario es la óptica aliada donde se atiende al cliente. Ver `docs/CAMBIOS_FASE_1.md`.

**Proyecto:** Web App - OptiHelp (atención en la Óptica Visionario)
**Módulo:** Aplicación pública orientada al paciente/cliente.
**Objetivo:** Definir el recorrido paso a paso del usuario desde su primer contacto con la plataforma hasta la finalización de sus pagos y posterior fidelización (LTV).

---

## 1. User Flow: Descubrimiento y Onboarding

Este flujo abarca la llegada del usuario a la plataforma, su registro y la captura inicial de datos clave.

*   **Aterrizaje (Landing Page - Usuario no autenticado):**
    *   Visualización de la propuesta de valor principal.
    *   Sección didáctica de "Cómo funciona", con énfasis obligatorio en que es **el proceso más económico del mercado**, diseñado especialmente para pacientes con **medidas medianas a severas**.
    *   Botones de acción primarios: "Iniciar Sesión" y "Registrarse".
*   **Autenticación:**
    *   Opciones de registro e ingreso rápido mediante **Google (SSO)**.
    *   Opción de registro clásico con correo electrónico y contraseña.
*   **Formulario de Perfilado (Creación de Cuenta):**
    *   Interfaz sencilla y rápida de recolección de datos:
        *   Nombre completo.
        *   Teléfono (WhatsApp).
        *   Correo electrónico.
        *   Edad.
        *   ¿Ha usado lentes antes? (Selección: Sí / No).
        *   ¿Ha usado medidas antes? (Selección: Sí / No).
        *   Medida estimada (Rango numérico o selección: "No sé").
        *   ¿Cómo nos conoció? (Menú desplegable para atribución de marketing; incluye "Una ONG o fundación" y, en ese caso, el nombre de la ONG, opcional).
    *   El registro **no** pide carnet ni domicilio: se piden recién antes de firmar el contrato.

## 2. User Flow: Pre-Compra y Agendamiento

El usuario ya autenticado se prepara para iniciar su atención presencial.

*   **Educación del Proceso:**
    *   Pantalla didáctica e ilustrativa (tipo carrusel o infografía simple) que explica paso a paso la experiencia con la startup (desde la cita física hasta el modelo de pago en 3 cuotas). Su objetivo es alinear expectativas antes del compromiso.
*   **Agendamiento Digital:**
    *   Acceso a un calendario interactivo.
    *   Selección de fecha y hora para reservar un bloque presencial de atención en la óptica de **exactamente 60 minutos**.

## 3. User Flow: Compra y Formalización (Integración ERP)

El usuario asiste a la óptica, se realiza la evaluación, y la interacción vuelve a la Web App para concretar la compra.

*   **Recepción de Orden:**
    *   Tras la cita en la Óptica Visionario, OptiHelp carga la orden en **su propio ERP** (lo construye el CTO; aquí se simula) con la medida, la montura elegida y el precio.
    *   El usuario recibe una notificación en su app y visualiza en su cuenta el detalle de la orden de compra generada.
    *   Si la ONG 1 paga la montura, la orden lo muestra y el total ya viene descontado.
    *   Si la medida es menor a 4 dioptrías, la orden es **al contado** (receta + lentes): no hay contrato y se paga una sola vez por QR.
*   **Firma de Contrato Digital:**
    *   Antes del texto, la persona completa su número de carnet y su domicilio.
    *   Despliegue del contrato de compra en cuotas en la pantalla del dispositivo (modelo The Blink Eye: partes, fechas exactas, 3 días hábiles para ponerse al día, interés moratorio y jurisdicción).
    *   Se habilita un lienzo digital para que el usuario realice la **firma de forma táctil (con el dedo sobre la pantalla del celular)**, aceptando las condiciones de las 3 cuotas mensuales.
*   **Pago de Cuota Inicial:**
    *   Redirección automática a la pasarela de pagos integrada.
    *   Pago de la cuota inicial (**40%** del total) por QR, a OptiHelp. Con ese pago se mandan a hacer los lentes.

## 4. User Flow: Panel Principal y Mi Cuenta (Dashboard Post-Compra)

El espacio personal del usuario para gestionar su salud visual y sus compromisos financieros.

*   **Seguimiento Financiero (Dashboard):**
    *   Panel visual claro del estado de la deuda.
    *   Indicador de progreso de pagos (ej. "Has pagado 1 de 3 cuotas" / "Te faltan 2 cuotas").
*   **Gestión de Pagos Pendientes:**
    *   Interfaz de pago por QR que se habilita para la segunda (30%, al mes) y la tercera cuota (30%, a los dos meses), el mismo día de la firma de cada mes.
    *   Si se atrasa, tiene 3 días hábiles para ponerse al día; después corre el interés por atraso (pendiente de revisión legal).
    *   Recepción de **notificaciones de cobranza automatizadas** recordando el vencimiento próximo de las cuotas.
*   **Historial Clínico (Receta Visual):**
    *   Apartado dedicado a la salud visual donde el usuario puede consultar, en cualquier momento, los datos clínicos exactos de la medida asignada por el optometrista.
*   **Mi Cuenta / Configuración:**
    *   Edición de datos del perfil.
    *   Cambio de foto de perfil.
    *   Cierre de sesión.

## 5. User Flow: Fidelización y Renovación (LTV)

Acciones automáticas para extender el ciclo de vida del cliente tras finalizar su compra inicial.

*   **Hito de Liquidación:**
    *   Pantalla especial de felicitación que se activa en el instante en que el usuario confirma el pago de la tercera y última cuota.
*   **Upsell Inmediato:**
    *   Los lentes son del cliente (no hay garantía que devolver).
    *   Junto a la felicitación, se despliega un **descuento en gafas de sol**, que pone OptiHelp, y la invitación a volver a comprar en cuotas.
*   **Renovación Automatizada (Re-compra):**
    *   Al pasar un tiempo predefinido (ej. 6 meses o 1 año), el sistema envía notificaciones automatizadas (Push/Email) sugiriendo que es momento de actualizar la medida visual o adquirir nuevos lentes.
*   **Agendamiento Promocional (Fricción Cero):**
    *   Al hacer clic en la notificación de renovación, el usuario es dirigido directamente al flujo de agendamiento (Paso 2) pero con un **código de descuento pre-aplicado** en su sesión para su nueva compra.