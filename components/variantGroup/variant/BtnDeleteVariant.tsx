"use client";


import IconButton from "@mui/material/IconButton";
import { EllipsisVertical, Trash2 } from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Variant } from "@/src/schemas";
import { toast } from "react-toastify";
import { FluviToast } from "@/components/ui/FluviToast";
import { useRouter } from "next/navigation";
import { deleteVariant } from "@/actions/variant/delete-variant-action";
import { startTransition, useActionState, useEffect } from "react";

type ProductMenuProps = {
  variant: Variant;
};

export default function BtnDeleteVariant({ variant }: ProductMenuProps) {
  const router = useRouter();

  const deleteVariantWithId = deleteVariant.bind(null, variant.id);
  const [state, dispatch] = useActionState(deleteVariantWithId, {
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

  const handleDeleteVariant = () => {
    startTransition(() => {
      dispatch();
    });
  };

  return (
    <Menu>
      <MenuButton>
        <IconButton aria-label="options" component="span">
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
            className="flex items-center p-2 hover:bg-gray-200 w-full gap-1 cursor-pointer"
            onClick={handleDeleteVariant}
          >
            <Trash2 className="text-red-600 size-4" />
            <span className="text-red-500 text-xs font-semibold">Eliminar</span>
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
