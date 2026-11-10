/** Reduce la foto a 256 px (recorte cuadrado) para guardarla en el navegador sin ocupar de más. */
export function reducirFoto(archivo: File): Promise<string> {
  return new Promise((resolver, rechazar) => {
    const img = new window.Image();
    img.onload = () => {
      const lado = 256;
      const c = document.createElement("canvas");
      c.width = lado;
      c.height = lado;
      const ctx = c.getContext("2d");
      if (!ctx) return rechazar();
      const m = Math.min(img.width, img.height);
      ctx.drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, lado, lado);
      resolver(c.toDataURL("image/jpeg", 0.85));
      URL.revokeObjectURL(img.src);
    };
    img.onerror = rechazar;
    img.src = URL.createObjectURL(archivo);
  });
}

/** "Rosa Mamani Flores" → "RM" */
export function iniciales(nombre: string) {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0] ?? "")
    .join("")
    .toUpperCase();
}
