# 02 · Referencias: Web App Visionario

> De cada web de referencia tomamos **mecánicas concretas de movimiento, layout o interacción** y descartamos explícitamente lo que no encaja con la identidad de **Visionario**. Todo se aplica bajo las reglas de `visionario_bible_brand_system.md` (paleta cian y slate, Ubuntu, Manrope y Cormorant Garamond, HugeIcons, radios suaves) y de `brief.md` (accesible, solemne, confiable; la animación explica o reconforta, nunca decora).

---

## Cómo se deben mirar estas referencias (instrucción para la IA y Desarrollo)

- Descarga e inspecciona el **HTML, CSS y JS real** de cada URL antes de construir. Varias usan motores de animación modernos (GSAP, ScrollTrigger, Lenis, Framer Motion, Three.js) y sus curvas de *easing* o estructuras DOM se pueden leer directamente. No trabajes de memoria.
- Extrae **valores concretos** (velocidades de scroll, escalas de transformación, comportamientos *sticky*, duraciones y curvas) y muéstramelos antes de codear para confirmar que estamos alineados.
- De cada referencia toma **únicamente** lo que se indica abajo. Ignora el resto de su estética, en especial los temas oscuros. Siempre se aplica la paleta, la tipografía, el logo y el tono de Visionario definidos en el Bible Brand System. Aquí no se redefine ninguno.
- Esto es una **web app** (registro, agenda, firma, pago de cuotas, receta), no una web informativa. Las mecánicas más expresivas (scroll narrativo, 3D, cursor magnético) viven en la **landing** y en las pantallas educativas. Dentro del flujo de compra y del panel, el movimiento se reduce a lo funcional.
- El público usa sobre todo celular y no siempre es nativo digital. Toda mecánica pensada para mouse (cursor magnético, inclinación 3D con puntero) necesita un equivalente táctil sencillo o se desactiva en pantallas táctiles.

---

## Referencia 1: https://flexion.ai

- **Qué tomar (Scroll, Parallax y Carrusel Inteligente):**
  - **Transición de deslizamiento:** el *smooth scroll* suave y fluido al navegar verticalmente (landing).
  - **Efecto *Parallax*:** el desplazamiento diferencial sutil de las imágenes dentro de sus contenedores al hacer scroll. Ideal para las fotografías de personas de la comunidad.
  - **Sencillez luminosa:** su limpieza visual y el amplio "aire" entre elementos.
  - **Carrusel reactivo:** el carrusel de imágenes que avanza solo y **acelera cuando el usuario no hace scroll**, retomando un ritmo normal al interactuar. En Visionario se aplica al carrusel de **testimonios y fotos de pacientes** ("Personas que ya recuperaron su visión") en la landing.
  - **Iluminación de textos (página `/news`):** el efecto de iluminaciones de color que se mueven suavemente sobre ciertas palabras clave. En Visionario se aplica solo a **una palabra clave por titular** (por ejemplo "visión" o "cuotas"), en **Cormorant Garamond itálica**, con un brillo lento en tonos del **Primary cian**. Nunca en botones ni en texto de formularios.
- **Qué NO tomar:**
  - El fondo blanco excesivamente plano o la frialdad corporativa. Visionario usa fondos cálidos y limpios con las escalas claras (50 y 100) de Primary y Secondary.

## Referencia 2: https://palo-seco.com

- **Qué tomar (Degradados con vida propia):**
  - **Movimiento autónomo:** la animación del banner estratégico, donde los degradados de fondo respiran, se desplazan y se funden solos sin depender del ratón.
  - **Fusión cromática:** cómo los colores se solapan y aumentan su intensidad. En Visionario esto alimenta un fondo **muy sutil y lento** en el Hero de la landing y en la pantalla de felicitación al liquidar, usando solo las escalas 50 a 300 de Primary (cian) y Secondary (slate).
- **Qué NO tomar:**
  - Su estética Dark Mode predominante y el estilo de agencia "bruto".
  - Cualquier degradado saturado o ruidoso. Se respeta la regla del brief: nada de gradientes ruidosos ni fondos de partículas. El texto siempre mantiene contraste WCAG AA sobre el fondo.

## Referencia 3: https://www.unifygtm.com

