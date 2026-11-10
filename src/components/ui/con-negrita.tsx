import { Fragment } from "react";

/**
 * Pinta en negrita las palabras clave marcadas con **asteriscos** en el
 * archivo de contenido. Así la redacción sigue viviendo en un solo lugar.
 */
export function ConNegrita({ texto, claseNegrita }: { texto: string; claseNegrita?: string }) {
  const partes = texto.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {partes.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className={claseNegrita}>
            {p.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

/** Quita los asteriscos para usar el texto donde no cabe marcado (aria-label). */
export const sinMarcas = (texto: string) => texto.replace(/\*\*/g, "");

/**
 * Titular con una palabra destacada (Cormorant itálica con brillo azul):
 * una sola por titular, como pide docs/02_REFERENCIAS.md.
 */
export function Titular({
  partes,
}: {
  partes: { antes: string; resaltado: string; despues: string };
}) {
  return (
    <>
      {partes.antes} <span className="resaltado">{partes.resaltado}</span>
      {partes.despues ? ` ${partes.despues}` : null}
    </>
  );
}
