# Cambios para adaptar el prototipo a la Fase 1 (piloto OptiHelp + Óptica Visionario)

**Para:** la IA que trabaja en este repositorio.
**Qué es:** la lista de todo lo que hay que cambiar para que la app deje de contar el modelo viejo (joya de oro en garantía + óptica propia estilo Subway con catálogo de monturas) y cuente el modelo de la **Fase 1**.
**Versión:** 2 (19-nov-2026). Incluye las decisiones confirmadas por el dueño del proyecto y las cláusulas del contrato de referencia de The Blink Eye.
**Cómo usarlo:** lee primero las secciones 1 a 3. Luego aplica los cambios en el orden de la sección 4. Al final, revisa la lista de la sección 7.

> Convención del repo que se mantiene: todo dato que el negocio todavía no confirmó va con `pendiente: true` y todo dato simulado con `esDemo: true`. Los datos de este documento marcados **[PENDIENTE]** deben ir marcados así.

---

## 1. El modelo de la Fase 1, en simple

**Quién es quién**
- **OptiHelp** es la startup y la marca de la app. Vende, da el crédito y cobra las cuotas.
- **Óptica Visionario** es la óptica aliada de Susan Salinas, en el centro de Santa Cruz. Ahí se hace la cita: mide la vista, el cliente elige su montura, la óptica manda a fabricar los lentes y los entrega.
- El nombre "Visionario" ya **no** es la marca de la app. Solo es el nombre de la óptica donde se atiende al cliente.
- **El ERP de OptiHelp** lo construye el CTO por separado. Ahí se cargan las órdenes después de cada cita. En este prototipo sigue simulado con el simulador.

**Qué cambia respecto al prototipo actual**
1. **No hay joya de oro ni ninguna garantía.** El cliente compra en cuotas solo con su carnet de identidad y el contrato firmado en la app.
2. **OptiHelp no tiene monturas ni inventario.** Las monturas son de la Óptica Visionario y la óptica decide cuáles ofrece y a qué precio. OptiHelp no se mete en eso. La app no tiene catálogo.
3. **El crédito es solo para medidas de 4 dioptrías o más.** Si la medida es menor:
   - se le cobra la receta;
   - puede comprar sus lentes al contado;
   - no puede acceder al crédito.
4. **Las cuotas no son iguales.** Son 3 cuotas:
   - 40% al mandar a hacer los lentes (el mismo día de la firma);
   - 30% al mes;
   - 30% a los dos meses.
5. **Todas las cuotas se pagan por QR, y se le pagan a OptiHelp**, no a la óptica. No hay descuento por planilla en la app.
6. **ONG 1:** paga la montura de los clientes que ella envía. El cliente paga menos.
7. **Al terminar de pagar:** el cliente recibe un descuento en gafas de sol. El descuento lo pone OptiHelp.
8. **El contrato sigue el modelo de The Blink Eye** (sección 5): datos completos de las partes, fechas exactas, 3 días hábiles para ponerse al día, interés moratorio y jurisdicción.
9. **En la Fase 1 no hay financiera** (ni IDEPRO ni PrestaYa). No debe aparecer en ningún texto.

**Así queda el recorrido del cliente con crédito (4 dioptrías o más)**
1. Crea su cuenta y agenda su cita desde el celular.
2. Va a la Óptica Visionario con su carnet: le miden la vista y elige su montura.
3. Recibe su orden en la app, completa su carnet y su domicilio, firma el contrato con el dedo y paga por QR la cuota inicial (40%).
4. La óptica manda a fabricar sus lentes. Le avisamos por WhatsApp cuando están listos.
5. Recoge sus lentes en la óptica.
6. Paga la cuota 2 al mes y la cuota 3 a los dos meses, por QR.
7. Al terminar, sus lentes son suyos, recibe su descuento en gafas de sol y puede volver a comprar en cuotas.

**Recorrido sin crédito (menos de 4 dioptrías)**
1. Crea su cuenta y agenda su cita.
2. En la óptica le miden la vista y su medida es menor a 4 dioptrías.
3. Recibe en la app su receta y una orden al contado: el costo de la receta y, si quiere los lentes, su precio al contado.
4. Paga todo junto por QR.
5. Recoge sus lentes.

---

## 2. Reglas nuevas (reemplazan a las viejas)

| Tema | Antes (prototipo actual) | Ahora (Fase 1) |
|---|---|---|
| Marca de la app | Visionario | **OptiHelp**, con atención en Óptica Visionario |
| Garantía | Joya de oro de 18 quilates en bóveda | **Ninguna.** Solo carnet de identidad y contrato |
| Quién accede al crédito | Desde 4 dioptrías | **Igual: desde 4 dioptrías.** Con menos, receta cobrada y lentes al contado |
| Monturas | Catálogo cerrado de 20 modelos | **Las de la Óptica Visionario**, con sus precios. La app no tiene catálogo |
| Orden de compra | La envía el ERP de la óptica | La carga OptiHelp en **su propio ERP** (lo construye el CTO; aquí se simula) |
| Cuotas | 3 cuotas iguales | 3 cuotas de **40% / 30% / 30%**: el día de la firma, al mes y a los dos meses |
| Cuándo se paga la cuota inicial | Al firmar | **Al firmar, que es cuando se mandan a hacer los lentes** |
| Medio de pago | Efectivo o QR | **Solo QR**, a OptiHelp |
| Si se atrasa | 1 mes de gracia sin intereses | **3 días hábiles para ponerse al día.** Después, interés moratorio de **3% mensual** sobre lo vencido **[PENDIENTE: revisión legal]** |
| Si no paga | Visionario se queda con la joya | OptiHelp puede iniciar acciones legales y reportar la deuda **[PENDIENTE: revisión legal]** |
| Al terminar de pagar | Se le devuelve la joya | Sus lentes son suyos + **descuento en gafas de sol, a cargo de OptiHelp** |
| Ayuda de ONG | No existía | **ONG 1 paga la montura** de los clientes que ella envía |
| Medición | Gratis | Gratis si accede al crédito. **Con menos de 4 dioptrías se cobra la receta** (precio **[PENDIENTE]**) |
| Intereses de las cuotas | Sin intereses | Sigue sin intereses |

