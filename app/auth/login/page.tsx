import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fluvi – Accede a tu Panel de Restaurante",
  description:
    "Ingresa a tu cuenta de Fluvi y gestiona tu menú digital, pedidos por WhatsApp y configuración del restaurante desde un solo lugar.",
  keywords: [
    "iniciar sesión restaurante",
    "login menú digital",
    "fluvi",
    "panel de control restaurante",
    "gestión de pedidos",
    "ventas por WhatsApp",
    "acceso clientes Fluvi",
  ],
  icons: {
    icon: "/logo_fluvi.svg",
  },
};
export default function loginPage() {
  return (
    <div className="flex  flex-col h-screen  items-center justify-between gap-6 mx-auto w-full">
      <div className="h-[25%] flex items-center justify-end flex-col">
        <div className="w-[400px] h-20 relative ">
          <Image src={"/logo-fluvi.svg"} fill alt="logo fluvi" />
        </div>
        <p className="text-white text-center font-bold">Tu mejor opción</p>
      </div>
      
      <div className="bg-white h-[70%] p-7 w-full max-w-md rounded-t-4xl">
        <LoginForm />
        <nav className="flex mt-6 flex-col items-center space-y-1">
          <Link
            href="/auth/register"
            className="text-xs text-right font-bold text-gray-600 hover:underline"
          >
            ¿No tienes una cuenta?.{" "}
            <span className="text-brand-primary font-black">Regístrate</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
