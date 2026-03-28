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

  // Use environment variable as a template, replacing {{domain}} with the actual business domain.
  // Example for local dev: http://{{domain}}.localhost:3001/menu
  // Example for production: https://{{domain}}.fluvi.shop/menu
  const menuTemplate = process.env.NEXT_PUBLIC_MENU_URL || "https://{{domain}}.fluvi.shop/menu";
  const domainUrl = menuTemplate.replace("{{domain}}", user?.domain || "demo");
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
          className="absolute scrollbar-hide overflow-hidden rounded-4xl left-0 origin-top-left flex items-center justify-center bg-white"
          style={{
            transform: "scale(0.68)",
            width: "390px",
            height: "780px",
          }}
        >
          {user?.domain ? (
            <iframe
              className="scrollbar-hide"
              ref={iframeRef}
              src={domainUrl}
              width="100%"
              height="100%"
              style={{
                border: "none",
              }}
            ></iframe>
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <span className="text-sm">Cargando preview...</span>
            </div>
          )}
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
