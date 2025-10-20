"use client";

import IconButton from "@mui/material/IconButton";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Modifier } from "@/src/schemas";
import { toast } from "react-toastify";
import { FluviToast } from "@/components/ui/FluviToast";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { deleteModifier } from "@/actions/modifier/delete-modifier-action";

type BtnDeleteModifierProps = {
  modifier: Modifier;
};

export default function BtnDeleteModifier({
  modifier,
}: BtnDeleteModifierProps) {
  const router = useRouter();

  const deleteModifierWithId = deleteModifier.bind(null, modifier.id);
  const [state, dispatch, isPending] = useActionState(deleteModifierWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) => {
        toast.error(<FluviToast type="error" msg={error} />);
      });
    }

    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
      router.refresh();
    }
  }, [state, router]);

  const handleDelete = () => {
    startTransition(() => {
      dispatch();
    });
  };

  return (
    <Menu>
      <MenuButton>
        <IconButton disabled={isPending} aria-label="options" component="span">
          <EllipsisVertical className="size-6" strokeWidth={2} />
        </IconButton>
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="bg-surface-base z-[1400] border border-gray-200 shadow-md rounded-md"
      >
        <MenuItem>
          <div
            className="flex items-center p-4 hover:bg-gray-200 w-full gap-1 cursor-pointer"
            onClick={handleDelete}
          >
            <Trash2 className="text-red-600 size-4" />
            <span className="text-red-500 text-xs font-semibold">Eliminar</span>
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
