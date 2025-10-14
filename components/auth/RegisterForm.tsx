"use client";

import { useActionState, useEffect, useState } from "react";
import {
  ActionStateType,
  register,
} from "@/actions/auth/create-account-action";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import CountrySelect from "../ui/CountrySelect";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "lucide-react";

const initialState: ActionStateType = {
  errors: [],
  success: "",
  data: {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    subscriptionType: "",
    phone: "",
    country: "",
  },
};

export default function RegisterForm() {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(register, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error} />);
      });
    }
    if (state.success) {
      toast.success(<FluviToast type={"success"} msg={state.success} />, {
        autoClose: 3000,
        onClose: () => {
          router.push("/auth/login");
          router.refresh();
        },
      });
    }
  }, [state, router]);

  return (
    <div className=" w-full p-4 flex items-center justify-center">
      <form
        className="
          w-full
          space-y-5
        "
        noValidate
        action={dispatch}
      >
        {/* Nombre */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm sm:text-base " htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            className="border p-3 bg-white text-gray-700 rounded-3xl w-full border-gray-300 focus:outline-none"
            name="name"
            placeholder="Nombre del negocio"
            defaultValue={
              typeof state.data.name === "string" ? state.data.name : ""
            }
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="label-input " htmlFor="email">
            Correo
          </label>
          <input
            className="border p-3 bg-white text-gray-700 rounded-3xl w-full border-gray-300 focus:outline-none"
            type="text"
            name="email"
            placeholder="tucorreo@ejemplo.com"
            defaultValue={
              typeof state.data.email === "string" ? state.data.email : ""
            }
          />
          {/* <Input
            type="text"
            name="email"
            placeholder="Email"
            defaultValue={
              typeof state.data.email === "string" ? state.data.email : ""
            }
          /> */}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm sm:text-base " htmlFor="password">
            Contraseña
          </label>

          <div className="border flex items-center rounded-3xl  w-full bg-white  border-gray-300 focus:outline-none pr-2">
            <input
              className="border-none text-gray-800 p-3   w-full focus:outline-none"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="*********"
              defaultValue={
                typeof state.data.password === "string"
                  ? state.data.password
                  : ""
              }
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
          {/* <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            defaultValue={
              typeof state.data.password === "string" ? state.data.password : ""
            }
          /> */}
        </div>

        {/* Confirmar contraseña */}

        <div className="flex flex-col gap-2">
          <label
            className="font-bold text-sm sm:text-base "
            htmlFor="password_confirmation"
          >
            Repetir contraseña
          </label>

          <div className="border flex items-center rounded-3xl  w-full bg-white  border-gray-300 focus:outline-none pr-2">
            <input
              className="border-none text-gray-800 p-3   w-full focus:outline-none"
              type={showPassword ? "text" : "password"}
              name="password_confirmation"
              placeholder="*********"
              defaultValue={
                typeof state.data.password_confirmation === "string"
                  ? state.data.password_confirmation
                  : ""
              }
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

          {/* <Input
            type="password"
            name="password_confirmation"
            placeholder="Confirmar contraseña"
            defaultValue={
              typeof state.data.password_confirmation === "string"
                ? state.data.password_confirmation
                : ""
            }
          /> */}
        </div>

        {/* Tipo de suscripción */}
        <div className="flex flex-col gap-1">
          <label
            className="font-bold text-sm sm:text-base "
            htmlFor="subscriptionType"
          >
            Tipo de Suscripción
          </label>
          <select
            id="subscriptionType"
            name="subscriptionType"
            className="w-full border text-[16px] border-gray-300 bg-white p-3 rounded-3xl"
            required
            defaultValue={
              typeof state.data.subscriptionType === "string"
                ? state.data.subscriptionType
                : ""
            }
          >
            <option value="">Selecciona una opción</option>
            <option value="free">Free</option>
            <option value="simple">Simple</option>
            <option value="pro">Pro</option>
          </select>
        </div>

        {/* Teléfono */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm sm:text-base " htmlFor="phone">
            Teléfono
          </label>
          <PhoneInput
            name="phone"
            defaultCountry="CO"
            international
            defaultValue={
              typeof state.data.phone === "string" && state.data.phone !== ""
                ? state.data.phone
                : undefined
            }
            className="w-full border border-gray-300 text-[16px] bg-white p-2 rounded-3xl focus:outline-none"
            onChange={() => {}}
          />
        </div>

        {/* País */}
        <div className="flex flex-col gap-1">
          <CountrySelect
            defaultValue={state.data.country || ""}
            name="country"
          />
        </div>

        {/* Botón */}
        <input
          disabled={isPending}
          type="submit"
          value={isPending ? "Cargando..." : "Registrarme"}
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
    </div>
  );
}
