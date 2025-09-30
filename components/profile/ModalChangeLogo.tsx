import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { X } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

type ModalChangeLogoProps = {
  openDialog: boolean;
  handleClose: () => void;
  openWidget: () => void;
  handleChange: (url: string | null) => void;
  setImageUrl: Dispatch<SetStateAction<string>>;
};
export default function ModalChangeLogo({
  openDialog,
  handleClose,
  openWidget,
  handleChange,
  setImageUrl,
}: ModalChangeLogoProps) {
  const removeImage = () => {
    handleChange("");
    handleClose();
    setImageUrl("");
  };
  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent
        dividers={false}
        sx={{ padding: 0 }}
        className=" rounded-xl shadow-xl max-w-md w-full"
      >
        <DialogTitle sx={{ padding: 0 }} id="alert-dialog-title">
          <div className=" border-b border-gray-100">
            <div className="flex items-center justify-between p-6 pt-3">
              <h3 className="text-lg font-semibold text-gray-900">
                ¿Que deseas hacer?
              </h3>

              <IconButton onClick={handleClose}>
                <X className="size-6 " strokeWidth={2} />
              </IconButton>
            </div>
          </div>
        </DialogTitle>

        {/* Modal Content */}
        
          <div className="flex justify-between gap-5 p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
            <button
              type="button"
              className="text-sm hover:bg-neutral-700 hover:text-white cursor-pointer text-center w-42 rounded-sm p-2 border border-gray-300 bg-transparent transition-all"
              onClick={removeImage}
            >
              Quitar Imagen
            </button>
            <button
              type="button"
              onClick={() => {
                openWidget();
                handleClose();
              }}
              // disabled={!password}
              className=" text-sm  bg-btn-secondary text-white transition-all text-center  rounded-sm w-42 p-2 cursor-pointer"
            >
              Cambiar Imagen
            </button>
          
        </div>
      </DialogContent>
    </Dialog>
  );
}
