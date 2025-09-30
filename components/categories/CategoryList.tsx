"use client";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Category } from "@/src/schemas";
import BtnNewCategory from "./BtnNewCategory";
import { updateCategoryOrder } from "@/actions/category/order-categories-action";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";

// Import dinámico para evitar hydration issues de dnd-kit/MUI
const SortableCategory = dynamic(
  () => import("./SortableCategory").then((m) => m.SortableCategory),
  { ssr: false }
);

export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [items, setItems] = useState<Category[]>(categories);

  // si las categorías vienen del server y pueden cambiar, sincroniza:
  useEffect(() => setItems(categories), [categories]);

  // server action state
  const [state, dispatch] = useActionState(updateCategoryOrder, {
    errors: [],
    success: "",
  });

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;
      if (active.id === over.id) return;

      // calcula usando el estado actual (fuera del updater)
      const oldIndex = items.findIndex((it) => it.id === active.id);
      const newIndex = items.findIndex((it) => it.id === over.id);
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      const order = newItems.map((it, index) => ({
        id: it.id,
        position: index,
      }));

      // 💡 Defer: no llames dispatch dentro del updater; hazlo en el próximo tick
      setTimeout(() => {
        startTransition(() => {
          dispatch(order);
        });
      }, 0);
    },
    [items, dispatch]
  );

  const toggleCategory = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // toasts
  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((msg) =>
        toast.error(<FluviToast type="error" msg={msg} />)
      );
    }
    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
    }
  }, [state]);

  return items.length ? (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext
        items={items.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((category) => (
          <SortableCategory
            key={category.id}
            category={category}
            expanded={expanded[category.id]}
            toggleCategory={toggleCategory}
          />
        ))}
      </SortableContext>
    </DndContext>
  ) : (
    <div className="flex flex-col gap-6 items-center justify-center h-full">
      <p className="text-md">No tienes categorías creadas</p>
      <BtnNewCategory />
    </div>
  );
}
