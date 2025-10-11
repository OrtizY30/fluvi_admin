import { Branch } from "@/src/schemas";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogContent } from "@mui/material";
import React, { useState } from "react";
import ConfirmDeleteBranch from "./ConfirmDeleteBranch";

type BtnDeleteBranchProps = {
  branchId: Branch["id"];
};
export default function BtnDeleteBranch({ branchId }: BtnDeleteBranchProps) {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closedModal = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        type="button"
        title="Eliminar"
        className=" cursor-pointer text-red-500 hover:bg-red-100 p-2 rounded-lg transition-all"
      >
        <TrashIcon className="size-5" />
      </button>
      <Dialog
        open={open}
        onClose={closedModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          dividers={false}
          sx={{ padding: 0 }}
          className=" rounded-xl shadow-xl max-w-md w-full"
        >
          <ConfirmDeleteBranch branchId={branchId} closedModal={closedModal} />
        </DialogContent>
      </Dialog>
    </>
  );
}