- **Qué tomar (Layout y Escala):**
  - **Proporciones y jerarquía:** letras grandes (escala *Display*), imágenes de gran tamaño y el excelente respiro entre bloques de texto e ilustraciones. Un título dominante por pantalla.
  - **Ilustraciones animadas:** la forma en que animan sistemas para explicar un flujo de forma didáctica. En Visionario se usa para **"Cómo funciona"**: cita de 60 minutos, medición clínica gratuita, elección de montura, joya en garantía, firma, entrega y las 3 cuotas.
- **Qué NO tomar:**
  - Su seriedad B2B y su aire técnico. Visionario debe ser solemne y respetuoso, pero nunca intimidante: tiene que sentirse como el lugar donde cualquier persona entiende cada paso.

## Referencia 4: https://make-b.studio

- **Qué tomar (Estructura, Carga Progresiva y Cursor CTA):**
  - **Layout comprensible:** la claridad absoluta en la separación de bloques.
  - **Rotación de *labels*:** el cambio dinámico de textos al inicio del Hero, fluido y sin saltos de altura. En Visionario rota el complemento del titular (por ejemplo, para quién es: "sastres", "mecánicos", "comerciantes", "choferes") sin mover el resto de la página.
  - ***Text Reveal* por scroll:** el texto se va "cargando" (de tono suave a tono pleno) a medida que el usuario baja. Se usa en párrafos cortos de la landing, nunca en contratos, cuotas ni formularios.
  - **Aparición *Scale-up*:** imágenes que emergen creciendo de tamaño chico a grande.
  - **Cursor CTA magnético (solo escritorio con mouse):** al pasar por zonas clave, el puntero se transforma en una píldora CTA ("Agendar cita") que persigue al cursor. En celular no existe: el CTA es un botón fijo y grande.
  - **El Footer:** la estructura con cambio de labels, el CTA grande al final y la **animación de líquido** en el remate inferior. En Visionario el CTA dice **"Agendar cita gratuita ↗"** (no existe una página de "Adquirir") y el líquido usa tonos cian y slate. El logo oficial va como sello de confianza.
- **Qué NO tomar:**
  - Su Dark Mode general.

## Referencia 5: https://www.noth.in

- **Qué tomar (Efectos de Escala Inversa):**
  - **Aparición *Scale-down*:** las imágenes aparecen muy grandes y, al hacer scroll, se achican progresivamente hasta encajar en su tamaño final. En Visionario se usa en la sección de **impacto social** de la landing, con fotografías de personas reales de la comunidad.
  - **Revelado fluido de imágenes:** su forma suave de mostrar assets al entrar en pantalla, también en el pie de página.
- **Qué NO tomar:**
  - El Dark Mode y su diagramación fragmentada, dispersa o "rota". Visionario exige orden y alivio cognitivo inmediato.

## Referencia 6: https://anubi.io

- **Qué tomar (Mundo 3D, Levitación y Carruseles Dinámicos):**
  - **Interfaces en celulares 3D:** las capturas de la app (agendar, firmar, pagar cuotas, receta) viven dentro de carcasas de celular renderizadas en 3D que reaccionan sutilmente al movimiento del ratón. En táctil se inclinan con un gesto simple o quedan estáticas.
  - **Lentes y monturas en 3D:** las monturas del catálogo (10 de adulto y 10 de niño) se muestran como **modelos 3D** que giran lentamente y que la persona puede rotar con el dedo o el mouse. También un par de lentes en 3D acompaña el Hero. Es lo que más conecta con el producto. Mientras no existan los modelos reales, se usan marcadores claros que se reemplazan después. El probador en Realidad Aumentada es Fase 2 y no entra en este prototipo.
  - **Levitación orgánica:** elementos que flotan suavemente y se desplazan con el cursor, revelando información extra. En Visionario se usa en el diagrama de "Cómo funciona" (nodos: Cita, Óptica, Laboratorio, Cuotas) y en los lentes del Hero.
  - **Carrusel con torsión:** el carrusel lateral donde la imagen central crece (`1.25x`) y las laterales se tuercen con perspectiva 3D. En Visionario se usa en el **catálogo de monturas** y en la **educación del proceso** (carrusel previo al calendario). Siempre con flechas, puntos y deslizamiento táctil visibles.
