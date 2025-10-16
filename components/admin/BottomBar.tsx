"use client";
import { Drawer } from "@mui/material";
import { GalleryVerticalEnd, Menu, Palette } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import AdminMenu from "./AdminMenu";
import MenuProduct from "./MenuProduct";
import NavItem from "../ui/NavItem";
import MenuSetting from "./MenuSetting";

export default function BottomBar() {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="md:hidden h-16 w-full  fixed bottom-0 left-0 bg-brand-primary z-50 flex items-center ">
        <button className="flex cursor-pointer px-6 w-full  text-white text-xs font-bold">
          <Link
            href={"/admin/setting-theme"}
            className="flex  w-full flex-col items-center justify-center"
          >
            <Palette className="size-6" strokeWidth={2} />
            Temas
          </Link>
        </button>
        <button className="flex cursor-pointer  px-6 w-full  text-white text-xs font-bold">
          <Link
            href={"/admin/productos"}
            className="flex w-full flex-col items-center justify-center"
          >
            <GalleryVerticalEnd className="size-6" strokeWidth={2} />
            Menú  
          </Link>
        </button>
        <button
          onClick={() => setOpen(true)}
          className="flex cursor-pointer  px-6 w-full  text-white text-xs font-bold"
        >
          <p className="flex w-full flex-col items-center justify-center">
            <Menu className="size-6" strokeWidth={2} />
            Más
          </p>
        </button>
      </div>

      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        PaperProps={{
          sx: {
            // overflow: "hidden",
          },
        }}
      >
        <div className=" bg-brand-primary h-full justify-between flex flex-col overflow-hidden w-[70vw] relative ">
          {/* <div className="absolute  z-50 top-2  left-2 cursor-pointer text-white">
            <X onClick={onClose} className="size-6 bg-black/50 rounded-full" />
          </div> */}

          <nav className="flex mt-4 space-y-1 flex-col justify-between h-full">
            <div className="space-y-1 px-2">
              <MenuProduct />
              {/* <MenuPedidos/> */}
              <NavItem label={"Pedidos"} link={"pedidos"} />
              <MenuSetting />
            </div>
          </nav>

          <AdminMenu />
        </div>
      </Drawer>
    </>
  );
}
