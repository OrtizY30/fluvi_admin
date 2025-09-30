

import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Fluvi - Recupera tu Contraseña",
  description: "¿Olvidaste tu contraseña? Recupera el acceso a tu cuenta de Fluvi y continúa gestionando tu restaurante sin interrupciones.",
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
    <div>
      <h1>¿Olvidaste tu Contraseña?</h1>
      <ForgotPasswordForm />
    </div>
  );
}