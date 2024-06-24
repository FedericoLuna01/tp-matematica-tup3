import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tp matemática Tup 3",
  description: "Tp matemática Tup 3 - Dibujar diagramas de venn y operaciones simples de conjuntos",
  icons: {
    icon: "/favicon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className}`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <Navbar />
        {children}
        <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
