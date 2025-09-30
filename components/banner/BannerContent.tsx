"use client";

import { Help } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import BannerImageForm from "./BannerImageForm";
import BannerPhone from "./BannerPhone";
import { useUserStore } from "@/store/useUserStore";

export default function BannerContent() {

    const user = useUserStore((state) => state.user);
    const business = user?.business;
    const [imageUrl, setImageUrl] = useState("");
    // Cuando cambia el banner del negocio, actualiza imageUrl
useEffect(() => {
  if (business?.banner) {
    setImageUrl(business.banner);
  }
}, [business?.banner]);
  return (
    <div className="flex-1 px-11 pt-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
          <div className="lg:col-span-2 space-y-6">
            {/* Información del Banner */}
            <div className="bg-blue-50 shadow-md  rounded-md p-4">
              <div className="flex items-start gap-3">
                <Help fontSize="medium" className=" text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-blue-900 mb-2">
                    ¿Qué es el Banner Promocional?
                  </h3>
                  <p className="text-xs text-blue-800 mb-3">
                    El banner promocional es una imagen que se mostrará en la
                    parte superior de tu menú digital. Es perfecto para destacar
                    ofertas especiales, productos en promoción o información
                    importante que quieras que tus clientes vean de inmediato.
                  </p>
                  <div className="text-xs text-blue-800">
                    <strong>Usos recomendados:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Promociones y descuentos especiales</li>
                      <li>Nuevos productos o platos del día</li>
                      <li>Horarios especiales o eventos</li>
                      <li>Información importante para clientes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de Banner */}
            <BannerImageForm imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </div>

          {/* Vista previa del Banner en el teléfono */}
          <BannerPhone
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
          />
        </div>
      </div>
    </div>
  );
}
