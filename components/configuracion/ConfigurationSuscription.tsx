'use client'

import { CheckCircle, ChevronDown, ChevronUp, CreditCard } from "lucide-react";
import React, { useState } from "react";

export default function ConfigurationSuscription() {
    const [expanded, setExpanded] = useState(false);

  const beneficios = [
    "Más de 30 productos",
    "QR Code básico",
    "Soporte por email",
    "Panel administrativo",
    "Integración con Google Maps",
    "Personalización de colores",
  ];

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="p-[4px] rounded-xl bg-gradient-to-r from-orange-400 via-pink-500 to-yellow-400 shadow-md">
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-600" />
            <h1 className="text-xl font-semibold">Plan Actual</h1>
          </div>

          <div className="space-y-4">
            <div className="text-center py-6">
              <h3 className="text-2xl font-bold">Plan Gratuito</h3>
              <p className="text-gray-500 mt-2">Comienza con 15 días de prueba Gratis y sacale todo el jugo a <span className="font-bold text-brand-primary">Fluvi</span></p>
              <div className="mt-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-gray-500">/mes</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Todas las funciones disponible hasta agotar los 15 días</span>
              </div>
             
            </div>

            <button className="w-full rounded-md p-2 bg-orange-500 hover:bg-orange-600 text-white">
              Actualizar a Pro
            </button>
          </div>
        </div>
      </div>

{/* Plan Simple */}
       <div className="p-[4px] rounded-xl bg-gradient-to-r from-orange-400 via-pink-500 to-yellow-400 shadow-md">
      <div className="bg-white rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-green-600" />
          <h1 className="text-xl font-semibold">Plan Simple</h1>
        </div>

        {/* Precio */}
        <div className="text-center py-6">
          <h3 className="text-2xl font-bold">Plan Simple</h3>
          <p className="text-gray-500 mt-2">Perfecto para empezar</p>
          <div className="mt-4">
            <span className="text-3xl font-bold">$10</span>
            <span className="text-gray-500">/mes</span>
          </div>
        </div>

        {/* Beneficios */}
        <div className="space-y-2">
          {(expanded ? beneficios : beneficios.slice(0, 3)).map((beneficio, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>{beneficio}</span>
            </div>
          ))}

          {/* Botón expandir/colapsar */}
          <button
            onClick={toggleExpanded}
            className="flex items-center justify-center gap-1 text-sm text-blue-600 hover:underline w-full mt-2"
          >
            {expanded ? (
              <>
                Ver menos <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Ver más <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* CTA */}
        <button className="w-full mt-4 rounded-md p-2 bg-orange-500 hover:bg-orange-600 text-white">
          Actualizar a Pro
        </button>
      </div>
    </div>

      <div className="p-[4px] rounded-xl bg-gradient-to-r from-orange-400 via-pink-500 to-yellow-400 shadow-md">
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-600" />
            <h1 className="text-xl font-semibold">Plan Actual</h1>
          </div>

          <div className="space-y-4">
            <div className="text-center py-6">
              <h3 className="text-2xl font-bold">Plan Gratuito</h3>
              <p className="text-gray-500 mt-2">Perfecto para empezar</p>
              <div className="mt-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-gray-500">/mes</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Hasta 30 productos</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>QR Code básico</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Soporte por email</span>
              </div>
            </div>

            <button className="w-full rounded-md p-2 bg-orange-500 hover:bg-orange-600 text-white">
              Actualizar a Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
