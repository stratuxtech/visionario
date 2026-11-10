# VISIONARIO: BIBLE BRAND SYSTEM

**Versión:** 1.0 | **Enfoque:** Web App, UI/UX (Shadcn UI) & Impacto Social

## 1. FILOSOFÍA Y ADN DE LA MARCA

Visionario no es una clínica fría ni una financiera tradicional; es un motor de cambio social enfocado en la salud visual de poblaciones vulnerables. Todo el entorno digital está diseñado para eliminar la fricción, reducir la ansiedad y dignificar al paciente.

Nuestros tres adjetivos rectores son:

1. **Accesible:** Diseño inclusivo, navegación intuitiva y eliminación de barreras cognitivas para usuarios que quizás no son nativos digitales.
2. **Solemne (Respetuoso):** Tratamos a nuestra población (trabajadores informales, vecinos de zonas periféricas) con la máxima dignidad. No hay condescendencia ni infantilización; hay profesionalismo y respeto absoluto por su esfuerzo.
3. **Confiable:** Transparencia visual total. Interfaces predecibles, consistencia en los componentes y un entorno que transmite seguridad en el manejo de su salud y sus finanzas.

## 2. EL LOGOTIPO EN EL ECOSISTEMA DIGITAL

El logotipo de Visionario (tipografía robusta, ceja superior curva, isotipo del ojo integrado en la "O") es el ancla de confianza de la startup.

**Resolución visual en la interfaz:**
*   **Integración armónica:** Sus formas circulares y curvas se replican sutilmente en los bordes de los componentes de la interfaz.
*   **Uso funcional:** Se emplea en el navbar y footer como sello de garantía institucional. En pantallas de carga o estados vacíos, el isotipo del ojo puede funcionar como un spinner o marca de agua sutil.

## 3. SISTEMA DE COLOR (Design System Semantics)

La interfaz utiliza la estructura de tokens de Shadcn UI, adaptada a las paletas oficiales de la marca. Es una interfaz limpia, donde el color se usa estratégicamente para guiar la acción del usuario y no para saturar.

### 3.1. Primary (Azul Cyan)
Basado en el iris del isotipo. Es el color de la acción, la conversión y el progreso.

| Escala | Hexadecimal | Uso sugerido en UI |
| :--- | :--- | :--- |
| 50 | `#F0F8FC` | Fondos de contenedores, estados hover sutiles |
| 100 | `#DBEFF8` | Fondos secundarios, elementos inactivos claros |
| 200 | `#BDE0F2` | Bordes activos, selecciones |
| 300 | `#8FCAE8` | Iconografía secundaria, estados focus |
| 400 | `#5BB1DD` | Botones secundarios, gráficos (Chart Color) |
| **500** | **`#3DA9DF`** | **Color Base (Brand). Botones primarios, CTAs** |
| 600 | `#288BC2` | Estados hover de botones primarios |
| 700 | `#206E9C` | Estados active/pressed de botones |
| 800 | `#1B5D83` | Elementos de navegación, banners oscuros |
| 900 | `#174E6F` | Texto primario sobre fondos claros |
| 950 | `#0F344A` | Texto de alto contraste, fondos de footer |

### 3.2. Secondary / Slate (Azul Marino Oscuro)
Basado en la curva superior y el texto secundario del logo. Actúa como el ancla neutral de la aplicación, dando estructura, solemnidad y legibilidad.

| Escala | Hexadecimal | Uso sugerido en UI |
| :--- | :--- | :--- |
| 50 | `#F3F6F8` | Fondos de aplicación, base UI |
| 100 | `#E2EAEF` | Fondos de tarjetas, paneles laterales |
| 200 | `#C7D7E2` | Bordes estructurales, divisores |
| 300 | `#A1BECD` | Texto deshabilitado, placeholders |
| 400 | `#759EB2` | Texto secundario (subtítulos, descripciones) |
| **500** | **`#568199`** | **Iconos inactivos, componentes de estado medio** |
| 600 | `#42657C` | Elementos de formulario, bordes en focus |
| 700 | `#355265` | Texto principal (alternativa suave) |
| 800 | `#223C4F` | Texto principal oscuro |
| 900 | `#1F3342` | Títulos secundarios, encabezados oscuros |
| 950 | `#13212C` | Texto de máximo contraste, fondos Dark Mode |

## 4. TIPOGRAFÍA Y JERARQUÍAS (Sistema Rem/Px base 16px)

La tipografía sobreescribe los valores por defecto del framework para inyectar el ADN de Visionario: amabilidad geométrica y máxima legibilidad técnica.

1. **Tipografía Primaria (Títulos y Encabezados): Ubuntu.** Proporciona una estructura geométrica con terminaciones redondeadas que dialogan con el logo y el border-radius de la UI.
2. **Tipografía Secundaria (Párrafos y UI): Manrope.** Tipografía sans-serif de alta legibilidad técnica. Ideal para lectura continua de contratos, cuotas o procesos clínicos.
3. **Tipografía Terciaria (Destacados): Cormorant Garamond.** Tipografía serif clásica. Genera un contraste estilístico para citas testimoniales, mensajes de impacto social o énfasis puntuales.

