import type { Metadata } from "next";
import { FormPerfil } from "./form-perfil";

export const metadata: Metadata = { title: "Sus datos" };

export default function PerfilPage() {
  return <FormPerfil />;
}
