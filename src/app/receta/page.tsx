import type { Metadata } from "next";
import { navegacion } from "@/content/optihelp";
import { VerReceta } from "./ver-receta";

export const metadata: Metadata = { title: navegacion.titulos.receta };

export default function RecetaPage() {
  return <VerReceta />;
}
