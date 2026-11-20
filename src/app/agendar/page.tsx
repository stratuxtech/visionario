import type { Metadata } from "next";
import { agenda } from "@/content/optihelp";
import { Agenda } from "./agenda";

export const metadata: Metadata = { title: agenda.titulo };

export default function AgendarPage() {
  return <Agenda />;
}
