"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { authenticate } from "@/actions/auth/authenticate-user-action";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function LoginForm() {
  const [state, dispatch] = useActionState(authenticate, {
    errors: [],
    data: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (state.errors) {
      console.log(state);
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error!} />);
      });
    }

    // if(state.success)
  }, [state]);

  return (
    
      <form action={dispatch} className="bg-surface-base border-gray-100 p-8 rounded-lg shadow-md mx-auto w-md space-y-5 " noValidate>
        <div className="flex flex-col">
          <label className="label-input" htmlFor="email">
            Dirección de correo
          </label>
          <input
            className="border p-3 shadow text-gray-700 rounded-lg w-full border-gray-300 focus:outline-none"
            type="text"
            name="email"
            placeholder="tucorreo@gmail.com"
            defaultValue={state.data.email}
          />
        </div>

        <div className="flex flex-col">
          <label className="label-input" htmlFor="password">
            Contraseña
          </label>

          <div className="border flex items-center rounded-lg w-full border-gray-300 focus:outline-none shadow">
            <input
              className="border-none text-gray-800 p-3  w-full focus:outline-none"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="*********"
              defaultValue={state.data.password}
            />
            <div
              onClick={handleClickShowPassword}
              className="pr-2 cursor-pointer"
            >
              {showPassword ? (
                <EyeIcon className="text-gray-400 size-6" />
              ) : (
                <EyeSlashIcon className="text-gray-400 size-6" />
              )}
            </div>
          </div>
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-brand-primary hover:bg-red-900 transition-all w-full p-2 rounded-md text-white font-bold text-md cursor-pointer"
        />
      </form>
   
  );
}
