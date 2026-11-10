"use client";

import { useState } from "react";
import Image from "next/image";
import { MedicalFileIcon } from "@hugeicons/core-free-icons";
import { navegacion, receta as t } from "@/content/visionario";
import { useApp } from "@/lib/estado";
import { useGuardia } from "@/lib/guardias";
import { dioptria, fecha, cn } from "@/lib/utils";
import { PantallaApp } from "@/components/app/barras";
import { EstadoVacio } from "@/components/app/estado-vacio";
import { Nota } from "@/components/ui/nota";
import type { OjoReceta } from "@/content/visionario";

type Columna = keyof typeof t.columnas;
const columnas: Columna[] = ["esfera", "cilindro", "eje", "adicion"];

function valor(o: OjoReceta, c: Columna) {
  const v = o[c];
  if (v === null) return "—";
  return c === "eje" ? `${v}°` : dioptria(v);
}

/** Mi receta: una sola tarjeta, como la receta del optometrista. Cada término se explica al tocarlo. */
export function VerReceta() {
  const listo = useGuardia();
  const r = useApp((s) => s.receta);
  const [elegida, setElegida] = useState<Columna | null>(null);
  if (!listo) return null;

  const titulo = navegacion.titulos.receta;

  if (!r) {
    return (
      <PantallaApp titulo={titulo}>
        <EstadoVacio
          icono={MedicalFileIcon}
          titulo={t.vacia.titulo}
          texto={t.vacia.texto}
          chips={[
            { emoji: "👁️", texto: "Ojo derecho" },
            { emoji: "👓", texto: "Su medida", tono: "azul" },
            { emoji: "🩺", texto: "Medición gratis", tono: "exito" },
          ]}
        />
      </PantallaApp>
    );
  }

  const ojos = [
    { ...t.ojos.derecho, datos: r.ojoDerecho },
    { ...t.ojos.izquierdo, datos: r.ojoIzquierdo },
  ];

  return (
    <PantallaApp titulo={titulo}>
      <article className="animate-entrar overflow-hidden rounded-[2rem] bg-card shadow-md">
        <header className="relative h-36 overflow-hidden text-white lg:h-44">
          <Image src="/fotos/examen-vista.jpg" alt="" fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover object-[50%_30%]" />
          <span aria-hidden className="absolute inset-0 bg-linear-to-t from-secondary-950/90 via-secondary-950/40 to-transparent" />
          <div className="absolute inset-x-5 bottom-4">
            <h2 className="font-titulo text-bloque font-bold text-white lg:text-[1.5rem]">{t.encabezado}</h2>
            <p className="cifras text-meta text-secondary-100">
              {t.fecha} {fecha(r.fecha)}
            </p>
          </div>
        </header>

        <div className="divide-y divide-border">
          {ojos.map((ojo) => (
            <section key={ojo.sigla} aria-label={ojo.nombre} className="px-5 py-5">
              <p className="flex items-center gap-2.5 font-bold text-secondary-950">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary-600 font-titulo text-meta text-white shadow-brillo">
                  {ojo.sigla}
                </span>
                {ojo.nombre}
              </p>
              <dl className="cifras mt-4 grid grid-cols-4 gap-1 text-center">
                {columnas.map((c) => (
                  <div key={c}>
                    <dt>
                      <button
                        type="button"
                        onClick={() => setElegida(elegida === c ? null : c)}
                        aria-pressed={elegida === c}
                        className={cn(
                          "inline-flex min-h-9 items-center rounded-full px-2 text-meta font-semibold underline decoration-dotted underline-offset-4 transition-colors",
                          elegida === c ? "bg-primary-600 text-white no-underline shadow-brillo" : "text-secondary-700 hover:bg-primary-50 hover:text-secondary-950",
                        )}
                      >
                        {t.columnas[c].etiqueta}
                      </button>
                    </dt>
                    <dd className="mt-1.5 font-titulo text-bloque font-bold text-secondary-950">{valor(ojo.datos, c)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
          <p className="flex items-center justify-between gap-3 bg-primary-50 px-5 py-3.5 text-meta">
            <span className="text-muted-foreground">{t.distanciaPupilar}</span>
            <span className="cifras font-bold text-secondary-950">{r.distanciaPupilar} mm</span>
          </p>
        </div>
      </article>

      <div role="status" className="mt-4 min-h-14">
        {elegida ? (
          <Nota key={elegida} tono="info" titulo={t.columnas[elegida].etiqueta}>
            {t.columnas[elegida].ayuda}
          </Nota>
        ) : (
          <p className="px-1 text-meta text-muted-foreground">{t.ayudaToque}</p>
        )}
      </div>
      <p className="mt-2 text-meta text-muted-foreground">
        {t.profesional} {r.profesional}
      </p>
    </PantallaApp>
  );
}
