import ToastNotification from "@/components/ui/ToastNotification";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://fluvi.shop/auth"),
  icons: {
    icon: "/fluvi.png",
  },
  title: "Fluvi - Panel de Administración",
  description:
    "Gestiona productos, categorías y más desde tu panel de administración.",
  openGraph: {
    title: "Panel de Administración de Fluvi",
    description: "Fluvi, la mejor manera de vender tus productos por WhatsApp.",
    url: "https://fluvi.shop/auth", // usa URL completa
    siteName: "Fluvi Admin",
    images: [
      {
        url: "/fluvi.png",
        width: 800,
        height: 600,
        alt: "Fluvi Admin Logo",
      },
    ],
    locale: "es_419", // suponiendo que es para Colombia
    type: "website",
  },
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full mx-auto  min-h-screen bg-gradient-to-b from-brand-primary overflow-hidden to-brand-primary/70 ">
        <div className="max-w-3xl flex items-center justify-center mx-auto">
          {children}
        </div>
      </div>

      <ToastNotification />
    </>
  );
}
