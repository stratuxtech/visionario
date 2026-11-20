import type { Metadata } from "next";
import { contrato } from "@/content/optihelp";
import { FirmaContrato } from "./firma-contrato";

export const metadata: Metadata = { title: contrato.titulo };

export default function ContratoPage() {
  return <FirmaContrato />;
}
