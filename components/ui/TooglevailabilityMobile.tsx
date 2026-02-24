"use client";

import { Product } from "@/src/schemas";
import React, { startTransition, useEffect, useState } from "react";
import { useActionState } from "react";
import { toogleAvailabilityProduct } from "@/actions/product/toogle-availability-product-action";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { MenuItem } from "@headlessui/react";

type ToggleAvailabilityButtonProps = {
  product: Product;
};

export default function ToggleAvailabilityMobile({
  product,
}: ToggleAvailabilityButtonProps) {
  const router = useRouter();
  // 🔧 Agregamos estado local para manejar el switch
  const [isChecked, setIsChecked] = useState(product.isAvailable);

  // 🔧 Atamos la acción al ID del producto
  const toggleWithId = toogleAvailabilityProduct.bind(null, product.id);

  // 🔧 useActionState para controlar estado del action
  const [state, dispatch, isPending] = useActionState(toggleWithId, {
    errors: [],
    success: "",
  });

  // 🔧 revertimos si falla el cambio
  useEffect(() => {
    if (state.errors.length > 0) {
      toast.error(<FluviToast type="error" msg={state.errors[0]} />);
      setIsChecked(product.isAvailable); // 🔧 revertir si error
    }

    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
      router.refresh();
    }
  }, [state, router]);

  // 🔧 Optimistic UI con cambio inmediato y luego dispatch
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // 👈 evita que el menú se cierre
    e.preventDefault();
    setIsChecked((prev) => !prev);
    startTransition(() => {
      dispatch(); // 🔧 hace el request al backend
    });
  };

  return (
    <MenuItem>
      <div
        onClick={(e) => handleToggle(e)}
        className={`text-xs ${
          isPending && "opacity-10"
        } font-semibold md:hidden hover:bg-gray-200 border-b border-gray-300 p-4 flex text-gray-700 items-center w-full gap-1 cursor-pointer`}
      >
        {isChecked ? (
          <>
            {" "}
            <Eye className="size-4" strokeWidth={1.5} /> Disponible
          </>
        ) : (
          <>
            {" "}
            <EyeOff className="size-4" strokeWidth={1.5} /> Desactivado
          </>
        )}
      </div>
    </MenuItem>
  );
}
