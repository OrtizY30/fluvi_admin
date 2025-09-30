import React, { useState } from "react";
import ModifiersGroupDrawer from "./ModifiersGroupDrawer";
import { Plus } from "lucide-react";

export default function OpenDrawerModifiersGroup() {
  const [open, setOpen] = useState(false);

  const openForm = () => {
    setOpen(true);
  };


  return (
    <>
      <button
      onClick={openForm}
        type="button"
        title="Agregar modificador"
        className="font-bold rounded-xl flex items-center justify-center text-white bg-brand-primary gap-1 p-2.5 cursor-pointer shadow-md hover:bg-brand-primary/60  text-center transition-all"
      >
        <Plus strokeWidth={2} className="size-6" />
      </button>
      <ModifiersGroupDrawer open={open} setOpen={() => setOpen(false)} />
    </>
  );
}
