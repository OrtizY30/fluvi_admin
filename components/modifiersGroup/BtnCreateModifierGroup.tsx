import React, { startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { createModifierGroup } from "@/actions/modifiersGroup/create-grupos-action";
import { CircularProgress } from "@mui/material";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BtnCreateModifierGroup() {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(createModifierGroup, {
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
      router.refresh();
    }
  }, [state, router]);

  const handleCreate = () => {
    startTransition(() => {
      dispatch();
    });
  };
  return (
    <button  onClick={handleCreate} className="btn font-bold min-w-32 text-xs">
        {isPending ? (
              <CircularProgress size="20px" sx={{color: 'white'}}/>
             ) : (
              <p className="flex items-center gap-1"><Plus className="size-4" strokeWidth={1.5}/> Crear categoría</p>
             )}
    </button>
  );
}
