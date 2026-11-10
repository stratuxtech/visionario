import type { Metadata } from "next";
import { liquidacion } from "@/content/visionario";
import { Felicitacion } from "./felicitacion";

export const metadata: Metadata = { title: liquidacion.titulo };

export default function LiquidadoPage() {
  return <Felicitacion />;
}
