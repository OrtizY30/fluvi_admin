import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Fluvi - Vende Más con tu Menú Digital y Ten Control Total de tu Restaurante",
  description:
    "Crea tu menú digital en minutos y recibe pedidos por WhatsApp, crea tu propia app para domicilios. Fluvi es la mejor solución, fácil y rápida para restaurantes que quieran vender más y tener control total desde un panel administrativo.",
  icons: {
    icon: "/logo-gota.svg",
  },
  openGraph: {
   title: "Crea tu propia app de delivery y aumenta tus ventas hasta un 40% con Fluvi 🚀",
    description:
      "Fluvi te permite tener tu propio menú digital tipo app de delivery, recibir pedidos por WhatsApp y controlar todo desde un panel administrativo. ¡Tu restaurante, a otro nivel!",
    url: "https://fluvi.site", // Cambia esto por tu dominio real
    siteName: "Fluvi",
    images: [
      {
        url: "/og-fluvi.png", // Reemplaza con la ruta real de tu imagen
        width: 1200,
        height: 630,
        alt: "Fluvi - Menú digital para restaurantes",
      },
    ],
    type: "website",
    locale: "es_419",
  },
  robots: {
    index: true,
    follow: true,
  },
   alternates: {
    canonical: "https://fluvi.app", // ✅ Canonical correcta
  },
  
  category: "restaurantes, tecnología, software SaaS",
  keywords: ["menú digital", "app", "delivery", "qr", "pedidos WhatsApp", "software para restaurantes", "Fluvi"],
 
  twitter: {
    card: "summary_large_image",
    title:
      "Fluvi – Vende Más con tu Menú Digital y Ten Control Total de tu Restaurante",
    description:
      "Fluvi te ayuda a crear tu menú digital, recibir pedidos por WhatsApp y controlar tu restaurante fácilmente desde un panel administrativo.",
    images: ["/og-fluvi.png"], // Usa misma imagen de OG
  },
};

export default function Home() {
  return (
   <>hola mundo en next js</>
  );
}
