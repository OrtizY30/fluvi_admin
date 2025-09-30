import { VariantGroup } from "@/src/schemas";
import React, { startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { FluviToast } from "@/components/ui/FluviToast";
import { createVariant } from "@/actions/variant/create-variant-action";
import { Plus } from "lucide-react";

export default function BtnCreateVariant({
  variantGroup,
}: {
  variantGroup: VariantGroup;
}) {
  
  const createVariantWithId = createVariant.bind(null, variantGroup.id);
  const [state, dispatch, isPending] = useActionState(createVariantWithId, {
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
    }
  }, [state]);

  const handleCreate = () => {
    startTransition(() => {
      dispatch();
    });
  };
  return (
    <div className="w-full flex items-center justify-center">
      <button
        disabled={isPending}
        onClick={handleCreate}
        type="button"
        className="font-semibold flex items-center justify-center   border-b border-transparent hover:border-brand-primary  w-32 text-center mt-4 cursor-pointer text-brand-primary transition-all"
      >
        {isPending ? <CircularProgress size="20px" /> : (<><Plus className="size-4" strokeWidth={1.5}/> Crear variante</>)}
      </button>
    </div>
  );
}
