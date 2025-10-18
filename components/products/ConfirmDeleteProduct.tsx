import { useRouter } from "next/navigation";
import React, {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useCallback,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { deleteProduct } from "@/actions/product/delete-product-action";
import {
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { CircularProgress, DialogTitle } from "@mui/material";
import { Product } from "@/src/schemas";

type ConfirmDeleteProductProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  product: Product;
};
export default function ConfirmDeleteProduct({
  setOpen,
  product,
}: ConfirmDeleteProductProps) {
  const router = useRouter();

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const deleteProductWithId = deleteProduct.bind(null, product.id);
  const [state, dispatch, isPending] = useActionState(deleteProductWithId, {
    errors: [],
    success: "",
  });

  const handleClick = () => {
    startTransition(() => {
      dispatch();
    });
  };

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
  }, [state, closeModal, router]);

  return (
    <>
      {/* Modal Header */}
      <DialogTitle sx={{ padding: 0 }} id="alert-dialog-title">
        <div className=" border-b border-gray-100">
          <div className="flex items-center justify-between p-2 md:p-6">
            <div className="flex items-center gap-3">
              <div className="icon-header">
                <ExclamationTriangleIcon className="size-7 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Eliminar Producto
                </h3>
              </div>
            </div>
          </div>
        </div>
      </DialogTitle>

      {/* Modal Content */}
      <div className="">
        <div className="p-2 md:p-6">
          <p className="text-xs text-gray-600">
            Un productos eliminado no se puede recuperar.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 p-2 md:p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
          <button
            type="button"
            className="flex-1  text-xs md:text-lg hover:bg-neutral-700 hover:text-white cursor-pointer rounded-lg p-2 border border-gray-300 bg-transparent transition-all"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleClick}
            disabled={isPending}
            className=" text-xs md:text-lg bg-red-500 hover:bg-red-800 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all  rounded-lg p-2 cursor-pointer"
          >
            {isPending ? (
              <CircularProgress size="16px" sx={{ color: "white" }} />
            ) : (
              "Eliminar"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
