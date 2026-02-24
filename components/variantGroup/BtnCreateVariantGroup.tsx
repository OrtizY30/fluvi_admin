import { createVariantGroup } from "@/actions/variantGroup/create-variantgroup-action";
import { Product } from "@/src/schemas";
import React, { startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

export default function BtnCreateVariantGroup({
  product,
  onCreated,
}: {
  product: Product;
  onCreated: () => void;
}) {
  const router = useRouter();
  const createVariantGroupWithProductId = createVariantGroup.bind(
    null,
    product.id
  );
  const [state, dispatch, isPending] = useActionState(
    createVariantGroupWithProductId,
    {
      errors: [],
      success: "",
    }
  );

useEffect(() => { 
  if (state.errors) { 
    state.errors.forEach((error) => { toast.error(<FluviToast type={"error"} msg={error} />); }); 
  } 
  if (state.success) { 
    toast.success(<FluviToast type="success" msg={state.success} />, {}); 
    onCreated(); 
      router.refresh()   
  } 
}, [state, router]);

  const handleCreate = () => {
    startTransition(() => {
      dispatch();
    });
  };
  return (
    <button
      disabled={isPending || !!product.variantGroup}
      onClick={handleCreate}
      type="button"
      className="disabled:bg-blue-600 disabled:text-white disabled:shadow-md disabled:border disabled:border-gray-300 font-semibold  py-1 rounded-lg w-full  cursor-pointer text-neutral-500 hover:bg-neutral-300 transition-all"
    >
      {isPending ? (
        <CircularProgress size="16px" sx={{ color: "white" }} />
      ) : (
        "Variante"
      )}
    </button>
  );
}
