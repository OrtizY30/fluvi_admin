import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";
import Image from "next/image";

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

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center pt-8">
      {/* Logo */}
      <div className="flex justify-center w-full flex-col items-center">
        <div className="relative w-96 h-20 md:w-96 ">
          <Image src={"/logo-fluvi.svg"} fill alt="logo fluvi" priority />
        </div>

        {/* Formulario */}
      
          <RegisterForm /> 
        
      </div>

      {/* Link de login */}
      <nav className=" w-full flex pb-4 justify-center">
        <Link
          href="/auth/login"
          className="text-sm sm:text-base text-white text-center hover:underline transition"
        >
          ¿Ya tienes una cuenta?{" "}
          <span className="font-semibold">Inicia Sesión</span>
        </Link>
      </nav>
    </div>
  );
}
