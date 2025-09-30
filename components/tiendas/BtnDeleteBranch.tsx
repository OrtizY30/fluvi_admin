import { Branch } from '@/src/schemas';
import { TrashIcon } from '@heroicons/react/24/outline'
import { Dialog, DialogContent } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import ConfirmDeleteBranch from './ConfirmDeleteBranch';
 type BtnDeleteBranchProps = {
    branchId : Branch['id']
 }
export default function BtnDeleteBranch({branchId}: BtnDeleteBranchProps ) {
     const router = useRouter();
      const searchParams = useSearchParams();
      const deletedeleteGroupId = searchParams.get("deleteBranchId");
    
      const show = deletedeleteGroupId ? true : false;
      const [open, setOpen] = useState(show);
    
      const openDrawer = (id: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("deleteBranchId", id.toString());
        router.replace(`?${params.toString()}`);
      };
    
      const closeDrawer = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("deleteBranchId");
        router.replace(`?${params.toString()}`);
      };
    
      const handleClickOpen = () => {
        setOpen(true);
        openDrawer(branchId);
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
        className=" cursor-pointer text-red-500 hover:bg-red-100 p-2 rounded-lg transition-all"
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
          className=" rounded-xl shadow-xl max-w-md w-full"
        >
          <ConfirmDeleteBranch setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}
