import type { Metadata } from "next";
import { Nunito } from "next/font/google"; 
import "./globals.css";

// ✅ Importa Poppins en lugar de Roboto
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"], // los pesos que quieras usar
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo-gota.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="es">
      <body className={`${nunito.className} antialiased`}>
       
       {children}
      </body>
    </html>
  );
}
