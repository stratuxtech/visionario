import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { pantallas, rutas } from "@/content/visionario";
import { Logo } from "@/components/marca/logo";

/**
 * Índice del prototipo (demo): acceso directo a cada pantalla.
 *
 */
export const metadata = { title: "Mapa del prototipo" };

export default function MapaPrototipo() {
  const fases = [2, 3, 4, 5];
  const nombresFase: Record<number, string> = {
    2: "Descubrimiento y agenda",
    3: "Compra",
    4: "Panel post-compra",
    5: "Fidelización",
  };

  return (
    <main className="contenedor-flujo pt-6 pb-16">
      <Logo prioridad />

      <header className="mt-14 mb-10 space-y-4">
        <h1 className="text-titular">Mapa del prototipo</h1>
        <p className="max-w-prose text-entrada text-secondary-700">
          Índice de todas las pantallas del prototipo, ordenadas por fase. Use el simulador «Demo» para recorrer el flujo completo.
        </p>
      </header>

      <Link
        href={rutas.sistema}
        className="group mb-12 flex items-center justify-between gap-4 rounded-lg bg-secondary-950 px-5 py-5 text-white no-underline shadow-md transition-transform hover:-translate-y-0.5"
      >
        <span>
          <span className="block font-titulo text-bloque font-medium">Sistema visual</span>
          <span className="block text-meta text-secondary-200">Tokens, tipografía y componentes base para validar</span>
        </span>
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={24}
          strokeWidth={2}
          aria-hidden
          className="shrink-0 transition-transform group-hover:translate-x-1"
        />
      </Link>

      <div className="space-y-10">
        {fases.map((fase) => (
          <section key={fase} aria-labelledby={`fase-${fase}`}>
            <h2 id={`fase-${fase}`} className="mb-3 text-bloque font-sans font-semibold">
              Fase {fase} · {nombresFase[fase]}
            </h2>
            <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
              {pantallas
                .filter((p) => p.fase === fase)
                .map((p) => (
                  <li key={p.ruta}>
                    <Link
                      href={rutas[p.ruta]}
                      className="flex min-h-toque items-center justify-between gap-4 px-4 py-3 text-secondary-900 no-underline hover:bg-accent"
                    >
                      <span className="font-semibold">{p.titulo}</span>
                      <span className="cifras shrink-0 text-meta text-muted-foreground">{rutas[p.ruta]}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
