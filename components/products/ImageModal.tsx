import { Product } from "@/src/schemas";
import { Dialog, DialogContent } from "@mui/material";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

type ImageModalProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  image: Product['image']
};
export default function ImageModal({ open, setOpen, image }: ImageModalProps) {
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogContent>
         <div className="h-96 w-80" >

          <Image
            fill
            src={image!}
            alt="Imagen del producto"
            style={{ objectFit: "cover" }}
            />
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
