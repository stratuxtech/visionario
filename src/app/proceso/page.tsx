import type { Metadata } from "next";
import { proceso } from "@/content/visionario";
import { Carrusel } from "./carrusel";

export const metadata: Metadata = { title: proceso.titulo };

export default function ProcesoPage() {
  return <Carrusel />;
}
