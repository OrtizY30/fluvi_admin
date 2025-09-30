"use client";
import { createBranch } from "@/actions/branch/create-branch";
import {
  CircularProgress,
  Dialog,
  Drawer,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { Branch } from "@/src/schemas";
import { updateBranch } from "@/actions/branch/update-branch";
import { X } from "lucide-react";

type StoreFormProps = {
  branch?: Branch;
  open: boolean;
  onClose: () => void;
};
export default function StoreForm({ open, onClose, branch }: StoreFormProps) {
  const isEditMode = !!branch;

  const updateBrachWithId = updateBranch.bind(null, branch?.id!);

  const [state, dispatch, isPending] = useActionState(
    isEditMode ? updateBrachWithId : createBranch,
    {
      errors: [],
      success: "",
      data: {
        name: "",
        address: "",
        phone: "",
      },
    }
  );

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error} />);
      });
    }

    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />, {});
      onClose();
    }
  }, [state]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 6, // aquí sí se aplica
        },
      }}
    >
      <div className=" w-xl h-full flex flex-col justify-between">
        <div className="p-6 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {isEditMode ? "Editar Tienda" : "  Nueva Tienda"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Completa la información de la tienda
            </p>
          </div>
          <IconButton onClick={onClose}>
            <X className="size-6" strokeWidth={2} />
          </IconButton>
        </div>
        <form
          action={dispatch}
          noValidate
          className="flex h-full justify-between flex-col p-6 w-full gap-6"
        >
          <div className="space-y-10">
            <div>
              <TextField
                className="w-full"
                id="outlined-basic"
                variant="outlined"
                name="name"
                label="Descripción de la tienda"
                defaultValue={branch?.name || state.data.name}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4, // aquí se aplica el borderRadius al input
                  },
                }}
              />
            </div>

            <div>
              <TextField
                className="w-full"
                id="outlined-basic"
                variant="outlined"
                name="address"
                label="Dirección"
                defaultValue={branch?.address || state.data.address}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4, // aquí se aplica el borderRadius al input
                  },
                }}
              />
            </div>

            <div>
              <TextField
                className="w-full"
                id="outlined-basic"
                variant="outlined"
                name="phone"
                label="Teléfono"
                defaultValue={branch?.phone || state.data.phone}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4, // aquí se aplica el borderRadius al input
                  },
                }}
              />
            </div>
          </div>

          <button disabled={isPending} type="submit" className="btn-form">
            {isPending ? (
              <CircularProgress size="20px" sx={{ color: "white" }} />
            ) : isEditMode ? (
              "Guardar cambios"
            ) : (
              "Crear Tienda"
            )}
          </button>
        </form>
      </div>
    </Dialog>
  );
}
