import type { Metadata } from "next";
import { Inicio } from "./inicio";

export const metadata: Metadata = { title: "Mi estado" };

export default function PanelPage() {
  return <Inicio />;
}
