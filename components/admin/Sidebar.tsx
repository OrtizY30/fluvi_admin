import Logo from "../ui/Logo";
import MenuProduct from "./MenuProduct";
import MenuSetting from "./MenuSetting";
import NavItem from "../ui/NavItem";

export default function Sidebar() {
  return (
    <aside className="w-56 h-screen flex flex-col flex-shrink-0">
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

      {/* <AdminMenu/> */}
    </aside>
  );
}
