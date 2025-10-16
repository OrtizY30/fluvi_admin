'use client'

import React, { useState } from "react";
import StoreForm from "./StoreForm";
import { Plus } from "lucide-react";

export default function BtnNewStore() {
  const [open, setOpen] = useState(false)

  const openForm = () => {
    openDrawer(); // esta función actualiza la URL
  };


  const openDrawer = () => {
    setOpen(true)
  };

  const closeDrawer = () => {
    setOpen(false)
  };
  return (
    <>
      <button onClick={openForm} type="button" className="bg-blue-700 px-4 items-center gap-1 flex text-white md:rounded-lg rounded-sm py-2 cursor-pointer justify-center text-xs min-w-40">
        <Plus className="size-4 "  />
        Crear tienda
      </button>

      <StoreForm open={open} onClose={closeDrawer} />
    </>
  );
}
