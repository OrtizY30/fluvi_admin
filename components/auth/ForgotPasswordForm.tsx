"use client";

import { forgotPassword } from "@/actions/auth/forgot-password-action";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";

type ActionStateType = {
  errors: string[];
  success: string;
  data: { email: string };
};

export default function ForgotPasswordForm() {
  const [state, dispatch] = useActionState<ActionStateType, FormData>(
    forgotPassword,
    {
      errors: [],
      success: "",
      data: {
        email: "",
      },
    }
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
    }
  }, [state]);

  return (
    <form
      action={dispatch}
      className=" mt-14 space-y-5 w-xl mx-auto"
      noValidate
    >
      <div className="flex flex-col gap-2 mb-10">
        <label className="font-bold text-2xl">Email</label>

        <input
          type="email"
          placeholder="Email de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="email"
          defaultValue={state.data?.email || ""}
        />
      </div>

      <input
        type="submit"
        value="Enviar Instrucciones"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer "
      />
    </form>
  );
}
