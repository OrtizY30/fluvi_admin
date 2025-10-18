import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Dialog, DialogContent } from "@mui/material";
import ConfirmDeleteProduct from "./ConfirmDeleteProduct";
import { Product } from "@/src/schemas";

type ProductMenuProps = {
  setOpen: () => void;
  product: Product;
};
export default function ProductMenu({ setOpen, product }: ProductMenuProps) {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const openForm = () => {
    setOpen();
  };

  return (
    <>
      <Menu>
        <MenuButton>
          <IconButton aria-label="more" id="long-button" component="span">
            <EllipsisVertical className="size-6" strokeWidth={2} />
          </IconButton>
        </MenuButton>

        <MenuItems
          transition
          anchor="top end"
          className="bg-surface-base border border-gray-200 shadow-md rounded-md"
        >
          <MenuItem>
            <div
              className="hover:bg-gray-200 p-2 flex text-gray-700 items-center w-full gap-1 cursor-pointer"
              onClick={openForm} // abrir diálogo al hacer click
            >
              <Pencil className="size-4" strokeWidth={2} />

              <span className="text-xs font-semibold">Ver producto</span>
            </div>
          </MenuItem>

          <MenuItem>
            <div
              className="flex items-center p-2 hover:bg-gray-200 w-full gap-1 cursor-pointer"
              onClick={handleClickOpen} // abrir diálogo al hacer click
            >
              <Trash2 className="text-red-600 size-4" />
              <span className="text-red-500 text-xs font-semibold">
                Eliminar
              </span>
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>

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
          <ConfirmDeleteProduct product={product} setOpen={setOpenDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
}
