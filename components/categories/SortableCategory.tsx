"use client";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { Grip } from "lucide-react";
import InputCategory from "../categories/InputCategory";
import BtnNewProduct from "../products/BtnNewProduct";
import { Category, Product } from "@/src/schemas";
import DeleteCategory from "./DeleteCategory";
import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useState,
} from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { updateProductOrder } from "@/actions/product/order-products";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Import dinámico para evitar hydration issues de dnd-kit/MUI
const SortableProduct = dynamic(() => import("../products/SortableProduct"), {
  ssr: false,
});

export function SortableCategory({
  category,
  expanded,
  toggleCategory,
}: {
  category: Category;
  expanded: boolean;
  toggleCategory: (id: number) => void;
}) {
  
  const router = useRouter();
  const [items, setItems] = useState<Product[]>(category.products);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: category.id });

  // si las categorías vienen del server y pueden cambiar, sincroniza:
  useEffect(() => setItems(category.products), [category.products]);

  // server action state
  const [state, dispatch] = useActionState(updateProductOrder, {
    errors: [],
    success: "",
  });

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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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

  return (
    <Accordion
      ref={setNodeRef}
      style={style}
      expanded={!!expanded}
      onChange={() => {}}
      sx={{
        border: "1px solid rgb(240, 239, 239)",
        borderRadius: 2,
        boxShadow: "0px 0px 0px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <AccordionSummary
        sx={{
          bgcolor: "#f4f6f8",
          borderBottom: "1px solid rgb(234, 233, 233)",
          minHeight: 32,
          "& .MuiAccordionSummary-content": { margin: 0 },
          "& .MuiAccordionSummary-content.Mui-expanded": { margin: 0 },
          padding: "5px 8px",
        }}
        component="div"
        expandIcon={
          <IconButton
            component="span"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              toggleCategory(category.id);
            }}
            className="rounded-xl"
          >
            <ExpandMore
              style={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </IconButton>
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-2 items-center">
            {/* Grip para mover */}
            <IconButton component="span" {...attributes} {...listeners}>
              <Grip
                className="text-btn-secondary cursor-grab active:cursor-grabbing size-5"
                strokeWidth={2}
              />
            </IconButton>
            <InputCategory category={category} />
          </div>
          <div className="flex items-center gap-2">
            <div className=" rounded-md h-6 w-6 justify-center shadow-md border border-gray-100 flex items-center font-bold text-sm text-white bg-brand-primary">
              {category.products.length}
            </div>
            <BtnNewProduct category={category} />
            <DeleteCategory category={category} />
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails sx={{ borderRadius: 2, padding: "0px" }}>
        {items.length ? (
          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext
              items={items.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((product) => (
                <SortableProduct key={product.id} product={product} />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <p className="text-center p-3 font-bold text-md">
            No hay productos disponibles
          </p>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
