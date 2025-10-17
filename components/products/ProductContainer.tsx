"use client";

import { Category } from "@/src/schemas";
import { useUserStore } from "@/store/useUserStore";
import CategoryList from "../categories/CategoryList";
import CategoryTabs from "../categories/CategoryTabs";
import InputNameProfile from "../profile/InputNameProfile";
import LogoProfileUpload from "../profile/LogoProfileUpload";
import ImageProfileUpload from "../profile/ImageProfileUpload";
import SettingMenu from "./SettingMenu";
import ContainerPhone from "../ui/ContainerPhone";
export default function ProductContainer({
  categories,
}: {
  categories: Category[];
}) {
  const user = useUserStore((state) => state.user);

  const business = user?.business;

  return (
    <div className="flex-1  shadow-md ">
      <div className="w-full mx-auto grid   h-screen overflow-y-auto grid-cols-1 lg:grid-cols-3 ">
        {/* SECCIÓN SCROLLEABLE */}
        <div className="lg:col-span-2 pb-16 min-h-screen overflow-y-auto bg-surface-base-secundary relative">
          {/* Encabezado */}
          <div className="h-46 w-full relative">
            <div className="absolute w-full h-full bg-blue-400">
              <SettingMenu />
              <ImageProfileUpload image={business?.image} />
            </div>
            <div className="flex gap-4 items-end h-full px-6">
              <LogoProfileUpload image={business?.logo} />
              <InputNameProfile name={business?.name} />
            </div>
          </div>

          {/* Contenedor de categorias y productos */}
          <div className="relative space-y-3 p-3 ">
            <CategoryTabs  categories={categories} />
            <CategoryList categories={categories} />
          </div>
        </div>

        {/* SECCIÓN FIJA SIN SCROLL */}
       <ContainerPhone/>
      </div>
    </div>
  );
}
