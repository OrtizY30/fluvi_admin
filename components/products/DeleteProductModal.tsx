"use client";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/src/schemas";

export default function DeleteProductModal({
  productId,
}: {
  productId: Product["id"];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deleteProductId = searchParams.get("deleteProductId");

  const show = deleteProductId ? true : false;
  const [open, setOpen] = useState(show);

  const openDrawer = (id: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("deleteProductId", id.toString());
    router.replace(`?${params.toString()}`);
  };

  const closeDrawer = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("deleteProductId");
    router.replace(`?${params.toString()}`); 
  };

  const handleClickOpen = () => {
    setOpen(true);
    openDrawer(productId);
  };

  const handleClose = () => {
    setOpen(false);
    closeDrawer();
  };

  return (
    <>
      <button
        onClick={handleClickOpen} 
        type="button"
        title="Eliminar"
        className="p-1.5 cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-200 rounded-lg transition-colors"
      >
        <TrashIcon className="size-5" />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent 
         dividers={false}
          sx={{ padding: 0 }}
          className=" rounded-xl shadow-xl max-w-md w-full">
          {/* <ConfirmDeleteProduct product={prod} setOpen={setOpen} /> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
