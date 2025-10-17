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
    <div className="flex  flex-col  items-center justify-between gap-6 mx-auto w-full">
      {/* Logo */}
      <div className=" pt-6 flex items-center justify-end flex-col">
        <div className="w-[400px] h-20 relative ">
          <Image src={"/logo-fluvi.svg"} fill alt="logo fluvi" />
        </div>
        <p className="text-white text-center font-bold">Tu mejor opción</p>
      </div>

      {/* Formulario */}
      <div className="bg-white p-7 w-full max-w-md rounded-t-4xl">
        <RegisterForm />

        {/* Link de login */}
        <nav className=" w-full flex pb-4 justify-center">
          <Link
            href="/auth/login"
            className="text-xs text-right mt-3 font-bold text-gray-600 hover:underline" >
            ¿Ya tienes una cuenta?{" "}
            <span className="text-brand-primary font-black">Inicia Sesión</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
