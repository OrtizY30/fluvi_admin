"use client";
import { useUserStore } from "@/store/useUserStore";
import { ExternalLink, RefreshCcw } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

export default function ContainerPhone() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const user = useUserStore((state) => state.user);

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src; // 🔄 recarga el iframe
    }
  };

  const domainUrl = `https://${user?.domain}.fluvi.shop/menu`;
  return (
    <div className="lg:col-span-1 pt-4 gap-6 bg-[#f4f6f8] hidden lg:flex flex-col items-center justify-center h-screen overflow-hidden">
      {/* Simulador de Celular */}
      <div
        className="relative  overflow-hidden border-8 border-gray-300 rounded-4xl bg-gray-300"
        style={{ width: "280px", height: "550px" }}
      >
        {/* <Image
                src="/phone.png"
                alt="Simulador de Celular"
                width={270}
                height={590}
                objectFit="cover"
                className="pointer-events-none absolute z-50"
              /> */}

        {/* Vista del subdominio dentro del teléfono */}
        <div
          className="absolute scrollbar-hide overflow-hidden rounded-4xl left-0 origin-top-left "
          style={{
            transform: "scale(0.68)", // <-- ajusta este valor (0.6, 0.8, etc.)
            width: "390px", // compensar el ancho por la escala
            height: "780px", // compensar el alto
          }}
        >
          <iframe
          className="scrollbar-hide"
            ref={iframeRef}
            src={domainUrl}
            width="100%"
            height="100%"
            style={{
              border: "none",

              // borderRadius: "20px",
            }}
          ></iframe>
        </div>
      </div>

      {/* Botones de acciones */}
      <div className="flex gap-3 mb-4">
        <Link
          href={domainUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <ExternalLink size={18} />
          Visitar menú
        </Link>
        <button
          onClick={handleRefresh}
          className="flex items-center text-sm gap-2 bg-gray-200 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          <RefreshCcw size={18} />
          Refrescar
        </button>
      </div>
    </div>
  );
}