**Precios referenciales** (todos **[PENDIENTE]** hasta tener las cotizaciones reales del laboratorio de la óptica):

| Tipo de medida | Precio OptiHelp | Precio en una óptica tradicional | ¿Crédito? |
|---|---|---|---|
| Menos de 4 dioptrías | Bs 825 al contado + receta | Bs 950 | **No** |
| Media (4 a 6 dioptrías) | Bs 1.740 | Bs 2.040 | Sí |
| Alta (más de 6 dioptrías) | Bs 3.490 | Bs 4.140 | Sí |

- Estos precios incluyen una montura de precio promedio. La montura real la elige el cliente en la óptica, así que el precio final lo confirma la orden.
- Si la ONG 1 paga la montura, al cliente se le descuenta el precio de la montura (en el ejemplo demo, Bs 240).
- En la app los precios se siguen mostrando siempre con la etiqueta "Referencial".

---

## 3. Decisiones

### Confirmadas por el dueño del proyecto (19-nov-2026)
1. **La cuota inicial se paga al mandar a hacer los lentes**, o sea, al firmar el contrato. El pago de la cuota inicial es lo que inicia la fabricación (así ya funciona la app).
2. **Menos de 4 dioptrías = sin crédito.** Se puede cobrar la receta y vender los lentes al contado.
3. **Monturas: las decide la óptica.** OptiHelp no se mete. Solo se muestra en la orden la montura que el cliente eligió y su precio.
4. **Todas las cuotas se pagan por QR.** No hay pago por planilla.
5. **El contrato toma como referencia el de The Blink Eye** (sección 5).
6. **Gafas de sol con descuento al terminar de pagar.** El descuento lo pone OptiHelp.

### Todavía pendientes
Mientras no se confirmen, usa el valor por defecto y márcalo como `pendiente: true`.
- **Precio de la receta** para quien tiene menos de 4 dioptrías. Por defecto: Bs 100 (`esDemo: true`).
- **Porcentaje del descuento en gafas de sol.** Por defecto: 15% (`esDemo: true`).
- **Datos legales de OptiHelp para el contrato:** razón social, NIT, representante legal con su carnet y domicilio. Por defecto: marcadores visibles "[Razón social]", "[NIT]", etc.
- **Revisión legal de:**
  - el interés moratorio de 3% mensual;
  - el reporte a centrales de información crediticia (confirmar si OptiHelp puede reportar sin ser entidad financiera);
  - la validez de la firma dibujada en el celular.
- **Plazo del laboratorio de la óptica.** Por defecto: 1 a 3 días hábiles.
- **Dirección, horario y foto de la Óptica Visionario.** Se usan marcadores claros.

---

## 4. Cambios en el código, archivo por archivo

### 4.1 Recursos de marca (vienen en la carpeta de entrega)
En la carpeta `ENTREGA-FASE-1/` vienen los recursos que este repo necesita. Cópialos así:

| Archivo de la entrega | Destino en el repo | Uso |
|---|---|---|
| `public/brand/logo-navbar.png` (1200×223) | `public/brand/logo-navbar.png` (reemplaza) | Barra superior |
| `public/brand/logo-completo.png` (1400×260) | `public/brand/logo-completo.png` (reemplaza) | Pie, acceso y tamaños grandes |
| `public/brand/logo-blanco.png` (1400×260) | `public/brand/logo-blanco.png` (nuevo) | Sobre fondos oscuros (tarjetas marino, cierre) |
| `public/brand/isotipo.png` (640×640) | `public/brand/isotipo.png` (reemplaza) | Spinner y estados vacíos |
| `public/brand/icono-512.png` | `src/app/icon.png` (nuevo) | Ícono de la app |
| `public/brand/favicon.ico` | `src/app/favicon.ico` (reemplaza) | Pestaña del navegador |
| `public/brand/optihelp-*.svg` | `public/brand/` | Originales vectoriales, por si hacen falta |
| `docs/optihelp_bible_brand_system.md` | `docs/` (reemplaza a `visionario_bible_brand_system.md`) | Sistema de marca |

Detalles:
- El logo de OptiHelp **no tiene lema** ("Accesorios Ópticos" era de Visionario). Por eso `logo-navbar` y `logo-completo` son el mismo dibujo en dos tamaños.
- **Colores del logo:** marino `#08285B`, azul `#177ECB`, y cian `#3DA9DF` sobre fondo oscuro. El azul primario actual del repo (`#157DCA`) es prácticamente el mismo y puede quedarse o pasar a `#177ECB`.
- Los dos archivos "Visionario" de la carpeta `public/logo/` dejan de usarse en la app.

### 4.2 Documentación del repo (hacer antes del código)
La regla del repo dice que si una regla de negocio cambia, primero se actualiza `docs/reglas_de_negocio.md`.

- **`docs/reglas_de_negocio.md`:** reescríbelo con la sección 2 de este documento:
  - borra la sección 6 entera (garantía en oro);
  - reescribe la 4 (precio, cuotas 40/30/30, solo QR);
  - reescribe la 7 (incumplimiento con 3 días hábiles, moratorio y acciones legales);
  - reescribe la 11 (monturas de la óptica, sin catálogo propio);
  - agrega "Clientes con menos de 4 dioptrías" (receta cobrada, lentes al contado, sin crédito);
  - agrega "ONG 1" (paga la montura);
  - agrega "Beneficio al terminar" (gafas de sol, descuento a cargo de OptiHelp).
