"use client";

import Image from "next/image";
import { Category } from "@/src/schemas";
import { useUserStore } from "@/store/useUserStore";
import CategoryList from "../categories/CategoryList";
import CategoryTabs from "../categories/CategoryTabs";
import InputNameProfile from "../profile/InputNameProfile";
import LogoProfileUpload from "../profile/LogoProfileUpload";
import ImageProfileUpload from "../profile/ImageProfileUpload";
import SettingMenu from "./SettingMenu";

export default function ProductContainer({
  categories,
}: {
  categories: Category[];
}) {
  const user = useUserStore((state) => state.user);

  const business = user?.business;

  return (
   <div className="flex-1 h-screen shadow-md">
  <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 h-full">
    
    {/* SECCIÓN SCROLLEABLE */}
    <div className="lg:col-span-2 h-full  overflow-y-auto bg-surface-base-secundary relative">
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
      <div className="relative space-y-3 p-3">
        <CategoryTabs />
        <CategoryList categories={categories} />
      </div>
    </div>

    {/* SECCIÓN FIJA SIN SCROLL */}
    <div className="lg:col-span-1 bg-[#f4f6f8] hidden lg:flex items-center justify-center h-screen overflow-hidden">
  <div className="flex justify-center items-center h-full">
    {/* Simulador de Celular */}
    <div className="relative p-2" style={{ width: "280px", height: "600px" }}>
      <Image
        src="/phone.png"
        alt="Simulador de Celular"
        width={270}
        height={590}
        objectFit="cover"
        className="pointer-events-none absolute z-50"
      />

      {/* Vista del subdominio dentro del teléfono */}
     <div
    className="absolute top-[28px] left-[30px] origin-top-left"
    style={{
      transform: "scale(0.7)", // <-- ajusta este valor (0.6, 0.8, etc.)
      width: "343px", // compensar el ancho por la escala
      height: "711px", // compensar el alto
    }}
  >
    <iframe
      src={`https://${user?.domain}.fluvi.shop/menu`}
      width="100%"
      height="100%"
      style={{
        border: "none",
        // borderRadius: "20px",
      }}
    ></iframe>
 
</div>
    </div>
  </div>
</div>
  </div>
</div>

  );
}
