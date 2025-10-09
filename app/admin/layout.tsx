
import Sidebar from "@/components/admin/Sidebar";
import { verifySession } from "@/src/auth/dal";
import SetUserClient from "@/components/setUserClient";
import { Metadata } from "next";
import ToastNotification from "@/components/ui/ToastNotification";

export const metadata: Metadata = {
  metadataBase: new URL("https://fluvi.shop/admin"),
  title: "Fluvi - Panel de Administración",
  description:
    "Gestiona productos, categorías y más desde tu panel de administración.",
  openGraph: {
    title: "Panel de Administración de Fluvi",
    description:
      "Accede al panel para gestionar tu menú digital, pedidos por WhatsApp, productos, horarios y más.",
    url: "https://fluvi.shop/admin/productos", // usa URL completa
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
  icons: {
    icon: "/fluvi.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Panel de Administración de Fluvi",
    description:
      "Gestiona tu restaurante en minutos desde cualquier lugar con Fluvi.",
    images: ["/fluvi.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, modifiers, horaries, socialMedia, business } = await verifySession();

  if(!business) return

  return (
    <div className="overflow-hidden flex-col max-h-screen flex h-screen bg-brand-primary">
      <SetUserClient business={business} socialMedia={socialMedia} horaries={horaries} modifiers={modifiers} user={user} />
      {/* Sidebar */}
        {/* <Header /> */}

      <div className="w-full flex-1 flex overflow-hidden">
      <Sidebar />
        {children}
      </div>

       <ToastNotification/>
    </div>
  );
}
