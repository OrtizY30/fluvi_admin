import { useRouter, useSearchParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import {
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { DialogTitle } from "@mui/material";
import { deleteBranch } from "@/actions/branch/delete-branch-action";

type ConfirmDeleteBranch = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ConfirmDeleteBranch({
  setOpen,
}: ConfirmDeleteBranch) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = +searchParams.get("deleteBranchId")!;

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams);
    hideModal.delete("deleteBranchId");
    router.replace(`?${hideModal.toString()}`);
    setOpen(false);
  };

  const deleteBranchWithId = deleteBranch.bind(null, groupId);
  const [state, dispatch] = useActionState(deleteBranchWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error} />);
      });
    }

    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
      closeModal();
      router.refresh();
    }
  }, [state]);

  return (
    <>
      {/* Modal Header */}
      <DialogTitle sx={{ padding: 0 }} id="alert-dialog-title">
        <div className=" border-b border-gray-100">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <div className="icon-header">
                <ExclamationTriangleIcon className="size-7 " />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Eliminar Sucursal de tienda
                </h3>
                <p className="text-sm font-normal text-gray-600 mt-1">
                  Esta acción no se puede deshacer
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogTitle>

      {/* Modal Content */}
      <div className="">
        <div className="p-6">
          <div className="flex items-center gap-3 p-4 bg-brand-primary/10 border border-brand-primary rounded-lg mb-4">
            <ExclamationTriangleIcon className="size-7 text-brand-primary flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-brand-primary">
                Vas a eliminar una sucursal
              </p>
              <p className="text-xs text-brand-primary mt-1">
                Esta surcursal será eliminada para siempre 
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Ingresa tu contraseña</strong> para confirmar la
              eliminación de esta sucursal
            </p>
            <p className="text-xs">
              Una sucursal eliminada no se puede recuperar.
            </p>
          </div>
        </div>

        <form action={dispatch} className="" noValidate>
          <div className="flex flex-col gap-5 p-6">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Contraseña de confirmación
            </label>
            <div className="border flex items-center rounded-lg w-full border-gray-300 focus:outline-none shadow-xs">
              <input
                id="password"
                className="border-none text-gray-600 p-3 w-full focus:outline-none"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="*********"
              />
              <div
                onClick={handleClickShowPassword}
                className="pr-2 cursor-pointer"
              >
                {showPassword ? (
                  <EyeIcon className="text-gray-500 size-5" />
                ) : (
                  <EyeSlashIcon className="text-gray-500 size-5" />
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
            <button
              type="button"
              className="flex-1 hover:bg-neutral-700 hover:text-white cursor-pointer rounded-lg p-2 border border-gray-300 bg-transparent transition-all"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              type="submit"
              // disabled={!password}
              className="flex items-center justify-center bg-brand-primary  hover:bg-red-900 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all  rounded-lg p-2 cursor-pointer"
            >
              <TrashIcon className="size-5 mr-2 " />
              Eliminar Tienda
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

{
  /* <form action={dispatch} className=" space-y-5 mt-4" noValidate>
        <div className="flex flex-col gap-5">
          <input
            id="password"
            type="password"
            placeholder="*********"
            className="w-full border focus:outline-none border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <input
            type="submit"
            value="Aceptar"
            className="bg-purple-600 hover:bg-purple-800 w-full p-2 rounded-lg text-white font-black cursor-pointer transition-colors"
          />
          <button
            type="button"
            className="bg-amber-400 hover:bg-amber-600 w-full p-2 rounded-lg text-white font-black cursor-pointer transition-colors"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </form> */
}
