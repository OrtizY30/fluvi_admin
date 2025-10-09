"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { Grip } from "lucide-react";
import { Product, Variant } from "@/src/schemas";
import { useActionState, useEffect, useState } from "react";
import { updateProductOrder } from "@/actions/product/order-products";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import InputVariant from "./variant/InputVariant";
import BtnDeleteVariant from "./variant/BtnDeleteVariant";
import { formatCurrency } from "@/src/utils";
import { useUserStore } from "@/store/useUserStore";
import InputVariantPrice from "./variant/InputVariantPrice";

export function VariantGroupDetails({ product }: { product: Product }) {
  const user = useUserStore((state) => state.user);
  const [items, setItems] = useState<Variant[]>(
    product?.variantGroup?.variants ?? []
  );

  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const toggleVariantGroup = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // si las variantes vienen del server y pueden cambiar, sincroniza:
  // efecto seguro
  useEffect(
    () => setItems(product?.variantGroup?.variants ?? []),
    [product?.variantGroup?.variants]
  );

  // server action state
  const [state] = useActionState(updateProductOrder, {
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
    }
  }, [state]);

  return items.length ? (
    items.map((variant) => (
      <Accordion
        key={variant.id}
        expanded={!!expanded[variant.id]} // 👈 solo abre si está en true
        sx={{
          border: "1px solid rgb(240, 239, 239)",
          // borderRadius: 2,
          boxShadow: "0px 0px 0px rgba(0,0,0,0.1)",
          overflow: "hidden",
          m: 0,
        }}
      >
        <AccordionSummary
          sx={{
            bgcolor: "#f4f6f8",
            // borderBottom: "1px solid rgb(234, 233, 233)",
            maxHeight: 4,
            "& .MuiAccordionSummary-content": { margin: 0 },
            "& .MuiAccordionSummary-content.Mui-expanded": { margin: 0 },
            padding: "0px 0px",
          }}
          component="div"
          expandIcon={
            <IconButton
              component="span"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                toggleVariantGroup(variant.id);
              }}
              className="rounded-xl"
            >
              <ExpandMore
                style={{
                  transform: expanded[variant.id]
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
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
              <IconButton component="span">
                <Grip className="text-gray-400 size-5" strokeWidth={1.25} />
              </IconButton>
              <InputVariant variant={variant} />
            </div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm">
                {formatCurrency(variant.price, user!.country)}
              </p>

              <BtnDeleteVariant variant={variant} />
            </div>
          </div>
        </AccordionSummary>

        <AccordionDetails sx={{ borderRadius: 2, padding: "10px 20px" }}>
          <InputVariantPrice variant={variant} />
        </AccordionDetails>
      </Accordion>
    ))
  ) : (
    <p className="text-center p-3 font-bold text-md">
      No hay variantes disponibles
    </p>
  );
}
