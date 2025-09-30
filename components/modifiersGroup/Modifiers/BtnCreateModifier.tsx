import { createModifier } from "@/actions/modifier/create-modifier-action";
import { FluviToast } from "@/components/ui/FluviToast";
import { ModifierGroup } from "@/src/schemas";
import { CircularProgress } from "@mui/material";
import { Plus } from "lucide-react";
import React, { startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function BtnCreateModifier({
  modifiersGroup,
}: {
  modifiersGroup: ModifierGroup;
}) {
  const createModifierWithGroupId = createModifier.bind(
    null,
    modifiersGroup.id
  );
  const [state, dispatch, isPending] = useActionState(
    createModifierWithGroupId,
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
    }
  }, [state]);

  const handleCreate = () => {
    startTransition(() => {
      dispatch();
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleCreate}
      className="text-brand-primary mt-2 w-40 hover:underline text-sm transition-all font-bold cursor-pointer flex justify-center items-center gap-1"
    >
      {isPending ? <CircularProgress size="20px" /> : <><Plus className="size-4 "/> Agregar modificador</> }
    </button>
  );
}
