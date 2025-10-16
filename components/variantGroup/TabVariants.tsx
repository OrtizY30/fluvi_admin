import BtnCreateVariantGroup from "./BtnCreateVariantGroup";
import { Product } from "@/src/schemas";
import ConfirmDeleteVariants from "./ConfirmDeleteVariants";
import { useState } from "react";

export default function TabVariants({
  product,
  setModeSimple
}: {
  modeSimple: boolean;
  setModeSimple: (mode: boolean) => void;
  product: Product;
}) {
 const [openDialog, setOpenDialog] = useState(false);

  const handleClickSimple = () => {
    if (product.variantGroup) {
      // hay variantes: pedir confirmación para borrar
      setOpenDialog(true);
    } else {
      // no hay variantes: solo forzar el modo simple
      setModeSimple(true);
    }
  };

  const handleClose = () => setOpenDialog(false);

  return (
    <>
      <div className="flex items-center justify-between p-1.5 gap-2 border border-gray-300 rounded-2xl bg-gray-200 ">
        <button
          disabled={!product.variantGroup}
          type="button"
          onClick={handleClickSimple}
          className="disabled:bg-blue-600 disabled:text-white disabled:shadow-md disabled:border disabled:border-gray-300 font-semibold  py-1 rounded-lg w-full  cursor-pointer text-neutral-500 hover:bg-neutral-300 transition-all"
        >
          Simple
        </button>

        <BtnCreateVariantGroup
          onCreated={() => setModeSimple(false)} // 👈 cambia a variantes
          product={product}
        />
      </div>

      <ConfirmDeleteVariants
        handleClose={handleClose}
        open={openDialog}
        variantGroup={product.variantGroup!}
        onDeleted={() => {
            // 👇 cambiar a modo simple al eliminar
            setModeSimple(true);
            handleClose();
          }}
      />
    </>
  );
}
