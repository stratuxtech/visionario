# Reglas de Negocio: OptiHelp (Fase 1)

**Propósito:** describir cómo funciona el negocio en su operación cotidiana (venta, cobro, incumplimiento y monturas). Este documento es la base para diseñar la Web App y el ERP. Cuando una regla cambie, se actualiza aquí primero.

**Notas:** los puntos marcados como **[PENDIENTE]** aún no están definidos. Los puntos con **[NOTA]** son supuestos o decisiones que deben validarse con asesoría legal o financiera antes del lanzamiento. El detalle de los cambios de la Fase 1 está en `docs/CAMBIOS_FASE_1.md`.

---

## 0. Quién es quién

- **OptiHelp** es la startup y la marca de la app. Vende, da el crédito y cobra las cuotas.
- **Óptica Visionario** es la óptica aliada, en el centro de Santa Cruz. Ahí se hace la cita: mide la vista, el cliente elige su montura, la óptica manda a fabricar los lentes y los entrega.
- **El ERP de OptiHelp** lo construye el CTO por separado. Ahí se cargan las órdenes después de cada cita. En el prototipo se simula.
- En la Fase 1 **no hay financiera**. OptiHelp da el crédito directamente.

## 1. Propuesta de negocio

- OptiHelp ofrece lentes a medida, fabricados en laboratorio, para personas de bajos recursos en Santa Cruz de la Sierra, Bolivia.
- Con una medida de **4 dioptrías o más**, el cliente paga sus lentes en 3 cuotas sin intereses.
- El cliente compra **solo con su carnet de identidad y el contrato** firmado en la app. **No deja ninguna garantía.**

## 2. Mercado objetivo

- **Público:** personas de 18 años o más, y niños y adolescentes con su representante legal, que viven en zonas periféricas de Santa Cruz, como Plan 3000, Villa 1° de Mayo, Pampa de la Isla y Los Lotes.
- **Perfil económico:** trabajadores informales o de oficios manuales con ingresos diarios o cercanos al salario mínimo (Bs 3.300), sin acceso a crédito bancario.
- **Universo de referencia (SOM):** 55.400 personas en el departamento de Santa Cruz con medida mediana a severa y en pobreza o vulnerabilidad.
- **Clínica:** el crédito es para medidas de 4 dioptrías o más (miopía, hipermetropía o astigmatismo severo). Con menos, ver la sección 4.1.
- **Por qué desde 4 dioptrías:** con esa medida la vida diaria se complica mucho más (trabajar, leer, moverse). Por eso el crédito es para ellos.

## 2.1. Medida que el cliente cree tener (registro)

- En el registro se le pregunta cuántas dioptrías cree que tiene en cada ojo: menos de 4, de 4 a 6, de 6 a 10, de 10 a 12, o "No lo sé".
- Es solo una referencia: la medida real la toma la óptica en la cita. La respuesta no aprueba ni niega el crédito.
- Si elige **menos de 4**, se le explica que no accede al crédito y que puede comprar al contado.
- Si elige **"No lo sé"**, se le explica que en la cita le medimos la vista y que el crédito es solo para medidas de 4 dioptrías o más, por ser las que más complican la vida diaria.

## 3. Producto

- **Tipo de lente:** lente orgánico tallado a medida en el laboratorio con el que trabaja la Óptica Visionario.
- **Opciones de tratamiento:** antirreflejo, filtro de luz azul y bifocal. [PENDIENTE: precio de cada opción.]
- **Monturas:** las de la Óptica Visionario (ver sección 11).
- **Garantía de producto:** [PENDIENTE]

## 4. Precio y forma de pago

- **Precios referenciales** [PENDIENTE: hasta tener las cotizaciones reales del laboratorio de la óptica]:

| Tipo de medida | Precio OptiHelp | Precio en una óptica tradicional | ¿Crédito? |
|---|---|---|---|
| Menos de 4 dioptrías | Bs 825 al contado + receta | Bs 950 | No |
| Media (4 a 6 dioptrías) | Bs 1.740 | Bs 2.040 | Sí |
| Alta (más de 6 dioptrías) | Bs 3.490 | Bs 4.140 | Sí |

- Estos precios incluyen una montura de precio promedio. La montura real la elige el cliente en la óptica, así que el precio final lo confirma la orden.
- **Precio cerrado:** el precio total se informa antes de firmar y no cambia. **Sin intereses.**
- **Cuotas:** 3 cuotas de **40% / 30% / 30%**:
  - 1.ª cuota (40%): el día de la firma. Con ese pago se mandan a hacer los lentes.
  - 2.ª cuota (30%): al mes, el mismo día de la firma.
  - 3.ª cuota (30%): a los dos meses, el mismo día de la firma.
- **Redondeo:** la cuota 1 y la cuota 2 se redondean al boliviano; la cuota 3 es el resto, así la suma da siempre el total exacto.
- **Medio de pago:** **solo QR**, pagado **a OptiHelp** (no a la óptica), desde la app o desde el enlace que se envía por WhatsApp. No hay pago en efectivo ni descuento por planilla.

## 4.1. Clientes con menos de 4 dioptrías

