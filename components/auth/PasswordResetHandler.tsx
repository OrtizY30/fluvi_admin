"use client";

import { useState } from "react";
import ValidateTokenForm from "./ValidateTokenForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function PasswordRestHandler() {
  const [token, setToken] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  return (
    <div className=" w-full max-w-md mx-4 space-y-5 bg-surface-base border-gray-100 border shadow-xs shadow-black/50  rounded-md  py-6 ">
      {!isValidToken ? (
        <ValidateTokenForm
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <ResetPasswordForm token={token} />
      )}
    </div>
  );
}
