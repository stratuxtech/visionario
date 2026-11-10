import { Suspense } from "react";
import type { Metadata } from "next";
import { PagarCuota } from "./pagar-cuota";

export const metadata: Metadata = { title: "Pagar cuota" };

export default function PagoPage() {
  return (
    <Suspense>
      <PagarCuota />
    </Suspense>
  );
}
