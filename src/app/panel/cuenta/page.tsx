import type { Metadata } from "next";
import { cuenta } from "@/content/visionario";
import { MiCuenta } from "./mi-cuenta";

export const metadata: Metadata = { title: cuenta.titulo };

export default function CuentaPage() {
  return <MiCuenta />;
}
