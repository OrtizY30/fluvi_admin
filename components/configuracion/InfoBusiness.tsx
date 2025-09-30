"use client";

import { Branch } from "@/src/schemas";
import { Pencil, Store } from "lucide-react";
import { useBusinessStore } from "@/store/useBusinessStore";
import { TextField } from "@mui/material";
import BtnEditStore from "./BtnEditStore";
import BtnEditHorary from "./BtnEditHorary";
import BtnEditSocialMedia from "./BtnEditSocialMedia";

type ContentTiendaProps = {
  branches: Branch[];
};

export default function InfoBusiness({ branches }: ContentTiendaProps) {
  const business = useBusinessStore((state) => state.business);
  if (!business) return;
  return (
    <div className="w-full p-6 s bg-white mx-auto space-y-3 border rounded-xl border-gray-200  shadow-md">
      <div className="flex items-center gap-2 text-gray-800">
        <Store strokeWidth={2} />
        <h1 className="font-black text-xl">Informacion del Negocio</h1>
      </div>

      <div className="px-10 py-3 flex items-center text-gray-800 border-b border-gray-200">
        <p className="w-full font-semibold">Nombre del negocio</p>
        <TextField
          name="name"
          value={business.name}
          // onChange={handleChange}
          className="w-full"
          id="outlined-basic"
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 4, // aquí se aplica el borderRadius al input
            },
          }}
        />
        {/* <InputNameProfile name={business!.name} /> */}
      </div>

      {/* Contenedor de tiendas */}
      <div className="px-10 text-gray-800 py-3 flex items-center border-b border-gray-200">
        <p className="w-full font-semibold">Tiendas</p>
        <div className="flex flex-col justify-end gap-4  w-full">
          {branches.length ? (
            branches.map((branch) => (
              <div className="flex items-center " key={branch.id}>
                <p className="text-xs text-gray-600">{branch.name}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 font-bold">
              No tienes tiendas disponibles
            </p>
          )}
        </div>
          <BtnEditStore />
      </div>

{/* Contenedor de horario */}
      <div className="px-10 text-gray-800 py-3 flex items-center border-b border-gray-200">
        <p className="w-full font-semibold">Horario de atención</p>
        <BtnEditHorary/>
      </div>

{/* Contenedor de Redes Sociales */}
      <div className="px-10 text-gray-800 py-3 flex items-center border-b border-gray-200">
        <p className="w-full font-semibold">Redes sociales</p>
        <BtnEditSocialMedia/>
      </div>
    </div>
  );
}
