import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React from "react";
import { X } from "lucide-react";
import SocialMediaForm from "./SocialMediaForm";

type SocialmediaModalProps = {
  open: boolean;
  setOpen: () => void;
};

export default function SocialmediaModal({
  open,
  setOpen,
}: SocialmediaModalProps) {
  return (
    <Dialog
      open={open}
      onClose={setOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 6, // aquí sí se aplica
        },
      }}
    >
      <DialogTitle className="text-gray-800 border-b border-b-gray-200 flex items-center justify-between">
        <p className=" font-bold text-sm">Administra tus redes sociales</p>
        <IconButton onClick={setOpen}>
          <X strokeWidth={2} className="size-6 " />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers={false}
        sx={{ padding: 0 }}
        className=" rounded-xl shadow-xl w-auto sm:w-xl"
      >
        <div className=" py-4 px-2 text-center  text-gray-700 w-full text-sm ">
          Activa los botones que se veran en tu App
        </div>
        <div className="sm:px-6 px-2 flex flex-col">
          <SocialMediaForm setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
