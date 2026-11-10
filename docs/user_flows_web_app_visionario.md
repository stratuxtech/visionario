# Documento de Arquitectura: User Flows de la Web App (Usuario Final)

**Proyecto:** Web App - Visionario Startup
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
        *   ¿Cómo nos conoció? (Menú desplegable para atribución de marketing).

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
    *   El sistema ERP de la óptica envía la información a la nube.
    *   El usuario recibe una notificación en su app y visualiza en su cuenta el detalle de la orden de compra generada.
*   **Firma de Contrato Digital:**
    *   Despliegue del contrato de financiamiento en la pantalla del dispositivo.
    *   Se habilita un lienzo digital para que el usuario realice la **firma de forma táctil (con el dedo sobre la pantalla del celular)**, aceptando las condiciones de las 3 cuotas mensuales.
*   **Pago de Cuota Inicial:**
    *   Redirección automática a la pasarela de pagos integrada.
    *   Ejecución del pago de la Cuota 1 de 3 (mediante QR o enlace) directamente en la plataforma.

## 4. User Flow: Panel Principal y Mi Cuenta (Dashboard Post-Compra)

El espacio personal del usuario para gestionar su salud visual y sus compromisos financieros.

*   **Seguimiento Financiero (Dashboard):**
    *   Panel visual claro del estado de la deuda.
    *   Indicador de progreso de pagos (ej. "Has pagado 1 de 3 cuotas" / "Te faltan 2 cuotas").
*   **Gestión de Pagos Pendientes:**
    *   Interfaz de pasarela (QR o enlace de pago) que se habilita para liquidar la segunda y tercera cuota en sus respectivas fechas de vencimiento.
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
    *   Junto a la felicitación, se despliega una invitación con un **descuento exclusivo de uso inmediato** para adquirir un producto secundario (ej. gafas de sol).
*   **Renovación Automatizada (Re-compra):**
    *   Al pasar un tiempo predefinido (ej. 6 meses o 1 año), el sistema envía notificaciones automatizadas (Push/Email) sugiriendo que es momento de actualizar la medida visual o adquirir nuevos lentes.
*   **Agendamiento Promocional (Fricción Cero):**
    *   Al hacer clic en la notificación de renovación, el usuario es dirigido directamente al flujo de agendamiento (Paso 2) pero con un **código de descuento pre-aplicado** en su sesión para su nueva compra.