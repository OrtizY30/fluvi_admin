"use client";

import { Branch } from "@/src/schemas";
import { VerifiedOutlined } from "@mui/icons-material";
import React from "react";
import { IoStorefrontOutline } from "react-icons/io5";
import BtnEditBranch from "../tiendas/BtnEditBranch";
import BtnDeleteBranch from "../tiendas/BtnDeleteBranch";
import { MapPin, Phone } from "lucide-react";
import BtnNewStore from "../tiendas/BtnNewStore";

export default function Branches({ branches }: { branches: Branch[] }) {
  return (
    <div className="w-full md:p-8  mt-4 bg-white mx-auto space-y-3 border md:rounded-xl border-gray-200  shadow-md">
      <div className="flex items-center justify-between px-2">
        <div className=" text-gray-800 ">
          <h1 className="font-black text-lg md:text-xl">Tiendas disponibles</h1>
          <p className="text-xs text-gray-500">
            Administra tus tiendas para que tus clientes seleccionen la tienda
            mas cercana
          </p>
        </div>
        <BtnNewStore />
      </div>

      <div className="flex flex-col gap-2">
        {branches.length ? (
          branches.map((branch) => (
            <div
              key={branch.id}
              className=" rounded-md shadow-md border border-gray-100 overflow-hidden"
            >
              <div className="p-2 md:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="flex-shrink-0 ">
                      <div className="p-2 rounded-full bg-brand-primary">
                        <IoStorefrontOutline className="size-7 text-white" />
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
                          <BtnEditBranch branch={branch} />
                          <BtnDeleteBranch branchId={branch.id} />
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-2 md:gap-10 mt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin
                            className=" text-gray-400 size-4"
                            strokeWidth={2}
                          />
                          <span className=" cursor-pointer">
                            {branch.address}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone
                            className=" text-gray-400 size-4"
                            strokeWidth={2}
                          />
                          <span>{branch.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-md font-bold text-gray-500">No tienes tiendas disponibles</p>
        )}
      </div>
    </div>
  );
}