- **`PRODUCT.md`:**
  - actualiza Positioning, Operating Context y Capabilities and Constraints;
  - quita la joya, el "proceso Subway", el catálogo de 20 monturas y la tasación;
  - agrega que la marca es OptiHelp y que la atención es en la Óptica Visionario.
- **`DESIGN.md`:**
  - quita la joya: la línea 3, el tono "Oro · la joya" (líneas ~244–245), la regla "The Oro Es La Joya Rule" (~259) y el "Do" de la línea ~381;
  - el color oro puede quedarse, pero solo para **beneficios**: la montura pagada por la ONG y el descuento en gafas de sol;
  - quita el acceso a Monturas de la barra superior (~288);
  - actualiza las descripciones de la landing y del carrusel (~349 y ~352);
  - quita la línea de las 20 monturas (~361);
  - cambia la referencia a la Bible de marca por `docs/optihelp_bible_brand_system.md`.
- **`docs/user_flows_web_app_visionario.md` y `docs/historias_de_usuario_web_app_visionario.md`:**
  - HU 3.1: la orden llega desde el ERP de OptiHelp.
  - HU 3.2: antes de firmar, la persona completa su número de carnet y su domicilio.
  - HU 3.3: la cuota inicial es el 40%, se paga por QR y con ella se mandan a hacer los lentes.
  - HU 5.1: sin joya devuelta; el descuento en gafas de sol lo pone OptiHelp.
  - Nueva HU 3.4: "como cliente enviado por una ONG, quiero ver en mi orden que la montura ya está pagada por la ONG, para saber cuánto pago yo".
  - Nueva HU 3.5: "como paciente con menos de 4 dioptrías, quiero ver mi receta y cuánto cuestan mis lentes al contado, para decidir si los compro".
- **`docs/brief.md` y `docs/02_REFERENCIAS.md`:** agrega al inicio una nota: "La marca de la app es OptiHelp. Visionario es la óptica aliada donde se atiende al cliente. Ver `docs/CAMBIOS_FASE_1.md`."

### 4.3 `src/content/visionario.ts` (el archivo único de contenido)
Renómbralo a `src/content/optihelp.ts` y actualiza todos los imports (`@/content/visionario` → `@/content/optihelp`).

**Marca y demo**
- `marca.nombre`: "OptiHelp".
- Nuevo campo `marca.opticaAliada: "Óptica Visionario"`.
- `marca.logo`:
  - `navbar` 1200×223;
  - `completo` 1400×260;
  - nuevo `blanco` 1400×260;
  - `isotipo` 640×640;
  - `alt: "OptiHelp"`.
- `demo.claveAlmacenamiento`: `"optihelp-demo-v2"`. La forma de los datos cambia y así no se cargan datos viejos con joya.

**`negocio`**
- Borra `garantia` entero (joya, custodia, devolución).
- `medidaMinimaDioptrias: 4` **se queda**, pero ahora significa "mínimo para acceder al crédito". Renómbralo a `medidaMinimaCredito`.
- Nuevo `contado`:
  ```ts
  contado: {
    receta: { precio: 100, esDemo: true, pendiente: true },
    texto: "Con menos de 4 dioptrías no accede al crédito. Le cobramos la receta y puede comprar sus lentes al contado.",
  }
  ```
- `precioReferencial`: `minimo: 825`, `maximo: 3490`, `pendiente: true`. Agrega los perfiles de la tabla de la sección 2, cada uno con `credito: true | false`.
- `cuotas`:
  ```ts
  cuotas: {
    cantidad: 3,
    porcentajes: [0.4, 0.3, 0.3],
    /** Meses desde la firma: el mismo día de cada mes, como en el contrato de referencia */
    mesesDesdeFirma: [0, 1, 2],
    intereses: false,
    medio: "QR",
  }
  ```
- Borra `gracia`. En su lugar va:
  ```ts
  atraso: {
    diasHabilesParaRegularizar: 3,
    interesMoratorioMensual: 0.03,
    pendiente: true, // revisión legal
  }
  ```
- `laboratorio`: deja 1 a 3 días hábiles, con `pendiente: true`.
- `cancelaciones` y `derivacion`: se quedan.
- Nuevo `negocio.beneficios.ongMontura`: `{ texto: "La montura la paga {ong}.", pendiente: true }`.
- Borra el comentario de las líneas 122–123 sobre la tasación.

**Datos del vendedor (para el contrato)**
```ts
export const empresa = {
  razonSocial: "[Razón social de OptiHelp]",
  nit: "[NIT]",
  representante: { nombre: "[Nombre del representante legal]", ci: "[C.I.]" },
  domicilio: "[Domicilio legal]",
  ciudad: "Santa Cruz de la Sierra, Bolivia",
  pendiente: true,
};
```

**`optica`**
- `nombre: "Óptica Visionario"` y nuevo `rol: "Nuestra óptica aliada"`.
- `direccion` y `horario`: siguen con `pendiente: true`.

**`rutas` y `pantallas`**
- Borra `monturas: "/monturas"` y su entrada en `pantallas`.

**`textos.errores`**
- Nuevos:
  - `ci`: "Escriba su número de carnet, solo números. Ejemplo: 7712765."
  - `domicilio`: "Escriba su zona, barrio o calle."

