import { Product } from "@/src/schemas";
import { formatCurrency } from "@/src/utils";
import { useUserStore } from "@/store/useUserStore";
import { IconButton } from "@mui/material";
import { EllipsisVertical, Grip, Hamburger } from "lucide-react";
import React, { useState } from "react";
import ToggleAvailabilityButton from "../ui/ToggleAvailabilityButton";
import ProductForm from "./ProductForm";
import Image from "next/image";

export default function ProductDetails({ product }: { product: Product }) {
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="grid grid-cols-3 items-center justify-between border-t border-gray-200 p-2 ">
        <div className="flex lg:col-span-2 items-center gap-2 ">
          <IconButton component="span">
            <Grip className="text-gray-400 size-5" strokeWidth={1.25} />
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
          <p>{formatCurrency(product.price, user?.country!)}</p>

          <ToggleAvailabilityButton product={product} />

          <IconButton component="span">
            <EllipsisVertical className="size-6" strokeWidth={2} />
          </IconButton>
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
