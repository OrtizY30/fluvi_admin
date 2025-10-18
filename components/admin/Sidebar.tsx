'use client'
import Logo from "../ui/Logo";
import MenuProduct from "./MenuProduct";
import MenuSetting from "./MenuSetting";
import NavItem from "../ui/NavItem";
import AdminMenu from "./AdminMenu";

export default function Sidebar() {
  return (
    <aside className="w-56 hidden bg-brand-primary h-screen md:flex justify-between flex-col flex-shrink-0">
      <div>
        <div
          className=" flex items-center justify-center w-full p-4
      "
        >
          <div className="w-48 relative h-12 flex items-center">
            <Logo />
          </div>
        </div>

        <nav className="flex space-y-1 flex-col justify-between h-full">
          <div className="space-y-1 px-4">
            <MenuProduct />
            {/* <MenuPedidos/> */}
            <NavItem label={"Pedidos"} link={"pedidos"} />
            <MenuSetting />
          </div>
        </nav>
      </div>
      <AdminMenu/>
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
