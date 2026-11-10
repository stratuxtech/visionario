import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { EyeIcon } from "@hugeicons/core-free-icons";
import { ChipFlotante } from "@/components/ui/chip-flotante";

type Chip = { icono?: IconSvgElement; emoji?: string; texto?: string; tono?: "azul" | "exito" | "oro" | "blanco" };

/* Posiciones fijas de los chips alrededor del círculo central */
const lugares = ["-top-8 -left-16", "bottom-6 -right-24", "-bottom-10 -left-10"];
const giros = [-6, 5, -3];

/**
 * Estado vacío con vida: un círculo blanco con el ícono del tema, anillos
 * que respiran y chips que flotan alrededor (lo que va a aparecer aquí).
 * Siempre centrado en el espacio libre de la pantalla.
 */
export function EstadoVacio({
  titulo,
  texto,
  icono = EyeIcon,
  chips = [],
  children,
}: {
  titulo: string;
  texto: string;
  icono?: IconSvgElement;
  chips?: Chip[];
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 pt-8 pb-10 text-center">
      <div className="relative size-44" aria-hidden>
        <span className="absolute inset-0 animate-[latido_3.2s_var(--ease-salida)_infinite] rounded-full bg-primary-200/60 motion-reduce:hidden" />
        <span className="absolute -inset-3 animate-girar rounded-full border-2 border-dashed border-primary-200" />
        <span className="absolute inset-0 rounded-full bg-linear-to-b from-white to-primary-50 shadow-lg ring-1 ring-primary-100" />
        <span className="absolute inset-7 flex animate-confirmar items-center justify-center rounded-full bg-primary-600 text-white shadow-brillo">
          <HugeiconsIcon icon={icono} size={52} strokeWidth={1.6} />
        </span>
        {chips.slice(0, 3).map((c, i) => (
          <ChipFlotante key={i} {...c} retraso={300 + i * 180} giro={giros[i]} className={lugares[i]} />
        ))}
      </div>
      <h2 className="mt-16 animate-aparecer font-titulo text-bloque [animation-delay:150ms] lg:text-[1.5rem]">{titulo}</h2>
      <p className="mt-2 max-w-sm animate-aparecer text-secondary-700 [animation-delay:250ms]">{texto}</p>
      {children && <div className="mt-7 w-full max-w-sm animate-aparecer [animation-delay:350ms]">{children}</div>}
    </div>
  );
}
