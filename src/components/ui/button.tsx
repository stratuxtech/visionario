import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

/**
 * Botones en píldora (referencia: Pling). La acción principal tiene un
 * resplandor del azul que crece en hover; al presionar, el botón se hunde.
 * Los botones de texto ocupan todo el ancho disponible salvo que se pida
 * lo contrario con `block={false}`.
 */
const buttonVariants = cva(
  [
    "group/boton relative inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-titulo font-bold whitespace-nowrap select-none no-underline",
    "transition-[background-color,color,box-shadow,transform] duration-300 ease-salida",
    "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] active:duration-100",
    "disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        /** Acción principal: azul 600 con texto blanco (5,7:1) y resplandor */
        default: "bg-primary text-primary-foreground shadow-brillo hover:bg-primary-hover hover:shadow-brillo-fuerte",
        /** Alternativa: blanca con borde de luz azul */
        outline:
          "bg-card text-primary-700 shadow-[inset_0_0_0_1.5px_var(--color-primary-200),var(--shadow-xs)] hover:bg-primary-50 hover:shadow-[inset_0_0_0_1.5px_var(--color-primary-400),var(--shadow-sm)]",
        /** Tenue, dentro de tarjetas */
        secondary: "bg-primary-50 text-primary-800 hover:bg-primary-100",
        /** Sobre tarjetas oscuras */
        claro: "bg-white text-secondary-950 shadow-md hover:bg-primary-50",
        /** Vidrio: sobre fotos o fondos con color */
        vidrio: "vidrio text-secondary-950 hover:bg-white",
        ghost: "text-secondary-800 hover:bg-secondary-100 hover:translate-y-0 active:bg-secondary-200",
        link: "text-enlace underline underline-offset-4 hover:translate-y-0 hover:text-primary-900",
        destructive: "bg-destructive text-destructive-foreground shadow-md hover:bg-alerta-700",
        exito: "bg-exito-700 text-white shadow-brillo-exito hover:bg-exito-800",
      },
      size: {
        /** 56px: acción principal de cada pantalla */
        lg: "h-14 w-full px-7 text-entrada [&_svg]:size-6",
        /** 48px: mínimo táctil del proyecto */
        default: "h-12 w-full px-6 text-cuerpo [&_svg]:size-5",
        sm: "h-10 px-4 text-meta [&_svg]:size-4",
        icon: "size-12 [&_svg]:size-6",
      },
      block: { true: "w-full", false: "w-auto" },
    },
    compoundVariants: [{ variant: "link", className: "h-auto w-auto px-0 py-1 shadow-none" }],
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  block,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp data-slot="button" data-variant={variant ?? "default"} className={cn(buttonVariants({ variant, size, block, className }))} {...props} />;
}

/**
 * La flecha del botón dentro de un chip (referencia: Stratux). En hover se
 * adelanta un poco: dice "esto avanza".
 */
function Flecha({ externa = false, className }: { externa?: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "-mr-2.5 flex size-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 ease-resorte group-hover/boton:translate-x-0.5",
        "group-data-[variant=outline]/boton:bg-primary-50 group-data-[variant=secondary]/boton:bg-white group-data-[variant=claro]/boton:bg-primary-50 group-data-[variant=vidrio]/boton:bg-primary-50",
        className,
      )}
    >
      <HugeiconsIcon icon={externa ? ArrowUpRight01Icon : ArrowRight01Icon} strokeWidth={2.25} className="size-4.5!" />
    </span>
  );
}

export { Button, Flecha, buttonVariants };
