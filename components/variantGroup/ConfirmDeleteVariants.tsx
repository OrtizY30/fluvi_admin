import { useRouter } from "next/navigation";
import React, {
  startTransition,
  useActionState,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { VariantGroup } from "@/src/schemas";
import { deleteVariantGroup } from "@/actions/variantGroup/delete-variantGroup-action";

type ConfirmDeleteVariantsProps = {
  handleClose: () => void;
  variantGroup: VariantGroup;
  open: boolean;
  onDeleted: () => void
};
export default function ConfirmDeleteVariants({
  handleClose,
  variantGroup,
  open,
  onDeleted
}: ConfirmDeleteVariantsProps) {
  const router = useRouter();

  const [state, dispatch, isPending] = useActionState(deleteVariantGroup, {
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
    toast.success(<FluviToast type="success" msg={state.success} />, {});
       router.refresh()   // ⛔️ Esto vuelve a causar render → vuelve a entrar al useEffect
    handleClose();
    onDeleted();
  }
}, [state, router ]);



  const handleDeleteGroup = () => {
    const formData = new FormData();
    formData.append("variantGroupId", String(variantGroup.id));

    startTransition(() => { 
      dispatch(formData);
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ padding: 0 }} id="alert-dialog-title">
          <div className=" border-b border-gray-100 p-6">
            <p className="text-xl font-medium">Cambiar a precio simple</p>
            <p className="text-xs text-gray-500">
              Todas las variantes y sus datos se eliminarán
            </p>
          </div>
        </DialogTitle>
        <DialogContent
          dividers={false}
          sx={{ padding: 0 }}
          className=" rounded-xl shadow-xl max-w-md w-full"
        >
          {/* Modal Content */}

          <div className="flex items-center gap-5 justify-between p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
            <button
              type="button"
              className=" w-42 hover:bg-neutral-700 hover:text-white cursor-pointer rounded-sm p-2 border border-gray-300 bg-transparent transition-all"
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleDeleteGroup}
              disabled={isPending}
              className="flex items-center bg-blue-600 hover:bg-blue-800 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all  justify-center  rounded-sm p-2 cursor-pointer w-42"
            >
                 {isPending ? <CircularProgress size="20px" sx={{ color: "white" }} /> : 'Cambiar'}
             
            </button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Modal Header */}
    </>
  );
}
