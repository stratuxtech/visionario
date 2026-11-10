import type { Metadata } from "next";
import { navegacion } from "@/content/visionario";
import { MisPagos } from "./mis-pagos";

export const metadata: Metadata = { title: navegacion.titulos.pagos };

export default function PagosPage() {
  return <MisPagos />;
}
