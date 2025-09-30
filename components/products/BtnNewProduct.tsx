import { createProduct } from "@/actions/product/create-product-action";
import React, { startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { Plus } from "lucide-react";
import { CircularProgress } from "@mui/material";
import { Category } from "@/src/schemas";

export default function BtnNewProduct({category}: {category: Category}) {
  const createProductWithCategory = createProduct.bind(null, category.id)
     const [state, dispatch, isPending] = useActionState( createProductWithCategory,
        {
          errors: [],
          success: ""
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
         
        }
      }, [state]);

       const handleProduct = () => {
          startTransition(() => {
            dispatch();
          });
        };
  return (
    <button type="button" disabled={isPending} onClick={handleProduct} className= 'btn min-w-32 text-xs'>
     
     {isPending ? (
      <CircularProgress size="20px" />
     ) : (
      <p className="flex items-center gap-1"><Plus className="size-4" strokeWidth={1.5}/> Nuevo producto</p>
       
     )}
    </button>
  );
}
