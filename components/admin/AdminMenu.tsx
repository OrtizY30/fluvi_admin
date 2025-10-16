"use client";

import * as React from "react";
import { logout } from "@/actions/auth/logout-user-action";
import { Avatar } from "@mui/material";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/16/solid";
import { useUserStore } from "@/store/useUserStore";
import { formatDate } from "@/src/utils";
import { CalendarRange, ChevronDown, ChevronUp, Headset, LogOut, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminMenu() {
  const [open, setOpen] = React.useState(false);
  const user = useUserStore((state) => state.user);
  const business = user?.business;

  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <div className="relative w-full">
      {/* Menú que aparece ARRIBA */}
      {open && (
        <div className="absolute w-full rounded-t-sm overflow-hidden bg-surface-base  bottom-full left-0 z-50  animate-fade-in">
          <div className="border-b flex gap-3 items-center bg-white border-gray-300 py-4 px-2">
           
          
            <Avatar
              alt="Logo del restaurante"
              src={business?.logo ?? ""}
              sx={{ width: 32, height: 32 }}
            />
          <div className=" text-sm">
            <p className="font-bold text-slate-800">{user?.name}</p>
            <p className="text-slate-700">
              {user?.email}
            </p>
          </div>
       
          </div>
          {/* Contenido del menú */}
          <div className="text-slate-800 border-b border-gray-300 p-2 py-4 text-sm space-y-6">
            <div className="flex justify-between items-center">
              <p className="flex items-center gap-2 ">
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
              <p className="flex items-center gap-2 ">
                <CalendarRange className="size-5" strokeWidth={1.5} />
                Fecha de pago
              </p>
              <p className="font-bold  mr-2">
                {user?.subscriptionEnd
                  ? formatDate(user.subscriptionEnd)
                  : "-----"}
              </p>
            </div>
            <div
              className="hover:text-brand-primary transition-all"
              onClick={toggleMenu}
            >
              <Link href={"#"} className="flex items-center gap-2 ">
                <Settings className="size-5" strokeWidth={1.5} />
                Configuración
              </Link>
            </div>
            <div
              className="hover:text-brand-primary transition-all"
              onClick={toggleMenu}
            >
              <Link className="flex items-center gap-2" href={"/admin/soporte"}>
                <Headset className="size-5" strokeWidth={1.5} />
                Soporte
              </Link>
            </div>
            <button
              className="w-full cursor-pointer text-slate-800 text-sm flex items-center gap-2 hover:text-brand-primary transition-all"
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
      title="Abrir"
        onClick={toggleMenu}
        className="flex w-full justify-between p-3 px-5  bg-white  cursor-pointer gap-2 items-center z-10"
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
              src={business?.logo ?? ""}
              sx={{ width: 42, height: 42 }}
            />
          </div>
        </div>

        <p>
        {open ? <ChevronUp className="zise-5 text-gray-500"  strokeWidth={2.5} /> :(
<ChevronDown className="zise-5 text-gray-500"  strokeWidth={2.5} />
        )}
          
        </p>
      </button>
    </div>
  );
}
