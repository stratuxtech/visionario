import localFont from "next/font/local";

/** Ubuntu · títulos y encabezados (estáticas del proyecto) */
export const ubuntu = localFont({
  src: [
    { path: "../../public/tipografias/Ubuntu/Ubuntu-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/tipografias/Ubuntu/Ubuntu-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/tipografias/Ubuntu/Ubuntu-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-ubuntu",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/** Manrope · cuerpo, formularios, cuotas y contratos (variable) */
export const manrope = localFont({
  src: "../../public/tipografias/Manrope/Manrope-VariableFont_wght.ttf",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/** Cormorant Garamond · solo destacados de impacto y agradecimiento */
export const cormorant = localFont({
  src: [
    {
      path: "../../public/tipografias/Cormorant_Garamond/CormorantGaramond-VariableFont_wght.ttf",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../../public/tipografias/Cormorant_Garamond/CormorantGaramond-Italic-VariableFont_wght.ttf",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});
