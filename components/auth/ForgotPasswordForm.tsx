"use client";

import { forgotPassword } from "@/actions/auth/forgot-password-action";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { useRouter } from "next/navigation";

type ActionStateType = {
  errors: string[];
  success: string;
  data: { email: string };
};
const initialState: ActionStateType = {
  errors: [],
  success: "",
  data: {
    email: "",
  },
};

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(
    forgotPassword,
    initialState
  );

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error} />);
      });
    }

    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
      const form = document.querySelector("form");
      form?.reset();
      router.push("/auth/new-password");
    }
  }, [state, router]);

  return (
    <form
      action={dispatch}
      className="bg-surface-base border-gray-100 p-8 rounded-lg shadow-xs shadow-black/50 w-full max-w-md mx-4 space-y-5 "
      noValidate
    >
      <div className="flex flex-col gap-2 mb-6">
        <label className="font-bold text-lg">Email</label>

        <input
          type="email"
          placeholder="tucorreo@gmail.com"
          className="w-full border border-gray-300 p-2 rounded-lg"
          name="email"
          defaultValue={state.data?.email || ""}
        />
      </div>

      <input
        disabled={isPending}
        type="submit"
        value={isPending ? "Cargando..." : "Cambiar Contraseña"}
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
  );
}
