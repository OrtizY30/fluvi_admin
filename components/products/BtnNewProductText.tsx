import { createProduct } from "@/actions/product/create-product-action";
import React, { startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { Plus } from "lucide-react";
import { CircularProgress } from "@mui/material";
import { Category } from "@/src/schemas";
import { useRouter } from "next/navigation";

export default function BtnNewProductText({ category }: { category: Category }) {
  const createProductWithCategory = createProduct.bind(null, category.id);
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(
    createProductWithCategory,
    {
      errors: [],
      success: "",
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
      router.refresh(); // refrescar la página para obtener los datos actualizados
    }
  }, [state, router]);

  const handleProduct = () => {
    startTransition(() => {
      dispatch();
    });
  };
  return ( 
<div className="flex w-full justify-center items-center p-3">
    <button
      type="button"
      disabled={isPending}
      onClick={handleProduct}
      className=" md:hidden cursor-pointer flex items-center justify-center text-sm text-brand-primary"
    >
      {isPending ? (
        <CircularProgress  size="20px" />
      ) : (
        <p className="flex items-center gap-1">
          <Plus className="size-4" strokeWidth={2} /> Nuevo producto
        </p>
      )}
    </button>
    </div>
  );
}
