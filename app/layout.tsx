import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trabalho Sistema de Currículos",
  description: "Aplicação Next.js para cadastro e gestão de currículos com validação e filtros em tempo real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-zinc-100 text-zinc-950">
        <SiteHeader />
        <div className="flex min-h-[calc(100vh-148px)] flex-col">{children}</div>
        <SiteFooter />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
