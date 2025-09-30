import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fluvi | Crear Cuenta – Empieza a Vender con tu Menú Digital",
  description:
    "Regístrate en Fluvi y gestiona tu restaurante con un panel administrativo completo. Crea tu menú digital y recibe pedidos por WhatsApp fácil y rápido.",
  keywords: [
    "registro restaurante",
    "menú digital",
    "ventas por WhatsApp",
    "fluvi",
    "panel administrativo restaurante",
    "software para restaurantes",
    "crear menú digital",
  ],
  icons: {
    icon: "/logo_fluvi.svg",
  },
};
export default function registerPage() {
 
  return (
    <div>
      <h1>Registro</h1>
      <RegisterForm />

       <nav className="">
       
        <Link href="/auth/login" className="text-sm text-blue-500 hover:underline">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
      </nav>
    </div>
  );
}
