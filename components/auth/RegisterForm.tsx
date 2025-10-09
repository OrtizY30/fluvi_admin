"use client";

import { useActionState, useEffect } from "react";
import {
  ActionStateType,
  register,
} from "@/actions/auth/create-account-action";
import Input from "@/components/ui/Input";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import CountrySelect from "../ui/CountrySelect";

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
        },
      });
    }
  }, [state, router]);

  return (
    <div className=" w-full p-4 flex items-center justify-center">
      <form
        className="
          bg-surface-base
          border border-gray-100
          p-4
          rounded-lg
          shadow-xs
          shadow-black/50
         
          w-full
          space-y-5
        "
        noValidate
        action={dispatch}
      >
        {/* Nombre */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm sm:text-base" htmlFor="name">
            Nombre
          </label>
          <Input
            type="text"
            name="name"
            placeholder="Nombre del negocio"
            defaultValue={
              typeof state.data.name === "string" ? state.data.name : ""
            }
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm sm:text-base" htmlFor="email">
            Email
          </label>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            defaultValue={
              typeof state.data.email === "string" ? state.data.email : ""
            }
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm sm:text-base" htmlFor="password">
            Password
          </label>
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            defaultValue={
              typeof state.data.password === "string" ? state.data.password : ""
            }
          />
        </div>

        {/* Confirmar contraseña */}
        <div className="flex flex-col gap-1">
          <label
            className="font-bold text-sm sm:text-base"
            htmlFor="password_confirmation"
          >
            Confirmar contraseña
          </label>
          <Input
            type="password"
            name="password_confirmation"
            placeholder="Confirmar contraseña"
            defaultValue={
              typeof state.data.password_confirmation === "string"
                ? state.data.password_confirmation
                : ""
            }
          />
        </div>

        {/* Tipo de suscripción */}
        <div className="flex flex-col gap-1">
          <label
            className="font-bold text-sm sm:text-base"
            htmlFor="subscriptionType"
          >
            Tipo de Suscripción
          </label>
          <select
            id="subscriptionType"
            name="subscriptionType"
            className="w-full border text-[16px] border-gray-300 bg-white p-3 rounded-lg"
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
          <label className="font-bold text-sm sm:text-base" htmlFor="phone">
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
            className="w-full border border-gray-300 text-[16px] bg-white p-2 rounded-lg focus:outline-none"
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
            p-2
            rounded-lg
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
