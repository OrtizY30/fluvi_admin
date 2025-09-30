"use client";

import Image from "next/image";
import { Category } from "@/src/schemas";
import { useUserStore } from "@/store/useUserStore";
import CategoryList from "../categories/CategoryList";
import CategoryTabs from "../categories/CategoryTabs";
import InputNameProfile from "../profile/InputNameProfile";
import LogoProfileUpload from "../profile/LogoProfileUpload";
import ImageProfileUpload from "../profile/ImageProfileUpload";
import { Settings } from "lucide-react";
import { IconButton } from "@mui/material";
import SettingMenu from "./SettingMenu";

export default function ProductContainer({
  categories,
}: {
  categories: Category[];
}) {
  const user = useUserStore((state) => state.user);

  const business = user?.business;

  return (
    <div className="flex-1 overflow-y-auto h-screen shadow-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 h-full shadow-md  bg-surface-base-secundary relative  ">
          {/* Encabezado */}
          <div className="h-46  w-full relative">
            <div className="absolute w-full h-full bg-blue-400  ">
              {/* Boton de opciones */}
              <SettingMenu />

              {/* Imagen Portada */}

              <ImageProfileUpload image={business?.image} />
            </div>
            <div className="flex gap-4 items-end  h-full px-6 ">
              <LogoProfileUpload image={business?.logo} />
              <InputNameProfile name={business?.name!} />
            </div>{" "}
          </div>

          {/* Contenedor de categorias y productos */}
          <div className="relative  space-y-3 p-3">
            <CategoryTabs />

            <CategoryList categories={categories} />
          </div>
        </div>

        <div className="lg:col-span-1 bg-[#f4f6f8] h-screen overflow-hidden">
          <div className=" sticky top-20">
            {/* Simulador de Celular */}
            <div
              className="relative mx-auto "
              style={{ width: "280px", height: "450px" }}
            >
              {/* Marco del celular */}
              <Image
                src="/phone.png"
                alt="Simulador de Celular"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
