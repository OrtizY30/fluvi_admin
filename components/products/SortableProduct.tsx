"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Product } from "@/src/schemas";
import { formatCurrency } from "@/src/utils";
import { useUserStore } from "@/store/useUserStore";
import { IconButton } from "@mui/material";
import { EllipsisVertical, Grip, Hamburger } from "lucide-react";
import React, { useState } from "react";
import ToggleAvailabilityButton from "../ui/ToggleAvailabilityButton";
import ProductForm from "./ProductForm";
import Image from "next/image";
import ProductMenu from "./ProductMenu";

export default function SortableProduct({ product }: { product: Product }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: product.id,
    });

  const user = useUserStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const discount = (product: Product) => {
    const discountPercent = Math.round(
      ((product.price! - product.discount!) / product.price!) * 100
    );
    return discountPercent;
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="grid grid-cols-3 items-center justify-between border-t border-gray-200 p-2 "
      >
        <div className="flex lg:col-span-2 items-center gap-2 ">
          <IconButton component="span" {...attributes} {...listeners}>
            <Grip
              className="text-btn-secondary size-5 cursor-grab active:cursor-grabbing"
              strokeWidth={2}
            />
          </IconButton>

          <div className="flex items-center gap-2">
            {product.image ? (
              <div className="relative w-7 h-7">
                <Image
                  src={product.image}
                  alt="Imagen del producto"
                  width={40}
                  height={28}
                  className="rounded-lg object-cover"
                />
              </div>
            ) : (
              <Hamburger
                className="text-gray-400 p-1 size-8 rounded-lg bg-gray-200 border border-gray-400"
                strokeWidth={1.5}
              />
            )}

            <p
              onClick={handleOpen}
              className="hover:underline cursor-pointer hover:text-blue-800"
            >
              {product.name}
            </p>
          </div>
        </div>

        <div className="flex lg:col-span-1 justify-end items-center gap-2">
          <div>
            {product.price ? (
              product.isOnSale ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 line-through">
                      {formatCurrency(product.price!, user!.country)}
                    </span>
                    <span className="text-[10px] shadow-md shadow-orange-800  bg-orange-300 text-orange-600 font-bold px-2 py-0.5 rounded-full animate-pulse">
                      {discount(product)}% OFF
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    {formatCurrency(product.discount!, user!.country)}
                  </span>
                </div>
              ) : (
                <p className="text-sm font-semibold text-slate-700">
                  {formatCurrency(product.price!, user!.country)}
                </p>
              )
            ) : (
              <p className=" font-bold text-gray-400">- - - - - -</p>
            )}
          </div>

          <ToggleAvailabilityButton product={product} />

          <ProductMenu product={product} setOpen={() => setOpen(true)} />
        </div>
      </div>
      <ProductForm
        open={open}
        setOpen={() => setOpen(false)}
        product={product}
      />
    </>
  );
}
