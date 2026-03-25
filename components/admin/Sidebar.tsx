"use client";
import Logo from "../ui/Logo";
import MenuProduct from "./MenuProduct";
import MenuSetting from "./MenuSetting";
import MenuPedidos from "./MenuPedidos";
import MenuInventory from "./MenuInventory";
import NavItem from "../ui/NavItem";
import AdminMenu from "./AdminMenu";

export default function Sidebar() {
  return (
    <aside className="w-56 hidden bg-brand-primary h-screen md:flex justify-between flex-col flex-shrink-0 border-r border-white/10">
      <div className="flex flex-col h-full overflow-hidden">
        <div
          className=" flex items-center justify-center w-full p-4
      "
        >
          <div className="w-48 relative h-12 flex items-center">
            <Logo />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 gap-2 pb-4 custom-scroll">
          <MenuProduct />
          <MenuPedidos />
          <MenuInventory />
          <MenuSetting />
        </nav>
      </div>
      <AdminMenu />
      {/* <div className="p-4 ">
        <button
          className="w-full text-white flex items-center gap-3 px-3 py-2 text-sm font-bold cursor-pointer transition-all"
          onClick={async () => {
            await logout();
          }}
        >
          <LogOut className="size-5" strokeWidth={2.5} />
          Cerrar sesión
        </button>
      </div> */}
      {/* <AdminMenu/> */}
    </aside>
  );
}
