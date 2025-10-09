import { Branch } from "@/src/schemas";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import StoreForm from "./StoreForm";

type BtnEditBranchProps = {
  branch: Branch;
};
export default function BtnEditBranch({ branch }: BtnEditBranchProps) {
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
      <button
        onClick={openForm}
        title="Editar"
        className=" cursor-pointer p-2 rounded-lg text-slate-500 hover:bg-gray-300 hover:text-gray-700 transition-colors"
      >
        <PencilSquareIcon className="size-6" />
      </button>

      <StoreForm open={open} onClose={closeDrawer} branch={branch} />
    </>
  );
}
