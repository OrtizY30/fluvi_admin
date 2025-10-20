"use client";

import { updateProductOrder } from "@/actions/product/order-products";
import { MenuItem } from "@headlessui/react";
import { arrayMove } from "@dnd-kit/sortable";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Category } from "@/src/schemas";
// import { updateProductOrder } from "@/app/admin/productos/actions"; // ajusta esta ruta a donde tengas tu server action

type Props = {
  id: number;
  category: Category;
};

export default function MoveProductButtons({ id, category }: Props) {
  const router = useRouter();
  //   if (!category) return null;
  const [products, setProducts] = useState(category?.products ?? []);

  // server action state
  const [state, dispatch, isPending] = useActionState(updateProductOrder, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (category?.products) {
      setProducts(category.products);
    }
  }, [category]);

  // toasts
  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((msg) =>
        toast.error(<FluviToast type="error" msg={msg} />)
      );
    }
    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
      router.refresh();
    }
  }, [state, router]);

  const handleMove = (direction: "up" | "down", e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const currentIndex = products.findIndex((p) => p.id === id);
    if (currentIndex === -1) return;
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Si el nuevo índice no es válido, no hacemos nada
    if (newIndex < 0 || newIndex >= products.length) return;

    // 👇 Usa la misma lógica que en desktop
    const newItems = arrayMove(products, currentIndex, newIndex);
    setProducts(newItems);

    const order = newItems.map((it, index) => ({
      id: it.id,
      position: index,
    }));

    startTransition(() => {
      dispatch(order);
    });
  };

  return (
    <div className="flex flex-col">
      {/* Botón para subir */}
      <MenuItem>
        <button
          type="button"
          // disabled={isPending || products.findIndex((p) => p.id === id) <= 0} // si está arriba del todo, no sube más
          onClick={(e) => handleMove("up", e)}
          className={`text-xs ${
            isPending && "opacity-10"
          } font-semibold hover:bg-gray-200 border-b border-gray-300 p-4 md:hidden flex text-gray-700 items-center w-full gap-1 cursor-pointer`}
        >
          <ArrowUp className="size-4" strokeWidth={2} /> Mover hacia arriba
        </button>
      </MenuItem>
      {/* Botón para bajar */}
      <MenuItem>
        <button
          type="button"
          //  disabled={isPending || products.findIndex((p) => p.id === id) === products.length - 1}
          onClick={(e) => handleMove("down", e)}
          className={`text-xs md:hidden ${
            isPending && "opacity-10"
          } font-semibold hover:bg-gray-200 border-b border-gray-300 p-4 flex text-gray-700 items-center w-full gap-1 cursor-pointer`}
        >
          <ArrowDown className="size-4" strokeWidth={2} />Mover hacia abajo
        </button>
      </MenuItem>
    </div>
  );
}
