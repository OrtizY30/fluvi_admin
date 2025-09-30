import React from "react";
import AdminMenu from "./AdminMenu";
import Logo from "../ui/Logo";

export default function Header() {
  return (
    <div className="bg-white flex-shrink-0 px-5 shadow-sm">
      <div className="flex items-center justify-start p-1">
        <div className=" flex items-center justify-between w-full ">
          <div className="w-16 h-5 flex items-center">
            <Logo />
          </div>
        </div>

        <AdminMenu />
      </div>
    </div>
  );
}
