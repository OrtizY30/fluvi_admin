import PasswordRestHandler from "@/components/auth/PasswordResetHandler";
import Logotipo from "@/components/ui/Logotipo";
import React from "react";

export default function newPasswordPage() {
  return (
    <div className="flex flex-col pt-10 px-2 items-center justify-center gap-6 mx-auto w-full">
      <Logotipo/>

      <h1 className="text-2xl font-black text-white">
        Reestablece tu contraseña
      </h1>
      

      <PasswordRestHandler />
    </div>
  );
}
