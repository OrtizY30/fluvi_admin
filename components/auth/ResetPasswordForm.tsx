import { resetPassword } from "@/actions/auth/reset-password-action";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const resetPasswordWithToken = resetPassword.bind(null, token);
  const [state, dispatch] = useActionState(resetPasswordWithToken, {
    errors: [],
    success: "",
    data: {
      password: "",
      password_confirmation: "",
    },
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error} />);
      });
    }

    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />, {
        onClose: () => {
          router.push("/auth/login");
        },
        onClick: () => {
             router.push("/auth/login");
        }
      });
    }
  }, [state]);

  return (
    <form action={dispatch} className=" mt-14 space-y-5" noValidate>
      <div className="flex flex-col gap-5">
        <label className="font-bold text-2xl">Password</label>

        <input
          type="password"
          placeholder="Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password"
          defaultValue={state.data.password}
        />
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-bold text-2xl">Repetir Password</label>

        <input
          id="password_confirmation"
          type="password"
          placeholder="Repite Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password_confirmation"
          defaultValue={state.data.password_confirmation}
        />
      </div>

      <input
        type="submit"
        value="Guardar Password"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  );
}
