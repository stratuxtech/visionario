import { contrato } from "@/content/optihelp";
import type { LadoCarnet } from "@/lib/estado";
import { cn } from "@/lib/utils";

/**
 * Dibujo genérico de un carnet para la cámara simulada (demo). No copia el
 * diseño del carnet real: solo una tarjeta con foto, líneas de datos y, atrás,
 * la huella y un código de barras. Lleva la marca "Ejemplo".
 */
export function CarnetDemo({ lado, className }: { lado: LadoCarnet; className?: string }) {
  return (
    <svg viewBox="0 0 856 540" role="img" aria-label={`${contrato.datos.fotos.lados[lado].camara} (${contrato.camara.ejemplo})`} className={cn("h-auto w-full", className)}>
      <defs>
        <linearGradient id={`fondo-${lado}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eaf3fb" />
          <stop offset="1" stopColor="#f5efe2" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="848" height="532" rx="36" fill={`url(#fondo-${lado})`} stroke="#c9d6e3" strokeWidth="4" />
      <rect x="4" y="4" width="848" height="84" rx="36" fill="#cfe2f3" />
      <rect x="4" y="52" width="848" height="36" fill="#cfe2f3" />
      <rect x="48" y="34" width="300" height="20" rx="10" fill="#8fb3d4" />
      <rect x="640" y="34" width="168" height="20" rx="10" fill="#b6cde3" />

      {lado === "anverso" ? (
        <>
          {/* Foto */}
          <rect x="48" y="128" width="220" height="276" rx="20" fill="#dbe6f0" stroke="#b9c9d8" strokeWidth="3" />
          <circle cx="158" cy="232" r="52" fill="#a9bccd" />
          <path d="M70 404c8-70 46-104 88-104s80 34 88 104z" fill="#a9bccd" />
          {/* Datos */}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x="312" y={136 + i * 58} width="120" height="14" rx="7" fill="#a8bccf" />
              <rect x="312" y={158 + i * 58} width={[400, 320, 360, 240, 300][i]} height="20" rx="10" fill="#6f8aa3" />
            </g>
          ))}
          {/* Número de carnet */}
          <rect x="48" y="440" width="280" height="30" rx="15" fill="#355a7d" />
        </>
      ) : (
        <>
          {/* Huella */}
          <g fill="none" stroke="#8ea6bd" strokeWidth="6" strokeLinecap="round">
            {[18, 34, 50, 66, 82].map((r) => (
              <ellipse key={r} cx="158" cy="250" rx={r * 0.78} ry={r} />
            ))}
          </g>
          <rect x="60" y="372" width="196" height="14" rx="7" fill="#a8bccf" />
          {/* Datos */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="312" y={136 + i * 58} width="140" height="14" rx="7" fill="#a8bccf" />
              <rect x="312" y={158 + i * 58} width={[420, 300, 380, 260][i]} height="20" rx="10" fill="#6f8aa3" />
            </g>
          ))}
          {/* Código de barras */}
          <g fill="#2f4a63">
            {Array.from({ length: 26 }, (_, i) => (
              <rect key={i} x={312 + i * 10.6} y="392" width={i % 3 === 0 ? 6 : i % 2 === 0 ? 4 : 2.5} height="72" />
            ))}
          </g>
        </>
      )}

      {/* Marca de ejemplo */}
      <g transform="rotate(-12 690 470)">
        <rect x="590" y="438" width="210" height="58" rx="12" fill="none" stroke="#c2410c" strokeWidth="5" opacity="0.75" />
        <text x="695" y="480" textAnchor="middle" fontSize="34" fontWeight="800" fill="#c2410c" opacity="0.75" fontFamily="sans-serif" letterSpacing="4">
          {contrato.camara.ejemplo.toUpperCase()}
        </text>
      </g>
    </svg>
  );
}