**`landing`**
- `heroe.etiqueta`: "Lentes en cuotas · Santa Cruz".
- `heroe.titulo`: "Sus lentes a medida, **en 3 cuotas** sin intereses."
- `heroe.bajada`: "Para medidas desde **4 dioptrías**. Solo con su **carnet**. Le atendemos en la **Óptica Visionario**."
- `heroe.pruebas`: ["Medición gratis", "Sin garantía", "Listos en 1 a 3 días"].
- `heroe.chips.joya`: se reemplaza por `atencion: "Óptica Visionario"`.
- `dolor.datos[0]`: cambia "Bs 900–2.000" por "Bs 1.740–3.490" (referencial), "cuesta un lente a medida **al contado**".
- `comparacion`:
  - `etiqueta`: "Por qué OptiHelp";
  - `con`: "Con OptiHelp";
  - `puntosCon[2]`: "**3 cuotas** sin intereses";
  - `puntosCon[3]`: "Solo su **carnet**, sin garantía".
- `pasos.lista[1]`:
  - pestaña "En la óptica";
  - título "Medimos su vista y **elige su montura**.";
  - texto "En la **Óptica Visionario** le medimos la vista y elige su montura entre las de la óptica.";
  - puntos: ["Medición sin costo", "Monturas de la óptica", "Firma su contrato en el celular"].
- `pasos.lista[2]`:
  - título "Pague el 40% por QR y **recoja en 1 a 3 días**.";
  - texto "Con su primer pago mandamos a hacer sus lentes y le avisamos por **WhatsApp** cuando estén listos.";
  - puntos: ["Cuotas sin intereses", "Aviso por WhatsApp", "Todo por QR"].
- `paraQuien.escala`:
  - `comun`: "Menos de 4: receta y lentes al contado";
  - `medida`: "4 o más: lentes en 3 cuotas".
- `paraQuien.noSabe`: "¿No sabe su medida? **Se la medimos** en su cita."
- `cuotas`:
  - título "Una cuota inicial y **dos más pequeñas**.";
  - `ejemplo: 1000` (da 400 / 300 / 300);
  - nota "Ejemplo con un lente de **Bs 1.000**. El precio exacto se lo damos **antes de firmar** y no cambia.";
  - `pasos: ["Al mandar a hacer", "Al mes", "A los 2 meses"]`;
  - `final: "Listo, son suyos"`;
  - `gracia`: "Si se atrasa, tiene **3 días hábiles** para ponerse al día sin recargo."
- `catalogo`: **bórralo**. En su lugar va `dondeAtendemos`:
  - etiqueta "Dónde le atendemos";
  - título "En la **Óptica Visionario**";
  - texto "Nuestra óptica aliada en el centro de Santa Cruz: ahí le medimos la vista, elige su montura y recoge sus lentes.";
  - dirección y horario `pendiente`;
  - una foto marcador.
- `cierre.texto`: "Traiga su **carnet de identidad**. Nosotros hacemos el resto."
- `pie.requisitos`: "Para su cita traiga su carnet de identidad."
- Nuevo `landing.ong` (una línea, opcional): "¿Le envía una ONG? Díganos en su registro: puede pagar menos por su montura."

**`recorrido`**
- `IdParada` queda así: `"cita" | "medicion" | "firma" | "recojo" | "cuota-2" | "cuota-3" | "terminado"`. Se van `joya` y `devolucion`.
- Paradas:
  - **cita:** "Agenda su cita"; aviso "Traiga su carnet de identidad".
  - **medicion:** "Medición y montura": "En la Óptica Visionario medimos su vista y elige su montura." (lugar: optica)
  - **firma:** "Firma y paga el 40%": "Firma su contrato en el celular y paga la cuota inicial por QR. Con eso mandamos a hacer sus lentes." (lugar: app)
  - **recojo:** "Recoge sus lentes": "En 1 a 3 días hábiles. Le avisamos por WhatsApp." (lugar: optica)
  - **cuota-2:** "Cuota 2": "Un mes después. Le avisamos antes por WhatsApp."
  - **cuota-3:** "Cuota 3": "Dos meses después."
  - **terminado:** "Terminó de pagar": "Sus lentes son suyos y tiene un descuento en gafas de sol."

**`proceso` (carrusel)**
- Diapositiva 1: chips ["🪪 Su carnet", "✅ Sin intereses", "🤝 Sin garantía"].
- Diapositiva 2:
  - título "**Agende gratis.** En la Óptica Visionario le medimos la vista y **elige su montura**.";
  - chips ["📅 Su hora", "👓 Medición gratis", "🕶️ Monturas de la óptica"].
- Diapositiva 3:
  - título "**Pague el 40% por QR** y recoja sus lentes. El resto, en 2 cuotas.";
  - chips ["📱 Cuota inicial pagada", "💬 ¡Sus lentes están listos!", "🕶️ Descuento en gafas de sol"].

**`agenda`**
- Borra `joyaAviso`.
- `calendarioTitulo`: "Cita en Óptica Visionario (OptiHelp)".
- `calendarioDetalle`: "Traiga su carnet de identidad."
- `confirmada.queSigue`: quita el punto de la joya. Queda "Traiga su **carnet**" y "Le medimos la vista y elige su montura en la óptica".

**`estado`**
- `situaciones`:
  - "sin-cita" y "cita": detalle "Traiga su carnet de identidad."
  - "cuota-1": título "Pague su cuota inicial"; detalle "Con ese pago mandamos a hacer sus lentes."
  - "vencida": detalle "Póngase al día en 3 días hábiles para evitar el interés por atraso."
  - "liquidado": título "Terminó de pagar"; detalle "Sus lentes son suyos. Tiene un descuento en gafas de sol."
  - Nueva situación "contado": título "Su orden al contado está lista"; detalle "Su medida no requiere crédito. Revise su receta y pague por QR."
- `paradas`: igual que en `recorrido`, sin joya.
- Borra `monturasInteres`.

