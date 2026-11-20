"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Clock01Icon, Coins01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { cuotasPanel as c, navegacion, negocio, orden as textoOrden, rutas, textos } from "@/content/optihelp";
import { cuotasPagadas, diasHasta, esContado, fechaLimiteRegularizar, generarCuotas, proximaCuota, useApp } from "@/lib/estado";
import { useGuardia } from "@/lib/guardias";
import { bs, fecha } from "@/lib/utils";
import { PantallaApp } from "@/components/app/barras";
import { EstadoVacio } from "@/components/app/estado-vacio";
import { BarraCuotas } from "@/components/cuotas/barra-cuotas";
import { Button, Flecha } from "@/components/ui/button";
import { EstadoCuota } from "@/components/ui/estado-cuota";
import { Nota } from "@/components/ui/nota";
import { cn } from "@/lib/utils";

/** Aviso de vencimiento: cuota vencida (con su fecha límite de 3 días hábiles) o próxima a vencer. */
function Alerta() {
  const cuotas = useApp((s) => s.cuotas);
  const vencida = cuotas.find((x) => x.estado === "vencida");
  const proxima = proximaCuota(cuotas);
  if (vencida) {
    return (
      <Nota tono="alerta" role="alert" titulo={c.alertaVencida.titulo}>
        {c.alertaVencida.texto(fecha(fechaLimiteRegularizar(vencida.vence)))}
      </Nota>
    );
  }
  if (proxima && proxima.numero > 1) {
    const dias = diasHasta(proxima.vence);
    if (dias <= 5) {
      return (
        <Nota tono="info" icono={Clock01Icon} titulo={c.alertaProxima.titulo}>
          {c.alertaProxima.texto(dias)}
        </Nota>
      );
    }
  }
  return null;
}

