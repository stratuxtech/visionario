import type { Metadata } from "next";
import { FormAcceso } from "@/components/acceso/form-acceso";
import { acceso } from "@/content/visionario";

export const metadata: Metadata = { title: acceso.registro.titulo };

export default function RegistroPage() {
  return <FormAcceso modo="registro" />;
}
