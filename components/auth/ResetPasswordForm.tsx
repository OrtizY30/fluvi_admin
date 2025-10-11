import { resetPassword } from "@/actions/auth/reset-password-action";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const resetPasswordWithToken = resetPassword.bind(null, token);
  const [state, dispatch, isPending] = useActionState(resetPasswordWithToken, {
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
          router.refresh();
        },
        onClick: () => {
          router.push("/auth/login");
        },
      });
    }
  }, [state, router]);

  return (
    <form action={dispatch} className=" p-4 space-y-5" noValidate>
      <div className="flex flex-col gap-5">
        <label className="font-bold text-lg">Password</label>

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password"
          defaultValue={state.data.password}
        />
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-bold text-lg">Repetir contraseña</label>

        <input
          id="password_confirmation"
          type="password"
          placeholder="Repite contraseña"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password_confirmation"
          defaultValue={state.data.password_confirmation}
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
