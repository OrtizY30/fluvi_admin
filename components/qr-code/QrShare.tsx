import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { LinkIcon } from "@heroicons/react/24/outline";
import { FluviToast } from "../ui/FluviToast";
import { toast } from "react-toastify";
import { Share2 } from "lucide-react";
import { WhatsApp } from "@mui/icons-material";

export default function QrShare({ qrUrl }: { qrUrl: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(qrUrl);
      toast.success(<FluviToast type="success" msg={"Enlace copiado"} />);
      handleClose();
    } catch (error) {
      console.log(error)
      toast.success(
        <FluviToast type="error" msg={"Error al copiar el enlace"} /> 
      );
    } 
  };

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(`¡Mira nuestro menú digital! ${qrUrl}`);
    window.open(`https://wa.me/?text=${message}`, "_blank");
    handleClose();
  };
  return (
    <div>
      <button
        className="bg-blue-700 flex gap-2 p-2 px-3 text-white rounded-md text-xs md:text-sm cursor-pointer hover:bg-blue-400 transition-all"
        id="fade-button"
        onClick={handleClick}
      >
        <Share2 className="size-4 md:size-5" strokeWidth={1.5} /> Compartir
      </button>
      <Menu
        id="fade-menu"
        slotProps={{
          list: {
            "aria-labelledby": "fade-button",
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleShareWhatsApp} className="space-x-2 ">
          <WhatsApp className="text-green-700" />
          <p className="text-xs">WhatsApp</p>
        </MenuItem>
        <MenuItem onClick={handleCopyLink} className="space-x-2 ">
          <LinkIcon className="size-4 text-blue-800" />
          <p className="text-xs">Copiar Enlace</p>{" "}
        </MenuItem>
      </Menu>
    </div>
  );
}
