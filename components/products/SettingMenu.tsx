import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IconButton } from "@mui/material";
import { Clock3,  Link2,  Palette, Settings, Settings2 } from "lucide-react";
import React, { useState } from "react";
import ModifiersGroupDrawer from "../modifiersGroup/ModifiersGroupDrawer";
import HoraryModal from "../horary/HoraryModal";
import SocialmediaModal from "../sociales/SocialModal";
import Link from "next/link";

export default function SettingMenu() {
  //   Estado para el Drawer de modificadores
  const [openModifierDrawer, setOpenModifierDrawer] = useState(false);
  //   Estado para controlar el Modal de Horarios
  const [openModalHorary, setOpenModalHorary] = useState(false);
  //   Estado para controlar el Modal de Redes Sociales
  const [openModalSocialMedia, setOpenModalSocialMedia] = useState(false);

  
  const handleClickOpenModalHorary = () => {
    setOpenModalHorary(true);
  };

  return (
    <>
      <div className="absolute right-1 top-1 z-100 rounded-lg bg-surface-base shadow-2xl ">
        <Menu>
          <MenuButton>
            <IconButton aria-label="more" id="long-button" component="span">
              <Settings className="size-6 text-gray-700 " />
            </IconButton>
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="bg-surface-base p-2 mt-2 rounded-xl border w-60 border-gray-200 shadow-md"
          >
            <MenuItem >
              <Link
            href="/admin/setting-theme"
                className="hover:bg-gray-100 hover:shadow-md rounded-xl  p-3 flex gap-2 text-gray-700 items-center  cursor-pointer transition-all"
              >
                <Palette className="size-5" strokeWidth={1.5} />

                <p className="text-sm font-semibold">Configuración de temas</p>
              </Link>
            </MenuItem>

            <MenuItem>
              <div
                className="hover:bg-gray-100 hover:shadow-md rounded-xl p-3 flex gap-2 text-gray-700 items-center w-full cursor-pointer transition-all"
                onClick={() => setOpenModifierDrawer(true)} // abrir diálogo al hacer click
              >
                <Settings2 className="size-5" strokeWidth={1.5} />
                <p className="text-sm font-semibold">Modificadores</p>
              </div>
            </MenuItem>
            <MenuItem>
              <div
                className="hover:bg-gray-100 hover:shadow-md rounded-xl p-3 flex gap-2 text-gray-700 items-center w-full cursor-pointer transition-all"
                onClick={handleClickOpenModalHorary} // abrir diálogo al hacer click
              >
                <Clock3 className="size-5" strokeWidth={1.5} />
                <p className="text-sm font-semibold">Horarios</p>
              </div>
            </MenuItem>

            <MenuItem>
              <div
                className="hover:bg-gray-100 hover:shadow-md rounded-xl  p-3 flex gap-2 text-gray-700 items-center w-full cursor-pointer transition-all"
                onClick={() => setOpenModalSocialMedia(true)} // abrir diálogo al hacer click
              >
                <Link2 className="size-5" strokeWidth={1.5} />

                <p className="text-sm font-semibold">Redes sociales</p>
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      <ModifiersGroupDrawer
        open={openModifierDrawer}
        setOpen={() => setOpenModifierDrawer(false)}
      />

      <HoraryModal
        open={openModalHorary}
        setOpen={() => setOpenModalHorary(false)}
      />

      <SocialmediaModal
        open={openModalSocialMedia}
        setOpen={() => setOpenModalSocialMedia(false)}
      />
    </>
  );
}
