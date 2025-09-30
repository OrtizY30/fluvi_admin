"use client";


import { useActionState, useEffect, useRef } from "react";
import { register } from "@/actions/auth/create-account-action";
import Input from "@/components/ui/Input";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { useRouter } from "next/navigation";
import { ActionStateType } from "@/src/schemas";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function RegisterForm() {
  const router = useRouter()
  const ref = useRef<HTMLFormElement>(null);
  const [state, dispatch] = useActionState<ActionStateType, FormData>(
    register, 
    {
      errors: [],
      errorServer: "",
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
    }
  );

  useEffect(() => {
    if (state.success) {
      ref.current?.reset();

      toast.success(<FluviToast type={"success"} msg={state.success} />,{
        autoClose: 3000,
        onClose:() => {
           router.push("/auth/login");
        }
      });
    }

    if (state.errorServer) {
      state.errorServer;
      toast.error(<FluviToast type={"error"} msg={state.errorServer} />);
    }
  }, [state]); 

  return (
    <form
      ref={ref}
      className="bg-surface-base border-gray-100 p-8 rounded-lg shadow-md mx-auto w-md space-y-5 "
      noValidate
      action={dispatch}
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl" htmlFor="name">
          Nombre
        </label>
        <Input
          errors={state.errors.filter((error) => error.includes("Nombre"))}
          type="text"
          name="name"
          placeholder="Nombre de Registro"
          defaultValue={
            typeof state.data.name === "string" ? state.data.name : ""
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl" htmlFor="email">
          Email
        </label>

        <Input
          type="text"
          errors={state.errors.filter((error) => error.includes("Email"))}
          name="email"
          placeholder="Email de Registro"
          defaultValue={
            typeof state.data.email === "string" ? state.data.email : ""
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl" htmlFor="password">
          Password
        </label>

        <Input
          type="password"
          errors={state.errors.filter((error) => error.includes("contraseña"))}
          name="password"
          placeholder="Contraseña"
          defaultValue={
            typeof state.data.password === "string" ? state.data.password : ""
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl" htmlFor="password_confirmation">
          Repetir contraseña
        </label>

        <Input
          errors={state.errors.filter((error) => error.includes("contraseña"))}
          type="password"
          name="password_confirmation"
          placeholder="Repite la contraseña"
          defaultValue={
            typeof state.data.password_confirmation === "string"
              ? state.data.password_confirmation
              : ""
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl" htmlFor="subscriptionType">
          Tipo de Suscripción
        </label>

        <select
          // errors={state.errors.filter(error => error.includes('suscripción'))}
          id="subscriptionType"
          name="subscriptionType"
          className="w-full border border-gray-300 p-3 rounded-lg"
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

       <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl" htmlFor="phone">
          Teléfono
        </label>

        <PhoneInput
          name="phone" // Muy importante para server action
          defaultCountry="CO"
          international
          defaultValue={
            typeof state.data.phone === "string" && state.data.phone !== ""
              ? state.data.phone
              : undefined
          }
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none"
          onChange={() => {}}
        />

        {state.errors
          .filter((error) => error.includes("telefono"))
          .map((err, i) => (
            <p key={i} style={{ color: "red" }}>
              {err}
            </p>
          ))}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl" htmlFor="country">
          País
        </label>
        <select
          id="country"
          name="country"
          defaultValue={
            typeof state.data.country === "string" ? state.data.country : ""
          }
          className="w-full border border-gray-300 p-3 rounded-lg"
          required
        >
          <option value="">Selecciona un país</option>
          <option value="colombia">Colombia</option>
          <option value="peru">Perú</option>
          <option value="ecuador">Ecuador</option>
          <option value="mexico">México</option>
        </select>
      </div>

      <input
        type="submit"
        value="Registrarme"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer block"
      />
    </form>
  );
}
