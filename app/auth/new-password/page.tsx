import PasswordRestHandler from "@/components/auth/PasswordResetHandler";
import React from "react";

export default function newPasswordPage() {
  return (
    <>
      <h1 className="font-black text-4xl text-purple-950">
        Reestablecer Password
      </h1>
      <p className="text-xl font-bold">
        Ingresa el código que recibiste
        <span className="text-amber-500"> por email</span>
      </p>

      <PasswordRestHandler />
    </>
  );
}
