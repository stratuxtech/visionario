import type { Metadata } from "next";
import { catalogo } from "@/content/visionario";
import { Catalogo } from "./catalogo";

export const metadata: Metadata = { title: catalogo.titulo };

export default function MonturasPage() {
  return <Catalogo />;
}
