"use client";

import { Branch } from "@/src/schemas";
import {  Pencil, Store } from "lucide-react";
import { useBusinessStore } from "@/store/useBusinessStore";
import { TextField } from "@mui/material";

type ContentTiendaProps = {
  branchs: Branch[];
};

export default function ContentTienda({ branchs }: ContentTiendaProps) {
  const business = useBusinessStore((state) => state.business);
  if (!business) return;
  return (
    <div className="w-full p-6 s bg-white mx-auto space-y-3 border rounded-xl border-gray-200  shadow-md">
      {/* Tabs - Fixed */}
      {/* <div className="flex justify-between  flex-shrink-0">
        
        <BtnNewStore />
      </div> */}

      {/* Content - Scrollable */}

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
      <div className="px-10 text-gray-800 py-3 flex items-center border-b border-gray-200">
        <p className="w-full font-semibold">Tiendas</p>
        <div className="flex justify-end gap-4 items-center w-full">
          {branchs.length ? (
            branchs.map((branch) => (
              <div className="flex items-center flex-col" key={branch.id}>
                <p>{branch.name}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 font-bold">
              No tienes tiendas disponibles
            </p>
          )}
          <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
            <Pencil className="size-4" />
            <p>Editar</p>
          </div>
        </div>
      </div>

<div className="px-10 text-gray-800 py-3 flex items-center border-b border-gray-200">
   <p className="w-full font-semibold">Horario de atención</p>
   <div className="flex w-full justify-end items-center gap-1 text-blue-500 cursor-pointer hover:underline">
            
           <Pencil className="size-4" />
            <p className="">Editar</p>
          </div>
</div>

<div className="px-10 text-gray-800 py-3 flex items-center border-b border-gray-200">
   <p className="w-full font-semibold">Redes sociales</p>
   <div className="flex w-full justify-end items-center gap-1 text-blue-500 cursor-pointer hover:underline">
            <Pencil className="size-4" />
            <p className="">Editar</p>
          </div>
</div>


      {/* <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-4 pb-4">
          {branchs.length ? (
branchs.map(branch => (
    <div key={branch.id} className=" rounded-md shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="flex-shrink-0 ">
                    <div className="p-2 rounded-full bg-brand-primary">

                   <IoStorefrontOutline className="size-7 text-white"  />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {branch.name}
                        </h3>
                        <div className="flex rounded-xl p-1 max-w-24 font-bold justify-center items-center gap-1 bg-green-100 text-green-700 text-xs">
                          <VerifiedOutlined fontSize="small" />
                          <p className="text-xs">Disponible</p> 
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                       <BtnEditBranch branch={branch}/>
                        <BtnDeleteBranch branchId={branch.id}/>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        
                        <MapPin className=" text-gray-400 size-4" strokeWidth={2} />
                        <span className=" cursor-pointer">
                         {branch.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                      
                        <Phone className=" text-gray-400 size-4" strokeWidth={2} />
                        <span>{branch.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
))
          ): (
<div className="flex-1 flex items-center justify-center">
        <div className="text-center flex flex-col items-center">
          <div className="h-32 w-32 flex items-center justify-center mx-auto mb-4">
            
            
            <Image
            src={'/location.png'}
            alt=""
            width={120}
            height={120}/>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            No tienes tiendas disponibles.
          </h2>
          <p className="text-xs text-gray-600 mb-6">
            Las tiendas se mostrarán aquí una vez que estén creadas o
            disponibles en tu cuenta.
          </p>
          <BtnNewStore />
        </div>
      </div> 
          )}
        </div>
      </div> */}
    </div>
  );
}
