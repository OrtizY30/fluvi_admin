import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Dialog, DialogContent } from "@mui/material";
import ConfirmDeleteProduct from "./ConfirmDeleteProduct";
import { Category, Product } from "@/src/schemas";
import ToggleAvailabilityMobile from "../ui/TooglevailabilityMobile";
import MoveProductButtons from "./MoveProductButtons";

type ProductMenuProps = {
  setOpen: () => void;
  product: Product;
  category: Category
};
export default function ProductMenu({ setOpen, product, category }: ProductMenuProps) {
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
          className="bg-surface-base   border border-gray-200 shadow-md rounded-md"
        >
          <MenuItem>
            <div
              className="hover:bg-gray-200 border-b border-gray-300  p-4 flex text-gray-700 items-center w-full gap-1 cursor-pointer"
              onClick={openForm} // abrir diálogo al hacer click
            >
              <Pencil className="size-4" strokeWidth={2} />

              <span className="text-xs font-semibold">Ver producto</span>
            </div>
          </MenuItem>

          {/* Toogle button */}
          <ToggleAvailabilityMobile product={product} />

          {/* Move Button */}
          <MoveProductButtons category={category} id={product.id} />

          <MenuItem>
            <div
              className="flex items-center   p-4 hover:bg-gray-200 w-full gap-1 cursor-pointer"
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
