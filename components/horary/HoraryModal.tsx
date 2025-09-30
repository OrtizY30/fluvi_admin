import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React from "react";
import HoraryForm from "./HoraryForm";
import { useHorariesStore } from "@/store/useHorariesStore";
import { X } from "lucide-react";

type HoraryModalProps = {
  open: boolean;
  setOpen: () => void;
};

export default function HoraryModal({ open, setOpen }: HoraryModalProps) {
  const horaries = useHorariesStore((state) => state.horaries);
  if (!horaries) return;

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
              <p className=" font-bold text-sm">Horario de atención</p>
              <IconButton onClick={setOpen}>
                <X strokeWidth={2} className="size-6 " />
              </IconButton>
            </DialogTitle>
      
      <DialogContent
        dividers={false}
        sx={{ padding: 0 }}
        className=" rounded-xl shadow-xl w-auto sm:w-xl"
      >
        <div className=" py-4 px-2  text-center  text-yellow-700 w-full text-sm ">
          ⚠️ Para indicar un día cerrado, coloca el horario en{" "}
          <b>12:00 - 12:00</b>.
        </div>
        <div className="sm:px-4 px-2 flex flex-col">
          {horaries.map((horary) => (
            <HoraryForm key={horary.id} horary={horary} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
