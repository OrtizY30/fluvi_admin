"use client";

import * as React from "react";
import { logout } from "@/actions/auth/logout-user-action";
import { Avatar } from "@mui/material";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import NavItem from "../ui/NavSubItem";
import { BoltIcon } from "@heroicons/react/16/solid";
import { useUserStore } from "@/store/useUserStore";
import { formatDate } from "@/src/utils";
import { CalendarRange, LogOut } from "lucide-react";

export default function AdminMenu() {
  const [open, setOpen] = React.useState(false);
  const user = useUserStore((state) => state.user);
  const business = user?.business;

  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <div className="relative m-1 shadow-md bg-surface-base rounded-xl py-3 px-1 mb-4">
      {/* Menú que aparece ARRIBA */}
      {open && (
        <div className="absolute w-full bg-surface-base pb-4 bottom-full left-0 -mb-3 z-50 rounded-t-xl py-2 px-1 animate-fade-in">
          {/* Contenido del menú */}
          <div className="text-slate-800 capitalize text-sm space-y-3">
            <div className="flex justify-between items-center">
              <p className="flex items-center gap-2 text-xs">
                <CreditCardIcon className="size-5" />
                Suscripción 
              </p>
              <p
                className={`${
                  user?.subscriptionType === "pro"
                    ? "bg-green-800 border border-green-900"
                    : user?.subscriptionType === "simple"
                    ? "bg-yellow-400 border border-yellow-500"
                    : "bg-blue-800 border border-blue-900"
                } text-white font-bold flex items-center gap-1 rounded-full px-2 py-0.5 text-xs uppercase`}
              >
                <BoltIcon className="size-3" />
                {user?.subscriptionType}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="flex items-center gap-2 text-xs">
                <CalendarRange className="size-5" strokeWidth={1.5} />
                Fecha de pago
              </p>
              <p className="font-bold text-xs">
                {user?.subscriptionEnd ? formatDate(user.subscriptionEnd) : "-----"}
              </p>
            </div>
          </div>

          <div className="bg-brand-primary mt-4 rounded-md">
            <div className="hover:bg-surface-base transition-all" onClick={toggleMenu}>
              <NavItem link="settings" label="configuracion" />
            </div>
            <div className="hover:bg-surface-base transition-all" onClick={toggleMenu}>
              <NavItem link="soporte" label="soporte" />
            </div>
            <button
              className="w-full text-white flex items-center gap-3 px-3 py-2 text-xs hover:bg-surface-base hover:text-brand-primary transition-all"
              onClick={async () => {
                await logout();
              }}
            >
              <LogOut className="size-5" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* Botón principal */}
      <button
        onClick={toggleMenu}
        className="flex w-full cursor-pointer gap-2 items-center z-10"
      >
        <div
          className={`rounded-full p-[2px] bg-gradient-to-tr ${
            business?.isOpen
              ? "from-green-700 via-lime-500 to-green-700"
              : "from-red-300 via-red-500 to-red-700"
          }`}
        >
          <div className="rounded-full bg-white p-[1px]">
            <Avatar
              alt="Logo del restaurante"
              src={business?.logo ?? "/default-logo.png"}
              sx={{ width: 42, height: 42 }}
            />
          </div>
        </div>

        <div className="text-left">
          <p className="text-sm font-bold capitalize">{business?.name}</p>
          <p className="text-xs text-gray-700">{user?.domain}.fluvi.net</p>
        </div>
      </button>
    </div>
  );
}
