import { createMethod } from "@/actions/paymentMethod/create-method-action";
import {
    CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Plus, X } from "lucide-react";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { useRouter } from "next/navigation";

export default function ModalMethodForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [state, dispatch, isPending] = useActionState(createMethod, {
      errors: [],
      success: "",
      data: {
        name: ''
      },
    });
  
    useEffect(() => {
      if (state.errors.length) {
        state.errors.forEach((error) =>
          toast.error(<FluviToast type="error" msg={error} />)
        );
      }
      if (state.success) {
        toast.success(<FluviToast type="success" msg={state.success} />);
        handleClose();
        router.refresh();
      }
    }, [state, router]);
  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="cursor-pointer text-blue-600 font-semibold flex items-center gap-1 hover:underline text-sm"
      >
        <Plus className="size-4 " strokeWidth={2} /> Agregar método de pago
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          borderRadius: 3,
        }}
      >
        <DialogTitle>
          <div className="flex items-center gap-6 justify-between">
            <p className="text-sm font-black text-gray-800">
              Agrega un nuevo método de pago
            </p>
            <IconButton onClick={handleClose}>
              <X className="size-6" />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <form action={dispatch} className="space-y-4">
            <TextField
              className="w-full"
              id="outlined-basic"
              variant="outlined"
              name="name"
              label="Método de pago"
              defaultValue={state.data.name || ''}
              size="small"
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4, // aquí se aplica el borderRadius al input
                },
              }}
            />
            <button
            disabled={isPending}
            type="submit" className="btn-form w-full mt-2 disabled:opacity-50">
              {isPending ? (
                <CircularProgress sx={{color: 'blue'}} size={'20px'}/>
              ): 'Guardar'}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
