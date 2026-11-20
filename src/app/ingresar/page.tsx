import type { Metadata } from "next";
import { FormAcceso } from "@/components/acceso/form-acceso";
import { acceso } from "@/content/optihelp";

export const metadata: Metadata = { title: acceso.ingreso.titulo };

export default function IngresarPage() {
  return <FormAcceso modo="ingreso" />;
}
