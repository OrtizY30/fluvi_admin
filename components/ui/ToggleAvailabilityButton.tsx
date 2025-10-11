"use client";

import { Product } from "@/src/schemas";
import React, { startTransition, useEffect, useState } from "react";
import { useActionState } from "react";
import { toogleAvailabilityProduct } from "@/actions/product/toogle-availability-product-action";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

type ToggleAvailabilityButtonProps = {
  product: Product;
};

export default function ToggleAvailabilityButton({
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
      router.refresh()
    }
  }, [state, product.isAvailable, router]);

  // 🔧 Optimistic UI con cambio inmediato y luego dispatch
  const handleToggle = () => {
    setIsChecked((prev) => !prev); 
    startTransition(() => {
      dispatch(); // 🔧 hace el request al backend
    });
  };

  return (
    <button className="hidden md:flex" title={isChecked ? 'Desactivar' : 'Activar'} onClick={handleToggle}>
      {isChecked ? (

        <Eye className={`${isPending && 'opacity-10'} size-6`} strokeWidth={1.5} />
      ): (
        <EyeOff className={`${isPending && 'opacity-10'} size-6`} strokeWidth={1.5} />
      )}
    </button>
  );
}