**`navegacion`**
- Borra `monturas` y `titulos.monturas`.

**`formularioPerfil`**
- `menorDeEdad`: "Como el paciente es menor de edad, el contrato lo firma su padre, madre o tutor."
- `medidaEstimada.opciones`: ["Menos de 4 dioptrías", "Entre 4 y 6 dioptrías", "Más de 6 dioptrías", "No sé"].
- `medidaEstimada.noSabe`: "El crédito es para medidas desde 4 dioptrías. Si su medida es menor, le cobramos la receta y puede comprar sus lentes al contado."
- `comoNosConocio.opciones`:
  - agrega "Una ONG o fundación";
  - cambia "Pasé por la óptica" a "Pasé por la Óptica Visionario".
- Nuevo campo condicional `institucion`:
  - aparece solo si eligió "Una ONG o fundación";
  - etiqueta "¿Cómo se llama la ONG?";
  - es opcional;
  - no aplica ningún descuento por sí solo: el beneficio lo confirma OptiHelp en la orden.
- El registro **no** pide carnet ni domicilio. Esos datos se piden recién en el contrato (ver `contrato`).

**Monturas**
- Borra el tipo `Montura`, `PublicoMontura`, `nombresAdultos`, `nombresNinos`, `crearMonturas`, `monturas` y `catalogo`.

**`notificaciones`**
- "recordatorio-cita": "Traiga su carnet de identidad."
- "orden-recibida": "Revise sus lentes, firme el contrato y pague la cuota inicial."
- "recordatorio-cuota": "Pague con QR desde la app en un minuto." (se queda)
- "cuota-vencida": "Tiene 3 días hábiles para ponerse al día sin recargo."
- Nuevo tipo "orden-contado": título "Su receta y su orden están listas"; texto "Su medida no requiere crédito. Revise el precio al contado."

**`cupones`**
- `liquidacion`:
  ```ts
  { codigo: "GRACIAS", porcentaje: 15, producto: "Gafas de sol", pagaDescuento: "OptiHelp", esDemo: true, pendiente: true }
  ```
- `renovacion`: se queda, con `pendiente: true`.

**`simulador`**
- `descripcion`: "Dispara lo que en la vida real haría el ERP de OptiHelp, la óptica o el paso del tiempo."
- `acciones.ordenErp`: "Simular orden del ERP (crédito)"; descripción "Tras la cita se carga la orden con la medida, la montura y el precio."
- Nueva acción `ordenOng`: "Simular orden con montura pagada por ONG".
- Nueva acción `ordenContado`: "Simular orden al contado (menos de 4 dioptrías)".
- `mora`: descripción "La próxima cuota pasa a vencida y empiezan los 3 días hábiles para regularizar."
- `requisitos.contrato`: quita "(fase 3)".

**`semilla`** (datos demo, todos `esDemo: true`)
```ts
orden: {
  numero: "OC-0001",
  tipo: "credito" as "credito" | "contado",
  optica: "Óptica Visionario",
  lente: "Lente orgánico tallado a medida", // perfil medio por la receta demo (−5,25)
  tratamientos: ["antirreflejo"],
  montura: { descripcion: "Montura elegida en la Óptica Visionario", valor: 240, cubiertaPor: null as string | null },
  receta: null as number | null, // solo en contado: precio de la receta
  precioLista: 1740,
  total: 1740,
  esDemo: true,
},
ordenContado: {
  // receta demo con −2,50 / −2,00 · perfil básico
  lente: "Lente orgánico", precioLista: 825, receta: 100, total: 925, montura: { … }, esDemo: true,
},
```
- Crédito: total Bs 1.740, cuotas 696 / 522 / 522.
- Con la ONG pagando la montura: total Bs 1.500, cuotas 600 / 450 / 450.
- Contado: Bs 825 + Bs 100 de receta = Bs 925, en un solo pago.
- Borra `semilla.joya` y `semilla.orden.joya`, `monturaId` incluido.
- Agrega una `recetaContado` con esfera −2,50 / −2,00 para la orden al contado.

**`orden`**
- `vacia.texto`: "Cuando termine su cita en la Óptica Visionario, su orden aparecerá aquí con el detalle de sus lentes."
- Borra `joya` y `tasada`.
- `montura`: "Montura".
- Nuevos:
  - `montoOng`: "Pagada por {ong}";
  - `atiende`: "Le atiende" → "Óptica Visionario";
  - `financia`: "Crédito de" → "OptiHelp".
- `cuandoCuota`: ["Hoy, al mandar a hacer (40%)", "En un mes (30%)", "En dos meses (30%)"]. Muestra además la fecha exacta de cada una.
- Nuevo `contado`:
  - título "Su orden al contado";
  - aviso "Su medida es menor a 4 dioptrías, por eso no aplica el crédito.";
  - filas "Receta" y "Lentes al contado";
  - acción "Pagar por QR".

### 4.4 Contrato (`contrato` en el contenido)
El texto actual es provisional y habla de la joya. Hay que rehacerlo siguiendo el contrato de referencia (sección 5). Sigue marcado "Texto provisional, pendiente de revisión legal."

- `tarjeta.titulo`: "Contrato de compra en cuotas".
- `documento.encabezado`: "Contrato de compra en cuotas sin interés".
- **Partes:**
  - "Entre {razonSocial}, con NIT {nit}, representada por {representante.nombre}, con C.I. {representante.ci}, con domicilio en {domicilio} (en adelante, OPTIHELP);"
  - "y {nombre}, con C.I. {ci}, domiciliado en {domicilio}, celular {whatsapp} (en adelante, EL CLIENTE)."
  - "La Óptica Visionario realiza la medición, la fabricación y la entrega de los lentes."
