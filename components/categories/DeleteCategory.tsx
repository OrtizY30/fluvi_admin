import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ConfirmDeleteCategory from "./ConfirmDeleteCategory";
import { Dialog, DialogContent } from "@mui/material";
import { Category } from "@/src/schemas";
import MoveCategoryButtons from "./MoveCategoryButton";

export default function DeleteCategory({ category }: { category: Category }) {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Menu >
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
        <MoveCategoryButtons id={category.id}  />
          <MenuItem>
            <div
              className="flex items-center w-full gap-1 p-4 cursor-pointer"
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
          <ConfirmDeleteCategory category={category} setOpen={setOpenDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
}
