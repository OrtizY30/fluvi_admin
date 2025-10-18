"use client";

import { MenuItem } from "@headlessui/react";
import { arrayMove } from "@dnd-kit/sortable";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp } from "lucide-react";
import { updateCategoryOrder } from "@/actions/category/order-categories-action";
import { useCategoriesStore } from "@/store/useCategoriesStore";


type Props = {
  id: number;
};

export default function MoveCategoryButtons({ id }: Props) {
  const router = useRouter();
  const categories = useCategoriesStore((state) => state.categories);
  //   if (!category) return null;

  const [categoriesArray, setCategoriesArray] = useState(categories ?? []);
  // server action state
  const [state, dispatch, isPending] = useActionState(updateCategoryOrder, {
    errors: [],
    success: "",
  });
  
    useEffect(() => {
      if (categories) {
        setCategoriesArray(categories);
      }
    }, [categories]);

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

    const currentIndex = categoriesArray.findIndex((p) => p.id === id);
    if (currentIndex === -1) return;
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Si el nuevo índice no es válido, no hacemos nada
    if (newIndex < 0 || newIndex >= categoriesArray.length) return;

    // 👇 Usa la misma lógica que en desktop
    const newItems = arrayMove(categoriesArray, currentIndex, newIndex);
    setCategoriesArray(newItems);

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
          <ArrowUp className="size-4" strokeWidth={2} /> Subir categoría
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
          <ArrowDown className="size-4" strokeWidth={2} /> Bajar categoría
        </button>
      </MenuItem>
    </div>
  );
}
