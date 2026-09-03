import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Black, Bebas_Neue } from "next/font/google";
import { MotionSystem } from "@/components/MotionSystem";
import "./globals.css";
import "./motion.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Co.becreator — Direção Criativa com IA",
  description:
    "Filmes e visuais para marcas, artistas e campanhas. Direção criativa, IA, imagem, movimento e edição.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#060606",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${archivoBlack.variable} ${bebas.variable}`}>
      <body>
        {children}
        <MotionSystem />
      </body>
    </html>
  );
}