- **Qué NO tomar:**
  - El exceso de decoraciones flotantes. La **zona segura** de titulares, formularios y botones de conversión debe estar 0% obstruida.
  - Estética cibernética, neón o máquinas de tallado: el brief pide una cara humana y cálida.

---

## Síntesis

Una web app luminosa, cálida y respetuosa. Combina el *scroll* y el *parallax* limpios de `flexion.ai` con degradados suaves y vivos de `palo-seco.com`. Se estructura con **layouts grandes y diagramas claros** (`unifygtm.com`, `make-b.studio`). Las pantallas de la app viven en **celulares 3D** y las monturas se pueden **girar en 3D** (`anubi.io`). Todo se hila con **textos que se cargan al hacer scroll, fotos que escalan dinámicamente y un cierre líquido memorable** (`make-b.studio`, `noth.in`), siempre con la paleta, la tipografía y el tono de Visionario.

**Regla de oro:** cero Dark Mode, cero fondos de partículas, cero desorden, cero urgencia agresiva y respeto total por la legibilidad. La animación explica o reconforta, nunca decora.

---

## Reglas generales de movimiento y look and feel

### A. Reglas transversales (toda la web app)

- **Propósito:** cada animación debe explicar, guiar o reconfortar. Si solo decora, se elimina.
- **Duración y ritmo:** cortas y suaves. Ninguna animación bloquea ni retrasa una acción del usuario.
- **Rendimiento:** solo `transform` y `opacity`, para no afectar los Core Web Vitals. Los modelos 3D se cargan de forma diferida y con un estado de carga (el isotipo del ojo puede servir de spinner).
- **Accesibilidad:** toda animación tiene una versión sin movimiento con `prefers-reduced-motion`. Con esa preferencia se desactivan el *smooth scroll*, el parallax, el 3D reactivo al puntero, el cursor magnético, los degradados animados y el líquido, y quedan versiones estáticas equivalentes.
- **Móvil primero:** todo debe verse bien y funcionar en celular. Lo que dependa del mouse tiene alternativa táctil o se omite.
- **Textos:** revelado progresivo al hacer scroll solo en contenido narrativo corto. El texto crítico (precios, cuotas, contratos, formularios) aparece siempre completo y legible.
- **Palabras iluminadas:** una por titular, en Cormorant Garamond itálica, con brillo cian lento.
- **Mockups 3D:** toda captura de la interfaz se muestra en un celular 3D, solo en landing y pantallas educativas.
- **Zona segura:** ningún elemento flotante invade el centro de lectura ni los botones.

### B. Dónde se aplica cada mecánica

| Zona de la app | Mecánicas |
| :--- | :--- |
| **Landing: Hero** | Texto rotativo sin saltos de altura, lentes 3D que flotan y reaccionan al cursor, celular 3D con una pantalla de la app, degradado suave y autónomo de fondo. |
| **Landing: Cómo funciona** | Ilustración animada del flujo, nodos que levitan y se activan paso a paso con el scroll (*sticky* sin secuestrar la velocidad del scroll). En móvil se apila en vertical. |
| **Landing: Testimonios** | Carrusel continuo que acelera cuando no hay scroll y se ralentiza al interactuar. Se detiene al tocarlo. |
| **Landing: Impacto social** | Fotos reales con *scale-down* al hacer scroll y parallax interno. Destacados en Cormorant Garamond. |
| **Landing: Cierre y pie** | Layout grande, CTA "Agendar cita gratuita ↗" (cursor magnético en escritorio) y remate líquido. |
| **Educación del proceso** | Carrusel con torsión 3D (central a `1.25x`) y controles visibles antes del calendario. |
| **Catálogo de monturas** | Carrusel con torsión y modelo 3D rotable por montura. Micro-respuesta al seleccionar. |
| **Estimador de garantía y agenda** | Solo microinteracciones funcionales. Sin efectos decorativos. |
| **Firma y pago** | La firma se dibuja en tiempo real y el estado del pago cambia con una transición clara. Cero efectos de escena. |
| **Panel de deuda** | La barra de progreso de cuotas se llena al confirmar un pago. Las notificaciones entran suavemente. |
| **Liquidación** | Pantalla de felicitación con entrada suave, degradado cálido y mensaje en Cormorant Garamond. El descuento aparece con *scale-up* discreto. |