- **No acceden al crédito.**
- Se les cobra la **receta**. [PENDIENTE: precio de la receta. Valor demo: Bs 100.]
- Pueden comprar sus lentes **al contado** (precio referencial Bs 825).
- Pagan todo junto, en un solo pago por QR. No firman contrato de crédito.
- Con el pago, la óptica manda a fabricar los lentes.

## 5. Venta presencial

1. El cliente agenda una cita de **60 minutos** desde la Web App.
2. Va a la Óptica Visionario con su carnet. La medición es gratuita si accede al crédito.
3. Elige su montura entre las de la óptica.
4. OptiHelp carga la orden en su ERP. El cliente la recibe en la app.
5. Antes de firmar, completa en la app su número de carnet y su domicilio, y saca con la cámara del celular **una foto del frente (anverso) y otra de atrás (reverso) de su carnet**. Sin las dos fotos no puede firmar. [NOTA: en el prototipo la cámara se simula y no se guarda ninguna imagen real.]
6. Firma el contrato con el dedo y paga por QR la cuota inicial (40%).
7. El laboratorio tarda entre 1 y 3 días hábiles en fabricar los lentes. [PENDIENTE: plazo real del laboratorio de la óptica.] Le avisamos por WhatsApp.
8. Recoge sus lentes en la óptica.

## 6. Cobro de las cuotas

- El sistema envía recordatorios por WhatsApp y en la App antes de cada vencimiento, con QR dinámico para pagar.
- Todas las cuotas se pagan a OptiHelp.

## 7. Incumplimiento

- **Plazo para ponerse al día:** si se atrasa, el cliente tiene **3 días hábiles** desde el vencimiento para pagar sin recargo. [NOTA: en el prototipo se cuentan de lunes a sábado, como el horario de la óptica; confirmar si el sábado cuenta.]
- **Interés moratorio:** pasado ese plazo, la deuda tiene un interés de **3% mensual** sobre el monto vencido, hasta que se pague. [PENDIENTE: revisión legal.]
- **Acciones legales:** OptiHelp puede iniciar las acciones legales que correspondan y reportar la deuda a las centrales de información crediticia. [PENDIENTE: revisión legal; confirmar si OptiHelp puede reportar sin ser entidad financiera.]
- Las cuotas no tienen intereses mientras se paguen a tiempo.

## 8. Firma del contrato y representación de menores

- El contrato lo firma el dueño del lente, si es mayor de edad, con su carnet de identidad.
- Si el paciente es menor de edad, el contrato lo firma su padre, madre o tutor, con sus propios datos.
- OptiHelp no acepta contratos firmados por menores sin representante.
- El contrato sigue el modelo de The Blink Eye: datos completos de las partes, fechas exactas de pago, 3 días hábiles para ponerse al día, interés moratorio y jurisdicción en Santa Cruz de la Sierra. [PENDIENTE: datos legales de OptiHelp (razón social, NIT, representante legal y domicilio) y revisión legal de la firma dibujada en el celular.]

## 9. Pacientes que no podemos atender

- Si el paciente requiere cirugía u otra patología, se lo deriva a otro centro de salud.
- [PENDIENTE: criterio para medidas que superen el rango del laboratorio.]

## 10. Cancelaciones y devoluciones

- **No hay cancelaciones** una vez firmado el contrato.
- **No hay reembolsos** de la cuota inicial ni de las cuotas pagadas.

## 11. Monturas

- Las monturas son de la **Óptica Visionario**. La óptica decide cuáles ofrece y a qué precio.
- OptiHelp no tiene monturas ni inventario, y la app no tiene catálogo.
- En la orden solo se muestra la montura que el cliente eligió y su precio.

## 12. ONG 1

- La ONG 1 **paga la montura** de los clientes que ella envía.
- Al cliente se le descuenta el precio de la montura del total (en el ejemplo demo, Bs 240).
- **En la app no se nombra a la ONG.** El cliente solo ve que no paga la montura ("Usted no paga la montura") y el total más bajo. Que la paga una ONG se le explica en persona.
- El cliente puede decir en su registro que lo envía una ONG, pero eso no aplica ningún descuento por sí solo: el beneficio lo confirma OptiHelp en la orden.
- [PENDIENTE: nombre de la ONG y acuerdo firmado.]

## 13. Beneficio al terminar

- Al pagar la 3.ª cuota, los lentes son del cliente.
- Recibe un **descuento en gafas de sol**. El descuento lo pone **OptiHelp**. [PENDIENTE: porcentaje. Valor demo: 15%.]
- Puede volver a comprar en cuotas.

## 14. Puntos abiertos

- **Márgenes:** no se conoce aún el margen por venta. [NOTA: definir costo del lente, costo de la montura y costo del delivery antes de fijar precios finales.]
- **Punto de equilibrio de la Fase 1:** no se conoce cuántas ventas mensuales se necesitan para cubrir el capital que se adelanta al laboratorio.
- **Ronda no dilutiva:** el pitch la define entre USD 2.000 y USD 5.000.
- **Validación legal:** el interés moratorio, el reporte a centrales de riesgo y la validez de la firma dibujada deben revisarse con un abogado antes del lanzamiento. OptiHelp debe estar constituida (NIT) antes de la primera venta. [NOTA]
