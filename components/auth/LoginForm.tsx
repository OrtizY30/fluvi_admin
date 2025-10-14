"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { authenticate } from "@/actions/auth/authenticate-user-action";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [checkTyC, setCheckTyC] = useState(false);
  const [state, dispatch, isPending] = useActionState(authenticate, {
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
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error!} />);
      });
    }
    router.refresh();
    // if(state.success)
  }, [state, router]);

  return (
    <form action={dispatch} className=" w-full  space-y-5 " noValidate>
      <div className="flex flex-col gap-2">
        <label className="label-input " htmlFor="email">
          Correo
        </label>
        <input
          className="border p-3 bg-white text-gray-700 rounded-3xl w-full border-gray-300 focus:outline-none"
          type="text"
          name="email"
          placeholder="tucorreo@ejemplo.com"
          defaultValue={state.data.email}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="label-input " htmlFor="password">
          Contraseña
        </label>

        <div className="border flex items-center rounded-3xl  w-full bg-white  border-gray-300 focus:outline-none pr-2">
          <input
            className="border-none text-gray-800 p-3   w-full focus:outline-none"
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
              <EyeIcon className="text-gray-400 size-5" />
            ) : (
              <EyeSlashIcon className="text-gray-400 size-5" />
            )}
          </div>
        </div>
        <Link
          href="/auth/forgot-password"
          className="text-xs text-right font-bold text-gray-600 hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <div className="py-4">
        <label
          id="tyc"
          className="text-sm space-x-2 flex items-center text-gray-500"
          htmlFor="tyc"
        >
          <input
            onChange={(e) => setCheckTyC(e.target.checked)}
            className="rounded-full accent-brand-primary"
            title="Terminos y condiciones"
            type="checkbox"
            name="tyc"
            id=""
          />
          <p> Acepto todos los terminos y condiciones</p>
        </label>
      </div>

      <input
        disabled={isPending || !checkTyC}
        type="submit"
        value={isPending ? "Cargando..." : "Iniciar Sesión"}
        className={`
            bg-brand-primary
            ${isPending ? "opacity-50 cursor-not-allowed" : ""}
            hover:bg-red-800
            w-full
            disabled:opacity-60
            p-3
            rounded-3xl
            text-white
            font-semibold
            text-sm sm:text-base
            cursor-pointer
          `}
      />
    </form>
  );
}
