"use client";

import { toPng } from "html-to-image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import QrPanel from "./QrPanel";
import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";
import QrShare from "./QrShare";
import QrTheme from "./QrTheme";
import { Download, Eye } from "lucide-react";

export default function QrContent() {
  const user = useUserStore((state) => state.user);
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrUrl, setQrUrl] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#bf0e0e");

  useEffect(() => {
    if (user?.domain) {
      setQrUrl(`https://${user.domain}.fluvi.net`);
    }
  }, [user]);

  const downloadImage = () => {
    if (qrRef.current === null) return;

    toPng(qrRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "qr-fluvi.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        toast.error(<FluviToast type="error" msg="Error al descargar el QR" />);
      });
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-auto px-11 ">
      {/* Vista Previa del QR */}
      <div className="lg:col-span-2 rounded-md">
        <div className="p-6 rounded-md border border-gray-100 shadow-md">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h2 className="flex font-bold items-center gap-2">
                <Eye className="size-5" strokeWidth={1.5} />
                Vista Previa del QR
              </h2>
              <p className="text-sm text-gray-500">
                Así se verá tu código QR cuando los clientes lo escaneen
              </p>
            </div>
            <QrShare qrUrl={qrUrl} />
          </div>

          <div className="flex flex-col items-center space-y-3">
            {/* QR Code Display */}
            <div
              ref={qrRef}
              className="relative p-8 rounded-md shadow "
              style={{ backgroundColor }}
            >
              {/*  QR Code */}
              <div className="relative">
                <QrPanel value={qrUrl} />
              </div>

              {/* Powered by FluviApp */}

              <p className="text-xs text-white font-semibold mt-2 text-center">
                Powered by FluviApp
              </p>
            </div>

            {/* URL Display */}
            <div className="w-full flex flex-col items-center max-w-md text-center">
              <p className="label-input">Ver mi Menú</p>

              <Link
                href={qrUrl}
                target="_blank"
                className="text-lg font-semibold text-center hover:underline hover:text-blue-900 "
              >
                {qrUrl}
              </Link>
            </div>

            <button
              onClick={downloadImage}
              className="bg-blue-700 cursor-pointer flex gap-2 items-center hover:bg-blue-400 text-white py-2 px-4 rounded-md transition-all"
            >
              <Download className="4" strokeWidth={1.5} /> Descargar PNG
            </button>
          </div>
        </div>
      </div>

      <QrTheme
        setBackgroundColor={setBackgroundColor}
        backgroundColor={backgroundColor}
      />
    </div>
  );
}