**Escala Jerárquica:**
*   **H1 (Hero):** `3rem (48px)` - Ubuntu, Bold. Uso: Pantallas de bienvenida en la App, títulos principales ("Recupera tu visión hoy").
*   **H2 (Secciones):** `2rem (32px)` - Ubuntu, Medium. Uso: Títulos de módulos ("Tus próximas cuotas", "Catálogo de monturas").
*   **H3 (Subtítulos UI):** `1.25rem (20px)` - Manrope, SemiBold. Uso: Títulos de tarjetas o bloques ("Ingresa tu medida", "Tasación estimada").
*   **Body Base (P1):** `1rem (16px)` - Manrope, Regular. Uso: Textos descriptivos, explicaciones de procesos, contratos digitales. Line-height: 1.5.
*   **Caption / Metadatos (UI):** `0.875rem (14px)` - Manrope, Medium. Uso: Fechas, montos de cuotas, etiquetas secundarias.
*   **Destacado Premium:** `1.5rem (24px)` - Cormorant Garamond, Italic/Regular. Uso: Citas de impacto social o mensajes de agradecimiento ("Gracias por confiar en nosotros").

## 5. FOTOGRAFÍA Y DIRECCIÓN DE ARTE

La fotografía de Visionario es el puente de empatía con el usuario. Es profundamente humana y está alejada de los tecnicismos de laboratorio o el maximalismo estético.

*   **El Heroísmo de lo Cotidiano:** Retratos de personas reales de las clases sociales a las que ayudamos (comerciantes, sastres, mecánicos) en su entorno natural.
*   **Empatía y Respeto:** Gente sonriendo, miradas amables, transmitiendo alivio y dignidad al haber recuperado su visión. Las tomas deben sentirse cálidas, documentales y honestas.
*   **Cero Frialdad Tecnológica:** No se muestran máquinas de tallado robótico, luces de neón ni estéticas cibernéticas. La tecnología es nuestro motor interno, pero la cara hacia el usuario es 100% humana y solemne.
*   **Luz Natural:** Iluminación diurna, colores reales y corrección de color que evoque esperanza y transparencia.

## 6. DISEÑO DE INTERFAZ Y ORNAMENTACIÓN (Configuración Shadcn)

La construcción de la UI se basa en una configuración específica de Shadcn para garantizar accesibilidad y confianza, sobreescribiendo fuentes y colores según nuestra marca:

*   **Estructura y Bordes (Radius: Default):** Los componentes (botones, tarjetas, modales) utilizan el radio de borde por defecto (0.5rem aprox.). Esta ligera curvatura suaviza la interfaz, haciéndola amigable y congruente con la fuente Ubuntu, alejándose de la severidad de los bordes rectos.
*   **Estilo de Componentes (Menu: Default / Solid):** Elementos sólidos y bien definidos. Los botones primarios tienen un relleno completo en Azul Cyan 500 para que el usuario sepa exactamente dónde hacer clic sin ambigüedades.
*   **Iconografía (HugeIcons):** Uso de la librería HugeIcons. Sus trazos son limpios, legibles y amigables, facilitando la comprensión de procesos financieros (cuotas, prendas) y clínicos (medición, agendamiento) para personas de cualquier nivel educativo.
*   **Estilos de Acento (Menu Accent: Subtle):** Los estados hover y selecciones son sutiles (usando las escalas 50 y 100 de las paletas), evitando distracciones o ruidos visuales que puedan confundir al paciente.
*   **Gráficos (Chart Color):** Visualización de datos (ej. progreso de pago de cuotas) utilizando acentos limpios en Cyan.

## 7. TONO, VOZ Y MODELO MENTAL DE REDACCIÓN (UX Writing)

El usuario que interactúa con Visionario a menudo siente ansiedad financiera (no sabe si le alcanzará el dinero) y preocupación de salud (tiene miedo de su diagnóstico visual).

*   **Voz:** Educativa y respetuosa (solemne). Hablamos como un profesional de la salud aliado, que entiende el esfuerzo que hace el paciente por pagar sus lentes.
*   **Tono:** Empático, claro y pedagógico.
*   **Reglas de Copywriting (UX Writing):**
    *   **Explicar lo complejo de forma sencilla:** Traducir términos clínicos o financieros a lenguaje cotidiano. En lugar de "Tasa de originación del crédito prendario", usar "Valor estimado de tu joya para cubrir tus lentes".
    *   **Solemnidad y Respeto:** Tratar al usuario con dignidad ("Señor/Señora", "Usted"). Evitar el exceso de entusiasmo, emojis desmedidos o lenguaje informal que reste seriedad al compromiso de salud.
    *   **Educación paso a paso:** Guiar al usuario de la mano en cada pantalla ("Paso 1: Elige tu montura", "Paso 2: Conoce tu plan de pagos").
    *   **Claridad Absoluta:** Microcopy enfocado en dar certezas. Botones de acción precisos ("Agendar cita gratuita", "Ver mis cuotas pendientes").