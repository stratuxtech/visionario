import type { Metadata } from "next";
import { orden } from "@/content/visionario";
import { DetalleOrden } from "./detalle-orden";

export const metadata: Metadata = { title: orden.titulo };

export default function OrdenPage() {
  return <DetalleOrden />;
}