/** Mis pagos: solo lo que tiene que ver con las cuotas. Cualquier cuota pendiente se puede adelantar. */
export function MisPagos() {
  const listo = useGuardia();
  const cuotas = useApp((s) => s.cuotas);
  const contrato = useApp((s) => s.contrato);
  const orden = useApp((s) => s.orden);
  if (!listo) return null;

  const titulo = navegacion.titulos.pagos;

  /* Aún no hay orden: nada que pagar */
  if (!orden) {
    return (
      <PantallaApp titulo={titulo}>
        <EstadoVacio
          icono={Coins01Icon}
          titulo={c.vacia.titulo}
          texto={c.vacia.texto}
          chips={[
            { emoji: "📱", texto: c.vacia.chips.qr },
            { emoji: "✅", texto: c.vacia.chips.cuotas, tono: "exito" },
            { emoji: "🤝", texto: c.vacia.chips.garantia, tono: "azul" },
          ]}
        />
      </PantallaApp>
    );
  }

  /* Orden al contado: un solo pago por QR, sin contrato */
  if (esContado(orden)) {
    const unico = cuotas[0];
    const pagada = unico?.estado === "pagada";
    return (
      <PantallaApp titulo={titulo}>
        <h2 className="font-titulo text-seccion text-secondary-950">{c.contado.titulo}</h2>
        <p className="mt-1 text-secondary-700">{c.contado.texto}</p>
        <section className="tarjeta mt-5 flex items-center gap-3 p-4 lg:p-5">
          <span
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full font-titulo font-bold",
              pagada ? "bg-exito-500 text-white" : "bg-primary-600 text-white shadow-brillo",
            )}
          >
            {pagada ? <HugeiconsIcon icon={Tick02Icon} size={20} strokeWidth={2.75} aria-hidden /> : 1}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-secondary-950">
              {textoOrden.contado.total} <span className="cifras font-semibold text-secondary-700">· {bs(orden.total)}</span>
            </p>
            {pagada && unico?.pagadaEl && <p className="cifras text-meta text-muted-foreground">{c.contado.pagado(fecha(unico.pagadaEl))}</p>}
          </div>
          {unico && <EstadoCuota estado={unico.estado} />}
        </section>
        {!pagada && (
          <Button asChild size="lg" className="mt-6">
            <Link href={rutas.pago}>
              {c.contado.accion}
              <Flecha />
            </Link>
          </Button>
        )}
      </PantallaApp>
    );
  }

  /* Hay orden, falta firmar: se ve el plan, todavía sin pagos activos */
  if (!contrato) {
    const plan = generarCuotas(orden.total, new Date().toISOString());
    return (
      <PantallaApp titulo={titulo}>
        <h2 className="font-titulo text-seccion text-secondary-950">{c.plan.titulo}</h2>
        <p className="cifras mt-1 text-secondary-700">
          {c.plan.resumen(bs(orden.total))}
        </p>
        <ol className="mt-5 grid grid-cols-3 gap-2.5">
          {plan.map((x, i) => (
            <li key={x.numero} className="tarjeta animate-entrar p-4 text-center" style={{ animationDelay: `${i * 100}ms` }}>
              <span className="mx-auto flex size-8 items-center justify-center rounded-full bg-primary-50 font-titulo font-bold text-primary-700">{x.numero}</span>
              <p className="cifras mt-3 font-titulo text-bloque font-bold text-secondary-950">{bs(x.monto)}</p>
              <p className="text-mini text-muted-foreground">{textoOrden.cuandoCuota[i]}</p>
              <p className="cifras mt-1 text-mini font-bold text-secondary-800">{fecha(x.vence)}</p>
            </li>
          ))}
        </ol>
        <Nota tono="info" titulo={c.plan.texto} className="mt-4" />
        <Button asChild size="lg" className="mt-6">
          <Link href={rutas.orden}>
            {c.plan.accion}
            <Flecha />
          </Link>
        </Button>
      </PantallaApp>
    );
  }

  const total = negocio.cuotas.cantidad;
  const pagadas = cuotasPagadas(cuotas);
  const montoPagado = cuotas.filter((x) => x.estado === "pagada").reduce((a, x) => a + x.monto, 0);
  const montoTotal = cuotas.reduce((a, x) => a + x.monto, 0);
  const proxima = proximaCuota(cuotas);

  return (
    <PantallaApp titulo={titulo}>
      <div className="space-y-5">
        <Alerta />

        <section aria-label={c.resumen} className="relative overflow-hidden rounded-[2rem] bg-secondary-950 p-5 text-white shadow-lg lg:p-7">
          <span aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full bg-primary-500/40 blur-3xl" />
          <div className="relative">
            <p className="font-titulo text-bloque font-bold text-white lg:text-[1.5rem]">{textos.progresoCuotas(pagadas, total)}</p>
            {pagadas < total && <p className="mt-0.5 text-meta text-secondary-200">{textos.faltanCuotas(total - pagadas)}</p>}
            <BarraCuotas pagadas={pagadas} total={total} claro className="mt-5" />
            <dl className="cifras mt-5 grid grid-cols-3 gap-2 text-meta">
              <div>
                <dt className="text-secondary-300">{c.pagado}</dt>
                <dd className="font-titulo text-entrada font-bold text-white">{bs(montoPagado)}</dd>
              </div>
              <div>
                <dt className="text-secondary-300">{c.restante}</dt>
                <dd className="font-titulo text-entrada font-bold text-white">{bs(montoTotal - montoPagado)}</dd>
              </div>
              <div>
                <dt className="text-secondary-300">{c.total}</dt>
                <dd className="font-titulo text-entrada font-bold text-white">{bs(montoTotal)}</dd>
              </div>
            </dl>
          </div>
        </section>

        <ol className="space-y-3">
          {cuotas.map((x, i) => {
            const esProxima = proxima?.numero === x.numero;
            const pagada = x.estado === "pagada";
            return (
              <li
                key={x.numero}
                className={cn(
                  "tarjeta animate-entrar p-4 transition-shadow lg:p-5",
                  esProxima && "shadow-md ring-2 ring-primary-200",
                )}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-full font-titulo font-bold",
                      pagada ? "bg-exito-500 text-white" : esProxima ? "bg-primary-600 text-white shadow-brillo" : "bg-secondary-100 text-secondary-700",
                    )}
                  >
                    {pagada ? <HugeiconsIcon icon={Tick02Icon} size={20} strokeWidth={2.75} aria-hidden /> : x.numero}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-secondary-950">
                      {c.cuota(x.numero, textos.porcentaje(x.porcentaje))} <span className="cifras font-semibold text-secondary-700">· {bs(x.monto)}</span>
                    </p>
                    <p className="cifras text-meta text-muted-foreground">
                      {pagada && x.pagadaEl ? c.pagadaEl(fecha(x.pagadaEl)) : c.venceEl(fecha(x.vence))}
                    </p>
                  </div>
                  <EstadoCuota estado={x.estado} />
                </div>
                {!pagada && (
                  <Button asChild variant={esProxima ? "default" : "secondary"} className="mt-4">
                    <Link href={`${rutas.pago}?cuota=${x.numero}`}>
                      {esProxima ? c.pagar(x.numero) : c.adelantar(x.numero)}
                      <Flecha />
                    </Link>
                  </Button>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </PantallaApp>
  );
}
