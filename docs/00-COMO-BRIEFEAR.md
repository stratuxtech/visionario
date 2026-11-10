# 00 · Cómo briefear (la lección)

Antes de rellenar nada, entiende **qué hace bueno a un brief**. Esto es lo que separa "lo construyó a la
primera" de "llevo diez intentos y sigue siendo feo".

---

## 1. Un brief son DECISIONES, no diseño terminado

Hay tres niveles de detalle. El brief vive en el del medio:

| Nivel | Ejemplo | ¿Va en el brief? |
|---|---|---|
| Demasiado vago | "Quiero una web moderna y limpia." | ❌ No dice nada. La IA rellenará con clichés. |
| **Decisión / criterio** | **"Monocromo total, sin ningún color de acento; el único color con vida es el verde de 'disponible'."** | ✅ **Sí. Este es el nivel.** |
| Diseño ya hecho | "El título a `font-size: clamp(2.5rem, 6.3vw, 6rem)`, `letter-spacing: -0.03em`." | ❌ No. Eso lo decide la construcción; si lo fijas todo, ya no estás briefeando, estás maquetando en Word. |

**Regla:** por cada elemento importante, da la **decisión** y el **porqué**, y deja los valores exactos para
la fase de construcción. "Tipografía de carácter, con personalidad, tipo grotesca" es un buen brief.
Elegir la fuente exacta y sus pesos es parte de construir.

> Cuánto detalle es "suficiente": el necesario para que **dos personas distintas** que leen tu brief
> tomen la **misma** decisión. Si tu frase deja margen a dos diseños opuestos, concreta más. Si ya solo
> deja uno, para.

---

## 2. Tus manías son oro — decláralas como preferencias

Lo que normalmente descubres iterando ("uf, eso quedó feo, quítalo") **puedes decirlo desde el principio**.
Cada cosa que sabes que NO te gusta, escríbela como preferencia. Ahorra rondas enteras.

En vez de esperar a ver el resultado y corregir, di de entrada cosas como:
- "Las tipografías finas (semibold, light) me parecen endebles: usa solo regular o bold."
- "Nada de fondos de partículas ni gradientes ruidosos, me parecen cutres."
- "Sin emojis en la interfaz; los iconos siempre en SVG."
- "Los textos, con resultado ('reduje el drop-off un 30%'), no con adjetivos ('experiencias memorables')."

Esto no es ser tiquismiquis: es **mover tu criterio al principio** en lugar de al final. Un brief con
20 preferencias claras converge muchísimo más rápido que uno "abierto".

---

## 3. Cómo mirar una referencia (la habilidad más transferible)

Casi todo el mundo mira una web de referencia "a ojo" y le dice a la IA "hazlo como esta". Sale mal porque
ni tú ni la IA estáis mirando lo mismo. El método bueno:

1. **Míralo de verdad, no de memoria.** Abre la web. Si trabajas con una IA con acceso a herramientas,
   pídele que **baje el HTML/CSS real** de la página (se puede con casi cualquier sitio) en lugar de
   fiarse de lo que "recuerda". Nunca aceptes un "no puedo ver esa web" sin que lo haya intentado.
2. **Extrae valores concretos, no impresiones.** No "mola la tipografía": *qué* familia, *qué* tamaños,
   *qué* color de fondo (¿blanco puro o hueso?), cómo está montada la interacción que te gusta.
3. **Toma UNA cosa de cada referencia, no la referencia entera.** "De esta, el menú. De esta, cómo mete
   el estado de disponibilidad dentro de la frase. De esta, el footer gigante." Mezclar bien 3 webs por
   una cosa cada una da algo tuyo; copiar una entera da un clon peor que el original.
4. **Di también qué NO tomar.** "Me gusta su tipografía pero su saturación de efectos no; yo lo quiero
   sobrio." Acota tanto como al revés.

---

## 4. Una sola fuente de verdad para el contenido

Todo el texto, los datos y las rutas de imágenes van en **un único sitio** (un archivo de contenido /
config). Así, cambiar el estado de "disponible" o un texto se hace en un lugar y se refleja en toda la web.
No repartas el mismo dato por diez componentes.

---

## 5. Construye por fases y valida en los cortes

No pidas "constrúyelo entero" y reces. Pide un **orden de construcción** y valida en cada hito:
primero el andamiaje (estructura + estilos base + tema), luego las piezas clave de conversión, luego
sección a sección. Ver un andamiaje y creer que es el diseño final es un malentendido clásico: deja claro
en cada paso qué estás validando.

---

## 6. Prompt de arranque (cópialo cuando tengas el brief)

> "Lee **todos** los archivos de `docs/` antes de escribir nada, empezando por las referencias. Trátalos
> como decisiones cerradas: no inventes fuera de ese criterio, y si algo es ambiguo, pregúntame antes de
> asumir. Para mirar las referencias, **baja su código real**, no te fíes de memoria, y enséñame los
> valores que extraigas antes de construir. Luego propón un **orden de construcción** por fases y ejecuta
> solo la **fase 1** (andamiaje: estructura + estilos base + tema + archivo de contenido). Para y
> enséñamelo. No avances hasta que valide."

---

## Checklist antes de dar por bueno tu brief

- [ ] ¿Cada decisión de estilo deja **una** interpretación, no dos?
- [ ] ¿Has declarado tus **manías** (lo que NO quieres) como preferencias explícitas?
- [ ] ¿De cada referencia dices **qué tomar** y **qué no**?
- [ ] ¿El contenido real (textos, proyectos, datos) está en `04`, no inventado?
- [ ] ¿Hay un objetivo claro del sitio y sabes qué acción quieres que haga el visitante?
- [ ] ¿Evitaste fijar valores de CSS exactos (eso es construir, no briefear)?
