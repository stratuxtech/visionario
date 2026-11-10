import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Calendar03Icon,
  GlassesIcon,
  NecklaceIcon,
  QrCode01Icon,
  SignatureIcon,
  MedicalFileIcon,
} from "@hugeicons/core-free-icons";
import { formularioPerfil, marca, negocio, rutas, textos } from "@/content/visionario";
import { Logo } from "@/components/marca/logo";
import { IsotipoCarga } from "@/components/marca/isotipo-carga";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EstadoCuota } from "@/components/ui/estado-cuota";
import { bs } from "@/lib/utils";
import { MuestraColor } from "./muestra-color";
import { DemoPasos, DemoProgreso } from "./demos-movimiento";

export const metadata: Metadata = { title: "Sistema visual" };

/* Clases literales para que Tailwind genere cada token */
const primario = [
  ["50", "bg-primary-50", "Fondos de contenedores, hover sutil"],
  ["100", "bg-primary-100", "Fondos secundarios"],
  ["200", "bg-primary-200", "Bordes activos, selección"],
  ["300", "bg-primary-300", "Iconografía secundaria"],
  ["400", "bg-primary-400", "Hover del botón principal"],
  ["500", "bg-primary-500", "Base de marca: botón principal y progreso"],
  ["600", "bg-primary-600", "Gráficos"],
  ["700", "bg-primary-700", "Anillo de foco"],
  ["800", "bg-primary-800", "Enlaces y estado pagada"],
  ["900", "bg-primary-900", "Texto sobre fondos cian claros"],
  ["950", "bg-primary-950", "Máximo contraste"],
] as const;

const secundario = [
  ["50", "bg-secondary-50", "Fondo de la aplicación"],
  ["100", "bg-secondary-100", "Paneles, botón secundario"],
  ["200", "bg-secondary-200", "Bordes y divisores"],
  ["300", "bg-secondary-300", "Decorativo, nunca texto"],
  ["400", "bg-secondary-400", "Decorativo, nunca texto"],
  ["500", "bg-secondary-500", "Borde de campos de formulario"],
  ["600", "bg-secondary-600", "Texto secundario y ayudas"],
  ["700", "bg-secondary-700", "Texto de apoyo, estado pendiente"],
  ["800", "bg-secondary-800", "Contorno de botón alternativo"],
  ["900", "bg-secondary-900", "Texto principal"],
  ["950", "bg-secondary-950", "Títulos y texto sobre cian"],
] as const;

