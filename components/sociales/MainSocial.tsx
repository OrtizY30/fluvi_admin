import React from "react";
import SocialDetails from "./SocialDetails";
import { SocialMedia } from "@/src/schemas";
import { TfiHelpAlt } from "react-icons/tfi";

type MainSocialProps = {
    socialMedia: SocialMedia[]
}
export default function MainSocial({socialMedia}: MainSocialProps) {
  return (
    <div className="flex-1 px-11 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className=" rounded-md shadow-md border border-gray-100 ">
            <div className="p-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Agrega tus Perfiles de Redes Sociales
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                  Gestiona tus cuentas de redes sociales
                </p>
              </div>
            </div>
          </div>

          <div className=" rounded-md shadow-md border border-gray-100 ">
            <div className="p-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Perfiles de Redes Sociales
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                  Visualiza tus cuentas de redes sociales asociadas
                </p>
              </div>
            </div>
            <SocialDetails  socialMedia={socialMedia} />
          </div>
        </div>

        {/* Información adicional */}
        <div className=" rounded-md shadow-md p-6 border border-gray-100 ">
          <div className="flex items-start gap-4">
            <div className="icon-header">
            <TfiHelpAlt className="size-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">
                ¿Cómo conectar tus redes sociales?
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Conecta tus perfiles de redes sociales para que tus clientes puedan acceder desde tu menú digital, podras agregar Instagram, Facebook y TikTok.
              
              </p>
              <div className="flex gap-2">
                 <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-slate-300">
                  Gestión centralizada
                </div>
               <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-slate-300">
                  Programación automática
                </div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-slate-300">
                  Enlace hacia tus perfiles
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
