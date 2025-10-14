"use client";

import { CircularProgress, DialogTitle } from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useCallback,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { deleteCategory } from "@/actions/category/delete-category-action";
import { Category } from "@/src/schemas";
import { Eye, EyeClosed, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

type ConfirmDeleteCategoryProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  category: Category;
};

export default function ConfirmDeleteCategory({
  category,
  setOpen,
}: ConfirmDeleteCategoryProps) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

const closeModal = useCallback(() => {
  setOpen(false);
}, [setOpen]); 

  const deleteCategoryWithId = deleteCategory.bind(null, category.id);
  const [state, dispatch, isPending] = useActionState(deleteCategoryWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    console.log("STATE DESDE COMPONENTE:", state);
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error} />);
      });
    }

    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
      router.refresh()
      closeModal();
    }
  }, [state, router, closeModal]);

  return (
    <>
      {/* Modal Header */}
      <DialogTitle sx={{ padding: 0 }} id="alert-dialog-title">
        <div className=" border-b border-gray-100">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <div className="icon-header">
                <TriangleAlert
                  className="size-7 text-brand-primary"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Eliminar Categoría
                </h3>
                <p className="text-xs font-normal text-gray-600 mt-1">
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
          <div className="flex items-center gap-3 p-4 bg-brand-primary/10 border border-brand-primary rounded-md mb-4">
            <TriangleAlert
              className="size-7 text-brand-primary flex-shrink-0"
              strokeWidth={1.5}
            />
            <div>
              <p className="text-sm font-medium text-brand-primary">
                Vas a eliminar una categoría.
              </p>
              <p className="text-xs text-brand-primary mt-1">
                Esta categoría contiene productos que también serán eliminados, y sus productos no se pueden recuperar.
              </p>
            </div>
          </div>

          <div className=" text-sm text-gray-600">
          
            <p>
              <strong>Ingresa tu contraseña</strong> para confirmar la
              eliminación de esta categoría.
            </p>
          </div>
        </div>

        <form action={dispatch} className="" noValidate>
          <div className="flex flex-col gap-2 p-6">
            <label
              htmlFor="password"
              className="text-sm font-bold text-gray-700"
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
                  <Eye className="text-gray-500 size-5" />
                ) : (
                  <EyeClosed className="text-gray-500 size-5" />
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
              disabled={isPending}
              className="flex justify-center items-center bg-brand-primary hover:bg-red-900 text-white disabled:opacity-50 disabled:cursor-not-allowed  rounded-lg p-2 cursor-pointer transition-all"
            >
              {isPending ? <CircularProgress size="20px" /> : <>Eliminar </>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