- **Datos que se piden antes de firmar** (nuevo paso dentro de la pantalla del contrato, antes del texto):
  - número de C.I. (con extensión, por ejemplo "SC");
  - domicilio (zona, barrio o calle);
  - el celular ya viene del perfil y se puede corregir.
  - Se guardan en el perfil para no pedirlos de nuevo.
- **`condiciones`, en este orden:**
  1. **Objeto del contrato:** "EL CLIENTE compra a OPTIHELP lentes completos (lente y montura) por un precio total de {total}, que paga en tres (3) cuotas sin intereses."
  2. **Ayuda de una ONG** (solo si aplica): "{ong} paga la montura. Por eso su total es {total} en lugar de {precioLista}."
  3. **Forma de pago:** "Todas las cuotas se pagan por QR, a OPTIHELP, desde la app o desde el enlace que le enviamos por WhatsApp."
  4. **Fechas de pago:**
     - "1.ª cuota: {fecha1} — {c1} (se paga hoy; con este pago se mandan a hacer los lentes)";
     - "2.ª cuota: {fecha2} — {c2}";
     - "3.ª cuota: {fecha3} — {c3}".
  5. **Sin garantía:** "EL CLIENTE no deja ninguna garantía. Solo firma este contrato con su carnet de identidad."
  6. **Responsabilidad del cliente:**
     - "EL CLIENTE se compromete a pagar en las fechas indicadas."
     - "Si se atrasa, tiene tres (3) días hábiles para ponerse al día."
     - "Si no lo hace, la deuda tendrá un interés por atraso de tres por ciento (3%) mensual sobre el monto vencido, hasta que lo pague."
     - "Además, OPTIHELP podrá iniciar las acciones legales que correspondan y reportar la deuda a las centrales de información crediticia." (esta última frase: `pendiente: true`, revisión legal)
  7. **Sus datos:** "OPTIHELP guarda sus datos y su historial de pagos para atenderle y para ofrecerle crédito en futuras compras." (`pendiente: true`, revisión legal)
  8. **Sin cancelaciones:** se queda igual.
  9. **Jurisdicción:** "Para cualquier controversia, ambas partes se someten a los tribunales de Santa Cruz de la Sierra, Bolivia."
  10. **Lugar y fecha:** "Firmado en Santa Cruz de la Sierra, el {fecha de hoy}."
- **Firmas:**
  - La firma de EL CLIENTE es la que dibuja con el dedo, con su nombre y su C.I. debajo.
  - La firma de OPTIHELP va como bloque fijo con el nombre y el C.I. del representante (marcador pendiente).
- `menor`: "Como el paciente es menor de edad, este contrato lo firma su padre, madre o tutor, con sus propios datos."
- `firmado.texto`: "Guardamos su firma junto al contrato. Le enviamos una copia por WhatsApp." (el envío se simula).
- `firmado.accion`: "Pagar cuota inicial".
- **Pantalla:** `documento-contrato.tsx` muestra el documento paginado con todas las cláusulas. `firma-contrato.tsx` agrega el paso de datos (C.I. y domicilio) antes de la casilla "Leí y acepto". Sin esos datos no se habilita la firma.

### 4.5 `src/lib/estado.ts`
- `Perfil`: agrega `ci: string`, `domicilio: string` e `institucion: string | null`.
- `Orden`:
  - borra `monturaId` y `joya`;
  - agrega `tipo: "credito" | "contado"`, `optica: string`, `montura: { descripcion: string; valor: number; cubiertaPor: string | null }`, `receta: number | null` y `precioLista: number`.
- `Cuota`: agrega `porcentaje: number`.
- Borra `monturasInteres` (de `Datos` y de `datosIniciales`) y la acción `alternarMontura`.
- `montoCuota` y `generarCuotas`:
  - Reemplázalas por un reparto con `negocio.cuotas.porcentajes`.
  - Cuota 1 = `Math.round(total × 0,4)`. Cuota 2 = `Math.round(total × 0,3)`. Cuota 3 = total − cuota 1 − cuota 2, así la suma da siempre el total exacto.
  - Vencimientos: `sumarMeses(firma, 0)`, `sumarMeses(firma, 1)` y `sumarMeses(firma, 2)`: el mismo día de cada mes, como en el contrato de referencia.
  - Borra el comentario "cuotas exactamente iguales".
- Nueva función `fechaLimiteRegularizar(vence)`: suma 3 días hábiles (lunes a sábado, igual que el horario de la óptica; confirmar si el sábado cuenta) a la fecha de vencimiento. Reemplaza a `finDeGracia`.
- Orden al contado:
  - `firmarContrato` no aplica: no hay contrato de crédito.
  - Se genera un solo pago (`cuotas` con una sola entrada al 100%, `porcentaje: 1`) que se paga por QR.
  - Al pagarlo, el laboratorio pasa a "fabricando".
  - `liquidadoEl` se marca al pagar, pero la pantalla de cliente cumplido no se muestra en el contado.
- `simular`:
  - `ordenErp`: orden de crédito (semilla normal);
  - nueva `ordenOng`: misma orden, con `montura.cubiertaPor = "ONG aliada (demo)"` y `total = precioLista − montura.valor`;
  - nueva `ordenContado`: usa `semilla.ordenContado` y `recetaContado`, notifica "orden-contado" y genera el pago único sin contrato.
- `siguienteRuta`: con orden al contado y sin pagar, va a "orden".
- `paradaActual`: devuelve las paradas nuevas.
  - Contrato sin pagos → "firma".
  - Cuota 1 pagada y lentes sin estar listos → "recojo".
  - Cuota 1 pagada y lentes listos → "cuota-2".
  - 2 pagadas → "cuota-3".
  - 3 pagadas → "terminado".
