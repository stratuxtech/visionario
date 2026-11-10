import type { Metadata } from "next";
import { avisos } from "@/content/visionario";
import { ListaAvisos } from "./lista-avisos";

export const metadata: Metadata = { title: avisos.titulo };

export default function NotificacionesPage() {
  return <ListaAvisos />;
}