function Seccion({ id, titulo, nota, children }: { id: string; titulo: string; nota?: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-border pt-10 pb-14">
      <h2 id={id} className="text-seccion">
        {titulo}
      </h2>
      {nota && <p className="mt-3 max-w-prose text-secondary-700">{nota}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

const iconosProceso = [
  { icono: Calendar03Icon, texto: "Cita" },
  { icono: GlassesIcon, texto: "Montura" },
  { icono: NecklaceIcon, texto: "Joya" },
  { icono: SignatureIcon, texto: "Firma" },
  { icono: QrCode01Icon, texto: "Pago QR" },
  { icono: MedicalFileIcon, texto: "Receta" },
];

export default function SistemaVisual() {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <header className="flex items-center justify-between gap-4 py-5">
        <Link href={rutas.inicio} className="rounded-sm" aria-label="Volver al mapa del prototipo">
          <Logo prioridad />
        </Link>
        <Button asChild variant="ghost" size="sm">
          <Link href={rutas.inicio}>
            <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} aria-hidden />
            Mapa
          </Link>
        </Button>
      </header>

      <main>
        <div className="pt-10 pb-14 sm:pt-16">
          <h1 className="max-w-3xl text-titular">Sistema visual de Visionario</h1>
          <p className="mt-5 max-w-prose text-entrada text-secondary-700">
            Fase 1 · Andamiaje. Tokens del brand system aplicados con los ajustes de accesibilidad aprobados. Esto no es
            el diseño de ninguna pantalla: es el material con el que se construirán.
          </p>
        </div>

        <Seccion
          id="color"
          titulo="Color"
          nota="Cian para actuar y avanzar; slate para estructura y lectura. Los números son el contraste real con texto blanco y con texto marino 950 (AA pide 4,5 para texto normal)."
        >
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-bloque">Primary · Cian</h3>
              <ul className="divide-y divide-border">
                {primario.map(([paso, clase, uso]) => (
                  <MuestraColor key={paso} paso={paso} clase={clase} uso={uso} />
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-bloque">Secondary · Slate</h3>
              <ul className="divide-y divide-border">
                {secundario.map(([paso, clase, uso]) => (
                  <MuestraColor key={paso} paso={paso} clase={clase} uso={uso} />
                ))}
              </ul>
            </div>
          </div>
        </Seccion>

        <Seccion
          id="tipografia"
          titulo="Tipografía"
          nota="Un título dominante por pantalla. Ubuntu para títulos, Manrope para todo lo que se lee y se toca, Cormorant solo para agradecer."
        >
          <dl className="space-y-9">
            <div>
              <dt className="mb-2 text-meta text-muted-foreground">H1 · Ubuntu Bold · 48px (36px en celular estrecho)</dt>
              <dd className="font-titulo text-titular text-secondary-950">Sus lentes a medida, en 3 cuotas</dd>
            </div>
            <div>
              <dt className="mb-2 text-meta text-muted-foreground">H2 · Ubuntu Medium · 32px</dt>
              <dd className="font-titulo text-seccion text-secondary-950">Sus próximas cuotas</dd>
            </div>
            <div>
              <dt className="mb-2 text-meta text-muted-foreground">H3 · Manrope SemiBold · 20px</dt>
              <dd className="text-bloque text-secondary-950">Valor estimado de su joya</dd>
            </div>
            <div>
              <dt className="mb-2 text-meta text-muted-foreground">Entrada · Manrope · 18px</dt>
              <dd className="max-w-prose text-entrada text-secondary-800">{formularioPerfil.campos.medidaEstimada.noSabe}</dd>
            </div>
            <div>
              <dt className="mb-2 text-meta text-muted-foreground">Cuerpo · Manrope Regular · 16px / 1,5</dt>
              <dd className="max-w-prose">
                {negocio.garantia.devolucion} {negocio.cancelaciones} El precio total se informa antes de firmar y no
                tiene intereses adicionales.
              </dd>
            </div>
            <div>
              <dt className="mb-2 text-meta text-muted-foreground">Metadato · Manrope Medium · 14px · cifras tabulares</dt>
              <dd className="cifras text-meta text-secondary-700">Cuota 2 de 3 · vence el 9 de diciembre de 2026 · {bs(450)}</dd>
            </div>
            <div>
              <dt className="mb-2 text-meta text-muted-foreground">Cifra · Ubuntu Bold · 40px</dt>
              <dd className="cifras font-titulo text-cifra text-secondary-950">{bs(1350)}</dd>
            </div>
            <div>
              <dt className="mb-2 text-meta text-muted-foreground">Destacado · Cormorant Garamond Italic · 24px</dt>
              <dd className="font-destacado text-destacado text-secondary-900 italic">
                Gracias por confiar en nosotros. Hoy sus lentes son completamente suyos.
              </dd>
            </div>
          </dl>
        </Seccion>

        <Seccion
          id="botones"
          titulo="Acciones"
          nota="Botón principal sólido en cian 500 con texto marino: la persona sabe exactamente dónde tocar. Altura mínima de 48px; 56px para la acción principal de cada pantalla."
        >
          <div className="max-w-md space-y-4">
            <Button size="lg" block>
              {textos.acciones.agendar}
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} aria-hidden />
            </Button>
            <Button variant="outline" size="lg" block>
              {textos.acciones.ingresar}
            </Button>
            <div className="flex flex-wrap gap-3">
              <Button>{textos.acciones.continuar}</Button>
              <Button variant="secondary">{textos.acciones.verCuotas}</Button>
              <Button variant="ghost">{textos.acciones.volver}</Button>
              <Button variant="link">{textos.acciones.borrarFirma}</Button>
              <Button disabled>{textos.acciones.pagarCuota}</Button>
            </div>
          </div>
        </Seccion>

        <Seccion
          id="formularios"
          titulo="Formularios"
          nota="Etiqueta siempre visible encima del campo; el ejemplo nunca reemplaza a la etiqueta. Los errores dicen qué pasó y cómo seguir."
        >
          <div className="max-w-md space-y-7">
            <div className="space-y-2">
              <Label htmlFor="demo-nombre">{formularioPerfil.campos.nombre.etiqueta}</Label>
              <Input id="demo-nombre" placeholder={formularioPerfil.campos.nombre.ejemplo} autoComplete="off" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-wa">{formularioPerfil.campos.whatsapp.etiqueta}</Label>
              <Input
                id="demo-wa"
                inputMode="numeric"
                defaultValue="7123"
                aria-invalid
                aria-describedby="demo-wa-error"
                autoComplete="off"
              />
              <p id="demo-wa-error" className="text-meta font-semibold text-destructive">
                {textos.errores.whatsapp}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-edad">{formularioPerfil.campos.edad.etiqueta}</Label>
              <Input id="demo-edad" inputMode="numeric" aria-describedby="demo-edad-ayuda" autoComplete="off" />
              <p id="demo-edad-ayuda" className="text-meta text-muted-foreground">
                {formularioPerfil.menorDeEdad}
              </p>
            </div>
          </div>
        </Seccion>

        <Seccion
          id="estados"
          titulo="Estados de pago"
          nota="Cada estado lleva icono y texto, nunca solo color. El rojo existe únicamente para vencimientos y errores."
        >
          <div className="space-y-10">
            <div className="flex flex-wrap gap-3">
              <EstadoCuota estado="pagada" />
              <EstadoCuota estado="pendiente" />
              <EstadoCuota estado="vencida" />
            </div>
            <div className="max-w-md rounded-lg bg-card p-5 shadow-sm">
              <DemoProgreso />
            </div>
          </div>
        </Seccion>

        <Seccion
          id="movimiento"
          titulo="Movimiento"
          nota="La animación explica o reconforta, nunca decora. Los pasos avanzan de izquierda a derecha, como en la óptica. Con «reducir movimiento» activado en el teléfono, todo cambia sin desplazarse."
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-card p-5 shadow-sm">
              <DemoPasos />
            </div>
            <div className="flex items-center justify-center rounded-lg bg-card p-8 shadow-sm">
              <IsotipoCarga etiqueta="Buscando horarios disponibles…" />
            </div>
          </div>
        </Seccion>

        <Seccion id="iconos" titulo="Iconos" nota="HugeIcons en SVG, trazo de 1,5 a 2px, siempre acompañados de texto.">
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {iconosProceso.map(({ icono, texto }) => (
              <li key={texto} className="flex flex-col items-center gap-2 rounded-lg bg-card py-5 text-secondary-900">
                <HugeiconsIcon icon={icono} size={28} strokeWidth={1.75} aria-hidden className="text-primary-800" />
                <span className="text-meta">{texto}</span>
              </li>
            ))}
          </ul>
        </Seccion>

        <Seccion id="forma" titulo="Forma y profundidad" nota="Radio de 0,5rem en controles; mayor en contenedores. Sombras suaves con desplazamiento, teñidas de marino.">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["rounded-md shadow-xs", "Control · md"],
              ["rounded-lg shadow-sm", "Tarjeta · lg"],
              ["rounded-xl shadow-md", "Panel · xl"],
              ["rounded-2xl shadow-lg", "Hoja · 2xl"],
            ].map(([clases, nombre]) => (
              <div key={nombre} className={`flex h-28 items-end bg-card p-4 text-meta text-secondary-800 ${clases}`}>
                {nombre}
              </div>
            ))}
          </div>
        </Seccion>

        <Seccion
          id="marca"
          titulo="Logo"
          nota="Barra superior: logo oficial sin el lema. Pie y tamaños grandes: lockup completo. El isotipo sirve como indicador de carga."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <figure className="flex flex-col justify-between gap-6 rounded-lg bg-card p-6">
              <Logo className="w-44" />
              <figcaption className="text-meta text-muted-foreground">Barra superior</figcaption>
            </figure>
            <figure className="flex flex-col justify-between gap-6 rounded-lg bg-card p-6">
              <Logo variante="completo" className="w-full max-w-64 md:w-full" />
              <figcaption className="text-meta text-muted-foreground">Pie y tamaños grandes</figcaption>
            </figure>
            <figure className="flex flex-col justify-between gap-6 rounded-lg bg-card p-6">
              <Image src={marca.logo.isotipo.src} width={80} height={80} alt="Isotipo de Visionario" className="size-20" />
              <figcaption className="text-meta text-muted-foreground">Isotipo</figcaption>
            </figure>
          </div>
        </Seccion>
      </main>
    </div>
  );
}
