import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Currículo com IA — Gerador Profissional",
  description:
    "Descreva suas experiências em linguagem natural e deixe a IA criar um currículo profissional em PDF para você. Gratuito, sem cadastro.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
