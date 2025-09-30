import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
 title: "Fluvi – Accede a tu Panel de Restaurante",
  description: "Ingresa a tu cuenta de Fluvi y gestiona tu menú digital, pedidos por WhatsApp y configuración del restaurante desde un solo lugar.",
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
    <div className="flex flex-col items-center justify-center gap-6 bg-slate-50 mx-auto w-full h-screen">
 <div className="w-72 h-20 flex items-center justify-center">
          <Image
            src={"/Fluvisvg.svg"}
            width={200}
            height={160}
            alt="logo fluvi"
          />
        </div>
      <LoginForm />
      <nav className="flex flex-col items-center space-y-1">
        <Link href="/auth/forgot-password" className="text-sm text-blue-500 hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>
        <Link href="/auth/register" className="text-sm text-blue-500 hover:underline">
          ¿No tienes una cuenta?. <span className="text-brand-primary">Regístrate</span> 
        </Link>
      </nav>
    </div>
  );
}