- `situacionActual`: si `orden.tipo === "contado"` y no está pagada, devuelve "contado".

### 4.6 Pantallas y componentes
- **Borrar:**
  - la carpeta `src/app/monturas/` entera (`page.tsx`, `catalogo.tsx`, `visor-montura.tsx`);
  - las fotos de ejemplo `public/fotos/monturas/` y `public/fotos/puestos/`, si nada más las usa.
- **`src/components/app/barras.tsx`:**
  - borra `BotonMonturas` (líneas ~94–110) y su uso (~142);
  - cambia `aria-label="Visionario, ir al inicio"` (líneas 85 y 209) por "OptiHelp, ir al inicio".
- **`src/app/layout.tsx`:**
  - cambia el `title` a OptiHelp;
  - nueva descripción (línea 11): "Lentes a medida en 3 cuotas sin intereses, solo con su carnet. Le atendemos en la Óptica Visionario, en Santa Cruz de la Sierra."
- **`src/app/page.tsx` (landing):**
  - borra el enlace a monturas de la barra (línea ~100);
  - borra el chip de la joya (línea ~145, `NecklaceIcon`) y pon uno de "Óptica Visionario";
  - la sección "Monturas" (líneas ~276–300) pasa a "Dónde le atendemos", con `landing.dondeAtendemos`;
  - `EscalaDioptrias` (líneas ~37–65) **se queda**, con los textos nuevos: menos de 4 al contado, 4 o más en cuotas;
  - el componente de cuotas (líneas ~67+): 3 barras de distinto tamaño (40/30/30) con el ejemplo 400/300/300. La meta final es "Listo, son suyos", no "Su joya vuelve";
  - "Hoy vs. con Visionario" (línea ~181) pasa a "con OptiHelp".
- **`src/components/landing/interactivos.tsx`:**
  - Las pantallas de ejemplo dentro del celular (líneas ~160–260) muestran "Traiga su joya de oro", "Garantía en custodia", "Joya tasada" y "20 monturas". Cámbialas por:
    - "Traiga su carnet";
    - una tarjeta de orden con "Montura · Óptica Visionario", el precio y "Cuota inicial 40%";
    - los chips "Medición gratis" y "Sin garantía".
  - La marca `<b>Visionario</b>` (línea ~234) pasa a OptiHelp.
- **`src/app/agendar/agenda.tsx`:**
  - borra la prop `conJoya` y el aviso de la joya (líneas ~34, 75–80, 157 y 253);
  - borra el enlace "le interesan N monturas" (líneas ~130 y 181–185);
  - muestra en la tarjeta de la cita "Óptica Visionario" y la dirección (pendiente).
- **`src/app/panel/inicio.tsx`:**
  - `ORDEN` (línea 16) pasa a las paradas nuevas;
  - borra el emoji de la joya (línea 20) y la línea 162 de la tasación;
  - emojis nuevos: recojo "👓", terminado "🎉";
  - para una orden al contado no muestra el recorrido de cuotas: solo la tarjeta "Su orden al contado" con el botón "Pagar por QR".
- **`src/app/panel/orden/detalle-orden.tsx`:**
  - borra la foto grande de la montura del catálogo (líneas ~55 y 68–80). En su lugar va un encabezado "Su orden · Óptica Visionario";
  - borra la fila de la joya y su foto (líneas ~109–125) y el chip "Su joya" (línea 44);
  - fila "Montura": la descripción y el precio que cargó la óptica. Si `cubiertaPor` existe, una nota (tono oro de beneficio) "Pagada por {ONG}: −Bs {valor}";
  - filas "Le atiende: Óptica Visionario" y "Crédito de: OptiHelp";
  - plan de 3 cuotas con porcentaje, monto y **fecha exacta**;
  - si `tipo === "contado"`: muestra la receta, el precio al contado, el aviso de que no aplica crédito y el botón "Pagar por QR" en lugar de "Revisar y firmar contrato".
- **`src/app/panel/contrato/firma-contrato.tsx` y `src/components/contrato/documento-contrato.tsx`:** ver la sección 4.4.
- **`src/app/pagos/mis-pagos.tsx`:**
  - "3 cuotas iguales" (líneas 60 y 75) pasa a "3 cuotas sin intereses";
  - cada cuota muestra su porcentaje y su fecha.
- **`src/app/pagos/pagar/pagar-cuota.tsx`:**
  - título "Cuota inicial" para la 1, "Cuota 2 de 3" y "Cuota 3 de 3";
  - en contado, "Pago único";
  - agrega la línea "Paga a: OptiHelp";
  - la alerta de vencida dice "Tiene hasta el {fecha límite} para ponerse al día sin recargo."
- **`src/app/panel/liquidado/felicitacion.tsx`:**
  - borra el bloque de la joya (líneas ~57–58);
  - deja la tarjeta del beneficio de gafas de sol con el texto "Por terminar sus pagos, tiene {porcentaje}% de descuento en unas gafas de sol. El descuento lo pone OptiHelp.";
  - agrega una línea: "Puede volver a comprar en cuotas cuando lo necesite."
- **`src/app/registro/perfil/form-perfil.tsx`:** agrega el campo condicional `institucion`.
- **`src/components/demo/simulador.tsx`:**
  - agrega los botones `ordenOng` y `ordenContado`;
  - las 3 acciones de orden se bloquean entre sí: solo puede haber una orden;
  - "Simular pago de cuota" también sirve para el pago único del contado.
- **`src/app/sistema/page.tsx`:**
  - borra el ícono "Joya" (línea 72) y el ejemplo "Valor estimado de su joya" (línea 143);
  - "Sistema visual de Visionario" pasa a OptiHelp;
  - usa el isotipo nuevo.
