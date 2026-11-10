"use client";

import { useApp } from "@/lib/estado";
import { iniciales } from "@/lib/foto";
import { cn } from "@/lib/utils";

/** Foto de perfil de la persona. Si aún no hay foto, sus iniciales: nunca queda vacío. */
export function Avatar({ className, alt = "" }: { className?: string; alt?: string }) {
  const foto = useApp((s) => s.perfil.foto);
  const nombre = useApp((s) => s.perfil.nombre);
  return (
    <span
      className={cn(
        "relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100 font-titulo font-bold text-primary-900",
        className,
      )}
    >
      {foto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={foto} alt={alt} className="size-full object-cover" />
      ) : (
        <span aria-hidden>{iniciales(nombre) || "·"}</span>
      )}
    </span>
  );
}
