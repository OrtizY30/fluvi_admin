import { Pencil } from "lucide-react";
import React, { useState } from "react";
import HoraryModal from "../horary/HoraryModal";

export default function BtnEditHorary() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)} className="flex w-full justify-end items-center gap-1 text-blue-500 cursor-pointer hover:underline">
        <Pencil className="size-4" />
        <p className="">Editar</p>
      </div>

      <HoraryModal open={open} setOpen={() => setOpen(false)} />
    </>
  );
}