- **`src/app/mapa/page.tsx`:** sale solo de `pantallas`; revisa que ya no liste monturas.

### 4.7 Textos sueltos
Al final, busca en todo `src/` y corrige lo que quede:
```
joya|oro |quilates|tasac|custodia|bóveda|20 monturas|catálogo|mes de gracia|cuotas iguales|Visionario
```
"Visionario" solo puede quedar como "Óptica Visionario" (la óptica aliada) y en el nombre de la carpeta o del repo.

---

## 5. Contrato de referencia (The Blink Eye) y cómo queda en nuestro contrato

The Blink Eye es una óptica de Santa Cruz que vende en 3 cuotas sin interés. Su contrato en papel tiene estas partes. Esto es lo que tomamos:

| Cláusula de The Blink Eye | ¿Estaba en nuestro contrato viejo? | Cómo queda en el nuestro |
|---|---|---|
| **Partes:** vendedora con nombre, C.I., dirección de la tienda y régimen tributario; cliente con nombre, C.I., domicilio y celular | No. Solo el nombre del cliente | Se agregan los datos de OptiHelp (razón social, NIT, representante, domicilio) y del cliente (C.I., domicilio, celular). El C.I. y el domicilio se piden antes de firmar |
| **1. Objeto:** lentes completos, precio total, 3 cuotas mensuales sin intereses | Sí | Igual, aclarando que son lentes completos (lente y montura) |
| **2. Forma de pago:** transferencia o QR, pedido por WhatsApp | En parte (QR) | Solo QR, a OptiHelp, desde la app o el enlace de WhatsApp |
| **3. Fechas de pago:** fecha exacta de cada cuota, el mismo día de cada mes | No. Solo "al mes" | Fecha exacta y monto de cada cuota. La 1.ª es el día de la firma |
| **4. Responsabilidad del cliente:** 3 días hábiles para ponerse al día; después, interés moratorio de 3% mensual sobre lo vencido; acciones legales y reporte a centrales de riesgo | No. Teníamos 1 mes de gracia sin intereses y la joya | Se adopta igual. El reporte a centrales y el 3% quedan marcados para revisión legal |
| **5. Jurisdicción:** tribunales de Santa Cruz de la Sierra | No | Se agrega |
| **Lugar, fecha y firmas** de las dos partes con su C.I. | Solo la firma del cliente | Se agrega el lugar y la fecha, y el bloque de firma de OptiHelp |

**Lo que nuestro contrato tiene y el de The Blink Eye no** (se mantiene):
- no hay cancelaciones ni devoluciones;
- los menores firman con su padre, madre o tutor;
- la ayuda de una ONG;
- el uso de los datos de pago;
- la copia del contrato por WhatsApp.

**A revisar con un abogado antes de lanzar:**
1. Si OptiHelp puede reportar deudas a centrales de información crediticia sin ser una entidad financiera regulada.
2. Si el interés moratorio de 3% mensual es válido para una venta en cuotas.
3. Si la firma dibujada en el celular vale como firma del contrato, o si conviene además firmar una copia impresa en la óptica.
4. Que OptiHelp esté constituida (NIT) antes de la primera venta, porque es la parte que vende.

---

## 6. Lo que NO hay que hacer en esta fase
- No agregar una financiera (IDEPRO, PrestaYa ni ninguna otra).
- No agregar pago por planilla ni pago en efectivo: todo es por QR.
- No crear catálogo de monturas, stock ni reserva de monturas.
- No dar crédito a medidas menores de 4 dioptrías.
- No pedir carnet ni domicilio en el registro: solo en el contrato.
- No inventar precios: todo precio va como "Referencial" y `pendiente: true`.
- No construir el ERP aquí. Lo hace el CTO aparte; en este prototipo sigue el simulador.

---

## 7. Cómo verificar que quedó bien
1. `npm run typecheck`, `npm run lint` y `npm run build` pasan sin errores.
2. La búsqueda de la sección 4.7 no encuentra nada de joya, oro, tasación, custodia, catálogo, mes de gracia ni cuotas iguales.
3. **Recorrido con crédito:**
   - reiniciar la demo → crear cuenta → perfil → agendar → "Simular orden del ERP (crédito)";
   - la orden muestra Bs 1.740 y cuotas 696 / 522 / 522, con sus fechas (hoy, en un mes y en dos meses);
   - el contrato pide C.I. y domicilio y muestra todas las cláusulas de la sección 4.4;
   - firmar → pagar cuota inicial → "laboratorio listo" → pagar cuota 2 → pagar cuota 3;
   - aparece la felicitación con el descuento en gafas de sol, sin nada de joya.
4. **Recorrido con ONG:** "Simular orden con montura pagada por ONG".
   - La orden muestra "Pagada por ONG aliada (demo): −Bs 240", total Bs 1.500 y cuotas 600 / 450 / 450.
   - El contrato muestra la cláusula de la ONG.
5. **Recorrido al contado:** "Simular orden al contado".
   - La orden muestra la receta (Bs 100), los lentes (Bs 825), el total Bs 925 y el aviso de que no aplica crédito.
   - No pide contrato. Se paga una sola vez por QR.
6. **Atraso:** "Simular vencimiento" muestra la fecha límite de 3 días hábiles y el aviso del interés por atraso, sin ninguna mención a una joya ni a un mes de gracia.
7. La landing, el carrusel y la agenda dicen OptiHelp y "Óptica Visionario", y piden solo el carnet.
8. El logo de OptiHelp aparece en la barra, el pie, el acceso y el contrato. El favicon es el isotipo de OptiHelp.
9. En celular (375px) y en escritorio (1024px o más) no quedan huecos donde antes estaba la sección o el botón de monturas.
