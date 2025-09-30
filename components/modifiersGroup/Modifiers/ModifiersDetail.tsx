"use client";

import { toggleModifierGroup } from "@/actions/product/toggle-modifiers-product";
import { FluviToast } from "@/components/ui/FluviToast";
import { ModifierGroup, Product } from "@/src/schemas";
import React, {
  useActionState,
  useEffect,
  startTransition,
  useState,
} from "react";
import { toast } from "react-toastify";

type Props = {
  modifiersGroup: ModifierGroup;
  product: Product;
};

type ActionStateType = {
  errors: string[];
  success: string;
};

export default function ModifiersDetail({ modifiersGroup, product }: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const relation = product.modifiers.some(
    (group) => group.modifierGroup.id === modifiersGroup.id
  );

  // bindear la acción con productId
  const addModifiersProductWrapper = async (
    state: ActionStateType,
    modifierGroupId: number
  ) => {
    return toggleModifierGroup(product.id, modifierGroupId, state);
  };

  const [state, dispatch, isPending] = useActionState(
    addModifiersProductWrapper,
    {
      errors: [],
      success: "",
    }
  );

  const handleChange = (checked: boolean) => {
    startTransition(() => {
      dispatch(modifiersGroup.id); // ejecuta server action con el id del grupo
    });
    setIsChecked(checked);
  };

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) =>
        toast.error(<FluviToast type="error" msg={error} />)
      );
    }
    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
    }
  }, [state]);

  

  return (
    <div
      className={`${isPending && "opacity-50"} border-b pb-1 border-slate-200`}
    >
      <div className="flex items-center justify-between">
        <div>
          <legend className=" text-sm font-semibold text-gray-700">
            {modifiersGroup.name}{" "}
            {modifiersGroup.required && <span className="text-red-500 font-bold text-xl">*</span>}
          </legend>
        </div>
        <input
          className="w-4 h-4 cursor-pointer accent-brand-primary"
          title={`Elige ${modifiersGroup.name}`}
          type="checkbox"
          name="modifiers"
          value={modifiersGroup.id}
          checked={relation || isChecked}
          disabled={isPending}
          onChange={(e) => handleChange(e.target.checked)}
        />
      </div>
    </div>
  );
}
