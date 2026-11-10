import type { Metadata, Viewport } from "next";
import { cormorant, manrope, ubuntu } from "@/lib/fonts";
import { demo, marca } from "@/content/visionario";
import { Avisos } from "@/components/app/avisos";
import { Simulador } from "@/components/demo/simulador";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${marca.nombre} · Lentes a medida en 3 cuotas`, template: `%s · ${marca.nombre}` },
  description:
    "Lentes tallados a medida para medidas medianas y severas en Santa Cruz de la Sierra. Pague en 3 cuotas sin intereses con una joya de oro como garantía.",
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, title: marca.nombre, statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
  colorScheme: "light",
};

/**
 * Celular primero: la app vive en una columna de celular. En tablet la
 * columna se centra; desde 1024px ocupa la pantalla. El menú global
 * siempre vive abajo, como en una app.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-BO" className={`${ubuntu.variable} ${manrope.variable} ${cormorant.variable}`}>
      <body>
        {/* Fondo vivo: azul claro con dos manchas (azul y oro) que respiran */}
        <div className="fondo-vivo" aria-hidden />
        <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-x-clip md:max-w-2xl lg:max-w-none">
          {children}
        </div>
        <Avisos />
        {demo.activo && <Simulador />}
      </body>
    </html>
  );
}
