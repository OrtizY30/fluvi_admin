import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fluvi - Recupera tu Contraseña",
  description:
    "¿Olvidaste tu contraseña? Recupera el acceso a tu cuenta de Fluvi y continúa gestionando tu restaurante sin interrupciones.",
  keywords: [
    "recuperar contraseña",
    "olvidé mi contraseña",
    "fluvi login",
    "restablecer contraseña restaurante",
    "gestión de menú digital",
    "fluvi acceso cuenta",
  ],
  icons: {
    icon: "/logo_fluvi.svg",
  },
};
export default function forgotPasswordPage() {
  return (
    <div className="flex flex-col pt-10 px-2 items-center justify-center gap-6 mx-auto w-full">
      <div className="w-[400px] h-20 relative ">
        <Image src={"/logo-fluvi.svg"} fill alt="logo fluvi" />
      </div>
      <h1 className="text-2xl font-black text-white">
        ¿Olvidaste tu Contraseña?
      </h1>
      <ForgotPasswordForm />
    </div>
  );
}
