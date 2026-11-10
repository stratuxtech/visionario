/**
 * QR DE DEMOSTRACIÓN. Dibuja un patrón con forma de QR (no codifica nada).
 * En producción lo reemplaza el QR dinámico de la pasarela.
 */
export function CodigoQR({ semilla, etiqueta }: { semilla: string; etiqueta: string }) {
  const n = 25;
  let h = 2166136261;
  for (const c of semilla) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  const azar = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return (h >>> 0) / 4294967296;
  };

  const enBuscador = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8);

  const celdas: [number, number][] = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!enBuscador(x, y) && azar() > 0.5) celdas.push([x, y]);

  const buscador = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={7} height={7} rx={1.2} fill="var(--color-secondary-950)" />
      <rect x={x + 1} y={y + 1} width={5} height={5} rx={0.8} fill="var(--color-white)" />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.6} fill="var(--color-secondary-950)" />
    </g>
  );

  return (
    <figure className="relative mx-auto w-full max-w-64">
      <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} role="img" aria-label={etiqueta} className="w-full rounded-xl bg-white p-2 shadow-md ring-1 ring-secondary-950/5">
        {celdas.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x + 0.08} y={y + 0.08} width={0.84} height={0.84} rx={0.2} fill="var(--color-secondary-950)" />
        ))}
        {buscador(0, 0)}
        {buscador(n - 7, 0)}
        {buscador(0, n - 7)}
      </svg>
    </figure>
  );
}
